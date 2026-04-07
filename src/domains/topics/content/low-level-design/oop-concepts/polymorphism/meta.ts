import { defineTopicLesson } from "../../../defineTopicLesson";

export const polymorphismLesson = defineTopicLesson({
  id: "polymorphism",
  title: "Polymorphism",
  summary:
    "Learn how polymorphism lets different types respond to the same message through a shared contract, reducing branching and making behavior easier to extend.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "intro",
  relatedTopicIds: ["abstraction", "encapsulation", "inheritance"],
});
