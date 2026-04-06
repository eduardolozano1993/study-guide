import { defineTopicLesson } from "../../../defineTopicLesson";

export const typeSystemFundamentalsLesson = defineTopicLesson({
  id: "typescript-type-system-fundamentals",
  title: "Type System Fundamentals",
  summary:
    "Build a solid mental model for TypeScript primitives, unions, intersections, literals, and top and bottom types that commonly appear in senior interviews.",
  estimatedReadingTimeMinutes: 16,
  difficulty: "intermediate",
  relatedTopicIds: [
    "typescript-type-narrowing",
    "typescript-structural-typing",
    "typescript-runtime-vs-compile-time",
  ],
});
