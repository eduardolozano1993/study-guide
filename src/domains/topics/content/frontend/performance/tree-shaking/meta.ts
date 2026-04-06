import { defineTopicLesson } from "../../../defineTopicLesson";

export const treeShakingLesson = defineTopicLesson({
  id: "tree-shaking",
  title: "Tree Shaking",
  summary:
    "Learn what tree shaking actually removes from bundles, what build constraints it depends on, and why import style and side effects matter.",
  estimatedReadingTimeMinutes: 12,
  difficulty: "intermediate",
  relatedTopicIds: ["code-splitting", "caching-strategies", "esm-vs-commonjs"],
});
