import {
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="Middleware runs early in the request lifecycle and is useful for lightweight request shaping. It is not a replacement for full application logic."
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
            "Rewrite requests for locale, A/B tests, or vanity paths.",
            "Attach lightweight request metadata before the route runs.",
          ]}
        />

        <SectionHeader>What Middleware Is Not Good For</SectionHeader>
        <BulletList
          items={[
            "Heavy database queries on every request.",
            "Complex business logic that belongs near the route or action doing the real work.",
            "Replacing server-side authorization checks deeper in the app.",
          ]}
        />
        <Paragraph>
          Middleware is a fast gate, not the final trust boundary. Sensitive
          authorization decisions should still be enforced in Route Handlers,
          Server Actions, or server-rendered route code.
        </Paragraph>

        <SectionHeader>When Edge Runtime Helps</SectionHeader>
        <BulletList
          items={[
            "Latency-sensitive request preprocessing close to the user.",
            "Simple personalization or redirects that benefit from geographic proximity.",
            "Workloads that can run under the dependency and runtime restrictions of the platform.",
          ]}
        />
        <Callout variant="warning">
          Choose Edge because it solves a latency or topology problem, not
          because it sounds more modern. Many backends and libraries still fit
          better in the Node runtime.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsMiddlewareEdgeRuntime;
