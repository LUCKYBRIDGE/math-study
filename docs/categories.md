# 수학 교육 웹·앱 분류 체계

이 저장소에서는 서비스를 기능 목록이 아니라 **학습자가 무엇을 조작하고, 내부에서 무엇을 상태로 관리하며, 어떤 수학 표현을 연결하는가**를 기준으로 분류합니다.

## 1. 동적 기하·다중 표현형

대표:
- 알지오매스 키즈
- GeoGebra
- Cabri Express
- Desmos Geometry

핵심 모델:
- 점/선/도형 같은 수학 객체
- 객체 간 의존 관계
- 측정값과 파생 객체
- 변환 연산
- 2D/3D/식/표현 간 동기화

대표 UI:
- 작도 도구막대
- 캔버스
- 객체 선택/속성
- 측정
- 변환
- 실행취소
- 그래프/식 패널

핵심 UX 질문:
- Tool-first인가 Object-first인가?
- 점을 움직였을 때 파생 도형이 자동 갱신되는가?
- 관계를 유지한 복사인가 단순 복제인가?
- 초등학생이 도구 이름을 이해할 수 있는가?
- 2D와 3D가 같은 조작 문법을 유지하는가?

가져올 핵심:
- Math Object
- Dependency Graph
- Tool State Machine
- Semantic Transform
- Multiple Representation

---

## 2. 그래프·함수·기호 표현형

대표:
- Desmos Graphing
- GeoGebra Graphing/CAS
- Cabri Express 계산기
- Wolfram 계열

핵심 모델:
- expression
- variable
- function
- table
- slider/parameter
- graph object

대표 UI:
- 식 목록
- 그래프 영역
- 수식 키패드
- 슬라이더
- 관심점
- 표

핵심 UX:
- 입력 즉시 그래프가 바뀌는가?
- 식과 그래프 중 어느 쪽이 source of truth인가?
- 그래프 위 직접 조작이 식에 되돌아가는가?
- 변수의 변화가 애니메이션/슬라이더로 연결되는가?

가져올 핵심:
- Expression-first
- One Source of Truth
- Immediate Feedback
- Parameter as Slider
- Points of Interest

---

## 3. 가상 수학 교구·조작물형

대표:
- Mathigon Polypad
- Math Learning Center MultiApp
- Brainingcamp
- Didax Virtual Manipulatives
- Toy Theater Virtual Manipulatives

핵심 모델:
- fraction bar
- base-ten block
- number line
- algebra tile
- geoboard band
- counter
- pattern block
- clock
- number rack

대표 UI:
- 교구 팔레트/툴킷
- 중앙 workspace
- drag/drop
- 회전/뒤집기
- 색/라벨
- 그리기/주석
- 공유

핵심 UX:
- 물리 교구의 affordance를 얼마나 유지하는가?
- 객체가 단순 이미지인가 의미 있는 수학 객체인가?
- 합치기/분해/정렬이 semantic operation인가?
- 한 활동에 필요한 교구만 노출 가능한가?
- 학생이 설명 없이도 직접 만질 수 있는가?

가져올 핵심:
- Manipulative-first
- Tile Registry
- Semantic Merge/Split
- Low-Chrome UI
- Open-ended Strategy Expression

---

## 4. 시뮬레이션·수학 마이크로월드형

대표:
- PhET Math
- 일부 Mathigon interactive
- 개념별 특화 시뮬레이션

핵심 모델:
- 개념별 domain state
- 조절 가능한 변수
- 물체/수량/위치 관계
- 시뮬레이션 규칙

대표 UI:
- 한 개념에 최적화된 장면
- slider/toggle
- 조작물
- 즉시 변화
- 최소 제어 패널

핵심 UX:
- 메뉴를 배우기 전에 개념을 탐구할 수 있는가?
- 변화의 과정이 애니메이션으로 보이는가?
- 정답 피드백보다 현상 피드백이 먼저인가?
- 시각/청각/키보드 표현이 동등한 정보를 주는가?

가져올 핵심:
- Simulation-specific Screen
- Micro-world
- Causal Animation
- Domain Constraint
- Multimodal Representation

---

## 5. 대수 직접조작·식 변환형

대표:
- Graspable Math
- Polypad Algebra Tiles
- 일부 동적 대수 도구

핵심 모델:
- expression tree
- equation
- rewrite rule
- legal transform
- derivation history

대표 UI:
- 수식 자체를 drag/click
- 가능한 drop target
- 변형 애니메이션
- 잘못된 조작 snap-back
- 단계 이력

핵심 UX:
- 항 선택 단위가 명확한가?
- 수식의 구조가 공간 제스처에 잘 대응되는가?
- 잘못된 조작을 왜 거부하는지 알 수 있는가?
- 최종답이 아니라 변형 과정을 보존하는가?

