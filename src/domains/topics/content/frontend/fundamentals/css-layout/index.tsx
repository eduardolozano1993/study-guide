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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Saying Flexbox and Grid are interchangeable.</li>
            <li>Forgetting the main axis and cross axis change with `flex-direction`.</li>
            <li>Using margins everywhere instead of `gap` inside layout containers.</li>
            <li>Not understanding the containing block for absolutely positioned elements.</li>
            <li>Trying to solve page layout by stacking absolute positions.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CssLayout;
