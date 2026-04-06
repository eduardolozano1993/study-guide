import { defineTopicLesson } from "../../../defineTopicLesson";

export const runtimeVsCompileTimeLesson = defineTopicLesson({
  id: "typescript-runtime-vs-compile-time",
  title: "Runtime vs Compile Time",
  summary:
    "Explain clearly what TypeScript checks before execution, what disappears after compilation, and why runtime validation still matters.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intermediate",
  relatedTopicIds: [
    "typescript-type-system-fundamentals",
    "typescript-type-assertions",
    "typescript-async-typing",
  ],
});
