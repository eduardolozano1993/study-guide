import { defineTopicLesson } from "../../../defineTopicLesson";

export const apiTypeDesignLesson = defineTopicLesson({
  id: "typescript-api-type-design",
  title: "API Type Design",
  summary:
    "Model requests, responses, DTOs, domain objects, and result patterns so contracts stay explicit, safe, and maintainable.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "advanced",
  relatedTopicIds: [
    "typescript-generics",
    "typescript-async-typing",
    "typescript-type-safe-patterns-in-real-code",
  ],
});
