import { defineTopicLesson } from "../../../defineTopicLesson";

export const codeSplittingLesson = defineTopicLesson({
  id: "code-splitting",
  title: "Code Splitting",
  summary:
    "Understand how code splitting reduces initial JavaScript cost, where to split safely, and what tradeoffs interviewers expect you to mention.",
  estimatedReadingTimeMinutes: 13,
  difficulty: "intermediate",
  relatedTopicIds: ["tree-shaking", "caching-strategies", "performance-fundamentals"],
});
