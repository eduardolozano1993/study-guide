import {
  BulletList,
  Callout,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { performanceAndMaintainabilityLesson } from "./meta";

export function PerformanceAndMaintainability() {
  return (
    <TopicLessonPage
      title={performanceAndMaintainabilityLesson.title}
      summary={performanceAndMaintainabilityLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={performanceAndMaintainabilityLesson.estimatedReadingTimeMinutes}
      difficulty={performanceAndMaintainabilityLesson.difficulty}
      relatedTopics={[
        { label: "Advanced Types", href: "/topic/typescript-advanced-types" },
        { label: "Senior-Level Judgment", href: "/topic/typescript-senior-level-judgment" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Performance and Maintainability"
          description="Type quality is not only about expressiveness. It is also about editor responsiveness, compiler performance, readable errors, and team comprehension."
        />

        <Paragraph>
          Types are part of the design surface of the codebase. A type system
          that is technically correct but impossible to maintain is still a
          design failure.
        </Paragraph>
        <Callout variant="warning">
          If a type takes longer to understand than the bug it prevents, it may
          not be a good trade for application code.
        </Callout>
        <BulletList
          items={[
            "Prefer named intermediate types over giant inline expressions.",
            "Use advanced types when they encode a durable rule, not when they only look clever.",
            "Watch compiler and editor pain in large projects.",
            "Optimize for types that teach intent to the next engineer.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default PerformanceAndMaintainability;
