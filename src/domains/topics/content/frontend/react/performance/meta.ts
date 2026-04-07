import { defineTopicLesson } from "../../../defineTopicLesson";

export const reactPerformanceLesson = defineTopicLesson({
  id: "react-performance",
  title: "Performance",
  summary:
    "Focus on performance work that matters: render cost, React.memo, code splitting, lazy loading, virtualization, and profiling-driven optimization.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "advanced",
  relatedTopicIds: ["react-rendering-behavior", "react-data-fetching", "react-server-rendering"],
});
