import {
  BulletList,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { typeSafePatternsInRealCodeLesson } from "./meta";

export function TypeSafePatternsInRealCode() {
  return (
    <TopicLessonPage
      title={typeSafePatternsInRealCodeLesson.title}
      summary={typeSafePatternsInRealCodeLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={typeSafePatternsInRealCodeLesson.estimatedReadingTimeMinutes}
      difficulty={typeSafePatternsInRealCodeLesson.difficulty}
      relatedTopics={[
        { label: "API Type Design", href: "/topic/typescript-api-type-design" },
        { label: "React Component Design", href: "/topic/react-component-design" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Type-Safe Patterns in Real Code"
          description="The senior interview version of TypeScript is scenario-based: can you model real UI and service constraints without creating a brittle type maze?"
        />

        <SectionHeader>Model Impossible States Out of the UI</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`type ButtonProps =
  | { kind: "link"; href: string; onClick?: never }
  | { kind: "action"; onClick: () => void; href?: never };

function Button(props: ButtonProps) {
  return props.kind === "link" ? (
    <a href={props.href}>Open</a>
  ) : (
    <button onClick={props.onClick}>Run</button>
  );
}`}
        />
        <Paragraph>
          Discriminated unions work best when they remove impossible prop
          combinations and make the render logic line up with real product
          modes.
        </Paragraph>

        <SectionHeader>Boundary Validation, Mapping, and Locality</SectionHeader>
        <BulletList
          items={[
            "Validate data at the process boundary so the rest of the app can operate on trusted domain types.",
            "Use mapping layers when generated types or DTOs do not match the semantics the UI actually needs.",
            "Share contracts across layers only when the meaning is truly shared, not just because the field names happen to match today.",
            "Prefer locality when a type is tightly bound to one feature’s UI logic; over-sharing can create accidental coupling.",
          ]}
        />

        <SectionHeader>Production-Style Flow</SectionHeader>
        <Paragraph>
          A realistic type-safe flow often looks like this: parse unknown input,
          validate it, map it into a domain shape, narrow it into specific UI
          states, and render from a discriminated union that makes impossible
          states unrepresentable.
        </Paragraph>
      </div>
    </TopicLessonPage>
  );
}

export default TypeSafePatternsInRealCode;
