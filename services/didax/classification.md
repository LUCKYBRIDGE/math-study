# didax — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 단일 목적 가상교구 micro-app |
| Secondary Type | 초등 수모형 |
| Math Domain | 수와 연산, 분수, 도형, 대수 |
| Interaction Grammar | Direct manipulation |
| Core State Model | small manipulative state [INFERRED] |
| Rendering | HTML5 + JavaScript [VERIFIED-UI] |
| History Unit | 간단한 object command 권장 |
| Sharing Unit | 외부/앱별 |
| Classroom Layer | 낮음 |
| Source Visibility | 핵심 비공개 / HTML5 공식 확인 |
| Reimplementation Confidence | 중간 |
| Clean-room Code Mapping | `manipulative-registry.ts, history.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
