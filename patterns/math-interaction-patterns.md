# 수학 교육 도구에서 반복되는 설계 패턴

## 1. Math Object + Representation 분리

수학 객체와 화면 모양을 같은 데이터로 취급하지 않는 편이 확장성이 좋습니다.

~~~text
MathObject
  ├─ Point
  ├─ Segment
  ├─ Polygon
  ├─ Fraction
  ├─ Expression
  └─ DataSet

Representation
  ├─ Canvas2D
  ├─ Scene3D
  ├─ Formula
  ├─ Table
  ├─ Manipulative
  └─ AccessibleDescription
~~~

하나의 수학 객체가 여러 표현을 가질 수 있어야 식-그래프-표 연결이 쉬워집니다.

## 2. Dependency Graph

GeoGebra형 핵심 패턴입니다.

~~~text
Point A ─┐
         ├─ Segment AB ── Midpoint M
Point B ─┘
~~~

A나 B가 움직이면 AB와 M은 다시 계산됩니다.

### 장점
- 동적 기하
- 파생 객체 자동 갱신
- 계산 이력 설명 가능

### 주의
- 삭제 전파 규칙
- 순환 의존성 방지
- 대규모 그래프의 재계산 비용
- Undo/Redo에서 파생 객체 복구

## 3. Tool State Machine

알지오매스 키즈 같은 작도형 UI에서 특히 중요합니다.

~~~text
idle
  → toolSelected
  → awaitingFirstObject
  → awaitingSecondObject
  → validate
  → commit
  → idle
~~~

도구마다 if 문을 흩뿌리기보다 공통 인터랙션 상태 머신이 필요합니다.

## 4. Gesture → Semantic Operation

Graspable Math가 극단적으로 잘 보여주는 패턴입니다.

'오른쪽으로 80px 드래그'를 저장하는 것이 아니라

~~~text
moveTermAcrossEquals(termId)
commute(a, b)
combineLikeTerms(a, b)
factor(group)
~~~

처럼 **의미 연산**으로 바꾸는 방식입니다.

장점은 이력·설명·평가·재생성이 쉬워진다는 점입니다.

## 5. Semantic Snapping

그래픽 편집기의 스냅을 수학적으로 확장합니다.

- 격자점
- 선 위
- 중점
- 같은 길이
- 같은 각
- 분수 조각의 경계
- 수직/평행
- 큐브 격자

스냅은 단순 편의가 아니라 '현재 가능한 수학 관계'를 암시합니다.

## 6. Legal / Illegal Action Feedback

대수나 기하에서 잘못된 행동을 막을 때 모달 경고보다 **행동 자체의 실패 피드백**이 좋습니다.

- snap back
- 흔들림
- 짧은 하이라이트
- 왜 불가능한지 한 줄 설명
- 가능한 대상으로 가이드

단, 매번 차단만 하면 탐구가 막히므로 '자유 그리기 모드'와 '수학 제약 모드'를 구분할 수 있습니다.

## 7. Multiple Representations, One Source of Truth

Desmos/GeoGebra형 패턴입니다.

~~~text
Expression State
   ├─ Formula view
   ├─ Graph view
   ├─ Table view
   └─ Accessible audio/text view
~~~

각 뷰가 서로를 직접 수정하면 동기화가 깨집니다. 공통 모델을 수정하고 뷰는 이를 반영하는 편이 안정적입니다.

## 8. Tile/Stroke Document

Polypad형 패턴입니다.

~~~ts
type Document = {
  tiles: Record<string, Tile>
  strokes: Record<string, Stroke>
  options: CanvasOptions
}
~~~

수학 교구, 자유그리기, 텍스트를 하나의 문서에 넣을 때 강력합니다.

핵심은 **viewport를 문서 상태와 분리할지**입니다. Polypad API는 viewport를 문서 상태와 별도로 취급합니다. 공유했을 때 '무엇을 만들었는가'와 '어디를 보고 있었는가'를 분리할 수 있습니다.

## 9. Open-ended Manipulative

MLC형 패턴입니다.

정답 입력 UI를 먼저 만들지 않고, 학생이 전략을 표현할 수 있는 조작물을 제공합니다.

예:
- 수직선 점프
- 10진 블록
- 수 배열표 스탬프
- 분수 막대 겹치기
- 지오보드 밴드

평가가 필요하면 조작 상태에서 의미 정보를 추출하는 별도 계층을 둡니다.

## 10. Simulation-specific Screen

PhET형 패턴입니다.

모든 수학 개념을 하나의 범용 편집기에 넣지 않고, 개념별로 가장 적합한 화면 은유를 설계합니다.

장점:
- 개념 집중
- 낮은 UI 복잡도
- 원인-결과 탐색에 강함

단점:
- 공통 문서 형식이 약해질 수 있음
- 기능 재사용이 어려워질 수 있음
- 학생 작업을 하나의 포트폴리오로 묶기 어려움

## 11. Progressive Disclosure

초등 수학 도구에는 특히 필요합니다.

- 기본 도구만 먼저 보임
- 선택한 객체에 필요한 속성만 표시
- 고급 옵션은 접기
- 학년/단원에 따라 도구 세트 변경
- 교사가 허용 도구를 제한

'전체 기능을 숨긴 단순 모드'보다 **학습 과제에 필요한 도구 집합 자체를 구성 가능**하게 하는 쪽이 좋습니다.

## 12. History는 UI 변화가 아니라 수학 명령으로

나쁜 예:
- x 좌표 12→13
- 색 변경
- 객체 배열 변경

좋은 예:
- createSegment(A,B)
- reflect(polygon, axis)
- splitFractionBar(6)
- moveTermAcrossEquals(x)
- stackCube(2,1,4)

명령 기반 history는 Undo/Redo뿐 아니라 학생 풀이 과정 재생, 교사 분석, 자동 설명에도 사용할 수 있습니다.

## 13. 공유는 스크린샷이 아니라 상태 공유

최소 단계:

~~~text
Document State
  → serialize
  → short id / URL
  → load
  → exact reconstruction
~~~

초등 교실에서는 계정 기반 협업보다 **짧은 코드**가 진입장벽이 낮습니다. MLC의 8자리 공유 코드 같은 방식이 좋은 비교 대상입니다.

## 14. 추천 공통 아키텍처

~~~text
app/
  shell/
  workspace/
domain/
  objects/
  operations/
  constraints/
  evaluators/
interaction/
  tools/
  gestures/
  selection/
  snapping/
state/
  document/
  history/
  serialization/
views/
  canvas2d/
  scene3d/
  formula/
  table/
  manipulatives/
classroom/
  share/
  assignments/
  submissions/
accessibility/
  keyboard/
  screenreader/
  sonification/
~~~

이 구조는 특정 서비스의 복제안이 아니라 여러 서비스에서 관찰된 강점을 결합한 분석용 기준 아키텍처입니다.
