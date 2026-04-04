import { defineTopicLesson } from "../../../../defineTopicLesson";

export const strategyLesson = defineTopicLesson({
  id: "strategy",
  title: "Strategy",
  summary:
    "Learn how the Strategy pattern swaps algorithms behind a shared interface so behavior can vary without changing the client.",
  estimatedReadingTimeMinutes: 8,
  difficulty: "intro",
  relatedTopicIds: ["observer", "state-machine", "polymorphism"],
});
