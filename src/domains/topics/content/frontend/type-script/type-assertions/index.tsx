import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { typeAssertionsLesson } from "./meta";

export function TypeAssertions() {
  return (
    <TopicLessonPage
      title={typeAssertionsLesson.title}
      summary={typeAssertionsLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={typeAssertionsLesson.estimatedReadingTimeMinutes}
      difficulty={typeAssertionsLesson.difficulty}
      relatedTopics={[
        { label: "Type Narrowing", href: "/topic/typescript-type-narrowing" },
        { label: "Runtime vs Compile Time", href: "/topic/typescript-runtime-vs-compile-time" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Type Assertions and Casting"
          description="Assertions are escape hatches. A senior answer should explain why they are sometimes needed and why they are dangerous."
        />

        <Paragraph>
          A type assertion tells the compiler to trust you more than it trusts
          inference. It does not change the runtime value.
        </Paragraph>

        <CollapsibleSection title="Safer than blind casting" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`const element = document.getElementById("email-input");

if (!(element instanceof HTMLInputElement)) {
  throw new Error("Email input not found");
}

element.focus();`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Non-null assertion">
          <CodeBlock
            language="typescript"
            code={`const root = document.getElementById("root");
root!.classList.add("hydrated");`}
          />
          <Callout variant="warning">
            If the assertion is wrong, the problem moves from compile time to
            runtime.
          </Callout>
        </CollapsibleSection>

        <BulletList
          items={[
            "Prefer guards and narrowing when you can express the check at runtime.",
            "Use unknown at boundaries, then validate before asserting.",
            "Isolate unsafe interop inside a small wrapper.",
            "Treat double assertions as a sign the design may need work.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default TypeAssertions;
