import { defineTopicLesson } from "../../../defineTopicLesson";

export const angularChangeDetectionLesson = defineTopicLesson({
  id: "angular-change-detection",
  title: "Change Detection",
  summary:
    "Learn how Angular updates the view, when checks run, and why OnPush and immutable data shape performance and correctness.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intro",
  relatedTopicIds: ["angular-lifecycle-hooks", "angular-signals-standalone-components"],
});
