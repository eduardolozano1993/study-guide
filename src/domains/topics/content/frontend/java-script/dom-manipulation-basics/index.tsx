import {
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

        <CollapsibleSection title="Why Batching Matters">
          <Paragraph>
            Repeated interleaving of DOM reads and writes can trigger extra
            layout work. Grouping reads together and writes together usually
            leads to cleaner and faster updates.
          </Paragraph>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default DomManipulationBasics;
