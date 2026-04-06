import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsPerformanceLesson = defineTopicLesson({
  id: "nextjs-performance",
  title: "Performance",
  summary:
    "Learn the major Next.js performance levers: image and font optimization, streaming, client bundle control, route prefetching, and Core Web Vitals reasoning.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-server-vs-client-components",
    "nextjs-rendering-model",
    "nextjs-data-fetching",
  ],
});
