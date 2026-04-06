import {
  Callout,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
import { nextJsDeploymentRuntimeTradeoffsLesson } from "./meta";

export function NextJsDeploymentRuntimeTradeoffs() {
  return (
    <TopicLessonPage
      title={nextJsDeploymentRuntimeTradeoffsLesson.title}
      summary={nextJsDeploymentRuntimeTradeoffsLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsDeploymentRuntimeTradeoffsLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsDeploymentRuntimeTradeoffsLesson.difficulty}
      relatedTopics={[
        { label: "Middleware and Edge Runtime", href: "/topic/nextjs-middleware-edge-runtime" },
        { label: "Caching and Revalidation", href: "/topic/nextjs-caching-and-revalidation" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Deployment and Runtime Tradeoffs"
          description="Senior candidates should be able to discuss not only how the app runs locally, but how runtime choice changes latency, compatibility, caching, and operational complexity in production."
        />

        <SectionHeader>Node vs Edge Runtime</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "node", label: "Node runtime" },
            { key: "edge", label: "Edge runtime" },
          ]}
          rows={[
            {
              label: "Strength",
              values: {
                node: "Broad library compatibility and a familiar server environment.",
                edge: "Lower latency for geographically distributed request-time work.",
              },
            },
            {
              label: "Weakness",
              values: {
                node: "May be farther from the user and incur regional latency.",
                edge: "Tighter runtime constraints and less compatibility with some libraries or drivers.",
              },
            },
            {
              label: "Best fit",
              values: {
                node: "Most server rendering, data access, and heavy integration code.",
                edge: "Lightweight request shaping, redirects, and latency-sensitive personalization.",
              },
            },
          ]}
        />

        <SectionHeader>Operational Topics That Matter</SectionHeader>
        <BulletList
          items={[
            "Environment variables can be build-time or runtime concerns depending on how values are injected and where code executes.",
            "Cold starts matter more when functions are infrequently used or heavily fragmented.",
            "CDN and cache behavior can make a mediocre origin fast for public pages and a great origin feel slow for uncached personalized pages.",
            "Self-hosting often gives control, while platform hosting often gives better defaults and integrated caching primitives.",
          ]}
        />

        <SectionHeader>Vercel vs Self-Hosting</SectionHeader>
        <Paragraph>
          Vercel usually offers the smoothest integration with Next.js features,
          especially around preview deployments, edge delivery, and caching
          semantics. Self-hosting can be the right choice when cost, compliance,
          infrastructure standardization, or deeper operational control matters
          more than turnkey integration.
        </Paragraph>
        <Callout variant="warning">
          Runtime choice should follow workload shape. If your database is in
          one region and your app does heavy server-side joins, moving that work
          to the Edge may increase complexity without reducing end-to-end
          latency.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsDeploymentRuntimeTradeoffs;
