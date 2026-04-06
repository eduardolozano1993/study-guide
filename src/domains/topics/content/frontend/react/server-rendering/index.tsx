import {
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
          description="Senior candidates should understand how SSR, SSG, hydration, streaming, and React Server Components affect performance, data fetching, and application architecture."
        />

        <SectionHeader>SSR, SSG, and Hydration</SectionHeader>
        <Paragraph>
          SSR renders HTML on the server near request time so users see
          meaningful markup sooner. SSG pre-renders pages ahead of time, which
          works well for content that changes infrequently.
        </Paragraph>
        <Paragraph>
          Hydration is the client process that attaches React behavior to that
          pre-rendered HTML. Server rendering improves time-to-content, but it
          also adds complexity around data boundaries, caching, and browser-only
          code.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "ssr", label: "SSR" },
            { key: "ssg", label: "SSG" },
          ]}
          rows={[
            {
              label: "Freshness",
              values: {
                ssr: "Better for user-specific or fast-changing data.",
                ssg: "Best for stable content that can be generated ahead of time.",
              },
            },
            {
              label: "Cost model",
              values: {
                ssr: "More runtime work on the request path.",
                ssg: "More build-time work, cheaper request path.",
              },
            },
          ]}
        />

        <SectionHeader>Streaming and React Server Components</SectionHeader>
        <Paragraph>
          Streaming lets the server send parts of the UI incrementally instead
          of waiting for the whole page to be ready. React Server Components
          shift some rendering and data access to the server, reducing client
          bundle size for those parts of the tree.
        </Paragraph>

        <SectionHeader>Next.js Mental Model</SectionHeader>
        <Paragraph>
          Next.js is an opinionated runtime for deciding which code runs on the
          server, which runs on the client, how data is fetched, and how output
          is cached.
        </Paragraph>
        <CollapsibleSection title="Hydration pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Rendering different initial content on server and client causes mismatch warnings.</li>
            <li>Direct access to `window` or `document` during server rendering breaks execution.</li>
            <li>Overusing client components can erase bundle-size and latency benefits.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactServerRendering;
