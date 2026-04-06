import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsServerVsClientComponentsLesson = defineTopicLesson({
  id: "nextjs-server-vs-client-components",
  title: "Server Components vs Client Components",
  summary:
    "Understand where code runs, what `use client` really means, how bundle size changes, and how to draw clean boundaries between server and browser concerns.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-data-fetching",
    "nextjs-performance",
    "nextjs-app-router-architecture",
  ],
});
