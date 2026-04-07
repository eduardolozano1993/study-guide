import {
  BulletList,
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
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
          description="Tree shaking removes unused exported code when the module graph and build tool can prove it is safe. The senior question is why it often fails in production even when the package looks clean in theory."
        />

        <Paragraph>
          Tree shaking is a build-time optimization. It works best with ES
          modules because static imports and exports are easier for bundlers to
          analyze than CommonJS-heavy or side-effectful patterns.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`// utils.ts
export function formatCurrency() {}
export function formatDate() {}

// page.ts
import { formatCurrency } from "./utils";`}
        />

        <SectionHeader>Why Tree Shaking Fails In Practice</SectionHeader>
        <BulletList
          items={[
            "Side effects force bundlers to stay conservative, which is why `sideEffects` metadata matters.",
            "Barrel files and broad re-export patterns can make it harder to see what is actually used.",
            "Mixed ESM and CommonJS packages often reduce how effectively bundlers can eliminate dead code.",
            "A package can be tree-shakable in theory and still ship too much code in practice because import style, metadata, and bundler configuration all matter.",
          ]}
        />
        <Callout variant="warning">
          Tree shaking is not a substitute for measuring the real production
          bundle. The question is always what shipped, not what should have been
          removable in theory.
        </Callout>

        <SectionHeader>How To Verify It</SectionHeader>
        <Paragraph>
          Use bundle analysis tools and production build inspection to confirm
          what actually survived. Senior answers mention verification, not just
          the mechanism.
        </Paragraph>
      </div>
    </TopicLessonPage>
  );
}

export default TreeShaking;
