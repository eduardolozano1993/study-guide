import { defineTopicLesson } from "../../../defineTopicLesson";

export const esmVsCommonjsLesson = defineTopicLesson({
  id: "esm-vs-commonjs",
  title: "Modules: ESM vs CommonJS",
  summary:
    "Understand how JavaScript modules are structured and loaded so you can explain `import` and `require` differences in browser and Node environments.",
  estimatedReadingTimeMinutes: 12,
  difficulty: "intro",
  relatedTopicIds: ["promises-async-await", "objects-destructuring-spread-rest"],
});
