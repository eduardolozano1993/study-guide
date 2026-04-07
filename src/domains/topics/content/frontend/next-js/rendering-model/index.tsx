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
import { nextJsRenderingModelLesson } from "./meta";

export function NextJsRenderingModel() {
  return (
    <TopicLessonPage
      title={nextJsRenderingModelLesson.title}
      summary={nextJsRenderingModelLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsRenderingModelLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsRenderingModelLesson.difficulty}
      relatedTopics={[
        { label: "Data Fetching", href: "/topic/nextjs-data-fetching" },
        { label: "Caching and Revalidation", href: "/topic/nextjs-caching-and-revalidation" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Rendering Model"
          description="Senior interview answers connect rendering mode to business constraints: freshness, personalization, cacheability, latency, infrastructure cost, and failure modes when the chosen model is wrong."
        />

        <SectionHeader>The Main Rendering Modes</SectionHeader>
        <Paragraph>
          In modern Next.js, rendering is not one global application setting.
          Each route and each fetch decision can push a page toward static or
          dynamic behavior.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "fit", label: "Best fit" },
            { key: "risk", label: "What goes wrong when misused" },
          ]}
          rows={[
            {
              label: "SSG",
              values: {
                fit: "Stable public content such as docs, marketing pages, and guides.",
                risk: "Freshness suffers if content changes more often than rebuilds or invalidation can keep up.",
              },
            },
            {
              label: "ISR",
              values: {
                fit: "Mostly cacheable content that changes too often for full rebuilds.",
                risk: "Teams forget they are accepting bounded staleness and then treat stale pages like correctness bugs.",
              },
            },
            {
              label: "SSR",
              values: {
                fit: "Pages needing request-time data, auth-aware output, or user-specific decisions.",
                risk: "Runtime cost, latency, and cache misses can dominate if the page could have stayed static.",
              },
            },
            {
              label: "Fully dynamic rendering",
              values: {
                fit: "Dashboards, carts, account pages, or any route driven by cookies, headers, or uncached fetches.",
                risk: "You lose static reuse and can quietly overpay in infrastructure and response time.",
              },
            },
          ]}
        />

        <SectionHeader>Typical Implementations</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// Static generation with timed revalidation
export const revalidate = 3600;

export default async function ProductPage() {
  const products = await fetch("https://api.example.com/products", {
    next: { revalidate: 3600 },
  }).then((response) => response.json());

  return <ProductList products={products} />;
}`}
        />
        <CodeBlock
          language="tsx"
          code={`// Request-time rendering for personalized data
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const token = (await cookies()).get("session")?.value;
  const data = await fetch("https://api.example.com/me", {
    headers: { Authorization: "Bearer " + token },
    cache: "no-store",
  }).then((response) => response.json());

  return <Dashboard data={data} />;
}`}
        />

        <SectionHeader>How Routes Become Dynamic</SectionHeader>
        <BulletList
          items={[
            "Reading cookies or headers ties output to the incoming request.",
            "Using uncached fetches or `cache: \"no-store\"` prevents static reuse.",
            "A route can mix static and dynamic work, but the most dynamic requirement on the path usually determines the final behavior that matters operationally.",
            "Personalization, auth, experiments, and geo-aware output are often the real reasons to go dynamic, not just habit.",
          ]}
        />
        <Callout variant="warning">
          A common interview mistake is saying SSR is always better for SEO and
          SSG is always better for performance. Real answers depend on cache hit
          rate, personalization, volatility, and request-path cost.
        </Callout>

        <SectionHeader>Debugging the Wrong Rendering Choice</SectionHeader>
        <BulletList
          items={[
            "If data looks stale, check whether the route is statically cached before blaming client navigation.",
            "If a dashboard feels slow, inspect whether a dynamic route is doing too much uncached request-time work.",
            "If a public page is expensive to serve, ask whether it could have been statically rendered or incrementally revalidated instead.",
            "If hydration bugs appear, separate rendering-mode problems from server/client output mismatch problems.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How would you choose between SSG, ISR, SSR, and dynamic rendering for a product catalog, a blog, and a user dashboard?",
              "What route behaviors force dynamic rendering in the App Router?",
              "Why can the wrong rendering model create both stale data bugs and infrastructure cost problems?",
              "When is `prefer static until proven otherwise` good advice, and when does it become dogma?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsRenderingModel;
