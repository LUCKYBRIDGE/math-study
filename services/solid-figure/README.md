# Solid Figure / 奇妙图形探险队 정밀 분석

- 서비스: https://solid-figure.pages.dev/
- 대응 공개 저장소 후보: terry197808/solid-figure
- 제품 성격: **초등 입체도형 인식 + 전개/접기 시각화 + 퀴즈 코스웨어**
- 대상 표기: 중국 초등 1학년 상권
- 소스 공개성: **[VERIFIED-SOURCE] 코드 자체는 공개** / **[UNKNOWN] live Cloudflare Pages 배포와 저장소의 직접 연결은 metadata에서 확인되지 않음**
- 조사 기준: 2026-11

## 1. 한 문장 평가

이 서비스는 **범용 3D 수학 엔진이 아니라, 정해진 몇 개 입체를 CSS 3D transform으로 가볍게 설명하는 소형 교육 코스웨어**입니다.

핵심 장점:
- React와 CSS만으로 구현 난도가 낮음
- 학습 흐름이 명확함
- 정육면체/직육면체 접기·펼치기 효과가 큼
- WebGL/Three.js 없이 초등용 3D 설명 가능

핵심 한계:
- 입체의 면/모서리/꼭짓점이 수학 객체로 모델링되어 있지 않음
- 전개도 topology가 JSX 구조에 하드코딩됨
- 원기둥/원뿔은 여러 평면 조각으로 곡면을 근사
- 임의 전개도, 사용자 제작, 정확한 hidden-edge 판정, 충돌 검증으로 확장하기 어려움

## 2. 제품 구조

~~~text
App
├─ Learn
│  ├─ Shape Gallery
│  ├─ Characteristics
│  ├─ Riddle
│  └─ Go to Unfold
├─ Unfold
│  ├─ Cube
│  ├─ Cuboid
│  ├─ Cylinder
│  ├─ Sphere
│  └─ Cone
└─ Quiz
   ├─ Random Question
   ├─ Immediate Feedback
   └─ Score
~~~

전역 router library는 없고 App.tsx의 local state로 탭을 전환합니다.

## 3. 실제 폴더 구조

~~~text
solid-figure/
├─ App.tsx
├─ index.tsx
├─ index.html
├─ types.ts
├─ metadata.json
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ components/
│  ├─ NavBar.tsx
│  ├─ LessonLearn.tsx
│  ├─ LessonUnfold.tsx
│  ├─ CubeNet.tsx
│  ├─ CylinderNet.tsx
│  ├─ ConeNet.tsx
│  └─ QuizTime.tsx
└─ services/
   └─ geminiService.ts
~~~

## 4. 확인된 기술

package.json 기준:
- React 19.2
- React DOM 19.2
- TypeScript 5.8
- Vite 6
- Tailwind Play CDN
- 별도 3D 라이브러리 없음
- 별도 상태관리 라이브러리 없음
- 별도 router 없음
- 별도 backend 없음

3D는 CSS perspective, preserve-3d, rotateX/rotateY/rotateZ, nested DOM hierarchy로 구현합니다.

## 5. 현재 상태 모델

현재 앱은 수학 문서 state보다 **화면 state** 중심입니다.

~~~text
App
├─ currentTab
└─ unfoldShape

Learn
├─ selectedShape
├─ riddle
└─ loadingRiddle

Cube/Cuboid
├─ sliderValue
├─ rotX
└─ rotY

Cylinder/Cone
├─ fold
├─ rotX
└─ rotY

Quiz
├─ currentQuestion
├─ selectedOption
├─ isCorrect
├─ score
└─ nextQuestionPromise
~~~

중요한 점은 **solid 자체를 표현하는 공통 domain model이 없다는 것**입니다.

## 6. 학습 흐름 UX

~~~text
도형 선택
→ 특징 읽기
→ 수수께끼
→ "拆开看看"
→ 접기/펼치기 조작
→ 퀴즈
~~~

GeoGebra처럼 도구 사용법을 먼저 익히는 구조가 아니라 **콘텐츠 안내형**입니다.

## 7. 수학 표현 방식

### 정육면체/직육면체
6개의 DOM face를 CSS 3D transform으로 접습니다.

### 원기둥
측면을 20개의 세로 직사각형 조각으로 나누어 원통처럼 배치합니다.

### 원뿔
측면을 12개의 삼각형 조각으로 나누어 원뿔처럼 배치합니다.

### 구
실제 3D geometry가 아니라 emoji + 원형 visual입니다.

## 8. 교육적 강점

1. 입체 → 전개도 전환을 slider 하나로 관찰 가능
2. 반대쪽 면을 색으로 대응시키는 방식이 직관적
3. 원기둥/원뿔의 측면이 어떤 평면 형태로 펼쳐지는지 시각화
4. 실물 예시와 특징 문장을 결합
5. 즉시 피드백 퀴즈
6. 모바일 화면을 고려한 responsive layout

## 9. 구조적으로 가장 좋은 점

고정된 5개 도형의 개념 설명만 목표라면 Three.js를 도입하지 않은 것은 합리적입니다.

CSS 3D는:
- 번들 가벼움
- text/label 쉬움
- React와 직접 결합
- 초기 구현 빠름

이라는 장점이 있습니다.

## 10. 구조적으로 가장 큰 한계

현재 topology가 **DOM 구조 자체에 숨어 있습니다.**

CubeNet에서 6번 면은 3번 면 DOM 안에 nested됩니다.

~~~text
Face 1
├─ Face 2
├─ Face 3
│  └─ Face 6
├─ Face 4
└─ Face 5
~~~

즉 3번과 6번이 hinge 관계라는 사실, 공유 edge, 접힘 각도가 별도 데이터가 아니라 JSX 배치에 들어 있습니다.

고정 전개도 하나에는 빠르지만 여러 전개도/사용자 전개도/일반 다면체로 확장하기 어렵습니다.

## 11. 상세 문서

- [서비스 분류](classification.md)
- [UI/UX 분석](ui-ux.md)
- [실제 코드 분석](source-analysis.md)
- [수학·기하 정확성 분석](math-correctness.md)
- [재구현/확장 설계](implementation-reference.md)

## 12. 총평

### 현재 목표에 적합
- 초등 입체도형 소개
- 고정 도형 몇 개
- 접기/펼치기 관찰
- 설치 없는 웹 코스웨어

### 다음 목표에는 구조 변경 필요
- 다양한 전개도
- 학생이 직접 전개도 제작
- 면/모서리/꼭짓점 클릭
- 겹치는 면 판정
- 접었을 때 성립 여부 검증
- 보이는 모서리/가려진 모서리 판정
- 일반 다면체
- 정확한 3D mesh

이 단계부터는 **Face + Hinge + Topology + 3D Transform**을 별도 domain model로 만드는 것이 적절합니다.
