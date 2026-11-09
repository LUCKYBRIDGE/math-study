# GeoGebra 구현 참조

## 0. 분류

- 핵심: **동적 수학 객체 + 알고리즘 의존 그래프**
- 조작 문법: Tool / Command / Expression이 같은 domain layer로 수렴
- 공개성: **[SOURCE-OBSERVED] 높음**
- 재구현 핵심: `dependency-graph.ts`, `tool-state-machine.ts`, `history.ts`

---

## 1. [SOURCE-OBSERVED] 실제 구조

공식 저장소: https://github.com/geogebra/geogebra

현재 확인한 주요 경로:

~~~text
source/shared/common/src/main/java/org/geogebra/common/
├─ kernel/
│  ├─ Kernel.java
│  ├─ Construction.java
│  ├─ algos/
│  │  ├─ AlgoElement.java
│  │  ├─ AlgoDispatcher.java
│  │  └─ AlgoMidpointSegment.java
│  ├─ commands/
│  │  ├─ CommandDispatcher.java
│  │  ├─ CommandProcessor.java
│  │  └─ Cmd*.java
│  └─ geos/
│     ├─ GeoElement.java
│     ├─ GeoPoint.java
│     └─ GeoSegment.java
├─ euclidian/
│  └─ EuclidianView.java
└─ geogebra3D/
   ├─ kernel3D/
   └─ euclidian3D/

source/web/web-common/.../EuclidianViewW.java
source/desktop/desktop/.../EuclidianViewD.java
~~~

### 구조적 핵심

GeoGebra의 중요한 분리는 다음입니다.

~~~text
UI Tool / Input Command
        ↓
CommandProcessor / Tool Controller
        ↓
AlgoElement
        ↓
GeoElement inputs → GeoElement outputs
        ↓
dependency registration
        ↓
recompute
        ↓
Euclidian / Algebra / 3D View
~~~

### Midpoint 실제 패턴

`AlgoMidpointSegment.java`에서 확인되는 패턴:

- 입력: `GeoSegment`
- 출력: `GeoPoint`
- `setInputOutput()`
- `setDependencies()`
- `compute()`
- 관련 command/mode ID 제공

즉 **결과 좌표만 계산하는 함수가 아니라 입력·출력 관계 자체를 Construction에 등록**합니다.

이 때문에 원래 선분의 끝점이 움직이면 중점도 다시 계산될 수 있습니다.

---

## 2. Command와 Tool을 같은 domain operation으로 모으기

`CommandDispatcher.java`는 문자열 command를 `CommandProcessor`로 라우팅합니다.

공식 개발 문서 `doc/dev/HowToAddANewCommand.md`에서도 새 command 추가 흐름을 다음처럼 설명합니다.

1. command enum/표현 등록
2. algorithm class 작성
3. 필요하면 AlgoDispatcher method 추가
4. `Cmd...` CommandProcessor 작성
5. dispatcher/factory 연결

중요한 설계는:

~~~text
Mouse Tool ─┐
            ├→ same algorithm/domain operation
Command  ───┘
~~~

입니다.

UI마다 서로 다른 계산 코드를 만들지 않습니다.

---

## 3. 클린룸 TypeScript 재구현

공통 코드:
- ../../../reference-implementations/src/dependency-graph.ts
- ../../../reference-implementations/src/tool-state-machine.ts
- ../../../reference-implementations/src/history.ts

### GeoGebra형 중점

~~~ts
import {
  DependencyGraph,
  midpointAlgorithm,
  type Point2
} from "../../../reference-implementations/src/dependency-graph";

const graph = new DependencyGraph();

graph.addObject<Point2>({ id: "A", kind: "point", value: { x: 0, y: 0 } });
graph.addObject<Point2>({ id: "B", kind: "point", value: { x: 4, y: 2 } });
graph.addObject<Point2>({ id: "M", kind: "point", value: { x: 0, y: 0 } });

graph.addAlgorithm(midpointAlgorithm("midpoint:A:B", "A", "B", "M"));

graph.update<Point2>("A", { x: 2, y: 2 });

