import {
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="Good answers tie framework features to user-perceived speed: faster first render, less JavaScript, fewer waterfalls, smoother transitions, and better Core Web Vitals."
        />

        <SectionHeader>High-Impact Performance Levers</SectionHeader>
        <BulletList
          items={[
            "Use Server Components to reduce shipped JavaScript.",
            "Split slow data behind Suspense boundaries to stream earlier content.",
            "Optimize images and fonts with framework primitives instead of raw tags by default.",
            "Avoid promoting large trees to Client Components unless they truly need browser interactivity.",
          ]}
        />

        <SectionHeader>Image and Font Optimization</SectionHeader>
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
        <Paragraph>
          These primitives help with responsive image delivery, layout
          stability, and font loading behavior. They are not magic, but they
          remove a lot of avoidable mistakes.
        </Paragraph>

        <SectionHeader>Prefetching, Streaming, and Bundle Control</SectionHeader>
        <BulletList
          items={[
            "Route prefetching helps repeated app-style navigation feel instant.",
            "Streaming prevents one slow subtree from blocking first paint for the entire route.",
            "Bundle control starts with good server/client boundaries before it reaches memoization or micro-optimizations.",
          ]}
        />

        <SectionHeader>Core Web Vitals Thinking</SectionHeader>
        <BulletList
          items={[
            "LCP improves when critical content renders sooner and large assets are optimized.",
            "INP improves when hydration and client-side JavaScript stay under control.",
            "CLS improves when media dimensions and layout slots are stable from the first render.",
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
