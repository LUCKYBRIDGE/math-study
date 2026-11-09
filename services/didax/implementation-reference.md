# Didax Virtual Manipulatives 구현 참조

## 0. 분류

- 핵심: **Single-purpose HTML5 math micro-tool**
- 공식 확인: web based, HTML5, JavaScript 필요
- 별도 Android/iOS native app 없음
- 내부 소스: 비공개

---

## 1. Didax에서 배울 핵심은 기술 복잡도가 아니라 범위 제한

예:
- Ten Frames
- Number Lines
- Rekenrek
- Fraction Tiles
- Base Ten Blocks
- Math Balance
- Algebra Tiles
- Geoboard

각 앱은 한 수학 모델에 집중합니다.

따라서 범용 app shell보다:

~~~text
MicroTool
  ├─ Model
  ├─ Workspace
  ├─ Minimal Controls
  └─ Reset
~~~

구조가 적합합니다.

---

## 2. 공통 MicroTool SDK

여러 앱을 별도 코드베이스로 만들 필요는 없습니다.

~~~ts
interface MicroTool<S> {
  id: string;
  initialState(): S;
  render(state: S): void;
  handlePointer(event: PointerEvent, state: S): S;
  reset(): S;
  serialize?(state: S): unknown;
}
~~~

각 페이지에서는 하나의 tool만 mount합니다.

~~~ts
mountMicroTool("ten-frame", root);
~~~

---

## 3. 예: Ten Frame

~~~ts
interface TenFrameState {
  frames: {
    id: string;
    cells: (null | "red" | "blue")[];
  }[];
}
~~~

수학 의미:
- cell index
- filled count
- 5/10 구조

Canvas circle 좌표는 renderer가 계산합니다.

---

## 4. 예: Math Balance

~~~ts
interface BalanceState {
  left: Weight[];
  right: Weight[];
}

function total(weights: Weight[]) {
  return weights.reduce((sum, item) => sum + item.value, 0);
}
~~~

renderer는:
- left total
- right total
의 차이로 beam angle을 계산합니다.

~~~ts
const angle = clamp(
  (total(state.right) - total(state.left)) * 0.03,
  -0.2,
  0.2
);
~~~

즉 물리 simulation이 아니라 **수학 equality model → visual metaphor**입니다.

---

## 5. UI를 최소화하는 법

single-purpose tool에서 피할 것:
- global object tree
- 복잡한 property inspector
- 다단 toolbar

대신:
- large workspace
- object palette
- reset
- 필요한 경우 색/라벨

만 제공합니다.

---

## 6. 코드 재사용

공통:
- pointer gesture
- selection
- drag transaction
- history
- serialization

도구별:
- domain model
- hit test
- renderer
- constraints

~~~text
microtool-core/
  pointer.ts
  drag.ts
  history.ts

tools/
  ten-frame/
  fraction-tiles/
  geoboard/
~~~

---

## 7. 성능

single-purpose tool은 상태가 작으므로 복잡한 global state library가 반드시 필요하지 않습니다.

React를 쓴다면:
- domain model는 pure TS
- React는 controls
- Canvas/SVG renderer는 workspace

정도로 충분합니다.

---

## 8. 모바일

공식적으로 tablet/smartphone browser에서 실행됩니다.

따라서:
- pointer events 사용
- touch target 44px 이상
- hover 의존 금지
- pinch와 object drag conflict 처리

가 필요합니다.

---

## 9. 언제 Didax형이 좋은가

좋음:
- 수업 중 5분 바로 사용
- 특정 모델 하나
- 저학년
- 설명 없이 시작

나쁨:
- 여러 표현을 연결
- 장기 프로젝트
- 복잡한 저장/과제
- 동적 기하

---

## 10. 확인 출처

- https://www.didax.com/virtual-manipulatives.html
- https://www.didax.com/didax-virtual-manipulative-faq-s

내부 렌더러와 framework는 추정하지 않습니다.
