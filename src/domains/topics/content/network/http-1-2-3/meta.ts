import { defineTopicLesson } from "../../defineTopicLesson";

export const http123Lesson = defineTopicLesson({
  id: "http-1-2-3",
  title: "HTTP/1.1, HTTP/2, and HTTP/3",
  summary:
    "Learn how HTTP evolved from text-based request and response exchanges in HTTP/1.1 to multiplexed streams in HTTP/2 and QUIC-based transport in HTTP/3.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "intro",
  relatedTopicIds: ["dns"],
});
