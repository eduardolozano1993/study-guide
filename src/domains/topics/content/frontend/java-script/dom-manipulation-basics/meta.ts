import { defineTopicLesson } from "../../../defineTopicLesson";

export const domManipulationBasicsLesson = defineTopicLesson({
  id: "dom-manipulation-basics",
  title: "DOM Manipulation Basics",
  summary:
    "Learn how JavaScript reads and updates the DOM, and how to do it safely and efficiently without fighting the browser's rendering model.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intro",
  relatedTopicIds: ["dom-events", "error-handling-javascript"],
});
