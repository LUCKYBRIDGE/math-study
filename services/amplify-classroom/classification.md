# amplify-classroom — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 수업 제작·오케스트레이션 |
| Secondary Type | Desmos·Polypad widget host |
| Math Domain | K-12 수학 + 타 교과 |
| Interaction Grammar | Lesson-screen-first |
| Core State Model | lesson + screens + student responses + pacing [INFERRED from behavior] |
| Rendering | web lesson shell + embedded widgets |
| History Unit | response revision / teacher actions |
| Sharing Unit | class/session/lesson |
| Classroom Layer | 핵심 |
| Source Visibility | 핵심 비공개 / 공식 제품 문서 |
| Reimplementation Confidence | 중간 |
| Clean-room Code Mapping | `lesson-orchestrator.ts, serialization.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
