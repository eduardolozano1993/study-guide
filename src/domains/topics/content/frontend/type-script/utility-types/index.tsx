import {
  BulletList,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
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
          description="Utility types matter because they help derive new shapes from a source model instead of rewriting the same contract repeatedly."
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
            <code>Partial</code>, <code>Required</code>, <code>Pick</code>,{" "}
            <code>Omit</code>, and <code>Record</code> appear constantly in real
            code because they match normal product needs.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Union and function helpers">
          <CodeBlock
            language="typescript"
            code={`type EventName = "click" | "focus" | "blur";
type NonFocusEvent = Exclude<EventName, "focus">;

function createSession(email: string, remember: boolean) {
  return { token: "abc", remember };
}

type CreateSessionArgs = Parameters<typeof createSession>;
type CreateSessionResult = ReturnType<typeof createSession>;`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interview pitfalls">
          <BulletList
            items={[
              "Assuming Partial enforces valid business updates.",
              "Forgetting that most built-in utilities are shallow.",
              "Stacking so many utility types together that the result is unreadable.",
              "Duplicating function arg and return types instead of deriving them.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default UtilityTypes;
