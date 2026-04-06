import { defineTopicLesson } from "../../../defineTopicLesson";

export const reactFundamentalsLesson = defineTopicLesson({
  id: "react-fundamentals",
  title: "React Fundamentals",
  summary:
    "Build a senior-level mental model for JSX, components, props, state, render and commit phases, reconciliation, and keys.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "intermediate",
  relatedTopicIds: ["react-hooks-in-depth", "react-rendering-behavior", "react-state-management"],
});
