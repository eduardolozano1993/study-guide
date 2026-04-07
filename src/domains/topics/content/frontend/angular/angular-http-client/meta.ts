import { defineTopicLesson } from "../../../defineTopicLesson";

export const angularHttpClientLesson = defineTopicLesson({
  id: "angular-http-client",
  title: "HTTP Client",
  summary:
    "Learn how Angular's HttpClient performs API requests, returns observables, and integrates with interceptors and RxJS operators.",
  estimatedReadingTimeMinutes: 13,
  difficulty: "intro",
  relatedTopicIds: ["angular-rxjs-basics", "angular-interceptors"],
});
