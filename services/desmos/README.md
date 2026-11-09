# Desmos 정밀 분석

- Graphing Calculator: https://www.desmos.com/calculator
- Geometry: https://www.desmos.com/geometry
- 3D: https://www.desmos.com/3d
- Classroom: 현재 Amplify Classroom
- 조사 기준: 2026-11
- 핵심 계산기 소스 공개 여부: **[UNKNOWN/비공개 취급] 공식 현행 전체 소스 저장소 확인 안 됨**

## 1. 핵심 설계 철학

Desmos의 가장 강한 설계는 **expression list를 수학 작업의 중심 입력/상태 표현으로 두고, 그래프를 즉시 파생하는 것**입니다.

~~~text
Expression List
   ↓ parse/evaluate
Mathematical State
   ↓
Graph / Points / Curves / Tables / Geometry
~~~

사용자는 그래프를 '그리는' 대신 수학 표현을 입력하고, 화면은 그 의미를 즉시 시각화합니다.

## 2. Graphing Calculator 화면

공식 2026 사용자 가이드에서 초기 화면의 중심은 두 영역입니다.

- expression list
- graph paper

표현식 목록에 다음을 입력할 수 있습니다.

- 좌표
- 수식
- 방정식
- 함수
- 표 등

입력과 동시에 그래프가 생성됩니다.

### UX 핵심

- 왼쪽은 '수학의 원인'
- 오른쪽은 '시각적 결과'

라는 관계가 명확합니다.

이 2-pane 구조는 수학적 인과관계를 화면 배치로 설명합니다.

## 3. Points of Interest

공식 도움말은 그래프에 x/y 절편 등 관심 지점을 표시하는 기능을 설명합니다.

중요한 점은 모든 계산 결과를 텍스트로 나열하지 않고 **사용자가 탐색할 가능성이 높은 의미 지점을 그래프 위 affordance로 노출**한다는 것입니다.

신규 도구에서도 다음처럼 적용할 수 있습니다.

- 교점
- 중점
- 극값
- 대칭축
- 동일 길이
- 동일 넓이
- 정수 좌표

등을 상황에 따라 약하게 제안할 수 있습니다.

## 4. Geometry의 화면 구성

2026 공식 Geometry 가이드는 네 가지 주요 영역을 설명합니다.

1. geometry toolbar
2. graph paper
3. token navigator
4. expression list

즉 Geometry도 순수 그림 앱으로 만들지 않고 **작도 객체를 표현식/토큰과 연결**합니다.

### Token Navigator의 의미

화면 객체가 단순 canvas shape가 아니라 다른 식/객체에서 참조 가능한 **명명된 수학 토큰**임을 UX로 드러냅니다.

이 접근은 GeoGebra의 객체 중심 구조와 닮았지만, 사용자에게 보이는 중심은 GeoGebra Classic보다 expression workflow 쪽에 가깝습니다.

## 5. Geometry + Graphing 결합

공식 가이드는 Geometry 안에 Graphing Calculator가 내장되어 있다고 설명합니다.

따라서

~~~text
Construction
  ↔ Measurements / object references
  ↔ Expressions
  ↔ Graph
~~~

의 연결이 가능합니다.

### 설계 가치

별도의 '기하 앱 데이터'와 '그래프 앱 데이터'를 완전히 분리하기보다 공유 가능한 수학 표현 계층을 두는 것이 좋습니다.

## 6. 3D

Desmos 3D는 expression list와 3D cube/axes를 결합합니다.

지원되는 대표 탐구:
- 3D 점
- 곡선
- 표면
- 매개변수 표현
- 회전체
- 애니메이션

중요한 점은 2D Graphing과 마찬가지로 **3D에서도 expression-first 문법을 유지**한다는 것입니다.

서비스가 2D→3D로 확장될 때 UX 문법을 바꾸지 않는 사례입니다.

## 7. 정확 입력과 직접 조작의 균형

Desmos는 숫자/식 입력의 정확성과 그래프 드래그/슬라이더의 직접 조작을 섞습니다.

좋은 패턴:

~~~text
precise symbolic input
      ↕
direct manipulation
      ↕
immediate visual feedback
~~~

수학 도구에서 '정확성'과 '직관성'을 서로 다른 모드로 분리하기보다 연결합니다.

## 8. 슬라이더와 동적 변수

Desmos의 대표적 인터랙션은 변수값 변화가 그래프에 즉시 반영되는 슬라이더입니다.

구조적으로는 다음 패턴입니다.

~~~text
parameter a
  → expression f(x,a)
  → derived graph
  → animation / drag
~~~

학생은 식의 한 기호를 '움직이는 값'으로 경험합니다.

이는 추상 기호를 물리적 조절기로 바꾸는 대표적인 UI 패턴입니다.

## 9. 접근성

### Audio Trace
2026 공식 도움말에서 Audio Trace는 그래프를 소리로 탐색하게 합니다.

