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
import { performanceFundamentalsLesson } from "./meta";

export function PerformanceFundamentals() {
  return (
    <TopicLessonPage
      title={performanceFundamentalsLesson.title}
      summary={performanceFundamentalsLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={performanceFundamentalsLesson.estimatedReadingTimeMinutes}
      difficulty={performanceFundamentalsLesson.difficulty}
      relatedTopics={[
        { label: "Browser Rendering Basics", href: "/topic/browser-rendering" },
        { label: "Network and Browser APIs", href: "/topic/network-browser-apis" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="P"
          title="Performance Fundamentals"
          description="Good interview answers separate loading performance, runtime responsiveness, and rendering smoothness, then prioritize the largest bottlenecks first."
        />

        <CollapsibleSection title="Three Performance Buckets" collapsible={false}>
          <Paragraph>
            Frontend performance is easier to reason about when split into three
            buckets: how fast useful content appears, how responsive the app is
            to interaction, and how smoothly it renders during updates.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Think in buckets:
- load: bundle size, network, render blocking
- interaction: main-thread work, event handling, async state
- rendering: layout, paint, animation, scroll jank`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="High-Impact Wins Interviewers Expect" collapsible={false}>
          <Paragraph>
            The strongest basics answers usually mention shipping less
            JavaScript, lazy-loading non-critical code, optimizing images,
            caching static assets, and reducing avoidable rendering work.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Common wins:
- ship less JavaScript
- split routes and heavy features
- optimize image format and dimensions
- cache static assets
- avoid unnecessary re-renders
- keep expensive layout work off hot paths`}
          />
          <Callout variant="tip">
            Interviewers usually prefer a short list of high-leverage
            techniques over a long checklist of micro-optimizations.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Practical Techniques</SectionHeader>

        <CollapsibleSection title="Code Splitting and Lazy Loading" collapsible={false}>
          <Paragraph>
            Do not force rarely visited routes or heavy admin tools into the
            initial bundle. Load them when the user actually needs them.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`const SettingsPage = React.lazy(() => import("./SettingsPage"));
const AnalyticsPanel = React.lazy(() => import("./AnalyticsPanel"));`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Media and Layout Stability" collapsible={false}>
          <CodeBlock
            language="html"
            code={`<img
  src="/hero.webp"
  alt="Team dashboard preview"
  width="1200"
  height="800"
  loading="lazy"
/>`}
          />
          <Paragraph>
            Choosing the right format, compressing aggressively, and reserving
            dimensions to avoid layout shift are baseline performance skills.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Measure Before Optimizing">
          <Paragraph>
            Performance work is easy to cargo-cult. A credible answer mentions
            measuring with browser devtools, network waterfalls, Lighthouse, or
            profiling before introducing memoization or architecture changes.
          </Paragraph>
          <Callout variant="warning">
            Reaching for memoization first is often a sign that the real
            bottleneck has not been identified.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Budgets, Prioritization, and Measurement</SectionHeader>

        <CollapsibleSection title="Network Cost vs Main-Thread Cost vs Rendering Cost" collapsible={false}>
          <BulletList
            items={[
              "Network cost covers payload size, request count, caching behavior, image delivery, and server latency.",
              "Main-thread cost covers parsing, script execution, hydration, event handling, and heavy JavaScript work after data arrives.",
              "Rendering cost covers style recalculation, layout, paint, compositing, and animation smoothness.",
              "Strong answers identify which bucket is dominant before choosing an optimization strategy.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Performance Budgets Force Better Decisions" collapsible={false}>
          <Paragraph>
            Budgets turn performance into a product constraint instead of a
            vague aspiration. Teams can budget bundle size, image weight,
            interaction latency, or Core Web Vitals targets so tradeoffs stay
            visible during development.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="A Practical Measurement Stack" collapsible={false}>
          <BulletList
            items={[
              "Use Lighthouse for lab-style audits and quick regressions in controlled conditions.",
              "Use Real User Monitoring to understand what actual users experience on real devices and networks.",
              "Use browser DevTools and profilers for local diagnosis when you need to trace a specific bottleneck.",
              "Do not assume a micro-optimization matters until measurement shows it moves a meaningful user metric.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How would you decide whether bundle size, server latency, render work, or images deserve attention first?",
              "Why are performance budgets useful on a frontend team?",
              "What is the difference between lab tools like Lighthouse and field data from real users?",
              "Why can a local micro-optimization miss the real bottleneck completely?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Equating frontend performance only with algorithmic complexity.",
              "Talking about memoization before bundle size, images, or render blocking.",
              "Ignoring the difference between network cost, main-thread cost, and rendering cost.",
              "Ignoring the difference between initial load and interaction performance.",
              "Not mentioning layout shift, image sizing, or expensive main-thread work.",
              "Suggesting optimizations without any plan to measure impact.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default PerformanceFundamentals;
