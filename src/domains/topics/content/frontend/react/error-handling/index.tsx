import {
  Callout,
  CodeBlock,
  CollapsibleSection,
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
          description="Senior engineers should treat error handling as a product concern, not only a try/catch concern. The system needs clear fallbacks, recovery paths, and monitoring."
        />

        <SectionHeader>Error Boundaries and Fallback UI</SectionHeader>
        <Paragraph>
          Error boundaries catch rendering errors in their subtree and let you
          show fallback UI instead of crashing the entire app. They do not catch
          every async or event-handler failure automatically.
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

        <SectionHeader>Async Error Patterns</SectionHeader>
        <Paragraph>
          Async failures need explicit modeling. Data loading, mutations,
          background refresh, and form submission errors should have different
          user experiences and recovery options.
        </Paragraph>

        <SectionHeader>Monitoring Strategy</SectionHeader>
        <Paragraph>
          Monitoring closes the loop between code and production reality. Error
          boundaries should log context, and teams should be able to trace
          failures back to routes, releases, and user actions.
        </Paragraph>
        <Callout variant="tip">
          Error handling is incomplete until the team can detect, diagnose, and
          recover from failures in production.
        </Callout>
        <CollapsibleSection title="Common interview gaps">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Assuming error boundaries catch every type of error.</li>
            <li>Focusing only on logging without discussing fallback UX.</li>
            <li>Treating all failures the same instead of modeling retryable and terminal paths.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactErrorHandling;
