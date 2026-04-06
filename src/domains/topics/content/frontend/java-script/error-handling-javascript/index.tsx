import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { errorHandlingJavaScriptLesson } from "./meta";

export function ErrorHandlingJavaScript() {
  return (
    <TopicLessonPage
      title={errorHandlingJavaScriptLesson.title}
      summary={errorHandlingJavaScriptLesson.summary}
      eyebrow="Frontend / JavaScript"
      estimatedReadingTimeMinutes={errorHandlingJavaScriptLesson.estimatedReadingTimeMinutes}
      difficulty={errorHandlingJavaScriptLesson.difficulty}
      relatedTopics={[
        { label: "Promises and Async/Await", href: "/topic/promises-async-await" },
        { label: "DOM Manipulation Basics", href: "/topic/dom-manipulation-basics" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="J"
          title="Error Handling in JavaScript"
          description="Interviewers want to know whether you understand how errors propagate in sync and async code, and whether your handling preserves useful context."
        />

        <CollapsibleSection title="Synchronous Errors" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`try {
  riskyOperation();
} catch (error) {
  console.error("Operation failed", error);
} finally {
  cleanup();
}`}
          />
          <Paragraph>
            `finally` runs whether the operation succeeds or fails, which makes
            it useful for cleanup rather than branching decisions.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Async Error Flow</SectionHeader>

        <CollapsibleSection title="Thrown Errors vs Rejected Promises" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`async function saveUser() {
  try {
    await api.save();
  } catch (error) {
    throw new Error("Saving user failed", { cause: error });
  }
}`}
          />
          <Paragraph>
            Promise rejections do not get caught by an outer synchronous
            `try/catch` unless you `await` them or return the promise chain and
            handle it there.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Good Error Handling Habits" collapsible={false}>
          <Paragraph>
            Good handling either recovers meaningfully, surfaces a useful user
            experience, or rethrows with better context. Silent failure is
            usually worse than letting the error surface.
          </Paragraph>
          <Callout variant="warning">
            Do not swallow errors silently. Either handle them meaningfully or
            rethrow with context.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using `try/catch` everywhere without deciding where an error should actually be handled.</li>
            <li>Catching an error only to return `null` and lose the original cause.</li>
            <li>Forgetting that promise rejections need explicit handling.</li>
            <li>Treating logging as full error handling.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ErrorHandlingJavaScript;
