import { defineTopicLesson } from "../../../defineTopicLesson";

export const integrationTestingLesson = defineTopicLesson({
  id: "integration-testing",
  title: "Integration Testing",
  summary:
    "Understand how integration tests verify real collaboration between modules, components, routing, state, and network boundaries without needing the full browser stack.",
  estimatedReadingTimeMinutes: 13,
  difficulty: "intermediate",
  relatedTopicIds: ["unit-testing", "e2e-testing", "react-data-fetching"],
});
