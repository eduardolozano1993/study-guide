import { defineTopicLesson } from "../../../defineTopicLesson";

export const immutabilityLesson = defineTopicLesson({
  id: "immutability",
  title: "Immutability",
  summary:
    "Learn what immutability means in JavaScript, why it matters for predictable state updates, and where shallow copies can still leave you exposed to mutation bugs.",
  estimatedReadingTimeMinutes: 13,
  difficulty: "intro",
  relatedTopicIds: ["primitive-vs-reference-types", "objects-destructuring-spread-rest"],
});
