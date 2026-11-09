# Mathigon Polypad 정밀 분석

- 공식 Polypad: https://mathigon.org/polypad
- 공개 API 문서: https://github.com/mathigon/documentation/tree/main/polypad
- 교육 콘텐츠 저장소: https://github.com/mathigon/textbooks
- 조사 기준: 2026-11
- 분석 신뢰도: **[VERIFIED-SOURCE] API/상태 스키마 및 교육 콘텐츠 통합 코드 확인**

## 1. 핵심 정체성

Polypad는 하나의 범용 계산기라기보다 **수학 교구를 무한/고정 캔버스 위에 놓고 직접 조작하는 문서형 수학 작업공간**입니다.

핵심 문법은 다음과 같습니다.

~~~text
사이드바에서 수학 객체 선택
  → 캔버스에 배치
  → 이동/회전/뒤집기/복제/결합
  → 그리기·텍스트·수식과 섞기
  → 상태 직렬화/공유
~~~

식 입력을 출발점으로 하는 Desmos와 반대편에 있고, MLC의 가상 교구보다 훨씬 많은 객체 유형을 한 캔버스에 통합합니다.

## 2. 공식 API가 공개한 실제 문서 모델

Polypad 공식 API 문서에서 캔버스 상태는 크게 두 종류의 객체로 구성됩니다.

~~~ts
PolypadData
  ├─ title
  ├─ version
  ├─ options
  ├─ tiles: Record<string, TileData>
  └─ strokes: Record<string, StrokeData>
~~~

### TileData 핵심 속성

- name: 타일 종류
- x, y: 위치
- rot: 회전
- color
- isFlipped
- status: locked / fixed / hidden
- altText
- layer
- labels
- cables

즉 타일은 단순 SVG 조각이 아니라 **수학적 종류 + 공간 상태 + 접근성 + 연결 관계를 가진 문서 객체**입니다.

### StrokeData

- points
- color
- brush: pen / marker / highlighter

자유그리기는 tile과 분리된 별도 객체군입니다.

이 분리는 중요합니다.

~~~text
semantic math objects = tiles
free annotation         = strokes
~~~

수학 의미가 있는 객체와 자유 필기를 같은 자료구조로 억지로 합치지 않습니다.

## 3. Viewport를 문서 상태와 분리

공식 API에서 viewport는 별도 메서드로 관리됩니다.

- getViewport()
- setViewport()
- resetViewport()

그리고 문서 serialize 대상과 별도로 설명됩니다.

이 구조의 의미:

- '학생이 무엇을 만들었는가'와
- '학생이 어느 위치를 보고 있었는가'

를 구분할 수 있습니다.

신규 수학 캔버스에서도 강하게 추천할 패턴입니다.

## 4. 캔버스 종류

PolypadOptions에는 캔버스 유형이 있습니다.

- infinite
- notebook
- fixed

즉 같은 수학 객체 엔진을 사용하더라도 수업 맥락에 따라 공간의 성격을 바꿀 수 있습니다.

### 활용 해석

- infinite: 자유 탐구/브레인스토밍
- notebook: 학습지와 비슷한 세로 흐름
- fixed: 교사가 만든 활동/문제

## 5. UI를 설정값으로 제한

공식 API는 toolbar, settings, sidebar, actionbar에 표시할 항목을 설정할 수 있게 합니다.

또한
- noCopyPaste
- noUndoRedo
- noPinchPan
- noDeleting
- noRotating
- noSnapping
- largeUI
- highContrast

등을 제공합니다.

이 방식은 매우 교육적입니다.

기능을 '초급 모드'라는 별도 앱으로 복제하지 않고, **같은 엔진에서 과제에 필요한 affordance만 노출**할 수 있습니다.

## 6. 실제 도구 범주

공식 문서에서 확인되는 sidebar 범주는 매우 넓습니다.

- geometry
- polygons
- polyominoes
- tangram
- solids
- measuring
- numbers
- number bars
- number frames
- number line
- fractions
- fraction bars
- fraction circles
- algebra
- balance
- axes
- sliders
- probability
- charts
- playing cards
- dice
- clocks
- dominoes 등

수학 영역별 앱을 만드는 대신 **tile registry**로 확장하는 구조입니다.

## 7. Tile Registry 관점

tiles.md에서 개별 타일이 실제 데이터 스키마로 정의됩니다.

예:

### Fraction Bar
- denominator
- count
- active
- combine
- size

### Number Line
- start
- step
- width
- size
- minor
- arrows
- simplify
- prefix/suffix

### Slider
- variable
- min
- max
- stepN
- playback
- duration
- value

### Polyhedron
- net
- hinge
- rotation

이 구조를 일반화하면

~~~text
Tile Definition
  ├─ type/name
  ├─ domain properties
  ├─ visual properties
  ├─ interaction rules
  └─ serialization schema
~~~

가 됩니다.

새 수학 교구를 추가할 때 캔버스 자체를 다시 만드는 대신 tile type을 추가하는 방식이 가능합니다.

## 8. 입체도형과 전개도에 특히 중요한 구조

Polyhedron Tile에 다음 속성이 공개되어 있습니다.

- net
- hinge
- rotation

이것은 입체와 전개도의 관계를 단순 이미지가 아니라 **접힘 구조를 가진 데이터**로 표현하는 단서입니다.

