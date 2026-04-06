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
import { typeSystemFundamentalsLesson } from "./meta";

export function TypeSystemFundamentals() {
  return (
    <TopicLessonPage
      title={typeSystemFundamentalsLesson.title}
      summary={typeSystemFundamentalsLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={typeSystemFundamentalsLesson.estimatedReadingTimeMinutes}
      difficulty={typeSystemFundamentalsLesson.difficulty}
      relatedTopics={[
        { label: "Type Narrowing", href: "/topic/typescript-type-narrowing" },
        { label: "Structural Typing", href: "/topic/typescript-structural-typing" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Type System Fundamentals"
          description="Senior interview answers should explain what guarantees a type gives, how broad it is, and where it becomes unsafe."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          TypeScript is a static layer on top of JavaScript. It helps you model
          valid values and legal operations before code runs, but it does not
          replace runtime validation.
        </Paragraph>
        <Paragraph>
          The fundamentals matter because every advanced topic builds on them:
          unions describe alternatives, intersections combine constraints, and
          special-purpose types like <code>any</code>, <code>unknown</code>, and{" "}
          <code>never</code> define the edges of the system.
        </Paragraph>
        <Callout variant="tip">
          A strong answer explains why <code>unknown</code> is safer than{" "}
          <code>any</code> and why <code>never</code> is useful for proving a
          state is impossible.
        </Callout>

        <CollapsibleSection title="Top, bottom, and special-purpose types" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`function parseJson(value: string): unknown {
  return JSON.parse(value);
}

const result = parseJson('{"id": 42}');

if (typeof result === "object" && result !== null && "id" in result) {
  console.log(result.id);
}

function fail(message: string): never {
  throw new Error(message);
}`}
          />
          <Paragraph>
            <code>any</code> opts out of safety, <code>unknown</code> preserves
            uncertainty, <code>void</code> usually describes ignored returns,
            and <code>never</code> marks impossible code paths.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Unions, intersections, and literals" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`type PaymentStatus = "pending" | "authorized" | "failed";

type BaseOrder = {
  id: string;
  total: number;
};

type WithAudit = {
  createdAt: string;
  createdBy: string;
};

type AuditedOrder = BaseOrder & WithAudit;`}
          />
          <Paragraph>
            Literal unions let you model exact allowed states. Intersections are
            compile-time combinations of requirements, not runtime object
            merges.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Interview pitfalls">
          <BulletList
            items={[
              "Treating any and unknown as interchangeable.",
              "Using broad string instead of a precise literal union.",
              "Confusing intersections with runtime object spread.",
              "Forgetting that types disappear at runtime.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default TypeSystemFundamentals;
