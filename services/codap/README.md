# CODAP 정밀 분석

- 공식: https://codap.concord.org/
- 공식 저장소: https://github.com/concord-consortium/codap
- 대상: 주로 5학년 이상~대학 수준 데이터 탐구
- 공개성: **[VERIFIED-SOURCE] MIT 오픈소스**
- 조사 기준: 2026-11

## 1. 핵심 정체성

CODAP은 계산기나 그래프 작성기가 아니라 **데이터의 여러 표현을 하나의 공유 데이터 모델에 연결하는 탐구 환경**입니다.

핵심 흐름:

~~~text
data import/create
   ↓
shared dataset
   ├─ case table
   ├─ graph
   ├─ map
   ├─ case card
   └─ plugin
~~~

한 표현에서 case를 선택하면 다른 표현에서도 같은 case가 강조되는 **dynamic linking / brushing and linking**이 핵심입니다.

## 2. UI/UX의 중심

공식 사이트가 강조하는 현재 기능:
- drag-and-drop visualization
- dynamic linking
- CSV/TXT drag import
- spreadsheet paste
- URL import
- table 직접 입력
- plugin을 통한 외부 데이터
- graph
- map
- case table/card

### 대표 사용자 흐름

~~~text
CSV drop
 → case table 생성
 → Graph 생성
 → attribute를 x/y축으로 drag
 → 점 생성
 → 일부 점 선택
 → table/map의 동일 case highlight
~~~

학생은 '그래프 설정 대화상자'보다 **변수 이름 자체를 축으로 끌어놓는 조작**으로 표현을 만듭니다.

## 3. 수학적 표현 방식

### Case 중심

행 하나가 단순 화면 row가 아니라 데이터 case identity를 가집니다.

~~~text
case id
  ├─ table row
  ├─ scatter point
  ├─ map point
  └─ card
~~~

이 identity 공유 때문에 linked selection이 가능합니다.

### Attribute 중심

변수는 graph axis의 역할을 가질 수 있습니다.

~~~text
attribute
  → bottom axis
  → left axis
  → color/legend
~~~

그래프 종류를 먼저 선택하는 일반 통계 앱보다 **변수-표현 관계를 직접 조작**하게 합니다.

## 4. 현재 v3 기술 구조

공식 v3 README는 2022년부터 v3를 완전히 재구현했으며 다음 기술을 사용한다고 명시합니다.

- React
- TypeScript
- MobX State Tree
- D3

2026-11 현재 v3/package.json에서 추가로 확인:
- React 18
- MobX / mobx-react-lite
- D3
- PixiJS
- Leaflet / react-leaflet
- React Data Grid
- dnd-kit
- mathjs
- CodeMirror
- Chakra UI
- Webpack 5
- Jest
- Cypress

즉 UI framework 하나로 끝나는 구조가 아니라
- DOM UI
- data visualization
- high-performance point rendering
- maps
- drag/drop
- formula parsing
을 각각 전문 라이브러리로 분리합니다.

## 5. 실제 source 책임 구조

GitHub 검색으로 확인되는 실제 v3 경로:

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
│  ├─ case-table/
│  ├─ case-card/
│  ├─ graph/
│  ├─ map/
│  ├─ axis/
│  ├─ data-display/
│  ├─ drag-drop/
│  └─ tool-shelf/
├─ data-interactive/
├─ hooks/
└─ utilities/
~~~

좋은 점은 '페이지별'보다 **수학/데이터 책임별**로 많이 나뉜다는 것입니다.

## 6. Graph 구조

실제 파일:
- v3/src/components/graph/models/graph-content-model.ts
- v3/src/components/graph/models/graph-controller.ts
- v3/src/components/graph/components/graph-component.tsx
- v3/src/components/graph/plots/
- v3/src/components/axis/

GraphContentModel은
- axes
- plot
- adornments
- dataset
- metadata
- data configuration
을 연결합니다.

즉 graph는 단순 SVG 결과가 아니라 **model + controller + plot + axis + renderer**의 계층입니다.

## 7. 그래프 렌더링

graph-component.tsx에서
- React component
- MobX observer
- dnd-kit droppable
- point renderer
- resize detector
- graph controller
를 조합합니다.

공개 dependency와 코드에서 PixiJS 기반 point renderer가 확인됩니다.

이 구조는 데이터 점이 많을 때 DOM/SVG 개별 node 대신 GPU 가속 renderer를 선택할 수 있게 합니다.

### 가져올 점

데이터가 적을 때와 많을 때를 같은 렌더링 방식으로 고집할 필요가 없습니다.

