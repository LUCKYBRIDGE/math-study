# Graspable Math 정밀 분석

- 공식 사이트: https://graspablemath.com/
- 학습 가이드: https://graspablemath.com/learn
- 조사 기준: 2026-11
- 핵심 앱 전체 소스: **현행 공식 공개 저장소 확인 안 됨**

## 1. 핵심 아이디어

Graspable Math의 가장 중요한 아이디어는 **수학 기호를 정적인 글자가 아니라 직접 잡고 움직일 수 있는 객체로 바꾸는 것**입니다.

공식 설명은 이를 dynamic algebra notation system으로 설명합니다.

~~~text
기호를 클릭/드래그
  → 제스처 해석
  → 대수적으로 허용되는 변환인지 검사
  → 식 구조 변환
  → 애니메이션으로 새 식 표시
  → derivation history 유지
~~~

이는 일반 equation editor와 근본적으로 다릅니다.

## 2. Gesture-first Algebra

대표 행동:
- 항의 순서 바꾸기
- 두 수 결합
- 같은 종류의 항 결합
- 항을 등호 반대편으로 이동
- 분배
- 치환
- 식 다시 쓰기
- drag and drop
- term selection

사용자는 메뉴에서 '이항'을 누르는 대신 수식의 항 자체를 움직입니다.

## 3. Algebra를 공간 동작으로 번역

전통 대수:
- 규칙을 외움
- 종이에 변형 단계를 씀

Graspable Math:
- 항을 잡음
- 가능한 위치로 이동
- 시스템이 동치 변환을 수행

즉

~~~text
symbolic rule
  ↔ spatial gesture
~~~

의 매핑을 구축합니다.

이 설계는 초등에서
- 등식
- 교환법칙
- 결합법칙
- 분배법칙
- 분수 변형

등을 시각적으로 풀 때 참고할 가치가 큽니다.

## 4. Legal Transform Engine

공식 Canvas User Guide는 수학적으로 허용되는 이동은 식을 동치 상태로 변환하고, 허용되지 않는 행동은 즉각 피드백한다고 설명합니다.

불법 조작 예:
- 흔들림
- 원래 위치로 돌아감

즉 핵심은 drag 기능이 아니라 **algebra legality checker**입니다.

분석용 구조:

~~~text
Gesture
  ↓
Target / Source selection
  ↓
Candidate Operation
  ↓
Precondition Check
  ├─ valid → rewrite
  └─ invalid → reject feedback
~~~

## 5. Expression Tree가 필요해지는 이유

**[INFERRED]**

수식 문자열만으로는 '어떤 항을 잡았는가'와 '어디에 놓았는가'를 안정적으로 처리하기 어렵습니다.

따라서 개념적으로는 다음과 같은 구조가 필요합니다.

~~~text
Equation
├─ Left Expression Tree
├─ Relation
└─ Right Expression Tree
~~~

각 node가
- literal
- variable
- operator
- fraction
- group
- function

등의 의미를 가져야 gesture를 수학 연산으로 해석할 수 있습니다.

실제 내부 자료구조 이름은 공개 근거가 없으므로 단정하지 않습니다.

## 6. Rewrite Rule

대수 조작을 다음처럼 rule로 모델링할 수 있습니다.

~~~text
commute(a + b) → b + a
combine(2 + 3) → 5
distribute(a(b+c)) → ab + ac
moveAcrossEquals(x + a = b) → x = b - a
~~~

중요한 것은 단순 문자열 치환이 아니라
- 적용 조건
- 적용 위치
- 동치성
- 변환 애니메이션
- history

를 함께 관리하는 것입니다.

## 7. Immediate Feedback

Graspable Math의 강점은 정답 제출 뒤 피드백이 아니라 **매 동작마다 수학적으로 가능한지 알려주는 것**입니다.

이는 학습자가 규칙을 외운 후 검사받는 구조에서

~~~text
시도
 → 피드백
 → 규칙 추론
 → 다음 시도
~~~

로 학습 흐름을 바꿉니다.

## 8. Derivation History

공식 학습 메뉴에는 Derivations가 별도 주제로 존재합니다.

대수 학습에서 최종식만 저장하는 것보다

~~~text
state0
  --operation1-->
state1
  --operation2-->
state2
~~~

를 유지하는 것이 중요합니다.

이 정보는
- undo/redo
- 풀이 과정 재생
- 학생 전략 분석
- 교사 피드백
- AI 설명 생성

