import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
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
          description="Caching is one of the most important performance levers, but every cache introduces a freshness and invalidation tradeoff."
        />

        <SectionHeader>Where Caching Happens</SectionHeader>
        <BulletList
          items={[
            "Browser caching for static assets like JS, CSS, fonts, and images.",
            "CDN and edge caching for globally distributed responses.",
            "Application-level caches for fetched data or computed results.",
            "Service-worker-assisted caching for offline or repeat-visit scenarios.",
          ]}
        />

        <CollapsibleSection title="Static asset caching" collapsible={false}>
          <CodeBlock
            language="text"
            code={`Cache-Control: public, max-age=31536000, immutable`}
          />
          <Paragraph>
            This pattern is common for fingerprinted assets whose filenames
            change when content changes. It allows very aggressive caching
            without serving stale versions forever.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Data freshness tradeoffs">
          <Paragraph>
            Data caching is harder than asset caching because users care about
            freshness. Strategies like stale-while-revalidate, background
            refresh, and short TTL caches try to balance speed with correctness.
          </Paragraph>
          <Callout variant="tip">
            In interviews, explain that caching is not only about speed. It is
            about choosing when stale data is acceptable and how invalidation
            works.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common interview pitfalls">
          <BulletList
            items={[
              "Talking about caching as if invalidation is trivial.",
              "Using long-lived caching without a versioning strategy.",
              "Applying aggressive caching to freshness-sensitive data without explaining the tradeoff.",
              "Ignoring the difference between static asset caching and API response caching.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CachingStrategies;
