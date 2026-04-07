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
import { domManipulationBasicsLesson } from "./meta";

export function DomManipulationBasics() {
  return (
    <TopicLessonPage
      title={domManipulationBasicsLesson.title}
      summary={domManipulationBasicsLesson.summary}
      eyebrow="Frontend / JavaScript"
      estimatedReadingTimeMinutes={domManipulationBasicsLesson.estimatedReadingTimeMinutes}
      difficulty={domManipulationBasicsLesson.difficulty}
      relatedTopics={[
        { label: "DOM, Events, and Event Propagation", href: "/topic/dom-events" },
        { label: "Error Handling in JavaScript", href: "/topic/error-handling-javascript" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="J"
          title="DOM Manipulation Basics"
          description="This topic covers how JavaScript reads and updates the DOM, and why safe writes and batched changes matter for both correctness and performance."
        />

        <CollapsibleSection title="Selecting and Updating Nodes" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const title = document.querySelector("[data-title]");

if (title) {
  title.textContent = "Updated title";
  title.classList.add("is-loaded");
  title.setAttribute("data-ready", "true");
}`}
          />
          <Paragraph>
            DOM APIs let you query elements, update text and attributes, and
            change classes. Prefer `textContent` for plain text over `innerHTML`
            unless you explicitly need HTML.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Creating and Replacing Structure</SectionHeader>

        <CollapsibleSection title="Creating Elements Safely" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const item = document.createElement("li");
item.textContent = "Closures";
list.append(item);`}
          />
          <Callout variant="tip">
            Creating nodes directly is safer than concatenating HTML strings for
            untrusted content.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Batching DOM Writes with DocumentFragment" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const fragment = document.createDocumentFragment();

for (const topic of topics) {
  const item = document.createElement("li");
  item.textContent = topic.title;
  fragment.append(item);
}

list.replaceChildren(fragment);`}
          />
          <Paragraph>
            `DocumentFragment` lets you assemble many nodes off-screen, then
            attach them in one step. The browser still decides the exact layout
            work, but this avoids repeated incremental DOM churn.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Event Delegation Scales Better Than One Listener Per Node" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-topic-id]");

  if (!button) {
    return;
  }

  openTopic(button.dataset.topicId);
});`}
          />
          <Paragraph>
            Delegation reduces listener count and handles dynamically inserted
            children naturally. It is often the senior answer when the DOM can
            grow, shrink, or rerender frequently.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Why Batching Matters">
          <Paragraph>
            Repeated interleaving of DOM reads and writes can trigger extra
            layout work. Grouping reads together and writes together usually
            leads to cleaner and faster updates.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`const width = panel.offsetWidth; // read
panel.style.width = (width + 20) + "px"; // write
const height = panel.offsetHeight; // read after write can force layout

// Better: gather reads first, then perform writes.`}
          />
        </CollapsibleSection>

        <SectionHeader>Safety and Decision Heuristics</SectionHeader>

        <CollapsibleSection title="`innerHTML` Is a Security Boundary" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`// Risky with untrusted content
message.innerHTML = userSuppliedHtml;

// Safer default for plain text
message.textContent = userSuppliedText;`}
          />
          <Paragraph>
            `innerHTML` is not just a convenience API. It can become an XSS
            sink when untrusted content reaches it. Use it only when you have a
            clear HTML requirement and a trusted or sanitized source.
          </Paragraph>
          <Callout variant="warning">
            Treat template injection as a security problem, not merely a code
            style issue.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="When Manual DOM Manipulation Is Still Appropriate" collapsible={false}>
          <BulletList
            items={[
              "Integrating with browser APIs or third-party widgets that require imperative node access.",
              "Managing focus, selection, measurements, and scroll position where the browser exposes imperative primitives.",
              "Handling very small isolated enhancements on server-rendered markup.",
              "Avoiding it for general app state when a framework already owns the DOM tree.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How would you update hundreds of nodes without causing unnecessary DOM churn?",
              "When is event delegation better than attaching listeners to every child element?",
              "How do you minimize layout thrash when code both measures and updates the page?",
              "When is manual DOM manipulation still appropriate inside a framework app?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default DomManipulationBasics;
