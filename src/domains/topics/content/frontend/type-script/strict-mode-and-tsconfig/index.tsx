import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { strictModeAndTsconfigLesson } from "./meta";

export function StrictModeAndTsconfig() {
  return (
    <TopicLessonPage
      title={strictModeAndTsconfigLesson.title}
      summary={strictModeAndTsconfigLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={strictModeAndTsconfigLesson.estimatedReadingTimeMinutes}
      difficulty={strictModeAndTsconfigLesson.difficulty}
      relatedTopics={[
        { label: "Modules and Namespaces", href: "/topic/typescript-modules-and-namespaces" },
        { label: "Senior-Level Judgment", href: "/topic/typescript-senior-level-judgment" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Strict Mode and tsconfig"
          description="Compiler settings change what guarantees TypeScript actually gives the project. That makes `tsconfig` an architecture file, not just a tooling detail."
        />

        <SectionHeader>Flags That Materially Change Behavior</SectionHeader>
        <Paragraph>
          Two teams can both say they use TypeScript and still get very
          different safety guarantees depending on compiler options.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true
  }
}`}
        />
        <ComparisonTable
          columns={[
            { key: "impact", label: "What it changes" },
            { key: "tradeoff", label: "Tradeoff" },
          ]}
          rows={[
            {
              label: "strictNullChecks",
              values: {
                impact: "Forces nullability to become explicit instead of accidental.",
                tradeoff: "Legacy code often reveals hidden assumptions immediately.",
              },
            },
            {
              label: "noImplicitAny",
              values: {
                impact: "Stops uncertainty from silently spreading through the codebase.",
                tradeoff: "Migration can feel noisy until the obvious hotspots are cleaned up.",
              },
            },
            {
              label: "exactOptionalPropertyTypes",
              values: {
                impact: "Separates absence from explicit `undefined` more honestly.",
                tradeoff: "Some existing APIs and mocks need sharper thinking.",
              },
            },
            {
              label: "noUncheckedIndexedAccess",
              values: {
                impact: "Makes map and array lookups acknowledge missing values.",
                tradeoff: "You write more guards, but they match reality.",
              },
            },
          ]}
        />

        <SectionHeader>Migration Tactics for Real Codebases</SectionHeader>
        <BulletList
          items={[
            "Turn on stricter settings incrementally, often per package or feature boundary, instead of trying to perfect the whole repo at once.",
            "Add wrappers and helper functions around weak legacy surfaces so unsafe patterns stop spreading.",
            "Use CI to enforce new rules for touched code or selected packages before making them repo-wide.",
            "Be explicit about `skipLibCheck`: it can buy velocity, but it also hides declaration problems that may matter during upgrades.",
          ]}
        />

        <SectionHeader>Tooling Alignment Matters</SectionHeader>
        <Paragraph>
          TypeScript settings have to agree with bundlers, test runners, module
          resolution, and IDE expectations. A config that passes `tsc` but
          disagrees with runtime resolution still produces broken software.
        </Paragraph>
        <Callout variant="warning">
          A strong answer is not just `turn strict on`. It is which settings
          matter most, what behavior they change, and how you would roll them
          out without stopping delivery.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why do `strictNullChecks` and `noImplicitAny` change developer behavior so much?",
              "What does `exactOptionalPropertyTypes` protect you from?",
              "When is `skipLibCheck` a pragmatic compromise, and what risk does it introduce?",
              "How would you harden `tsconfig` in a large legacy monorepo without freezing the team?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default StrictModeAndTsconfig;
