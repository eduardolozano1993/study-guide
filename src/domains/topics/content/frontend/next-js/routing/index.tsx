import {
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="Routing in Next.js is not only URL matching. It includes route composition, navigation behavior, data boundaries, and performance decisions such as prefetching."
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
            "Catch-all routes use `[...slug]` when the path can have multiple remaining segments.",
            "Optional catch-all routes use `[[...slug]]` when the segment may be missing entirely.",
          ]}
        />

        <SectionHeader>Route Groups and Handlers</SectionHeader>
        <Paragraph>
          Route groups organize the app without changing URLs. Route handlers
          use `route.ts` to respond to HTTP methods. Both matter in interviews
          because they show whether you understand routing as architecture rather
          than only navigation.
        </Paragraph>

        <SectionHeader>Navigation APIs</SectionHeader>
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

        <SectionHeader>Prefetching Tradeoffs</SectionHeader>
        <BulletList
          items={[
            "Prefetching improves perceived speed by loading route assets before the click.",
            "Over-prefetching can waste bandwidth and compute for routes the user may never visit.",
            "Critical app flows benefit more from prefetching than rarely used admin branches.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default NextJsRouting;
