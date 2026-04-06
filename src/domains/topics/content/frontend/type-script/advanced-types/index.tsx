import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { advancedTypesLesson } from "./meta";

export function AdvancedTypes() {
  return (
    <TopicLessonPage
      title={advancedTypesLesson.title}
      summary={advancedTypesLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={advancedTypesLesson.estimatedReadingTimeMinutes}
      difficulty={advancedTypesLesson.difficulty}
      relatedTopics={[
        { label: "Generics", href: "/topic/typescript-generics" },
        { label: "API Type Design", href: "/topic/typescript-api-type-design" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Advanced Types"
          description="Advanced types are valuable when they encode a stable rule. They become harmful when they turn the type system into a puzzle."
        />

        <CollapsibleSection title="Mapped and indexed access types" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`type ApiUser = {
  id: string;
  email: string;
  lastLoginAt: string | null;
};

type NullableFlags<T> = {
  [K in keyof T]: null extends T[K] ? true : false;
};

type ApiUserNullableFlags = NullableFlags<ApiUser>;
type EmailType = ApiUser["email"];`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Conditional types, infer, and template literals">
          <CodeBlock
            language="typescript"
            code={`type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type EventKey<T extends string> = \`on\${Capitalize<T>}\`;

type UserLoadedEvent = EventKey<"loaded">;`}
          />
          <Paragraph>
            These tools let you compute one type from another, which is powerful
            when the transformation reflects a real domain rule or public API
            contract.
          </Paragraph>
        </CollapsibleSection>

        <Callout variant="warning">
          If you cannot explain an advanced type in one or two sentences, it is
          probably too clever for most application code.
        </Callout>

        <CollapsibleSection title="Interview pitfalls">
          <BulletList
            items={[
              "Using advanced types to impress instead of to simplify a contract.",
              "Forgetting distributive conditional behavior over unions.",
              "Creating unreadable editor errors for the rest of the team.",
              "Applying type-level computation where a plain interface would be clearer.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AdvancedTypes;
