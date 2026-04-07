import { defineTopicLesson } from "../../../defineTopicLesson";

export const e2eTestingLesson = defineTopicLesson({
  id: "e2e-testing",
  title: "End-to-End Testing",
  summary:
    "Cover what E2E tests prove, why they are slower and more expensive, and how to use them for the small number of flows that truly need browser-level confidence.",
  estimatedReadingTimeMinutes: 13,
  difficulty: "intermediate",
  relatedTopicIds: ["unit-testing", "integration-testing", "nextjs-routing"],
});
