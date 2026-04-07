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

        <CollapsibleSection title="Stale Closures in UI Code" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`function createSaveHandler(draft) {
  return async function handleSave() {
    await api.save({ id: draft.id, title: draft.title });
  };
}

let draft = { id: 1, title: "Old title" };
let onSave = createSaveHandler(draft);

draft = { id: 1, title: "New title" };

// If the old handler is still wired somewhere, it still saves "Old title".
onSave();`}
          />
          <Paragraph>
            Stale-closure bugs show up when an old callback, timer, or async
            continuation keeps a snapshot from an earlier render or setup path.
            The function is behaving correctly. The bug is that the app kept
            using a closure that no longer matches the latest state.
          </Paragraph>
          <BulletList
            items={[
              "Timers can fire later with older values than the UI currently shows.",
              "Event handlers stored by third-party code can keep outdated assumptions alive.",
              "Async callbacks often need current-state reads or a redesigned data flow, not just more re-renders.",
            ]}
          />
        </CollapsibleSection>

        <SectionHeader>Failure Modes and Debugging</SectionHeader>

        <CollapsibleSection title="Closures Can Retain More Memory Than You Expect" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`function attachPreview(button, largeDataSet) {
  button.addEventListener("click", () => {
    console.log(largeDataSet[0]);
  });
}

// If the listener is never removed, the closure can keep
// largeDataSet reachable longer than intended.`}
          />
          <Paragraph>
            Closures do not leak memory by default, but they do keep referenced
            values alive while the closure itself is still reachable. That
            matters for DOM listeners, caches, long-lived timers, and
            subscriptions.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="How to Reason About a Closure Bug" collapsible={false}>
          <BulletList
            items={[
              "Ask which lexical scope created the callback, not just where it runs.",
              "Check whether multiple callbacks share one binding or each callback gets its own binding.",
              "Trace object lifetime: if a listener or timer outlives the screen, it may also retain old data.",
              "When UI state looks stale, inspect whether the callback should read a current source of truth instead of a captured snapshot.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why does the `var` loop log the same value, and why does `let` change the result?",
              "Why is this callback seeing stale state even though the UI already updated?",
              "How can a closure contribute to memory retention without there being a classical memory leak?",
              "When is a closure the right tool for private state, and when does it hide too much mutable behavior?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interview Pitfalls">
          <BulletList
            items={[
              'Defining closures only as "functions inside functions" without mentioning lexical scope.',
              "Missing how closures enable state after the outer function returns.",
              "Confusing closure behavior with hoisting or `this` binding.",
              "Ignoring stale-closure bugs because the code 'looks async' rather than stateful.",
              "Ignoring memory implications when large values are captured unnecessarily.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Closures;
