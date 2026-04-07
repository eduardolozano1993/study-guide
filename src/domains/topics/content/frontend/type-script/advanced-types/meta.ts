import { defineTopicLesson } from "../../../defineTopicLesson";

export const advancedTypesLesson = defineTopicLesson({
  id: "typescript-advanced-types",
  title: "Advanced Types",
  summary:
    "Go beyond the basics with mapped types, conditional types, indexed access, keyof, infer, and template literal types.",
  estimatedReadingTimeMinutes: 18,
  difficulty: "advanced",
  relatedTopicIds: [
    "typescript-generics",
    "typescript-utility-types",
    "typescript-api-type-design",
  ],
});
