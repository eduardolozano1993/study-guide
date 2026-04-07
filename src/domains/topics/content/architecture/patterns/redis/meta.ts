import { defineTopicLesson } from "../../../defineTopicLesson";

export const redisLesson = defineTopicLesson({
  id: "redis",
  title: "Redis",
  summary:
    "Learn where Redis fits in a system architecture, why it is commonly used as an in-memory cache and coordination layer, and which tradeoffs matter for expiration, durability, scaling, and operational safety.",
  estimatedReadingTimeMinutes: 16,
  difficulty: "intro",
  relatedTopicIds: [
    "horizontal-vertical-scaling",
    "cdn",
    "latency-vs-throughput",
  ],
});
