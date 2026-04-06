import {
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

        <CollapsibleSection title="Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using deeply nested destructuring that is harder to read than direct access.</li>
            <li>Assuming spread performs a deep clone.</li>
            <li>Confusing rest parameters in functions with rest properties in object destructuring.</li>
            <li>Using spread on large nested structures without understanding what is still shared.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ObjectsDestructuringSpreadRest;
