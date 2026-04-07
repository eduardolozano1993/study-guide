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

        <SectionHeader>Tradeoffs and Real-World Constraints</SectionHeader>

        <CollapsibleSection title="Structural Sharing Beats Blind Deep Cloning" collapsible={false}>
          <Paragraph>
            Senior answers usually favor structural sharing: copy only the
            branches that changed and keep untouched references stable. Deep
            cloning everything is simple to describe but often wastes time,
            memory, and referential identity.
          </Paragraph>
          <BulletList
            items={[
              "Structural sharing makes change detection and memoization more useful.",
              "Deep cloning can become expensive on large nested state graphs.",
              "Keeping stable references for unchanged branches reduces unnecessary rerenders and cache churn.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Maps, Sets, and Immer Change the Ergonomics" collapsible={false}>
          <BulletList
            items={[
              "Maps and Sets still have mutable APIs, so immutable updates require creating replacement instances when their contents change.",
              "Nested updates stay conceptually hard even when spread syntax makes shallow copies easy.",
              "Immer improves update ergonomics by letting you write mutation-like code while producing immutable results, but it does not remove the need to understand what changed.",
            ]}
          />
          <Callout variant="tip">
            Libraries can reduce boilerplate. They do not remove the need to
            reason about identity and shared references.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Why Interviewers Connect This to UI Frameworks" collapsible={false}>
          <BulletList
            items={[
              "React relies heavily on reference comparisons for state updates, memoization, and prop stability.",
              "Angular OnPush benefits when reference changes accurately represent state changes.",
              "Cache invalidation logic often depends on knowing which data changed versus which references stayed stable.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why is 'just deep clone it' usually a weak answer?",
              "How does immutability help React rendering behavior or Angular OnPush change detection?",
              "What changes when the data structure is a `Map` or `Set` instead of a plain object?",
              "What does Immer improve, and what conceptual problems does it not solve for you?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Immutability;
