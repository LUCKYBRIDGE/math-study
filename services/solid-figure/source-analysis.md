# Solid Figure 실제 소스 코드 분석

## 1. 기술 개요

package.json:
- React 19.2
- React DOM 19.2
- TypeScript 약 5.8
- Vite 6.2

별도 3D dependency가 거의 없습니다.

이 앱의 3D는 Three.js/Babylon/WebGL engine이 아니라 **CSS 3D**입니다.

## 2. App.tsx

역할:
- 전역 tab state
- Learn → Unfold shape 전달

핵심 state:

~~~text
currentTab
unfoldShape
~~~

router/store 없이 충분한 규모입니다.

서비스가 커진다면 명시적 route state로 바꾸는 것이 좋습니다.

## 3. types.ts

실제 domain data에 가장 가까운 파일:
- ShapeType
- ShapeDef
- QuizQuestion
- SHAPE_DATA

하지만 ShapeDef는 **교육 콘텐츠 metadata**이고 3D geometry data는 아닙니다.

~~~text
Content Model 있음
Geometry Model 없음
~~~

## 4. CubeNet.tsx

### 상태
- sliderValue
- rotX
- rotY

sliderValue 0 = folded.
sliderValue 90 = flat net.

~~~text
currentFoldAngle = 90 - sliderValue
~~~

### dimension

~~~text
W = 100
H = cuboid ? 150 : 100
D = cuboid ? 60 : 100
~~~

면 크기:
- front/back = W × H
- top/bottom = W × D
- left/right = D × H

직육면체의 face dimension 관계는 올바른 방향입니다.

### 핵심 구현

각 face를 absolute DOM으로 만든 뒤 transformOrigin, rotateX, rotateY, translateX/translateY를 사용합니다.

6번 face는 3번 face 내부에 nested됩니다.

이 nesting이 곧 hinge hierarchy입니다.

### 한계

명시적으로 없는 정보:
- face vertex
- edge ID
- edge adjacency
- hinge ID
- face normal
- fold direction

따라서 topology 기반 기능을 구현하기 어렵습니다.

## 5. CylinderNet.tsx

~~~text
SEGMENTS = 20
HEIGHT = 140
WIDTH_TOTAL = 260
SEGMENT_WIDTH = WIDTH_TOTAL / SEGMENTS
RADIUS = WIDTH_TOTAL / (2π)
~~~

R = circumference / 2π 관계를 사용하므로 수학적 아이디어는 좋습니다.

folded에서는 strip을 rotateY + translateZ로 둘레에 배치하고,
unfolded에서는 x축 방향으로 나란히 둡니다.

20개의 평면 strip으로 원기둥 곡면을 근사하므로 정확한 cylinder mesh는 아닙니다.

## 6. ConeNet.tsx

~~~text
SLANT_HEIGHT = sqrt(H² + R²)
SECTOR_ANGLE = 360 × R / SLANT_HEIGHT
~~~

원뿔 전개도 부채꼴의 중심각 공식을 올바르게 사용합니다.

표현은 12개의 삼각형 fan입니다.

- folded: y축 분산 + x축 tilt
- unfolded: z축 회전으로 sector fan

실제 circular sector path가 아니라 triangle approximation입니다.

## 7. LessonUnfold.tsx

ShapeType에 따라 renderer를 switch합니다.

~~~text
Cube → CubeNet
Cuboid → CubeNet(isCuboid)
Cylinder → CylinderNet
Cone → ConeNet
Sphere → static explanation
~~~

5개 도형에는 충분하지만 종류가 많아지면 renderer registry가 낫습니다.

## 8. LessonLearn.tsx

SHAPE_DATA를 content source로 사용합니다.

shape 선택 시 generateShapeRiddle을 호출하지만 실제 구현은:
- local static RIDDLES
- 500ms artificial delay

입니다.

## 9. QuizTime.tsx

state:
- currentQuestion
- loading
- selectedOption
- isCorrect
- score

nextQPromiseRef로 다음 문항 promise를 미리 만듭니다.

하지만 generateQuizQuestion은 local static array라 현재 성능상 필요성은 낮습니다.

random 선택이라 같은 문항이 연속으로 나올 수 있습니다.

## 10. geminiService.ts

이름과 달리 실제 Gemini SDK/API 호출이 없습니다.

실제 사용:
- RIDDLES
- QUIZ_POOL
- Math.random
- setTimeout

### 중요한 문제

README는 Gemini API key 설정을 요구하고 vite.config.ts는 API_KEY와 GEMINI_API_KEY를 client define에 넣을 수 있게 합니다.

현재 기능에는 필요 없습니다.

권장:
1. API key 설정 제거
2. geminiService.ts를 contentService.ts처럼 실제 역할에 맞게 변경
3. 생성형 AI가 필요하면 server-side endpoint에서 호출

브라우저 번들에 secret API key를 직접 넣지 않습니다.

## 11. index.html

특징:
- Tailwind Play CDN
- inline Tailwind config
- CSS perspective utilities
- AI Studio CDN importmap
- Vite entry

Vite 프로젝트인데 Tailwind를 build dependency로 두지 않고 Play CDN을 사용합니다.

prototype에는 편하지만 production에서는 외부 CDN 의존과 runtime CSS processing이 생깁니다.

## 12. 테스트/품질 인프라

현재 tree에서 확인되지 않음:
- unit tests
- component tests
- e2e tests
- lint config
- formatter config
- CI workflow
- lock file

geometry math가 늘어나면 domain unit test가 필요합니다.

## 13. 추천 테스트

### Cylinder
netWidth와 2πr 일치 검증.

### Cone
sector angle = 360r/l 검증.

### Cuboid
2×WH, 2×WD, 2×HD face dimension 검증.

### Folding
- flat state에서 face z≈0
- folded state에서 공유 edge 좌표 일치
- hinge graph cycle 없음
- disconnected face 없음

## 14. 코드 구조 평가

### 좋은 점
- 작은 component
- 기능 분리
- dependency 최소
- React state 이해 쉬움
- 교육 콘텐츠와 화면 흐름 명확

### 개선 우선순위
1. API key/template 잔재 제거
2. touch pointer 지원
3. geometry domain model 분리
4. test 추가
5. Tailwind build 통합
6. deep link/share
7. arbitrary net 지원
