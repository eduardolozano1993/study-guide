import { defineTopicLesson } from "../../defineTopicLesson";

export const loadBalancerLesson = defineTopicLesson({
  id: "load-balancer",
  title: "Load Balancer",
  summary:
    "Learn how load balancers distribute traffic across multiple servers, improve availability, and support scaling through health checks, routing rules, and traffic management strategies.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "intro",
  relatedTopicIds: ["dns", "tls", "http-1-2-3"],
});
