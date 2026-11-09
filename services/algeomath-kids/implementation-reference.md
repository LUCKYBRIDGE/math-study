# 알지오매스 키즈 구현 참조

## 0. 분류

- 핵심: **초등 교육과정형 동적 수학 작업공간**
- 하위 시스템: 2D / 3D / 문서 / 모둠
- 공개성: 핵심 소스 비공개
- 분석 방식: **[BEHAVIOR-OBSERVED] 공식 매뉴얼 → [CLEAN-ROOM] 구현 재구성**

공식 매뉴얼에서 현재 확인되는 큰 모듈은 다음과 같습니다.

~~~text
알지오 2D
├─ 기본
├─ 점
├─ 선
├─ 도형
├─ 이동/변환
├─ 측정
├─ 꾸미기
├─ 자료 입력
└─ 확률·통계

알지오 3D
├─ 카메라/시점
├─ 쌓기나무
├─ 연결큐브
├─ 입체도형
├─ 전개도
└─ 측정

알지오 문서
└─ 텍스트/이미지/동영상/수식/표/첨부/슬라이드

알지오 모둠
├─ 콘텐츠
├─ 과제용 콘텐츠
├─ 과제 관리
└─ 제출
~~~

---

## 1. 한 앱으로 만들지 말고 4개 bounded context로 분리

권장:

~~~text
geometry2d/
geometry3d/
document/
classroom/
~~~

공통으로 공유:

~~~text
core/
  ids/
  serialization/
  history/
  permissions/
  asset-store/
~~~

2D/3D/문서/모둠을 하나의 거대한 store로 만들면 상태 복잡도가 급격히 커집니다.

---

## 2. 2D: 관계를 가진 객체로 모델링

공식 매뉴얼에는 점·선·도형·이동·측정 등 **의미가 붙은 도구**가 있습니다.

따라서 클린룸 구현은 단순 Canvas shape editor보다 GeoGebra형 dependency model이 적합합니다.

~~~ts
type Object2D =
  | { id: string; kind: "point"; x: number; y: number }
  | { id: string; kind: "segment"; a: string; b: string }
  | { id: string; kind: "polygon"; vertices: string[] };

type Relation =
  | { type: "midpoint"; inputs: [string, string]; output: string }
  | { type: "parallel"; inputs: [string, string]; output: string }
  | { type: "reflect"; inputs: [string, string]; output: string };
~~~

공통 구현:
- `reference-implementations/src/dependency-graph.ts`
- `reference-implementations/src/tool-state-machine.ts`

---

## 3. 선택 팝업은 Inspector로 분리

공식 2D 매뉴얼에서 객체 선택 시 색상, 점 모양, 이름, 자취 등 속성 팝업이 나타나는 것이 확인됩니다.

권장 구조:

~~~ts
interface InspectorAdapter<T> {
  supports(object: MathObject): boolean;
  getFields(object: MathObject): InspectorField<T>[];
  apply(objectId: string, patch: Partial<T>): void;
}
~~~

도형별 UI 코드를 Canvas event handler 안에 넣지 않습니다.

~~~text
Selection
  ↓
Selected Object ID
  ↓
Inspector Registry
  ↓
appropriate properties
~~~

---

## 4. 3D: 수학 객체와 카메라를 분리

공식 3D 메뉴에는 시점 변환과 쌓기나무/입체/전개도/측정이 별도로 존재합니다.

절대 다음처럼 저장하지 않습니다.

~~~ts
// 나쁜 예
cube.mesh.position.x = 3;
~~~

대신:

~~~ts
interface CubeCell {
  id: string;
  grid: { x: number; y: number; z: number };
}

interface CameraState {
  yaw: number;
  pitch: number;
  distance: number;
}
~~~

`CubeCell`은 document state,
`CameraState`는 viewport state입니다.

---

## 5. 전개도

전개도는 단순 2D 그림이 아니라 3D face graph와 연결해야 합니다.

~~~ts
interface SolidFace {
  id: string;
  vertices: string[];
}

interface Hinge {
  faceA: string;
  faceB: string;
  edgeA: [string, string];
  foldAngle: number;
}
~~~

권장 흐름:

~~~text
2D net
 → face adjacency graph
 → hinge transform
 → world transform per face
 → visibility/occlusion
 → rendered solid
~~~

이는 현재 별도 math-net-master 연구와 직접 연결할 수 있는 구조입니다.

---

## 6. 문서 시스템

공식 문서 기능은 단순 rich text editor가 아니라:
- 텍스트
- 이미지
- 동영상
- 2단 구성
- 수식
- 표
- 첨부
- 문장 순서 편집
- 시작 위치
- 슬라이드/미리보기

를 제공합니다.

권장 document schema:

~~~ts
type Block =
  | { id: string; type: "text"; html: string }
  | { id: string; type: "image"; assetId: string }
  | { id: string; type: "video"; url: string }
  | { id: string; type: "math-embed"; documentId: string }
  | { id: string; type: "columns"; children: [Block[], Block[]] };

interface LessonDocument {
  id: string;
  title: string;
  slides: { id: string; blocks: Block[]; startBlockId?: string }[];
}
~~~

핵심은 수학 작업을 screenshot으로 넣지 않고 **math document ID를 embed**하는 것입니다.

---

## 7. 모둠/과제

공식 매뉴얼에서 관리자 측:
- 모둠 관리
- 과제용 콘텐츠 관리
- 과제 관리

학습자 측:
- 과제 확인
- 콘텐츠 등록
- 제출

이 확인됩니다.

권장 schema:

~~~ts
interface Assignment {
  id: string;
  templateDocumentId: string;
  groupId: string;
  dueAt?: number;
}

interface Submission {
  assignmentId: string;
  studentAlias: string;
  documentId: string;
  submittedAt: number;
}
~~~

과제 시작 시 template을 직접 수정시키지 말고 **copy-on-start**가 안전합니다.

---

## 8. 저장 상태 분리

~~~text
Math Document
Classroom Metadata
User Preference
Viewport
Draft/Autosave
Assets
~~~

이들을 한 JSON에 넣지 않는 것이 중요합니다.

---

## 9. 추천 기술 구조

~~~text
src/
  core/
    ids/
    history/
    serialization/

  math2d/
    objects/
    relations/
    tools/
    renderer/

  math3d/
    solids/
    nets/
    camera/
    renderer/

  document/
    blocks/
    editor/

  classroom/
    groups/
    assignments/
    submissions/
~~~

---

## 10. 실제 구현 출발점

2D:
- dependency-graph.ts
- tool-state-machine.ts

3D:
- scene-graph.ts
- serialization.ts

문서:
- versioned block schema

모둠:
- lesson-orchestrator.ts 구조 일부 재사용

---

## 11. 확인 출처

- https://www.algeomath.kr/kids/manual/9
- https://www.algeomath.kr/kids/manual/3
- https://www.algeomath.kr/kids/manual/30
- https://www.algeomath.kr/kids/manual/31
- https://www.algeomath.kr/kids/manual/33

내부 프레임워크나 실제 서버 구조는 공개 근거가 없어 추정하지 않습니다.
