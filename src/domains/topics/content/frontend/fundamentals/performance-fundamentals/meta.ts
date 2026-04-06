import { defineTopicLesson } from "../../../defineTopicLesson";

export const performanceFundamentalsLesson = defineTopicLesson({
  id: "performance-fundamentals",
  title: "Performance Fundamentals",
  summary:
    "Learn the frontend performance concepts that matter in interviews: loading less code, optimizing images and rendering work, and improving responsiveness without cargo-cult optimizations.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intro",
  relatedTopicIds: ["browser-rendering", "network-browser-apis", "responsive-design"],
});
