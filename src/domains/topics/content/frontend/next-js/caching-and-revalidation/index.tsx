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
import { nextJsCachingAndRevalidationLesson } from "./meta";

export function NextJsCachingAndRevalidation() {
  return (
    <TopicLessonPage
      title={nextJsCachingAndRevalidationLesson.title}
      summary={nextJsCachingAndRevalidationLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsCachingAndRevalidationLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsCachingAndRevalidationLesson.difficulty}
      relatedTopics={[
        { label: "Server Actions and Mutations", href: "/topic/nextjs-server-actions-mutations" },
        { label: "Rendering Model", href: "/topic/nextjs-rendering-model" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Caching and Revalidation"
          description="Modern Next.js interviews go deep here because stale-data bugs usually come from weak cache reasoning, not weak React syntax. You need to keep cache layers, invalidation scope, and read-after-write guarantees straight."
        />

        <SectionHeader>Three Cache Ideas to Keep Straight</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "purpose", label: "Purpose" },
            { key: "trap", label: "Common trap" },
          ]}
          rows={[
            {
              label: "Request memoization",
              values: {
                purpose: "Deduplicates identical work during one render pass.",
                trap: "Treating it like a durable cache across requests.",
              },
            },
            {
              label: "Data cache",
              values: {
                purpose: "Stores fetch results or other cached server work across requests.",
                trap: "Forgetting to invalidate it after writes, then blaming the router.",
              },
            },
            {
              label: "Router cache",
              values: {
                purpose: "Keeps route payloads on the client for faster navigation.",
                trap: "Assuming a client refresh is the same as invalidating stale server data.",
              },
            },
          ]}
        />

        <SectionHeader>Common Cache Controls</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`await fetch("https://api.example.com/products", {
  next: { revalidate: 3600, tags: ["products"] },
});

await fetch("https://api.example.com/me", {
  cache: "no-store",
});`}
        />
        <Paragraph>
          The hard part is not memorizing the options. It is deciding what may
          be stale, for how long, and how invalidation should happen after a
          write.
        </Paragraph>

        <SectionHeader>Invalidate by Path or by Tag</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function updateProduct(id: string) {
  await db.product.update({ where: { id }, data: { featured: true } });

  revalidateTag("products");
  revalidatePath("/products");
}`}
        />
        <BulletList
          items={[
            "Use `revalidateTag` when several pages depend on the same conceptual data set.",
            "Use `revalidatePath` when a specific route tree must refresh even if the underlying data taxonomy is broader.",
            "Read-your-own-writes workflows may need both explicit invalidation and a client refresh or redirect path that lands on fresh data.",
          ]}
        />

        <SectionHeader>Failure Modes and Debugging</SectionHeader>
        <BulletList
          items={[
            "If a mutation succeeds but the UI stays stale, inspect tags, path invalidation, and whether the affected read was actually cacheable.",
            "If different users see the same personalized data, you likely cached something that should have stayed request-bound.",
            "If `router.refresh()` appears to fix things inconsistently, the real problem may be missing server invalidation rather than a client navigation issue.",
            "If freshness requirements are strict, be explicit that a timed revalidation window is a business tradeoff, not an implementation detail.",
          ]}
        />
        <Callout variant="warning">
          `router.refresh()` refreshes the current route payload from the
          client. It does not replace a deliberate server-side invalidation
          strategy.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What is the difference between request memoization, the data cache, and the router cache?",
              "When would you invalidate by tag instead of by path?",
              "Why can a successful mutation still leave stale UI on screen?",
              "How would you design caching differently for a public catalog versus private billing data?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsCachingAndRevalidation;
