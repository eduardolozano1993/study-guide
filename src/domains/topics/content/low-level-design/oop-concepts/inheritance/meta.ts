import { defineTopicLesson } from "../../../defineTopicLesson";

export const inheritanceLesson = defineTopicLesson({
  id: "inheritance",
  title: "Inheritance",
  summary:
    "Learn how inheritance lets a subtype reuse and extend a base type, where it helps in object-oriented design, and when composition is a safer alternative.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "intro",
  relatedTopicIds: ["abstraction", "encapsulation", "polymorphism"],
});
