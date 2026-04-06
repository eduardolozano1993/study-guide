import {
  BulletList,
  Callout,
  CodeBlock,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { immutabilityAndReadonlyLesson } from "./meta";

export function ImmutabilityAndReadonly() {
  return (
    <TopicLessonPage
      title={immutabilityAndReadonlyLesson.title}
      summary={immutabilityAndReadonlyLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={immutabilityAndReadonlyLesson.estimatedReadingTimeMinutes}
      difficulty={immutabilityAndReadonlyLesson.difficulty}
      relatedTopics={[
        { label: "Immutability", href: "/topic/immutability" },
        { label: "Utility Types", href: "/topic/typescript-utility-types" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Immutability and Readonly"
          description="Readonly is partly about safety and partly about communicating ownership. That matters a lot in frontend state and data flow."
        />

        <CodeBlock
          language="typescript"
          code={`type User = {
  readonly id: string;
  readonly roles: readonly string[];
};

const requestState = {
  status: "loading",
  retryable: false,
} as const;`}
        />

        <Paragraph>
          <code>readonly</code> and <code>as const</code> help preserve intent
          and prevent accidental mutation at compile time. They are especially
          useful in state modeling and discriminated unions.
        </Paragraph>

        <Callout variant="warning">
          Readonly is usually a compile-time restriction, not deep runtime
          immutability.
        </Callout>

        <BulletList
          items={[
            "Expose readonly arrays when callers should not own mutation.",
            "Use const assertions when exact literals matter.",
            "Do not oversell Readonly as deep runtime freezing.",
            "Avoid making types so rigid that normal updates become awkward.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default ImmutabilityAndReadonly;
