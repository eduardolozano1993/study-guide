import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { cssBoxModelLesson } from "./meta";

export function CssBoxModel() {
  return (
    <TopicLessonPage
      title={cssBoxModelLesson.title}
      summary={cssBoxModelLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={cssBoxModelLesson.estimatedReadingTimeMinutes}
      difficulty={cssBoxModelLesson.difficulty}
      relatedTopics={[
        { label: "CSS Layout: Flexbox, Grid, Positioning", href: "/topic/css-layout" },
        { label: "Responsive Design and Mobile-First CSS", href: "/topic/responsive-design" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="C"
          title="CSS Box Model and Sizing"
          description="Layout bugs often come from misunderstanding what width actually means, how boxes expand, and why intrinsic sizing and overflow interact with layout systems."
        />

        <CollapsibleSection title="What the Box Model Actually Measures" collapsible={false}>
          <Paragraph>
            Every element renders as a box with four layers: content, padding,
            border, and margin. The default rule that trips people up is that
            `width` and `height` apply to the content box, not the visible box.
          </Paragraph>
          <CodeBlock
            language="css"
            code={`.card {
  width: 320px;
  padding: 24px;
  border: 2px solid #cbd5e1;
  margin: 16px;
}`}
          />
          <Paragraph>
            With the default model, that element takes up `320 + 24 + 24 + 2 +
            2 = 372px` before margins. In interviews, being able to do that
            mental math quickly is usually more valuable than quoting
            definitions.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Why `box-sizing: border-box` Wins in Practice" collapsible={false}>
          <Paragraph>
            `border-box` makes declared width include padding and border. That
            aligns better with how teams reason about cards, inputs, columns,
            and component boundaries.
          </Paragraph>
          <CodeBlock
            language="css"
            code={`*,
*::before,
*::after {
  box-sizing: border-box;
}`}
          />
          <CodeBlock
            language="css"
            code={`.sidebar {
  width: 280px;
  padding: 24px;
  border: 1px solid #e2e8f0;
}`}
          />
          <Paragraph>
            Under `border-box`, the sidebar still renders at `280px` wide. That
            predictability is why most codebases normalize to it globally.
          </Paragraph>
          <Callout variant="tip">
            If an interviewer asks how to prevent padding from unexpectedly
            increasing width, `box-sizing: border-box` is the direct answer.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Interview-Relevant Sizing Rules</SectionHeader>

        <CollapsibleSection title="Intrinsic Sizing, Min/Max Constraints, and Overflow" collapsible={false}>
          <Paragraph>
            Real components do not only depend on declared width. They also
            depend on content size, shrink behavior, and overflow rules. This
            is where many flex and grid bugs come from.
          </Paragraph>
          <CodeBlock
            language="css"
            code={`.panel {
  width: 100%;
  max-width: 48rem;
  min-height: 12rem;
}

.result-title {
  overflow-wrap: anywhere;
}

.table-wrapper {
  overflow-x: auto;
}`}
          />
          <Paragraph>
            `max-width` prevents lines from becoming unreadably wide, `min-*`
            constraints keep UI usable, and overflow rules determine whether
            content wraps, clips, or scrolls.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="The `min-width: 0` Trap in Flex and Grid" collapsible={false}>
          <Paragraph>
            Flex and grid children often refuse to shrink because their default
            minimum size is based on content. That is why long text can overflow
            a layout even when everything looks correct at first glance.
          </Paragraph>
          <CodeBlock
            language="css"
            code={`.layout {
  display: flex;
}

.sidebar {
  width: 18rem;
}

.content {
  flex: 1;
  min-width: 0;
}`}
          />
          <Paragraph>
            Without `min-width: 0`, a long URL or code sample inside `.content`
            can force the parent wider than the viewport. This is one of the
            most common interview and production CSS gotchas.
          </Paragraph>
          <Callout variant="warning">
            When a flexible child refuses to shrink, check `min-width` or
            `min-height` before blaming Flexbox or Grid.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Practical Sizing Patterns">
          <CodeBlock
            language="css"
            code={`.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}

.media {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}`}
          />
          <Paragraph>
            These patterns show interview-level judgment: constrain line length,
            let cards grow fluidly, and reserve media space to avoid layout
            shift.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Forgetting that default `width` does not include padding and border.</li>
            <li>Using fixed heights for content that should grow naturally.</li>
            <li>Ignoring intrinsic sizing when flex or grid children overflow.</li>
            <li>Missing `min-width: 0` on flexible content areas.</li>
            <li>Confusing margin for internal spacing that should be padding or `gap`.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CssBoxModel;
