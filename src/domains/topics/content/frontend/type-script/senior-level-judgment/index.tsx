import {
  BulletList,
  Callout,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { seniorLevelJudgmentLesson } from "./meta";

export function SeniorLevelJudgment() {
  return (
    <TopicLessonPage
      title={seniorLevelJudgmentLesson.title}
      summary={seniorLevelJudgmentLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={seniorLevelJudgmentLesson.estimatedReadingTimeMinutes}
      difficulty={seniorLevelJudgmentLesson.difficulty}
      relatedTopics={[
        { label: "Performance and Maintainability", href: "/topic/typescript-performance-and-maintainability" },
        { label: "Strict Mode and tsconfig", href: "/topic/typescript-strict-mode-and-tsconfig" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Senior-Level Judgment"
          description="This is the topic that turns TypeScript knowledge into engineering leadership: where to tighten contracts, where to simplify, and how to improve a codebase without freezing delivery."
        />

        <Paragraph>
          Senior TypeScript judgment is mainly about tradeoffs. You should be
          able to explain how you would refactor weak typings, where you would
          place validation boundaries, and how much type complexity a team
          should actually pay for.
        </Paragraph>

        <Callout variant="tip">
          Strong senior answers sound like decisions made in a real codebase,
          not like a features checklist.
        </Callout>

        <BulletList
          items={[
            "Tighten the unsafe seams first: any-heavy zones, API boundaries, and invalid state modeling.",
            "Prefer unknown plus validation over any plus hope.",
            "Use advanced types when they simplify a real contract, not when they only demonstrate cleverness.",
            "Adopt stricter typing incrementally so the team can absorb the change.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default SeniorLevelJudgment;
