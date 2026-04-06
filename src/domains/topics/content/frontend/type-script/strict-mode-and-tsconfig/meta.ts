import { defineTopicLesson } from "../../../defineTopicLesson";

export const strictModeAndTsconfigLesson = defineTopicLesson({
  id: "typescript-strict-mode-and-tsconfig",
  title: "Strict Mode and tsconfig",
  summary:
    "Understand the compiler options that most affect correctness, maintainability, and migration strategy in real TypeScript codebases.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "intermediate",
  relatedTopicIds: [
    "typescript-modules-and-namespaces",
    "typescript-runtime-vs-compile-time",
    "typescript-senior-level-judgment",
  ],
});
