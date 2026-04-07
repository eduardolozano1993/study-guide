import { defineTopicLesson } from "../../../defineTopicLesson";

export const unitTestingLesson = defineTopicLesson({
  id: "unit-testing",
  title: "Unit Testing",
  summary:
    "Learn what a frontend unit test should isolate, what kinds of logic are a good fit for unit tests, and how senior candidates talk about speed, determinism, and trust.",
  estimatedReadingTimeMinutes: 12,
  difficulty: "intermediate",
  relatedTopicIds: ["integration-testing", "react-component-design"],
});
