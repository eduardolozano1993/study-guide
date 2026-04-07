import {
  BulletList,
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { nextJsMiddlewareEdgeRuntimeLesson } from "./meta";

export function NextJsMiddlewareEdgeRuntime() {
  return (
    <TopicLessonPage
      title={nextJsMiddlewareEdgeRuntimeLesson.title}
      summary={nextJsMiddlewareEdgeRuntimeLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsMiddlewareEdgeRuntimeLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsMiddlewareEdgeRuntimeLesson.difficulty}
      relatedTopics={[
        { label: "Authentication and Authorization", href: "/topic/nextjs-authentication-authorization" },
        { label: "Deployment and Runtime Tradeoffs", href: "/topic/nextjs-deployment-runtime-tradeoffs" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Middleware and Edge Runtime"
          description="Middleware runs early in the request lifecycle and is useful for lightweight request shaping. It is not a replacement for full application logic, deep auth, or heavy backend integration."
        />

        <SectionHeader>What Middleware Is Good For</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}`}
        />
        <BulletList
          items={[
            "Redirect unauthenticated users away from protected route prefixes.",
            "Rewrite requests for locale routing, experiments, or vanity paths.",
            "Attach lightweight request metadata before the route runs.",
            "Handle latency-sensitive coarse request shaping close to the user.",
          ]}
        />

        <SectionHeader>Boundaries And Limits</SectionHeader>
        <BulletList
          items={[
            "Heavy database access on every request is usually the wrong fit.",
            "Complex business logic belongs near the route, handler, or action doing the real work.",
            "Middleware is not the final authorization boundary; it is a coarse gate.",
            "Edge runtime constraints around Node APIs, drivers, and heavy libraries mean not everything portable to Node is portable here.",
          ]}
        />
        <Paragraph>
          Running logic on every request amplifies both latency and cost. A
          small redirect or locale rewrite can be appropriate. A large chain of
          request-time business rules usually is not.
        </Paragraph>

        <SectionHeader>When Edge Helps</SectionHeader>
        <BulletList
          items={[
            "Latency-sensitive preprocessing close to the user.",
            "Simple personalization or redirects that benefit from geographic proximity.",
            "Workloads that stay small and fit the runtime restrictions cleanly.",
          ]}
        />
        <Callout variant="warning">
          Choose Edge because it solves a topology or latency problem, not
          because it sounds more modern. Many backends and libraries still fit
          better in the Node runtime.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsMiddlewareEdgeRuntime;
