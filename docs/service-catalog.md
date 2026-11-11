# 앱·서비스별 분류 카탈로그

> 범주별 분류와 별개로, **각 앱/서비스를 하나의 독립 제품 아키텍처**로 분류합니다.

| 서비스 | Product Type | Interaction | Core State | Rendering | Classroom | 소스 분석 | 구현 참조 |
|---|---|---|---|---|---|---|---|
| 알지오매스 키즈 | dynamic math + document | tool-first | object/dependency + document | 2D/3D mixed | group/assignment | UI 중심 | dependency graph + tools |
| GeoGebra | dynamic math engine | tool/command/expression | GeoElement dependency graph | 2D/3D platform views | Classroom | 매우 높음 | dependency graph + command |
| Desmos | expression/geometry | expression-first + direct manipulation | expression/token state | graph/geometry/3D | 별도 Amplify | 중간 | reactive expression model |
| Mathigon Polypad | virtual manipulative canvas | manipulative-first | Tile/Stroke document | canvas/SVG/web components | embed/activity | API 높음 | tile document + registry |
| PhET | simulation microworld | simulation-first | reactive domain properties | scene graph mixed renderers | 외부 활동 조합 | core libs 높음 | reactive property + scene graph |
| Graspable Math | algebra manipulation | gesture-first | expression tree + rewrite | formula/canvas | 일부 공유 | UI 중심 | rewrite engine |
| Math Learning Center | elementary manipulative | manipulative-first | manipulative state | web workspace | share 중심 | UI 중심 | manipulative registry |
| CODAP | data exploration | attribute-drag | shared dataset + tiles + history | DOM/D3/Pixi/Leaflet | data activity | 매우 높음 | linked dataset + history |
| Cabri Express | dynamic math toolkit | construction-first | dynamic construction graph | 2D/3D/graph | LMS embed | UI 중심 | dependency graph |
| Solid Figure | guided solid-figure courseware | content → slider/drag | UI-local fold/view state | DOM + CSS 3D | 없음 | **공개 소스 높음** | face/hinge folding model |
| Brainingcamp | manipulative suite | toolkit/bin → workspace | manipulative document | Canvas workspace | LIVE | 중간 | registry + live session |
| Amplify Classroom | lesson orchestration | screen-first | lesson + response + session | web widgets | 핵심 | UI/System | lesson orchestrator |
| Didax | single-purpose manipulatives | direct manipulation | microtool state | HTML5 web | 없음/외부 | 기술 일부 확인 | microtool shell |
| Toy Theater | low-floor visual tools | see-touch-move | minimal visual state | web interactive | 없음/외부 | UI 중심 | microtool shell |

## 서비스별 주 분석 질문

### 알지오매스 키즈
국내 초등 수학 개념을 범용 기하 엔진이 아니라 **교육과정 용어와 도구**로 어떻게 번역하는가?

### GeoGebra
객체-알고리즘 의존 그래프가 어떻게 동적 재계산, 명령, 도구, 2D/3D를 묶는가?

### Desmos
expression list를 source of truth로 두고 그래프·기하 token·slider를 어떻게 연결하는가?

### Polypad
수학 교구를 serializable tile로 만들고 자유그리기와 한 문서에 어떻게 공존시키는가?

### PhET
수학/과학 법칙을 UI 검증 로직이 아니라 **반응형 domain model** 자체에 어떻게 넣는가?

### Graspable Math
pixel drag를 어떻게 대수의 legal rewrite로 해석하는가?

### MLC
물리 교구의 수학적 affordance를 최소 UI로 어떻게 보존하는가?

### CODAP
같은 case identity를 표·그래프·지도에 공유해 linked selection을 어떻게 구현하는가?

### Cabri Express
construction, graph, equation, 3D를 하나의 동적 수학 환경으로 어떻게 통합하는가?

### Brainingcamp
교구마다 다른 기능을 공통 Toolkit/Bin/Workspace shell 안에 어떻게 수용하는가?

### Amplify Classroom
수학 엔진을 직접 통합하지 않고 전문 widget들을 lesson screen과 teacher orchestration으로 어떻게 묶는가?

### Didax
한 개념에 한 도구라는 micro-app 구조가 어떤 기술적 단순성을 만드는가?

### Toy Theater
기능을 줄이고 visual affordance를 강화해 저학년의 조작 학습비용을 어떻게 낮추는가?


### Solid Figure / 奇妙图形探险队
고정된 몇 개 입체를 CSS 3D로 접고 펼치는 구조가 왜 저비용 코스웨어에 효과적이며, 임의 전개도·정확한 topology·hidden edge로 확장할 때 어떤 domain model이 추가로 필요한가?
