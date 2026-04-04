import { defineTopicLesson } from "../../../../defineTopicLesson";

export const singletonLesson = defineTopicLesson({
  id: "singleton",
  title: "Singleton",
  summary:
    "Learn how the Singleton pattern ensures a class has only one shared instance and provides a global access point to it.",
  estimatedReadingTimeMinutes: 7,
  difficulty: "intro",
  relatedTopicIds: ["factory-method", "builder", "object-oriented-principles"],
});
