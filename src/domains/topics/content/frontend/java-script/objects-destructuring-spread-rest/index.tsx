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
import { objectsDestructuringSpreadRestLesson } from "./meta";

export function ObjectsDestructuringSpreadRest() {
  return (
    <TopicLessonPage
      title={objectsDestructuringSpreadRestLesson.title}
      summary={objectsDestructuringSpreadRestLesson.summary}
      eyebrow="Frontend / JavaScript"
      estimatedReadingTimeMinutes={objectsDestructuringSpreadRestLesson.estimatedReadingTimeMinutes}
      difficulty={objectsDestructuringSpreadRestLesson.difficulty}
      relatedTopics={[
        { label: "Primitive vs Reference Types", href: "/topic/primitive-vs-reference-types" },
        { label: "Immutability", href: "/topic/immutability" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="J"
          title="Objects, Destructuring, and Spread/Rest"
          description="These features appear constantly in real code because they make extraction, transformation, and immutable-style updates more concise."
        />

        <CollapsibleSection title="Destructuring as Readable Extraction" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const user = {
  id: 42,
  profile: { name: "Ada", role: "admin" },
};

const {
  id: userId,
  profile: { name = "Unknown" },
} = user;`}
          />
          <Paragraph>
            Destructuring supports renaming, defaults, nested access, and array
            extraction. It is best when it improves readability rather than
            turning a simple access pattern into dense syntax.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Spread and Rest</SectionHeader>

        <CollapsibleSection title="What Spread and Rest Actually Do" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const original = { id: 1, theme: "dark", locale: "en" };
const copy = { ...original, theme: "light" };

const { id, ...settings } = copy;

const values = [1, 2, 3];
const nextValues = [...values, 4];`}
          />
          <Paragraph>
            Spread expands existing values into a new object or array. Rest
            collects the remaining properties or elements after extraction.
          </Paragraph>
          <Callout variant="tip">
            Spread is often used for immutable-style updates, but it only
            copies one level deep.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="The Important Trap: Shallow Copies" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const state = {
  user: {
    name: "Ada",
    preferences: { theme: "dark" },
  },
};

const next = { ...state };
next.user.preferences.theme = "light";

console.log(state.user.preferences.theme); // "light"`}
          />
          <Paragraph>
            Spread copies the top level only. Nested objects still point to the
            same references unless you copy those levels too.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Edge Cases and Judgment</SectionHeader>

        <CollapsibleSection title="Defaults, `undefined`, and Evaluation Order" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const config = { retries: undefined };
const { retries = 3 } = config; // 3

const options = undefined;
// const { theme } = options; // throws
const { theme = "dark" } = options ?? {};

const {
  user: { name: displayName = "Unknown" } = {},
} = payload;`}
          />
          <Paragraph>
            Destructuring defaults apply when a value is `undefined`, not for
            every falsy value. It also fails fast when you destructure from
            `null` or `undefined` unless you guard the source first.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Renaming Collisions and Rest Readability" collapsible={false}>
          <BulletList
            items={[
              "Renaming during destructuring avoids local-name collisions, but too much renaming can make the code harder to scan.",
              "Object rest is convenient for omission patterns, but it can obscure which properties are intentionally carried forward.",
              "Concise syntax is only better when the reader can still tell what data is being selected and what remains shared.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What does object spread actually copy, and what stays shared?",
              "Why can destructuring `undefined` throw, and how do you guard against it cleanly?",
              "When does object rest improve clarity, and when does it hide too much behavior?",
              "Why can deeply nested destructuring become a maintainability problem in production code?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interview Pitfalls">
          <BulletList
            items={[
              "Using deeply nested destructuring that is harder to read than direct access.",
              "Assuming spread performs a deep clone.",
              "Confusing rest parameters in functions with rest properties in object destructuring.",
              "Forgetting that destructuring defaults apply to `undefined`, not every falsy value.",
              "Using spread on large nested structures without understanding what is still shared.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ObjectsDestructuringSpreadRest;
