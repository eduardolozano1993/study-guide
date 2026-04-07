import { defineTopicLesson } from "../../../defineTopicLesson";

export const accessibilityLesson = defineTopicLesson({
  id: "accessibility",
  title: "Accessibility Basics",
  summary:
    "Learn the accessibility principles interviewers actually ask about: semantic HTML, labels, keyboard support, focus management, and practical ARIA usage.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "intro",
  relatedTopicIds: ["html-semantics", "dom-events", "frontend-security"],
});
