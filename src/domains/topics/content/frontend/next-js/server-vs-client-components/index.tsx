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
          description="This is one of the most important modern Next.js interview topics because it affects performance, security, data access, and the mental model for React code placement."
        />

        <SectionHeader>Different Execution Environments</SectionHeader>
        <Paragraph>
          Server Components run on the server during rendering. Client
          Components run in the browser after hydration. The `"use client"`
          directive does not just enable hooks. It defines a bundling boundary
          and moves that module into client-side JavaScript.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "server", label: "Server Component" },
            { key: "client", label: "Client Component" },
          ]}
          rows={[
            {
              label: "Runs in",
              values: {
                server: "Server runtime during render.",
                client: "Browser after hydration, plus initial server rendering support.",
              },
            },
            {
              label: "Best for",
              values: {
                server: "Data access, auth-aware rendering, secret usage, and reducing JS bundles.",
                client: "Interactivity, event handlers, local state, browser APIs, and effects.",
              },
            },
            {
              label: "Cannot do",
              values: {
                server: "Attach DOM events or use client-only hooks like `useState`.",
                client: "Safely access server secrets or talk directly to privileged backends.",
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
          a small interactive island handles only browser concerns.
        </Paragraph>

        <SectionHeader>Bundle Impact</SectionHeader>
        <BulletList
          items={[
            "Every client boundary increases JavaScript shipped to the browser.",
            "Marking a high-level component as client often pulls many children into the client bundle unnecessarily.",
            "Keeping data-heavy presentation on the server can dramatically reduce hydration cost and improve startup performance.",
          ]}
        />
        <Callout variant="warning">
          A weak answer is `use client means interactive`. A stronger answer is
          `use client creates a client bundle boundary, so I keep it as low in
          the tree as possible`.
        </Callout>

        <SectionHeader>Practical Boundary Rules</SectionHeader>
        <BulletList
          items={[
            "Default to Server Components for route-level UI and data composition.",
            "Use Client Components for forms, toggles, tabs, optimistic UI, and browser events.",
            "Pass serializable data from server to client instead of moving the entire tree client-side.",
            "Keep secrets, database access, and trusted authorization checks on the server.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default NextJsServerVsClientComponents;
