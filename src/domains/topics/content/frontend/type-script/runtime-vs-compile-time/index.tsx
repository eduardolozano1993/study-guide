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
import { runtimeVsCompileTimeLesson } from "./meta";

export function RuntimeVsCompileTime() {
  return (
    <TopicLessonPage
      title={runtimeVsCompileTimeLesson.title}
      summary={runtimeVsCompileTimeLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={runtimeVsCompileTimeLesson.estimatedReadingTimeMinutes}
      difficulty={runtimeVsCompileTimeLesson.difficulty}
      relatedTopics={[
        { label: "Type Assertions and Casting", href: "/topic/typescript-type-assertions" },
        { label: "Async Typing", href: "/topic/typescript-async-typing" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Runtime vs Compile Time"
          description="This is one of the most important senior TypeScript topics because it explains both the power and the limits of the language. Good answers know exactly where types disappear and what must replace them."
        />

        <SectionHeader>Type Erasure Is the Core Fact</SectionHeader>
        <Paragraph>
          TypeScript checks code before execution, but most type information is
          erased from emitted JavaScript. At runtime, only JavaScript values
          remain.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`type User = { id: string };

function logUser(user: User) {
  console.log(user.id);
}

// The emitted JavaScript has no User type.`}
        />

        <SectionHeader>Where Untyped Reality Enters the System</SectionHeader>
        <BulletList
          items={[
            "HTTP payloads, local storage, query params, form data, and browser APIs all cross from runtime uncertainty into typed code.",
            "A cast, annotation, or generated type does not transform the actual runtime value.",
            "Metadata misconceptions are common: interfaces and type aliases do not sit around at runtime waiting to be inspected.",
          ]}
        />

        <CollapsibleSection title="What to do instead" collapsible={false}>
          <Paragraph>
            The safe pattern is: accept uncertainty as <code>unknown</code>,
            validate it with runtime checks or schema libraries, then convert it
            into a trustworthy domain type.
          </Paragraph>
        </CollapsibleSection>
        <Callout variant="warning">
          Type annotations can make developers feel safe while the runtime stays
          completely unconstrained. That false confidence is the real danger.
        </Callout>

        <SectionHeader>Practical Rule</SectionHeader>
        <Paragraph>
          Use TypeScript to protect trusted in-process code. Use validation,
          parsing, and runtime checks at the boundary where untrusted values
          enter. Senior answers always include both halves.
        </Paragraph>
      </div>
    </TopicLessonPage>
  );
}

export default RuntimeVsCompileTime;
