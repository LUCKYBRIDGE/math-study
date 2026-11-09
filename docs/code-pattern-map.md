# 서비스 → 구현 코드 패턴 맵

이 문서는 분석 결과를 실제 구현으로 연결합니다.

| 서비스 | 핵심 구현 패턴 | 공통 코드 |
|---|---|---|
| 알지오매스 키즈 | 2D dependency + tool state + 3D/document/classroom 분리 | dependency-graph, tool-state-machine, scene-graph, serialization |
| GeoGebra | GeoElement/AlgoElement형 dependency + command | dependency-graph, history |
| Desmos | expression dependency + slider/reactivity + geometry token | reactive-property, dependency-graph |
| Mathigon Polypad | Tile/Stroke document + registry + capability | tile-document, manipulative-registry, history |
| PhET | reactive domain properties + scene graph | reactive-property, scene-graph |
| Graspable Math | expression AST + semantic rewrite + derivation | rewrite-engine, history |
| Math Learning Center | semantic manipulative objects + short share | manipulative-registry, tile-document, serialization |
| CODAP | shared dataset + linked selection + renderer adapters | linked-dataset, history |
| Cabri Express | construction graph + shared symbol environment | dependency-graph, scene-graph |
| Brainingcamp | common manipulative shell + Canvas + LIVE | manipulative-registry, tile-document, lesson-orchestrator |
| Amplify Classroom | lesson screen registry + response/pacing | lesson-orchestrator, serialization |
| Didax | small single-purpose microtool SDK | manipulative-registry, history |
| Toy Theater | low-floor pointer interaction + minimal state | manipulative-registry |

## 구현 코드 위치

~~~text
reference-implementations/
├─ package.json
├─ tsconfig.json
└─ src/
   ├─ dependency-graph.ts
   ├─ history.ts
   ├─ tool-state-machine.ts
   ├─ tile-document.ts
   ├─ manipulative-registry.ts
   ├─ rewrite-engine.ts
   ├─ reactive-property.ts
   ├─ scene-graph.ts
   ├─ linked-dataset.ts
   ├─ lesson-orchestrator.ts
   └─ serialization.ts
~~~

## 실제 서비스 폴더에서 보는 순서

각 서비스:

~~~text
services/<service>/
├─ README.md
├─ classification.md
└─ implementation-reference.md
~~~

1. `README.md`: 화면/UI/UX/교육적 분석
2. `classification.md`: 제품·상태·렌더링·수업 시스템 분류
3. `implementation-reference.md`: 실제 소스 경로 또는 클린룸 재구현

## 소스 신뢰도

### 실제 코드까지 강하게 분석 가능한 서비스

- GeoGebra
- CODAP
- PhET core libraries
- Mathigon 공개 API/콘텐츠 코드

### 제품 행동은 확인 가능하지만 핵심 엔진은 비공개

- Desmos
- 알지오매스 키즈
- Graspable Math
- Cabri Express
- Math Learning Center
- Brainingcamp
- Amplify Classroom
- Didax
- Toy Theater

이 경우 실제 내부 class/file 이름을 상상해서 쓰지 않고, 확인된 행동을 독립적인 코드 구조로 재구현합니다.
