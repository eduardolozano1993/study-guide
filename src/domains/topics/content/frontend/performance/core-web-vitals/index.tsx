import {
  BulletList,
  Callout,
  ComparisonTable,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { coreWebVitalsLesson } from "./meta";

export function CoreWebVitals() {
  return (
    <TopicLessonPage
      title={coreWebVitalsLesson.title}
      summary={coreWebVitalsLesson.summary}
      eyebrow="Frontend / Performance"
      estimatedReadingTimeMinutes={coreWebVitalsLesson.estimatedReadingTimeMinutes}
      difficulty={coreWebVitalsLesson.difficulty}
      relatedTopics={[
        { label: "Browser Rendering Basics", href: "/topic/browser-rendering" },
        { label: "Performance Fundamentals", href: "/topic/performance-fundamentals" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="P"
          title="Core Web Vitals"
          description="Core Web Vitals are user-centric performance metrics. Interviewers use them to test whether you can connect engineering changes to actual user experience."
        />

        <Paragraph>
          The key point is that each metric stands for a different kind of user
          experience problem. A good answer explains what the metric represents
          before listing optimizations.
        </Paragraph>

        <ComparisonTable
          columns={[
            { key: "meaning", label: "What it tells you" },
            { key: "improve", label: "How it is often improved" },
          ]}
          rows={[
            {
              label: "LCP",
              values: {
                meaning: "How quickly the main visible content becomes useful.",
                improve: "Reduce server delay, ship less blocking CSS and JS, optimize images, and cache aggressively.",
              },
            },
            {
              label: "INP",
              values: {
                meaning: "How responsive the page feels after user interaction.",
                improve: "Reduce main-thread work, split heavy tasks, and avoid blocking handlers.",
              },
            },
            {
              label: "CLS",
              values: {
                meaning: "How visually stable the page is while loading and updating.",
                improve: "Reserve space for media, avoid late layout shifts, and size dynamic elements predictably.",
              },
            },
          ]}
        />

        <Callout variant="warning">
          Interview answers are weaker when they list optimizations without
          connecting them to the specific metric being improved.
        </Callout>

        <BulletList
          items={[
            "LCP is mainly about meaningful content appearing quickly.",
            "INP is mainly about interaction responsiveness and main-thread work.",
            "CLS is mainly about visual stability and predictable layout.",
            "Measure real-user behavior and not just synthetic lab scores when possible.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default CoreWebVitals;
