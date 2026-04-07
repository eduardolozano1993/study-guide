import { defineTopicLesson } from "../../../defineTopicLesson";

export const reflowRepaintLesson = defineTopicLesson({
  id: "reflow-repaint",
  title: "Reflow and Repaint",
  summary:
    "Understand what triggers layout and paint work in the browser, why reflow is usually more expensive, and how these costs show up in performance interviews.",
  estimatedReadingTimeMinutes: 12,
  difficulty: "intermediate",
  relatedTopicIds: [
    "browser-rendering",
    "performance-fundamentals",
    "css-layout",
  ],
});
