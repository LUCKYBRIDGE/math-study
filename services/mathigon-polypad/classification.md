# mathigon-polypad — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 가상 수학 교구 문서 |
| Secondary Type | 기하·대수·확률·그리기·입체 |
| Math Domain | 수와 연산, 분수, 대수, 기하, 확률 |
| Interaction Grammar | Manipulative-first |
| Core State Model | Tile + Stroke JSON document [VERIFIED API] |
| Rendering | Custom Web Components / SVG·Canvas 계열 API |
| History Unit | tile/stroke semantic mutation |
| Sharing Unit | serialize/unserialize/embed |
| Classroom Layer | Amplify/Mathigon 콘텐츠 embed |
| Source Visibility | 공식 API + Mathigon 공개 콘텐츠 코드 |
| Reimplementation Confidence | 높음 |
| Clean-room Code Mapping | `tile-document.ts, manipulative-registry.ts, history.ts, serialization.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
