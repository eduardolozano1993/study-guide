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
          description="A good unit test checks a small piece of behavior in isolation, runs quickly, and fails for a specific reason."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          Unit tests focus on one small unit of behavior at a time: a pure
          function, a utility, a formatter, a validator, or a component with
          tightly controlled dependencies. The goal is fast feedback and precise
          failures.
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
          <Paragraph>
            This kind of test is valuable because the scope is narrow, the
            inputs are explicit, and the failure points to one behavior.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="What belongs in unit tests">
          <BulletList
            items={[
              "Data transformation and formatting helpers.",
              "Validation and parsing logic.",
              "Reducer-like state transitions.",
              "Small components with limited surface area and mocked collaborators.",
            ]}
          />
        </CollapsibleSection>

        <Callout variant="tip">
          Senior interview answers usually say that unit tests should be cheap,
          deterministic, and easy to diagnose.
        </Callout>

        <CollapsibleSection title="Common interview pitfalls">
          <BulletList
            items={[
              "Calling every small test a unit test even when several systems are involved.",
              "Mocking so aggressively that the test stops representing useful behavior.",
              "Testing implementation details instead of observable outcomes.",
              "Using unit tests for flows that only make sense when modules work together.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default UnitTesting;
