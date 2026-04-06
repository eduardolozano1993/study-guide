import {
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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Saying JavaScript "passes objects by reference" without clarifying what is actually passed.</li>
            <li>Expecting two identical object literals to be strictly equal.</li>
            <li>Confusing reassignment of a variable with mutation of a referenced object.</li>
            <li>Assuming spread syntax creates a deep copy.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default PrimitiveVsReferenceTypes;
