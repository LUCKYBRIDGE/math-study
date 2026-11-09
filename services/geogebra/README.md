# GeoGebra 정밀 분석

- 공식 사이트: https://www.geogebra.org/
- 공개 소스: https://github.com/geogebra/geogebra
- 조사 기준: 2026-11
- 소스 신뢰도: **[VERIFIED-SOURCE] 현재 공식 GitHub mirror**

## 1. 서비스의 핵심

GeoGebra의 본질은 '많은 계산기를 한 앱에 넣은 것'보다 **수학 객체와 그 의존 관계를 공통 엔진에서 관리하고 여러 뷰로 표현하는 것**에 가깝습니다.

공식 서비스는 현재 다음 앱을 제공합니다.

- Scientific Calculator
- Graphing Calculator
- Geometry
- Calculator Suite
- CAS
- 3D Graphing
- Classic 6
- Notes

또한 Classroom을 통해 학생 진행 상황을 실시간으로 확인하는 수업 흐름도 제공합니다.

## 2. 핵심 개념: 하나의 객체, 여러 표현

예를 들어 두 점 A, B로 직선을 만들면

~~~text
Point A ─┐
         ├─ Line AB
Point B ─┘
~~~

Line AB는 독립 그림이 아니라 A와 B에 의존하는 파생 수학 객체입니다.

따라서 A를 드래그하면

~~~text
pointer move
 → Point A coordinates change
 → dependent algorithms recompute
 → Line AB changes
 → labels / algebra / measures update
 → view redraw
~~~

가 일어납니다.

이 구조가 GeoGebra의 가장 중요한 벤치마킹 포인트입니다.

## 3. 실제 monorepo 최상위 분리

공식 저장소의 settings.gradle.kts에서 다음 빌드가 분리되어 있음을 확인할 수 있습니다.

~~~text
source/
├─ build-logic
├─ shared
├─ desktop
└─ web
~~~

루트 settings.gradle.kts는 shared, desktop, web을 별도 included build로 연결합니다.

### 의미

- **shared**: 플랫폼과 무관한 수학/domain 로직
- **web**: 브라우저용 UI/어댑터
- **desktop**: 데스크톱용 UI/어댑터
- **build-logic**: 빌드 설정

수학 엔진을 플랫폼 UI와 분리한 구조입니다.

## 4. Web 모듈 구조

source/web/settings.gradle.kts에서 확인되는 실제 모듈:

~~~text
source/web/
├─ canvas-web
├─ carota-web
├─ editor-web
├─ gwt-generator
├─ gwtutil
├─ keyboard-web
├─ renderer-web
├─ uitest
├─ web
├─ web-common
└─ web-dev
~~~

이 구조가 시사하는 점:

- canvas/rendering/editor/keyboard를 별도 모듈로 분리
- web-common에 공통 브라우저 코드
- web에 완성 앱 구성
- uitest로 UI 테스트 분리

'수학 기능 폴더'만 나누는 것이 아니라 **입력·렌더링·편집기 같은 기반 시스템을 모듈로 분리**합니다.

## 5. 수학 domain의 실제 경로

### Kernel

실제 파일:
- source/shared/common/src/main/java/org/geogebra/common/kernel/Kernel.java
- source/shared/common/src/main/java/org/geogebra/common/kernel/KernelCAS.java
- source/shared/common/src/main/java/org/geogebra/common/geogebra3D/kernel3D/Kernel3D.java

Kernel은 앱 UI보다 아래에 위치한 수학 코어 계층으로 볼 수 있습니다.

### GeoElement

실제 파일:
- source/shared/common/src/main/java/org/geogebra/common/kernel/geos/GeoElement.java
- source/shared/common/src/main/java/org/geogebra/common/geogebra3D/kernel3D/geos/GeoElement3D.java

GeoElement 계층이 점·선·도형·수치·텍스트 같은 수학 객체의 공통 기반 역할을 합니다.

### Command processors

실제 경로:
- source/shared/common/src/main/java/org/geogebra/common/kernel/commands/

실제 파일 예:
- CmdLine.java
- CmdArea.java
- CmdSolve.java
- CmdConic.java
- CmdRay.java

즉 'Line', 'Area', 'Solve' 같은 수학 명령이 UI 버튼 코드와 분리된 command processor로 존재합니다.

### Transform

실제 파일:
- Transform.java
- TransformTranslate.java
- TransformMirror.java
- TransformRotate.java
- TransformDilate.java

위치는 source/shared/common/src/main/java/org/geogebra/common/kernel/ 입니다.

도형 이동/대칭/회전/확대를 별도의 domain operation으로 분리한 구조가 명확합니다.

## 6. 2D View 계층

실제 핵심 파일:
- source/shared/common/src/main/java/org/geogebra/common/euclidian/EuclidianView.java
- EuclidianViewCompanion.java
- EuclidianViewBoundsImp.java

Web 구현:
- source/web/web-common/src/main/java/org/geogebra/web/html5/euclidian/EuclidianViewW.java
- EuclidianViewWrapperPanel.java

Desktop 구현:
- source/desktop/desktop/src/main/java/org/geogebra/desktop/euclidian/EuclidianViewD.java

이 패턴은 매우 중요합니다.

~~~text
shared EuclidianView concepts
   ├─ Web adapter/view
   └─ Desktop adapter/view
