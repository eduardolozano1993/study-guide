import { defineTopicLesson } from "../../../defineTopicLesson";

export const reactArchitectureLesson = defineTopicLesson({
  id: "react-architecture",
  title: "Architecture",
  summary:
    "Organize React applications through feature boundaries, intentional folder structure, separation of UI and business logic, and scalability-minded decisions.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "advanced",
  relatedTopicIds: ["react-state-management", "react-routing", "react-server-rendering"],
});