console.log(graph.get<Point2>("M").value);
// { x: 3, y: 2 }
~~~

핵심은 `M`을 화면 좌표 복사본으로 만들지 않고 **A/B의 파생 객체**로 유지하는 것입니다.

---

## 4. 권장 객체 모델

~~~ts
type GeometryObject =
  | { id: string; kind: "point"; x: number; y: number }
  | { id: string; kind: "segment"; a: string; b: string }
  | { id: string; kind: "line"; through: [string, string] }
  | { id: string; kind: "polygon"; vertices: string[] };

type ConstructionAlgorithm =
  | { type: "midpoint"; inputs: [string, string]; output: string }
  | { type: "parallel"; inputs: [string, string]; output: string }
  | { type: "reflect"; inputs: [string, string]; output: string };
~~~

### 피해야 할 구조

~~~ts
// 나쁜 예
const midpoint = {
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2
};
~~~

이렇게만 저장하면 A/B가 바뀐 뒤 M의 관계를 잃습니다.

---

## 5. 작도 Tool State Machine

예: 반사

~~~text
idle
 → await-object
 → await-axis
 → validate
 → create ReflectAlgorithm
 → register dependencies
 → commit history
 → await-object
~~~

실제 구현 출발점:
`reference-implementations/src/tool-state-machine.ts`

Tool은 결과 좌표를 직접 만들기보다:

~~~ts
{
  type: "reflect",
  inputs: [polygonId, axisId]
}
~~~

같은 semantic operation을 생성해야 합니다.

---

## 6. 2D/3D 설계

실제 GeoGebra source가 공통 kernel과 platform/view를 분리하는 점이 중요합니다.

권장 구조:

~~~text
domain/
  geometry/
  algorithms/

views/
  euclidean2d/
  scene3d/
  algebra/

platform/
  web/
  desktop/
~~~

### 핵심 원칙

`Point3D`를 WebGL mesh 자체로 저장하지 않습니다.

~~~ts
interface Point3D {
  x: number;
  y: number;
  z: number;
}
~~~

Renderer는 domain object에서 mesh를 파생해야 합니다.

---

## 7. 삭제 규칙

Dependency graph는 삭제가 어렵습니다.

예:

~~~text
A ─┐
   ├→ segment AB → midpoint M
B ─┘
~~~

A를 삭제할 때 선택지는:

1. dependent 모두 cascade delete
2. dependent를 undefined 상태로 유지
3. 사용자에게 영향 범위 확인

초등용 앱은 대체로 1이 이해하기 쉽지만 Undo는 전체 transaction을 하나로 기록해야 합니다.

---

## 8. Undo/Redo

권장 history entry:

~~~ts
{
  label: "Reflect polygon P across line l",
  createdObjectIds: ["P2"],
  createdAlgorithmIds: ["reflect:P:l"]
}
~~~

마우스 이동 100회가 아니라 **작도 1회**를 history 1개로 둡니다.

---

## 9. 신규 서비스에서 가져올 구조

### 그대로 가져올 가치가 큰 것
- domain과 view 분리
- input/output 알고리즘
- dependency registration
- Tool과 Command가 같은 operation 사용
- 2D/3D가 공통 domain 공유

### 단순화할 것
초등용이면 GeoGebra 전체 command 체계는 과도합니다.

예:

~~~text
GeometryKernel
  ├─ Point
  ├─ Segment
  ├─ Polygon
  ├─ Translate
  ├─ Rotate
  ├─ Reflect
  └─ Measure
~~~

정도로 시작하는 편이 낫습니다.

---

## 10. 확인 소스

- https://github.com/geogebra/geogebra
- `source/shared/common/src/main/java/org/geogebra/common/kernel/algos/AlgoMidpointSegment.java`
- `source/shared/common/src/main/java/org/geogebra/common/kernel/commands/CommandDispatcher.java`
- `doc/dev/HowToAddANewCommand.md`

> 라이선스 조건이 있으므로 본 저장소의 TypeScript 예시는 원본 코드 복사가 아니라 독립적인 구조 재구현입니다.
