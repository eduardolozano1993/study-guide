import {
  BulletList,
  CodeBlock,
  Paragraph,
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

        <Paragraph>
          Real-world safety comes from combining strong models, runtime
          validation, and clear boundaries between components and services.
        </Paragraph>
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

        <BulletList
          items={[
            "Use discriminated unions to model real component modes.",
            "Validate data at the process boundary and keep the unsafe edge small.",
            "Share contracts only when frontend and backend truly share semantics.",
            "Prefer local mapping layers when transport and UI needs are different.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default TypeSafePatternsInRealCode;
