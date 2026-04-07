import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsRoutingLesson = defineTopicLesson({
  id: "nextjs-routing",
  title: "Routing",
  summary:
    "Understand file-based routing, dynamic segments, route groups, route handlers, navigation APIs, and how prefetching shapes route transitions.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-app-router-architecture",
    "nextjs-api-route-handlers",
    "nextjs-middleware-edge-runtime",
  ],
});
