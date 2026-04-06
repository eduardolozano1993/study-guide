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
import { accessibilityLesson } from "./meta";

export function Accessibility() {
  return (
    <TopicLessonPage
      title={accessibilityLesson.title}
      summary={accessibilityLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={accessibilityLesson.estimatedReadingTimeMinutes}
      difficulty={accessibilityLesson.difficulty}
      relatedTopics={[
        { label: "Semantic HTML", href: "/topic/html-semantics" },
        { label: "Web Security Basics for Frontend", href: "/topic/frontend-security" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Accessibility Basics"
          description="Interviewers usually want practical accessibility judgment: native semantics first, correct labeling, keyboard support, visible focus, and careful ARIA usage."
        />

        <CollapsibleSection title="What Accessibility Covers" collapsible={false}>
          <Paragraph>
            Accessibility means building interfaces that people can perceive,
            operate, and understand across screen readers, keyboards, zoom,
            reduced precision input, and different visual or cognitive needs.
          </Paragraph>
          <Paragraph>
            For interviews, you usually do not need exhaustive standards detail.
            You do need to explain how semantics, labels, focus order, keyboard
            interaction, and contrast affect real users.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Use Native HTML Before ARIA" collapsible={false}>
          <Paragraph>
            Native elements already carry roles, states, and keyboard behavior.
            A real `button` supports focus and activation correctly. A clickable
            `div` starts broken and must be rebuilt manually.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`<button type="button">Open menu</button>
<a href="/pricing">View pricing</a>

<!-- avoid -->
<div onclick="openMenu()">Open menu</div>`}
          />
          <Callout variant="tip">
            A reliable interview phrase is: use native semantics first, ARIA
            only when native HTML does not fully express the interaction.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Practical Accessibility Requirements</SectionHeader>

        <CollapsibleSection title="Accessible Names, Descriptions, and Errors" collapsible={false}>
          <SubHeader>Names</SubHeader>
          <Paragraph>
            Interactive controls need an accessible name from visible text,
            `label`, `aria-label`, or `aria-labelledby`.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`<label for="email">Email address</label>
<input id="email" type="email" />

<button aria-label="Close dialog">X</button>`}
          />

          <SubHeader>Descriptions and errors</SubHeader>
          <Paragraph>
            Supporting help text and validation errors should be associated with
            the control so assistive technology can announce them.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`<input
  id="password"
  aria-describedby="password-help password-error"
  aria-invalid="true"
/>
<p id="password-help">Use at least 12 characters.</p>
<p id="password-error">Password is too short.</p>`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Keyboard and Focus Management" collapsible={false}>
          <Paragraph>
            Users must be able to reach controls in a logical order, understand
            where focus is, and complete tasks without a mouse.
          </Paragraph>
          <CodeBlock
            language="css"
            code={`button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 3px solid #0ea5e9;
  outline-offset: 2px;
}`}
          />
          <Paragraph>
            For composite widgets such as dialogs and menus, focus should move
            somewhere meaningful when the widget opens and return sensibly when
            it closes.
          </Paragraph>
          <Callout variant="warning">
            Removing outlines without a replacement is one of the clearest
            signs that accessibility was treated as optional.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Where ARIA Helps">
          <Paragraph>
            ARIA is useful for exposing state and relationships that HTML alone
            does not fully express, such as expanded panels, dialogs, tabs, and
            live updates.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`<button
  aria-expanded="false"
  aria-controls="faq-panel-1"
>
  What is event bubbling?
</button>
<div id="faq-panel-1" hidden>
  Event bubbling moves an event up the DOM tree.
</div>`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using placeholders as labels.</li>
            <li>Removing focus styles or trapping keyboard users.</li>
            <li>Adding ARIA roles that conflict with native semantics.</li>
            <li>Ignoring alt text for meaningful images.</li>
            <li>Talking about accessibility only in terms of screen readers.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Accessibility;
