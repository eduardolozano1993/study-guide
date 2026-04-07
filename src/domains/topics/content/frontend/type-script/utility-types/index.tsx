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
import { utilityTypesLesson } from "./meta";

export function UtilityTypes() {
  return (
    <TopicLessonPage
      title={utilityTypesLesson.title}
      summary={utilityTypesLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={utilityTypesLesson.estimatedReadingTimeMinutes}
      difficulty={utilityTypesLesson.difficulty}
      relatedTopics={[
        { label: "Generics", href: "/topic/typescript-generics" },
        { label: "Immutability and Readonly", href: "/topic/typescript-immutability-and-readonly" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Utility Types"
          description="Utility types matter because they let you derive shapes from a source model instead of rewriting the same contract repeatedly. The senior question is when that derivation clarifies intent and when it weakens it."
        />

        <CollapsibleSection title="Object shaping helpers" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`type User = {
  id: string;
  email: string;
  isAdmin: boolean;
};

type UserPatch = Partial<User>;
type PublicUser = Pick<User, "id" | "email">;
type RoleMap = Record<string, "reader" | "editor" | "owner">;`}
          />
          <Paragraph>
            <code>Partial</code>, <code>Required</code>, <code>Pick</code>,
            <code>Omit</code>, and <code>Record</code> appear constantly because
            they match everyday product needs.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Function and Async Helpers</SectionHeader>
        <CodeBlock
          language="typescript"
          code={`type EventName = "click" | "focus" | "blur";
type NonFocusEvent = Exclude<EventName, "focus">;

function createSession(email: string, remember: boolean) {
  return { token: "abc", remember };
}

type CreateSessionArgs = Parameters<typeof createSession>;
type CreateSessionResult = ReturnType<typeof createSession>;
type CreateSessionValue = Awaited<Promise<CreateSessionResult>>;`}
        />

        <SectionHeader>Judgment and Failure Modes</SectionHeader>
        <BulletList
          items={[
            "Most built-in utilities are shallow. They do not automatically preserve deep business invariants.",
            "`Partial` is convenient for patches, but it can also weaken rules if a domain object should never exist half-filled.",
            "`Pick` and `Omit` can create accidental coupling when downstream types track every upstream shape change automatically.",
            "Sometimes a bespoke type communicates intent better than stacking several utility helpers together.",
          ]}
        />
        <Callout variant="warning">
          A utility type is not automatically the clearest type. Derivation is
          useful when it preserves meaning, not when it hides the contract.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default UtilityTypes;
