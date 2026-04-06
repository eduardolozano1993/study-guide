import {
  BulletList,
  CodeBlock,
  CollapsibleSection,
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
          description="Senior TypeScript work is often contract design work: what crosses boundaries, what gets validated, and what shape the rest of the app should trust."
        />

        <SectionHeader>Transport vs Domain</SectionHeader>
        <Paragraph>
          A response DTO from a backend is not always the right shape for the
          rest of the frontend. Mapping transport data into domain models can
          isolate change and centralize normalization.
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

        <CollapsibleSection title="Explicit result contracts">
          <CodeBlock
            language="typescript"
            code={`type SaveUserResult =
  | { ok: true; userId: string }
  | { ok: false; code: "duplicate-email" | "invalid-input" };`}
          />
          <Paragraph>
            Result unions make predictable outcomes part of the contract instead
            of pushing everything into implicit exceptions.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Interview pitfalls">
          <BulletList
            items={[
              "Reusing one giant type for transport, persistence, and UI state.",
              "Trusting backend payloads without validation.",
              "Hiding the real contract behind generic wrappers nobody can interpret.",
              "Encoding domain rules only in comments instead of types and runtime checks.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ApiTypeDesign;
