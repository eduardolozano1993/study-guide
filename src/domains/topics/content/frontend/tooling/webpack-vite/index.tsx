import {
  BulletList,
  Callout,
  ComparisonTable,
  Paragraph,
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
          description="This topic is really about build architecture. Interviewers want to know whether you understand why the developer experience differs, not just which tool feels faster."
        />

        <Paragraph>
          Webpack bundles the module graph during development and production.
          Vite uses native ESM in development and delegates production bundling
          to a build step. That architectural difference is the reason Vite dev
          servers often feel much faster.
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
              label: "Best known for",
              values: {
                webpack: "Deep configurability and mature ecosystem.",
                vite: "Fast startup, fast HMR, and simpler modern defaults.",
              },
            },
            {
              label: "Tradeoff",
              values: {
                webpack: "Can be heavy and config-intensive.",
                vite: "Usually simpler, but some edge integrations still need tooling awareness.",
              },
            },
          ]}
        />

        <Callout variant="tip">
          A senior answer should mention that Vite feels faster in dev because
          it avoids eagerly bundling the whole app before serving it.
        </Callout>

        <BulletList
          items={[
            "Webpack is highly customizable and still very capable for complex builds.",
            "Vite is optimized around modern frontend workflows and quick iteration.",
            "Production behavior still depends on the final bundling strategy, not only on dev server speed.",
            "Tool choice should be explained in terms of team needs, ecosystem fit, and operational complexity.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default WebpackVite;
