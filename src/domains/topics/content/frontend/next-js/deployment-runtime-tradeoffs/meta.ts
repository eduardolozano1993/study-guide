import { defineTopicLesson } from "../../../defineTopicLesson";

export const nextJsDeploymentRuntimeTradeoffsLesson = defineTopicLesson({
  id: "nextjs-deployment-runtime-tradeoffs",
  title: "Deployment and Runtime Tradeoffs",
  summary:
    "Understand Node versus Edge runtime tradeoffs, environment variable behavior, cache topology, and the practical differences between Vercel and self-hosted deployments.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "advanced",
  relatedTopicIds: [
    "nextjs-middleware-edge-runtime",
    "nextjs-caching-and-revalidation",
    "nextjs-error-handling-observability",
  ],
});
