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
import { reactEffectsLesson } from "./meta";

export function ReactEffectsAndSideEffects() {
  return (
    <TopicLessonPage
      title={reactEffectsLesson.title}
      summary={reactEffectsLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactEffectsLesson.estimatedReadingTimeMinutes}
      difficulty={reactEffectsLesson.difficulty}
      relatedTopics={[
        { label: "Hooks in Depth", href: "/topic/react-hooks-in-depth" },
        { label: "Data Fetching", href: "/topic/react-data-fetching" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="E"
          title="Effects and Side Effects"
          description="Senior React answers explain when an effect is the correct synchronization boundary and when it is masking weak component design, duplicated state, or misplaced work."
        />

        <SectionHeader>Choose the Right Primitive First</SectionHeader>
        <Paragraph>
          `useEffect` is for synchronizing with systems outside React: browser
          APIs, subscriptions, timers, imperative widgets, or network work that
          truly belongs to the client. It is not the default answer for every
          piece of logic that happens after a render.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "better", label: "Better tool" },
            { key: "reason", label: "Why an effect is weaker here" },
          ]}
          rows={[
            {
              label: "Derived value from props or state",
              values: {
                better: "Compute during render or memoize if expensive.",
                reason: "An effect creates duplicated state and synchronization bugs.",
              },
            },
            {
              label: "Response to a user action",
              values: {
                better: "Run logic in the event handler.",
                reason: "The event already tells you when the work should happen.",
              },
            },
            {
              label: "Complex local transitions",
              values: {
                better: "Reducer or clearer state model.",
                reason: "Effects often become patch jobs for state that was modeled poorly.",
              },
            },
            {
              label: "External subscription or DOM integration",
              values: {
                better: "Effect with cleanup.",
                reason: "This is the real synchronization use case.",
              },
            },
          ]}
        />
        <Callout variant="tip">
          If removing the effect only changes internal data flow and not an
          external system, the effect is often unnecessary.
        </Callout>

        <SectionHeader>Lifecycle, Cleanup, and Async Races</SectionHeader>
        <Paragraph>
          Effects can outlive the render that created them. Cleanup exists so
          old subscriptions, timers, and in-flight requests stop affecting the
          current UI after dependencies change or the component unmounts.
        </Paragraph>
        <Paragraph>
          Race conditions appear when slower async work from an older render
          finishes after newer work. The latest render should win, and cleanup
          or request identity checks are how you enforce that.
        </Paragraph>
        <CollapsibleSection title="Cancelable fetch effect" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`useEffect(() => {
  const controller = new AbortController();

  async function loadUser() {
    try {
      const response = await fetch(\`/api/users/\${userId}\`, {
        signal: controller.signal,
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") {
        setError("Failed to load user");
      }
    }
  }

  loadUser();

  return () => controller.abort();
}, [userId]);`}
          />
        </CollapsibleSection>
        <BulletList
          items={[
            "Cleanup is about stale subscriptions and stale async work, not only about avoiding memory leaks in the abstract.",
            "If a request result can arrive after the user changed filters, route, or identity, you need cancellation or result-ownership checks.",
            "Suppressing `exhaustive-deps` usually trades a visible lint warning for an invisible production race.",
          ]}
        />

        <SectionHeader>Strict Mode and Effect Debugging</SectionHeader>
        <Paragraph>
          In development, Strict Mode intentionally re-runs setup and cleanup to
          expose impure effect logic. If an effect breaks under that pressure,
          the code usually depended on accidental one-time behavior.
        </Paragraph>
        <BulletList
          items={[
            "Log setup and cleanup separately so you can see whether the effect is resubscribing too often.",
            "Ask whether the dependency list is complete before blaming React for repeated runs.",
            "When an effect keeps writing state, check whether the state could be derived during render instead.",
            "If the effect is coupling unrelated concerns, split it so each effect tracks one synchronization job.",
          ]}
        />
        <Callout variant="warning">
          The weakest senior answer is `useEffect runs after render so I put side
          logic there`. Stronger answers explain why the work belongs in an
          effect instead of render, a reducer, a ref, or an event handler.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When should data fetching live in an effect, and when should it move to framework loaders or server rendering?",
              "Why is storing derived data in state plus an effect usually a design smell?",
              "How do you prevent stale async work from overwriting newer UI?",
              "What bug does Strict Mode reveal when an effect is not written defensively?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactEffectsAndSideEffects;
