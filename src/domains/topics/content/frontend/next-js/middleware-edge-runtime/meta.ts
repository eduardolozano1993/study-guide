import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsMiddlewareEdgeRuntimeLesson = defineTopicLesson({
  id: "nextjs-middleware-edge-runtime",
  title: "Middleware and Edge Runtime",
  summary:
    "Understand what Middleware is good for, where Edge execution helps, and where pushing too much logic to Middleware creates cost and complexity.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-routing",
    "nextjs-authentication-authorization",
    "nextjs-deployment-runtime-tradeoffs",
  ],
});
