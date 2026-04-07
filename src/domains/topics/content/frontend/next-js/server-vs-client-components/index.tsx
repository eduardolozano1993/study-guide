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
import { nextJsServerVsClientComponentsLesson } from "./meta";

export function NextJsServerVsClientComponents() {
  return (
    <TopicLessonPage
      title={nextJsServerVsClientComponentsLesson.title}
      summary={nextJsServerVsClientComponentsLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsServerVsClientComponentsLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsServerVsClientComponentsLesson.difficulty}
      relatedTopics={[
        { label: "Data Fetching", href: "/topic/nextjs-data-fetching" },
        { label: "Performance", href: "/topic/nextjs-performance" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Server vs Client Components"
          description="This topic matters because the boundary changes bundle size, secret safety, serialization rules, and where stateful interactivity is allowed. Senior answers explain the boundary, not just the syntax."
        />

        <SectionHeader>Different Execution Environments</SectionHeader>
        <Paragraph>
          Server Components run on the server during rendering. Client
          Components run in the browser after hydration. The `"use client"`
          directive is not just a hook enabler. It is a bundling boundary that
          moves that module into client-side JavaScript.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "server", label: "Server Component" },
            { key: "client", label: "Client Component" },
          ]}
          rows={[
            {
              label: "Best for",
              values: {
                server: "Data access, auth-aware rendering, secret usage, and reducing client bundle size.",
                client: "Interactivity, event handlers, local state, browser APIs, and effects.",
              },
            },
            {
              label: "Key limitation",
              values: {
                server: "Cannot attach DOM events or use client-only hooks like `useState`.",
                client: "Cannot safely hold trusted secrets or become the true authorization boundary.",
              },
            },
            {
              label: "Hidden cost",
              values: {
                server: "You must respect serialization and server/client composition rules.",
                client: "Every high-level boundary ships more JavaScript and hydration work.",
              },
            },
          ]}
        />

        <SectionHeader>Composition Boundaries Matter</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// app/products/page.tsx
import ProductFilters from "./ProductFilters";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      <ProductFilters />
      <ProductGrid products={products} />
    </div>
  );
}

// app/products/ProductFilters.tsx
"use client";

import { useState } from "react";

export default function ProductFilters() {
  const [query, setQuery] = useState("");

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}`}
        />
        <Paragraph>
          This is a healthy split: the server handles data-heavy rendering while
          a small interactive island handles browser-only concerns.
        </Paragraph>

        <SectionHeader>Serialization and Bundle Thinking</SectionHeader>
        <BulletList
          items={[
            "Pass serializable data from server to client instead of moving the entire tree client-side.",
            "Keep `use client` as low as possible so static presentation and data composition stay on the server.",
            "Do not pass functions or privileged server objects through the boundary unless the framework explicitly supports that pattern.",
            "If a parent becomes a Client Component, many descendants may get pulled into the client bundle unnecessarily.",
          ]}
        />
        <Callout variant="warning">
          A weak answer is `use client means interactive`. A stronger answer is
          `use client creates a client bundle boundary, so I keep it low in the
          tree and move only the interactive island`.
        </Callout>

        <SectionHeader>Common Failure Modes</SectionHeader>
        <BulletList
          items={[
            "Turning a whole route into a Client Component because one button needs state.",
            "Trying to read secrets or trust authorization decisions in client-only code.",
            "Forgetting that context providers and interactivity often need client boundaries, so placement affects bundle shape.",
            "Assuming server components remove all client fetching needs even when live, user-driven state still exists.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why should `use client` usually stay low in the tree?",
              "What kinds of props can cross the server-client boundary safely?",
              "When would you keep a route-level shell on the server but carve out a client island?",
              "Why is moving auth-sensitive logic to the client both a security and architecture mistake?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsServerVsClientComponents;
