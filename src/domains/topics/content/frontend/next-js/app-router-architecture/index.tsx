import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  SubHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { nextJsAppRouterArchitectureLesson } from "./meta";

export function NextJsAppRouterArchitecture() {
  return (
    <TopicLessonPage
      title={nextJsAppRouterArchitectureLesson.title}
      summary={nextJsAppRouterArchitectureLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsAppRouterArchitectureLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsAppRouterArchitectureLesson.difficulty}
      relatedTopics={[
        { label: "Routing", href: "/topic/nextjs-routing" },
        { label: "Server vs Client Components", href: "/topic/nextjs-server-vs-client-components" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="App Router Architecture"
          description="The App Router is more than file-based routing. It is the composition model for layouts, streaming, loading states, errors, metadata, persistence, and server boundaries."
        />

        <SectionHeader>Segments Define Composition Boundaries</SectionHeader>
        <Paragraph>
          In the App Router, each folder under `app/` is a route segment.
          Special files define how that segment renders, loads, fails, or nests
          into the rest of the tree.
        </Paragraph>
        <CodeBlock
          language="text"
          code={`app/
  layout.tsx
  page.tsx
  dashboard/
    layout.tsx
    page.tsx
    loading.tsx
    error.tsx
    analytics/
      page.tsx
  blog/
    [slug]/
      page.tsx
      not-found.tsx`}
        />

        <SectionHeader>Layouts Persist, Costs Also Persist</SectionHeader>
        <Paragraph>
          Layouts let you persist shared UI and stateful shells across sibling
          navigations. That is powerful, but a broad parent layout can also
          accidentally make a large route tree dynamic or expensive if it reads
          request-bound data too high in the tree.
        </Paragraph>
        <SubHeader>Use layouts for structure, not accidental global work</SubHeader>
        <BulletList
          items={[
            "High-level auth, tenant, or cookie reads can change rendering behavior for many descendants.",
            "Persistent layouts are great for shells, but they also change what remounts and what state is preserved.",
            "When a segment remounts unexpectedly, start by checking whether the boundary moved, the layout changed, or dynamic inputs bubbled upward.",
          ]}
        />

        <SectionHeader>Parallel Routes, Intercepting Routes, And Real Use Cases</SectionHeader>
        <CodeBlock
          language="text"
          code={`app/
  dashboard/
    @analytics/page.tsx
    @activity/page.tsx
    layout.tsx
  feed/
    page.tsx
    (.)post/[id]/page.tsx
  (marketing)/
    pricing/page.tsx
  (app)/
    dashboard/page.tsx`}
        />
        <BulletList
          items={[
            "Route groups like `(marketing)` organize folders without affecting the URL.",
            "Parallel routes let one layout render several independent slots, which is useful for dashboard panels or staged detail regions.",
            "Intercepting routes support modal-style navigation where detail pages overlay the current context instead of replacing it completely.",
          ]}
        />

        <SectionHeader>Debugging Questions Senior Engineers Actually Ask</SectionHeader>
        <BulletList
          items={[
            "Why is this segment remounting? Check identity, layout boundaries, and whether the segment moved in the tree.",
            "Why did this route suddenly become dynamic? Look for cookies, headers, or uncached fetches introduced above it.",
            "Why is `loading.tsx` not behaving as expected? Inspect where the async boundary lives and what is actually streaming.",
            "Why is parent state preserved here but reset there? Follow segment and layout persistence rules instead of assuming every navigation is a full page change.",
          ]}
        />
        <Callout variant="note">
          `loading.tsx` and `error.tsx` are architectural tools, not just UI
          polish. They define where latency and failures are isolated.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How do layouts affect persistence, remounting, and route cost?",
              "When would you use parallel routes or intercepting routes in a real product?",
              "Why can a broad parent layout accidentally make a large subtree dynamic?",
              "How would you debug a segment that remounts or a loading boundary that feels wrong?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsAppRouterArchitecture;
