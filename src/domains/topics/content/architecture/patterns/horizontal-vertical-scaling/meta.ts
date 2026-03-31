import { defineTopicLesson } from "../../../defineTopicLesson";

export const horizontalVerticalScalingLesson = defineTopicLesson({
  id: "horizontal-vertical-scaling",
  title: "Horizontal vs Vertical Scaling",
  summary:
    "Learn the difference between scaling up and scaling out, when each approach fits best, and how architecture choices like stateless services and load balancing affect scaling strategy.",
  estimatedReadingTimeMinutes: 16,
  difficulty: "intro",
  relatedTopicIds: ["load-balancer"],
});
