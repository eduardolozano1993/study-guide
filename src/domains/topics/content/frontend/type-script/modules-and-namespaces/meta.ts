import { defineTopicLesson } from "../../../defineTopicLesson";

export const modulesAndNamespacesLesson = defineTopicLesson({
  id: "typescript-modules-and-namespaces",
  title: "Modules and Namespaces",
  summary:
    "Understand modern ES modules, import type, module resolution basics, and why namespaces are mostly legacy in application code.",
  estimatedReadingTimeMinutes: 12,
  difficulty: "intermediate",
  relatedTopicIds: [
    "typescript-working-with-external-libraries",
    "typescript-strict-mode-and-tsconfig",
    "esm-vs-commonjs",
  ],
});
