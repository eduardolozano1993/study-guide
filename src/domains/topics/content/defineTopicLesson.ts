import type { TopicLessonMeta } from "./lessonTypes";

export const defineTopicLesson = <T extends TopicLessonMeta>(meta: T) => meta;
