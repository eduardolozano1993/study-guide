import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsRenderingModelLesson = defineTopicLesson({
  id: "nextjs-rendering-model",
  title: "Rendering Model",
  summary:
    "Understand SSR, SSG, ISR, and dynamic rendering in Next.js, including when each model is the right tradeoff for freshness, cost, and user experience.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-app-router-architecture",
    "nextjs-data-fetching",
    "nextjs-caching-and-revalidation",
  ],
});
