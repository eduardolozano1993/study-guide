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
import { reactRenderingBehaviorLesson } from "./meta";

export function ReactRenderingBehavior() {
  return (
    <TopicLessonPage
      title={reactRenderingBehaviorLesson.title}
      summary={reactRenderingBehaviorLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactRenderingBehaviorLesson.estimatedReadingTimeMinutes}
      difficulty={reactRenderingBehaviorLesson.difficulty}
      relatedTopics={[
        { label: "React Fundamentals", href: "/topic/react-fundamentals" },
        { label: "Performance", href: "/topic/react-performance" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="B"
          title="Rendering Behavior"
          description="This topic separates strong candidates from average ones because it forces clear thinking about render purity, commit timing, bailouts, stale closures, dependency arrays, and concurrency-era debugging."
        />

        <SectionHeader>Render, Commit, and Interrupted Work</SectionHeader>
        <Paragraph>
          Render is the calculation phase. React calls components to decide what
          the next UI should look like. Commit is the mutation phase where React
          applies DOM changes, updates refs, and runs effects.
        </Paragraph>
        <Paragraph>
          That distinction matters because render must stay pure. React can
          start a render, pause it, throw it away, or re-run it before anything
          visible changes on the screen.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "meaning", label: "What happens" },
            { key: "failure", label: "What breaks if you misunderstand it" },
          ]}
          rows={[
            {
              label: "Render",
              values: {
                meaning: "Compute the next tree from props, state, and context.",
                failure: "Impure work creates duplicated requests, mutations, or hard-to-reproduce bugs.",
              },
            },
            {
              label: "Commit",
              values: {
                meaning: "Apply DOM changes and run effects for committed work.",
                failure: "You assume every render reached the screen, so debugging becomes misleading.",
              },
            },
            {
              label: "Paint",
              values: {
                meaning: "The browser renders committed DOM changes to pixels.",
                failure: "You blame React for jank that is really layout, paint, or main-thread cost.",
              },
            },
          ]}
        />
        <Callout variant="warning">
          Purity in render is not stylistic advice. React depends on being able
          to call components multiple times safely.
        </Callout>

        <SectionHeader>Batching, Bailouts, and Stale Closures</SectionHeader>
        <Paragraph>
          React batches multiple state updates in the same turn so it can render
          once with the final result. Bailouts happen when React decides the
          visible output does not need more work, often using `Object.is`
          equality for state updates and prop comparisons.
        </Paragraph>
        <Paragraph>
          Stale closures are a JavaScript problem that becomes visible in React
          when callbacks capture values from an older render. Strong answers
          connect the bug to closure semantics, not to React "forgetting" the
          latest state.
        </Paragraph>
        <CollapsibleSection title="Functional updates avoid stale state math" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`function Counter() {
  const [count, setCount] = useState(0);

  function handleDoubleIncrement() {
    setCount((value) => value + 1);
    setCount((value) => value + 1);
  }

  return <button onClick={handleDoubleIncrement}>{count}</button>;
}`}
          />
        </CollapsibleSection>
        <BulletList
          items={[
            "State updates to the same value can bail out, but React may still call your component before deciding no visible commit is needed.",
            "Transitions change scheduling priority, which can improve perceived responsiveness without changing the correctness rules.",
            "A callback that reads stale props or state usually needs a dependency fix, a functional update, or a different event/data-flow design.",
          ]}
        />

        <SectionHeader>Dependency Arrays Describe Dataflow</SectionHeader>
        <Paragraph>
          Dependency arrays are declarations of which reactive values an effect
          or memoized computation reads. They are not frequency knobs.
        </Paragraph>
        <Paragraph>
          If an effect becomes too broad after adding all dependencies, that is
          usually a design smell. The fix is often splitting the effect,
          deriving values during render, or moving work into an event handler
          instead of suppressing the linter.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "healthy", label: "Healthy reasoning" },
            { key: "weak", label: "Weak reasoning" },
          ]}
          rows={[
            {
              label: "Effects",
              values: {
                healthy: "List all reactive inputs, then refactor the effect if it is doing too much.",
                weak: "Leave dependencies out so it only runs once while still reading changing values.",
              },
            },
            {
              label: "Memoization",
              values: {
                healthy: "Use it when profiling shows expensive downstream work or unstable identities matter.",
                weak: "Wrap everything because re-render sounds bad in the abstract.",
              },
            },
          ]}
        />

        <SectionHeader>How to Debug Unexpected Renders</SectionHeader>
        <BulletList
          items={[
            "Use React DevTools Profiler to see which components rendered, how long they took, and what interaction triggered them.",
            "Check whether the issue is render cost, commit cost, or browser rendering cost before reaching for memoization.",
            "When Strict Mode shows duplicate development behavior, ask whether the code is impure rather than assuming React is broken.",
            "Trace identity changes first: props, context values, inline objects, and recreated callbacks often explain the re-render path.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why can React render a component without committing it?",
              "What is the difference between batching and memoization?",
              "Why is a stale closure bug usually a JavaScript problem expressed through React?",
              "When would a dependency array warning indicate a design issue instead of a linting annoyance?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactRenderingBehavior;
