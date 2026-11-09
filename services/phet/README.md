# PhET Math 정밀 분석

- 공식 사이트: https://phet.colorado.edu/
- 수학·통계 시뮬레이션: 공식 Browse
- 조사 기준: 2026-11
- 현재 소스 공개 상태: **주의 필요**

## 1. 현재 소스 상태부터 구분

과거 PhET는 개별 시뮬레이션과 공통 라이브러리 저장소를 공개해 왔습니다.

하지만 2026년 현재 phetsims/fractions-intro 공식 GitHub README는 다음 사실을 명시합니다.

- 해당 개별 repo는 더 이상 유지되지 않음
- 라이브러리와 개별 repo를 monorepo로 통합
- 현재 monorepo는 공개되어 있지 않음

따라서 과거 공개 repo 구조를 **현재 내부 구조라고 단정하면 안 됩니다.**

이 문서에서는:
- 현행 기능: **[VERIFIED-UI]**
- 공식 접근성 아키텍처 설명: **[VERIFIED]**
- 예전 개별 repo 구조: **[HISTORICAL-SOURCE]**

로 구분합니다.

## 2. Math & Statistics의 현재 범위

공식 Browse에는 2026년 현재 HTML5 기반 수학·통계 시뮬레이션이 다수 제공됩니다.

대표:
- Number Pairs
- Number Compare
- Number Play
- Number Line: Distance
- Number Line: Operations
- Number Line: Integers
- Ratio and Proportion
- Fractions: Intro
- Fractions: Mixed Numbers
- Fractions: Equality
- Build a Fraction
- Fraction Matcher
- Equality Explorer
- Area Model
- Expression Exchange
- Graphing Lines
- Graphing Quadratics
- Function Builder
- Proportion Playground
- Unit Rates
- Plinko Probability
- Area Builder
- Calculus Grapher
- Center and Variability
- Mean: Share and Balance 등

핵심은 하나의 범용 math workspace가 아니라 **개념별 작은 세계(simulation world)를 설계**한다는 점입니다.

## 3. PhET의 인터랙션 문법

~~~text
현실/수학적 은유가 있는 장면
  → 학생이 물체/조절기를 만짐
  → domain model이 변화
  → 여러 표현이 동시에 반응
  → 학생이 관계를 추론
~~~

예:
- 분수 조각을 만들고 비교
- 수직선의 위치/거리를 조작
- 등식의 양변 균형을 조작
- 넓이 모델을 조절
- 확률 실험을 반복

수학 용어를 먼저 입력하게 하지 않고 **현상과 조작을 먼저 경험하게 하는 방식**입니다.

## 4. Simulation-specific UI

GeoGebra처럼 모든 도구가 한 작업공간에 들어 있지 않습니다.

각 sim은
- 학습 목표
- 핵심 조작물
- 최소한의 control
- 즉각 피드백
- 필요한 representation

만 제공합니다.

### 장점
- 초기 인지 부하가 낮음
- 저학년 접근성 우수
- 특정 개념 관계에 집중
- 잘못된 조작을 domain model에서 자연스럽게 제한 가능

### 단점
- 학생 산출물을 하나의 공통 문서로 저장하기 어려움
- 여러 개념을 조합한 창작 활동에는 약함
- 앱마다 UI를 다시 학습할 수 있음

## 5. Model과 View 분리의 역사적 구조

과거 공개 fractions-common의 implementation notes에서는 model과 view를 명시적으로 구분한 설명을 확인할 수 있습니다.

예를 들어 challenge마다 BuildingModel이 있고 현재 표시되는 challenge의 view는 disposable하게 관리되는 구조가 설명됩니다.

이것은 **[HISTORICAL-SOURCE]**지만 PhET식 설계의 중요한 패턴입니다.

~~~text
Simulation Model
  ↓
View
  ↓
Interaction
~~~

복잡한 수학 상태는 화면 노드 자체가 아니라 model에 둡니다.

## 6. 공통 접근성 아키텍처: SceneryStack

2026 공식 Accessibility Statement는 **SceneryStack**이라는 open-source software architecture가 inclusive feature를 통합하고 확장하는 기반이라고 설명합니다.

이는 현재 공식 문서에서 확인되는 중요한 기술 정보입니다.

공식 문서가 설명하는 inclusive 방향:
- 시각
- 청각
- 촉각/대체 입력
- interactive description
- sound/sonification
- voicing
- pan/zoom
- interactive highlights

즉 접근성을 HTML overlay로 마지막에 붙이는 것이 아니라 **시뮬레이션 객체의 상태와 의미를 여러 감각 표현으로 전달하는 구조**를 지향합니다.

