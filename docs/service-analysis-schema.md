# 서비스별 심층 분석 스키마

모든 서비스 폴더는 가능한 범위에서 아래 4개 층으로 분석합니다.

## A. classification
서비스를 다음 축으로 분류합니다.

| 축 | 값 예시 |
|---|---|
| Product Type | dynamic geometry / manipulative / simulation / data / classroom |
| Math Domain | number / algebra / geometry / data / probability |
| Interaction Grammar | tool-first / expression-first / gesture-first / manipulative-first |
| Core State Model | dependency graph / expression AST / tile document / dataset / lesson screens |
| Primary Representation | SVG / Canvas / WebGL / DOM / mixed |
| History Unit | construction / semantic command / tile mutation / response |
| Sharing Unit | document / short code / lesson / classroom session |
| Classroom Layer | none / assignment / live monitoring / orchestration |
| Source Visibility | verified source / public API / observed only |
| Reimplementation Confidence | high / medium / low |

## B. architecture
- 실제 공개 소스 경로
- 핵심 클래스/모듈 책임
- 상태 흐름
- 이벤트 흐름
- 렌더링 경계
- 저장/직렬화
- Undo/Redo
- 접근성
- 확장 포인트

## C. ui-ux
- 페이지/화면 지도
- toolbar/palette/panel/canvas
- 선택 상태
- 조작 문법
- 오류 피드백
- progressive disclosure
- 모바일/터치
- 교사용 흐름

## D. implementation-reference
세 종류를 반드시 구분합니다.

### [SOURCE-OBSERVED]
공개 소스에서 실제 확인한 구조·파일·타입.

### [BEHAVIOR-OBSERVED]
공식 UI/매뉴얼에서 확인한 동작.

### [CLEAN-ROOM]
위 행동을 신규 서비스에서 구현하기 위한 독립 구현 예시.

원본 코드의 비공개 부분이나 라이선스가 다른 코드를 그대로 복사하지 않습니다.

## 공통 구현 라이브러리

실제 재사용 가능한 TypeScript 코드는 ../../reference-implementations/ 아래에 둡니다.

- dependency graph
- command/history
- tool state machine
- tile document
- manipulative registry
- expression rewrite engine
- reactive property
- linked dataset
- lesson orchestrator
- serialization/share

서비스별 문서는 이 공통 구현 중 무엇을 조합해야 하는지 명시합니다.
