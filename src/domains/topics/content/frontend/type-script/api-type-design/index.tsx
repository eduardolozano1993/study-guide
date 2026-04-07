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
import { apiTypeDesignLesson } from "./meta";

export function ApiTypeDesign() {
  return (
    <TopicLessonPage
      title={apiTypeDesignLesson.title}
      summary={apiTypeDesignLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={apiTypeDesignLesson.estimatedReadingTimeMinutes}
      difficulty={apiTypeDesignLesson.difficulty}
      relatedTopics={[
        { label: "Async Typing", href: "/topic/typescript-async-typing" },
        { label: "Type-Safe Patterns in Real Code", href: "/topic/typescript-type-safe-patterns-in-real-code" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="API Type Design"
          description="Senior TypeScript work is often contract-design work: what crosses the boundary, what gets validated, when transport types become domain types, and how much coupling shared contracts should create."
        />

        <SectionHeader>Transport Types Are Not Domain Models</SectionHeader>
        <Paragraph>
          A response DTO from a backend is often not the right shape for the
          rest of the frontend. Mapping transport data into domain models can
          isolate naming drift, parsing, and normalization in one place.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`type UserDto = {
  id: string;
  created_at: string;
};

type User = {
  id: string;
  createdAt: Date;
};

function toUser(dto: UserDto): User {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at),
  };
}`}
        />

        <SectionHeader>Result Contracts, Validation, and Versioning</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "strength", label: "What it gives you" },
            { key: "risk", label: "What goes wrong without it" },
          ]}
          rows={[
            {
              label: "Runtime validation",
              values: {
                strength: "Protects typed code from untrusted payloads and drifting APIs.",
                risk: "A generated or shared type gives false confidence while bad data still flows in.",
              },
            },
            {
              label: "Result unions",
              values: {
                strength: "Make expected failure modes explicit for callers.",
                risk: "Everything collapses into thrown exceptions or vague `null` handling.",
              },
            },
            {
              label: "Anti-corruption mapping layer",
              values: {
                strength: "Keeps backend churn from leaking into every component.",
                risk: "Transport concerns infect UI code and make migrations costly.",
              },
            },
          ]}
        />
        <CollapsibleSection title="Explicit result contracts" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`type SaveUserResult =
  | { ok: true; userId: string }
  | { ok: false; code: "duplicate-email" | "invalid-input" };`}
          />
        </CollapsibleSection>

        <SectionHeader>Shared Types vs Local Boundaries</SectionHeader>
        <BulletList
          items={[
            "Sharing types across frontend and backend can reduce drift when the contract is stable and both sides truly share ownership.",
            "Generated types are valuable, but they still describe transport shape, not automatically trustworthy business meaning.",
            "Local domain models are often worth the extra mapping layer when the frontend needs parsed dates, richer unions, or UI-specific invariants.",
            "Versioning pressure is a sign to think about anti-corruption layers, not to keep stretching one giant shared type forever.",
          ]}
        />
        <Callout variant="warning">
          <code>get&lt;User&gt;()</code> tells TypeScript what you expect. It does
          not prove the server actually returned a valid <code>User</code>.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When should a frontend keep DTOs separate from domain models?",
              "Why might result unions be better than throwing for common business failures?",
              "When do shared types help, and when do they create the wrong kind of coupling?",
              "How do you make typed APIs safer when the backend can still drift at runtime?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ApiTypeDesign;
