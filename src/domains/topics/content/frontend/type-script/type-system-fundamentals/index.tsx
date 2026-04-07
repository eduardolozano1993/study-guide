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
          description="Senior interview answers should explain what guarantee a type gives, how broad it is, and where it becomes unsafe or too imprecise."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          TypeScript is a static layer on top of JavaScript. It helps you model
          valid values and legal operations before code runs, but it does not
          replace runtime validation.
        </Paragraph>
        <Paragraph>
          The fundamentals matter because every advanced topic builds on them:
          unions describe alternatives, intersections combine requirements, and
          special-purpose types such as <code>any</code>, <code>unknown</code>,
          <code>never</code>, and <code>void</code> define the edges of the
          system.
        </Paragraph>
        <Callout variant="tip">
          A strong answer explains why <code>unknown</code> is safer than
          <code>any</code>, why <code>never</code> proves impossibility, and why
          literal inference matters for real APIs.
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
            Literal unions model exact allowed states. Intersections are
            compile-time combinations of constraints, not runtime object merges.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Subtle Follow-Ups Interviewers Ask</SectionHeader>
        <BulletList
          items={[
            "`any` opts out of safety, while `unknown` preserves uncertainty and forces proof before use.",
            "`void` and `undefined` are related, but they do not mean the same thing in every function or assignment context.",
            "Literal inference is what lets APIs preserve exact values instead of widening everything to broad primitives.",
            "Unreachable code and exhaustive switches are where `never` becomes practically useful instead of theoretical.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default TypeSystemFundamentals;
