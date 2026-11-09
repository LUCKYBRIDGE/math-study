# CODAP 구현 참조

## 0. 분류

- 핵심: **Shared Dataset + Linked Representations**
- 조작 문법: attribute drag → axis/role assignment
- 공개성: **[SOURCE-OBSERVED] 매우 높음**
- 재구현 핵심: `linked-dataset.ts`, `history.ts`, `serialization.ts`

---

## 1. [SOURCE-OBSERVED] v3 기술 스택

공식 저장소:
https://github.com/concord-consortium/codap

`v3/package.json`에서 확인:

- React 18
- TypeScript
- MobX State Tree
- MobX
- D3
- PixiJS
- Leaflet / react-leaflet
- React Data Grid
- dnd-kit
- mathjs
- CodeMirror
- Jest
- Cypress
- Webpack 5

CODAP은 “React 앱”이라고 요약하면 구조를 놓칩니다.

실제로는:

~~~text
React shell
 + MST state
 + D3 axes/scales
 + Pixi point renderer
 + Leaflet map
 + data grid
 + drag/drop
 + formula engine
~~~

입니다.

---

## 2. 실제 책임 구조

확인된 v3 경로:

~~~text
v3/src/
├─ models/
│  ├─ data/
│  ├─ history/
│  ├─ formula/
│  ├─ shared/
│  ├─ document/
│  └─ tiles/
├─ components/
│  ├─ graph/
│  ├─ map/
│  ├─ case-table/
│  ├─ case-card/
│  ├─ axis/
│  ├─ data-display/
│  └─ drag-drop/
└─ data-interactive/
~~~

특히:
- `components/graph/models/graph-content-model.ts`
- `components/graph/components/graph-component.tsx`
- `components/map/components/map-component.tsx`
- `components/case-table/case-table-component.tsx`
- `models/history/undo-store.ts`
- `models/persistent-state.ts`

를 확인했습니다.

---

## 3. 핵심: case identity

가장 먼저 구현해야 하는 것은 그래프가 아닙니다.

~~~ts
type CaseRecord = {
  id: string;
  values: Record<string, string | number | boolean | null>;
};
~~~

그리고 Table/Graph/Map 모두 같은 `id`를 참조해야 합니다.

~~~text
case-42
 ├─ row
 ├─ point
 └─ marker
~~~

이 identity가 끊기면 linked selection을 구현하기 어렵습니다.

---

## 4. 클린룸 Linked Dataset

공통 코드:
`reference-implementations/src/linked-dataset.ts`

~~~ts
const data = new LinkedDataSet([
  { id: "s1", values: { height: 140, weight: 35 } },
  { id: "s2", values: { height: 145, weight: 42 } }
]);

data.assignRole("x", "height");
data.assignRole("y", "weight");

data.onSelection(ids => {
  table.highlight(ids);
  graph.highlight(ids);
  map.highlight(ids);
});

data.setSelection(["s2"]);
~~~

### 중요한 방향

Graph가 선택 상태를 소유하면 안 됩니다.

~~~text
Graph click
  ↓
shared selection model
  ↓
Graph / Table / Map observe
~~~

이어야 합니다.

---

## 5. Attribute Drag

CODAP형 UX의 핵심은:

~~~text
attribute "height"
  ↓ drag
x axis
  ↓
assignRole("x", "height")
  ↓
scale recompute
  ↓
plot redraw
~~~

입니다.

React 코드에서 drop handler가 직접 점 좌표를 만들지 말고 domain command를 발행하는 편이 좋습니다.

~~~ts
function onDropAttribute(attribute: string, role: "x" | "y") {
  history.execute({
    label: `Assign ${attribute} to ${role}`,
    execute: () => data.assignRole(role, attribute),
    undo: () => restorePreviousRole(role)
  });
}
~~~

---

## 6. Graph Model과 Renderer 분리

실제 `graph-component.tsx`는 Graph model/controller와 renderer를 별개로 조합합니다.

대규모 데이터에서는:

~~~text
Data model
  ↓
plot model
  ↓
layout/scale
  ↓
renderer adapter
     ├─ SVG
     └─ Pixi/WebGL
~~~

구조가 유리합니다.

### 신규 구현 권장

~~~ts
interface PointRenderer {
  setPoints(points: readonly ScreenPoint[]): void;
  setSelected(ids: ReadonlySet<string>): void;
  resize(width: number, height: number): void;
}
~~~

데이터 모델이 PixiJS를 직접 알 필요가 없습니다.

---

## 7. Map도 같은 데이터 사용

Map 전용 데이터를 복제하지 않습니다.

~~~text
shared DataSet
  ↓
lat/lon attributes
  ↓
Map adapter
  ↓
Leaflet layer
~~~

Graph와 Map이 다른 renderer를 사용해도 selection identity는 동일합니다.

---

## 8. Undo 구조

실제 `undo-store.ts`는 여러 tree에 적용된 patch를 하나의 history action으로 다룹니다.

신규 서비스에서 단순화하면:

~~~ts
history.executeTransaction("Change graph variable", [
  changeXAxisCommand,
  resetScaleCommand,
  updatePlotTypeCommand
]);
~~~

처럼 여러 내부 상태 변화를 사용자 행동 하나로 묶는 것이 핵심입니다.

---

## 9. Preference와 Document 분리

실제 `persistent-state.ts`는 toolbar 위치/graphics acceleration처럼:

- undo 대상 아님
- document dirty 아님
- autosave 유발 안 함
- localStorage 보존

인 상태를 별도 관리합니다.

권장:

~~~ts
type AppState = {
  document: DocumentState;
  viewport: ViewState;
  preferences: PreferenceState;
  session: SessionState;
};
~~~

모든 것을 `document.json` 하나에 넣지 않습니다.

---

## 10. Plugin/Data Interactive 설계

새로운 데이터 소스를 core에 직접 넣는 대신 adapter를 둡니다.

~~~ts
interface DataConnector {
  id: string;
  connect(): Promise<void>;
  onCases(listener: (cases: CaseRecord[]) => void): () => void;
}
~~~

센서/게임/시뮬레이션은 `DataConnector`만 구현하면 됩니다.

---

## 11. 폴더 구조 제안

~~~text
data/
  dataset.ts
  attribute.ts
  selection.ts

views/
  table/
  graph/
  map/

renderers/
  svg/
  pixi/
  leaflet/

history/
  commands.ts

plugins/
  connector-api.ts
~~~

---

## 12. 우리 서비스에 가져올 가치

특히 통계·자료 영역을 만든다면:

1. Table/Graph를 별도 앱으로 만들지 말 것
2. Case ID를 공통 source of truth로 둘 것
3. selection도 공유 model로 둘 것
4. attribute drag를 semantic role assignment로 해석할 것
5. renderer는 데이터 규모에 따라 교체 가능하게 만들 것

---

## 13. 확인 소스

- https://github.com/concord-consortium/codap
- `v3/package.json`
- `v3/src/components/graph/models/graph-content-model.ts`
- `v3/src/components/graph/components/graph-component.tsx`
- `v3/src/components/map/components/map-component.tsx`
- `v3/src/components/case-table/case-table-component.tsx`
- `v3/src/models/history/undo-store.ts`
- `v3/src/models/persistent-state.ts`