에 활용할 수 있습니다.

## 9. Term Tracing

공식 학습 메뉴에는 term tracing이 있습니다.

이는 변형 전후에 특정 항이 어디로 이동/변환되었는지 추적하는 기능으로 볼 수 있습니다.

대수 UI의 큰 문제는 식이 바뀌면 학생이 '내가 보던 항이 어디 갔는지' 놓치는 것입니다.

따라서 변형 애니메이션은 장식이 아니라 **object identity continuity**를 보존하는 역할을 합니다.

## 10. Scrubbing Numbers

공식 튜토리얼에는 숫자 scrubbing도 포함됩니다.

숫자를 텍스트 입력만으로 바꾸지 않고 직접 변화시키며 결과를 확인하는 방식은 Desmos slider와 비슷한 효과를 더 직접적인 기호 수준에서 제공합니다.

## 11. Canvas 도구

공식 Learn 페이지에서 확인되는 기능 범주:
- canvas basics
- simplifying expressions
- commutative/distributive properties
- solving equations
- term tracing
- scrubbing numbers
- derivations
- on-screen keyboard
- rewriting expressions
- saving/loading/sharing
- Google Classroom integration
- undo/redo
- term selection
- substitution
- placeholders
- drag and drop

즉 순수 algebra manipulator뿐 아니라 수업용 작업공간 기능이 함께 있습니다.

## 12. UI 설계에서 중요한 점

### selection granularity
사용자가
- 숫자 하나
- 항 하나
- 괄호 그룹
- 분수 전체
- 식 전체

중 무엇을 잡으려는지 구분해야 합니다.

수학 편집기에서 일반 텍스트 selection보다 훨씬 어려운 문제입니다.

### drop target
드래그하는 위치가 단순 x/y가 아니라
- 같은 level의 앞/뒤
- 다른 항 위
- 등호 반대편
- 분자/분모
- 괄호 안

같은 semantic target입니다.

## 13. 상태 머신

예: 항을 다른 항 위로 드래그해 결합

| 상태 | 행동 | 검사 | 결과 |
|---|---|---|---|
| idle | term pointer down | selectable? | dragging |
| dragging | 이동 | 후보 target 탐색 | preview |
| preview | target 위 hover | rule applicable? | valid/invalid cue |
| release | pointer up | valid | rewrite commit |
| release | pointer up | invalid | snap back |

이 구조는 도형 스냅 시스템과도 닮았습니다.

## 14. 강점

1. 추상 대수 규칙을 직접 조작으로 변환
2. 잘못된 행동에 즉시 의미 있는 피드백
3. 변형 과정을 history로 보존
4. 항 identity를 애니메이션으로 유지
5. 메뉴 명령보다 탐구가 앞섬
6. 수학 규칙을 interaction constraint로 내장

## 15. 한계/위험

1. 제스처 문법을 처음 배워야 함
2. 학생이 '끌면 넘어간다'만 기억하고 원리를 언어화하지 않을 위험
3. 복잡한 식에서는 selection granularity가 어려움
4. 모바일 작은 화면에서 정확한 term targeting 문제
5. 모든 대수 변형을 직관적 제스처로 만들기 어려움
6. 시스템이 허용하는 풀이 경로가 학생의 다양한 전략을 제한할 수 있음

## 16. 가져올 패턴

- semantic drag
- legal transform engine
- invalid snapback
- expression node selection
- derivation history
- term identity animation
- rule registry
- gesture preview
- operation log 기반 설명

## 17. 추천 공통 구조

~~~text
algebra/
  parser/
  ast/
  equivalence/
  rules/
    commute
    associate
    distribute
    combine
    transpose
  gestures/
  selection/
  animation/
  derivation/
~~~

이는 Graspable Math의 실제 폴더 구조가 아니라 분석에서 추출한 재구성 권장안입니다.

## 18. 주요 출처

- https://graspablemath.com/learn
- https://www.graspablemath.com/learn/simplifying-expressions
- https://graspablemath.com/shared/content/GM%20Canvas%20User%20Guide%202020-09-01.pdf
- https://graspablemath.com/shared/content/gm-summary-sheet.pdf

## 19. 공개 GitHub 주의

eweitnauer/gm-api 등 관련 공개 저장소가 검색되지만, 이를 2026년 현행 Graspable Math 전체 앱의 소스 구조로 간주하지 않습니다. 역사적/부분적 통합 자료로만 별도 검토해야 합니다.
