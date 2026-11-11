# Solid Figure 수학·기하 정확성 분석

## 1. 정육면체/직육면체

현재 가장 정확한 부분입니다.

직육면체 dimension:
- W = 100
- H = 150
- D = 60

면 구성:
- 2 × W×H
- 2 × W×D
- 2 × D×H

으로 맞습니다.

접힘 각도도 0~90° 사이로 변화시켜 직육면체의 직각 face 관계를 표현합니다.

다만 면 관계가 geometry topology가 아니라 DOM nesting으로 표현되어 있습니다.

수학적으로 맞는 모양은 만들지만 시스템은 **왜 맞는지**를 알지 못합니다.

## 2. 원기둥

사용 식:

~~~text
R = W / 2π
~~~

는 정확합니다.

즉 측면 전개도 직사각형의 폭을 원 둘레로 봅니다.

### 근사 오차

원통을 20개의 평면 strip으로 표현합니다.

각 strip 폭은 arc length:

~~~text
2πR / N
~~~

을 사용합니다.

실제 N각형 facet chord는:

~~~text
2R sin(π/N)
~~~

이므로 folded 상태는 exact cylinder가 아니라 근사입니다.

N이 커지면 오차는 작아집니다.

## 3. 원뿔

### 좋은 수학 공식

~~~text
L = sqrt(H² + R²)
sectorAngle = 360 × R / L
~~~

이는 원뿔 측면 전개도 부채꼴의 중심각 공식과 일치합니다.

~~~text
(θ/360) × 2πL = 2πR
θ = 360R/L
~~~

### 렌더링 근사

부채꼴을 실제 circular sector로 그리지 않고 12개의 triangle fan으로 근사합니다.

따라서 수학 state는 정확한 값을 쓰지만 representation은 근사입니다.

## 4. 구

초등 수준에서 “구는 종이 상자처럼 펼칠 수 없다”는 설명은 유용합니다.

더 정확히는 **구면은 왜곡 없이 평면으로 전개할 수 없습니다.**

## 5. 접기 interpolation

각도 자체를 선형 interpolation합니다.

~~~text
angle = closedAngle × progress
~~~

물리 simulation은 아니지만 교육용 접기 animation에는 적절합니다.

## 6. 정확한 전개도 engine으로 가려면

필요한 데이터:
- Face
- Edge
- Vertex
- Hinge
- Adjacency
- FoldAngle

필요한 검증:
1. shared edge 길이 동일
2. hinge graph 연결
3. fold 후 대응 vertex 일치
4. face self-intersection 없음
5. 최종 solid의 manifold 여부
6. edge가 정확히 두 face에 속하는지

## 7. CSS 3D가 충분한 범위

### 충분
- 정육면체 고정 전개도
- 직육면체 고정 전개도
- 학습용 접기 애니메이션
- 간단한 prism

### 한계
- 임의 다면체
- 학생 제작 net
- 여러 net topology
- 정확한 occlusion
- hidden edge
- face picking
- collision
- mesh export

이 경계가 이 서비스 분석에서 가장 중요한 결론입니다.
