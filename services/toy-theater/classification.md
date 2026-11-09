# toy-theater — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 저학년 visual micro-tool |
| Secondary Type | 교사 도구·게임 |
| Math Domain | 수감각, 분수, 도형, 시간, 확률 |
| Interaction Grammar | See → Touch → Move |
| Core State Model | minimal visual state [INFERRED] |
| Rendering | web interactive, 내부 비공개 |
| History Unit | reset 중심/필요시 command |
| Sharing Unit | 낮음 |
| Classroom Layer | 낮음 |
| Source Visibility | 핵심 비공개 |
| Reimplementation Confidence | 중간 이하 |
| Clean-room Code Mapping | `manipulative-registry.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
