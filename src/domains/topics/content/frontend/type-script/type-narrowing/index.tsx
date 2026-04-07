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
import { typeNarrowingLesson } from "./meta";

export function TypeNarrowing() {
  return (
    <TopicLessonPage
      title={typeNarrowingLesson.title}
      summary={typeNarrowingLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={typeNarrowingLesson.estimatedReadingTimeMinutes}
      difficulty={typeNarrowingLesson.difficulty}
      relatedTopics={[
        { label: "Type Assertions and Casting", href: "/topic/typescript-type-assertions" },
        { label: "Advanced Types", href: "/topic/typescript-advanced-types" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Type Narrowing"
          description="Narrowing is where TypeScript stops being annotations and starts behaving like a reasoning tool. Senior answers explain how runtime evidence and control-flow analysis work together."
        />

        <Paragraph>
          A broad type only becomes useful when the program can safely refine it
          as it learns more. TypeScript narrows values through control-flow
          analysis across branches, guards, and impossible paths.
        </Paragraph>

        <CollapsibleSection title="Built-in narrowing" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`function formatValue(value: string | Date) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value.trim();
}`}
          />
          <Paragraph>
            Common runtime checks like <code>typeof</code>, <code>instanceof</code>,
            null checks, equality checks, and <code>in</code> all feed the type
            system.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Discriminated Unions and Exhaustiveness</SectionHeader>
        <CodeBlock
          language="typescript"
          code={`type ApiResult =
  | { kind: "success"; data: { id: string } }
  | { kind: "error"; message: string }
  | { kind: "loading" };

function renderResult(result: ApiResult) {
  switch (result.kind) {
    case "success":
      return result.data.id;
    case "error":
      return result.message;
    case "loading":
      return "Loading...";
    default: {
      const unreachable: never = result;
      return unreachable;
    }
  }
}`}
        />
        <Callout variant="tip">
          The <code>never</code> assignment proves the switch is exhaustive and
          turns missing cases into compile-time signals.
        </Callout>

        <SectionHeader>User-Defined Guards Need Real Evidence</SectionHeader>
        <CollapsibleSection title="Custom guard example">
          <CodeBlock
            language="typescript"
            code={`type User = { id: string; email: string };

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value
  );
}`}
          />
        </CollapsibleSection>
        <BulletList
          items={[
            "A user-defined guard is only as trustworthy as the runtime evidence it checks.",
            "Weak guards create false confidence and are often worse than leaving the value as `unknown`.",
            "Narrowing is especially valuable in API parsing, event handling, and UI state machines where several states share a surface shape.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How does control-flow analysis combine several guards across a function?",
              "Why is `never` useful in exhaustive switches?",
              "What makes a custom type guard weak or unsafe?",
              "When is narrowing better than using `as`?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default TypeNarrowing;
