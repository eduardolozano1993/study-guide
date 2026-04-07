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
          description="Assertions are escape hatches. Senior answers explain when they are justified, how to confine them, and which safer alternatives should come first."
        />

        <SectionHeader>What an Assertion Really Does</SectionHeader>
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

        <SectionHeader>Risky Assertion Forms</SectionHeader>
        <CodeBlock
          language="typescript"
          code={`const root = document.getElementById("root");
root!.classList.add("hydrated");`}
        />
        <BulletList
          items={[
            "`as` can be a pragmatic interop tool, but it is still trust without proof.",
            "Non-null assertions move uncertainty from compile time to runtime and are easy to overuse.",
            "Definite assignment assertions can hide lifecycle or initialization design problems.",
            "Double assertions are often a sign the design or boundary needs real validation instead.",
          ]}
        />
        <Callout variant="warning">
          If the assertion is wrong, the problem did not disappear. It simply
          moved from compile time to runtime.
        </Callout>

        <SectionHeader>Preferred Alternatives</SectionHeader>
        <BulletList
          items={[
            "Prefer guards and narrowing when you can express the check at runtime.",
            "Use `unknown` at boundaries, then validate or parse before asserting.",
            "Wrap unsafe interop inside a small helper so the rest of the codebase stays honest.",
            "Use assertion functions when you truly can prove a condition at runtime and want to expose that fact to the type system.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default TypeAssertions;
