import { defineTopicLesson } from "../../../defineTopicLesson";

export const latencyVsThroughputLesson = defineTopicLesson({
  id: "latency-vs-throughput",
  title: "Latency vs Throughput",
  summary:
    "Learn the difference between latency and throughput, how each one affects system behavior, and why improving one metric does not automatically improve the other.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "intro",
  relatedTopicIds: ["horizontal-vertical-scaling", "load-balancer", "cdn"],
});