~~~text
small dataset → SVG/DOM 가능
large dataset → Canvas/WebGL/Pixi
~~~

## 8. Map 구조

실제 파일:
- components/map/components/map-component.tsx
- components/map/components/codap-map.tsx
- components/map/models/map-controller.ts
- components/map/components/map-point-layer.tsx
- map-polygon-layer.tsx

공개 package에서 Leaflet/react-leaflet를 사용합니다.

Graph와 Map이 서로 다른 엔진을 쓰지만 **shared dataset**을 통해 같은 case를 표현하는 점이 핵심입니다.

## 9. Case Table 구조

실제 파일:
- components/case-table/case-table-component.tsx
- components/case-table/case-table.tsx
- components/case-table/case-table-model.ts

CaseTableComponent는 DataSetContext와 MetadataContext를 공급합니다.

즉 table도 자체 복제 데이터를 갖기보다 공통 dataset을 소비합니다.

## 10. History / Undo

실제 파일:
- models/history/undo-store.ts
- models/history/history.ts
- models/history/tree.ts
- models/history/tree-manager.ts

UndoStore 공개 코드에서 확인되는 핵심:
- history entry 배열
- undo index
- undo/redo 가능 여부
- 여러 tree의 patch를 하나의 logical action으로 적용
- undo 시 patch 순서를 뒤집음
- 새 사용자 action 발생 시 redo tail 제거

이는 대규모 편집기에서 유용한 패턴입니다.

단순 snapshot stack보다 여러 component/shared model의 변화를 **하나의 사용자 행동**으로 묶습니다.

## 11. Preference와 Document State 분리

실제 파일:
- models/persistent-state.ts

여기에는
- toolbar position
- graphics acceleration disable
같은 상태가 있습니다.

주석에서 이 상태는:
- undo 대상이 아니고
- document dirty를 만들지 않으며
- auto-save를 유발하지 않고
- localStorage로 session 간 보존

된다고 명시합니다.

이 분리는 강하게 참고할 가치가 있습니다.

~~~text
Document State ≠ User Preference ≠ Viewport/Session State
~~~

## 12. Drag & Drop을 수학 UX로 사용

CODAP은 drag/drop을 단순 배치가 아니라 **표현 생성 명령**으로 사용합니다.

예:
- attribute → x축
- attribute → y축

따라서 pointer movement가 의미 연산으로 번역됩니다.

~~~text
drop(attribute, axis)
 → assignRole(attribute, axis)
 → recompute scale
 → choose/update plot
 → redraw
~~~

## 13. Plugin / Data Interactive

공식 사이트는 CODAP의 P가 Platform임을 강조합니다.

외부 도구가:
- 데이터를 CODAP으로 전달
- context 정보 교환
- simulation/game에서 생성한 데이터 분석
을 할 수 있습니다.

이는 수학 도구가 모든 기능을 직접 만들지 않고 **전문 micro-app을 host하거나 연결**하는 좋은 사례입니다.

## 14. 교육적 강점

1. 표-그래프-지도 간 연결이 매우 강함
2. 실제 데이터 탐구에 적합
3. 그래프 생성이 drag/drop 중심
4. 데이터 import 진입장벽이 낮음
5. 플러그인으로 센서·시뮬레이션과 연결 가능
6. open source라 구조 학습 가치가 큼
7. 로그인이 필수가 아니며 학생 개인정보 부담이 낮음

## 15. 한계

1. 저학년 산술/도형 조작에는 과도함
2. hierarchical data 개념은 초보 학생에게 어려울 수 있음
3. 화면에 여러 floating component가 생기면 공간 관리가 복잡
4. 데이터 구조가 잘못되면 학생이 시각화보다 데이터 정리에 시간을 많이 씀

## 16. 신규 서비스에 가져올 것

- shared dataset
- linked representation
- case identity
- attribute drag
- renderer 분리
- plugin API
- model/controller/view 분리
- preference/document 분리
- multi-tree logical undo
- large-data renderer fallback

## 17. 주요 출처

- https://codap.concord.org/
- https://concord.org/our-work/research-projects/codap/
- https://github.com/concord-consortium/codap
- v3/package.json
- v3/README.md
- v3/src/models/persistent-state.ts
- v3/src/models/history/undo-store.ts
- v3/src/components/graph/models/graph-content-model.ts
- v3/src/components/graph/components/graph-component.tsx
- v3/src/components/map/components/map-component.tsx
- v3/src/components/case-table/case-table-component.tsx
