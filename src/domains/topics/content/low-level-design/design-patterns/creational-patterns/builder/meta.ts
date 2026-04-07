import { defineTopicLesson } from "../../../../defineTopicLesson";

export const builderLesson = defineTopicLesson({
  id: "builder",
  title: "Builder",
  summary:
    "Learn how the Builder pattern constructs complex objects step by step so creation stays readable when many optional fields or configuration choices exist.",
  estimatedReadingTimeMinutes: 8,
  difficulty: "intro",
  relatedTopicIds: ["factory-method", "singleton", "object-oriented-principles"],
});