가져올 핵심:
- Gesture to Semantic Operation
- Legal Transform Engine
- Rewrite Rule Registry
- Derivation History
- Term Identity Animation

---

## 6. 데이터·통계 탐구형

대표:
- CODAP
- GeoGebra Spreadsheet/Statistics
- Desmos tables/statistics 일부

핵심 모델:
- dataset
- case/row
- attribute/variable
- hierarchical data
- selection set
- graph/map/table representation

대표 UI:
- 데이터 테이블
- 그래프
- 지도
- 속성 drag/drop
- linked selection
- 필터
- 통계 adornment

핵심 UX:
- 한 표현에서 선택한 데이터가 다른 표현에서도 강조되는가?
- 변수 drag/drop만으로 그래프를 바꿀 수 있는가?
- 실제 CSV/센서/시뮬레이션 데이터를 쉽게 가져오는가?
- 데이터 구조가 학생에게 과도하게 기술적으로 보이지 않는가?

가져올 핵심:
- Linked Views
- Brushing and Linking
- Attribute Drag
- Data as Shared Model
- Plugin/Data Interactive API

---

## 7. 수업 제작·오케스트레이션형

대표:
- Amplify Classroom
- GeoGebra Classroom
- 알지오 모둠
- Brainingcamp LIVE

핵심 모델:
- lesson
- screen
- student response
- teacher dashboard
- pacing
- snapshot
- template/submission

대표 UI:
- 활동 제작기
- 학생 화면
- 교사 모니터링
- 전체 일시정지/진행
- 학생 응답 선택/공유
- 익명 공유

핵심 UX:
- 교사가 학생의 사고를 실시간 파악할 수 있는가?
- 학생 결과를 비교·토론으로 연결할 수 있는가?
- 전문 수학 위젯을 수업 화면에 삽입할 수 있는가?
- 학생의 자유 탐구를 교사 통제 기능이 과도하게 막지 않는가?

가져올 핵심:
- Lesson Shell + Specialized Math Widgets
- Real-time Monitoring
- Teacher Pacing
- Student Work Snapshot
- Anonymous Sharing

---

## 8. 연습·마스터리·적응형

대표 후보:
- Khan Academy
- IXL
- 일부 LMS/교과 연습 플랫폼

핵심 모델:
- skill
- item
- attempt
- correctness
- hint
- mastery/proficiency

대표 UI:
- 문제
- 답 입력
- 즉시 채점
- 힌트
- 진도
- 추천 문제

이 계열은 개방형 탐구 도구와 성격이 다릅니다. 수학 객체 편집기와 같은 기준으로 우열을 비교하면 안 됩니다.

가져올 핵심:
- Hint Ladder
- Error Taxonomy
- Attempt History
- Mastery Model

---

## 9. 문제 탐구·콘텐츠 중심형

대표 후보:
- NRICH
- Mathigon Courses
- NCTM 활동
- 교육용 문제 라이브러리

핵심은 앱 자체보다:
- 어떤 문제를 제시하는가
- 어떤 표현을 삽입하는가
- 예상→탐구→설명 흐름을 어떻게 설계하는가
입니다.

---

# 교차 분류

서비스는 하나의 범주에만 들어가지 않습니다.

| 서비스 | 주 범주 | 보조 범주 |
|---|---|---|
| 알지오매스 키즈 | 동적 기하 | 3D, 문서, 수업 |
| GeoGebra | 동적 기하 | 그래프, CAS, 3D, 수업 |
| Desmos | 그래프/기호 | 기하, 3D, 접근성 |
| Polypad | 가상교구 | 대수, 기하, 확률, 수업 embed |
| PhET | 시뮬레이션 | 수감각, 대수, 데이터 생성 |
| Graspable Math | 대수 직접조작 | 풀이 이력 |
| MLC | 가상교구 | 수감각, 초등 모델 |
| CODAP | 데이터·통계 | 플러그인 플랫폼 |
| Cabri Express | 동적 기하 | 그래프, 3D, 식 |
| Brainingcamp | 가상교구 | 실시간 수업 |
| Amplify Classroom | 수업 오케스트레이션 | Desmos/Polypad 위젯 |
| Didax | 가상교구 | 단일 개념 micro-tool |
| Toy Theater | 가상교구 | 저학년 시각 UI |

# 가장 중요한 구분

수학 교육 앱을 분석할 때 다음 3개를 혼동하지 않습니다.

1. **수학 엔진**: 무엇이 수학적으로 가능한가
2. **표현 엔진**: 그 상태를 어떻게 보이게 하는가
3. **수업 시스템**: 누가 만들고, 공유하고, 제출하고, 관찰하는가

좋은 서비스는 이 세 층이 연결되어 있지만 서로 분리되어 있습니다.
