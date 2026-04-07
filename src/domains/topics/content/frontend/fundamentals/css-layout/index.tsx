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
import { cssLayoutLesson } from "./meta";

export function CssLayout() {
  return (
    <TopicLessonPage
      title={cssLayoutLesson.title}
      summary={cssLayoutLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={cssLayoutLesson.estimatedReadingTimeMinutes}
      difficulty={cssLayoutLesson.difficulty}
      relatedTopics={[
        { label: "CSS Box Model and Sizing", href: "/topic/css-box-model" },
        { label: "Responsive Design and Mobile-First CSS", href: "/topic/responsive-design" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="L"
          title="CSS Layout"
          description="Strong interview answers explain layout in terms of normal flow, formatting context, and choosing the right tool for the shape of the problem."
        />

        <CollapsibleSection title="Normal Flow Is the Baseline" collapsible={false}>
          <Paragraph>
            Before Flexbox or Grid, every element participates in normal
            document flow. Block elements stack, inline content wraps within
            line boxes, and elements influence each other's position unless they
            are explicitly taken out of flow.
          </Paragraph>
          <Paragraph>
            The first debugging question should be: is this element in normal
            flow, inside a flex or grid formatting context, or positioned
            independently?
          </Paragraph>
          <Callout variant="tip">
            Many layout bugs are not "Flexbox bugs." They are flow or sizing
            misunderstandings inside a layout system.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="When Flexbox Is the Right Tool" collapsible={false}>
          <Paragraph>
            Flexbox is for one-dimensional layout. Use it when the main problem
            is distributing or aligning items across a row or a column.
          </Paragraph>
          <CodeBlock
            language="css"
            code={`.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}`}
          />
          <SubHeader>Good fits</SubHeader>
          <Paragraph>
            Navbars, toolbars, button groups, pill lists, and vertical stacks
            where alignment matters more than explicit tracks.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="When Grid Is the Right Tool" collapsible={false}>
          <Paragraph>
            Grid is for two-dimensional layout. Use it when both columns and
            rows matter, or when the design is defined by named areas and track
            sizing rather than item distribution.
          </Paragraph>
          <CodeBlock
            language="css"
            code={`.dashboard {
  display: grid;
  grid-template-columns: 18rem minmax(0, 1fr);
  grid-template-areas:
    "sidebar main";
  gap: 1.5rem;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}`}
          />
          <Paragraph>
            A common interview distinction is: Flexbox aligns items; Grid
            defines tracks.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Positioning and Layering</SectionHeader>

        <CollapsibleSection title="Relative, Absolute, Fixed, Sticky" collapsible={false}>
          <CodeBlock
            language="css"
            code={`.field {
  position: relative;
}

.tooltip {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
}

.app-header {
  position: sticky;
  top: 0;
}`}
          />
          <Paragraph>
            `absolute` positions relative to the nearest positioned ancestor.
            `fixed` positions relative to the viewport. `sticky` stays in flow
            until a scroll threshold is crossed, which makes it ideal for table
            headers, sidebars, and persistent nav.
          </Paragraph>
          <Callout variant="warning">
            Absolute positioning is for overlays and anchored UI, not for
            composing full-page layout. If it becomes your main layout tool,
            the structure is probably wrong.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Scenarios">
          <CodeBlock
            language="text"
            code={`Choose Flexbox:
- navbar items
- action row
- vertical stack with spacing

Choose Grid:
- page shell with sidebar + content
- card gallery with track control
- dashboard with rows and columns

Choose positioning:
- tooltip
- dropdown
- badge
- sticky header`}
          />
        </CollapsibleSection>

        <SectionHeader>Hard Cases and Debugging</SectionHeader>

        <CollapsibleSection title="Flex and Grid Fail on Sizing More Than Syntax" collapsible={false}>
          <BulletList
            items={[
              "Flex items often overflow because intrinsic content size still wins unless you allow shrinking with `min-width: 0` or explicit constraints.",
              "Grid auto-placement is powerful, but the result depends on track definitions, content size, and whether items are spanning tracks.",
              "Alignment answers where items sit inside available space. Distribution answers how remaining space is divided. Mixing those ideas causes many weak interview answers.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Positioning Pitfalls: Containing Blocks and Stacking Contexts" collapsible={false}>
          <BulletList
            items={[
              "`absolute` looks for the nearest containing block, which is often created by a positioned ancestor, not by visual nesting alone.",
              "`fixed` can behave unexpectedly when transforms or certain containment rules create a different containing context.",
              "`z-index` only makes sense within stacking contexts, which is why 'z-index is not working' is usually a diagnosis failure rather than a browser bug.",
              "`sticky` fails when scroll containers, overflow clipping, or missing inset values break the conditions it depends on.",
            ]}
          />
          <Callout variant="warning">
            If layering is broken, inspect stacking context boundaries before
            increasing `z-index` values randomly.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="A Senior Layout Debugging Heuristic" collapsible={false}>
          <BulletList
            items={[
              "Identify the formatting context first: normal flow, flex, grid, or positioned overlay.",
              "Check sizing constraints next: intrinsic size, min/max rules, and whether children are allowed to shrink.",
              "Inspect overflow and scroll containers before changing layout primitives.",
              "Only then debug positioning and layering rules such as containing blocks and stacking contexts.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why can a grid or flex item overflow even when the tracks look correct?",
              "What is the difference between alignment and space distribution in Flexbox or Grid?",
              "Why is `z-index` often the wrong first explanation when an overlay appears underneath something else?",
              "How would you systematically debug a layout bug without guessing between Flexbox, Grid, and positioning?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Saying Flexbox and Grid are interchangeable.",
              "Forgetting the main axis and cross axis change with `flex-direction`.",
              "Using margins everywhere instead of `gap` inside layout containers.",
              "Not understanding the containing block for absolutely positioned elements.",
              "Ignoring intrinsic sizing and overflow when a layout refuses to shrink.",
              "Trying to solve page layout by stacking absolute positions.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CssLayout;
