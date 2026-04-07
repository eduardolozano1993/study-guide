import {
  BulletList,
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

        <SectionHeader>Modern Event Complexity</SectionHeader>

        <CollapsibleSection title="Passive, Pointer, Wheel, and Scroll Events" collapsible={false}>
          <BulletList
            items={[
              "Passive listeners tell the browser a listener will not call `preventDefault()`, which can improve scroll and touch responsiveness.",
              "Pointer events unify mouse, touch, and pen input better than treating each interaction type as a separate world.",
              "Wheel and scroll handlers are performance-sensitive because they can run frequently on the main thread.",
              "Touch and gesture interactions often expose hidden assumptions about target size, cancellation, and browser default behavior.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Composed Events and Shadow DOM Boundaries" collapsible={false}>
          <Paragraph>
            Not every event crosses every boundary the same way. In component
            systems using Shadow DOM, composed events can pass through shadow
            boundaries while others stay encapsulated. That matters when
            delegation and global listeners appear to miss interactions.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When should you call `preventDefault()` instead of `stopPropagation()`?",
              "Why can overusing propagation control make components harder to compose?",
              "When would you prefer event delegation over a listener on every child?",
              "Why do touch, pointer, wheel, and scroll handlers deserve extra performance attention?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Confusing bubbling with capturing.",
              "Using `stopPropagation` when the real problem is a default browser action.",
              "Forgetting that `event.target` may be a nested child, not the button you expected.",
              "Attaching many listeners where delegation is simpler.",
              "Ignoring passive listener tradeoffs in touch or scroll-heavy UI.",
              "Describing framework events without understanding the DOM underneath them.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default DomEvents;
