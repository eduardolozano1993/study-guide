import { defineTopicLesson } from "../../../defineTopicLesson";

export const frontendSecurityLesson = defineTopicLesson({
  id: "frontend-security",
  title: "Web Security Basics for Frontend",
  summary:
    "Understand the frontend security basics interviews cover most often, including XSS, CSRF, token handling, untrusted HTML, and why the server remains the real security boundary.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intro",
  relatedTopicIds: ["network-browser-apis", "accessibility", "performance-fundamentals"],
});
