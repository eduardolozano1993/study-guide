import { defineTopicLesson } from "../../../defineTopicLesson";

export const closuresLesson = defineTopicLesson({
  id: "closures",
  title: "Closures",
  summary:
    "Learn what closures really are, why they exist, and how they power private state, callbacks, currying, and common interview questions.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intro",
  relatedTopicIds: ["promises-async-await", "immutability"],
});
