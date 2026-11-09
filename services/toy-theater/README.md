# Toy Theater Virtual Manipulatives 정밀 분석

- 공식: https://toytheater.com/category/teacher-tools/virtual-manipulatives/
- 유형: 저학년 친화 가상교구/교사 도구
- 핵심 소스: 비공개
- 조사 기준: 2026-11

## 1. 서비스 위치

Toy Theater는 정교한 범용 수학 엔진보다 **학생이 설명 없이 바로 만질 수 있는 작은 시각 도구**에 강합니다.

현재 Virtual Manipulatives 범주에는:
- algebra
- counters
- estimation
- fractions
- geometry
- graphs
- money
- multiplication
- number chart
- number line
- place value
- probability
- time
등 다양한 하위 범주가 있습니다.

## 2. 핵심 UX: 낮은 학습 비용

Toy Theater 분석의 가치는 기술 복잡도가 아니라 **affordance**에 있습니다.

좋은 저학년 도구는:
- 버튼 이름을 읽지 않아도
- 무엇을 드래그할지 보이고
- 놓으면 즉시 결과를 확인하며
- 실패해도 쉽게 다시 할 수 있어야 합니다.

이 유형은 GeoGebra와 같은 power tool의 반대 극점입니다.

## 3. UI 표현 방식

대표적으로 확인되는 도구:
- Geoboard
- Fraction Strips
- Fraction Circles
- Equivalent Fraction models
- Number Line
- Area/Perimeter Explorer
- Interactive Clock

여기서는 수학 기호보다:
- 색
- 크기
- 겹침
- 위치
- 분할
- 회전
같은 visual property가 먼저 보입니다.

## 4. 저학년에서 중요한 피드백

복잡한 property panel보다
- 즉시 이동
- 즉시 색 변화
- 조각 맞물림
- 단순 reset
같은 feedback이 더 적합합니다.

### 설계 원칙

~~~text
see → touch → move → notice
~~~

설명과 설정은 그 다음입니다.

## 5. 다른 가상교구와의 차이

### Toy Theater
- 즉시 접근
- 시각적으로 단순
- 작은 single-purpose tools
- 저학년 친화

### Didax
- 물리 교구 충실도와 교사 자료 연계

### Brainingcamp
- 통합 shell + LIVE

### MLC
- 수학적 모델링과 전략 표현

### Polypad
- 자유도/확장성/API

따라서 Toy Theater는 '기능 많은 서비스'보다 **초기 사용성 benchmark**로 가치가 큽니다.

## 6. 기술 분석에서 주의할 점

핵심 소스가 공개되지 않았으므로:
- framework
- state library
- renderer
를 추정하지 않습니다.

Toy Theater는 기술 stack보다 UX observation 대상으로 보는 편이 정확합니다.

## 7. 가져올 패턴

- one-screen immediate use
- low text dependency
- strong visual affordance
- big hit target
- single-purpose interaction
- reset/retry friction 최소화
- 저학년용 색/형태 기반 의미 전달

## 8. 피해야 할 점

- 너무 장난감처럼 보여 수학적 의미가 약해지는 것
- 색에만 의미를 의존해 접근성이 낮아지는 것
- 저장/설명/공유가 없어 수업 산출물로 남기 어려운 것

## 9. 출처

- https://toytheater.com/category/teacher-tools/
- https://toytheater.com/category/teacher-tools/virtual-manipulatives/
