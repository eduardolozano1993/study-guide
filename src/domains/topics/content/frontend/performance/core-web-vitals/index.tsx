import {
  BulletList,
  Callout,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { coreWebVitalsLesson } from "./meta";

export function CoreWebVitals() {
  return (
    <TopicLessonPage
      title={coreWebVitalsLesson.title}
      summary={coreWebVitalsLesson.summary}
      eyebrow="Frontend / Performance"
      estimatedReadingTimeMinutes={coreWebVitalsLesson.estimatedReadingTimeMinutes}
      difficulty={coreWebVitalsLesson.difficulty}
      relatedTopics={[
        { label: "Browser Rendering Basics", href: "/topic/browser-rendering" },
        { label: "Performance Fundamentals", href: "/topic/performance-fundamentals" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="P"
          title="Core Web Vitals"
          description="Core Web Vitals are user-centric performance metrics. Interviewers use them to test whether you can connect engineering changes to actual user experience and diagnose which layer is hurting which metric."
        />

        <SectionHeader>Each Metric Represents A Different Failure</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "meaning", label: "What it tells you" },
            { key: "debug", label: "What to inspect first" },
          ]}
          rows={[
            {
              label: "LCP",
              values: {
                meaning: "How quickly the main visible content becomes useful.",
                debug: "Server latency, render-blocking CSS, image delivery, and client rendering of the largest element.",
              },
            },
            {
              label: "INP",
              values: {
                meaning: "How responsive the page feels after interaction.",
                debug: "Long tasks, heavy handlers, hydration, and main-thread contention after input.",
              },
            },
            {
              label: "CLS",
              values: {
                meaning: "How visually stable the page is while loading and updating.",
                debug: "Image and ad sizing, late content insertion, font swaps, skeleton behavior, and dynamic layout changes.",
              },
            },
          ]}
        />

        <SectionHeader>LCP, INP, and CLS Are Multi-Layer Problems</SectionHeader>
        <BulletList
          items={[
            "LCP can be slowed by backend delay, document HTML generation, CSS blocking, image optimization, or client-side rendering that postpones the largest content.",
            "INP is often about long tasks and total main-thread pressure, not just one slow click handler in isolation.",
            "CLS is not only missing image dimensions. It often comes from ads, async content insertion, font changes, and layout shifts after initial load.",
            "Micro-optimizing one layer while ignoring the actual bottleneck usually fails because these metrics are cross-stack by nature.",
          ]}
        />
        <Callout variant="warning">
          Interview answers are weak when they list optimizations without
          connecting them to the specific metric being improved and the layer
          that caused the slowdown.
        </Callout>

        <SectionHeader>Lab Data vs Field Data</SectionHeader>
        <Paragraph>
          Lighthouse and local profiling are useful lab tools, but real-user
          monitoring shows what users actually experience across devices,
          networks, and geographies. Senior answers know both matter.
        </Paragraph>
      </div>
    </TopicLessonPage>
  );
}

export default CoreWebVitals;
