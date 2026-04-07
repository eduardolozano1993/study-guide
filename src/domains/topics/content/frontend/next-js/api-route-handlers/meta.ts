import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsApiRouteHandlersLesson = defineTopicLesson({
  id: "nextjs-api-route-handlers",
  title: "API Layer and Route Handlers",
  summary:
    "Learn when Route Handlers are the right abstraction, when direct server-side data access is cleaner, and how auth, validation, and runtime constraints affect the choice.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-routing",
    "nextjs-authentication-authorization",
    "nextjs-middleware-edge-runtime",
  ],
});
