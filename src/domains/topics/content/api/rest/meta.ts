import { defineTopicLesson } from "../../defineTopicLesson";

export const restLesson = defineTopicLesson({
  id: "rest",
  title: "REST",
  summary:
    "Learn the core ideas behind REST APIs, including resources, HTTP methods, stateless requests, representation formats, and the conventions that make an API predictable to clients.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "intro",
  relatedTopicIds: ["http-1-2-3", "tls"],
});
