# Cabri Express 정밀 분석

- 공식: https://cabri.com/en/student/cabri-express/index.html
- 유형: 동적 기하 + 그래프 + 3D + 수식 편집
- 대상: 초등~대학
- 핵심 소스: 비공개
- 조사 기준: 2026-11

## 1. 서비스 위치

Cabri Express는 범용 동적 수학 toolkit입니다.

공식적으로 한 앱에 다음이 포함됩니다.

- scientific calculator
- graphical calculator
- 3D calculator
- equation editor
- dynamic geometry

즉 GeoGebra와 같은 **통합 동적 수학 환경** 범주에 놓는 것이 적절합니다.

## 2. 설계 철학

공식 설명은 학생이 abstract mathematical concepts를
- visualize
- manipulate
- explore
- model
- investigate
하도록 하는 laboratory 성격을 강조합니다.

따라서 정답형 exercise보다 **동적 객체를 움직여 관계를 관찰하는 방식**이 중심입니다.

## 3. 표현 통합

Cabri Express의 중요한 점은 다음 표현을 한 환경에 모은다는 것입니다.

~~~text
number/calculation
equation
2D dynamic geometry
graph
3D
~~~

수학 개념을 별도 앱으로 분리하기보다 서로 전환 가능한 toolkit으로 제공합니다.

## 4. Dynamic Geometry의 핵심

Cabri 전통의 핵심은 construction입니다.

단순 그림:
- 선을 화면에 그림

동적 construction:
- 두 점으로 선을 정의
- 점을 움직여도 선이 관계를 유지
- 측정값/그래프가 같이 변함

따라서 내부적으로는 **[INFERRED]**
- geometric object
- construction relation
- dependency
- recalculation
구조가 필요합니다.

실제 내부 클래스/파일 구조는 공개되어 있지 않아 단정하지 않습니다.

## 5. UI/UX 특징

공식 설명은 friendly interface와 ergonomic principles를 강조합니다.

Cabri II Plus 공식 설명을 보조 비교하면:
- structured interface
- transformations
- measurements
- calculus
- tables
- graphical representations
- expressions/equations
- figure movement의 즉시 시각화
같은 Cabri 계열의 설계 철학을 확인할 수 있습니다.

Cabri Express 자체도 이 전통을 웹 환경으로 단순화한 것으로 보는 것이 합리적입니다.

## 6. 2D/3D 통합

공식 기능에서 3D calculator를 별도 제공하는 것이 확인됩니다.

### 설계상 중요한 점

2D와 3D가 한 toolkit에 들어가려면:

~~~text
Math Command Layer
  ├─ 2D objects
  ├─ 3D objects
  └─ shared numeric/expression layer
~~~

처럼 표현별 renderer와 공통 수학 의미를 분리하는 것이 바람직합니다.

이는 분석용 권장 모델이며 실제 Cabri 내부 구현을 뜻하지 않습니다.

## 7. Equation Editor와 Geometry

기하 작업과 식 입력이 한 앱에 있다는 점은 교육적으로 중요합니다.

학생은:
- 도형을 조작하고
- 측정하고
- 수식을 입력하며
- 그래프로 관계를 볼 수 있습니다.

즉 representation switching이 가능합니다.

## 8. Universal Web Access

공식 현재 설명:
- all devices
- all browsers
- no third-party resources dependency

또 기업용 소개는 LMS/ENT 같은 웹 플랫폼에 즉시 통합 가능하다고 설명합니다.

이는 학교 배포 관점에서:
- 설치 부담 감소
- 브라우저 접근
- LMS embed 가능성
이 중요하다는 뜻입니다.

## 9. Cabri의 history 철학 참고

Cabri II Plus는 figure history를 저장하고 학생 작업을 replay하는 기능을 공식적으로 설명합니다.

Cabri Express에서 동일 내부 구현이 존재한다고 단정할 수는 없지만, Cabri 계열의 교육 설계에서 **construction history**가 중요한 축이라는 점은 참고할 가치가 있습니다.

신규 도구에서:
- 최종 산출물
뿐 아니라
- 학생이 어떤 순서로 construction했는가
를 저장하면 평가 가치가 커집니다.

## 10. GeoGebra와 비교

### 공통
- dynamic geometry
- graph
- equation
- 3D
- 직접 조작

### GeoGebra
- 공개 소스로 kernel/object/command 구조 분석 가능
- 매우 넓은 기능
- Classic은 UI 밀도가 높음

### Cabri Express
- 공식적으로 friendly/all-in-one/ergonomic을 강조
- 내부 소스는 확인 불가
- 기능을 교육용 toolkit으로 묶는 방향

## 11. 알지오매스 키즈와 비교

### 알지오
- 초등 교육과정 용어에 매우 밀접
- 문서/모둠/과제 시스템 포함
- 쌓기나무/전개도 등 국내 초등 특화

### Cabri Express
- 초등~대학까지 범용
- 그래프/3D/방정식 통합
- 학년별 교육과정 shell보다는 dynamic math laboratory에 가까움

## 12. 가져올 패턴

- all-in-one math toolkit
- 동일한 interaction grammar로 2D/3D/graph 연결
- construction history
- direct manipulation
- web-first access
- LMS integration
- 기능이 많아도 ergonomic grouping을 유지하는 설계

## 13. 피해야 할 점

- 범용성 때문에 초등 UI가 복잡해질 수 있음
- 2D/3D/식/그래프 기능을 단순 병렬 배치하면 navigation이 복잡
- 내부 엔진을 모른 채 겉 UI만 복제하면 dynamic relation이 사라짐

## 14. 출처

- https://cabri.com/en/student/cabri-express/index.html
- https://cabri.com/en/instructor/cabri-express/page/2/
- https://cabri.com/en/enterprise/index.html
- 비교 참고: Cabri II Plus 공식 페이지
