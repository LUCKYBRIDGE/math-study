import {
  ClassroomSession,
  type Lesson
} from "../lesson-orchestrator";

const lesson: Lesson = {
  id: "fractions-01",
  screens: [
    { id: "intro", kind: "text", config: {} },
    { id: "model", kind: "manipulative", config: { tool: "fraction-bar" } },
    { id: "explain", kind: "free-response", config: {} }
  ]
};

const session = new ClassroomSession(lesson);

session.submit("student-a", "model", {
  denominator: 4,
  selectedParts: [0, 1, 2]
});

session.setTeacherPacing("explain");

session.submit("student-a", "explain", {
  text: "4등분 중 3부분이므로 3/4입니다."
});

session.selectResponseForShare("student-a", "explain");
console.log(session.getAnonymousSharedResponses());
