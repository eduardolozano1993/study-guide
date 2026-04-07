import {
  BulletList,
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { nextJsErrorHandlingObservabilityLesson } from "./meta";

export function NextJsErrorHandlingObservability() {
  return (
    <TopicLessonPage
      title={nextJsErrorHandlingObservabilityLesson.title}
      summary={nextJsErrorHandlingObservabilityLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsErrorHandlingObservabilityLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsErrorHandlingObservabilityLesson.difficulty}
      relatedTopics={[
        { label: "App Router Architecture", href: "/topic/nextjs-app-router-architecture" },
        { label: "Deployment and Runtime Tradeoffs", href: "/topic/nextjs-deployment-runtime-tradeoffs" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Error Handling and Observability"
          description="Good production systems isolate failures, distinguish expected missing states from true exceptions, and produce telemetry that makes distributed request paths debuggable."
        />

        <SectionHeader>Segment-Level Error Handling</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// app/dashboard/error.tsx
"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  return (
    <div>
      <p>Something went wrong.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`}
        />
        <Paragraph>
          `error.tsx` behaves like a route-scoped error boundary. That matters
          because it lets one subtree fail without taking down the entire app
          shell, and the `reset()` path gives the user a real recovery action.
        </Paragraph>

        <SectionHeader>Expected Missing Data vs True Exceptions</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <Article post={post} />;
}`}
        />
        <BulletList
          items={[
            "Missing content can be an expected product state and should not always trip error monitoring.",
            "User-correctable failures such as bad input or expired sessions need recovery UX, not just logs.",
            "True exceptions should surface into monitoring with enough context to be actionable.",
          ]}
        />

        <SectionHeader>Observability in Practice</SectionHeader>
        <BulletList
          items={[
            "Log enough request context to correlate failures with route, deployment version, user action, and environment.",
            "Capture server-side and client-side streams separately because the failure classes differ.",
            "Use tracing and timing to identify slow backends, cache misses, and waterfalls that do not show up in one stack trace.",
            "Redaction matters because request and session context should help diagnosis without leaking secrets or PII.",
          ]}
        />
        <Callout variant="important">
          In a server-rendered app, some failures happen before the browser gets
          meaningful UI. Logs, traces, and request correlation are first-class
          engineering concerns, not optional extras.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsErrorHandlingObservability;
