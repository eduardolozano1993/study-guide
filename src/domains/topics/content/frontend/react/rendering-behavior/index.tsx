import {
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
          description="This topic separates strong candidates from average ones because it forces clear thinking about render, commit, batching, closures, dependency arrays, and memoization tradeoffs."
        />

        <SectionHeader>Render vs Commit</SectionHeader>
        <Paragraph>
          Render is the calculation phase. React calls components to compute the
          next tree. Commit is the mutation phase where React applies DOM
          changes and runs effects.
        </Paragraph>
        <Paragraph>
          That distinction matters because render logic must stay pure. React
          may render speculatively, more than once, or abandon work before
          commit.
        </Paragraph>
        <Callout variant="warning">
          Purity in render is not style guidance. React depends on being able to
          call components multiple times safely.
        </Callout>

        <SectionHeader>Batching and Stale Closures</SectionHeader>
        <Paragraph>
          React batches state updates to avoid extra work. Multiple updates in
          the same event are grouped before the next render commits.
        </Paragraph>
        <Paragraph>
          Stale closures happen when a callback captures values from an older
          render. The issue is JavaScript closure behavior surfacing inside
          React, not React forgetting to update a variable.
        </Paragraph>
        <CollapsibleSection title="Functional updates prevent stale state math" collapsible={false}>
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

        <SectionHeader>Dependency Arrays and Memoization Tradeoffs</SectionHeader>
        <Paragraph>
          Dependency arrays declare which reactive values an effect or memoized
          computation depends on. They are not knobs for controlling frequency.
        </Paragraph>
        <Paragraph>
          Memoization is not free. `React.memo`, `useMemo`, and `useCallback`
          add comparison and retention costs. Use them when they eliminate real
          downstream work.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "good", label: "Healthy reasoning" },
            { key: "bad", label: "Weak reasoning" },
          ]}
          rows={[
            {
              label: "Dependency arrays",
              values: {
                good: "Declare all reactive inputs, then refactor if the effect became too broad.",
                bad: "Leave dependencies out to run only once while still reading changing values.",
              },
            },
            {
              label: "Memoization",
              values: {
                good: "Use it when profiling or a clear cost model shows expensive downstream work.",
                bad: "Wrap everything because re-render sounds bad in the abstract.",
              },
            },
          ]}
        />
        <CollapsibleSection title="Interview mistakes to avoid">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Claiming every re-render is a bug.</li>
            <li>Treating exhaustive-deps warnings as optional style advice.</li>
            <li>Explaining stale closures only as a React issue instead of a closure issue.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactRenderingBehavior;
