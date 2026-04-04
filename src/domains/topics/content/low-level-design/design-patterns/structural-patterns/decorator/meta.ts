import { defineTopicLesson } from "../../../../defineTopicLesson";

export const decoratorLesson = defineTopicLesson({
  id: "decorator",
  title: "Decorator",
  summary:
    "Learn how the Decorator pattern adds behavior to an object by wrapping it, without changing the original class.",
  estimatedReadingTimeMinutes: 8,
  difficulty: "intro",
  relatedTopicIds: ["facade", "abstraction", "polymorphism"],
});
