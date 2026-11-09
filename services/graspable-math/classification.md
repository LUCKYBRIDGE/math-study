# graspable-math — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 대수 직접조작 |
| Secondary Type | 풀이 이력·그래프 연계 |
| Math Domain | 대수 |
| Interaction Grammar | Gesture-first |
| Core State Model | expression tree + legal rewrite [INFERRED] |
| Rendering | 수식 token + animation [BEHAVIOR-OBSERVED] |
| History Unit | derivation/rewrite |
| Sharing Unit | workspace/document |
| Classroom Layer | 제한적/외부 연계 |
| Source Visibility | 핵심 비공개 |
| Reimplementation Confidence | 중간 |
| Clean-room Code Mapping | `rewrite-engine.ts, history.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
