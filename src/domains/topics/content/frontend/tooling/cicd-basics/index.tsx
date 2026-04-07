import {
  BulletList,
  Callout,
  CodeBlock,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { cicdBasicsLesson } from "./meta";

export function CicdBasics() {
  return (
    <TopicLessonPage
      title={cicdBasicsLesson.title}
      summary={cicdBasicsLesson.summary}
      eyebrow="Frontend / Tooling"
      estimatedReadingTimeMinutes={cicdBasicsLesson.estimatedReadingTimeMinutes}
      difficulty={cicdBasicsLesson.difficulty}
      relatedTopics={[
        { label: "Unit Testing", href: "/topic/unit-testing" },
        { label: "Integration Testing", href: "/topic/integration-testing" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="CI/CD Basics"
          description="Frontend CI/CD is about making changes safe and repeatable: validate early, deploy predictably, and reduce the cost of mistakes through rollback paths, progressive delivery, and production visibility."
        />

        <SectionHeader>Typical Pipeline Shape</SectionHeader>
        <Paragraph>
          Continuous integration means every meaningful change is validated
          automatically. Continuous delivery or deployment means changes move
          toward production through an automated path with explicit safety
          controls.
        </Paragraph>
        <CodeBlock
          language="text"
          code={`Typical frontend path:
- install dependencies
- lint and format checks
- type-check
- run unit and integration tests
- build
- optionally run E2E or smoke checks
- publish artifact or deploy
- monitor rollout and release health`}
        />

        <SectionHeader>Fast Feedback vs Exhaustive Safety</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "good", label: "Best placed in fast PR feedback" },
            { key: "later", label: "Often acceptable later or post-merge" },
          ]}
          rows={[
            {
              label: "Checks",
              values: {
                good: "Linting, type-checking, focused unit tests, and builds that catch common breakage quickly.",
                later: "Heavier E2E suites, longer browser matrices, or canary verification against production-like environments.",
              },
            },
            {
              label: "Why",
              values: {
                good: "Short loops make engineers trust and respect the pipeline.",
                later: "Some confidence work is too slow or too environment-dependent to gate every small change.",
              },
            },
          ]}
        />

        <SectionHeader>What Makes Deployment Safe</SectionHeader>
        <BulletList
          items={[
            "Preview environments and staged rollouts reduce the blast radius before full production exposure.",
            "Feature flags and canaries let teams decouple deploy from release.",
            "Rollback is only credible if artifacts are reproducible and schema or backend changes are coordinated carefully.",
            "A reversible deployment path matters more than a flashy pipeline definition.",
          ]}
        />

        <SectionHeader>Failure Modes</SectionHeader>
        <BulletList
          items={[
            "Flaky pipelines teach engineers to ignore failures instead of trusting them.",
            "Pipelines that are too slow get bypassed or watered down until they stop protecting anything meaningful.",
            "Hidden manual steps make releases fragile even when the visible CI looks automated.",
            "If observability after deploy is weak, teams may not know a release is broken until users report it.",
          ]}
        />
        <Callout variant="tip">
          Strong interview answers connect CI/CD to delivery risk, rollback,
          feature flags, migrations, and production observability, not just to
          GitHub Actions syntax.
        </Callout>

        <SectionHeader>Interviewer Questions</SectionHeader>
        <BulletList
          items={[
            "What stages should a frontend CI pipeline usually contain, and why?",
            "How do you balance fast PR feedback against exhaustive verification?",
            "What makes a deployment truly reversible?",
            "Why are feature flags, canaries, and post-deploy monitoring part of CI/CD maturity?",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default CicdBasics;
