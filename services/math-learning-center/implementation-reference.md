# Math Learning Center 구현 참조

## 0. 분류

- 핵심: **초등 수학 모델을 직접 조작하는 open-ended manipulative**
- 현재 중요 변화: 여러 도구를 한 공간에서 함께 쓰는 **Math MultiApp**
- 내부 핵심 소스: 비공개
- 분석: 공식 기능 문서 기반 클린룸 재구현

공식 현재 확인:
- Number Chart
- Number Line
- Math Clock
- Fraction Bars
- Geoboard 등
- keyboard support
- screen reader compatibility
- multi-level zoom
- 로그인/구독 없이 사용
- 기존 독립 앱도 계속 제공
- 8-character share code

---

## 1. MLC의 핵심은 “객체가 곧 수학 모델”

예를 들어 Fraction 앱에서는:
- bar/circle
- denominator 1~100
- selected/fill parts
- labels
- overlap
- rotate/resize
가 핵심입니다.

따라서 모델:

~~~ts
interface FractionModel {
  id: string;
  shape: "bar" | "circle";
  denominator: number;
  selectedParts: Set<number>;
  rotation: number;
  scale: number;
}
~~~

SVG 조각 개수만 저장하면 안 됩니다.

---

## 2. MultiApp 구조

여러 교구를 함께 쓰려면 공통 document 안에서 타입별 object를 관리합니다.

~~~ts
type ManipulativeObject =
  | FractionBarObject
  | NumberLineObject
  | NumberChartObject
  | ClockObject
  | GeoboardObject;
~~~

권장 registry:
`reference-implementations/src/manipulative-registry.ts`

~~~ts
registry.register(fractionBarDefinition);
registry.register(numberLineDefinition);
registry.register(clockDefinition);
~~~

교구 추가 시 shell 코드를 수정하지 않는 구조가 좋습니다.

---

## 3. Manipulative와 Annotation 분리

수학 객체:
- number line
- fraction bar

설명 객체:
- text
- pen
- arrow

를 같은 타입으로 취급하지 않습니다.

~~~ts
interface WorkspaceDocument {
  manipulatives: Record<string, ManipulativeObject>;
  annotations: Record<string, AnnotationObject>;
}
~~~

학생의 전략을 분석할 때 둘의 의미가 다르기 때문입니다.

---

## 4. Number Line semantic state

공식 기능에서:
- whole/fraction/decimal/negative
- custom interval
- tick marks
- forward/backward jumps
- jump label

이 확인됩니다.

권장:

~~~ts
interface NumberLineState {
  min: number;
  max: number;
  step: Rational;
  ticks: Tick[];
  jumps: Jump[];
}

interface Jump {
  from: Rational;
  to: Rational;
  labelVisible: boolean;
}
~~~

jump를 bezier path 좌표로만 저장하지 않습니다.

---

## 5. Number Chart semantic state

공식 기능:
- standard/custom chart
- fractions/decimals/mixed numbers
- stamps
- Stamp Every…
- hide/show
- choral counting

권장:

~~~ts
interface NumberChartState {
  rows: number;
  cols: number;
  sequence: MathValue[];
  hiddenCells: Set<number>;
  stamps: Map<number, Stamp>;
  playbackIndex?: number;
}
~~~

“Stamp Every 3 starting at 2” 같은 동작은 command로 남깁니다.

---

## 6. Share Code

공식 현재 설명은 8-character code/link 공유이며 코드는 마지막 접근 후 일정 기간 유지됩니다.

클린룸 서버 구조:

~~~text
POST /documents
  body: VersionedDocument
  → code

GET /documents/:code
  → VersionedDocument
~~~

DB:

~~~ts
interface SharedDocumentRecord {
  code: string;
  schemaVersion: number;
  payload: string;
  createdAt: number;
  lastAccessedAt: number;
}
~~~

코드는 document ID를 암호화한 것보다 random short identifier + uniqueness check가 단순합니다.

---

## 7. 공유는 “사본 열기”가 안전

교실에서 같은 share code를 여러 학생이 열 경우 원본 공동편집이 아니라:

~~~text
teacher template
 → share code
 → student load
 → local/private copy
~~~

가 기본이어야 합니다.

필요하면 제출 시 새 code를 생성합니다.

---

## 8. 접근성

현재 MultiApp은 keyboard/screen reader를 공식 강조합니다.

Canvas를 쓴다면 별도 semantic tree가 필요하고,
DOM/SVG를 쓴다면 object마다 focusable control을 제공할 수 있습니다.

권장:

~~~ts
interface ManipulativeAccessibility {
  label(state: unknown): string;
  actions(state: unknown): AccessibleAction[];
}
~~~

예:
“4등분 분수 막대, 3조각 선택됨”.

---

## 9. UI 철학

MLC형 도구는 설정 패널보다 조작물이 중심입니다.

~~~text
workspace 80~90%
controls 최소
contextual controls
~~~

Power tool처럼 모든 옵션을 sidebar에 항상 보이면 장점이 사라집니다.

---

## 10. 권장 폴더

~~~text
workspace/
  document.ts
  selection.ts

manipulatives/
  registry.ts
  fraction/
  number-line/
  number-chart/
  clock/
  geoboard/

annotations/
sharing/
accessibility/
~~~

---

## 11. 확인 출처

- https://www.mathlearningcenter.org/mathmultiapp
- https://www.mathlearningcenter.org/apps
- https://www.mathlearningcenter.org/apps/fractions
- https://www.mathlearningcenter.org/apps/number-line
- https://www.mathlearningcenter.org/apps/number-chart

내부 실제 framework/state library는 공개 근거가 없어 추정하지 않습니다.
