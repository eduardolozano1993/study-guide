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
import { promisesAsyncAwaitLesson } from "./meta";

export function PromisesAsyncAwait() {
  return (
    <TopicLessonPage
      title={promisesAsyncAwaitLesson.title}
      summary={promisesAsyncAwaitLesson.summary}
      eyebrow="Frontend / JavaScript"
      estimatedReadingTimeMinutes={promisesAsyncAwaitLesson.estimatedReadingTimeMinutes}
      difficulty={promisesAsyncAwaitLesson.difficulty}
      relatedTopics={[
        { label: "Error Handling in JavaScript", href: "/topic/error-handling-javascript" },
        { label: "Closures", href: "/topic/closures" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="J"
          title="Promises and Async/Await"
          description="Promises model future results. Async/await makes promise code easier to read, but it does not change the underlying asynchronous control flow."
        />

        <CollapsibleSection title="Promise States and Chaining" collapsible={false}>
          <Paragraph>
            A promise starts pending, then settles as fulfilled or rejected.
            `then`, `catch`, and `finally` let you compose dependent async
            steps while preserving a single flow of values or errors.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`fetch("/api/user")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load user");
    }

    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });`}
          />
        </CollapsibleSection>

        <SectionHeader>Async/Await</SectionHeader>

        <CollapsibleSection title="What Async/Await Changes" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`async function loadUser() {
  try {
    const response = await fetch("/api/user");

    if (!response.ok) {
      throw new Error("Failed to load user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}`}
          />
          <Paragraph>
            `await` pauses within the async function until the promise settles,
            but the async function itself still returns a promise.
          </Paragraph>
          <Callout variant="tip">
            Async/await is syntax over promises, not a different async model.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Sequential vs Parallel Work" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const [user, settings] = await Promise.all([
  fetch("/api/user").then((r) => r.json()),
  fetch("/api/settings").then((r) => r.json()),
]);`}
          />
          <Paragraph>
            If operations are independent, `Promise.all` is usually better than
            awaiting each one sequentially. Sequential `await` is only correct
            when one result depends on another.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="`Promise.all` vs `Promise.allSettled`" collapsible={false}>
          <BulletList
            items={[
              "`Promise.all` is usually right when every result is required and any failure should fail the whole operation.",
              "`Promise.allSettled` is better when partial success still has value or when you need to inspect all outcomes.",
              "More concurrency can improve latency, but it can also make cleanup, retries, and error attribution harder to reason about.",
            ]}
          />
        </CollapsibleSection>

        <SectionHeader>Lifecycle Control and Event Loop Reality</SectionHeader>

        <CollapsibleSection title="Cancellation and Timeouts Need Explicit Design" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const controller = new AbortController();

const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch("/api/search?q=closures", {
    signal: controller.signal,
  });

  return await response.json();
} finally {
  clearTimeout(timeoutId);
}`}
          />
          <Paragraph>
            `await` improves readability, but it does not cancel work or impose
            timeouts. UI code still needs lifecycle control so requests do not
            outlive the screen, overwrite newer results, or hang forever.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Microtasks Do Not Make CPU Work Free" collapsible={false}>
          <Paragraph>
            Promise callbacks and `await` continuations run in the microtask
            queue. They still execute on the main thread. If the code after an
            `await` does heavy parsing or computation, the UI can still become
            unresponsive even though the I/O was asynchronous.
          </Paragraph>
          <Callout variant="warning">
            Async syntax solves waiting on future values. It does not solve
            CPU-bound work or guarantee a render between every step.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When should independent work run sequentially, and when should it run in parallel?",
              "What tradeoff changes the answer between `Promise.all` and `Promise.allSettled`?",
              "Why does `await` not solve cancellation or timeout control by itself?",
              "How can async code still hurt responsiveness if the heavy work is CPU-bound?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Thinking `await` makes code synchronous overall.",
              "Forgetting that async functions always return promises.",
              "Running independent requests sequentially without reason.",
              "Assuming rejected promises behave exactly like thrown sync errors in every context.",
              "Assuming async syntax prevents stale results, leaks, or blocked rendering automatically.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default PromisesAsyncAwait;
