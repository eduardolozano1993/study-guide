import { defineTopicLesson } from "../../../defineTopicLesson";

export const babelTypeScriptLesson = defineTopicLesson({
  id: "babel-typescript",
  title: "Babel and TypeScript",
  summary:
    "Learn the difference between transpilation and type checking, how Babel and TypeScript can work together, and where teams often get confused.",
  estimatedReadingTimeMinutes: 13,
  difficulty: "intermediate",
  relatedTopicIds: [
    "typescript-strict-mode-and-tsconfig",
    "webpack-vite",
    "typescript-runtime-vs-compile-time",
  ],
});
