import {
  BulletList,
  Callout,
  CodeBlock,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { nextJsApiRouteHandlersLesson } from "./meta";

export function NextJsApiRouteHandlers() {
  return (
    <TopicLessonPage
      title={nextJsApiRouteHandlersLesson.title}
      summary={nextJsApiRouteHandlersLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsApiRouteHandlersLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsApiRouteHandlersLesson.difficulty}
      relatedTopics={[
        { label: "Routing", href: "/topic/nextjs-routing" },
        { label: "Authentication and Authorization", href: "/topic/nextjs-authentication-authorization" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="API Layer and Route Handlers"
          description="A senior answer should distinguish between direct trusted server access and building an actual HTTP boundary. Route handlers earn their keep when transport concerns, external consumers, or runtime behavior matter."
        />

        <SectionHeader>When a Route Handler Is The Right Boundary</SectionHeader>
        <BulletList
          items={[
            "You need an HTTP endpoint for webhooks, third-party consumers, mobile clients, or browser fetches from outside the current server render.",
            "You need fine-grained control over headers, methods, status codes, cookies, streaming responses, or uploads.",
            "You need idempotency or signature verification at the transport boundary, especially for webhooks or retried writes.",
            "You are exposing a stable API surface rather than just composing data for a page render.",
          ]}
        />

        <SectionHeader>When Direct Server Access Is Better</SectionHeader>
        <Paragraph>
          If a Server Component or Server Action can talk directly to the
          database or backend service, adding an internal HTTP hop often adds
          latency, duplicate auth work, extra serialization, and more failure
          points without adding real reuse.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "benefit", label: "Good reason" },
            { key: "cost", label: "Tradeoff" },
          ]}
          rows={[
            {
              label: "Internal HTTP hop",
              values: {
                benefit: "Shared API surface across several clients or services.",
                cost: "More latency and coupling inside the same app boundary.",
              },
            },
            {
              label: "Direct server access",
              values: {
                benefit: "Fewer hops and simpler trusted data flow.",
                cost: "Less reusable if the logic really must serve external consumers too.",
              },
            },
          ]}
        />

        <SectionHeader>Example Route Handler</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// app/api/projects/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();

  if (!name) {
    return NextResponse.json(
      { error: "Project name is required" },
      { status: 400 },
    );
  }

  const project = await db.project.create({ data: { name } });
  return NextResponse.json(project, { status: 201 });
}`}
        />

        <SectionHeader>Node vs Edge Runtime Tradeoffs</SectionHeader>
        <BulletList
          items={[
            "Node runtime fits most route handlers because library compatibility, streaming libraries, and database access are broader there.",
            "Edge runtime can help latency-sensitive lightweight handlers, but crypto, upload handling, and DB access patterns may change drastically.",
            "Runtime choice should follow dependency support and workload shape, not fashion.",
          ]}
        />
        <Callout variant="warning">
          Creating a route handler for every internal fetch is usually a sign of
          carrying old SPA architecture into an App Router codebase.
        </Callout>

        <SectionHeader>Interviewer Questions</SectionHeader>
        <BulletList
          items={[
            "When is a route handler better than direct database access from a Server Component or Server Action?",
            "Why do webhooks, file uploads, and streaming responses often justify a route handler?",
            "What transport-level concerns make idempotency important?",
            "How would you choose between Node and Edge runtime for a handler?",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default NextJsApiRouteHandlers;
