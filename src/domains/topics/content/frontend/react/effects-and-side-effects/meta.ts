import { defineTopicLesson } from "../../../defineTopicLesson";

export const reactEffectsLesson = defineTopicLesson({
  id: "react-effects-and-side-effects",
  title: "Effects and Side Effects",
  summary:
    "Learn when useEffect is justified, how cleanup works, how to handle race conditions and request cancellation, and why derived state in effects is often a design smell.",
  estimatedReadingTimeMinutes: 16,
  difficulty: "advanced",
  relatedTopicIds: ["react-hooks-in-depth", "react-data-fetching", "react-rendering-behavior"],
});
