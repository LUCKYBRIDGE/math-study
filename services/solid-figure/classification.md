# Solid Figure — 서비스별 분류

| 축 | 분류 |
|---|---|
| Primary Product Type | guided math courseware / solid figure visualizer |
| Secondary Type | net folding micro-simulation + quiz |
| Math Domain | 공간과 도형 / 입체도형 / 전개도 |
| Learner Level | 초등 저학년 중심 |
| Interaction Grammar | Content-first → Select Shape → Slider/Drag → Observe |
| Core State Model | UI-local visual state; 공통 solid domain model 없음 |
| Primary Representation | DOM + CSS 3D transform |
| Curved Surface Representation | segmented approximation |
| History Unit | 없음 |
| Persistence | 없음 |
| Sharing | URL 자체만; document state 공유 없음 |
| Classroom Layer | 없음 |
| Backend | 없음 |
| AI | 실제 생성형 AI 호출 없음; 정적 문제/수수께끼 pool |
| Source Visibility | 공개 TypeScript/React 저장소 후보 확인; live 배포와 직접 연결은 미검증 |
| Reimplementation Confidence | 코드 구조 분석은 매우 높음 / live 배포 동일성은 중간~높음 |
| Clean-room Code Mapping | solid-net-folding.ts, scene-graph.ts, serialization.ts |

## 제품 유형

이 서비스는 GeoGebra형 dynamic geometry engine도, Polypad형 open-ended workspace도 아닙니다.

가장 적절한 분류는:

> **고정 콘텐츠 기반 공간도형 마이크로 시뮬레이션 코스웨어**

입니다.

## 사용자의 직접 조작 대상

- 도형 선택 카드
- 접기/펼치기 slider
- 3D 장면 drag rotation
- 퀴즈 option

사용자는 face/edge를 직접 선택하거나 net을 직접 생성하지 않습니다.

## 핵심 state 비교

현재:

~~~text
UI State
├─ tab
├─ selected shape
├─ fold slider
├─ view rotation
└─ quiz state
~~~

확장형 권장:

~~~text
Solid Domain State
├─ faces
├─ edges
├─ vertices
├─ hinges
└─ fold progress

View State
├─ camera rotation
└─ zoom

Lesson State
├─ current activity
└─ quiz/progress
~~~

## 렌더링 분류

- 정육면체/직육면체: CSS rectangular faces
- 원기둥: rectangular strip approximation
- 원뿔: triangle fan approximation
- 구: static visual + explanation

## 가장 가까운 비교군

- Shapes 3D: 더 정교한 3D mesh/net visualization
- GeoGebra 3D: 범용 수학 object/dependency
- 알지오매스 3D: 교육과정형 입체/전개도
- Solid Figure: 가벼운 설명형 micro-courseware

## 구현 일반성 위치

~~~text
Dedicated Microtool
      ↓
Solid Figure
      ↓
Shapes 3D
      ↓
알지오매스 3D
      ↓
GeoGebra 3D
~~~

아래로 갈수록 topology, math object, generality가 강해집니다.