즉 그래프의 representation이
- visual
- keyboard navigation
- sound

로 확장됩니다.

### MathQuill
Amplify Classroom의 공식 접근성 문서는 수학식 입력에 MathQuill 기술을 사용한다고 밝힙니다.

또한
- keyboard shortcuts
- braille
- Audio Trace

등을 지원합니다.

## 10. Classroom의 현재 위치

2026년 현재 예전 'Desmos Classroom'은 **Amplify Classroom**으로 제공됩니다.

공식 페이지는 이를
'formerly Desmos Classroom'이라고 명시합니다.

따라서 분석 문서에서 계산기와 수업 플랫폼을 구분해야 합니다.

~~~text
Desmos calculators
  ├─ Graphing
  ├─ Geometry
  ├─ Scientific
  └─ 3D

Amplify Classroom
  ├─ lesson/activity
  ├─ student response
  ├─ teacher facilitation
  └─ embedded math interactions
~~~

## 11. K-5까지 확장된 수업 플랫폼

Amplify Classroom에는 2026년 현재 PreK–5부터 고등학교까지 수업 컬렉션이 존재합니다.

또한 Polypad Virtual Manipulatives도 같은 Classroom 생태계에 포함됩니다.

즉 **expression-first calculator와 manipulative-first Polypad가 수업 플랫폼에서 합쳐지는 구조**입니다.

이 점은 범용 수학 도구를 만들 때 중요한 힌트입니다.

하나의 편집기가 모든 수학을 해결할 필요 없이

~~~text
Classroom Shell
  ├─ Calculator interaction
  ├─ Geometry interaction
  ├─ Polypad interaction
  ├─ Text / prompt
  └─ student response
~~~

로 여러 전문 도구를 조합할 수 있습니다.

## 12. 내부 구조 추정 시 주의

Desmos 핵심 계산기 엔진의 현행 전체 저장소가 공식적으로 공개되어 있다고 확인하지 못했습니다.

따라서 다음 같은 실제 폴더 구조는 **작성하지 않습니다**.

- src/components/...
- src/graph/...
- React 여부
- 내부 state management library

공식 도움말, 웹 동작, 공개된 통합 문서에서 확인 가능한 수준까지만 사용합니다.

## 13. 분석용 예상 계층

아래는 **[INFERRED]**입니다.

~~~text
Expression Editor
  ↓
Parser / Evaluator
  ↓
Math State / References
  ├─ Graph Renderer
  ├─ Table
  ├─ Geometry Objects
  └─ Accessibility Representation
      ├─ screen reader
      ├─ braille
      └─ audio trace
~~~

핵심은 프레임워크가 아니라 **expression state가 여러 표현의 source of truth 역할을 한다는 설계**입니다.

## 14. 강점

1. 식과 그래프의 인과 관계가 화면 배치부터 명확합니다.
2. 입력 즉시 결과가 보여 탐구 사이클이 빠릅니다.
3. 슬라이더로 추상 변수를 직접 조작 가능하게 만듭니다.
4. Geometry에서도 표현식과 객체 참조를 유지합니다.
5. 3D에서도 기존 expression 문법을 유지합니다.
6. 접근성 표현을 별도 기능이 아닌 수학 표현의 또 다른 채널로 봅니다.

## 15. 약점/주의점

1. 저학년에게 expression list는 진입 장벽이 큽니다.
2. 그래프 중심 사고가 필요하지 않은 초등 수모형 영역에는 과도합니다.
3. 자유로운 도형 제작보다 수학 표현을 이해해야 강점을 얻습니다.
4. 현재 Classroom/Calculator/Polypad 브랜드와 서비스 경계가 예전보다 복잡해졌습니다.

## 16. 가져올 패턴

- 한쪽에 원인, 다른 쪽에 결과를 놓는 2-pane
- 한 개의 수학 state에서 여러 representation 파생
- 변수 → slider
- points of interest
- geometry object token/reference
- 2D/3D 간 입력 문법 유지
- visual/auditory/braille representation 병렬화
- 수업 플랫폼이 전문 math widget들을 조합하는 구조

## 17. 주요 출처

- https://help.desmos.com/hc/en-us/articles/202529279-Desmos-Graphing-Calculator-User-Guide
- https://help.desmos.com/hc/en-us/articles/4406040715149-Getting-Started-Desmos-Graphing-Calculator
- https://help.desmos.com/hc/en-us/articles/25041924352909-Desmos-Geometry-Tool-User-Guide
- https://help.desmos.com/hc/en-us/articles/15316366009997-Getting-Started-Desmos-Geometry
- https://help.desmos.com/hc/en-us/articles/25042283517069-Desmos-3D-User-Guide
- https://help.desmos.com/hc/en-us/articles/37064105800333-Audio-Trace
- https://classroom.amplify.com/
- https://service.amplify.com/article/ac-math-inputs-accessibility
