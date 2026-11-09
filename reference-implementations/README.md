# Clean-room reference implementations

수학교육 웹앱에서 반복되는 내부 메커니즘을 **독립 TypeScript 코드**로 구현한 참고 라이브러리입니다.

이 코드는 분석 대상 서비스의 원본 코드를 복사한 것이 아닙니다.

## 포함 모듈

- `dependency-graph.ts` — GeoGebra/Cabri/알지오형 동적 객체 의존 그래프
- `history.ts` — 의미 단위 command 기반 Undo/Redo
- `tool-state-machine.ts` — Tool-first 작도 인터랙션
- `tile-document.ts` — Polypad/교구형 serializable document
- `manipulative-registry.ts` — Brainingcamp/MLC/Didax형 교구 플러그인 registry
- `rewrite-engine.ts` — Graspable Math형 대수 semantic rewrite
- `reactive-property.ts` — PhET형 반응형 domain property
- `scene-graph.ts` — 장면 그래프/transform/renderer 분리
- `linked-dataset.ts` — CODAP형 shared dataset + linked selection
- `lesson-orchestrator.ts` — Amplify Classroom/Brainingcamp LIVE형 session
- `serialization.ts` — versioned document envelope/migration

## 사용

~~~bash
cd reference-implementations
npm install
npm run check
~~~

## 원칙

1. UI 좌표가 아니라 수학 의미를 상태로 저장합니다.
2. 문서 상태, viewport, preference, classroom session을 분리합니다.
3. renderer와 domain model을 분리합니다.
4. history는 semantic command 단위로 기록합니다.
5. 공개 소스 분석 결과와 클린룸 구현을 혼동하지 않습니다.


## 조합 예제

`src/examples/`에는 공통 모듈을 실제 서비스 구조처럼 조합한 예제가 있습니다.

- `dynamic-geometry-demo.ts` — GeoGebra/알지오/Cabri형 의존 작도
- `manipulative-demo.ts` — Polypad/MLC/Brainingcamp/Didax형 교구
- `algebra-rewrite-demo.ts` — Graspable Math형 대수 변환
- `linked-data-demo.ts` — CODAP형 linked selection
- `reactive-simulation-demo.ts` — PhET형 reactive domain state
- `classroom-demo.ts` — Amplify/Brainingcamp LIVE형 수업 세션

이 예제들은 특정 제품의 복제물이 아니라 각 아키텍처의 최소 동작 단위를 보여줍니다.
