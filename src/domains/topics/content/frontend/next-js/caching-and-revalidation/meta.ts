import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsCachingAndRevalidationLesson = defineTopicLesson({
  id: "nextjs-caching-and-revalidation",
  title: "Caching and Revalidation",
  summary:
    "Understand fetch caching, request memoization, router cache behavior, and how to invalidate data correctly with revalidatePath and revalidateTag.",
  estimatedReadingTimeMinutes: 20,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-data-fetching",
    "nextjs-server-actions-mutations",
    "nextjs-rendering-model",
  ],
});
