import { defineTopicLesson } from "../../../defineTopicLesson";

export const structuralTypingLesson = defineTopicLesson({
  id: "typescript-structural-typing",
  title: "Structural Typing",
  summary:
    "Learn how assignability works in TypeScript, why shape matters more than nominal identity, and where excess property checks fit in.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "advanced",
  relatedTopicIds: [
    "typescript-type-system-fundamentals",
    "typescript-interfaces-vs-types",
    "typescript-classes-and-oop",
  ],
});
