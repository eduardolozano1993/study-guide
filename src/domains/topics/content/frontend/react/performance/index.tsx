import {
  CodeBlock,
  CollapsibleSection,
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
          description="Strong performance answers are evidence-based. The goal is not to avoid every render, but to identify expensive work and reduce it without damaging correctness or maintainability."
        />

        <SectionHeader>Profile Before You Optimize</SectionHeader>
        <Paragraph>
          The React DevTools Profiler is the right starting point because it
          tells you which components render, why they render, and how much time
          they consume.
        </Paragraph>
        <Paragraph>
          A re-render is only a problem when it causes expensive computation,
          repeated heavy child renders, layout thrash, or needless effect and
          network churn.
        </Paragraph>

        <SectionHeader>Reducing Unnecessary Renders</SectionHeader>
        <Paragraph>
          The most reliable optimization is better state placement. Keep state
          near the components that use it so updates do not fan out through the
          whole tree.
        </Paragraph>
        <Paragraph>
          `React.memo` can help isolate expensive children, but memoization
          should follow architecture, not replace it.
        </Paragraph>
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

        <SectionHeader>Code Splitting, Lazy Loading, and Virtualization</SectionHeader>
        <Paragraph>
          Code splitting improves initial load by shipping less JavaScript up
          front. Lazy loading is especially useful for routes, modals, and
          optional dashboards that are not needed for first paint.
        </Paragraph>
        <Paragraph>
          Virtualization is the answer when cost comes from rendering huge lists
          or tables. Instead of rendering everything, render only the visible
          window.
        </Paragraph>
        <CollapsibleSection title="Common senior interview trap">
          <Paragraph>
            If you answer with `useMemo` and `useCallback` before talking about
            profiling, state placement, bundle size, or list virtualization, the
            answer usually sounds tactical rather than senior.
          </Paragraph>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactPerformance;
