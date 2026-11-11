# Solid Figure UI/UX 분석

## 1. 정보 구조

전역 navigation은 3개뿐입니다.

~~~text
👀 认一认  Learn
📦 拆一拆  Unfold
✨ 猜一猜  Quiz
~~~

기능명이 아니라 **학습 행동**으로 이름 붙였다는 점이 좋습니다.

## 2. Learn 화면

~~~text
제목/안내
↓
5개 도형 카드
↓
선택 도형 상세
  ├─ 이름/emoji
  ├─ 특징
  ├─ 설명
  ├─ 전개 화면 이동
  └─ 수수께끼
~~~

### 좋은 UX
- 한 번에 하나의 도형만 상세 표시
- 선택 카드에 ring/scale/bounce
- 실물 emoji 사용
- 특징을 짧은 bullet로 제시
- 다음 활동 버튼이 자연스럽게 연결

### 개선점
- emoji가 실제 입체 형태를 정확하게 나타내지 않을 수 있음
- shape card에 실제 3D miniature를 쓰면 개념 일치도가 높아짐
- selected shape definition을 한 번 계산해 재사용하는 편이 코드상 명확

## 3. Unfold 화면

~~~text
학습 제목
↓
도형 horizontal selector
↓
대형 visualizer
↓
Folded ↔ Net slider
~~~

### 강점
- slider 의미가 명확
- 도형별 색 체계
- 3D 모델이 화면 중심
- mobile에서는 horizontal scroll selector

### 중요한 UX 문제

3D 회전은 onMouseMove + e.buttons === 1 구조입니다.

따라서 desktop mouse에서는 동작하지만 **touch pointer interaction은 별도 구현되어 있지 않습니다.**

Responsive layout과 touch interaction은 다른 문제입니다.

### 개선
PointerEvent 기반:
- onPointerDown
- onPointerMove
- onPointerUp
- setPointerCapture

로 통합하는 것이 좋습니다.

## 4. Camera Interaction

실제 camera object는 없고 rotX/rotY 값을 전체 CSS 3D root에 적용합니다.

### 장점
- 구현 단순

### 한계
- zoom/pan 없음
- view reset 없음
- standard view 없음
- rotX 제한 없음
- touch 없음
- camera state와 solid state 분리 부족

권장 UI:
- 초기화
- 정면
- 위
- 등각
- 확대/축소

## 5. Quiz UX

~~~text
question
→ option
→ correct/wrong highlight
→ explanation
→ next
~~~

### 좋은 점
- 답 선택 후 정답을 항상 표시
- 오답도 explanation 제공
- 점수 즉시 누적
- 다음 문항 prefetch 구조

### 실제로는 API prefetch가 아님

generateQuizQuestion은 정적 배열에서 random으로 고른 뒤 300ms delay만 줍니다.

현재는:
- network 없음
- AI 없음
- 실제 prefetch 필요성 낮음

### 개선
- 중복 문항 방지
- 현재 문제 번호
- 영역별 mastery
- 도형별 오답 기록
- quiz 완료 상태
- local persistence

## 6. 저학년 시각 디자인

큰 rounded card, 강한 색, emoji, 짧은 문장, active feedback은 적절합니다.

다만 bounce/pulse animation이 여러 곳에 동시에 존재해 주의가 분산될 수 있습니다.

핵심 조작 중에는 decorative animation을 줄이는 편이 좋습니다.

## 7. 접근성

좋은 점:
- 대부분 button element
- range input
- text label 존재

부족:
- slider aria-label/값 설명 없음
- 3D drag keyboard 대안 없음
- 색 대응 의존
- reduced-motion 대응 없음

권장:
- aria-label="정육면체 접기 정도"
- aria-valuetext="70% 펼쳐짐"
- Arrow key 조작
- keyboard view rotation
- prefers-reduced-motion

## 8. Deep Link

현재 router가 없어 특정 학습 장면 URL이 없습니다.

교사용으로는 최소한:

~~~text
?tab=unfold&shape=cube
~~~

같은 상태 링크가 있으면 활용성이 큽니다.

## 9. 수업용 확장 UI

- 특정 도형 바로 열기
- slider 초기값
- 자동 접기/펼치기 재생
- 면 번호 on/off
- 색 on/off
- 모서리/꼭짓점 표시
- 관찰 질문
- 전체화면
- QR 공유
