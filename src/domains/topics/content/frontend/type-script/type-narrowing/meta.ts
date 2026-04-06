import { defineTopicLesson } from "../../../defineTopicLesson";

export const typeNarrowingLesson = defineTopicLesson({
  id: "typescript-type-narrowing",
  title: "Type Narrowing",
  summary:
    "Learn how control-flow analysis, discriminated unions, type guards, and exhaustiveness checks turn broad types into safe, precise ones.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "intermediate",
  relatedTopicIds: [
    "typescript-type-system-fundamentals",
    "typescript-advanced-types",
    "typescript-type-assertions",
  ],
});
