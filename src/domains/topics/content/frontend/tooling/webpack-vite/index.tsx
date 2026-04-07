import {
  BulletList,
  Callout,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { webpackViteLesson } from "./meta";

export function WebpackVite() {
  return (
    <TopicLessonPage
      title={webpackViteLesson.title}
      summary={webpackViteLesson.summary}
      eyebrow="Frontend / Tooling"
      estimatedReadingTimeMinutes={webpackViteLesson.estimatedReadingTimeMinutes}
      difficulty={webpackViteLesson.difficulty}
      relatedTopics={[
        { label: "Babel and TypeScript", href: "/topic/babel-typescript" },
        { label: "Code Splitting", href: "/topic/code-splitting" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Webpack vs Vite"
          description="This topic is really about build architecture. Interviewers want to know why the developer experience differs, what happens in production, and when migration is straightforward versus painful."
        />

        <SectionHeader>Why The Development Experience Feels Different</SectionHeader>
        <Paragraph>
          Webpack bundles the module graph during development and production.
          Vite serves source modules over native ESM in development and uses a
          separate production build step. That architectural difference is the
          reason Vite dev servers often feel much faster.
        </Paragraph>

        <ComparisonTable
          columns={[
            { key: "webpack", label: "Webpack" },
            { key: "vite", label: "Vite" },
          ]}
          rows={[
            {
              label: "Dev model",
              values: {
                webpack: "Builds and serves through a dev bundle pipeline.",
                vite: "Serves source modules over native ESM with fast transforms.",
              },
            },
            {
              label: "Strength",
              values: {
                webpack: "Deep configurability, mature loader ecosystem, and strong legacy flexibility.",
                vite: "Fast startup, fast HMR, and simpler modern defaults.",
              },
            },
            {
              label: "Main tradeoff",
              values: {
                webpack: "Can become config-heavy and operationally expensive to maintain.",
                vite: "Migration can get awkward when the build depends on unusual webpack-era assumptions.",
              },
            },
          ]}
        />

        <SectionHeader>Production Nuance</SectionHeader>
        <BulletList
          items={[
            "Vite being fast usually describes development experience, not a universal production win in every codebase.",
            "Production performance still depends on chunking, plugin behavior, SSR strategy, asset handling, and what the final bundler emits.",
            "Webpack can remain the right choice when a legacy build has deep custom loaders, enterprise constraints, or unusual integration points that are expensive to reproduce.",
            "Migration cost matters: a tool that is cleaner in theory may not be cheaper once plugin gaps, SSR behavior, or monorepo assumptions are counted.",
          ]}
        />

        <SectionHeader>Migration and Ecosystem Tradeoffs</SectionHeader>
        <BulletList
          items={[
            "Ask about plugin ecosystem needs, SSR support, library mode, monorepo behavior, and unusual asset pipelines before calling migration easy.",
            "A large webpack setup may encode years of product constraints, not just outdated preferences.",
            "If the build depends on custom loaders or highly specialized transforms, migration can be more like a platform rewrite than a config cleanup.",
          ]}
        />
        <Callout variant="tip">
          A senior answer should say Vite feels faster in dev because it avoids
          eagerly bundling the whole app before serving it, then immediately add
          that production and migration tradeoffs still need separate analysis.
        </Callout>

        <SectionHeader>Interviewer Questions</SectionHeader>
        <BulletList
          items={[
            "Why does Vite often feel faster than webpack during development?",
            "Why is `Vite is faster` an incomplete answer for production decisions?",
            "What kinds of webpack customizations make migration harder than the simple narrative suggests?",
            "How do SSR support, plugin ecosystem fit, and monorepo constraints affect the choice?",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default WebpackVite;
