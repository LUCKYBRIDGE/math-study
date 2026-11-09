# algeomath-kids — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 동적 기하·초등 수학 통합 환경 |
| Secondary Type | 3D·문서·모둠/과제 |
| Math Domain | 수와 연산, 도형, 측정, 자료와 가능성 |
| Interaction Grammar | Tool-first → Object selection → Commit |
| Core State Model | 수학 객체 + 파생 관계 + 문서 + 수업 상태 [INFERRED] |
| Rendering | 2D/3D mixed [INFERRED] |
| History Unit | construction/document command 권장 |
| Sharing Unit | 문서·모둠 콘텐츠 |
| Classroom Layer | 높음 |
| Source Visibility | 내부 소스 비공개 / 공식 매뉴얼 기반 |
| Reimplementation Confidence | 중간 |
| Clean-room Code Mapping | `dependency-graph.ts, tool-state-machine.ts, history.ts, serialization.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
