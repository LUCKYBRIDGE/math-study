# Brainingcamp 정밀 분석

- 공식: https://www.brainingcamp.com/
- 대상: K-8 중심
- 주 유형: 가상 수학 교구 + 실시간 수업
- 핵심 소스: 비공개
- 조사 기준: 2026-11

## 1. 서비스 위치

Brainingcamp은 18종의 대표 교실 수학 교구를 하나의 일관된 workspace UI로 제공합니다.

공식 현재 목록:
- Algebra Tiles
- Bar Models
- Base Ten Blocks
- Clock
- Color Tiles
- Cuisenaire Rods
- Fraction Circles
- Fraction Tiles
- Geoboard
- Hundred Board
- Linking Cubes
- Money
- Number Lines
- Pattern Blocks
- Place Value Disks
- Rekenreks
- Two-Color Counters
- XY Coordinate Board

MLC보다 상용 통합 플랫폼 성격이 강하고, Polypad보다 교실 수업에 집중합니다.

## 2. 공식 UI terminology

Brainingcamp 공식 brand/UI guideline은 Fraction Tiles 화면을 기준으로 모든 manipulatives에 공통인 UI 명칭을 공개합니다.

1. Toolkit
2. Bin
3. Workspace Menu
4. Settings
5. View Controls
6. Options
7. Drawing
8. Workspace

Toolkit 내부 범주:
- Objects
- Tools
- Shapes
- Annotate

이 정보는 매우 가치가 큽니다.

교구마다 완전히 새로운 화면을 만들지 않고 **공통 shell + 교구별 object/tool set**을 사용한다는 뜻입니다.

## 3. 공통 shell 패턴

분석 모델:

~~~text
Manipulative App Shell
├─ Toolkit
│  ├─ Objects
│  ├─ Tools
│  ├─ Shapes
│  └─ Annotate
├─ Bin
├─ Workspace Menu
├─ Settings
├─ View Controls
├─ Options
├─ Drawing
└─ Workspace
~~~

### 장점
- 한 교구를 익히면 다른 교구도 쉽게 사용
- 수업 중 UI 재학습 비용 감소
- 신규 manipulative 추가가 쉬움

## 4. Canvas 기반 workspace

2026 접근성 적합성 보고서는 Brainingcamp을
**Canvas-based workspace를 primary interactive area로 사용하는 K-8 math manipulative apps suite**라고 명시합니다.

따라서 최소한 현재 핵심 조작 영역은 Canvas 계열 렌더링을 사용하는 것으로 공식 확인됩니다.

### 설계 의미

Canvas는:
- 많은 draggable object
- 자유 배치
- drawing
- zoom/pan
에 유리합니다.

반면 접근성에서는 DOM 의미 구조가 약하므로 별도 keyboard/screen-reader 레이어가 필요합니다.

실제로 해당 보고서는 VoiceOver/NVDA를 사용한 수동 접근성 테스트를 설명합니다.

## 5. 조작물 표현 방식

Brainingcamp의 핵심은 수학 개념을 **화면 object의 물성**으로 바꾸는 것입니다.

예:
- base ten: 크기/묶음이 place value를 표현
- fraction tile: 길이가 분수 크기를 표현
- geoboard: peg 연결이 polygon을 표현
- rekenrek: 색과 묶음이 5/10 구조를 표현

식이나 설명보다 **모양·크기·정렬·색**이 수학적 의미를 전달합니다.

## 6. Toolkit / Bin UX

Bin의 존재는 물리 교구의 '보관함' 은유를 디지털화한 것으로 볼 수 있습니다.

~~~text
Bin
 → object pick
 → workspace placement
 → manipulate
 → return/delete
~~~

이 은유는 초등학생에게 파일/레이어/객체 목록보다 자연스럽습니다.

## 7. Annotation 결합

Toolkit에 Annotate가 별도 범주로 존재합니다.

이는:
- 수학 객체
- 보조 도구
- 기하 shape
- 학생 설명

을 같은 workspace에 결합한다는 뜻입니다.

좋은 초등 수학 앱은 '답을 만드는 기능'과 '생각을 설명하는 기능'이 분리되지 않아야 합니다.

## 8. Brainingcamp LIVE

공식 LIVE 기능:
- 교사가 모든 학생 화면 확인
- 학생 progress 모니터링
- instant feedback
- 학생 작업은 교사에게만 보임
- LIVE session code

이 구조는 가상교구와 classroom orchestration을 직접 결합합니다.

~~~text
Teacher starts session
 → session code
 → students join
 → each student has workspace state
 → teacher receives live previews/state
 → teacher gives feedback
~~~

## 9. 시스템적으로 필요한 구조

**[INFERRED]**

LIVE를 구현하려면 최소 다음이 필요합니다.

~~~text
Session
├─ teacher
├─ students[]
├─ workspaceId per student
├─ state/update channel
└─ feedback channel
~~~

전송이 full screenshot인지 document state인지 incremental update인지 공식 근거가 없어 단정하지 않습니다.

## 10. UI/UX 장점

1. 교구 간 공통 shell
2. 학습자가 object부터 잡을 수 있음
3. Bin/Workspace 같은 친숙한 은유
4. annotation을 같은 작업공간에 제공
5. 실시간 수업 모니터링 결합
6. 터치 중심 교구와 teacher dashboard가 연결됨

## 11. 위험

1. Canvas 접근성 구현 난도가 높음
2. 교구가 18개로 늘면서 Toolkit이 복잡해질 수 있음
3. LIVE가 학생 자유 탐구를 지나치게 감시하는 느낌을 줄 수 있어 수업 설계가 중요
4. 교구별 semantic state가 공통 문서 모델에 얼마나 통일되어 있는지는 외부에서 확인 불가

## 12. 가져올 패턴

- common manipulative shell
- Toolkit / Bin / Workspace
- object/tool/shape/annotate 분류
- Canvas workspace + accessible alternative layer
- LIVE session
- teacher-only student preview
- session code
- manipulative-specific options inside common UI

## 13. 출처

- https://www.brainingcamp.com/
- https://app.brainingcamp.com/tutorials
- https://www.brainingcamp.com/live
- https://www.brainingcamp.com/partners/guidelines
- https://www.brainingcamp.com/acr-manipulatives