~~~

수학 화면의 의미와 플랫폼별 렌더링 세부를 분리합니다.

## 7. 3D 구조

실제 경로:
- source/shared/common/src/main/java/org/geogebra/common/geogebra3D/

하위에서 확인되는 역할:
- kernel3D
- euclidian3D
- kernel3D/geos
- kernel3D/algos
- kernel3D/commands
- openGL 관련 구조
- shader

Web 3D view 예:
- source/web/web/src/main/java/org/geogebra/web/geogebra3D/web/euclidian3D/EuclidianView3DW.java

Desktop 3D view 예:
- source/desktop/desktop/src/main/java/org/geogebra/desktop/geogebra3D/euclidian3D/EuclidianView3DD.java

2D와 마찬가지로 **3D 수학 모델과 플랫폼 view를 분리**합니다.

## 8. 객체 중심 아키텍처

분석용으로 단순화하면 다음과 같습니다.

~~~text
Input
  ↓
Command / Tool
  ↓
Kernel
  ↓
GeoElement + Algo/Dependency
  ↓
Construction State
  ↓
Euclidian / Algebra / 3D / Spreadsheet View
~~~

실제 코드는 훨씬 복잡하지만, 신규 수학 도구 설계 시 이 정도 추상화는 매우 유용합니다.

## 9. 왜 식과 도형이 같이 움직이는가

GeoGebra의 강점은 그래픽 객체와 대수 객체가 별도 앱의 복제 데이터가 아니라 **같은 수학 객체를 다른 방식으로 보는 것**에 있습니다.

예:

~~~text
GeoPoint
  ├─ Euclidian view: 화면의 점
  ├─ Algebra view: A = (2,3)
  └─ dependent algorithms: 선, 원, 거리...
~~~

이 구조는 '그래프 캔버스 데이터'와 '식 목록 데이터'를 따로 관리하는 것보다 일관성이 강합니다.

## 10. UI/UX 관점

### 장점
- 객체를 드래그하면 관계가 즉시 갱신
- 직접 조작과 정확한 명령 입력을 같이 지원
- Geometry, Graphing, CAS, 3D가 공통 수학 엔진을 공유
- Notes에서 계산기/기하 도구를 학습 문서 안에 포함 가능

### 단점
- Classic 수준에서는 초보자에게 도구가 많음
- 수학 객체 개념이 강해 저학년에는 추상적
- 기능 밀도가 높아 작은 화면에서 인지 부하가 큼

따라서 신규 초등 도구에서 GeoGebra 전체 UI를 복제할 필요는 없고 **kernel/object/dependency 설계만 가져오는 편**이 좋습니다.

## 11. Notes의 의미

공식 도움말 기준 Notes는 다음을 한 화면에서 지원합니다.

- 펜/형광펜
- 이미지/동영상/오디오/웹
- 텍스트/표/수식
- 마인드맵
- Geometry 요소
- 거리/각 측정
- Calculator Suite embed
- 여러 페이지
- 공유/협업

이는 알지오 문서와 비교할 가치가 큽니다.

공통점:
- 수학 작업물을 문서 안에 포함

차이점:
- GeoGebra는 공통 엔진의 계산기/기하 앱을 embed하는 방향이 강함
- 알지오 키즈는 초등 수업용 콘텐츠/과제 흐름과 강하게 결합

## 12. 재사용 가치가 큰 실제 구조

추천:

~~~text
domain/
  kernel/
  objects/
  algorithms/
  commands/
  transforms/

views/
  geometry2d/
  algebra/
  table/
  scene3d/

platform/
  web/
  desktop/
~~~

UI 컴포넌트 이름보다 **domain을 먼저 분리**하는 것이 핵심입니다.

## 13. 구현 시 특히 참고할 파일군

### 객체
- kernel/geos/GeoElement.java

### 계산 엔진
- kernel/Kernel.java

### 명령
- kernel/commands/CmdLine.java
- kernel/commands/CmdArea.java
- kernel/commands/CmdSolve.java

### 변환
- kernel/TransformTranslate.java
- kernel/TransformMirror.java
- kernel/TransformRotate.java

### 2D
- euclidian/EuclidianView.java
- web html5/euclidian/EuclidianViewW.java

### 3D
- geogebra3D/kernel3D/Kernel3D.java
- geogebra3D/euclidian3D/EuclidianView3D.java
- web/.../EuclidianView3DW.java

## 14. 가져올 것 / 피할 것

### 가져올 것
- 공통 Math Object
- dependency graph
- platform-independent domain
- command/transform 분리
- 하나의 객체에 여러 representation
- 2D/3D의 공통 수학 계층

### 그대로 가져오지 않을 것
- 초등 서비스에 Classic의 전체 메뉴 밀도
- 처음부터 CAS/3D/통계까지 한 화면에 노출
- 수학 명령 이름만으로 탐색해야 하는 UI

## 15. 주요 출처

- https://www.geogebra.org/about
- https://help.geogebra.org/hc/en-us/articles/10470108053277-GeoGebra-Apps
- https://help.geogebra.org/hc/en-us/articles/10449195076893-Notes
- https://github.com/geogebra/geogebra
- https://github.com/geogebra/geogebra/blob/main/settings.gradle.kts
- https://github.com/geogebra/geogebra/blob/main/source/web/settings.gradle.kts
