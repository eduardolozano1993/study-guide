import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { unitTestingLesson } from "./meta";

export function UnitTesting() {
  return (
    <TopicLessonPage
      title={unitTestingLesson.title}
      summary={unitTestingLesson.summary}
      eyebrow="Frontend / Testing"
      estimatedReadingTimeMinutes={unitTestingLesson.estimatedReadingTimeMinutes}
      difficulty={unitTestingLesson.difficulty}
      relatedTopics={[
        { label: "Integration Testing", href: "/topic/integration-testing" },
        { label: "React Component Design", href: "/topic/react-component-design" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Unit Testing"
          description="A good unit test checks a small piece of behavior in isolation, runs quickly, and fails for a specific reason. Its real value is determinism and diagnosis, not just test count."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          Unit tests focus on one small unit of behavior at a time: a pure
          function, a formatter, a parser, a validator, a reducer, or a very
          small component with tightly controlled collaborators. The goal is
          fast feedback and precise failures.
        </Paragraph>
        <Paragraph>
          In frontend work, unit tests are strongest when they target logic that
          does not need the whole app environment to be meaningful.
        </Paragraph>

        <CollapsibleSection title="A good unit-test target" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`function formatPrice(amountInCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amountInCents / 100);
}

describe("formatPrice", () => {
  it("formats cents as USD", () => {
    expect(formatPrice(2599)).toBe("$25.99");
  });
});`}
          />
        </CollapsibleSection>

        <SectionHeader>High-Value Unit-Test Targets</SectionHeader>
        <BulletList
          items={[
            "Reducers and state transition helpers that encode domain rules cleanly.",
            "Formatters, parsers, validators, and permission helpers where inputs and outputs are explicit.",
            "Boundary logic that turns messy input into a normalized representation.",
            "Small components only when their behavior is still meaningful in isolation.",
          ]}
        />

        <SectionHeader>What Makes A Unit Test Weak</SectionHeader>
        <BulletList
          items={[
            "Over-mocking can make the test precise but meaningless because the real collaboration points disappear.",
            "Implementation-detail assertions create brittle tests that fail on harmless refactors instead of real regressions.",
            "Tiny tests around trivial getters or wrappers can inflate coverage without increasing confidence.",
            "If the behavior only matters when several modules interact, a unit test may be the wrong level entirely.",
          ]}
        />
        <Callout variant="tip">
          Senior interview answers usually emphasize that unit tests should be
          cheap, deterministic, observable, and easy to diagnose.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What kinds of frontend logic are excellent unit-test targets?",
              "Why are reducers, parsers, validators, and formatters especially good candidates?",
              "How can a unit test become too mocked or too implementation-specific to stay useful?",
              "When should you stop forcing a unit test and move up to integration instead?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default UnitTesting;
