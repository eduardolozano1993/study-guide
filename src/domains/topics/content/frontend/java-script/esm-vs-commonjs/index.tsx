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

        <SectionHeader>Where The Real Interview Depth Starts</SectionHeader>

        <CollapsibleSection title="Live Bindings, Evaluation Timing, and Top-Level Await" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`// counter.js
export let count = 0;
export function increment() {
  count += 1;
}

// viewer.js
import { count, increment } from "./counter.js";

increment();
console.log(count); // 1`}
          />
          <BulletList
            items={[
              "ESM imports are live bindings, so imported values can reflect later updates from the exporting module.",
              "CommonJS exports are assigned through runtime objects, which changes interop expectations and tooling behavior.",
              "Top-level `await` can delay module evaluation for dependents, which is powerful but can complicate startup graphs.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interop Quirks and Default Export Confusion" collapsible={false}>
          <Paragraph>
            Many ESM/CommonJS bugs are really default-export and named-export
            mismatches hidden by transpilers or compatibility flags. Code can
            appear to work in one toolchain and fail in another because the
            loader, bundler, or transpiler applied different interop rules.
          </Paragraph>
          <Callout variant="warning">
            "It compiles" does not prove the runtime and bundler agree on the
            same module semantics.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Bundlers, Tree Shaking, and Side Effects" collapsible={false}>
          <BulletList
            items={[
              "Bundlers can tree-shake ESM more effectively because imports and exports are statically analyzable.",
              "A package with top-level side effects is harder to optimize even if it uses ESM syntax.",
              "Mixed-module packages often behave differently across Node, test runners, and browser bundles because each environment resolves and transforms them differently.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why are ESM imports better for tree shaking than CommonJS `require`?",
              "What are live bindings, and why can they surprise people coming from CommonJS?",
              "How can top-level `await` affect module evaluation order?",
              "Why can one package behave differently in Node, a bundler, and the browser even though all of them use `import` syntax?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Reducing the difference to syntax only.",
              "Not knowing why ESM works better with tree shaking.",
              "Ignoring live bindings and evaluation-order differences.",
              "Overlooking side effects when talking about bundler optimization.",
              "Ignoring the environment distinction between browser and Node usage.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default EsmVsCommonjs;
