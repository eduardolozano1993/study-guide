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
import { codeSplittingLesson } from "./meta";

export function CodeSplitting() {
  return (
    <TopicLessonPage
      title={codeSplittingLesson.title}
      summary={codeSplittingLesson.summary}
      eyebrow="Frontend / Performance"
      estimatedReadingTimeMinutes={codeSplittingLesson.estimatedReadingTimeMinutes}
      difficulty={codeSplittingLesson.difficulty}
      relatedTopics={[
        { label: "Tree Shaking", href: "/topic/tree-shaking" },
        { label: "Performance Fundamentals", href: "/topic/performance-fundamentals" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="P"
          title="Code Splitting"
          description="Code splitting matters because shipping less JavaScript up front is often one of the highest-leverage frontend performance wins. The senior question is where to split and how not to replace one bottleneck with another."
        />

        <SectionHeader>Split Around User-Centered Boundaries</SectionHeader>
        <Paragraph>
          Code splitting breaks the application into smaller chunks so users only
          download what they need for the current route or feature. The main
          goal is reducing initial load cost, not just making build output look
          organized.
        </Paragraph>
        <CollapsibleSection title="Typical route and feature splitting" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`const SettingsPage = React.lazy(() => import("./SettingsPage"));
const AnalyticsPanel = React.lazy(() => import("./AnalyticsPanel"));`}
          />
        </CollapsibleSection>

        <SectionHeader>Tradeoffs: Size, Waterfalls, and UX</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "helps", label: "What it helps" },
            { key: "hurts", label: "What can go wrong" },
          ]}
          rows={[
            {
              label: "Route-level splitting",
              values: {
                helps: "Keeps rarely visited pages out of the initial bundle.",
                hurts: "Can create visible loading transitions if fallbacks and prefetching are weak.",
              },
            },
            {
              label: "Component-level splitting",
              values: {
                helps: "Defers heavy optional tools such as editors or analytics.",
                hurts: "Can create new waterfalls or interaction latency if overused on hot paths.",
              },
            },
          ]}
        />
        <BulletList
          items={[
            "Too little splitting keeps the initial bundle heavy.",
            "Too much splitting can create many small requests and loading waterfalls.",
            "Preloading and prefetching are often better answers than just splitting more.",
            "Fallback UI matters because a smaller bundle can still feel worse if loading states feel broken or jumpy.",
          ]}
        />
        <Callout variant="tip">
          A senior answer mentions bundle-size reduction, route and feature
          boundaries, preload strategy, and the risk of shifting latency from
          startup to the first interaction with a deferred feature.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When is route-level splitting enough, and when is component-level splitting worth the extra complexity?",
              "How can code splitting accidentally create waterfalls?",
              "Why might prefetching or preloading be better than splitting even more?",
              "How do you know whether a split improved UX instead of just changing where the waiting happens?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CodeSplitting;
