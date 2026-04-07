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
          description="Interviewers want practical accessibility judgment: native semantics first, correct accessible names, logical focus order, composite widget behavior, and a real verification strategy instead of vague good intentions."
        />

        <CollapsibleSection title="What Accessibility Covers" collapsible={false}>
          <Paragraph>
            Accessibility means building interfaces that people can perceive,
            operate, and understand across screen readers, keyboards, zoom,
            reduced precision input, and different visual or cognitive needs.
          </Paragraph>
          <Paragraph>
            For interviews, you do not need to recite standards. You do need to
            explain how semantics, names, focus, keyboard interaction, and
            announcements affect real users.
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

        <SectionHeader>Accessible Names, Focus, and Composite Widgets</SectionHeader>
        <CollapsibleSection title="Accessible name computation" collapsible={false}>
          <SubHeader>Names</SubHeader>
          <Paragraph>
            Interactive controls need an accessible name from visible text,
            `label`, `aria-label`, or `aria-labelledby`. A control that looks
            obvious visually can still be unnamed to assistive technology.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`<label for="email">Email address</label>
<input id="email" type="email" />

<button aria-label="Close dialog">X</button>`}
          />

          <SubHeader>Descriptions and errors</SubHeader>
          <Paragraph>
            Help text and validation errors should be associated with the
            control so assistive technology can announce them in context.
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

        <CollapsibleSection title="Keyboard and focus management" collapsible={false}>
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
            Composite widgets such as dialogs, menus, and tabs need explicit
            focus management. That can include roving tabindex, moving focus
            into the widget when it opens, and restoring focus when it closes.
          </Paragraph>
          <Callout variant="warning">
            Removing outlines without a replacement is one of the clearest
            signs that accessibility was treated as optional.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="When ARIA patterns are unavoidable">
          <BulletList
            items={[
              "Dialogs need labelled containers, focus trapping, escape handling, and sensible return focus.",
              "Tabs need correct roles, selected state, keyboard navigation, and matching tabpanel relationships.",
              "Live regions matter when important async updates need announcement without stealing focus.",
              "Menus and other composite widgets need stronger keyboard rules than plain link lists.",
            ]}
          />
        </CollapsibleSection>

        <SectionHeader>How to Verify Accessibility</SectionHeader>
        <BulletList
          items={[
            "Navigate the feature with keyboard only and confirm focus order, focus visibility, and activation behavior.",
            "Inspect the browser accessibility tree to verify names, roles, and relationships.",
            "Use automated checks to catch obvious issues, but do not mistake them for full coverage.",
            "Do screen-reader smoke tests for high-risk flows such as dialogs, forms, navigation, and async status updates.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why can a visually obvious control still be inaccessible?",
              "How would you make a dialog or tabs component keyboard accessible?",
              "When is ARIA necessary, and when does it make things worse?",
              "How would you verify accessibility beyond running an automated linter?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Accessibility;
