# Didax Virtual Manipulatives 정밀 분석

- 공식: https://www.didax.com/virtual-manipulatives.html
- 유형: 단일 개념 가상교구 모음
- 기술: 공식 FAQ 기준 HTML5 + JavaScript
- 핵심 소스: 비공개
- 조사 기준: 2026-11

## 1. 서비스 위치

Didax는 하나의 거대한 workspace보다 **교구 하나당 간단한 웹 도구를 제공하는 micro-tool 전략**이 강합니다.

현재 공식 목록에는:
- Unifix Cubes
- Ten Frames
- Number Lines
- Rekenrek
- Fraction Tiles & Number Line
- Two-Color Counters
- Number Board
- Color Tiles
- Base Ten Blocks
- Math Balance
- Dice
- Spinners
- Pattern Blocks
- Place Value Disks
- Geoboard
- Prime Factor Tiles
- Algebra Tiles
등이 있습니다.

## 2. 기술적으로 확인되는 사항

공식 FAQ:
- web based
- HTML5
- JavaScript 필요
- Chrome 권장
- Safari/Firefox/Edge 지원
- Android/iOS 별도 standalone app 없음
- tablet/smartphone browser에서 동작

즉 배포 전략은 **웹 단일 코드베이스**입니다.

## 3. Micro-tool의 장점

학생이 Number Line을 쓰려면 Number Line 앱만 열면 됩니다.

~~~text
concept
 → dedicated tool
 → immediate manipulation
~~~

범용 앱보다:
- 초기 메뉴가 적고
- 기능 탐색 시간이 짧고
- 수업 설명이 쉬움

초등 수업에서는 이 단순성이 매우 중요합니다.

## 4. 표현 방식

Didax는 물리 교구를 디지털로 거의 직접 옮깁니다.

예:
- Base Ten Blocks → place value
- Fraction Tiles → fraction magnitude/equivalence
- Rekenrek → 5/10 구조
- Math Balance → equality
- Algebra Tiles → symbolic structure
- Geoboard → shape/area

핵심은 계산식을 먼저 보여주기보다 **크기·위치·묶음·균형**을 수학 표현으로 사용하는 것입니다.

## 5. UI 구조의 예상 패턴

공개 소스는 없으므로 아래는 **[INFERRED]**입니다.

~~~text
Dedicated App
├─ Manipulative Palette
├─ Workspace
├─ Reset/Clear
├─ Object Controls
└─ Optional annotation
~~~

통합 shell보다 앱별로 최소한의 기능만 노출하는 편으로 보는 것이 적절합니다.

## 6. Brainingcamp/MLC/Polypad와 비교

### Didax
- 단일 교구 앱
- 단순함
- 무료 접근
- HTML5

### Brainingcamp
- 18개 교구의 공통 shell
- LIVE 실시간 수업

### MLC
- 교구별 앱 + MultiApp 통합 방향
- 수학 모델의 교육적 설계가 강함

### Polypad
- 가장 범용적인 canvas/document
- API/embed 강함

## 7. 장점

1. 수업 목적과 앱이 1:1로 대응
2. 초등학생의 진입장벽 낮음
3. 브라우저만 있으면 됨
4. 물리 교구와 전이가 쉬움
5. 교사가 특정 개념에 집중하기 좋음

## 8. 한계

1. 교구를 바꾸면 앱을 이동해야 함
2. 여러 표현을 한 화면에서 결합하기 어려움
3. 학생 작업을 하나의 문서/포트폴리오로 묶기 어려움
4. 공통 Undo/Share/Classroom 기능을 각 앱에서 중복 구현할 위험

## 9. 가져올 패턴

- concept-first launch
- micro-tool
- low UI chrome
- web-only distribution
- physical manipulative fidelity
- 한 화면에 필요한 기능만 제공

## 10. 출처

- https://www.didax.com/virtual-manipulatives.html
- https://www.didax.com/didax-virtual-manipulative-faq-s
