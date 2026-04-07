import { defineTopicLesson } from "../../../defineTopicLesson";

export const reactRenderingBehaviorLesson = defineTopicLesson({
  id: "react-rendering-behavior",
  title: "Rendering Behavior",
  summary:
    "Learn how render and commit differ, how batching works, why stale closures happen, how dependency arrays should be reasoned about, and when memoization helps or hurts.",
  estimatedReadingTimeMinutes: 16,
  difficulty: "advanced",
  relatedTopicIds: ["react-fundamentals", "react-hooks-in-depth", "react-performance"],
});
