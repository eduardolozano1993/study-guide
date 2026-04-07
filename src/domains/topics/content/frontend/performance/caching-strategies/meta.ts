import { defineTopicLesson } from "../../../defineTopicLesson";

export const cachingStrategiesLesson = defineTopicLesson({
  id: "caching-strategies",
  title: "Caching Strategies",
  summary:
    "Cover browser, CDN, and application-level caching strategies, what they optimize for, and the invalidation tradeoffs that matter in frontend systems.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intermediate",
  relatedTopicIds: ["code-splitting", "core-web-vitals", "network-browser-apis"],
});
