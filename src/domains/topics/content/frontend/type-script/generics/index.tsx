import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { typeScriptGenericsLesson } from "./meta";

export function TypeScriptGenerics() {
  return (
    <TopicLessonPage
      title={typeScriptGenericsLesson.title}
      summary={typeScriptGenericsLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={typeScriptGenericsLesson.estimatedReadingTimeMinutes}
      difficulty={typeScriptGenericsLesson.difficulty}
      relatedTopics={[
        { label: "Utility Types", href: "/topic/typescript-utility-types" },
        { label: "Advanced Types", href: "/topic/typescript-advanced-types" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Generics"
          description="Generics preserve relationships between values. The senior skill is knowing when that relationship is worth the abstraction cost."
        />

        <SectionHeader>Preserve Information</SectionHeader>
        <Paragraph>
          A generic says the logic works for many types, but the caller still
          deserves a specific result. Good generics preserve information instead
          of widening everything to <code>unknown</code> or <code>any</code>.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`function first<T>(items: T[]): T | undefined {
  return items[0];
}

function getId<T extends { id: string }>(value: T) {
  return value.id;
}`}
        />

        <CollapsibleSection title="Relating keys and values" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`function pluck<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}

const user = { id: "u1", active: true };
const isActive = pluck(user, "active");`}
          />
          <Paragraph>
            This pattern shows why generics matter: the output stays tied to the
            actual key the caller passed.
          </Paragraph>
        </CollapsibleSection>

        <Callout variant="warning">
          If a generic parameter does not protect a real contract, it usually
          makes the API harder to read without adding value.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default TypeScriptGenerics;
