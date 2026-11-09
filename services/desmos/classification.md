# desmos — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 표현식 중심 그래프/기하 |
| Secondary Type | 3D·표·접근성 |
| Math Domain | 함수, 좌표, 기하, 대수 |
| Interaction Grammar | Expression-first + direct manipulation |
| Core State Model | expression/token/variable graph [BEHAVIOR-OBSERVED, INTERNAL INFERRED] |
| Rendering | 2D graph + geometry + 3D mixed, 내부 비공개 |
| History Unit | expression edit/geometry operation 권장 |
| Sharing Unit | calculator state/link |
| Classroom Layer | Amplify로 분리 |
| Source Visibility | 핵심 엔진 비공개 / 공식 도움말 |
| Reimplementation Confidence | 중간 |
| Clean-room Code Mapping | `reactive-property.ts, dependency-graph.ts, history.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
