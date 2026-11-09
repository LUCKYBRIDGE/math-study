# PhET 구현 참조

## 0. 분류

- 핵심: **Reactive Domain Model + Scene Graph**
- 조작 문법: simulation-first
- 공개성: Scenery, Axon 등 핵심 라이브러리 공개
- 재구현 핵심: `reactive-property.ts`, `scene-graph.ts`

---

## 1. [SOURCE-OBSERVED] Scenery scene graph

공식 GitHub:
https://github.com/phetsims/scenery

`js/nodes/Node.ts`는 Scenery의 Node를 scene graph의 기본 단위로 설명합니다.

확인되는 특징:

- child nodes
- multiple parents 허용
- cycle 금지
- DAG
- transform
  - translation
  - scale
  - rotation
- visibility/opacity
- rendering layer
- Canvas 2D / SVG / DOM / WebGL 등 여러 renderer

즉 simulation 화면을 HTML component tree에만 의존하지 않고 **별도 장면 그래프**로 관리합니다.

---

## 2. Renderer 독립 Scene Node

클린룸 구현:
`reference-implementations/src/scene-graph.ts`

~~~ts
const root = new SceneNode("root");
const modelLayer = new SceneNode("fraction-model");
const labelLayer = new SceneNode("labels");

root.addChild(modelLayer);
root.addChild(labelLayer);

modelLayer.renderer = "canvas";
labelLayer.renderer = "dom";
~~~

같은 scene 안에서도 목적에 따라 renderer를 나눌 수 있습니다.

---

## 3. [SOURCE-OBSERVED] Axon Property

PhET core의 Axon은 reactive property 계층을 제공합니다.

관련 저장소:
https://github.com/phetsims/axon

`TProperty.ts` 등에서 settable property interface가 확인됩니다.

핵심 아이디어:

~~~text
Domain Property
   ↓ observer
Visual Node
Accessible Description
Derived Value
Control
~~~

React component state와 달리 **시뮬레이션 domain state 자체가 observable**입니다.

---

## 4. 클린룸 Reactive Property

`reference-implementations/src/reactive-property.ts`

~~~ts
const numerator = new Property(1);
const denominator = new Property(4);

const value = new DerivedProperty(
  [numerator as Property<unknown>, denominator as Property<unknown>],
  () => numerator.value / denominator.value
);

value.subscribe(next => {
  fractionBar.setFillRatio(next);
  spokenDescription.textContent = `${next}`;
});
~~~

한 상태 변화가:
- visual
- text
- audio
- control
에 모두 전달될 수 있습니다.

---

## 5. PhET형 domain model

분수 simulation 예:

~~~ts
class FractionModel {
  readonly numerator = new Property(1);
  readonly denominator = new Property(4);

  setNumerator(value: number) {
    const max = this.denominator.value;
    this.numerator.value = Math.max(0, Math.min(value, max));
  }

  setDenominator(value: number) {
    this.denominator.value = Math.max(1, value);
    this.numerator.value = Math.min(
      this.numerator.value,
      this.denominator.value
    );
  }
}
~~~

중요:
**UI slider가 분수 규칙을 갖는 것이 아니라 Model이 규칙을 갖습니다.**

---

## 6. 잘못된 구조

~~~ts
slider.oninput = () => {
  // UI 안에서 모든 수학 규칙 처리
  numerator = Number(slider.value);
  drawFraction();
  updateLabel();
  updateSound();
};
~~~

이 방식은 UI가 바뀌면 수학 logic도 깨집니다.

좋은 구조:

~~~text
Input
 ↓
Domain Model
 ↓ reactive properties
 ├→ Scene
 ├→ Accessible DOM
 ├→ Sonification
 └→ Control state
~~~

---

## 7. Simulation-specific screen

PhET의 강점은 범용 toolbar가 아니라 개념별 장면입니다.

예:
- number line
- fraction model
- equality balance

각 simulation은 같은 shell을 억지로 공유하기보다 domain에 맞는 interaction을 가질 수 있습니다.

공통화할 것은:
- property
- scene graph
- input
- accessibility
- instrumentation
이고,

개념별로 달라야 할 것은:
- model
- constraints
- visual metaphor
입니다.

---

## 8. 접근성

Scenery source에서 `ParallelDOM`, accessibility 관련 module이 Node와 연결되는 구조가 확인됩니다.

핵심 설계:

~~~text
Visual Scene Graph
       │
       └── semantic/accessibility representation
~~~

Canvas/WebGL을 사용하더라도 접근성을 DOM tree와 별개로 포기하지 않습니다.

신규 구현에서도:

~~~ts
interface AccessibleRepresentation {
  label: string;
  role: string;
  valueText?: string;
  keyboardActions: string[];
}
~~~

를 domain object에서 파생하는 방식이 좋습니다.

---

## 9. Animation은 표현이 아니라 causal feedback

Simulation에서 animation은:
- 값이 바뀌었다
가 아니라
- 무엇 때문에 어떻게 바뀌었는가
를 보여줘야 합니다.

예:

~~~text
denominator 4 → 5
  ↓
bar resegments
  ↓
selected amount adjusts
  ↓
numeric value changes
~~~

순간적으로 최종 화면만 바꾸면 관계 탐구 가치가 낮아집니다.

---

## 10. 권장 구조

~~~text
simulation/
  model/
    domain-model.ts
    derived-properties.ts

  view/
    scene.ts
    nodes/

  input/
    gestures.ts
    keyboard.ts

  accessibility/
    pdom.ts

  audio/
    sonification.ts
~~~

---

## 11. 언제 PhET형 구조가 적합한가

적합:
- 개념 하나를 깊게 탐구
- 변수 변화와 결과 관찰
- 애니메이션이 수학 관계를 설명

부적합:
- 사용자가 자유롭게 여러 종류 객체를 만드는 범용 편집기

그 경우 Polypad/GeoGebra형이 더 낫습니다.

---

## 12. 확인 소스

- https://github.com/phetsims/scenery
- `scenery/js/nodes/Node.ts`
- https://github.com/phetsims/axon
- `axon/js/TProperty.ts`

현재 core source는 직접 확인했지만 개별 simulation의 최신 내부 구조는 simulation마다 별도로 다시 검증해야 합니다.
