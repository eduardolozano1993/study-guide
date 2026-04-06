import { defineTopicLesson } from "../../../defineTopicLesson";

export const angularInterceptorsLesson = defineTopicLesson({
  id: "angular-interceptors",
  title: "Interceptors",
  summary:
    "Learn how Angular interceptors sit in the HTTP pipeline to add headers, handle auth, transform responses, and centralize cross-cutting concerns.",
  estimatedReadingTimeMinutes: 12,
  difficulty: "intro",
  relatedTopicIds: ["angular-http-client", "angular-services"],
});
