# 추가 분석 후보

현재 분석된 서비스:
- 알지오매스 키즈
- GeoGebra
- Desmos
- Mathigon Polypad
- PhET
- Graspable Math
- Math Learning Center
- CODAP
- Cabri Express
- Brainingcamp
- Amplify Classroom
- Didax
- Toy Theater

이제부터는 현재 비어 있는 학습 유형을 채우는 방향으로 확장합니다.

## 우선순위 A — 연습·적응형

### Khan Academy
분석할 것:
- mastery
- skill graph
- exercise state
- hint ladder
- answer evaluator
- 학생/교사 progress
- 개방형 도구와 정반대인 정답형 UX

### IXL
분석할 것:
- skill taxonomy
- SmartScore 계열 progression
- 문항 난이도 변화
- 즉시 피드백
- drill UX

### Matific
분석할 것:
- 초등 수학 mini-game
- conceptual game mechanics
- 조작과 평가 결합
- 학습 분석

## 우선순위 B — 게임 기반 개념 학습

### DragonBox 계열
- 대수 규칙을 게임 rule로 변환
- 기호를 점진적으로 도입하는 방식

### ST Math
- 언어 의존도를 낮춘 시각 수학
- puzzle state
- 실패/재시도 UX
- 개념 progression

### Prodigy Math
- RPG reward layer와 수학 문제 layer 분리
- 동기부여 구조와 학습 집중도 비교

## 우선순위 C — 문제 탐구·논증

### NRICH
- low floor / high ceiling 문제
- 디지털 도구가 적어도 탐구를 유도하는 구조
- 문제 제시와 교사 질문 설계

### Mathigon Courses
- interactive component가 narrative lesson 안에 들어가는 방식
- content.md / functions.ts 구조
- Polypad/Geopad embed

### Euclidea
- 기하 작도 puzzle
- 허용 도구 제한
- 최소 작도 단계
- construction verification

## 우선순위 D — AI/풀이·튜터

### Photomath
- 카메라 입력
- 수식 인식
- 단계별 풀이 표현
- 학생이 답만 소비하게 되는 위험

### Wolfram Alpha
- 자연어/수식 query
- symbolic engine
- 결과 표현 계층
- 교육용 step-by-step와 computational answer의 차이

## 우선순위 E — 공간감각/3D 특화

### Mathigon Solids
- net
- fold
- polyhedron
- WebGL
- 2D↔3D 연결

### 별도 3D geometry 도구
- camera
- occlusion
- hidden edge
- face/edge graph
- net folding

이는 math-net-master의 전개도/접기/실선·점선 판정 연구와 직접 연결할 수 있습니다.

## 분석 순서 제안

1. Khan Academy
2. Mathigon Courses
3. Euclidea
4. ST Math
5. Matific
6. IXL
7. Wolfram Alpha
8. Photomath
9. DragonBox
10. Prodigy

이 순서면 현재 저장소에 부족한:
- 정답형 연습
- game/puzzle
- 논증/작도 과제
- AI solver
축을 차례로 채울 수 있습니다.
