import {
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="Good production systems isolate failures, produce useful telemetry, and make it possible to debug distributed request paths instead of only showing generic fallback UI."
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
          shell.
        </Paragraph>

        <SectionHeader>Expected Missing Resources</SectionHeader>
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

        <SectionHeader>Observability in Practice</SectionHeader>
        <BulletList
          items={[
            "Log enough request context to correlate errors with route, user, and deployment version.",
            "Capture server-side errors separately from client-side errors because their root causes differ.",
            "Use tracing and timing data to identify slow backends, cache misses, and waterfall patterns.",
            "Treat production debugging as a full request-path problem, not just a component problem.",
          ]}
        />
        <Callout variant="important">
          In a server-rendered app, some failures happen before the browser gets
          meaningful UI. That is why logs, traces, and monitoring are first-class
          engineering concerns rather than optional extras.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsErrorHandlingObservability;
