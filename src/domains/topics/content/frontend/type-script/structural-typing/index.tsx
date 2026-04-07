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
import { structuralTypingLesson } from "./meta";

export function StructuralTyping() {
  return (
    <TopicLessonPage
      title={structuralTypingLesson.title}
      summary={structuralTypingLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={structuralTypingLesson.estimatedReadingTimeMinutes}
      difficulty={structuralTypingLesson.difficulty}
      relatedTopics={[
        { label: "Interfaces vs Types", href: "/topic/typescript-interfaces-vs-types" },
        { label: "Classes and OOP Typing", href: "/topic/typescript-classes-and-oop" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Structural Typing"
          description="TypeScript mostly cares about shape, not nominal identity. That is ergonomic, but it also means assignability leaks and domain confusion deserve careful attention."
        />

        <SectionHeader>Shape-Based Compatibility</SectionHeader>
        <CollapsibleSection title="Basic example" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`type UserPreview = {
  id: string;
  email: string;
};

const fullUser = {
  id: "u1",
  email: "user@example.com",
  isAdmin: true,
};

const preview: UserPreview = fullUser;`}
          />
        </CollapsibleSection>
        <Paragraph>
          Structural compatibility makes TypeScript pleasant for everyday code,
          but it can also blur important domain boundaries when two values look
          compatible even though their meaning is different.
        </Paragraph>

        <SectionHeader>Excess Property Checks and Assignability Leaks</SectionHeader>
        <CodeBlock
          language="typescript"
          code={`type Config = {
  retries: number;
};

const config: Config = {
  retries: 3,
  // timeout: 1000, // excess property error
};`}
        />
        <ComparisonTable
          columns={[
            { key: "good", label: "What the check helps with" },
            { key: "bad", label: "What it does not do" },
          ]}
          rows={[
            {
              label: "Excess property checks",
              values: {
                good: "Catch suspicious extra fields on fresh object literals.",
                bad: "Provide runtime validation or full nominal safety.",
              },
            },
            {
              label: "Structural assignability",
              values: {
                good: "Makes composition and reuse ergonomic.",
                bad: "Can let conceptually different IDs or domain values mix too easily.",
              },
            },
          ]}
        />

        <SectionHeader>When Branding or Opaque Patterns Help</SectionHeader>
        <BulletList
          items={[
            "Plain strings are often too permissive for IDs, tenant keys, or other domain-specific values.",
            "Branding adds ceremony, so reserve it for boundaries where accidental mix-ups are genuinely costly.",
            "Function compatibility and class instances have structural behavior too, which means the surprises are not limited to object literals.",
          ]}
        />
        <Callout variant="tip">
          Excess property checks are a helpful heuristic around object literals,
          not a separate runtime validation system.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why is structural typing both ergonomic and dangerous?",
              "What are excess property checks actually doing?",
              "When is branding worth the extra ceremony?",
              "Why do classes not automatically make a TypeScript codebase nominally typed?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default StructuralTyping;
