# codap — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | 데이터·통계 탐구 플랫폼 |
| Secondary Type | 지도·플러그인·외부 데이터 |
| Math Domain | 자료와 가능성, 통계, 데이터 과학 |
| Interaction Grammar | Attribute-drag + linked selection |
| Core State Model | shared DataSet + tiles + MST history [VERIFIED-SOURCE] |
| Rendering | React + D3 + PixiJS + Leaflet [VERIFIED-SOURCE] |
| History Unit | multi-tree logical patch |
| Sharing Unit | CODAP document / cloud file manager |
| Classroom Layer | 데이터 활동 중심 |
| Source Visibility | 공개 MIT repo |
| Reimplementation Confidence | 높음 |
| Clean-room Code Mapping | `linked-dataset.ts, history.ts, serialization.ts` |

## 이 분류가 중요한 이유

같은 수학 기능이 있어도 **상태 모델과 조작 문법**이 다르면 구현 구조는 완전히 달라집니다.

이 서비스의 상세 구현 분석은 [implementation-reference.md](implementation-reference.md), 화면·교육적 분석은 [README.md](README.md)를 봅니다.
