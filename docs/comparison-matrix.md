# 수학 교육 도구 전체 비교 매트릭스

> 2026-11 기준. 상세 근거는 각 서비스 문서에 분리합니다.

## 1. 수학 모델 비교

| 서비스 | 내부적으로 가장 중요한 개념 | 사용자가 직접 만지는 것 |
|---|---|---|
| 알지오매스 키즈 | 기하 객체·변환·3D 객체 | 점/선/도형/입체 |
| GeoGebra | GeoElement + dependency | 객체와 식 |
| Desmos | expression state | 식/그래프 |
| Polypad | tile/stroke document | 수학 교구 |
| PhET | simulation domain state | 개념별 물체/조절기 |
| Graspable Math | expression tree + rewrite | 식의 항/기호 |
| MLC | manipulative model | 수모형 |
| CODAP | dataset/case/attribute | 데이터/변수 |
| Cabri Express | dynamic construction | 도형/식/그래프 |
| Brainingcamp | manipulative workspace | 교구 객체 |
| Amplify Classroom | lesson screen/response | 수업 화면/응답 |
| Didax | single manipulative state | 단일 교구 |
| Toy Theater | visual manipulative | 시각 교구 |

## 2. 핵심 인터랙션 문법

| 서비스 | 조작 문법 |
|---|---|
| 알지오 | 도구 선택 → 대상 선택 → 생성 |
| GeoGebra | 객체/명령 생성 → 관계 유지 |
| Desmos | 식 입력 → 즉시 표현 |
| Polypad | 교구 drag/drop → 조합 |
| PhET | 변수/물체 조작 → 현상 관찰 |
| Graspable | 기호 drag/click → 대수 변환 |
| MLC | 수모형 직접조작 |
| CODAP | attribute drag → 표현 구성 |
| Cabri | construction → direct manipulation |
| Brainingcamp | toolkit/bin → workspace |
| Amplify | screen → student response → teacher orchestration |
| Didax | 교구 선택 → 즉시 조작 |
| Toy Theater | see → touch → move |

## 3. 표현 방식

| 서비스 | 주요 표현 |
|---|---|
| 알지오 | 2D, 3D, 측정, 문서 |
| GeoGebra | 식, 그래프, 기하, 표, 3D |
| Desmos | 식, 그래프, 표, Geometry, 3D, Audio |
| Polypad | 교구, 그림, 수식, 텍스트, 입체 |
| PhET | animated simulation |
| Graspable | 동적 수식 |
| MLC | 수모형 |
| CODAP | table, graph, map, card |
| Cabri | 기하, 그래프, 3D, 식 |
| Brainingcamp | 교구 + 주석 |
| Amplify | lesson screen + embedded math widget |
| Didax | 개별 교구 |
| Toy Theater | 저학년 visual model |

## 4. 기술 공개성

| 서비스 | 공개성 | 기술 분석 깊이 |
|---|---:|---:|
| GeoGebra | 높음 | 매우 높음 |
| CODAP | 높음 | 매우 높음 |
| Polypad | API 공개 | 높음 |
| PhET | 현행 core 제한 | 중간 |
| Desmos | core 비공개 | 중간 이하 |
| Brainingcamp | 비공개 | 중간 이하 |
| Didax | 비공개 | 중간 이하 |
| Cabri | 비공개 | 중간 이하 |
| MLC | 비공개 | 중간 이하 |
| Graspable | 비공개 | 중간 이하 |
| Amplify | 비공개 | UI/System 중심 |
| 알지오 | 비공개 | UI/System 중심 |
| Toy Theater | 비공개 | UX 중심 |

## 5. 확인된 기술

| 서비스 | 확인된 기술/구조 |
|---|---|
| GeoGebra | Java shared kernel, Web/Desktop modules, 2D/3D view 계층 |
| CODAP v3 | React, TypeScript, MobX State Tree, D3, PixiJS, Leaflet, dnd-kit, Jest, Cypress |
| Polypad | JavaScript API, Web Components, Web Animations, JSON serialization |
| PhET | HTML5, SceneryStack 공식 접근성 구조 |
| Brainingcamp | Canvas-based workspace |
| Didax | HTML5 + JavaScript |
| Cabri Express | browser based, 2D/3D/graph/equation integrated |
| 나머지 | 공개 근거 범위까지만 기록 |

