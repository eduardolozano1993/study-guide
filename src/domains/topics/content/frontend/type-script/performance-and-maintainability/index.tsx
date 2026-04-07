import {
  BulletList,
  Callout,
  ComparisonTable,
  Paragraph,
  SectionHeader,
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
          description="Type quality is not only about expressiveness. It is also about editor responsiveness, compiler speed, readable errors, and whether the next engineer can safely modify the code."
        />

        <SectionHeader>Technically Correct Can Still Be a Design Failure</SectionHeader>
        <Paragraph>
          Types are part of the codebase design surface. A type system that is
          theoretically precise but impossible to debug or slow to compile is
          still hurting the team.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "benefit", label: "Benefit" },
            { key: "cost", label: "Operational cost" },
          ]}
          rows={[
            {
              label: "Deeply derived types",
              values: {
                benefit: "Reduce duplication and preserve strong relationships.",
                cost: "Can slow editors, inflate compiler work, and produce unreadable errors.",
              },
            },
            {
              label: "Named intermediate aliases",
              values: {
                benefit: "Make intent and errors easier to understand.",
                cost: "A little more code, but usually worth it.",
              },
            },
            {
              label: "Simpler public result types",
              values: {
                benefit: "Improve onboarding and make debugging faster.",
                cost: "May repeat some detail internally instead of deriving everything magically.",
              },
            },
          ]}
        />

        <SectionHeader>Practical Maintainability Rules</SectionHeader>
        <BulletList
          items={[
            "Prefer named intermediate types over giant inline expressions that nobody can explain in one pass.",
            "If editor autocomplete or incremental builds feel slow after a type change, treat that as an engineering signal, not a cosmetic annoyance.",
            "Good enough often beats maximal cleverness at feature boundaries and public APIs.",
            "Refactor type complexity the same way you refactor code complexity: isolate hotspots, introduce clearer layers, and remove unnecessary indirection.",
          ]}
        />
        <Callout variant="warning">
          If a type takes longer to understand than the bug it prevents, it may
          not be a good trade for application code.
        </Callout>

        <SectionHeader>Typical Case Study</SectionHeader>
        <Paragraph>
          A common failure pattern is a single mega-helper that derives every
          result type through nested conditionals and mapped types. It is
          technically correct, but the team cannot debug errors, onboarding
          slows down, and compiler performance drops. The senior fix is usually
          decomposing the helper into named layers and simplifying the public
          surface.
        </Paragraph>
      </div>
    </TopicLessonPage>
  );
}

export default PerformanceAndMaintainability;
