import {
  BulletList,
  Callout,
  CodeBlock,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { treeShakingLesson } from "./meta";

export function TreeShaking() {
  return (
    <TopicLessonPage
      title={treeShakingLesson.title}
      summary={treeShakingLesson.summary}
      eyebrow="Frontend / Performance"
      estimatedReadingTimeMinutes={treeShakingLesson.estimatedReadingTimeMinutes}
      difficulty={treeShakingLesson.difficulty}
      relatedTopics={[
        { label: "Code Splitting", href: "/topic/code-splitting" },
        { label: "ESM vs CommonJS", href: "/topic/esm-vs-commonjs" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="P"
          title="Tree Shaking"
          description="Tree shaking removes unused exported code from bundles when the module graph and build tool can prove that code is not needed."
        />

        <Paragraph>
          Tree shaking is a build-time optimization. It works best with ES
          modules because static imports and exports are easier for bundlers to
          analyze than dynamic or CommonJS-heavy patterns.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`// utils.ts
export function formatCurrency() {}
export function formatDate() {}

// page.ts
import { formatCurrency } from "./utils";`}
        />
        <Paragraph>
          If the bundler can prove <code>formatDate</code> is unused and has no
          side effects, it can often remove it from the final bundle.
        </Paragraph>

        <Callout variant="warning">
          Tree shaking is limited by side effects. If importing a module runs
          code with observable effects, bundlers have to be more conservative.
        </Callout>

        <BulletList
          items={[
            "ES modules make tree shaking much more reliable.",
            "Large barrel files and broad imports can reduce clarity around what is actually used.",
            "Third-party libraries vary a lot in how tree-shakable they are.",
            "Tree shaking is not a substitute for measuring what actually ships in production bundles.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default TreeShaking;
