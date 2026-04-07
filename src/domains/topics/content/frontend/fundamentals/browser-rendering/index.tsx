import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { browserRenderingLesson } from "./meta";

export function BrowserRendering() {
  return (
    <TopicLessonPage
      title={browserRenderingLesson.title}
      summary={browserRenderingLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={browserRenderingLesson.estimatedReadingTimeMinutes}
      difficulty={browserRenderingLesson.difficulty}
      relatedTopics={[
        { label: "Performance Fundamentals", href: "/topic/performance-fundamentals" },
        { label: "CSS Layout: Flexbox, Grid, Positioning", href: "/topic/css-layout" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="B"
          title="Browser Rendering Basics"
          description="Interviewers use rendering questions to test whether you know where visual cost comes from: parsing, style recalculation, layout, paint, compositing, and main-thread work."
        />

        <CollapsibleSection title="A Useful Rendering Pipeline Model" collapsible={false}>
          <Paragraph>
            A practical browser model is: parse HTML into the DOM, parse CSS
            into the CSSOM, calculate styles, determine layout, paint pixels,
            and composite layers to the screen.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`HTML -> DOM
CSS -> CSSOM
DOM + CSSOM -> style calculation
style -> layout
layout -> paint
paint -> composite`}
          />
          <Paragraph>
            This is simplified, but it is accurate enough for most interview
            questions about rendering performance and visual glitches.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>What Different Changes Actually Cost</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "stage", label: "Typical stage hit" },
            { key: "example", label: "Example" },
          ]}
          rows={[
            {
              label: "Geometry change",
              values: {
                stage: "Often layout, then paint, then composite.",
                example: "Changing width, height, top, or left.",
              },
            },
            {
              label: "Visual-only change",
              values: {
                stage: "Usually paint, then composite.",
                example: "Changing background color or box shadow.",
              },
            },
            {
              label: "Compositor-friendly change",
              values: {
                stage: "Often mostly composite when the layer setup allows it.",
                example: "Animating transform or opacity.",
              },
            },
          ]}
        />
        <CodeBlock
          language="javascript"
          code={`element.style.transform = "translateX(20px)"; // often composite
element.style.opacity = "0.5"; // often composite
element.style.backgroundColor = "tomato"; // paint
element.style.width = "400px"; // layout + paint`}
        />
        <Callout variant="tip">
          Interview shorthand: layout changes geometry, paint changes pixels,
          compositing assembles layers. That shorthand is useful, but it is not
          permission to ignore the actual page context.
        </Callout>

        <SectionHeader>Render Blocking and Jank</SectionHeader>
        <BulletList
          items={[
            "CSS is render-blocking because the browser needs styles before it can paint correct layout.",
            "Synchronous JavaScript can block parsing or monopolize the main thread even after initial HTML arrives.",
            "Animating `transform` often helps because it can avoid repeated layout, but forced layer promotion still has memory cost.",
            "A janky animation is often a combination of heavy scripting, repeated layout invalidation, and too much paint work.",
          ]}
        />

        <CollapsibleSection title="Layout thrashing example">
          <CodeBlock
            language="javascript"
            code={`for (const item of items) {
  item.style.width = "200px";
  console.log(item.offsetWidth);
}`}
          />
          <Paragraph>
            Layout thrashing happens when code alternates DOM writes with layout
            reads, forcing the browser to recalculate repeatedly inside one
            interaction. Batch reads together, then batch writes together.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>How to Debug Rendering Problems</SectionHeader>
        <BulletList
          items={[
            "Use the browser Performance panel to see whether the cost is scripting, style recalculation, layout, paint, or composite work.",
            "Inspect layers and rendering tools when `z-index`, sticky positioning, or animations behave unexpectedly.",
            "Ask whether the problem is parser blocking, render blocking, main-thread saturation, or a hot DOM mutation loop.",
            "When an animation janks, compare `transform` and `opacity` strategies against layout-affecting properties like `top` and `left`.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why is CSS render-blocking?",
              "Why can `transform` help when animating `top` or `left` hurts?",
              "What causes layout thrashing, and how would you detect it?",
              "How would you investigate a slow or janky animation in DevTools?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default BrowserRendering;
