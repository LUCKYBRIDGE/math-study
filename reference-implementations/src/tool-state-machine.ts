export type ToolEffect =
  | { type: "highlight"; objectId: string }
  | { type: "clear-highlight" }
  | { type: "commit"; operation: MathOperation }
  | { type: "message"; text: string };

export interface MathOperation {
  type: string;
  inputs: readonly string[];
  parameters?: Readonly<Record<string, number | string | boolean>>;
}

export type ReflectionState =
  | { mode: "idle" }
  | { mode: "await-object" }
  | { mode: "await-axis"; objectId: string };

export type ReflectionEvent =
  | { type: "activate" }
  | { type: "cancel" }
  | { type: "object-click"; objectId: string; objectKind: string };

export interface Transition<S> {
  state: S;
  effects: readonly ToolEffect[];
}

export function reduceReflectionTool(
  state: ReflectionState,
  event: ReflectionEvent
): Transition<ReflectionState> {
  if (event.type === "cancel") {
    return { state: { mode: "idle" }, effects: [{ type: "clear-highlight" }] };
  }

  if (state.mode === "idle") {
    return event.type === "activate"
      ? { state: { mode: "await-object" }, effects: [{ type: "message", text: "반사할 도형을 선택하세요." }] }
      : { state, effects: [] };
  }

  if (state.mode === "await-object" && event.type === "object-click") {
    const valid = ["polygon", "segment", "point"].includes(event.objectKind);
    return valid
      ? {
          state: { mode: "await-axis", objectId: event.objectId },
          effects: [
            { type: "highlight", objectId: event.objectId },
            { type: "message", text: "대칭축을 선택하세요." }
          ]
        }
      : { state, effects: [{ type: "message", text: "반사 가능한 객체가 아닙니다." }] };
  }

  if (state.mode === "await-axis" && event.type === "object-click") {
    if (event.objectKind !== "line" && event.objectKind !== "segment") {
      return { state, effects: [{ type: "message", text: "선 또는 선분을 선택하세요." }] };
    }
    return {
      state: { mode: "await-object" },
      effects: [
        {
          type: "commit",
          operation: { type: "reflect", inputs: [state.objectId, event.objectId] }
        },
        { type: "clear-highlight" }
      ]
    };
  }

  return { state, effects: [] };
}
