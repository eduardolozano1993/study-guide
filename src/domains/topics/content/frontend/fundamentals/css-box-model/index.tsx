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

        <SectionHeader>Edge Cases and Tradeoffs</SectionHeader>

        <CollapsibleSection title="Intrinsic Size Keywords and Overflow Reality" collapsible={false}>
          <CodeBlock
            language="css"
            code={`.tag {
  inline-size: max-content;
}

.sidebar {
  inline-size: fit-content(20rem);
}

.search-result {
  min-inline-size: min-content;
}`}
          />
          <BulletList
            items={[
              "`min-content` shrinks toward the smallest size the content can tolerate without avoidable overflow.",
              "`max-content` expands to the size the content would ideally take with no soft wrapping.",
              "`fit-content(...)` caps growth, which is useful when content should size naturally but not take over the layout.",
              "Overflow is still part of the sizing conversation because intrinsic size can be larger than the available space.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="`content-box` vs `border-box` Is a Tradeoff, Not a Law" collapsible={false}>
          <BulletList
            items={[
              "`border-box` is usually better for app layouts and component libraries because declared sizes map more closely to visible boxes.",
              "`content-box` can still be useful when you intentionally want padding and borders to add to intrinsic content size.",
              "Third-party embeds or older CSS assumptions can behave strangely when they were designed around the default model.",
              "In design systems, consistency matters more than ideology. Pick one default and document the exceptions.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why can a flex or grid child overflow even when it has `width: 100%`?",
              "Why does `min-width: 0` fix some truncation and overflow bugs?",
              "Why does declared width not always equal rendered width once scrollbars, padding, borders, or replaced elements are involved?",
              "When would `content-box` still be reasonable instead of defaulting to `border-box` everywhere?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Forgetting that default `width` does not include padding and border.",
              "Using fixed heights for content that should grow naturally.",
              "Ignoring intrinsic sizing when flex or grid children overflow.",
              "Missing `min-width: 0` on flexible content areas.",
              "Assuming declared width guarantees final rendered width.",
              "Confusing margin for internal spacing that should be padding or `gap`.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CssBoxModel;