## 6. 화면 복잡도와 진입장벽

| 서비스 | 초기 복잡도 | 초등 직접 사용 |
|---|---:|---:|
| Toy Theater | 매우 낮음 | 매우 높음 |
| Didax | 낮음 | 매우 높음 |
| MLC | 낮음 | 높음 |
| Brainingcamp | 낮음~중간 | 높음 |
| Polypad | 중간 | 높음~중간 |
| PhET | 개념별 낮음 | 높음 |
| 알지오 | 중간 | 중간~높음 |
| Amplify | 학생 낮음 / 교사 중간 | 높음 |
| Cabri | 중간 | 중간 |
| Desmos | 중간 | 중간 이하 |
| GeoGebra Classic | 높음 | 낮음 |
| Graspable | 중간 | 중간 이하 |
| CODAP | 중간 | 5학년 이상 적합 |

## 7. 개방형 탐구 ↔ 정답형

~~~text
개방형 탐구
Polypad ─ GeoGebra ─ CODAP ─ PhET ─ MLC/Brainingcamp ─ Graspable ─ 연습 플랫폼
                                                              정답 지향
~~~

이는 절대적 순위가 아니라 기본 사용 흐름의 성격입니다.

## 8. 표현 연결 강도

### 매우 강함
- GeoGebra
- CODAP
- Desmos

이들은 하나의 상태/identity가 여러 표현에서 공유됩니다.

### 중간
- 알지오
- Cabri
- Polypad
- PhET

다중 표현을 제공하지만 서비스/활동에 따라 연결 강도가 달라집니다.

### 조작물 중심
- MLC
- Brainingcamp
- Didax
- Toy Theater

표현을 많이 연결하기보다 한 수학 모델을 강하게 시각화합니다.

## 9. Undo/History 가치

| 서비스 유형 | 이상적인 history 단위 |
|---|---|
| 동적 기하 | create/transform/delete construction |
| 가상교구 | add/move/merge/split tile |
| 대수 | rewrite operation |
| 데이터 | attribute/graph/filter operation |
| 시뮬레이션 | 탐구 목적에 따라 selective history |
| 수업 플랫폼 | 학생 response revision + teacher action |

UI 좌표 변화 자체보다 **수학적 의미가 있는 command**를 history로 남기는 편이 좋습니다.

## 10. 저장 상태를 나눠야 하는 이유

최소 다음을 분리하는 것이 좋습니다.

~~~text
Document State
Viewport State
User Preference
Session State
Classroom State
Analytics/History
~~~

Polypad은 viewport를 document와 분리하고, CODAP은 persistent preference와 document history를 분리하는 좋은 사례입니다.

## 11. 초등용 신규 서비스 설계 조합

### 수감각/연산
- MLC의 수모형
- Brainingcamp의 공통 shell
- Didax의 단순함
- Polypad의 serialization

### 도형/공간
- 알지오의 교육과정 친화 도구명
- GeoGebra의 dependency
- Cabri의 dynamic manipulation
- PhET의 causal animation

### 데이터/통계
- CODAP의 shared dataset
- attribute drag
- linked table/graph
- 실제 데이터 import

### 수업 시스템
- Amplify의 lesson screen
- Brainingcamp LIVE의 실시간 관찰
- 알지오 과제 template
- 짧은 join/share code

## 12. 가장 피해야 할 설계

- 기능을 한 화면에 전부 노출
- canvas shape와 math object를 동일시
- 각 view가 자기 데이터를 따로 가짐
- drag를 pixel movement로만 저장
- Undo를 매 mousemove마다 기록
- viewport와 document를 같은 상태로 저장
- 수업 shell이 math engine 내부 구현에 강결합
- 접근성을 개발 마지막에 추가
- 비공개 서비스 내부 기술을 근거 없이 추정

## 13. 분석 우선순위

신규 서비스를 설계할 때 먼저 결정할 것:

1. 핵심 수학 state는 무엇인가?
2. 학생이 직접 만지는 representation은 무엇인가?
3. gesture를 어떤 semantic operation으로 바꿀 것인가?
4. 어떤 관계를 constraint로 강제할 것인가?
5. 어떤 표현을 같은 identity로 연결할 것인가?
6. history 단위는 무엇인가?
7. document/share 포맷은 무엇인가?
8. 교사 시스템과 math engine의 경계는 어디인가?
