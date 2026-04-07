import { defineTopicLesson } from "../../../defineTopicLesson";

export const angularRxjsBasicsLesson = defineTopicLesson({
  id: "angular-rxjs-basics",
  title: "RxJS Basics",
  summary:
    "Learn the RxJS concepts Angular developers use most often, including observables, subscriptions, hot vs cold streams, and operator choices like `switchMap`, `mergeMap`, and `concatMap`.",
  estimatedReadingTimeMinutes: 15,
  difficulty: "intro",
  relatedTopicIds: ["angular-http-client", "angular-signals-standalone-components"],
});
