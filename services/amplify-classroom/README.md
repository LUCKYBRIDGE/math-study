# Amplify Classroom 정밀 분석

- 공식: https://classroom.amplify.com/
- 소개: https://amplify.com/classroom/
- 과거 명칭: Desmos Classroom
- 주 유형: 수업 제작 + 실시간 오케스트레이션
- 조사 기준: 2026-11

## 1. Math Tool이 아니라 Lesson Platform

Amplify Classroom을 Desmos Graphing과 같은 범주로 보면 안 됩니다.

핵심은:

~~~text
Lesson
  ├─ ordered screens
  ├─ prompt/content
  ├─ interactive math widgets
  ├─ student response
  └─ teacher orchestration
~~~

수학 엔진 자체보다 **학생의 여러 수학 활동을 한 수업 흐름으로 묶는 shell**입니다.

## 2. 현재 공식 기능

공식 사이트에서 확인:
- K-12
- math/literacy/science
- 1,000개 이상 interactive lesson
- premade lesson customize
- drag-and-drop lesson builder
- Starter Screens
- Polypad
- Desmos classics
- teacher dashboard
- real-time student thinking
- pacing
- pause/advance
- student work selection
- anonymous sharing

## 3. Screen 기반 수업 모델

가장 중요한 추상화는 'page'보다 **lesson screen**입니다.

각 screen은:
- 설명
- 질문
- graph
- multiple choice
- image
- manipulative
- student input
등을 가질 수 있습니다.

이 구조는 수학 앱을 직접 하나로 합치는 것보다 훨씬 확장성이 좋습니다.

~~~text
Lesson Shell
  → Screen Registry
      → Graph Screen
      → Polypad Screen
      → Choice Screen
      → Text Response Screen
~~~

## 4. Teacher Dashboard

공식 FAQ에서 교사는 학생 응답과 생각을 실시간으로 볼 수 있습니다.

따라서 상태를 두 층으로 구분해야 합니다.

~~~text
Student Interaction State
Teacher Observation State
~~~

교사는 학생 workspace를 직접 소유하기보다 관찰/조정하는 역할을 갖습니다.

## 5. Pacing Controls

공식 기능:
- lesson pause
- 특정 screen으로 학생 진행
- 전체 학생을 동시에 advance

이는 일반 LMS의 과제 제출과 다른 **synchronous orchestration**입니다.

### 시스템 모델

~~~text
Class Session
├─ current pacing policy
├─ student progress map
├─ response stream
└─ teacher commands
~~~

## 6. Select and Sequence

공식 사이트는 학생 작업을 선택해 수업 토론에서 공유할 수 있다고 설명합니다.

이것은 단순 monitor보다 교육적으로 중요합니다.

~~~text
student work
 → teacher notices strategy
 → snapshot/select
 → sequence
 → anonymous class display
 → discussion
~~~

수학적 사고를 비교하는 수업 구조를 시스템 기능으로 지원합니다.

## 7. Anonymous Sharing

학생 이름을 숨기고 작업만 공유할 수 있습니다.

이는:
- 발표 부담 완화
- 오류를 학습 자원으로 사용
- 전략 중심 토론
에 유리합니다.

신규 classroom 기능에서는 '공유'를 단순 URL 공유가 아니라 **수업용 공개 수준 제어**로 설계할 필요가 있습니다.

## 8. Polypad + Desmos 결합의 의미

Amplify Classroom에는 Polypad manipulatives와 Desmos classics가 함께 존재합니다.

따라서 하나의 거대한 수학 엔진보다

~~~text
classroom shell
  + specialized math widgets
~~~

가 실제 교육 플랫폼에서 효과적일 수 있음을 보여줍니다.

예:
- 저학년: manipulative
- 중등: graph
- 서술: text
- 토론: snapshot

을 한 lesson에서 조합할 수 있습니다.

## 9. Lesson Builder UX

공식 설명은 drag-and-drop lesson builder를 강조합니다.

교사는 개발자가 아니므로
- component palette
- ordered screens
- direct preview
- copy/edit
- starter template
같은 authoring UX가 중요합니다.

수학 서비스가 교사용 콘텐츠 제작까지 지원한다면 '코드 작성'이나 복잡한 조건 UI보다 template-first가 적합합니다.

## 10. Google Classroom 연동

공식 FAQ에서:
- Google sign-in
- Google Classroom roster import
- Amplify 고객의 Clever integration
이 확인됩니다.

이는 classroom shell이 외부 roster system과 분리되어 있음을 시사합니다.

## 11. 강점

1. 수학 전문 위젯을 lesson 단위로 조합
2. 실시간 학생 사고 확인
3. teacher pacing
4. select/sequence
5. anonymous sharing
6. template 기반 authoring
7. K-12 범위

## 12. 주의점

1. 강력한 teacher control이 학생 자율성을 낮출 수 있음
2. screen 중심 수업이 지나치면 활동이 잘게 끊길 수 있음
3. 전문 math widget의 내부 상태와 lesson response state를 어떻게 연결하는지가 기술적으로 중요
4. 브랜드가 Desmos Classroom에서 Amplify Classroom으로 변경되어 과거 자료와 현재 기능을 구분해야 함

## 13. 가져올 패턴

- lesson screen registry
- widget embed
- student response stream
- teacher dashboard
- pacing command
- snapshot
- select and sequence
- anonymous share
- template/starter screen
- roster adapter

## 14. 출처

- https://classroom.amplify.com/
- https://amplify.com/classroom/
