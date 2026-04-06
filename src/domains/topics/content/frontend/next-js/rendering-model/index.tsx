import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="Senior interview answers should connect rendering mode to business constraints: freshness, latency, personalization, cacheability, infrastructure cost, and failure modes."
        />

        <SectionHeader>The Four Rendering Modes</SectionHeader>
        <Paragraph>
          In modern Next.js, rendering is not one global setting. Each route or
          fetch decision can push a page toward static or dynamic behavior.
        </Paragraph>
        <Paragraph>
          The core models to reason about are static generation, server-side
          rendering, incremental static regeneration, and fully dynamic
          rendering. The right choice depends on whether data changes often,
          whether the page is personalized, and whether the route must be fast
          under heavy traffic.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "what", label: "What it means" },
            { key: "best", label: "Best fit" },
          ]}
          rows={[
            {
              label: "SSG",
              values: {
                what: "HTML is generated ahead of time and served from cache/CDN.",
                best: "Stable content such as docs, marketing pages, and public guides.",
              },
            },
            {
              label: "SSR",
              values: {
                what: "The server renders the response per request.",
                best: "Pages needing request-time data, auth-aware UI, or user-specific output.",
              },
            },
            {
              label: "ISR",
              values: {
                what: "A static page is cached and refreshed on an interval or after invalidation.",
                best: "Catalogs, blogs, and CMS content that must stay fast but not perfectly real time.",
              },
            },
            {
              label: "Dynamic",
              values: {
                what: "Rendering always depends on request-time state such as cookies, headers, or an uncached fetch.",
                best: "Dashboards, carts, account pages, and highly personalized experiences.",
              },
            },
          ]}
        />

        <SectionHeader>Typical Implementations</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// Static generation with timed revalidation (ISR)
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
          code={`// Force request-time rendering for personalized data
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

        <SectionHeader>Choosing the Right Tradeoff</SectionHeader>
        <BulletList
          items={[
            "Choose SSG when content is public, mostly stable, and benefits from CDN distribution.",
            "Choose ISR when content changes often enough that a full rebuild is too expensive but exact request-time freshness is unnecessary.",
            "Choose SSR or dynamic rendering when output depends on the viewer, auth, geo, experiment assignment, or rapidly changing data.",
            "Prefer static until you have a concrete reason to go dynamic, but do not force static rendering onto clearly personalized pages.",
          ]}
        />
        <Callout variant="warning">
          A common interview mistake is saying SSR is always better for SEO and
          SSG is always better for performance. Real answers depend on cache hit
          rate, personalization, data volatility, and infrastructure shape.
        </Callout>

        <CollapsibleSection title="How dynamic rendering is triggered">
          <BulletList
            items={[
              "Reading cookies or headers ties output to the incoming request.",
              "Using uncached fetches or explicit no-store behavior prevents static reuse.",
              "A route can mix static outer shells with dynamic inner work, but the final behavior follows the most dynamic requirement on the path.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interview pitfalls to avoid">
          <BulletList
            items={[
              "Treating ISR as just old-school SSG with a cron job instead of a cache invalidation strategy.",
              "Ignoring the difference between public cacheable pages and private authenticated pages.",
              "Not being able to explain why a dashboard should rarely be statically generated.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsRenderingModel;
