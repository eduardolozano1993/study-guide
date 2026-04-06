import { defineTopicLesson } from "../../../defineTopicLesson";

export const errorHandlingJavaScriptLesson = defineTopicLesson({
  id: "error-handling-javascript",
  title: "Error Handling in JavaScript",
  summary:
    "Learn how synchronous and asynchronous errors propagate in JavaScript, and how to handle them without swallowing context or breaking control flow.",
  estimatedReadingTimeMinutes: 13,
  difficulty: "intro",
  relatedTopicIds: ["promises-async-await", "dom-manipulation-basics"],
});