전개도 도구를 설계할 때 매우 좋은 비교 기준입니다.

~~~text
faces / net
  + hinge
  + rotation
  → foldable solid representation
~~~

## 9. Event 모델

공식 API는 다음 이벤트를 제공합니다.

- change
- viewport
- undo
- redo
- selection
- move
- export

특히 change 이벤트는 추가/삭제/수정된 tile/stroke의 이전/새 상태를 제공합니다.

이는 다음 기능에 유리합니다.

- custom undo/redo
- 협업 sync
- 자동 저장
- 학생 행동 로그
- 평가 이벤트
- replay

## 10. History 설계

API에는 undo(), redo()가 있습니다.

또한 change 이벤트가

~~~text
id → [previous, updated]
~~~

형태의 변경 집합을 제공하므로 변화량 기반 history를 구성하기 쉽습니다.

중요한 점은 이동 중 매 프레임이 아니라 **move/rotate가 끝난 뒤 change를 묶는 것**입니다.

이 패턴은 학생의 드래그 1회를 undo 1회로 취급하는 자연스러운 UX에 적합합니다.

## 11. Paste 시 ID 처리

공식 API는 paste()가
- tile ID
- dynamic geometry key
- connection cable

충돌을 정리해 같은 데이터를 여러 번 붙여넣을 수 있도록 한다고 설명합니다.

복사/붙여넣기에서 단순 JSON clone만 하면 참조 ID가 충돌할 수 있다는 문제를 명시적으로 해결한 것입니다.

수학 객체 편집기에서 매우 중요합니다.

## 12. 접근성

공식 API에서 확인되는 기능:

- altText
- keyboard event binding
- keyboard 이동
- focus 이동
- highContrast
- largeUI
- noAudio / noMusic
- sonification 관련 옵션

keyboard shortcut 예:
- Ctrl+Z / redo
- Delete
- C 복제
- Ctrl+A
- copy/paste
- Space+pan
- R 회전
- arrow 이동

즉 마우스/터치 캔버스를 키보드로도 조작할 수 있도록 설계합니다.

## 13. 기술 요소

공식 문서에서 직접 확인되는 기술:
- JavaScript API
- Custom Web Components
- Web Animations API
- JSON serialization
- ResizeObserver 사용 설명

내부 프레임워크 전체 구조는 API 문서만으로 단정하지 않습니다.

## 14. Mathigon 교육 콘텐츠와 연결

공개 mathigon/textbooks 저장소에서는 Polypad를 학습 단계 안에 삽입하는 실제 사례를 확인할 수 있습니다.

예:
- content/polyhedra/content.md
- content/polyhedra/functions.ts

tessellationDrawing 함수에서는
- x-polypad를 가져오고
- 타일 소스를 바인딩하고
- move/rotate/add 이벤트를 감시하고
- polygon collision을 검사하고
- 일정 수의 도형을 추가하면 학습 score를 기록합니다.

즉 Polypad는 단순 독립 앱이 아니라

~~~text
lesson content
  + embedded manipulative
  + event listener
  + validation/hint
  + progress score
~~~

로 학습 활동 엔진에 들어갈 수 있습니다.

이 구조가 매우 중요합니다.

## 15. 교육용 validation의 방식

Mathigon 공개 콘텐츠 코드에는 학생이 만든 도형을 검사하고

- 잘못된 경우 hint
- 조건 충족 시 score
- 특정 도형은 삭제/재시도

시키는 사례가 있습니다.

따라서 자유 조작 캔버스와 정답형 학습을 별개로 만들지 않고 **캔버스 이벤트 위에 과제 검증 레이어를 얹는 방식**이 가능합니다.

## 16. 강점

1. 수학 조작물을 한 캔버스에 통합
2. JSON 상태 모델이 명료함
3. tile과 stroke 분리
4. viewport 분리
5. UI 노출 범위를 과제별로 제한 가능
6. 이벤트 기반 수업/평가 연동이 쉬움
7. 복사/붙여넣기의 참조 충돌까지 고려
8. 키보드/접근성 옵션이 풍부
9. 전개도·대수·확률·수모형을 같은 문서 문법으로 다룸

## 17. 구조적 한계

1. tile 종류가 너무 많아지면 사이드바 탐색 비용 증가
2. 모든 수학을 tile로 추상화하면 복잡한 관계 기반 동적 기하에는 한계 가능
3. 자유 캔버스는 교사의 목표가 불분명하면 장난감처럼 사용될 수 있음
4. tile 스키마가 커질수록 backward compatibility 관리 필요
5. 전체 앱 내부 소스 구조와 API 공개 범위는 구분해야 함

## 18. 가져올 패턴

- Tile Registry
- Tile / Stroke 분리
- Document / Viewport 분리
- JSON serialization
- configurable toolbar/sidebar
- event-based validation
- ID-safe paste
- math canvas embed
- 과제별 capability restriction
- foldable polyhedron의 net/hinge 구조

## 19. 주요 공개 파일

- mathigon/documentation/polypad/index.md
- mathigon/documentation/polypad/tiles.md
- mathigon/textbooks/content/polyhedra/content.md
- mathigon/textbooks/content/polyhedra/functions.ts

## 20. 주요 출처

- https://mathigon.org/polypad
- https://github.com/mathigon/documentation/tree/main/polypad
- https://github.com/mathigon/textbooks
- https://mathigon.org/courses
