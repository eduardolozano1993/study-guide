import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsDataFetchingLesson = defineTopicLesson({
  id: "nextjs-data-fetching",
  title: "Data Fetching",
  summary:
    "Learn how to fetch data in Server Components and Client Components, avoid waterfalls, stream slow subtrees, and choose the right fetching location for the job.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-server-vs-client-components",
    "nextjs-caching-and-revalidation",
    "nextjs-rendering-model",
  ],
});
