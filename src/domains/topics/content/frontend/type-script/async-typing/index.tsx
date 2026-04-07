import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { asyncTypingLesson } from "./meta";

export function AsyncTyping() {
  return (
    <TopicLessonPage
      title={asyncTypingLesson.title}
      summary={asyncTypingLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={asyncTypingLesson.estimatedReadingTimeMinutes}
      difficulty={asyncTypingLesson.difficulty}
      relatedTopics={[
        { label: "Promises and Async/Await", href: "/topic/promises-async-await" },
        { label: "API Type Design", href: "/topic/typescript-api-type-design" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Async Typing"
          description="Async code is where many TypeScript codebases lose safety at the network boundary. Senior answers model success, failure, cancellation, and stale or partial results explicitly."
        />

        <SectionHeader>Promise&lt;T&gt; Only Describes Fulfillment</SectionHeader>
        <CodeBlock
          language="typescript"
          code={`type User = { id: string; email: string };

async function getUser(userId: string): Promise<User> {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
}`}
        />
        <Paragraph>
          A <code>Promise&lt;User&gt;</code> annotation only describes the
          fulfilled value. It does not prove the transport succeeded, the JSON
          matched the shape, or the business operation was valid.
        </Paragraph>

        <SectionHeader>Model Success, Failure, and Partial Outcomes</SectionHeader>
        <CollapsibleSection title="Result-union style async contract" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`type AsyncResult<T, E extends string = string> =
  | { ok: true; data: T }
  | { ok: false; error: E };

async function loadSettings(): Promise<
  AsyncResult<{ theme: string }, "network" | "invalid-payload">
> {
  try {
    return { ok: true, data: { theme: "dark" } };
  } catch {
    return { ok: false, error: "network" };
  }
}`}
          />
        </CollapsibleSection>
        <ComparisonTable
          columns={[
            { key: "strength", label: "Strength" },
            { key: "cost", label: "Cost or tradeoff" },
          ]}
          rows={[
            {
              label: "Thrown exceptions",
              values: {
                strength: "Works well for truly exceptional failures and integrates with existing try/catch flows.",
                cost: "Expected business failures become harder to discover from the function signature.",
              },
            },
            {
              label: "Result unions",
              values: {
                strength: "Makes expected failure paths explicit for callers.",
                cost: "Call sites must handle the union deliberately instead of assuming happy-path data.",
              },
            },
          ]}
        />

        <SectionHeader>Cancellation, Concurrency, and Mutation Flows</SectionHeader>
        <BulletList
          items={[
            "If filters, route params, or user identity can change quickly, async typing should pair with cancellation or stale-result ownership logic.",
            "Concurrent workflows often need `Promise.all`, `allSettled`, or typed aggregation of partial failures rather than one vague `Promise<any[]>`.",
            "Mutation flows deserve explicit result typing too, because optimistic UI and rollback logic depend on predictable outcomes.",
            "A typed `response.json()` is still only a promise about developer intent until runtime validation confirms the payload.",
          ]}
        />
        <Callout variant="tip">
          Senior answers distinguish transport success, business success,
          runtime validation, and freshness. Those are separate concerns.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When would you return a result union instead of throwing?",
              "What does `Promise<T>` fail to tell you about a remote API call?",
              "How do you model partial failures when several async requests run together?",
              "Why do mutation flows need just as much type care as read flows?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AsyncTyping;
