import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsAuthenticationAuthorizationLesson = defineTopicLesson({
  id: "nextjs-authentication-authorization",
  title: "Authentication and Authorization",
  summary:
    "Understand session handling, cookie-based auth, protected routes, middleware usage, and the server trust boundaries that matter in Next.js applications.",
  estimatedReadingTimeMinutes: 19,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-server-actions-mutations",
    "nextjs-api-route-handlers",
    "nextjs-middleware-edge-runtime",
  ],
});
