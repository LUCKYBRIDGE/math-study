# Math Learning Center Math Apps / MultiApp 정밀 분석

- 공식 앱 목록: https://www.mathlearningcenter.org/apps
- MultiApp: https://www.mathlearningcenter.org/mathmultiapp
- 조사 기준: 2026-11
- 핵심 앱 전체 소스: **공식 현행 공개 저장소 확인 안 됨**

## 1. 서비스 철학

Math Learning Center의 앱은 계산기를 디지털화한 것이 아니라 **교실의 물리적 수학 교구와 시각 모델을 디지털 조작물로 옮기는 것**이 중심입니다.

대표 standalone 앱:
- Fractions
- Geoboard
- Math Clock
- Money Pieces
- Number Chart
- Number Frames
- Number Line
- Number Pieces
- Number Rack
- Partial Product Finder
- Pattern Shapes
- Whiteboard

2026년에는 많은 도구를 **Math MultiApp** 하나의 workspace 안에서 함께 사용할 수 있게 통합하고 있습니다.

## 2. MultiApp의 방향

공식 소개의 핵심:
- one workspace
- multiple manipulatives
- number and operations
- fractions
- geometry
- no subscription
- no login
- keyboard support
- screen reader compatibility
- multi-level zoom

즉 standalone app의 단순성을 유지하면서 여러 representation을 **하나의 캔버스에서 결합**하려는 방향입니다.

이는 Polypad와 매우 좋은 비교 대상입니다.

## 3. MLC와 Polypad의 차이

### 공통
- virtual manipulatives
- drag/drop
- visual models
- open-ended workspace
- 초등 친화
- 공유

### MLC
- 각 교구가 Bridges 수학교육 모델과 강하게 연결
- UI가 더 제한적이고 목적 지향적
- 교구의 물리적 은유가 명확

### Polypad
- 객체 종류가 훨씬 많음
- 자유 캔버스/문서 도구 성격이 강함
- API와 embed 확장성이 큼

신규 초등 앱에서는 MLC의 단순함과 Polypad의 확장 구조를 결합할 가치가 있습니다.

## 4. Fractions 앱

공식 기능:
- bar/circle 모델
- denominator 1~100
- 부분 색칠
- label show/hide
- fraction overlay
- 회전
- resize
- 이미지 저장
- 8자리 공유 코드/링크

### 수학 원리의 UI 변환

~~~text
whole
  → equal partitions
  → active/fill parts
  → label
~~~

분수를 숫자쌍만으로 저장하지 않고 '전체-등분-선택'의 시각 구조로 표현합니다.

### 중요한 인터랙션
서로 다른 분수 모델을 겹쳐 동치/크기를 비교할 수 있습니다.

이는 단순히 숫자 비교 결과를 보여주는 것보다 강합니다.

## 5. Number Line

공식 기능:
- 정수
- 분수
- 소수
- 음수
- custom interval
- tick marks
- forward/backward jumps
- jump label
- custom ticks

### 데이터 모델 관점

**[INFERRED]**

~~~text
NumberLine
  ├─ domain start/end
  ├─ scale
  ├─ ticks
  ├─ points
  └─ jumps
~~~

점프를 별도 object로 두면 덧셈·뺄셈·곱셈·나눗셈 전략을 같은 수직선 위에서 표현할 수 있습니다.

## 6. Number Chart

공식 기능:
- 1-100
- 1-120
- 1-200
- 10-1000
- custom chart 최대 20×20
- fraction/decimal/mixed number
- stamp
- Stamp Every...
- show/hide
- choral counting

### 설계 의미

수 배열표를 정적인 표 이미지로 제공하지 않고 **규칙 탐색 엔진**으로 만듭니다.

Stamp Every는 사실상

~~~text
sequence rule
  → cells satisfying predicate
  → visual pattern
~~~

입니다.

초등 규칙성 활동에서 재사용 가치가 큽니다.

## 7. Geoboard

핵심 조작:
- peg
- virtual band
- segment/polygon 형성

디지털의 장점은 밴드를 빠르게 수정하고 여러 형태를 비교할 수 있다는 점입니다.

권장 내부 모델:

~~~text
PegGrid
Band
  └─ ordered peg IDs
Derived
  ├─ polygon
  ├─ perimeter
  └─ area
~~~

실제 내부 구현은 비공개이므로 위는 **[INFERRED]** 설계 모델입니다.

## 8. Number Pieces

10진 블록을 디지털로 옮긴 도구입니다.

