import { defineTopicLesson } from "../../../defineTopicLesson";

export const typeScriptGenericsLesson = defineTopicLesson({
  id: "typescript-generics",
  title: "Generics",
  summary:
    "Use generics to keep relationships between inputs and outputs precise while avoiding duplicated types and unsafe widening.",
  estimatedReadingTimeMinutes: 17,
  difficulty: "advanced",
  relatedTopicIds: [
    "typescript-utility-types",
    "typescript-advanced-types",
    "typescript-api-type-design",
  ],
});
