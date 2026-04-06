import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { closuresLesson } from "./meta";

export function Closures() {
  return (
    <TopicLessonPage
      title={closuresLesson.title}
      summary={closuresLesson.summary}
      eyebrow="Frontend / JavaScript"
      estimatedReadingTimeMinutes={closuresLesson.estimatedReadingTimeMinutes}
      difficulty={closuresLesson.difficulty}
      relatedTopics={[
        { label: "Promises and Async/Await", href: "/topic/promises-async-await" },
        { label: "Immutability", href: "/topic/immutability" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="J"
          title="Closures"
          description="Closures explain how functions retain access to variables from the scope where they were created, even after that outer function returns."
        />

        <CollapsibleSection title="What a Closure Is" collapsible={false}>
          <Paragraph>
            A closure is formed when a function captures variables from its
            lexical environment. The function can keep reading or updating those
            variables later.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`}
          />
        </CollapsibleSection>

        <SectionHeader>Why Closures Matter</SectionHeader>

        <CollapsibleSection title="Private State and Function Factories" collapsible={false}>
          <Paragraph>
            Closures power private state, partially configured functions, event
            handlers, timers, and many asynchronous workflows.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`function createLogger(label) {
  return function log(message) {
    console.log(\`[\${label}] \${message}\`);
  };
}

const authLog = createLogger("auth");
authLog("signed in");`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="A Common Interview Trap" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`for (var i = 0; i < 3; i += 1) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

// logs 3, 3, 3`}
          />
          <Paragraph>
            With `var`, every callback closes over the same function-scoped
            binding. Using `let` creates a new binding per iteration.
          </Paragraph>
          <Callout variant="warning">
            Many closure questions are really scope and binding questions in
            disguise.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Defining closures only as "functions inside functions" without mentioning lexical scope.</li>
            <li>Missing how closures enable state after the outer function returns.</li>
            <li>Confusing closure behavior with hoisting or `this` binding.</li>
            <li>Ignoring memory implications when large values are captured unnecessarily.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Closures;
