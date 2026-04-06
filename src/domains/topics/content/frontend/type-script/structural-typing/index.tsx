import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
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
          description="TypeScript mostly cares about shape, not nominal identity. That is powerful, but it also means assignability deserves careful attention."
        />

        <CollapsibleSection title="Shape-based compatibility" collapsible={false}>
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

        <CollapsibleSection title="Excess property checks">
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
          <Callout variant="tip">
            Excess property checks are a helpful heuristic around object
            literals, not a separate runtime validation system.
          </Callout>
        </CollapsibleSection>

        <BulletList
          items={[
            "Structural compatibility improves ergonomics but can blur domain boundaries.",
            "Use branding or opaque patterns when plain strings become too permissive.",
            "Do not confuse excess property checks with runtime validation.",
            "Do not assume classes make a codebase nominally typed.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default StructuralTyping;
