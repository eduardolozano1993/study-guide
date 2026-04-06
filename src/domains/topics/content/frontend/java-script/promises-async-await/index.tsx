import {
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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Thinking `await` makes code synchronous overall.</li>
            <li>Forgetting that async functions always return promises.</li>
            <li>Running independent requests sequentially without reason.</li>
            <li>Assuming rejected promises behave exactly like thrown sync errors in every context.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default PromisesAsyncAwait;
