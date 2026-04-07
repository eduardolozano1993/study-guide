import {
  BulletList,
  Callout,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { reactServerRenderingLesson } from "./meta";

export function ReactServerRendering() {
  return (
    <TopicLessonPage
      title={reactServerRenderingLesson.title}
      summary={reactServerRenderingLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactServerRenderingLesson.estimatedReadingTimeMinutes}
      difficulty={reactServerRenderingLesson.difficulty}
      relatedTopics={[
        { label: "Data Fetching", href: "/topic/react-data-fetching" },
        { label: "Architecture", href: "/topic/react-architecture" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Server Rendering"
          description="Senior candidates should connect SSR, SSG, streaming, hydration, and React Server Components to latency, cacheability, bundle size, SEO, and operational complexity."
        />

        <SectionHeader>SSR, SSG, Streaming, and React Server Components</SectionHeader>
        <Paragraph>
          Server rendering is not one thing. Different techniques optimize
          different constraints: request-time freshness, CDN cacheability, fast
          first content, smaller bundles, or lower infrastructure cost.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "best", label: "Best fit" },
            { key: "cost", label: "Main cost or risk" },
          ]}
          rows={[
            {
              label: "SSR",
              values: {
                best: "Request-time data, auth-aware pages, or personalized content.",
                cost: "More work on the request path and more infrastructure sensitivity.",
              },
            },
            {
              label: "SSG",
              values: {
                best: "Public content that can be generated ahead of time and cached broadly.",
                cost: "Content freshness and rebuild coordination.",
              },
            },
            {
              label: "Streaming",
              values: {
                best: "Pages where part of the UI can appear early while slower work continues.",
                cost: "More complex loading boundaries and debugging.",
              },
            },
            {
              label: "React Server Components",
              values: {
                best: "Server-side data-heavy UI that benefits from shipping less client JavaScript.",
                cost: "New mental models around boundaries, serialization, and cache coordination.",
              },
            },
          ]}
        />

        <SectionHeader>Hydration Mismatches and Browser-Only Failures</SectionHeader>
        <Paragraph>
          Hydration attaches React behavior to server-rendered HTML. If the
          server output and the client&apos;s first render differ, the app can show
          warnings, unexpected remounts, or subtle production bugs.
        </Paragraph>
        <BulletList
          items={[
            "Reading `window`, `document`, time, random values, or viewport-dependent data during the initial render can create mismatches.",
            "Conditional UI that depends on browser-only state should often move behind an effect or a client-only boundary.",
            "A hydration bug is not just a console warning. It can break event attachment, reset user input, or cause layout flicker.",
          ]}
        />
        <Callout variant="warning">
          Strong answers distinguish better SEO or faster first content from
          overall lower complexity. Server rendering often improves one axis
          while making others harder.
        </Callout>

        <SectionHeader>Data Boundaries and Cache Coordination</SectionHeader>
        <Paragraph>
          Moving work to the server changes where fetching happens, but it does
          not remove the need to reason about freshness, duplication, and cache
          invalidation. A route can easily fetch once on the server, refetch on
          the client, and still show stale state after a mutation if boundaries
          are unclear.
        </Paragraph>
        <BulletList
          items={[
            "Define which data belongs to the server-rendered shell and which data updates interactively on the client.",
            "Avoid accidental double fetching across server and client layers unless the UX benefit is intentional.",
            "Ask whether SEO, cacheability, and bundle-size wins justify the extra infrastructure and observability burden.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How would you compare SSR, SSG, streaming, and React Server Components for a personalized dashboard versus a public marketing page?",
              "What causes hydration mismatch bugs, and how would you debug one?",
              "Why can server rendering improve SEO but still be the wrong tradeoff for some routes?",
              "How do duplicated fetching and weak cache coordination show up in server-rendered apps?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactServerRendering;
