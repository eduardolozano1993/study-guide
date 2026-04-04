import { defineTopicLesson } from "../../../../defineTopicLesson";

export const observerLesson = defineTopicLesson({
  id: "observer",
  title: "Observer",
  summary:
    "Learn how the Observer pattern notifies multiple listeners when an object changes state or emits an event.",
  estimatedReadingTimeMinutes: 8,
  difficulty: "intro",
  relatedTopicIds: ["strategy", "state-machine", "facade"],
});
