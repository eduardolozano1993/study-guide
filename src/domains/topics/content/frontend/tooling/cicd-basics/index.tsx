import {
  BulletList,
  Callout,
  CodeBlock,
  Paragraph,
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
          description="Frontend CI/CD is about making changes safe and repeatable: validate early, deploy predictably, and reduce the cost of mistakes."
        />

        <Paragraph>
          Continuous integration means every meaningful change is validated
          automatically. Continuous delivery or deployment means changes move
          toward production through an automated path with safety controls.
        </Paragraph>
        <CodeBlock
          language="text"
          code={`Typical frontend CI steps:
- install dependencies
- lint
- type-check
- run tests
- build
- optionally run E2E or smoke checks
- deploy or publish artifact`}
        />

        <BulletList
          items={[
            "CI should catch issues early through linting, type-checking, tests, and builds.",
            "CD should make deployment predictable and reversible.",
            "Production safety often uses previews, staged rollouts, canaries, or feature flags.",
            "Fast feedback matters because pipelines that are too slow get ignored or bypassed.",
          ]}
        />

        <Callout variant="tip">
          Senior interview answers should connect CI/CD to delivery risk, team
          speed, and deployment safety rather than describing it as only a list
          of GitHub Actions steps.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default CicdBasics;
