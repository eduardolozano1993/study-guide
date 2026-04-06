import { defineTopicLesson } from "../../../defineTopicLesson";

export const typeAssertionsLesson = defineTopicLesson({
  id: "typescript-type-assertions",
  title: "Type Assertions and Casting",
  summary:
    "Know when as, non-null assertions, and other escape hatches are justified, and how to explain the risks clearly in an interview.",
  estimatedReadingTimeMinutes: 12,
  difficulty: "intermediate",
  relatedTopicIds: [
    "typescript-type-narrowing",
    "typescript-runtime-vs-compile-time",
    "typescript-working-with-external-libraries",
  ],
});
