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
          description="Advanced types are valuable when they encode a stable rule in a public contract. They become harmful when they turn the type system into a puzzle the team cannot debug."
        />

        <SectionHeader>Use Advanced Types to Preserve Relationships</SectionHeader>
        <Paragraph>
          The real value of mapped types, conditional types, <code>infer</code>,
          and template-literal types is preserving relationships between inputs
          and outputs without rewriting the same contract repeatedly.
        </Paragraph>
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

        <SectionHeader>Conditional Types, infer, and Template Literals</SectionHeader>
        <CollapsibleSection title="Common advanced tools" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type EventKey<T extends string> = \`on\${Capitalize<T>}\`;

type UserLoadedEvent = EventKey<"loaded">;`}
          />
        </CollapsibleSection>
        <ComparisonTable
          columns={[
            { key: "useful", label: "Useful use" },
            { key: "risky", label: "Risky use" },
          ]}
          rows={[
            {
              label: "Distributive conditional types",
              values: {
                useful: "Transforming union members in a contract-aware way.",
                risky: "Building deeply nested helpers nobody can mentally expand.",
              },
            },
            {
              label: "infer",
              values: {
                useful: "Extracting return, payload, or event types from a known shape.",
                risky: "Hiding the public API behind layers of opaque type algebra.",
              },
            },
            {
              label: "Template-literal types",
              values: {
                useful: "Modeling naming conventions or event maps.",
                risky: "Encoding brittle string puzzles instead of simple validated values.",
              },
            },
          ]}
        />

        <SectionHeader>Debugging and Maintainability</SectionHeader>
        <BulletList
          items={[
            "Name intermediate aliases so editor errors show human-sized concepts instead of one giant expression.",
            "If a mapped or conditional type takes several minutes to explain, question whether the API should be simpler.",
            "Prefer a slightly duplicated but obvious type over a maximally clever helper that slows down every future reader.",
            "Advanced types should make call sites safer or clearer. If they only impress the author, they are not pulling their weight.",
          ]}
        />
        <Callout variant="warning">
          The interview differentiator is not knowing the syntax. It is knowing
          when advanced typing genuinely improves an API and when it is too
          clever for application code.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What makes conditional types distributive over unions?",
              "When would you use `infer` instead of repeating a known type manually?",
              "How do you simplify unreadable advanced-type errors for a team?",
              "When does a template-literal type improve an API, and when is a plain string plus validation enough?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AdvancedTypes;
