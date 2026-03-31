import { defineTopicLesson } from "../../defineTopicLesson";

export const httpStatusCodesLesson = defineTopicLesson({
  id: "http-status-codes",
  title: "HTTP Status Codes",
  summary:
    "Learn how HTTP status codes communicate request outcomes, how the five code families differ, and which individual codes matter most when designing or debugging APIs.",
  estimatedReadingTimeMinutes: 16,
  difficulty: "intro",
  relatedTopicIds: ["rest", "http-1-2-3"],
});
