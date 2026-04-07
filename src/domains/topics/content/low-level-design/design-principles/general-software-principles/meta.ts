import { defineTopicLesson } from "../../../defineTopicLesson";

export const generalSoftwarePrinciplesLesson = defineTopicLesson({
  id: "general-software-principles",
  title: "General Software Principles",
  summary:
    "Learn the practical meaning of KISS, DRY, YAGNI, Separation of Concerns, and the Law of Demeter through short explanations and paired bad and good TypeScript examples.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "intro",
  relatedTopicIds: [
    "abstraction",
    "encapsulation",
    "inheritance",
    "polymorphism",
  ],
});
