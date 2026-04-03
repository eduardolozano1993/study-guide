import { defineTopicLesson } from "../../../defineTopicLesson";

export const encapsulationLesson = defineTopicLesson({
  id: "encapsulation",
  title: "Encapsulation",
  summary:
    "Learn how encapsulation protects object invariants by keeping state and behavior together and controlling how external code reads or updates that state.",
  estimatedReadingTimeMinutes: 14,
  difficulty: "intro",
  relatedTopicIds: ["abstraction", "inheritance", "polymorphism"],
});
