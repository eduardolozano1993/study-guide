import {
  Callout,
  CodeBlock,
  CollapsibleSection,
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
          description="This topic is about discipline: knowing when useEffect is the correct synchronization tool and when it is masking a flawed data flow."
        />

        <SectionHeader>When useEffect Is Appropriate</SectionHeader>
        <Paragraph>
          Use `useEffect` when the component needs to synchronize with something
          outside React: browser APIs, subscriptions, timers, network requests,
          imperative libraries, or manually managed DOM state.
        </Paragraph>
        <Paragraph>
          Do not use `useEffect` to compute values that can be derived during
          render. If one piece of state can be calculated from props or other
          state, derive it instead of storing a second synchronized copy.
        </Paragraph>
        <Callout variant="tip">
          If removing the effect only changes rendering logic and not
          interaction with an external system, the effect may be unnecessary.
        </Callout>

        <SectionHeader>Cleanup, Race Conditions, and Request Cancellation</SectionHeader>
        <Paragraph>
          Effects can outlive the render that created them. Cleanup is how you
          unsubscribe, cancel timers, or abort work that should not complete
          after dependencies change or the component unmounts.
        </Paragraph>
        <Paragraph>
          Race conditions happen when async requests finish out of order. The
          latest render should win.
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

        <SectionHeader>Derived State Anti-Patterns</SectionHeader>
        <Paragraph>
          One of the most common mistakes is keeping duplicated state
          synchronized through effects, such as storing `filteredItems` in state
          and recalculating it in an effect whenever inputs change.
        </Paragraph>
        <Paragraph>
          Prefer deriving those values during render or memoizing only if the
          computation is meaningfully expensive.
        </Paragraph>
        <CollapsibleSection title="Interview pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using effects to respond to every internal state change instead of improving the component design.</li>
            <li>Forgetting cleanup for subscriptions, observers, sockets, or timers.</li>
            <li>Suppressing exhaustive-deps instead of fixing the dependency problem.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactEffectsAndSideEffects;