## 7. Modal Parity

PhET 공식 접근성 설명의 중요한 개념은 modal parity입니다.

같은 학습 정보를
- 보는 학생
- 듣는 학생
- 키보드/대체 입력을 쓰는 학생

이 동등하게 탐구할 수 있도록 객체·상태·관계·변화를 여러 modality로 표현합니다.

신규 수학 도구에서 접근성 설계 시 매우 좋은 기준입니다.

## 8. 수학적 관계를 애니메이션으로 설명

PhET의 애니메이션은 장식이 아니라 **상태 변화의 원인과 결과를 보존하는 시각적 연속성**에 가깝습니다.

나쁜 예:
- 버튼 클릭 → 결과 숫자만 변경

PhET형:
- 물체/수량/위치가 실제로 이동
- 중간 상태가 보임
- 보존되는 양과 변하는 양을 볼 수 있음

초등 수학에서는 특히
- 받아올림
- 분수 합성
- 넓이 분할
- 균형
- 수직선 이동

같은 개념에 유효합니다.

## 9. 즉시 피드백과 정답 피드백의 차이

PhET는 기본적으로 '정답/오답'보다 **세계가 어떻게 반응하는지** 보여주는 피드백이 강합니다.

~~~text
input
 → simulation state change
 → visual/auditory consequence
 → learner inference
~~~

이는 학습자가 규칙을 발견하게 만드는 구조입니다.

정답형 활동을 만드는 경우에도 이 철학을 유지하면 '틀렸습니다'보다 수학적 결과를 보여주는 것이 좋습니다.

## 10. Offline과 배포

공식 사이트는 HTML5 sim의 개별 다운로드와 데스크톱/모바일 오프라인 사용을 지원합니다.

교육 현장 관점에서 중요한 점:
- 네트워크 불안정 대응
- Chromebook/iPad 등 다양한 기기
- HTML5 중심
- 단일 sim 단위 다운로드 가능

학교용 도구라면 PWA/offline cache를 고려할 근거가 됩니다.

## 11. 초등 수학 서비스 설계에 가져올 것

### 개념별 micro-world
기능 중심 메뉴 대신 '분수 비교 세계', '수직선 이동 세계'처럼 개념별 환경을 만들 수 있습니다.

### 최소 UI
그 개념에 필요하지 않은 도구는 아예 제거합니다.

### 다중 표현 동시 변화
한 값이 바뀔 때
- 그림
- 숫자
- 식
- 소리
가 같이 변하도록 합니다.

### 조작의 연속성
변화 전후만 보여주지 않고 과정 자체를 애니메이션으로 보입니다.

### 접근성의 domain 통합
수학 객체에 accessible description을 붙입니다.

## 12. 피해야 할 오해

- 'PhET는 JavaScript로 되어 있으니 예전 GitHub repo를 그대로 따라하면 된다' → 현재는 부정확
- 과거 phetsims package 구조를 현행 monorepo 구조라고 단정 → 금지
- 화려한 애니메이션이 핵심이라고 이해 → 핵심은 개념적 인과관계
- 모든 활동을 sim으로 만들기 → 창작/작도/설명 활동은 별도 workspace가 더 적합할 수 있음

## 13. 현재 확인 가능한 기술 수준

**[VERIFIED]**
- HTML5 simulations
- SceneryStack라는 공통 inclusive architecture
- 다양한 접근성 기능
- offline 배포
- 현재 monorepo 전환 사실

**[HISTORICAL-SOURCE]**
- 개별 phetsims repo
- fractions-common implementation notes의 model/view 설명
- 과거 공통 라이브러리 repo 구조

**[UNKNOWN]**
- 현행 비공개 monorepo의 정확한 최상위 폴더 구조
- 현재 build pipeline 세부
- 현행 패키지 경계

## 14. 주요 출처

- https://phet.colorado.edu/en/simulations/browse
- https://phet.colorado.edu/en/simulations/filter?subjects=math-and-statistics&type=html
- https://phet.colorado.edu/en/inclusive-design/accessibility-statement
- https://github.com/phetsims/fractions-intro
- https://github.com/phetsims/fractions-common
- https://phet.colorado.edu/en/offline-access

## 15. 후속 분석 우선 sim

초등 서비스 개발 관점에서 우선순위:
1. Fractions: Intro
2. Build a Fraction
3. Number Line: Operations
4. Number Play
5. Area Model Introduction
6. Equality Explorer: Basics
7. Ratio and Proportion

각 sim을 별도 문서로 나눠 화면 단위 state machine까지 분석할 가치가 있습니다.
