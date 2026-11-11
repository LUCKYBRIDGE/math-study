# 기술·시스템 비교 매트릭스

> 확인 가능한 공개 코드와 공식 문서를 우선합니다. 비공개 앱은 근거 없는 프레임워크 추정을 하지 않습니다.

## 1. 기술 구조 요약

| 서비스 | 공개성 | 확인된 기술/구조 | 중심 상태 모델 | 확장 방식 |
|---|---|---|---|---|
| GeoGebra | 높음 | Java 공통 kernel, Web/Desktop 분리, 2D/3D view | GeoElement + dependency | command/algorithm/object 추가 |
| CODAP v3 | 높음 | React, TypeScript, MobX State Tree, D3, PixiJS, Leaflet, Webpack | shared dataset + tile/component models + history | plugin/data interactive |
| Polypad | API 높음 | JS API, Web Components, Web Animations, JSON | Tile + Stroke document | tile type/API/embed |
| PhET | 현행 내부 제한 | HTML5, SceneryStack 공식 설명 | simulation domain model | sim별 특화 |
| Desmos | 핵심 비공개 | 공식 help/API 중심 | expression + representation | calculator/classroom widget |
| Brainingcamp | 핵심 비공개 | 공식 2026 ACR에서 Canvas-based workspace 확인 | manipulative workspace | manipulative/toolkit |
| Didax | 핵심 비공개 | HTML5 + JavaScript 공식 FAQ | 개별 manipulative state | 앱별 |
| Cabri Express | 핵심 비공개 | 브라우저 기반, scientific/graphical/3D/equation/dynamic geometry | dynamic math object 추정 | 통합 toolkit |
| Solid Figure | **높음** | React 19, TypeScript, Vite, Tailwind CDN, CSS 3D transform | UI-local fold/view state | fixed-shape component 추가 |
| Amplify Classroom | 핵심 비공개 | 웹 lesson builder + teacher dashboard | lesson screen + student response | screen/widget |
| MLC | 핵심 비공개 | web apps/MultiApp | manipulative objects | manipulative module |

## 2. 상태관리 관점

### 객체 그래프형
GeoGebra가 대표입니다.

장점:
- 도형 관계 유지
- 파생 객체 자동 계산
- 다중 표현 연결

주의:
- 순환 참조
- 삭제 cascade
- 재계산 성능
- Undo 복잡도

### 문서 객체형
Polypad, Brainingcamp, MLC가 가깝습니다.

기본 형태:
- object id
- type
- transform
- visual props
- math props

장점:
- 직렬화/공유 쉬움
- 캔버스 UX에 적합

주의:
- 객체 간 수학 관계가 복잡해지면 별도 dependency가 필요

### 표현식 트리형
Desmos, Graspable Math.

장점:
- 기호 계산
- 재작성
- 그래프 연결

주의:
- selection granularity
- parse tree와 화면 token mapping

### 시뮬레이션 도메인형
PhET.

장점:
- 개념별 정확한 제약
- 원인/결과 표현 강함

주의:
- 범용 문서로 확장하기 어려움

### 데이터 공유 모델형
CODAP.

하나의 dataset을 table, graph, map이 공유합니다.

장점:
- linked selection
- 같은 데이터를 다른 표현으로 탐색
- 플러그인 데이터 연동

주의:
- 데이터 identity가 모든 뷰에서 일관되어야 함

### 수업 문서형
Amplify Classroom.

기본:
- lesson
- ordered screens
- embedded widgets
- response state
- teacher control

장점:
- 여러 전문 수학 도구를 하나의 수업 흐름에 조합

주의:
- 수업 shell이 math widget 내부 상태를 지나치게 소유하면 결합도가 높아짐

---

## 3. 렌더링 방식

### DOM/SVG가 유리한 경우
- 식
- 텍스트
- 접근성 구조
- 간단한 도형
- 개별 객체 hit target

### CSS 3D가 유리한 경우
- 고정된 소수의 입체
- 면이 단순한 정육면체/직육면체
- 가벼운 접기/펼치기 설명
- DOM label과 3D face를 함께 써야 하는 경우

Solid Figure는 Three.js 없이 CSS perspective + preserve-3d + rotateX/Y/Z로 입체를 구성합니다.

