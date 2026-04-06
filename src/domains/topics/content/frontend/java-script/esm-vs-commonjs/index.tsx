import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { esmVsCommonjsLesson } from "./meta";

export function EsmVsCommonjs() {
  return (
    <TopicLessonPage
      title={esmVsCommonjsLesson.title}
      summary={esmVsCommonjsLesson.summary}
      eyebrow="Frontend / JavaScript"
      estimatedReadingTimeMinutes={esmVsCommonjsLesson.estimatedReadingTimeMinutes}
      difficulty={esmVsCommonjsLesson.difficulty}
      relatedTopics={[
        { label: "Promises and Async/Await", href: "/topic/promises-async-await" },
        {
          label: "Objects, Destructuring, and Spread/Rest",
          href: "/topic/objects-destructuring-spread-rest",
        },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="J"
          title="Modules: ESM vs CommonJS"
          description="The important distinction is not syntax alone. It is how modules are loaded, analyzed, and used across browser and Node environments."
        />

        <CollapsibleSection title="ESM vs CommonJS Syntax" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`// ESM
import { sum } from "./math.js";
export function double(value) {
  return sum(value, value);
}

// CommonJS
const { sum } = require("./math");
module.exports = { double };`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Practical Differences" collapsible={false}>
          <Paragraph>
            ESM is the standard browser module format and supports static
            analysis. CommonJS is historically associated with Node and loads
            modules through `require`.
          </Paragraph>
          <Paragraph>
            In interview terms: ESM is better for tree-shaking and modern
            bundling because imports are statically analyzable.
          </Paragraph>
          <Callout variant="tip">
            If the interviewer asks what browsers use natively, the answer is
            ESM via `type="module"`.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Reducing the difference to syntax only.</li>
            <li>Not knowing why ESM works better with tree-shaking.</li>
            <li>Ignoring the environment distinction between browser and Node usage.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default EsmVsCommonjs;
