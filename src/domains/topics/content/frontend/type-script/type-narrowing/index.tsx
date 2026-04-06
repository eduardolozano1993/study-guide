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
          description="Narrowing is where TypeScript stops being annotations and starts behaving like a reasoning tool."
        />

        <Paragraph>
          A broad type only becomes useful when the program can safely refine it
          as it learns more. TypeScript uses control-flow analysis across
          branches, checks, and guards to narrow values.
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

        <SectionHeader>Discriminated Unions</SectionHeader>
        <Paragraph>
          Senior interviews often expect you to move beyond simple{" "}
          <code>typeof</code> checks and explain discriminated unions with
          exhaustive handling.
        </Paragraph>
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
          The <code>never</code> assignment proves the switch is exhaustive.
        </Callout>

        <CollapsibleSection title="User-defined guards">
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
          <Paragraph>
            A custom guard is only as trustworthy as the runtime evidence it
            checks. Weak guards create false confidence.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Interview pitfalls">
          <BulletList
            items={[
              "Using as instead of writing a real runtime check.",
              "Forgetting null when narrowing objects.",
              "Skipping exhaustiveness for discriminated unions.",
              "Writing custom guards that barely validate anything.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default TypeNarrowing;