장점:
- 구현량이 작음
- React DOM과 직접 결합
- 초등용 고정 코스웨어에 충분

한계:
- 일반 mesh/topology가 없음
- 정확한 occlusion/hidden edge/picking에 약함
- 임의 전개도 확장이 어려움

### Canvas가 유리한 경우
- 많은 조작물
- 자유로운 workspace
- 빠른 그리기
- 낮은 DOM 복잡도

Brainingcamp의 2026 접근성 문서는 primary interactive area가 Canvas-based workspace임을 명시합니다.

### WebGL/Pixi가 유리한 경우
- 수천 개 점
- 대규모 scatter plot
- 고성능 2D rendering
- 3D

CODAP v3의 graph 렌더링에는 PixiJS 기반 point renderer 구조가 존재합니다.

### D3가 유리한 경우
- 축
- 스케일
- 통계 그래프
- 데이터 기반 시각화

CODAP v3가 D3를 사용합니다.

### Leaflet가 유리한 경우
- 지도
- 위치 데이터
- 레이어

CODAP v3가 Leaflet/react-leaflet를 사용합니다.

---

## 4. Undo/Redo 비교

단순 UI snapshot보다 의미 단위 history가 좋습니다.

### GeoGebra형
수학 construction 변화

### Polypad형
tile/stroke change 묶음

### CODAP형
공개 v3 코드에 별도 history/undo store가 존재하며 여러 tree에 patch를 적용하는 구조가 확인됩니다.

실제 경로:
- v3/src/models/history/undo-store.ts
- v3/src/models/history/history.ts
- v3/src/models/history/tree.ts

중요한 설계:
- user action 한 번을 history entry 하나로 묶기
- 여러 공유 모델 변화도 하나의 logical action으로 undo
- 새로운 action 발생 시 redo tail 제거

---

## 5. 저장 구조

구분해야 할 상태:

1. document state
2. viewport state
3. user preference
4. session state
5. classroom/submission state

CODAP v3 공개 코드의 persistent-state.ts는 toolbar 위치나 graphics acceleration처럼 **문서를 더럽히지 않고 autosave를 유발하지 않는 전역 preference**를 localStorage에 별도 저장합니다.

이 분리는 매우 좋은 패턴입니다.

---

## 6. 확장성

### Plugin API
CODAP이 대표적입니다.
외부 simulation/game/database가 데이터를 넣고 받을 수 있습니다.

### Embed API
Polypad처럼 특정 수학 도구를 외부 수업 페이지에 삽입하는 방식입니다.

### Command Registry
GeoGebra처럼 domain command를 추가하는 방식입니다.

### Tile Registry
Polypad/가상교구 계열.

### Lesson Widget
Amplify Classroom형.

---

## 7. 테스트 전략

수학 앱은 일반 UI 테스트 외에 다음이 필요합니다.

### Domain unit test
- 기하 관계
- 대수 rewrite
- 통계 계산
- 분수 equivalence

### Interaction test
- drag target
- snap
- multi-touch
- keyboard

### Visual regression
- 축/라벨
- 2D/3D
- 캔버스 위치

### Serialization test
- 저장→복원 동일성
- version migration

### Accessibility test
- keyboard
- screen reader
- contrast
- focus order

CODAP v3는 Jest와 Cypress를 함께 사용하고, 공식 package 설정에서 jsdom, canvas/webgl mock, Cypress e2e가 확인됩니다.

---

## 8. 신규 서비스에 권장하는 계층

~~~text
app/
  shell/
  routing/
  preferences/

domain/
  math-objects/
  operations/
  constraints/
  evaluators/

state/
  document/
  history/
  serialization/
  migration/

interaction/
  selection/
  tools/
  gestures/
  snapping/
  drag-drop/

representation/
  canvas2d/
  svg/
  scene3d/
  formula/
  table/
  graph/
  map/
  accessibility/

classroom/
  lessons/
  share/
  submissions/
  monitoring/

plugins/
  api/
  registry/

tests/
  domain/
  interaction/
  serialization/
  visual/
  accessibility/
~~~

핵심은 framework보다 **domain/state/representation/interaction/classroom을 분리하는 것**입니다.
