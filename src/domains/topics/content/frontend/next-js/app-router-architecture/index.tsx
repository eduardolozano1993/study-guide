import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  SubHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="The App Router is more than file-based routing. It is the composition model for layouts, streaming, loading states, errors, metadata, and server boundaries."
        />

        <SectionHeader>Folders Define Route Segments</SectionHeader>
        <Paragraph>
          In the App Router, each folder under `app/` is a route segment.
          Special files inside those folders define how the segment renders,
          loads, fails, or nests into the rest of the tree.
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

        <SectionHeader>Nested Layouts and Persistent UI</SectionHeader>
        <Paragraph>
          Layouts let you persist shared UI and stateful shells across sibling
          navigations. That means the dashboard sidebar or top navigation does
          not remount on every child page transition.
        </Paragraph>
        <SubHeader>Use layouts for structure, not request-specific work</SubHeader>
        <Paragraph>
          If a parent layout reads auth state or tenant data, every child route
          inherits that cost and that rendering mode. Senior candidates should
          recognize that broad layouts can accidentally make large parts of the
          tree dynamic.
        </Paragraph>

        <SectionHeader>Special Files Define Behavior</SectionHeader>
        <BulletList
          items={[
            "`page.tsx` is the leaf UI for a route.",
            "`layout.tsx` wraps child segments and persists across navigation.",
            "`loading.tsx` provides an instant fallback while the segment streams.",
            "`error.tsx` defines a React error boundary for the segment subtree.",
            "`not-found.tsx` renders when the route cannot resolve the requested resource.",
          ]}
        />
        <Callout variant="note">
          `loading.tsx` and `error.tsx` are architectural tools, not just UI
          polish. They define where latency and failures are isolated.
        </Callout>

        <SectionHeader>Advanced Segment Patterns</SectionHeader>
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
            "Parallel routes such as `@analytics` and `@activity` let one layout render multiple independent slots at once.",
            "Intercepting routes like `(.)post/[id]` are useful for modal-style navigation where a detail page overlays the current context.",
          ]}
        />

        <CollapsibleSection title="How loading, errors, and not-found differ">
          <BulletList
            items={[
              "`loading.tsx` handles latency before the segment is ready.",
              "`error.tsx` handles thrown errors after rendering or data work fails.",
              "`not-found.tsx` handles expected missing-resource cases, often after `notFound()` is called.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interview pitfalls to avoid">
          <BulletList
            items={[
              "Explaining the App Router only as folder-based URLs and ignoring layouts, streaming, and server boundaries.",
              "Using a high-level layout for everything, then wondering why many pages became dynamic.",
              "Confusing route groups with actual path segments.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsAppRouterArchitecture;
