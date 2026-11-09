# cabri-express — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 동적 수학 toolkit |
| Secondary Type | 그래프·3D·방정식 |
| Math Domain | 기하, 대수, 함수, 3D |
| Interaction Grammar | Construction-first + expression |
| Core State Model | dynamic construction graph [INFERRED] |
| Rendering | 2D/3D/graph mixed [BEHAVIOR-OBSERVED] |
| History Unit | construction history 권장 |
| Sharing Unit | web/LMS embed |
| Classroom Layer | LMS 결합 |
| Source Visibility | 핵심 비공개 |
| Reimplementation Confidence | 중간 |
| Clean-room Code Mapping | `dependency-graph.ts, history.ts, scene-graph.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
