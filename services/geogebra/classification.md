# geogebra — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 동적 수학 엔진 |
| Secondary Type | 그래프·CAS·3D·도구·명령 |
| Math Domain | 기하, 대수, 함수, 통계, 미적분, 3D |
| Interaction Grammar | Tool-first + Command-first + Expression-first |
| Core State Model | GeoElement + AlgoElement dependency graph [VERIFIED-SOURCE] |
| Rendering | 공통 kernel + Web/Desktop/2D/3D view [VERIFIED-SOURCE] |
| History Unit | construction/command |
| Sharing Unit | 파일·계정·링크·Classroom |
| Classroom Layer | 중간~높음 |
| Source Visibility | 공개 monorepo |
| Reimplementation Confidence | 높음 |
| Clean-room Code Mapping | `dependency-graph.ts, tool-state-machine.ts, history.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
