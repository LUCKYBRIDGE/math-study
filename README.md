# math-study

수학 교육용 웹·앱·도구를 **수학 모델, 기술 구조, 시스템, UI/UX, 표현 방식, 수업 활용 구조**까지 정밀 분석해 축적하는 저장소입니다.

단순 서비스 소개가 아니라 아래 질문에 답하는 것이 목적입니다.

- 수학 원리를 어떤 **조작 가능한 객체**로 바꾸었는가?
- 사용자의 클릭·드래그·입력을 어떤 **수학 연산**으로 해석하는가?
- 어떤 **상태 모델**을 중심으로 화면을 구성하는가?
- 식·그래프·표·도형·조작물·3D·소리를 어떻게 연결하는가?
- Undo/Redo, 저장, 공유, 과제, 협업은 어떻게 수학 상태와 연결되는가?
- 공개 소스가 있다면 실제 폴더·파일 구조는 어떻게 책임을 나누는가?
- 비공개 서비스라면 어디까지가 확인된 사실이고 어디부터가 추정인가?
- 신규 수학 서비스를 설계할 때 무엇을 가져오고 무엇을 피해야 하는가?

---

## 분석 방법

storytold/craft-anything의 Study → Build → Check 사고방식을 참고하되 이 저장소에서는 다음 흐름으로 사용합니다.

1. **Study** — 공식 사이트, 도움말, 매뉴얼, 공개 저장소, 현재 동작 확인
2. **Model** — 화면 → 행동 → 상태 변화 → 수학 의미 → 데이터 구조로 재구성
3. **Compare** — 같은 개념을 서비스마다 어떻게 다르게 풀었는지 비교
4. **Extract** — 재사용 가능한 UI/UX·아키텍처·수학 인터랙션 패턴 추출

자세한 기준:
- [분석 방법](docs/analysis-method.md)
- [수학 교육 앱 분류 체계](docs/categories.md)
- [기술·시스템 비교](docs/technology-system-matrix.md)
- [수학 표현 방식 분류](docs/representation-taxonomy.md)
- [전체 비교표](docs/comparison-matrix.md)
- [공통 인터랙션 패턴](patterns/math-interaction-patterns.md)
- [서비스별 분석 스키마](docs/service-analysis-schema.md)
- [앱·서비스별 분류 카탈로그](docs/service-catalog.md)
- [서비스 → 구현 코드 패턴 맵](docs/code-pattern-map.md)
- [클린룸 TypeScript 구현](reference-implementations/README.md)

---

# 1. 서비스 분류

## A. 동적 기하·다중 표현

- [알지오매스 키즈](services/algeomath-kids/README.md)
- [GeoGebra](services/geogebra/README.md)
- [Cabri Express](services/cabri-express/README.md)
- [Desmos](services/desmos/README.md)

핵심:
- Math Object
- Dependency Graph
- Construction
- Transformation
- 2D/3D
- 식/그래프/측정 연동

## B. 가상 수학 교구·조작물

- [Mathigon Polypad](services/mathigon-polypad/README.md)
- [Math Learning Center](services/math-learning-center/README.md)
- [Brainingcamp](services/brainingcamp/README.md)
- [Didax Virtual Manipulatives](services/didax/README.md)
- [Toy Theater](services/toy-theater/README.md)

핵심:
- Manipulative-first
- Tile/Object Registry
- Workspace
- Semantic Merge/Split
- Drag/Drop
- 초등 수모형

## C. 시뮬레이션·마이크로월드

- [PhET Math](services/phet/README.md)

핵심:
- 개념별 domain model
- 최소 UI
- 원인-결과 변화
- animation
- multimodal feedback

## D. 대수 직접조작

- [Graspable Math](services/graspable-math/README.md)

핵심:
- Expression Tree
- Gesture
- Legal Transform
- Rewrite Rule
- Derivation History

## E. 데이터·통계 탐구

- [CODAP](services/codap/README.md)

핵심:
- Shared Dataset
- Case Identity
- Table/Graph/Map 연결
- Brushing and Linking
- Plugin API

## F. 수업 제작·실시간 오케스트레이션

- [Amplify Classroom](services/amplify-classroom/README.md)
- 알지오 모둠
- GeoGebra Classroom
- Brainingcamp LIVE

핵심:
- Lesson Screen
- Teacher Dashboard
- Student Response
- Pacing
- Snapshot
- Select & Sequence

---

# 2. 현재 분석 서비스

