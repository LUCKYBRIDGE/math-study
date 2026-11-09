# Toy Theater 구현 참조

## 0. 분류

- 핵심: **Low-floor visual math micro-tools**
- 기술 소스보다 UI/UX benchmark 가치가 큼
- 내부 코드: 비공개

현재 공식 Virtual Manipulatives 범주에는:
- fractions
- geometry
- number line
- place value
- probability
- time
- multiplication
- graphs
등 매우 많은 single-purpose tools가 있습니다.

---

## 1. 구현 목표

Toy Theater형은:

~~~text
see
 → know what can move
 → touch
 → immediate response
~~~

가 핵심입니다.

사용자가 메뉴 구조를 배워야 하는 순간 저학년 도구의 장점이 줄어듭니다.

---

## 2. Visual affordance를 코드로 명시

단순 CSS 감각에 맡기지 않고 interactive object metadata를 둡니다.

~~~ts
interface InteractiveObject {
  id: string;
  draggable: boolean;
  hitPadding: number;
  cursor: "grab" | "pointer";
  accessibleLabel: string;
}
~~~

화면에 작게 보여도 hit target은 넓힐 수 있습니다.

---

## 3. Pointer interaction

~~~ts
interface DragSession {
  objectId: string;
  pointerId: number;
  startPointer: Point;
  startObject: Point;
}
~~~

pointer capture 사용:

~~~ts
element.setPointerCapture(event.pointerId);
~~~

touch/mouse를 별도 코드로 나누기보다 Pointer Events로 통일하는 것이 좋습니다.

---

## 4. 예: Fraction Strip

~~~ts
interface FractionStrip {
  denominator: number;
  selected: boolean[];
  x: number;
  y: number;
  width: number;
}
~~~

Renderer:

~~~text
width / denominator
 → each cell bounds
 → fill selected cells
~~~

hit-test:

~~~ts
const index = Math.floor(
  (pointerX - strip.x) / (strip.width / strip.denominator)
);
~~~

수학 모델이 단순하기 때문에 UI도 단순할 수 있습니다.

---

## 5. Reset을 강하게 제공

저학년 도구에서는 복잡한 history보다 명확한 reset이 더 중요할 때가 있습니다.

그래도 drag 완료는 command history로 남기면:
- 실수 복원
- 교사 관찰
에 도움이 됩니다.

---

## 6. 색에만 의미를 맡기지 않기

시각적 도구에서 흔한 위험:

~~~text
빨강 = 1/2
파랑 = 1/3
~~~

만으로 구분하면 접근성이 낮습니다.

동시에:
- pattern
- label
- count
- accessible text
중 하나를 제공해야 합니다.

---

## 7. 애니메이션

200~300ms 정도의 짧은 snap/return animation은 조작 결과를 이해하는 데 도움을 줄 수 있습니다.

단 장식 animation은 줄입니다.

---

## 8. Micro-tool template

~~~text
tool/
  model.ts
  renderer.ts
  interaction.ts
  accessibility.ts
  index.ts

shared/
  pointer.ts
  geometry.ts
  reset.ts
~~~

이 구조를 generator로 만들어 여러 도구를 빠르게 추가할 수 있습니다.

---

## 9. Toy Theater에서 가져올 것

- 큰 조작 대상
- 즉시 반응
- 한 화면
- 적은 텍스트
- single-purpose
- 강한 visual cue

가져오지 말 것:
- 수학 의미를 색/그림에만 숨기는 구조
- 상태 공유/접근성을 고려하지 않은 단순 canvas

---

## 10. 확인 출처

- https://toytheater.com/category/teacher-tools/
- https://toytheater.com/category/teacher-tools/virtual-manipulatives/

핵심 code stack은 공개되지 않아 기술 추정은 하지 않습니다.
