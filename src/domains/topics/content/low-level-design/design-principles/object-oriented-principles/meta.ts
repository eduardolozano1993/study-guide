import { defineTopicLesson } from "../../../defineTopicLesson";

export const objectOrientedPrinciplesLesson = defineTopicLesson({
  id: "object-oriented-principles",
  title: "Object-Oriented Principles",
  summary:
    "Learn the five core object-oriented design principles often grouped as SOLID, with short explanations and paired bad and good TypeScript examples for each principle.",
  estimatedReadingTimeMinutes: 20,
  difficulty: "intermediate",
  relatedTopicIds: [
    "abstraction",
    "encapsulation",
    "inheritance",
    "polymorphism",
    "general-software-principles",
  ],
});
