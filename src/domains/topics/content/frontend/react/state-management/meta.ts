import { defineTopicLesson } from "../../../defineTopicLesson";

export const reactStateManagementLesson = defineTopicLesson({
  id: "react-state-management",
  title: "State Management",
  summary:
    "Study local versus global state, lifting state, reducers, context limitations, and where libraries like Zustand or Redux are appropriate.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "advanced",
  relatedTopicIds: ["react-hooks-in-depth", "react-component-design", "react-data-fetching"],
});
