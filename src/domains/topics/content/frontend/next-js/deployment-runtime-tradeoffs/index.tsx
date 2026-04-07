import {
  BulletList,
  Callout,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
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
          description="Senior candidates should be able to discuss not only how the app runs locally, but how runtime choice changes latency, compatibility, cold starts, observability, and platform ownership in production."
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
                edge: "Lower latency for geographically distributed lightweight request-time work.",
              },
            },
            {
              label: "Weakness",
              values: {
                node: "May be farther from the user and incur regional latency.",
                edge: "Tighter runtime constraints, dependency limits, and a smaller execution envelope.",
              },
            },
            {
              label: "Best fit",
              values: {
                node: "Most rendering, data access, heavy integrations, and background-oriented work.",
                edge: "Request shaping, redirects, locale handling, and very light personalization close to the user.",
              },
            },
          ]}
        />

        <SectionHeader>Operational Topics That Actually Matter</SectionHeader>
        <BulletList
          items={[
            "Cold starts matter more when functions are infrequently used or fragmented across many routes.",
            "Regional latency matters when your users, app runtime, and database are not close to one another.",
            "Environment variables can be build-time or runtime concerns depending on where values are injected and where code executes.",
            "Background work such as long-running jobs, image processing, or heavy event consumers may not fit cleanly into request/response execution at all.",
          ]}
        />

        <SectionHeader>Vercel vs Self-Hosting</SectionHeader>
        <Paragraph>
          Vercel usually offers the smoothest integration with Next.js features,
          especially around previews, caching, and platform-aware defaults.
          Self-hosting can be the right choice when cost, compliance,
          infrastructure standardization, or deeper operational control matters
          more than turnkey integration.
        </Paragraph>
        <BulletList
          items={[
            "Platform defaults help when your workload fits the opinionated model and the integrated observability and preview workflow save team time.",
            "Self-hosting helps when vendor lock, compliance, custom topology, or platform feature gaps outweigh the convenience.",
            "Feature completeness, observability ownership, and rollback mechanisms matter more than marketing labels like serverless or edge-native.",
          ]}
        />
        <Callout variant="warning">
          Runtime choice should follow workload shape. If your database is in
          one region and your app does heavy server-side joins, moving that work
          to the Edge may increase complexity without reducing end-to-end
          latency.
        </Callout>

        <SectionHeader>Interviewer questions</SectionHeader>
        <BulletList
          items={[
            "How do cold starts, regional latency, and data proximity affect runtime choice?",
            "When does Edge help, and when does it mostly add constraints?",
            "What tradeoffs matter between Vercel and self-hosting besides cost?",
            "What kinds of work do not fit cleanly into request/response execution?",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default NextJsDeploymentRuntimeTradeoffs;
