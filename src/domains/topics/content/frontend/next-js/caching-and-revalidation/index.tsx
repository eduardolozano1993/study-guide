import {
  Callout,
  CodeBlock,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="Modern Next.js interviews often go deep here because performance bugs and stale-data bugs usually come from weak cache reasoning rather than weak React syntax."
        />

        <SectionHeader>Three Cache Ideas to Keep Straight</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "purpose", label: "Purpose" },
            { key: "notes", label: "What to remember" },
          ]}
          rows={[
            {
              label: "Request memoization",
              values: {
                purpose: "Deduplicates identical fetches during a single render pass.",
                notes: "This avoids repeated work inside one request, but it is not a long-term cache.",
              },
            },
            {
              label: "Data cache",
              values: {
                purpose: "Stores fetch results or other cached server work across requests.",
                notes: "This is what revalidation APIs target.",
              },
            },
            {
              label: "Router cache",
              values: {
                purpose: "Stores route payloads on the client for faster navigation.",
                notes: "A client refresh is not the same thing as invalidating server data.",
              },
            },
          ]}
        />

        <SectionHeader>Common Cache Controls</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// Cache and revalidate every hour
await fetch("https://api.example.com/products", {
  next: { revalidate: 3600, tags: ["products"] },
});

// Force dynamic behavior
await fetch("https://api.example.com/me", {
  cache: "no-store",
});`}
        />
        <Paragraph>
          The hard part is not memorizing the options. It is deciding which data
          can be stale, for how long, and how invalidation should happen after a
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
            "Use `revalidateTag` when multiple pages depend on the same conceptual data set.",
            "Use `revalidatePath` when a specific route tree must be refreshed.",
            "After a mutation, choose invalidation based on data relationships, not just whichever API is easiest to type.",
          ]}
        />

        <SectionHeader>Cache Strategy Thinking</SectionHeader>
        <BulletList
          items={[
            "Public catalog data usually tolerates staleness and benefits from tags plus timed revalidation.",
            "User profile or billing data usually should not depend on long-lived shared caches.",
            "Write-heavy admin areas need a read-your-own-writes strategy, not just background eventual consistency.",
          ]}
        />
        <Callout variant="warning">
          `router.refresh()` refreshes the current route from the client, but it
          does not replace a deliberate server-side invalidation strategy.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsCachingAndRevalidation;
