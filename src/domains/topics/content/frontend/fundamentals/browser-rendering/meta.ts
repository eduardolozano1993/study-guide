import { defineTopicLesson } from "../../../defineTopicLesson";

export const browserRenderingLesson = defineTopicLesson({
  id: "browser-rendering",
  title: "Browser Rendering Basics",
  summary:
    "Understand the browser rendering pipeline, the critical rendering path, and how style, layout, paint, and compositing affect performance and UI correctness.",
  estimatedReadingTimeMinutes: 13,
  difficulty: "intro",
  relatedTopicIds: ["css-layout", "performance-fundamentals", "dom-events"],
});
