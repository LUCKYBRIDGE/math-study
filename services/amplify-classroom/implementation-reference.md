# Amplify Classroom 구현 참조

## 0. 분류

- 핵심: **Lesson Screen + Specialized Widget + Teacher Orchestration**
- 현재 명칭: Amplify Classroom, formerly Desmos Classroom
- 핵심 소스: 비공개
- 공식 현재 기능:
  - K-12 interactive lessons
  - lesson customization/builder
  - Desmos/Polypad 도구
  - real-time student thinking
  - pacing
  - 학생 작업 공유/토론

---

## 1. 가장 중요한 아키텍처 결정

수학 기능을 하나의 mega-app으로 합치지 않습니다.

~~~text
Classroom Shell
   ↓
Screen Registry
   ├─ text
   ├─ choice
   ├─ free response
   ├─ graph
   ├─ geometry
   └─ polypad/manipulative
~~~

각 widget은 자기 domain state를 갖고,
Classroom은:
- 순서
- 응답
- 진행
- 모니터링
을 담당합니다.

---

## 2. Screen contract

~~~ts
interface ScreenPlugin<State, Response> {
  kind: string;
  createState(config: unknown): State;
  renderStudent(state: State): HTMLElement;
  extractResponse(state: State): Response;
  renderTeacherPreview(response: Response): HTMLElement;
}
~~~

이 contract가 있으면 새 수학 도구를 classroom core를 수정하지 않고 추가할 수 있습니다.

---

## 3. Lesson schema

~~~ts
interface Lesson {
  id: string;
  title: string;
  screens: LessonScreen[];
}

interface LessonScreen {
  id: string;
  kind: string;
  config: unknown;
  teacherNotes?: string;
}
~~~

공통 reference:
`reference-implementations/src/lesson-orchestrator.ts`

---

## 4. Student response와 widget document를 구분

Polypad 같은 open-ended workspace에서는 전체 document가 응답일 수 있습니다.

Graph에서는:
- expression list
- selected point
- answer
중 일부만 response일 수 있습니다.

따라서:

~~~ts
interface ResponseAdapter<WidgetState, Response> {
  extract(state: WidgetState): Response;
}
~~~

를 둡니다.

Classroom이 widget 내부 구조를 직접 파고들지 않게 합니다.

---

## 5. Real-time teacher dashboard

권장 흐름:

~~~text
Student
  ↓ response/state updates
Session service
  ↓ normalized response stream
Teacher Dashboard
~~~

WebSocket/SSE를 사용할 수 있습니다.

### 메시지

~~~ts
type SessionMessage =
  | { type: "response"; studentId: string; screenId: string; payload: unknown }
  | { type: "progress"; studentId: string; screenId: string }
  | { type: "teacher-command"; command: TeacherCommand };
~~~

---

## 6. Pacing

공통 구현:
`lesson-orchestrator.ts`

~~~ts
session.setTeacherPacing("screen-4");
session.pause();
session.release();
~~~

실서비스에서는 permission 검증이 서버에서 필요합니다.

절대 client가 teacher role을 자기 마음대로 지정하게 두면 안 됩니다.

---

## 7. Select & Sequence

수학 수업에서 단순 “정답률 dashboard”보다 중요한 기능입니다.

권장:

~~~ts
interface SharedWorkItem {
  responseId: string;
  displayOrder: number;
  anonymous: boolean;
  teacherNote?: string;
}
~~~

교사는:
1. 의미 있는 학생 전략 선택
2. 순서 배치
3. 익명 공유
4. 토론

을 할 수 있습니다.

---

## 8. Anonymous projection

학생 화면을 전체 복제해서 보여주면 이름/개인정보가 섞일 수 있습니다.

별도 projection:

~~~ts
function toAnonymousPresentation(response: StudentResponse) {
  return {
    screenId: response.screenId,
    payload: sanitize(response.payload)
  };
}
~~~

를 사용합니다.

공통 reference의 `getAnonymousSharedResponses()`가 최소 예입니다.

---

## 9. Lesson authoring

Builder에서는:
- screen palette
- drag reorder
- duplicate
- preview
- starter template
가 중요합니다.

문서 모델은 화면 index가 아니라 stable ID를 사용해야 reorder 후 response 연결이 깨지지 않습니다.

~~~ts
screen.id !== array index
~~~

---

## 10. Widget versioning

수업은 몇 년간 재사용될 수 있으므로:

~~~ts
interface WidgetConfigEnvelope {
  widget: "polypad";
  version: 3;
  config: unknown;
}
~~~

형태로 version을 기록해야 합니다.

새 버전 widget이 옛 lesson을 열 수 있도록 migration이 필요합니다.

공통:
`serialization.ts`

---

## 11. 권장 backend 경계

~~~text
lesson-service
session-service
response-service
roster-adapter
asset-service
~~~

수학 widget engine은 별도 package/service로 유지합니다.

---

## 12. 가져올 핵심

- lesson screen registry
- specialized widget architecture
- response adapter
- real-time dashboard
- pacing
- select & sequence
- anonymous presentation
- stable screen IDs
- widget config versioning

---

## 13. 확인 출처

- https://classroom.amplify.com/
- https://amplify.com/classroom/
- Amplify의 Desmos Studio Tools / Amplify Classroom 구분 안내

내부 서버/DB/프레임워크는 공개되지 않았으므로 본 구조는 제품 행동을 바탕으로 한 클린룸 설계입니다.