| 서비스 | 주 유형 | 기술 공개성 | 가장 중요한 분석 포인트 |
|---|---|---|---|
| 알지오매스 키즈 | 동적 기하/3D/수업 | 내부 비공개 | 초등 교육과정형 도구 + 2D/3D/문서/모둠 |
| GeoGebra | 동적 수학 엔진 | 높음 | GeoElement, Kernel, Dependency Graph |
| Desmos | 그래프/표현식 | 핵심 비공개 | Expression → Graph, Geometry Token |
| Polypad | 가상교구 | API 공개 | Tile/Stroke JSON, Viewport 분리, Embed |
| PhET | 시뮬레이션 | 현행 내부 제한 | 개념별 micro-world, SceneryStack |
| Graspable Math | 대수 직접조작 | 핵심 비공개 | Gesture → Legal Algebra Transform |
| Math Learning Center | 가상교구 | 핵심 비공개 | 물리교구 디지털화, short share code |
| CODAP | 데이터/통계 | 높음 | Shared Dataset, Linked Views, Plugin |
| Cabri Express | 동적 수학 | 핵심 비공개 | Geometry + Graph + 3D + Equation 통합 |
| Brainingcamp | 가상교구/수업 | 핵심 비공개 | Common Manipulative Shell + LIVE |
| Amplify Classroom | 수업 플랫폼 | 핵심 비공개 | Lesson Screens + Teacher Orchestration |
| Didax | micro manipulative | 핵심 비공개 | HTML5 단일 개념 교구 |
| Toy Theater | 저학년 교구 | 핵심 비공개 | 최소 UI, 강한 시각 affordance |

---

# 3. 서비스별 심층 문서

각 서비스 폴더는 이제 다음 구조를 사용합니다.

~~~text
services/<service>/
├─ README.md                  # UI/UX·기능·교육적 분석
├─ classification.md          # 앱 자체의 기술/상태/표현/수업 분류
└─ implementation-reference.md # 실제 코드 경로 + 클린룸 구현 설계
~~~

| 서비스 | 분류 | 구현 분석 |
|---|---|---|
| 알지오매스 키즈 | [분류](services/algeomath-kids/classification.md) | [구현](services/algeomath-kids/implementation-reference.md) |
| GeoGebra | [분류](services/geogebra/classification.md) | [구현](services/geogebra/implementation-reference.md) |
| Desmos | [분류](services/desmos/classification.md) | [구현](services/desmos/implementation-reference.md) |
| Mathigon Polypad | [분류](services/mathigon-polypad/classification.md) | [구현](services/mathigon-polypad/implementation-reference.md) |
| PhET | [분류](services/phet/classification.md) | [구현](services/phet/implementation-reference.md) |
| Graspable Math | [분류](services/graspable-math/classification.md) | [구현](services/graspable-math/implementation-reference.md) |
| Math Learning Center | [분류](services/math-learning-center/classification.md) | [구현](services/math-learning-center/implementation-reference.md) |
| CODAP | [분류](services/codap/classification.md) | [구현](services/codap/implementation-reference.md) |
| Cabri Express | [분류](services/cabri-express/classification.md) | [구현](services/cabri-express/implementation-reference.md) |
| Brainingcamp | [분류](services/brainingcamp/classification.md) | [구현](services/brainingcamp/implementation-reference.md) |
| Amplify Classroom | [분류](services/amplify-classroom/classification.md) | [구현](services/amplify-classroom/implementation-reference.md) |
| Didax | [분류](services/didax/classification.md) | [구현](services/didax/implementation-reference.md) |
| Toy Theater | [분류](services/toy-theater/classification.md) | [구현](services/toy-theater/implementation-reference.md) |

## 실제 구현용 코드

`reference-implementations/`에는 분석 결과를 그대로 새 서비스 설계에 옮길 수 있도록 독립 TypeScript 코드를 둡니다.

~~~text
dependency-graph.ts       # 동적 기하
tool-state-machine.ts     # 작도 도구
history.ts                # 의미 단위 Undo/Redo
tile-document.ts          # 가상교구 문서
manipulative-registry.ts  # 교구 플러그인
rewrite-engine.ts         # 대수식 변환
reactive-property.ts      # 시뮬레이션 반응형 상태
scene-graph.ts            # 2D/3D 장면 그래프
linked-dataset.ts         # 통계 linked views
lesson-orchestrator.ts    # 실시간 수업
serialization.ts          # 버전/마이그레이션
~~~

원본 서비스를 복제한 코드가 아니라, 공개 구조와 관찰 가능한 동작을 바탕으로 만든 **clean-room reference implementation**입니다.

---

# 4. 근거 등급

- **[VERIFIED-UI]** 공식 사이트/매뉴얼/도움말에서 직접 확인
- **[VERIFIED-SOURCE]** 공식 또는 명확한 공개 소스에서 직접 확인
- **[HISTORICAL-SOURCE]** 과거 공개 소스이며 현재 구조와 다를 수 있음
- **[INFERRED]** 화면·API·행동으로부터 재구성한 합리적 추정
- **[UNKNOWN]** 공개 근거가 없어 판단 보류

비공개 서비스는 실제 폴더/파일 구조처럼 보이는 가짜 구조를 만들지 않습니다.

---

# 5. 가장 중요한 비교축

## 수학 상태 모델

