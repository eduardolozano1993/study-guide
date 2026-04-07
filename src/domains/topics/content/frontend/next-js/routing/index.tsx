import {
  BulletList,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { nextJsRoutingLesson } from "./meta";

export function NextJsRouting() {
  return (
    <TopicLessonPage
      title={nextJsRoutingLesson.title}
      summary={nextJsRoutingLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsRoutingLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsRoutingLesson.difficulty}
      relatedTopics={[
        { label: "App Router Architecture", href: "/topic/nextjs-app-router-architecture" },
        { label: "API Layer and Route Handlers", href: "/topic/nextjs-api-route-handlers" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Routing"
          description="Routing in Next.js is not only URL matching. It includes route composition, navigation behavior, route-handler boundaries, metadata coupling, and prefetch cost."
        />

        <SectionHeader>File-Based Route Patterns</SectionHeader>
        <CodeBlock
          language="text"
          code={`app/
  page.tsx                    -> /
  dashboard/page.tsx          -> /dashboard
  blog/[slug]/page.tsx        -> /blog/:slug
  docs/[...parts]/page.tsx    -> /docs/a/b/c
  shop/[[...slug]]/page.tsx   -> optional catch-all`}
        />
        <BulletList
          items={[
            "Dynamic segments use `[id]` style folders.",
            "Catch-all routes use `[...slug]` when the path can have several remaining segments.",
            "Optional catch-all routes use `[[...slug]]` when the segment may be missing entirely.",
            "Route structure should mirror product and ownership boundaries, not just URL aesthetics.",
          ]}
        />

        <SectionHeader>Navigation And Architectural Tradeoffs</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();

  return (
    <>
      <Link href="/dashboard">Dashboard</Link>
      <button onClick={() => router.push("/settings")}>Settings</button>
    </>
  );
}`}
        />
        <Paragraph>
          Prefer declarative navigation with `Link` for standard route changes.
          Use imperative router APIs for workflows such as post-submit redirects,
          wizards, or context-sensitive navigation.
        </Paragraph>

        <SectionHeader>Prefetch And Debugging</SectionHeader>
        <BulletList
          items={[
            "Prefetching improves perceived speed by loading route assets before the click, but over-prefetching can waste bandwidth and compute.",
            "Imperative navigation, intercepted modals, route handlers, and metadata all make routing an architectural system rather than only a link API.",
            "When route matching feels wrong, inspect dynamic segment specificity and optional catch-all ambiguity before blaming the router runtime.",
            "When navigation feels slower than expected, inspect prefetch behavior, route payload size, and whether dynamic work made the route expensive.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default NextJsRouting;