중요한 math interaction:
- 단위/십/백 등 place value
- 합치기
- 분해
- 배열
- 연산 과정 설명

여기서 '10개를 1개 상위 단위로 교환' 같은 **semantic merge/split**은 일반 그래픽 그룹화와 다릅니다.

## 9. Number Rack

공식 설명은 5와 10의 묶음 사고를 강조합니다.

즉 bead의 시각 디자인 자체가 수감각 scaffold입니다.

~~~text
row
  → colored groups
  → bead movement
  → grouping strategy
~~~

기능을 추가하지 않고 **색/배치 구조로 수학적 인지를 유도**하는 좋은 사례입니다.

## 10. Partial Product Finder

곱셈을 직사각형/array로 표현합니다.

~~~text
a × b
  → rectangle dimensions
  → split dimensions
  → partial rectangles
  → partial products
  → total
~~~

세로셈을 곧바로 가르치기보다 면적 모델과 연산 구조를 연결합니다.

## 11. 공유 코드

공식 앱 설명에 따르면 작업을
- image로 저장하거나
- 8-character code와 link

로 공유할 수 있습니다.

앱 목록 페이지는 공유 코드가 마지막 접근 기준 18개월 동안 사용 가능하다고 설명합니다.

### 학교 UX 관점

로그인 계정 없이도
- 교사가 상태 공유
- 학생이 코드 입력
- 동일 작업 복원

이 가능하면 교실 진입장벽이 매우 낮습니다.

추천 구조:

~~~text
document state
  → serialize
  → backend short-id
  → 8-char code
  → restore
~~~

## 12. No Login 철학

MultiApp 공식 소개는 로그인 없이 무료 사용을 강조합니다.

초등 교실에서 장점:
- 계정 생성 시간 없음
- 개인정보 부담 감소
- 즉시 수업 시작
- 공유 코드를 통해 최소한의 상태 전달

반대로 장기 포트폴리오/과제 추적은 약해질 수 있습니다.

따라서 신규 서비스에서는
- anonymous quick mode
- optional account/classroom mode

의 이중 구조를 고려할 수 있습니다.

## 13. 접근성

MultiApp 공식 소개에서 명시:
- keyboard support
- screen reader compatibility
- multi-level zoom

단순 터치 교구가 아니라 키보드 탐색 가능한 조작물로 확장하고 있습니다.

가상 교구는 screen reader에서 시각 정보가 사라지기 쉬우므로 객체에 semantic label이 필요합니다.

## 14. 예상 공통 구조

다음은 **[INFERRED]**입니다.

~~~text
Workspace
├─ Tool Registry
│  ├─ numberLine
│  ├─ fractionBars
│  ├─ numberChart
│  ├─ clock
│  └─ ...
├─ Manipulative Objects
├─ Drawing / Annotation
├─ Selection / Transform
├─ Serialization
├─ Sharing
└─ Accessibility
~~~

현재 내부 프레임워크나 DB는 공개 근거가 없어 추정하지 않습니다.

## 15. 강점

1. 초등 수학의 대표 모델을 매우 직접적으로 디지털화
2. 초기 화면 학습 비용이 낮음
3. 조작 결과가 즉시 보임
4. 정답 입력보다 전략 표현에 적합
5. 공유 코드가 교실에 적합
6. 로그인 없는 접근
7. 현재 MultiApp으로 서로 다른 교구의 결합 가능성이 커짐
8. 접근성을 공식적으로 강조

## 16. 한계

1. 범용 동적 기하/대수에는 약함
2. 교구별 모델이 서로 다른 data structure를 가질 가능성이 높음
3. 자유도가 낮은 도구는 고학년 확장성이 제한됨
4. 로그인 없는 구조는 장기 학습 이력 관리와 충돌
5. 수학 교구를 많이 합치면 MultiApp UI가 점차 복잡해질 위험

## 17. 가져올 패턴

- physical manipulative metaphor
- no-login quick start
- short share code
- semantic merge/split
- number representation first
- low-chrome UI
- one workspace, multiple manipulatives
- accessible manipulative objects
- open-ended strategy expression

## 18. 주요 출처

- https://www.mathlearningcenter.org/apps
- https://www.mathlearningcenter.org/mathmultiapp
- https://www.mathlearningcenter.org/apps/fractions
- https://www.mathlearningcenter.org/apps/number-line
- https://www.mathlearningcenter.org/apps/number-chart
- https://apps.mathlearningcenter.org/
