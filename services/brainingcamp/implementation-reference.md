# Brainingcamp 구현 참조

## 0. 분류

- 핵심: **Common Manipulative Shell + Canvas Workspace + LIVE**
- 18개 K-8 교구
- 공식 2026 ACR에서 primary interactive area가 **Canvas-based workspace**임이 확인됨
- 내부 코드: 비공개

---

## 1. [BEHAVIOR-OBSERVED] 공통 Shell

공식 UI guideline은 모든 manipulatives에 공통인 UI를 공개합니다.

~~~text
1 Toolkit
  ├─ Objects
  ├─ Tools
  ├─ Shapes
  └─ Annotate
2 Bin
3 Workspace Menu
4 Settings
5 View Controls
6 Options
7 Drawing
8 Workspace
~~~

따라서 18개 앱을 별도 UI로 만들기보다:

~~~text
ManipulativeShell
  + ManipulativePlugin
~~~

구조가 적합합니다.

---

## 2. Plugin contract

~~~ts
interface ManipulativePlugin<S> {
  id: string;
  toolkit: ToolkitSection[];
  createInitialState(): S;
  render(ctx: CanvasRenderingContext2D, state: S): void;
  hitTest(state: S, point: Point): HitTarget | null;
  commands: Record<string, ManipulativeCommand<S>>;
}
~~~

공통 registry:
`reference-implementations/src/manipulative-registry.ts`

예:
- fraction tiles plugin
- base ten plugin
- rekenrek plugin

---

## 3. Canvas와 Domain State 분리

공식 ACR상 Canvas workspace라고 해서 Canvas 자체가 상태 저장소가 되어서는 안 됩니다.

~~~text
Domain Objects
  ↓
Layout / Transform
  ↓
Canvas Renderer
~~~

나쁜 예:
- canvas pixel image만 저장

좋은 예:

~~~ts
interface BaseTenBlock {
  id: string;
  unit: 1 | 10 | 100 | 1000;
  position: Point;
  orientation: 0 | 90;
}
~~~

---

## 4. Toolkit

공식 분류:
- Objects
- Tools
- Shapes
- Annotate

이 구분은 데이터 모델에도 반영할 가치가 있습니다.

~~~ts
type WorkspaceEntity =
  | MathManipulative
  | MathTool
  | ShapeAnnotation
  | TextAnnotation;
~~~

Objects만 수학 평가 대상으로 보고 annotation은 설명으로 분리할 수 있습니다.

---

## 5. Bin

Bin은 단순 sidebar보다 “물리 교구 상자”에 가까운 은유입니다.

권장 interaction:

~~~text
pointerdown source
 → create ghost
 → drag
 → workspace drop
 → create domain object
 → history commit
~~~

원본 palette item 자체를 이동시키지 않습니다.

---

## 6. Copy/Delete/Regroup

공식 brochure에서 copy/delete/regroup 등이 강조됩니다.

Base Ten 예:

~~~ts
type BaseTenCommand =
  | { type: "regroup"; ids: string[]; from: 1; to: 10 }
  | { type: "split"; id: string; from: 10; to: 1 }
  | { type: "duplicate"; ids: string[] }
  | { type: "delete"; ids: string[] };
~~~

regroup를 “10개 블록 삭제 + 1개 추가”로만 기록하지 말고 semantic command로 남기면 학습 과정 분석이 가능해집니다.

---

## 7. Share Code

공식 2025 guide:
- Share → Share Code/Link
- 8-character code
- 학생이 code로 작업 열기
- Share Code는 원본의 unique copy를 생성

이는 교육용 sharing에 좋은 패턴입니다.

~~~text
teacher workspace
 → serialize
 → immutable/shared template
 → code
 → student opens copy
~~~

---

## 8. LIVE architecture

공식:
- 교사가 모든 학생 화면 확인
- progress monitor
- instant feedback
- 학생 작업은 교사에게만 보임
- LIVE Session Code

**[INFERRED]** 권장 실시간 구조:

~~~text
Student Workspace
  ↓ semantic patches
WebSocket room
  ↓
Session Server
  ├─ latest state per student
  └─ teacher feedback channel
  ↓
Teacher Dashboard
~~~

### Patch envelope

~~~ts
interface WorkspacePatch {
  sessionId: string;
  studentAlias: string;
  baseRevision: number;
  revision: number;
  commands: WorkspaceCommand[];
}
~~~

매 frame screenshot을 보내는 것보다 semantic state/patch를 보내는 편이:
- 대역폭
- 복원
- 접근성
- 분석
에 유리합니다.

실제 Brainingcamp가 어떤 방식인지 공개 근거가 없어 단정하지 않습니다.

---

## 9. Teacher preview

교사용 dashboard는 학생 30개의 full interactive canvas를 모두 같은 품질로 렌더링하면 무거울 수 있습니다.

권장 2단계:

~~~text
list/grid → lightweight preview
click student → full live workspace
~~~

preview는:
- thumbnail snapshot
또는
- 저비용 renderer
로 생성할 수 있습니다.

---

## 10. 접근성

Canvas 기반이면:
- keyboard focus model
- screen-reader semantic tree
- alternative actions
를 별도로 구현해야 합니다.

공식 ACR이 VoiceOver/NVDA testing을 명시하므로, 이 부분은 단순 부가 기능으로 보면 안 됩니다.

---

## 11. 권장 폴더

~~~text
shell/
  toolkit/
  bin/
  workspace/

manipulatives/
  registry/
  base-ten/
  fraction/
  rekenrek/

render/
  canvas/

live/
  client/
  session/
  teacher-dashboard/

sharing/
accessibility/
~~~

---

## 12. 확인 출처

- https://www.brainingcamp.com/partners/guidelines
- https://www.brainingcamp.com/live
- https://www.brainingcamp.com/acr-manipulatives
- https://www.brainingcamp.com/
- 공식 Share Code guide

핵심 서버/프레임워크는 비공개이므로 LIVE 내부 구조는 독립 구현 제안입니다.
