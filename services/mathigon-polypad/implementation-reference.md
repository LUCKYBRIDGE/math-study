# Mathigon Polypad 구현 참조

## 0. 분류

- 핵심: **Serializable Manipulative Document**
- 조작 문법: palette/source → drag → tile manipulation
- 공개성: 공식 JS API와 Mathigon 콘텐츠 코드 분석 가능
- 재구현 핵심: `tile-document.ts`, `manipulative-registry.ts`, `history.ts`

---

## 1. [SOURCE-OBSERVED] 공식 API 상태 모델

공식 문서 저장소:
https://github.com/mathigon/documentation

`polypad/index.md`에 공개된 핵심 document model:

~~~text
PolypadData
├─ title
├─ version
├─ options
├─ tiles: Record<id, TileData>
└─ strokes: Record<id, StrokeData>
~~~

Tile 상태에는 공식 API 기준으로 다음 종류의 필드가 존재합니다.

- name/type
- x/y
- rotation
- color
- flipped
- status
- alt text
- hide handles
- layer
- labels
- cables
- tile-specific options

Stroke는 points/brush/color 계열 상태를 갖습니다.

이것은 **그림 캔버스가 아니라 document object model**입니다.

---

## 2. Viewport를 Document와 분리

공식 API는 document serialize/unserialize와 viewport get/set/reset을 별도로 제공합니다.

이 설계는 매우 중요합니다.

~~~text
Document:
  어떤 수학 객체를 만들었는가

Viewport:
  현재 사용자가 어디를 보고 있는가
~~~

공유 링크에는 document만 저장하고, 사용자 개인 확대/이동은 제외할 수 있습니다.

클린룸 구현:
`reference-implementations/src/tile-document.ts`

---

## 3. Tile Registry

Polypad의 교구 종류는 매우 많습니다.

- fraction bar/circle
- number line
- slider
- polygons
- tangram
- solids
- algebra
- probability
- chart 등

이런 구조는 switch문 하나로 커지면 유지보수가 어려워집니다.

권장:

~~~ts
registry.register(fractionBarDefinition);
registry.register(numberLineDefinition);
registry.register(algebraTileDefinition);
~~~

공통 코드:
`reference-implementations/src/manipulative-registry.ts`

---

## 4. Tile은 단순 이미지가 아니어야 함

나쁜 모델:

~~~ts
{ type: "image", src: "fraction-1-4.svg" }
~~~

좋은 모델:

~~~ts
{
  type: "fraction-bar",
  denominator: 4,
  selectedParts: [0, 1],
  position: { x: 120, y: 80 }
}
~~~

수학 상태를 보존해야:
- 분모 변경
- 같은 전체 비교
- 합치기
- 평가
- 접근성 설명
이 가능합니다.

---

## 5. 공식 API의 Capability Control

Polypad options에는 toolbar/sidebar/actionbar 등 UI 노출과:
- noUndoRedo
- noCopyPaste
- noPinchPan
- noDeleting
- noRotating
- noSnapping
같은 capability 제한이 있습니다.

즉 “간단 모드”를 CSS로 버튼만 숨기는 것이 아니라 **활동별 허용 행위 자체를 설정**할 수 있습니다.

권장:

~~~ts
interface ActivityCapabilities {
  canRotate: boolean;
  canDelete: boolean;
  canCopy: boolean;
  canPanZoom: boolean;
  canUndo: boolean;
}
~~~

교사가 학습 목표에 따라 capability를 선택하도록 만들 수 있습니다.

---

## 6. [SOURCE-OBSERVED] Mathigon 콘텐츠 속 Polypad

`mathigon/textbooks/content/polyhedra/functions.ts`의 tessellation 활동에서는:

- Polypad load
- 외부 source를 tile source로 bind
- move/rotate/add event 구독
- polygon collision 검사
- 겹치면 class 변경
- tile 수가 일정 이상이면 score
- Backspace로 selection delete
- 이미지 다운로드

를 조합합니다.

중요한 점은 Polypad 내부를 수정하지 않고 **event API 위에 학습 검증 logic을 얹는다**는 것입니다.

---

## 7. Activity Evaluator 분리

권장 구조:

~~~ts
interface ActivityEvaluator {
  onDocumentChanged(document: MathDocument): EvaluationResult;
}

type EvaluationResult = {
  valid: boolean;
  hints: string[];
  progress: number;
};
~~~

Tile engine 자체가 “이 활동은 정답이다”를 알 필요가 없습니다.

~~~text
Manipulative Engine
        ↓ events
Activity Evaluator
        ↓
Hint / Score / Progress
~~~

이 분리는 재사용성이 매우 높습니다.

---

## 8. 충돌/맞물림

테셀레이션 같은 활동에서는 visual overlap을 별도 geometry layer로 계산합니다.

권장:

~~~ts
function validateNoOverlap(tiles: PolygonTile[]): Validation {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (polygonCollision(tiles[i]!, tiles[j]!)) {
        return { ok: false, objects: [tiles[i]!.id, tiles[j]!.id] };
      }
    }
  }
  return { ok: true, objects: [] };
}
~~~

렌더러의 pixel hit-test와 수학적 polygon collision을 구분해야 합니다.

---

## 9. Undo

Tile move 중 pointermove마다 history를 쌓지 않습니다.

~~~text
pointerdown
  → start transaction
pointermove
  → preview state
pointerup
  → commit MoveTile(oldTransform,newTransform)
~~~

이렇게 해야 Undo 1회가 학생의 “한 번 옮기기”와 일치합니다.

---

## 10. 공유 포맷

권장:

~~~ts
type SharedPolypadDocument = {
  schema: "math-workspace";
  version: 3;
  tiles: Record<string, Tile>;
  strokes: Record<string, Stroke>;
  activity?: {
    id: string;
    capabilities: ActivityCapabilities;
  };
};
~~~

Versioned migration은:
`reference-implementations/src/serialization.ts`

를 사용합니다.

---

## 11. 접근성

Tile에 `altText`와 semantic data를 함께 둡니다.

예:

~~~ts
{
  type: "fraction-bar",
  denominator: 4,
  activeParts: 3,
  accessibleLabel: "4등분 중 3조각이 선택된 분수 막대"
}
~~~

접근성 텍스트를 renderer의 SVG title에만 묻어두면 다른 표현으로 재사용하기 어렵습니다.

---

## 12. 권장 폴더 구조

~~~text
document/
  tile-document.ts
  serialization.ts

tiles/
  registry.ts
  fraction/
  number-line/
  algebra/
  geometry/

interaction/
  selection.ts
  drag.ts
  snapping.ts

activities/
  evaluators/
  capabilities/

render/
  canvas/
  svg/
~~~

---

## 13. 확인 소스

- https://github.com/mathigon/documentation/blob/main/polypad/index.md
- https://github.com/mathigon/textbooks
- `content/polyhedra/functions.ts`

클린룸 구현은 원본 내부 코드를 복사하지 않고 공식 API에서 드러난 데이터/이벤트 모델을 독립적으로 재구성합니다.
