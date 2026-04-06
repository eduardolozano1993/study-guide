import { defineTopicLesson } from "../../../defineTopicLesson";

export const asyncTypingLesson = defineTopicLesson({
  id: "typescript-async-typing",
  title: "Async Typing",
  summary:
    "Model promises, async functions, typed fetch layers, and error-handling strategies without losing type information.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intermediate",
  relatedTopicIds: [
    "promises-async-await",
    "typescript-functions",
    "typescript-api-type-design",
  ],
});
