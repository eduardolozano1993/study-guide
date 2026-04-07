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

        <CollapsibleSection title="Custom Errors and Error Taxonomy" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

class HttpError extends Error {
  constructor(message, status, options = {}) {
    super(message, options);
    this.name = "HttpError";
    this.status = status;
  }
}`}
          />
          <Paragraph>
            Senior answers separate error categories such as validation,
            network, authorization, and unexpected programmer mistakes. The
            point is not class hierarchies for their own sake. It is deciding
            which failures are recoverable, retryable, user-facing, or worth
            alerting on.
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

        <SectionHeader>Concurrency and Operational Judgment</SectionHeader>

        <CollapsibleSection title="`Promise.all` vs `Promise.allSettled`" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const results = await Promise.allSettled([
  fetchUser(),
  fetchPermissions(),
  fetchRecommendations(),
]);`}
          />
          <BulletList
            items={[
              "`Promise.all` rejects early when any member rejects, which is usually correct when all results are required together.",
              "`Promise.allSettled` is better when partial success still has product value or you need a complete failure report.",
              "Unhandled rejections happen when promise failures are created but never observed by `await`, `.catch`, or a returned chain.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="What to Retry, Surface, Log, or Rethrow" collapsible={false}>
          <BulletList
            items={[
              "Retry transient failures like timeouts or flaky network calls, but not obviously invalid requests.",
              "Surface actionable user feedback for recoverable product failures such as validation or authorization issues.",
              "Log enough context to debug the incident, but keep the original error as `cause` so stack information survives.",
              "Rethrow when the current layer cannot make a real recovery decision.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When would you create a custom error class instead of throwing a plain `Error`?",
              "What is the practical difference between `Promise.all` and `Promise.allSettled`?",
              "Which failures should be retried automatically, and which should not?",
              "What should be logged locally, what should be shown to users, and what should be rethrown to a higher boundary?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Using `try/catch` everywhere without deciding where an error should actually be handled.",
              "Catching an error only to return `null` and lose the original cause.",
              "Forgetting that promise rejections need explicit handling.",
              "Retrying mutations blindly without thinking about idempotency.",
              "Treating logging as full error handling.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ErrorHandlingJavaScript;
