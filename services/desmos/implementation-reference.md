# Desmos 구현 참조

## 0. 분류

- 핵심: **Expression-first reactive mathematics**
- Geometry에서는 expression + object token이 결합
- 내부 핵심 엔진: 비공개
- 분석: 공식 2026 Help Center 동작을 기준으로 클린룸 재구성

---

## 1. [BEHAVIOR-OBSERVED] 화면의 source of truth

Graphing Calculator의 기본 화면:
- expression list
- graph paper

expression list에:
- 좌표
- 식
- 방정식
- 함수
- 표
등을 넣으면 즉시 graph에 반영됩니다.

따라서 구현 핵심은 Canvas가 아니라 **Expression Store**입니다.

~~~text
Expression Editor
   ↓ parse
AST / Semantic State
   ↓ evaluate dependencies
Graph Primitives
   ↓
Renderer
~~~

---

## 2. Expression model

권장:

~~~ts
type ExpressionRecord = {
  id: string;
  source: string;
  ast: ExprNode | null;
  dependencies: Set<string>;
  errors: ParseError[];
  style: GraphStyle;
};
~~~

변수:
~~~ts
a = 2
y = a x + 1
~~~

이라면 두 번째 식은 `a`에 dependency를 갖습니다.

GeoGebra가 object dependency graph라면 Desmos형은 **symbol/expression dependency graph**에 가깝습니다.

---

## 3. reactive evaluation

공통 `reactive-property.ts`를 이용한 최소 구조:

~~~ts
const a = new Property(2);

const line = new DerivedProperty(
  [a as Property<unknown>],
  () => (x: number) => a.value * x + 1
);

a.value = 5;
// graph sampler는 새로운 함수로 redraw
~~~

실제 구현에서는 expression AST dependency graph가 필요합니다.

---

## 4. Slider

Slider를 별도 기능으로 생각하지 않고 **변수의 interactive representation**으로 봅니다.

~~~ts
interface Variable {
  name: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
}
~~~

~~~text
slider drag
  ↓
variable.value
  ↓
dependent expressions reevaluate
  ↓
graph redraw
~~~

Graph 좌표를 직접 바꾸는 것이 아닙니다.

---

## 5. Geometry: object token

2026 Geometry 가이드는 주요 화면을:
- geometry toolbar
- graph paper
- token navigator
- expression list

로 설명합니다.

또 변환을 함수로 정의하고 navigator의 transformation token을 expression list에서 다시 사용할 수 있습니다.

이 설계는 매우 중요합니다.

### 추천 모델

~~~ts
type GeometryToken =
  | { id: string; type: "point"; expressionId: string }
  | { id: string; type: "polygon"; expressionId: string }
  | { id: string; type: "transformation"; fn: TransformFn };

type TransformFn = (objectId: string) => GeometryOperation;
~~~

즉 toolbar action도 나중에 참조 가능한 **명명된 수학 객체/함수**가 됩니다.

---

## 6. Transformation as Function

예:

~~~ts
type Transform =
  | { type: "translate"; dx: Expr; dy: Expr }
  | { type: "rotate"; angle: Expr; center: PointExpr }
  | { type: "dilate"; scale: Expr; center: PointExpr };

function applyTransform(transform: Transform, polygon: Polygon): Polygon {
  // semantic transform
}
~~~

이 구조면:
- slider가 angle을 바꾸고
- transform function이 reevaluate되고
- polygon이 자동 갱신됩니다.

---

## 7. Points of Interest

Graph의 intercept/intersection/extrema 같은 표시를 renderer decoration으로만 만들지 않습니다.

~~~ts
interface PointOfInterest {
  type: "x-intercept" | "y-intercept" | "intersection" | "extremum";
  point: { x: number; y: number };
  sourceExpressionIds: string[];
}
~~~

이렇게 해야:
- 접근성
- 선택
- label
- keyboard navigation
에 재사용할 수 있습니다.

---

## 8. 3D

공식 3D Calculator도 expression list를 유지하며 3D cube 안에 points/curves/surfaces를 표현합니다.

즉 2D와 3D에서:

~~~text
Expression Engine
      ↓
Representation Adapter
   ├─ 2D
   └─ 3D
~~~

구조를 공유하는 것이 좋습니다.

3D renderer가 expression parser를 직접 가지면 안 됩니다.

---

## 9. 접근성

Desmos는 Audio Trace 같은 비시각 표현도 제공합니다.

좋은 설계:

~~~ts
interface RepresentationAdapter<T> {
  derive(state: MathState): T;
}

GraphView
AudioTrace
AccessibleText
TableView
~~~

모두 같은 semantic math state를 소비합니다.

---

## 10. 입력 지연과 성능

식 편집 때 매 keystroke마다 전체 graph를 무조건 다시 계산하면 느립니다.

권장 pipeline:

~~~text
input
 → incremental parse
 → dirty dependency set
 → recompute affected expressions
 → update only affected primitives
 → renderer batch
~~~

---

## 11. Undo

history 단위:

- expression add/delete
- expression source edit
- variable change 완료
- geometry construction
- transform application

slider pointermove를 모두 저장하지 말고 drag 종료 시 하나의 command로 묶습니다.

---

## 12. 권장 폴더

~~~text
expressions/
  parser/
  ast/
  evaluator/
  dependency/

geometry/
  objects/
  transforms/
  tokens/

representations/
  graph2d/
  scene3d/
  table/
  audio/

interaction/
  expression-editor/
  sliders/
  geometry-tools/
~~~

---

## 13. 확인 출처

- https://help.desmos.com/hc/en-us/articles/4406040715149-Getting-Started-Desmos-Graphing-Calculator
- https://help.desmos.com/hc/en-us/articles/202529279-Desmos-Graphing-Calculator-User-Guide
- https://help.desmos.com/hc/en-us/articles/15316366009997-Getting-Started-Desmos-Geometry
- https://help.desmos.com/hc/en-us/articles/25041924352909-Desmos-Geometry-Tool-User-Guide
- https://help.desmos.com/hc/en-us/articles/15367077146893-Connections-Between-Geometry-and-Algebra
- https://help.desmos.com/hc/en-us/articles/25042283517069-Desmos-3D-User-Guide

핵심 엔진 내부 구현은 공개 소스가 아니므로 위 코드는 독립 구현 모델입니다.
