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
import { reactPerformanceLesson } from "./meta";

export function ReactPerformance() {
  return (
    <TopicLessonPage
      title={reactPerformanceLesson.title}
      summary={reactPerformanceLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactPerformanceLesson.estimatedReadingTimeMinutes}
      difficulty={reactPerformanceLesson.difficulty}
      relatedTopics={[
        { label: "Rendering Behavior", href: "/topic/react-rendering-behavior" },
        { label: "Data Fetching", href: "/topic/react-data-fetching" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="P"
          title="Performance"
          description="Strong React performance answers are evidence-based. The goal is not to avoid every render, but to identify the real bottleneck and reduce it without trading correctness for folklore."
        />

        <SectionHeader>Profile Before You Optimize</SectionHeader>
        <Paragraph>
          React DevTools Profiler is the right starting point because it shows
          which components rendered, why they rendered, and how much time they
          consumed. That helps you separate expensive React work from expensive
          browser work.
        </Paragraph>
        <Paragraph>
          A re-render is only a problem when it causes meaningful downstream
          cost such as heavy computation, large subtree commits, layout thrash,
          or repeated network and effect churn.
        </Paragraph>

        <SectionHeader>High-Leverage Performance Tools</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "helps", label: "What it helps" },
            { key: "misuse", label: "Common misuse" },
          ]}
          rows={[
            {
              label: "Better state placement",
              values: {
                helps: "Shrinks the blast radius of updates and removes whole-tree churn.",
                misuse: "Ignoring architecture and trying to memoize around bad state ownership.",
              },
            },
            {
              label: "Virtualization",
              values: {
                helps: "Large lists or tables where DOM count dominates cost.",
                misuse: "Adding complexity when the real issue is slow network or expensive cells.",
              },
            },
            {
              label: "startTransition / useDeferredValue",
              values: {
                helps: "Preserves input responsiveness while lower-priority UI catches up.",
                misuse: "Using transitions to hide expensive work that should be reduced structurally.",
              },
            },
            {
              label: "Memoization",
              values: {
                helps: "Stabilizes expensive child renders or recomputations with a clear cost model.",
                misuse: "Wrapping everything and paying comparison plus retention cost for little gain.",
              },
            },
          ]}
        />
        <CollapsibleSection title="Memoizing an expensive child with a stable prop contract" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`const Chart = React.memo(function Chart({
  points,
}: {
  points: { x: number; y: number }[];
}) {
  return <HeavyChart points={points} />;
});`}
          />
        </CollapsibleSection>

        <SectionHeader>Input Responsiveness vs Throughput</SectionHeader>
        <Paragraph>
          Modern React performance questions often ask how to keep typing,
          dragging, or navigation responsive while heavier UI updates are still
          happening. That is where transitions and deferred values become useful.
        </Paragraph>
        <BulletList
          items={[
            "`startTransition` marks non-urgent updates so urgent input can stay responsive.",
            "`useDeferredValue` lets a slower subtree lag behind a rapidly changing value without blocking the urgent interaction.",
            "These tools change scheduling priority, not correctness requirements. Expensive work still exists and may still need architectural fixes.",
          ]}
        />

        <SectionHeader>How to Debug React Performance</SectionHeader>
        <BulletList
          items={[
            "Use the Profiler flamegraph to find expensive commits before changing code.",
            "Inspect why a component rendered: prop identity changes, context updates, parent renders, or local state transitions.",
            "When React work looks cheap but the page still janks, switch to browser Performance tools to inspect layout, paint, and scripting cost.",
            "Measure bundle size and route-level code splitting before spending a day on tiny `useMemo` wins.",
          ]}
        />
        <Callout variant="warning">
          If the first answer is `useMemo` or `useCallback`, it usually sounds
          tactical rather than senior. State placement, list size, bundle size,
          and scheduling usually matter more.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How would you keep a search input responsive while a large results list updates?",
              "When does `React.memo` help, and when does it add cost without meaningful benefit?",
              "What would you check first if a page feels slow even though React re-renders seem modest?",
              "Why is virtualization sometimes a better answer than memoization?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactPerformance;
