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
import { reactErrorHandlingLesson } from "./meta";

export function ReactErrorHandling() {
  return (
    <TopicLessonPage
      title={reactErrorHandlingLesson.title}
      summary={reactErrorHandlingLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactErrorHandlingLesson.estimatedReadingTimeMinutes}
      difficulty={reactErrorHandlingLesson.difficulty}
      relatedTopics={[
        { label: "Forms", href: "/topic/react-forms" },
        { label: "Data Fetching", href: "/topic/react-data-fetching" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="!"
          title="Error Handling"
          description="Senior engineers should treat error handling as a product concern, not only a try/catch concern. The system needs fallback UX, recovery paths, and instrumentation that turns failures into actionable signals."
        />

        <SectionHeader>Error Boundaries and Their Limits</SectionHeader>
        <Paragraph>
          Error boundaries catch rendering errors in their subtree and let you
          show fallback UI instead of crashing the entire app. They do not catch
          every async failure or event-handler error automatically.
        </Paragraph>
        <CodeBlock
          language="tsx"
          code={`function DashboardPage() {
  return (
    <>
      <RevenueChart />
      <ErrorBoundary fallback={<PanelErrorFallback />}>
        <RecommendationsPanel />
      </ErrorBoundary>
    </>
  );
}`}
        />
        <ComparisonTable
          columns={[
            { key: "catches", label: "What it helps with" },
            { key: "misses", label: "What still needs separate handling" },
          ]}
          rows={[
            {
              label: "Error boundary",
              values: {
                catches: "Render-time failures in the subtree.",
                misses: "Most async failures, event-handler errors, and domain-specific recoverable states.",
              },
            },
          ]}
        />

        <SectionHeader>Recovery Beats Collapse</SectionHeader>
        <BulletList
          items={[
            "Retry, reset, and partial-page fallback are often better UX than collapsing the entire route.",
            "Recoverable failures should preserve user input whenever possible instead of forcing the user to start over.",
            "Offline and degraded modes deserve explicit treatment when data is not essential to the whole page.",
            "Feature-level async errors should surface close to the feature, not only in a global toast or console log.",
          ]}
        />

        <SectionHeader>Instrumentation and Correlation</SectionHeader>
        <Paragraph>
          Monitoring closes the loop between code and production reality. The
          team should be able to correlate failures to route, release, user
          action, and environment so the bug is diagnosable instead of just
          countable.
        </Paragraph>
        <Callout variant="tip">
          Error handling is incomplete until the team can detect, diagnose, and
          recover from failures in production.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What do error boundaries catch, and what do they not catch?",
              "How should async feature failures be surfaced without collapsing the whole app?",
              "Why is preserving user input part of good error handling?",
              "What context should be attached to production errors so they are actionable?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactErrorHandling;
