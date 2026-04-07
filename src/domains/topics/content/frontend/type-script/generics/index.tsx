import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
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
          description="Generics preserve relationships between values. The senior skill is deciding when that relationship adds real safety and when a generic only makes the API harder to understand."
        />

        <SectionHeader>Preserve Information Instead of Widening It Away</SectionHeader>
        <Paragraph>
          A generic says the logic works for many types, but the caller still
          deserves a specific result. Good generics preserve that specificity
          instead of widening everything to <code>unknown</code> or
          <code>any</code>.
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

        <SectionHeader>Constraints, Defaults, and Relationships</SectionHeader>
        <CollapsibleSection title="Relating keys and values" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`function pluck<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}

const user = { id: "u1", active: true };
const isActive = pluck(user, "active");`}
          />
        </CollapsibleSection>
        <ComparisonTable
          columns={[
            { key: "good", label: "Healthy generic" },
            { key: "bad", label: "Weak generic" },
          ]}
          rows={[
            {
              label: "Purpose",
              values: {
                good: "Preserves a real relationship such as input-to-output, key-to-value, or wrapper-to-payload.",
                bad: "Adds a type parameter that callers never benefit from directly.",
              },
            },
            {
              label: "Complexity",
              values: {
                good: "Uses constraints and defaults to keep the common path understandable.",
                bad: "Introduces type parameters so abstract that the signature stops teaching anyone anything.",
              },
            },
          ]}
        />

        <SectionHeader>When Not to Reach for a Generic</SectionHeader>
        <BulletList
          items={[
            "If the valid shapes are a small closed set, a union is often clearer than a generic.",
            "If callers constantly spell out the type arguments, inference may be failing and the API may need redesign.",
            "Real-world generics shine in collections, form helpers, API wrappers, and component props that preserve relationships.",
            "Keep public generics understandable by naming parameters clearly and avoiding unnecessary stacking of type-level helpers.",
          ]}
        />
        <Callout variant="warning">
          A generic parameter that protects no real contract is usually just
          abstraction noise.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When should you use a generic instead of a union?",
              "What is the purpose of a generic constraint like `K extends keyof T`?",
              "How do default generic parameters help API ergonomics?",
              "What does it mean when callers keep having to specify type arguments manually?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default TypeScriptGenerics;
