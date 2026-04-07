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
import { javascriptCollectionOperationsLesson } from "./meta";

export function JavaScriptCollectionOperations() {
  return (
    <TopicLessonPage
      title={javascriptCollectionOperationsLesson.title}
      summary={javascriptCollectionOperationsLesson.summary}
      eyebrow="Frontend / JavaScript"
      estimatedReadingTimeMinutes={
        javascriptCollectionOperationsLesson.estimatedReadingTimeMinutes
      }
      difficulty={javascriptCollectionOperationsLesson.difficulty}
      relatedTopics={[
        {
          label: "Primitive vs Reference Types",
          href: "/topic/primitive-vs-reference-types",
        },
        {
          label: "Objects, Destructuring, and Spread/Rest",
          href: "/topic/objects-destructuring-spread-rest",
        },
        { label: "Immutability", href: "/topic/immutability" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="J"
          title="JavaScript Collection Operations"
          description="Interview questions often test whether you know which operation to reach for, what it returns, and whether it mutates the original value."
        />

        <CollapsibleSection title="The Big Rule: Mutation vs New Value" collapsible={false}>
          <Paragraph>
            A strong interview answer is not just naming a method. You usually
            need to explain whether it changes the original array, object,
            `Map`, or `Set`, and what the time and readability tradeoff looks
            like.
          </Paragraph>
          <Callout variant="tip">
            `map`, `filter`, `slice`, and `Object.entries` create new values.
            `pop`, `push`, `shift`, `unshift`, `splice`, `sort`, `Map.set`,
            and `Set.add` mutate the existing collection.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Arrays</SectionHeader>

        <CollapsibleSection title="Transforming and Searching Arrays" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const numbers = [1, 2, 3, 4];

const doubled = numbers.map((value) => value * 2);
const evens = numbers.filter((value) => value % 2 === 0);
const firstBig = numbers.find((value) => value > 2);
const hasZero = numbers.includes(0);
const hasAnyBig = numbers.some((value) => value > 3);
const allPositive = numbers.every((value) => value > 0);`}
          />
          <BulletList
            items={[
              "`map` transforms every element and returns a new array.",
              "`filter` keeps only matching elements and returns a new array.",
              "`find` returns the first matching element or `undefined`.",
              "`some` and `every` are common when an interviewer asks for existence or validation checks.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Mutation Methods Interviewers Expect You to Notice" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const queue = ["a", "b", "c"];

const last = queue.pop();     // removes from end
queue.push("d");              // adds to end

const first = queue.shift();  // removes from start
queue.unshift("z");           // adds to start

const copy = queue.slice(0, 2);     // new array
queue.splice(1, 1, "x");            // mutates array
queue.sort();                       // mutates array`}
          />
          <Paragraph>
            `shift` and `unshift` are especially worth calling out in
            interviews because they operate at the front of the array and are
            usually less efficient than end-based operations like `push` and
            `pop`.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Set and Map</SectionHeader>

        <CollapsibleSection title="When a Set Beats an Array" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const visited = new Set([1, 2, 3]);

visited.add(4);
const hasTwo = visited.has(2);
visited.delete(1);

console.log(visited.size); // 3`}
          />
          <BulletList
            items={[
              "Use `Set` when uniqueness matters or you need fast membership checks.",
              "`add`, `delete`, and `clear` mutate the set.",
              "A `Set` preserves insertion order, but it is not index-based like an array.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="When a Map Beats a Plain Object" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const counts = new Map();

counts.set("apple", 2);
counts.set("banana", 1);

const appleCount = counts.get("apple");
const hasOrange = counts.has("orange");

counts.delete("banana");

for (const [key, value] of counts.entries()) {
  console.log(key, value);
}`}
          />
          <BulletList
            items={[
              "`Map` is useful when keys are dynamic or not limited to strings and symbols.",
              "`get` can return `undefined`, so `has` is safer when you need to distinguish missing keys from stored `undefined` values.",
              "`Map.set` mutates the map and also returns the map, which supports chaining.",
            ]}
          />
        </CollapsibleSection>

        <SectionHeader>Objects</SectionHeader>

        <CollapsibleSection title="The Object Operations That Come Up Constantly" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const user = { id: 1, name: "Ada", active: true };

const keys = Object.keys(user);
const values = Object.values(user);
const entries = Object.entries(user);

const hasName = Object.hasOwn(user, "name");

const updated = { ...user, active: false };
const rebuilt = Object.fromEntries(
  Object.entries(user).filter(([key]) => key !== "active"),
);`}
          />
          <Paragraph>
            Plain objects are still the default structure for many interview
            problems, especially when grouping values, counting frequencies, or
            shaping API data.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="A Common Interview Pattern: Frequency Counting" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const words = ["js", "css", "js", "html"];

const counts = {};

for (const word of words) {
  counts[word] = (counts[word] ?? 0) + 1;
}

console.log(counts); // { js: 2, css: 1, html: 1 }`}
          />
          <Paragraph>
            This pattern is common because it tests iteration, dynamic keys,
            defaults, and your understanding of how objects work as lookup
            tables.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Interview Judgment</SectionHeader>

        <CollapsibleSection title="How to Choose the Right Structure" collapsible={false}>
          <BulletList
            items={[
              "Choose arrays for ordered lists and sequential transformations.",
              "Choose `Set` for uniqueness and membership checks.",
              "Choose `Map` when keys are dynamic, need guaranteed insertion order, or are not just strings.",
              "Choose plain objects when the data is naturally record-shaped or must serialize cleanly to JSON.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interview Pitfalls">
          <BulletList
            items={[
              "Using `map` when you really want `forEach`, `find`, or `filter`.",
              "Forgetting that `sort` mutates the original array.",
              "Using objects when key collisions with inherited properties or non-string keys make `Map` a better fit.",
              "Assuming `Set` supports direct indexed access like an array.",
              "Missing the mutation behavior of `pop`, `push`, `shift`, `unshift`, `splice`, `Map.set`, or `Set.add`.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What is the difference between `map`, `forEach`, `filter`, and `find`?",
              "Which array methods mutate the original array, and which return a new one?",
              "When would you choose `Set` over an array for a problem?",
              "Why might `Map` be a better choice than a plain object?",
              "How would you count frequencies or group values in JavaScript?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default JavaScriptCollectionOperations;
