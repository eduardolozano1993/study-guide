import { defineTopicLesson } from "../../../../defineTopicLesson";

export const factoryMethodLesson = defineTopicLesson({
  id: "factory-method",
  title: "Factory Method",
  summary:
    "Learn how the Factory Method pattern creates objects through a dedicated creation method so client code depends on abstractions instead of concrete classes.",
  estimatedReadingTimeMinutes: 8,
  difficulty: "intro",
  relatedTopicIds: ["abstraction", "polymorphism", "object-oriented-principles"],
});
