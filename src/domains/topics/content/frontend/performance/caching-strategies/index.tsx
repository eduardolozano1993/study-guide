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
import { cachingStrategiesLesson } from "./meta";

export function CachingStrategies() {
  return (
    <TopicLessonPage
      title={cachingStrategiesLesson.title}
      summary={cachingStrategiesLesson.summary}
      eyebrow="Frontend / Performance"
      estimatedReadingTimeMinutes={cachingStrategiesLesson.estimatedReadingTimeMinutes}
      difficulty={cachingStrategiesLesson.difficulty}
      relatedTopics={[
        { label: "Code Splitting", href: "/topic/code-splitting" },
        { label: "Core Web Vitals", href: "/topic/core-web-vitals" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="P"
          title="Caching Strategies"
          description="Caching is one of the highest-leverage performance tools, but every cache introduces a freshness and invalidation tradeoff. Senior answers keep cache owners, lifetimes, and failure modes separate."
        />

        <SectionHeader>Different Caches Have Different Owners</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "owner", label: "Who owns it" },
            { key: "risk", label: "Typical failure mode" },
          ]}
          rows={[
            {
              label: "Browser cache",
              values: {
                owner: "The browser obeying response caching headers.",
                risk: "Stale assets when versioning is weak or headers are inconsistent.",
              },
            },
            {
              label: "CDN or edge cache",
              values: {
                owner: "The delivery layer in front of origin servers.",
                risk: "Serving public cached responses too broadly or mishandling personalized data.",
              },
            },
            {
              label: "Application cache",
              values: {
                owner: "The app or framework caching fetched data or computed results.",
                risk: "Correct data exists at origin, but invalidation leaves the UI stale.",
              },
            },
            {
              label: "Service worker cache",
              values: {
                owner: "Client-side offline or repeat-visit logic.",
                risk: "Cache coherence becomes hard when network and client state disagree.",
              },
            },
          ]}
        />

        <SectionHeader>Static Assets vs Fresh Data</SectionHeader>
        <CollapsibleSection title="Static asset caching" collapsible={false}>
          <CodeBlock
            language="text"
            code={`Cache-Control: public, max-age=31536000, immutable`}
          />
          <Paragraph>
            This pattern is common for fingerprinted assets whose filenames
            change when content changes. It allows aggressive caching without
            serving the wrong version forever.
          </Paragraph>
        </CollapsibleSection>
        <Paragraph>
          Data caching is harder than asset caching because users care about
          freshness, read-your-own-writes behavior, and privacy. Strategies like
          stale-while-revalidate, background refresh, and short TTLs only make
          sense when the business can tolerate the staleness window.
        </Paragraph>

        <SectionHeader>Invalidation Is the Hard Part</SectionHeader>
        <BulletList
          items={[
            "Versioned static assets are easy because the filename change is the invalidation strategy.",
            "API and application data are harder because writes must invalidate the right scope without blowing away everything.",
            "Personalized data needs extra care because shared caches can leak private state if boundaries are wrong.",
            "Service worker caches can improve repeat visits, but offline-first behavior needs explicit consistency rules so old responses do not linger forever.",
          ]}
        />
        <Callout variant="tip">
          In interviews, explain that caching is not only about speed. It is
          about deciding when stale data is acceptable and how correctness is
          restored after writes.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What is the difference between browser, CDN, application, and service-worker caches?",
              "Why is invalidation usually harder than adding a cache?",
              "How would you cache versioned static assets differently from personalized API data?",
              "What can go wrong when several cache layers all think they own freshness?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CachingStrategies;
