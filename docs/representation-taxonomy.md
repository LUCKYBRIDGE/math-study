# 수학 표현 방식 분류

수학 교육 앱의 차이는 기능보다 **같은 개념을 어떤 표현으로 보여주고 서로 어떻게 연결하는가**에서 크게 나타납니다.

## 1. 기호 표현
예:
- 식
- 방정식
- 함수
- 분수식
- 대수식

대표:
- Desmos
- Graspable Math
- GeoGebra CAS

강점:
- 정확
- 일반화 가능
- 고학년 확장성

약점:
- 초등 저학년 진입장벽

---

## 2. 공간·도형 표현
예:
- 점/선/다각형
- 대칭
- 회전
- 좌표
- 전개도
- 입체

대표:
- GeoGebra
- 알지오매스 키즈
- Cabri Express

핵심:
- 화면 위치가 수학 좌표와 어떻게 연결되는가
- 도형 관계가 drag 후에도 유지되는가

---

## 3. 조작물 표현
예:
- 수모형
- 분수 막대
- base-ten block
- rekenrek
- algebra tile

대표:
- Polypad
- MLC
- Brainingcamp
- Didax
- Toy Theater

핵심:
- 물리 교구의 행동을 어떤 semantic operation으로 옮기는가

---

## 4. 데이터 표현
예:
- table
- dot plot
- scatter plot
- histogram
- map
- card

대표:
- CODAP

핵심:
같은 case identity를 모든 표현이 공유해야 합니다.

~~~text
Case 42
  ├─ table row 42
  ├─ graph point 42
  └─ map marker 42
~~~

그래서 한 곳을 선택하면 다른 곳도 같이 강조할 수 있습니다.

---

## 5. 시뮬레이션 표현
예:
- 균형저울
- 수직선 이동
- 넓이 모델
- 분수 합성
- 확률 실험

대표:
- PhET

핵심:
수학 법칙을 텍스트로 설명하기보다 **움직이는 세계의 규칙**으로 표현합니다.

---

## 6. 시간적 표현

정적 before/after만으로는 부족한 개념이 많습니다.

- 도형 회전
- 식 변형
- regrouping
- 분수 합성
- 함수 parameter 변화

이때 animation은 장식이 아니라 **identity continuity와 causal explanation**입니다.

대표:
- Graspable Math의 항 이동
- PhET의 상태 변화
- Desmos slider

---

## 7. 음향 표현

그래프 접근성에서는 소리도 representation입니다.

예:
- Desmos Audio Trace
- Polypad/PhET의 sonification 계열

수학 상태 → pitch/timbre/pan 같은 매핑을 설계할 수 있습니다.

---

## 8. 언어·설명 표현

수학 앱에서도
- 객체 이름
- 측정 결과
- 관계 설명
- alt text
- hint
- 풀이 단계
가 필요합니다.

좋은 구조는 그림에 설명을 덧붙이는 것이 아니라 **같은 수학 상태에서 텍스트 표현도 파생**합니다.

---

# Representation Linking의 수준

## Level 0: 독립
표와 그래프가 따로 존재.

## Level 1: 같은 값을 표시
값이 바뀌면 두 화면 모두 갱신.

## Level 2: 양방향 조작
그래프 drag가 식/값도 바꿈.

## Level 3: 객체 identity 공유
한 표현에서 선택한 같은 객체가 다른 표현에서도 강조.

## Level 4: 학습 의미 공유
식 변형, 그래프 변화, 설명, 접근성 표현이 같은 semantic operation을 공유.

신규 수학 도구는 가능하면 Level 3 이상을 지향하는 것이 좋습니다.
