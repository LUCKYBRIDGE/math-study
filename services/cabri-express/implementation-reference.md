# Cabri Express 구현 참조

## 0. 분류

- 핵심: **All-in-one dynamic mathematics toolkit**
- 공식 기능:
  - scientific calculator
  - graphical calculator
  - 3D calculator
  - equation editor
  - dynamic geometry
- 내부 소스: 비공개

---

## 1. 구현 목표를 하나의 거대 Canvas로 잡지 말 것

공식 제품은 여러 수학 표현을 한 앱에서 제공하지만, 구현은 다음처럼 계층을 분리하는 것이 적절합니다.

~~~text
Math Core
├─ scalar/expression
├─ geometry2d
├─ geometry3d
└─ construction graph

Representation
├─ equation editor
├─ graph
├─ geometry viewport
└─ 3D scene

Shell
└─ tools/navigation/document
~~~

---

## 2. Dynamic construction graph

Cabri의 동적 기하 핵심을 독립 구현하려면 GeoGebra형 dependency model을 사용할 수 있습니다.

~~~ts
graph.addObject({ id: "A", kind: "point", value: { x: 0, y: 0 } });
graph.addObject({ id: "B", kind: "point", value: { x: 5, y: 0 } });
graph.addObject({ id: "M", kind: "point", value: { x: 0, y: 0 } });

graph.addAlgorithm(
  midpointAlgorithm("mid:A:B", "A", "B", "M")
);
~~~

공통:
`reference-implementations/src/dependency-graph.ts`

---

## 3. Calculator와 Geometry의 공통 변수 환경

통합 앱에서 중요한 것은 각 도구가 독립된 숫자를 갖지 않는 것입니다.

~~~ts
interface SymbolTable {
  get(name: string): number | MathObject;
  set(name: string, value: number | MathObject): void;
}
~~~

예:

~~~text
a = 3
circle radius = a
a slider/change
→ circle redraw
→ area measurement update
→ graph update
~~~

이렇게 되면 calculator와 geometry가 실제로 연결됩니다.

---

## 4. 2D/3D 공통 command

~~~ts
type MathCommand =
  | { type: "create-point"; coordinates: number[] }
  | { type: "measure-distance"; objects: [string, string] }
  | { type: "rotate"; objectId: string; angle: number; axis?: string };
~~~

2D와 3D에서 완전히 다른 command API를 만들기보다 dimensional adapter를 둡니다.

~~~ts
interface GeometryBackend {
  execute(command: MathCommand): MathObject[];
}
~~~

---

## 5. Equation Editor

Equation editor는 display string만 만들면 calculator와 연결되지 않습니다.

필요:
- AST
- cursor model
- semantic selection
- serialization

~~~ts
interface EquationDocument {
  source: string;
  ast: Expr;
}
~~~

AST는 graph/evaluation layer와 공유합니다.

---

## 6. 3D Scene

3D renderer와 domain object를 분리합니다.

~~~ts
interface SolidObject {
  id: string;
  kind: "polyhedron" | "surface" | "curve3d";
  math: unknown;
}

interface SceneAdapter {
  buildRenderable(object: SolidObject): Renderable3D;
}
~~~

`scene-graph.ts`를 기본 구조로 참고할 수 있습니다.

---

## 7. Construction history

Cabri 계열에서는 학생이 최종 그림만 만드는 것이 아니라 construction 과정을 보는 가치가 큽니다.

권장:

~~~ts
type ConstructionStep = {
  command: MathCommand;
  createdIds: string[];
  timestamp: number;
};
~~~

History는 UI undo뿐 아니라:
- replay
- teacher inspection
- construction explanation
에 사용합니다.

---

## 8. Web/LMS embed

공식 Cabri Express는 브라우저 접근과 플랫폼 통합을 강조합니다.

권장 embed API:

~~~ts
interface MathEmbedHandle {
  load(document: string): void;
  serialize(): string;
  setCapabilities(capabilities: string[]): void;
  onChange(listener: (document: string) => void): () => void;
}
~~~

---

## 9. 권장 폴더

~~~text
core/
  expressions/
  symbols/
  construction/

geometry2d/
geometry3d/
graph/
editor/

embed/
history/
serialization/
~~~

---

## 10. GeoGebra와 다른 참고점

GeoGebra에서는 실제 소스 구조를 배울 수 있고,
Cabri Express에서는 **범용 기능을 친화적인 일관된 환경으로 묶는 제품 설계**를 참고하는 것이 좋습니다.

내부 소스가 비공개이므로 Cabri의 실제 class/file 구조를 추정해 쓰지 않습니다.

---

## 11. 확인 출처

- https://cabri.com/en/student/cabri-express/index.html
- https://cabri.com/en/instructor/cabri-express/page/2/
- Cabri Express 현재 라이선스 문서

본 구현 코드는 제품 동작에서 추출한 독립 구조입니다.
