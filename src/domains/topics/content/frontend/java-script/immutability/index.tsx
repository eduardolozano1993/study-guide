import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { immutabilityLesson } from "./meta";

export function Immutability() {
  return (
    <TopicLessonPage
      title={immutabilityLesson.title}
      summary={immutabilityLesson.summary}
      eyebrow="Frontend / JavaScript"
      estimatedReadingTimeMinutes={immutabilityLesson.estimatedReadingTimeMinutes}
      difficulty={immutabilityLesson.difficulty}
      relatedTopics={[
        { label: "Primitive vs Reference Types", href: "/topic/primitive-vs-reference-types" },
        {
          label: "Objects, Destructuring, and Spread/Rest",
          href: "/topic/objects-destructuring-spread-rest",
        },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="J"
          title="Immutability"
          description="Immutability means producing new values instead of mutating existing ones, which makes state changes easier to reason about and compare."
        />

        <CollapsibleSection title="Why Immutability Matters" collapsible={false}>
          <Paragraph>
            Immutable updates reduce hidden side effects, make change detection
            easier, and avoid bugs caused by multiple parts of the app sharing
            the same object reference.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Immutable Update Patterns" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const user = {
  id: 1,
  name: "Ada",
  settings: { theme: "dark" },
};

const nextUser = {
  ...user,
  settings: {
    ...user.settings,
    theme: "light",
  },
};`}
          />
          <Paragraph>
            Immutable updates require copying every nested level that changes.
            A shallow top-level copy is not enough when nested data is modified.
          </Paragraph>
          <Callout variant="warning">
            `const` prevents reassignment of the variable, not mutation of the
            object it references.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Where People Get Tripped Up">
          <CodeBlock
            language="javascript"
            code={`const items = [{ id: 1 }, { id: 2 }];
const nextItems = [...items];

nextItems[0].id = 99;

console.log(items[0].id); // 99`}
          />
          <Paragraph>
            Copying the array did not copy the objects inside it. Immutability
            questions often test whether you can spot that shared nested state.
          </Paragraph>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Immutability;
