# Solid Figure 재구현·확장 설계

## 0. 두 가지 구현 전략

### A. 현재 수준의 소형 코스웨어

유지:
- React
- CSS 3D
- local state
- fixed shape components

이 방식이 가장 경제적입니다.

### B. 일반적인 공간도형 엔진

추가:
- geometry domain model
- face/edge/vertex topology
- hinge graph
- renderer adapter
- camera
- hit-test
- visibility
- serialization

이 경우 CSS DOM 구조에 topology를 숨기면 안 됩니다.

## 1. 권장 domain model

~~~ts
interface Vertex {
  id: string;
  position: Vec3;
}

interface Face {
  id: string;
  vertexIds: string[];
}

interface Edge {
  id: string;
  a: string;
  b: string;
  faceIds: string[];
}

interface Hinge {
  parentFaceId: string;
  childFaceId: string;
  edgeId: string;
  foldedAngleDeg: number;
}
~~~

## 2. Net graph

~~~text
Face A
├─ hinge → Face B
├─ hinge → Face C
└─ hinge → Face D
              └─ hinge → Face E
~~~

이 graph가 현재 CubeNet JSX nesting을 대체합니다.

장점:
- 전개도 변경 가능
- 저장 가능
- 검증 가능
- 같은 renderer 재사용

## 3. 범용 접기 계산

공통 코드:
reference-implementations/src/solid-net-folding.ts

핵심 API:
computeFaceTransforms(model, foldProgress)

- 0 = fully flat net
- 1 = fully folded solid

각 Hinge는:
- parent/child face
- parent local hinge axis
- child의 flat alignment transform
- final fold angle

을 가집니다.

## 4. transform chain

~~~text
parentWorld
× rotateAroundHinge(progress)
× flatChildToParent
= childWorld
~~~

이 방식이면 6번 face가 3번 face에 붙는 관계를 JSX nesting이 아니라 데이터로 표현할 수 있습니다.

## 5. Renderer Adapter

~~~ts
interface SolidRenderer {
  setFaceTransform(faceId: string, matrix: Mat4): void;
  setCamera(camera: CameraState): void;
  render(): void;
}
~~~

구현체:
- Css3DRenderer
- ThreeJsRenderer
- SvgNetRenderer

처음에는 CSS 3D로 시작하고 나중에 renderer만 교체할 수 있습니다.

## 6. 점진적 개선 순서

### Phase 1
기존 UI 유지.
- touch pointer
- API key 제거
- Tailwind build
- test

### Phase 2
CubeNet만 domain model로 이전.

~~~text
hardcoded JSX topology
→ Face/Hinge data
→ Css3DRenderer
~~~

### Phase 3
직육면체/각기둥 일반화.

### Phase 4
학생이 전개도 선택/생성.

### Phase 5
Three.js/WebGL adapter 추가.

## 7. 원기둥/원뿔은 별도 surface model

다면체 face engine에 억지로 넣지 않는 편이 좋습니다.

~~~ts
type Solid =
  | PolyhedronSolid
  | CylinderSolid
  | ConeSolid
  | SphereSolid;
~~~

Cylinder:

~~~ts
interface CylinderSolid {
  radius: number;
  height: number;
}
~~~

Net:
- lateral width = 2πr
- lateral height = h
- cap circle × 2

Cone:

~~~text
slant = hypot(height, radius)
sectorAngle = 2π × radius / slant
~~~

실제 SVG sector를 그리면 12 triangle approximation이 필요 없습니다.

## 8. SVG Net + 3D Solid 조합

교육용으로 가장 추천:

~~~text
Math Solid Model
     ├─ SVG Net View
     └─ 3D Solid View
~~~

같은 domain state가 평면 전개도, 접는 중간 상태, 완성 입체를 모두 생성하게 합니다.

## 9. 모서리 가시성까지 갈 경우

현재 CSS approach에는 edge visibility engine이 없습니다.

필요:

~~~text
Face world transform
→ face normals
→ camera-facing test
→ edge adjacent faces
→ depth/occlusion
→ visible / hidden / partially hidden
~~~

중간 접힘 상태에서는 단순 back-face test만으로 부족하고 다른 face가 edge 일부를 실제로 가리는지 screen-space/depth 기준 판정이 필요합니다.

## 10. 상태 분리

~~~ts
interface SolidDocumentState {
  solid: Solid;
  net: NetDefinition;
  foldProgress: number;
}

interface SolidViewState {
  camera: CameraState;
  showLabels: boolean;
  showHiddenEdges: boolean;
}
~~~

## 11. 학생 제작 기능이 생기면

semantic command:
- AddFace
- AttachFace
- DetachFace
- RotateNetFace
- ChangeFoldProgress

단위로 history를 남깁니다.

## 12. 관련 공통 코드

- reference-implementations/src/solid-net-folding.ts
- reference-implementations/src/scene-graph.ts
- reference-implementations/src/serialization.ts

이 세 모듈을 조합하면 이 서비스보다 일반화된 전개도/입체 구조의 출발점을 만들 수 있습니다.
