import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  SubHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { domEventsLesson } from "./meta";

export function DomEvents() {
  return (
    <TopicLessonPage
      title={domEventsLesson.title}
      summary={domEventsLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={domEventsLesson.estimatedReadingTimeMinutes}
      difficulty={domEventsLesson.difficulty}
      relatedTopics={[
        { label: "Semantic HTML", href: "/topic/html-semantics" },
        { label: "Network and Browser APIs", href: "/topic/network-browser-apis" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="D"
          title="DOM, Events, and Event Propagation"
          description="Interviewers ask this topic because frameworks sit on top of the DOM. If you understand the browser event model, React and vanilla behavior stop feeling magical."
        />

        <CollapsibleSection title="The DOM as a Tree of Live Objects" collapsible={false}>
          <Paragraph>
            The DOM is the browser's object model for the page. JavaScript can
            query nodes, inspect attributes, create or remove elements, and
            attach behavior through event listeners.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`const button = document.querySelector("[data-save]");

button?.addEventListener("click", () => {
  console.log("Saving draft...");
});`}
          />
          <Paragraph>
            A strong interview answer connects structure and behavior: HTML
            defines nodes, CSS styles them, and JavaScript coordinates state and
            interaction through the DOM.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Capturing, Target, and Bubbling" collapsible={false}>
          <Paragraph>
            Events move through the DOM in phases. During capture, the browser
            walks down the tree. The target phase runs on the clicked or focused
            element. Then bubbling walks back up through ancestors.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`parent.addEventListener(
  "click",
  () => {
    console.log("parent capture");
  },
  true,
);

child.addEventListener("click", () => {
  console.log("child target");
});

parent.addEventListener("click", () => {
  console.log("parent bubble");
});`}
          />
          <Callout variant="tip">
            Most handlers run in the bubbling phase by default, which is why
            delegated listeners on parents work so well.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Controlling Event Behavior</SectionHeader>

        <CollapsibleSection title="`preventDefault` vs `stopPropagation`" collapsible={false}>
          <SubHeader>`preventDefault`</SubHeader>
          <Paragraph>
            Stops the browser's default action, such as submitting a form,
            following a link, or opening a context menu.
          </Paragraph>

          <SubHeader>`stopPropagation`</SubHeader>
          <Paragraph>
            Stops the event from continuing through the propagation path. It
            does not automatically cancel the default browser action.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`form.addEventListener("submit", (event) => {
  event.preventDefault();
});

menuButton.addEventListener("click", (event) => {
  event.stopPropagation();
});`}
          />
          <Callout variant="warning">
            These APIs solve different problems. Mixing them up is a classic
            interview mistake.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Event Delegation" collapsible={false}>
          <Paragraph>
            Event delegation attaches one listener to a stable ancestor and
            checks `event.target` or `closest(...)`. It is ideal for dynamic
            lists, tables, menus, and repeated controls.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`list.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove]");

  if (!removeButton) return;

  const item = removeButton.closest("li");
  item?.remove();
});`}
          />
          <Paragraph>
            The interview value here is not only performance. Delegation also
            improves correctness when items are added after initial render.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Confusing bubbling with capturing.</li>
            <li>Using `stopPropagation` when the real problem is a default browser action.</li>
            <li>Forgetting that `event.target` may be a nested child, not the button you expected.</li>
            <li>Attaching many listeners where delegation is simpler.</li>
            <li>Describing framework events without understanding the DOM underneath them.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default DomEvents;
