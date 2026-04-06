import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsServerActionsMutationsLesson = defineTopicLesson({
  id: "nextjs-server-actions-mutations",
  title: "Server Actions and Mutations",
  summary:
    "Learn how Server Actions handle writes, how forms and optimistic updates fit in, and how to revalidate cached data after successful mutations.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-caching-and-revalidation",
    "nextjs-authentication-authorization",
    "nextjs-data-fetching",
  ],
});
