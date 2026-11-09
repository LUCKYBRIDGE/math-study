# phet — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 시뮬레이션·마이크로월드 |
| Secondary Type | 수감각·분수·대수·수직선 |
| Math Domain | 개념별 |
| Interaction Grammar | Simulation-first |
| Core State Model | reactive domain Property + scene graph [VERIFIED core source] |
| Rendering | Scenery DAG; Canvas/SVG/DOM/WebGL 혼합 [VERIFIED-SOURCE] |
| History Unit | 개념별 선택적 |
| Sharing Unit | simulation URL/activity |
| Classroom Layer | 외부 수업과 결합 |
| Source Visibility | Scenery/Axon 등 core 공개 |
| Reimplementation Confidence | 높음(core)/중간(sim별) |
| Clean-room Code Mapping | `reactive-property.ts, scene-graph.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
