export type TopicLessonDifficulty = "intro" | "intermediate" | "advanced";

export interface TopicLessonMeta {
  id: string;
  title: string;
  summary: string;
  estimatedReadingTimeMinutes?: number;
  difficulty?: TopicLessonDifficulty;
  relatedTopicIds?: string[];
}
