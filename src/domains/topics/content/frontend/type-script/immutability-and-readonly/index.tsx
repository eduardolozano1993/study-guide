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
          description="Readonly is partly about safety and partly about communicating ownership. That matters a lot in reducer state, discriminated unions, and public API boundaries."
        />

        <SectionHeader>Compile-Time Immutability vs Runtime Reality</SectionHeader>
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
          <code>readonly</code>, readonly arrays, and <code>as const</code>
          preserve intent at compile time. They do not deep-freeze runtime
          values unless you add an actual runtime mechanism.
        </Paragraph>

        <SectionHeader>Shallow, Deep, and Practical Tradeoffs</SectionHeader>
        <BulletList
          items={[
            "Plain `readonly` on object properties is shallow. Nested objects can still be mutable unless your type models deeper restrictions too.",
            "Readonly arrays are useful when callers should consume data without owning mutation rights.",
            "`as const` is especially valuable for discriminated unions because it preserves exact literal values.",
            "Too much readonly typing can make legitimate update flows painful and push teams toward unsafe casts just to get work done.",
          ]}
        />

        <CollapsibleSection title="Why readonly helps reducers and unions">
          <Paragraph>
            Immutable state modeling improves change reasoning, reducer safety,
            and exhaustiveness. It also communicates that consumers should treat
            the value as an input, not a mutable workspace.
          </Paragraph>
        </CollapsibleSection>
        <Callout variant="warning">
          Readonly is a strong communication tool, but it is not a magic runtime
          guarantee. Do not oversell it.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What is the difference between shallow readonly and deep immutability?",
              "Why is `as const` useful for discriminated unions?",
              "When can excessive readonly typing hurt developer ergonomics?",
              "Why does compile-time immutability not freeze runtime values?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ImmutabilityAndReadonly;
