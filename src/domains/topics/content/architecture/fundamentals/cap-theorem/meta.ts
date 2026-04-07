import { defineTopicLesson } from "../../../defineTopicLesson";

export const capTheoremLesson = defineTopicLesson({
  id: "cap-theorem",
  title: "CAP Theorem",
  summary:
    "Learn what the CAP theorem actually says about distributed systems, why network partitions force a tradeoff between consistency and availability, and how engineers reason about those tradeoffs in practice.",
  estimatedReadingTimeMinutes: 16,
  difficulty: "intro",
  relatedTopicIds: ["latency-vs-throughput"],
});
