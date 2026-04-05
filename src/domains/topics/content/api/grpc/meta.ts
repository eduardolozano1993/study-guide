import { defineTopicLesson } from "../../defineTopicLesson";

export const grpcLesson = defineTopicLesson({
  id: "grpc",
  title: "gRPC",
  summary:
    "Learn how gRPC uses Protocol Buffers, HTTP/2, and strongly typed service contracts to support efficient client-server and service-to-service communication.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "intro",
  relatedTopicIds: ["rest", "http-1-2-3"],
});
