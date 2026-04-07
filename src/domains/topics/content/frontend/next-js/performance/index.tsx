import {
  BulletList,
  Callout,
  CodeBlock,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { nextJsPerformanceLesson } from "./meta";

export function NextJsPerformance() {
  return (
    <TopicLessonPage
      title={nextJsPerformanceLesson.title}
      summary={nextJsPerformanceLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsPerformanceLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsPerformanceLesson.difficulty}
      relatedTopics={[
        { label: "Rendering Model", href: "/topic/nextjs-rendering-model" },
        { label: "Server vs Client Components", href: "/topic/nextjs-server-vs-client-components" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Performance"
          description="Good answers tie Next.js primitives to user-perceived speed: LCP, INP, CLS, hydration cost, server latency, and how much JavaScript reaches the browser."
        />

        <SectionHeader>High-Impact Performance Levers</SectionHeader>
        <BulletList
          items={[
            "Use Server Components to reduce shipped JavaScript and hydration work.",
            "Split slow data behind Suspense boundaries so the route can stream earlier content.",
            "Optimize images and fonts with framework primitives, but only when their usage actually matches the page’s needs.",
            "Keep client boundaries low in the tree so bundle and hydration costs stay proportional to real interactivity.",
          ]}
        />

        <SectionHeader>Image, Font, And Prefetch Tradeoffs</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`import Image from "next/image";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

export default function Hero() {
  return (
    <section className={geist.className}>
      <Image
        src="/hero.jpg"
        alt="Product hero"
        width={1600}
        height={900}
        priority
      />
    </section>
  );
}`}
        />
        <BulletList
          items={[
            "`next/image` helps responsive delivery and layout stability, but misusing it can still bloat LCP if the image is too large or prioritized incorrectly.",
            "Font optimization helps CLS and render behavior, but loading too many variants still costs real bytes.",
            "Prefetching can make navigation feel instant, but over-prefetching burns bandwidth and compute on routes users may never visit.",
          ]}
        />

        <SectionHeader>Hydration, Bundle Boundaries, And Measurement</SectionHeader>
        <BulletList
          items={[
            "LCP often depends on rendering model choice, server delay, critical asset delivery, and whether the main content waits on client work.",
            "INP often suffers when hydration and client-side JavaScript are too heavy on interactive routes.",
            "CLS improves when image dimensions, font behavior, and dynamic layout slots are stable from the start.",
            "Measure server and client bundle boundaries, route payloads, and Web Vitals instead of assuming the framework default is already optimal.",
          ]}
        />
        <Callout variant="note">
          A senior-level answer should mention measurement. Performance work
          should be driven by profiling, Web Vitals, bundle inspection, and
          real-user telemetry, not framework folklore.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsPerformance;
