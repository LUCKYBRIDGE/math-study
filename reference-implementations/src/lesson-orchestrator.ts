export type ScreenKind = "text" | "choice" | "graph" | "manipulative" | "free-response";

export interface LessonScreen {
  id: string;
  kind: ScreenKind;
  title?: string;
  config: Readonly<Record<string, unknown>>;
}

export interface Lesson {
  id: string;
  screens: readonly LessonScreen[];
}

export interface StudentResponse {
  studentId: string;
  screenId: string;
  payload: unknown;
  updatedAt: number;
}

export type PacingMode =
  | { type: "student-paced" }
  | { type: "teacher-paced"; screenId: string }
  | { type: "paused" };

export class ClassroomSession {
  private responses = new Map<string, StudentResponse>();
  private studentScreen = new Map<string, string>();
  private selectedForShare = new Set<string>();
  pacing: PacingMode = { type: "student-paced" };

  constructor(readonly lesson: Lesson) {}

  submit(studentId: string, screenId: string, payload: unknown): void {
    this.assertScreen(screenId);
    this.responses.set(`${studentId}:${screenId}`, {
      studentId,
      screenId,
      payload: structuredClone(payload),
      updatedAt: Date.now()
    });
    this.studentScreen.set(studentId, screenId);
  }

  setTeacherPacing(screenId: string): void {
    this.assertScreen(screenId);
    this.pacing = { type: "teacher-paced", screenId };
    for (const studentId of this.studentScreen.keys()) {
      this.studentScreen.set(studentId, screenId);
    }
  }

  pause(): void {
    this.pacing = { type: "paused" };
  }

  release(): void {
    this.pacing = { type: "student-paced" };
  }

  selectResponseForShare(studentId: string, screenId: string, selected = true): void {
    const key = `${studentId}:${screenId}`;
    if (!this.responses.has(key)) throw new Error("Response not found");
    selected ? this.selectedForShare.add(key) : this.selectedForShare.delete(key);
  }

  getAnonymousSharedResponses(): unknown[] {
    return [...this.selectedForShare]
      .map(key => this.responses.get(key))
      .filter((response): response is StudentResponse => Boolean(response))
      .map(response => ({
        screenId: response.screenId,
        payload: structuredClone(response.payload)
      }));
  }

  private assertScreen(screenId: string): void {
    if (!this.lesson.screens.some(screen => screen.id === screenId)) {
      throw new Error(`Unknown screen: ${screenId}`);
    }
  }
}
