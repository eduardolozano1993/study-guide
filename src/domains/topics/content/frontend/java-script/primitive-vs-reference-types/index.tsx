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
import { primitiveVsReferenceTypesLesson } from "./meta";

export function PrimitiveVsReferenceTypes() {
  return (
    <TopicLessonPage
      title={primitiveVsReferenceTypesLesson.title}
      summary={primitiveVsReferenceTypesLesson.summary}
      eyebrow="Frontend / JavaScript"
      estimatedReadingTimeMinutes={primitiveVsReferenceTypesLesson.estimatedReadingTimeMinutes}
      difficulty={primitiveVsReferenceTypesLesson.difficulty}
      relatedTopics={[
        { label: "Immutability", href: "/topic/immutability" },
        {
          label: "Objects, Destructuring, and Spread/Rest",
          href: "/topic/objects-destructuring-spread-rest",
        },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="J"
          title="Primitive vs Reference Types"
          description="This topic explains why copying, mutation, equality, and function arguments behave differently for numbers and strings than for arrays and objects."
        />

        <CollapsibleSection title="The Core Distinction" collapsible={false}>
          <Paragraph>
            Primitives such as `string`, `number`, `boolean`, `null`,
            `undefined`, `symbol`, and `bigint` behave like standalone values.
            Objects, arrays, and functions are referenced through object
            identities.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`let a = 5;
let b = a;
b = 10;

console.log(a); // 5

const user = { name: "Ada" };
const alias = user;
alias.name = "Grace";

console.log(user.name); // "Grace"`}
          />
          <Callout variant="tip">
            A variable holding an object does not contain the whole object. It
            holds a reference to that object.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Why This Shows Up in Interviews" collapsible={false}>
          <Paragraph>
            Most interview questions around copying or mutation reduce to one
            question: did you create a new value, or another reference to the
            same object?
          </Paragraph>
          <Paragraph>
            If you can reason about that clearly, you can usually explain bugs
            around React state, array updates, memoization, and equality checks.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Common Consequences</SectionHeader>

        <CollapsibleSection title="Equality and Identity" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`console.log(3 === 3); // true
console.log("hi" === "hi"); // true

console.log([1, 2] === [1, 2]); // false
console.log({ id: 1 } === { id: 1 }); // false

const same = { id: 1 };
console.log(same === same); // true`}
          />
          <Paragraph>
            For objects, strict equality compares identity, not deep structure.
            Two separate objects with the same properties are still different.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Function Arguments and Mutation" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`function rename(person) {
  person.name = "Lin";
}

function replace(person) {
  person = { name: "New Person" };
}

const person = { name: "Ada" };
rename(person);
replace(person);

console.log(person.name); // "Lin"`}
          />
          <Paragraph>
            JavaScript passes arguments by value. For objects, the value being
            passed is the reference. That means a function can mutate the same
            object, but reassigning its parameter does not replace the caller's
            variable.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Call-by-Sharing Is the Precise Mental Model" collapsible={false}>
          <Paragraph>
            JavaScript is best described as call-by-sharing. Functions receive
            the current value of each argument. For objects, that value is an
            object reference that multiple variables can share. That is why a
            function can mutate shared state without being able to replace the
            caller's variable by reassigning its local parameter.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Equality Rules Matter in UI Code" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, 0)); // false

const prev = { page: 1 };
const next = { page: 1 };

console.log(prev === next); // false`}
          />
          <BulletList
            items={[
              "`===` works well for primitives but compares object identity for arrays, functions, Maps, Sets, and plain objects.",
              "`Object.is` differs in a few edge cases and is commonly used by UI frameworks for bailout logic.",
              "Memoization only helps when equal inputs keep stable identities across renders or recalculations.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="It Is Not Just About Plain Objects" collapsible={false}>
          <BulletList
            items={[
              "Arrays are objects, so copied references can still share the same array instance.",
              "Functions are objects too, which is why recreated callbacks can defeat memoization.",
              "Maps and Sets compare by identity as well, so mutating them in place can hide meaningful changes from consumers expecting replacement semantics.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why is 'objects are passed by reference' an imprecise explanation?",
              "What is the difference between `===` and `Object.is`, and why does a framework care?",
              "Why can recreating arrays, objects, or functions affect memoization and rerender behavior?",
              "How do Maps and Sets fit into the primitive-versus-reference conversation?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              'Saying JavaScript "passes objects by reference" without clarifying what is actually passed.',
              "Expecting two identical object literals to be strictly equal.",
              "Confusing reassignment of a variable with mutation of a referenced object.",
              "Ignoring how equality rules affect memoization and rendering behavior.",
              "Assuming spread syntax creates a deep copy.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default PrimitiveVsReferenceTypes;
