import { defineTopicLesson } from "../../../defineTopicLesson";

export const abstractionLesson = defineTopicLesson({
  id: "abstraction",
  title: "Abstraction",
  summary:
    "Learn how abstraction exposes the essential behavior of a type while hiding implementation details, and how interfaces and abstract classes express that idea in TypeScript.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intro",
  relatedTopicIds: ["encapsulation", "inheritance", "polymorphism"],
});
