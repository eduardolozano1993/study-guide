import { defineTopicLesson } from "../../../defineTopicLesson";

export const immutabilityAndReadonlyLesson = defineTopicLesson({
  id: "typescript-immutability-and-readonly",
  title: "Immutability and Readonly",
  summary:
    "Use readonly properties, Readonly, const assertions, and immutable modeling patterns to make state transitions safer and clearer.",
  estimatedReadingTimeMinutes: 13,
  difficulty: "intermediate",
  relatedTopicIds: [
    "immutability",
    "typescript-utility-types",
    "typescript-api-type-design",
  ],
});
