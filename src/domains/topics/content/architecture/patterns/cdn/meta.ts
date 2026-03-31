import { defineTopicLesson } from "../../../defineTopicLesson";

export const cdnLesson = defineTopicLesson({
  id: "cdn",
  title: "CDN",
  summary:
    "Learn how a content delivery network caches content at edge locations, reduces latency, protects origins, and improves performance for static and cacheable web content.",
  estimatedReadingTimeMinutes: 16,
  difficulty: "intro",
  relatedTopicIds: ["dns", "load-balancer", "horizontal-vertical-scaling"],
});
