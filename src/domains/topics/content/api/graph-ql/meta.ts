import { defineTopicLesson } from "../../defineTopicLesson";

export const graphQlLesson = defineTopicLesson({
  id: "graph-ql",
  title: "GraphQL",
  summary:
    "Learn how GraphQL uses a strongly typed schema and flexible queries so clients can request exactly the data they need from a single endpoint.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "intro",
  relatedTopicIds: ["rest", "grpc"],
});