~~~text
GeoGebra        → Object Dependency Graph
Desmos          → Expression State
Polypad         → Tile/Stroke Document
PhET            → Simulation Domain Model
Graspable Math  → Expression Tree + Rewrite
CODAP           → Shared Dataset + Linked Views
Amplify         → Lesson Screen + Student Response
~~~

이 차이가 UI, Undo, 저장, 공유, 평가 구조를 거의 결정합니다.

## 인터랙션 문법

| 문법 | 대표 |
|---|---|
| Tool-first | 알지오, GeoGebra, Cabri |
| Expression-first | Desmos |
| Manipulative-first | Polypad, MLC, Brainingcamp, Didax |
| Simulation-first | PhET |
| Gesture-first | Graspable Math |
| Attribute-drag | CODAP |
| Lesson-screen-first | Amplify Classroom |

## 표현 연결 수준

가장 중요한 목표는 단순히 여러 표현을 보여주는 것이 아니라 **같은 수학 객체/데이터 identity를 공유하는 것**입니다.

~~~text
one math/data state
   ├─ formula
   ├─ graph
   ├─ table
   ├─ geometry
   ├─ map
   ├─ manipulative
   └─ accessible representation
~~~

---

# 6. 저장소 구조

~~~text
math-study/
├─ README.md
├─ docs/
│  ├─ analysis-method.md
│  ├─ categories.md
│  ├─ comparison-matrix.md
│  ├─ technology-system-matrix.md
│  ├─ representation-taxonomy.md
│  ├─ service-analysis-schema.md
│  ├─ service-catalog.md
│  └─ code-pattern-map.md
├─ services/
│  ├─ algeomath-kids/
│  ├─ geogebra/
│  ├─ desmos/
│  ├─ mathigon-polypad/
│  ├─ phet/
│  ├─ graspable-math/
│  ├─ math-learning-center/
│  ├─ codap/
│  ├─ cabri-express/
│  ├─ brainingcamp/
│  ├─ amplify-classroom/
│  ├─ didax/
│  └─ toy-theater/
├─ reference-implementations/
│  ├─ README.md
│  └─ src/
│     ├─ dependency-graph.ts
│     ├─ history.ts
│     ├─ tool-state-machine.ts
│     ├─ tile-document.ts
│     ├─ manipulative-registry.ts
│     ├─ rewrite-engine.ts
│     ├─ reactive-property.ts
│     ├─ scene-graph.ts
│     ├─ linked-dataset.ts
│     ├─ lesson-orchestrator.ts
│     ├─ serialization.ts
│     └─ examples/
│        ├─ dynamic-geometry-demo.ts
│        ├─ manipulative-demo.ts
│        ├─ algebra-rewrite-demo.ts
│        ├─ linked-data-demo.ts
│        ├─ reactive-simulation-demo.ts
│        └─ classroom-demo.ts
├─ patterns/
│  └─ math-interaction-patterns.md
└─ backlog/
   └─ candidates.md
~~~

---

# 7. 서비스 하나를 분석할 때 확인하는 항목

1. 역할과 대상 학습자
2. 페이지/화면 지도
3. UI 영역과 버튼
4. 핵심 사용자 흐름
5. 수학 표현 방식
6. 수학 객체/상태 모델
7. 입력 제스처
8. 제약/스냅/검증
9. 피드백/애니메이션
10. Undo/Redo
11. 저장/직렬화
12. 공유
13. 교사/학생 시스템
14. 접근성
15. 렌더링
16. 상태관리
17. 공개 API
18. 실제 소스 폴더/파일
19. 테스트 전략
20. 장점/한계
21. 재사용할 패턴
22. 추가 검증 항목

---

# 8. 설계에서 우선적으로 가져올 패턴

- **Math Object와 Representation 분리**
- **Dependency Graph**
- **Tool State Machine**
- **Gesture → Semantic Operation**
- **Semantic Snapping**
- **Multiple Representations, One Source of Truth**
- **Tile/Stroke Document**
- **Simulation-specific Screen**
- **Shared Dataset + Linked Selection**
- **Lesson Shell + Specialized Math Widgets**
- **Command/Meaning-based History**
- **Document / Viewport / Preference / Session State 분리**
- **짧은 공유 코드**
- **교사 template → 학생 copy → submission**
- **Keyboard/Screen Reader/Sonification을 별도 표현으로 설계**

자세한 내용은 [공통 인터랙션 패턴](patterns/math-interaction-patterns.md)을 참고합니다.

---

# 9. 다음 분석 후보

[backlog/candidates.md](backlog/candidates.md)에 분야별로 정리합니다.

다음 우선순위는 현재 빈 축을 채우는 방향으로 둡니다.

- 적응형 연습/마스터리
- 게임 기반 수학 개념 학습
- 문제 탐구형 콘텐츠
- AI 풀이/튜터
- 수학 증명/논증
- 공간감각 특화 앱
