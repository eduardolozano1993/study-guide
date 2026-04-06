import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
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
          description="Code splitting matters because shipping less JavaScript up front is often one of the highest-leverage frontend performance wins."
        />

        <Paragraph>
          Code splitting breaks the application bundle into smaller chunks so
          users only download what they need for the current route or feature.
          The main goal is reducing initial load cost, not just making build
          output look organized.
        </Paragraph>

        <CollapsibleSection title="Typical route and feature splitting" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`const SettingsPage = React.lazy(() => import("./SettingsPage"));
const AnalyticsPanel = React.lazy(() => import("./AnalyticsPanel"));`}
          />
          <Paragraph>
            This keeps rarely visited or heavy features out of the initial
            bundle. It is especially effective for admin areas, rich editors,
            analytics dashboards, and route-level boundaries.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Tradeoffs">
          <BulletList
            items={[
              "Too little splitting keeps the initial bundle heavy.",
              "Too much splitting can create many small requests and loading waterfalls.",
              "Split around natural UX boundaries like routes, tabs, or optional tools.",
              "Use loading states deliberately so the deferred content does not feel broken.",
            ]}
          />
        </CollapsibleSection>

        <Callout variant="tip">
          A senior answer should mention both bundle-size reduction and the risk
          of creating new network waterfalls if the split strategy is naive.
        </Callout>

        <CollapsibleSection title="Common interview pitfalls">
          <BulletList
            items={[
              "Treating code splitting as always beneficial with no tradeoffs.",
              "Splitting hot paths so aggressively that interaction gets slower later.",
              "Ignoring user-visible loading and fallback states.",
              "Talking about code splitting without connecting it to actual bundle and route behavior.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CodeSplitting;
