import {
  BulletList,
  Callout,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
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
          description="This topic turns TypeScript knowledge into engineering leadership: where to tighten contracts first, where to simplify, how to stage stricter settings, and how to improve safety without freezing delivery."
        />

        <SectionHeader>Fix the Dangerous Boundaries First</SectionHeader>
        <Paragraph>
          Senior TypeScript judgment is mostly about sequencing. The first goal
          is not maximum type cleverness. It is reducing the highest-risk seams:
          `any`-heavy zones, unvalidated API input, weak nullability around core
          flows, and impossible states that are still representable.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "why", label: "Why it matters" },
            { key: "mistake", label: "Common mistake" },
          ]}
          rows={[
            {
              label: "Boundary wrappers",
              values: {
                why: "Contain unsafe vendor APIs or legacy surfaces in one place.",
                mistake: "Sprinkling assertions everywhere and pretending the codebase is safe.",
              },
            },
            {
              label: "Runtime validation",
              values: {
                why: "Protects typed code from untrusted input.",
                mistake: "Believing shared interfaces or generated types verify runtime payloads.",
              },
            },
            {
              label: "Stricter compiler settings",
              values: {
                why: "Change day-to-day developer behavior and surface real bugs early.",
                mistake: "Turning everything on at once and stalling delivery with no rollout plan.",
              },
            },
            {
              label: "Simpler domain models",
              values: {
                why: "Make invalid states harder to express without overengineering.",
                mistake: "Overtyping trivial code while leaving dangerous boundaries weak.",
              },
            },
          ]}
        />

        <SectionHeader>Migration Strategy Beats Grand Rewrite Thinking</SectionHeader>
        <BulletList
          items={[
            "Harden `tsconfig` incrementally, often package by package or boundary by boundary.",
            "Introduce safe wrappers around unstable API contracts instead of forcing the whole app to absorb raw DTOs immediately.",
            "Reserve explicit `any` for truly temporary escape hatches and track why it exists.",
            "Use error budgets and delivery constraints to choose which type debt must be fixed now versus staged over several iterations.",
          ]}
        />
        <Callout variant="tip">
          Strong senior answers sound like decisions made in a messy real
          codebase, not like a features checklist from the TypeScript handbook.
        </Callout>

        <SectionHeader>What Mature Tradeoff Thinking Sounds Like</SectionHeader>
        <BulletList
          items={[
            "Use advanced types when they make the public contract clearer, not when they only prove the author is clever.",
            "Prefer `unknown` plus validation over `any` plus hope.",
            "Simplify types when editor errors, compiler speed, or onboarding cost start hurting the team more than the extra precision helps.",
            "Invest more heavily in types for shared libraries, domain boundaries, and failure-prone workflows than for disposable glue code.",
          ]}
        />

        <CollapsibleSection title="Interviewer scenarios">
          <BulletList
            items={[
              "A legacy codebase has widespread `any`, weak nullability, and unstable backend payloads. What gets fixed first and why?",
              "A team wants every function fully generic and perfectly typed. Where do you push back?",
              "How would you improve type safety without blocking product delivery for a quarter?",
              "What are examples of senior mistakes in TypeScript? Overtyping trivial code, under-modeling unsafe boundaries, and confusing cleverness with maturity.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default SeniorLevelJudgment;
