import {
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="A senior answer should distinguish between internal server-to-database access and building an actual HTTP API boundary for external clients or cross-origin consumers."
        />

        <SectionHeader>When to Use a Route Handler</SectionHeader>
        <BulletList
          items={[
            "You need an HTTP endpoint for webhooks, third-party consumers, mobile clients, or browser fetches from outside the current server render.",
            "You need fine-grained control over headers, methods, status codes, cookies, or streamed responses.",
            "You are exposing a stable API surface rather than just composing data for a page render.",
          ]}
        />

        <SectionHeader>When Direct Server Access Is Better</SectionHeader>
        <Paragraph>
          If a Server Component or Server Action can talk directly to the
          database or backend service, adding an internal HTTP hop often adds
          latency, duplicate auth work, and extra failure points without any
          benefit.
        </Paragraph>

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

        <SectionHeader>Auth, Validation, and Runtime Concerns</SectionHeader>
        <BulletList
          items={[
            "Validate all external input at the API boundary, even if trusted UI produced it.",
            "Authorize based on trusted session data, not a user id from the request body.",
            "Choose Node or Edge runtime based on dependencies, latency needs, and platform constraints.",
          ]}
        />
        <Callout variant="warning">
          Creating a Route Handler for every internal fetch is usually a sign of
          carrying old SPA architecture into an App Router codebase.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsApiRouteHandlers;
