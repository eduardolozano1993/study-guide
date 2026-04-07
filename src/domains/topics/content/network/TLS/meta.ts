import { defineTopicLesson } from "../../defineTopicLesson";

export const tlsLesson = defineTopicLesson({
  id: "tls",
  title: "TLS",
  summary:
    "Learn how Transport Layer Security protects data in transit, how the TLS handshake establishes trust and session keys, and why modern systems prefer TLS 1.3.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "intro",
  relatedTopicIds: ["dns", "http-1-2-3"],
});
