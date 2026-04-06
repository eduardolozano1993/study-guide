import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
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
          description="Async code is where many TypeScript codebases lose safety at the network boundary unless success and failure are modeled deliberately."
        />

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
          fulfilled value. It does not prove the remote payload actually matches
          that shape at runtime.
        </Paragraph>

        <CollapsibleSection title="Modeling success and failure">
          <CodeBlock
            language="typescript"
            code={`type AsyncResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

async function loadSettings(): Promise<AsyncResult<{ theme: string }>> {
  try {
    return { ok: true, data: { theme: "dark" } };
  } catch {
    return { ok: false, error: "Could not load settings" };
  }
}`}
          />
        </CollapsibleSection>

        <Callout variant="tip">
          Senior answers distinguish transport success, business success, and
          runtime validation. Those are three different concerns.
        </Callout>

        <BulletList
          items={[
            "Do not assume response.json validates anything.",
            "Be clear about whether your team throws errors or returns result unions.",
            "Validate untrusted payloads before treating them as domain data.",
            "Remember Promise<T> only models the fulfilled value.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default AsyncTyping;
