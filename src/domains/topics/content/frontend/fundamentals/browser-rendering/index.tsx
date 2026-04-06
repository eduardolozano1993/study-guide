import {
  Callout,
  CodeBlock,
  CollapsibleSection,
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
          description="Interviewers use rendering questions to test whether you understand where visual cost comes from: parsing, style calculation, layout, paint, compositing, and main-thread work."
        />

        <CollapsibleSection title="The Simplified Rendering Pipeline" collapsible={false}>
          <Paragraph>
            A practical browser model is: parse HTML into the DOM, parse CSS
            into the CSSOM, combine them into a render tree, calculate layout,
            paint pixels, and composite layers to the screen.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`HTML -> DOM
CSS -> CSSOM
DOM + CSSOM -> Render tree
Render tree -> Layout
Layout -> Paint
Paint -> Composite`}
          />
          <Paragraph>
            This is simplified, but it is accurate enough for most interview
            questions about rendering performance and visual glitches.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="What Different Changes Cost" collapsible={false}>
          <Paragraph>
            Not every update is equally expensive. Geometry changes often force
            layout. Pixel changes require paint. Some changes can be handled
            mostly at the compositing stage.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`element.style.transform = "translateX(20px)"; // often composite
element.style.opacity = "0.5"; // often composite
element.style.backgroundColor = "tomato"; // paint
element.style.width = "400px"; // layout + paint`}
          />
          <Callout variant="tip">
            Interview shorthand: layout changes geometry, paint changes pixels,
            compositing assembles layers.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Why Rendering Knowledge Matters</SectionHeader>

        <CollapsibleSection title="Critical Rendering Path and Render Blocking" collapsible={false}>
          <Paragraph>
            Browsers cannot paint useful content until they have enough HTML and
            CSS to build the render tree. CSS is render-blocking for that
            reason. JavaScript can also delay rendering when it blocks parsing
            or monopolizes the main thread.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`<link rel="stylesheet" href="/app.css" />
<script defer src="/app.js"></script>`}
          />
          <Paragraph>
            `defer` helps scripts wait until HTML parsing completes, which is
            why it is a common answer when interviewers ask how to reduce
            blocking behavior.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Layout Thrashing">
          <Paragraph>
            Layout thrashing happens when code alternates DOM writes with layout
            reads, forcing the browser to recalculate layout repeatedly within a
            single interaction.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`for (const item of items) {
  item.style.width = "200px";
  console.log(item.offsetWidth);
}`}
          />
          <Paragraph>
            A better pattern is batching reads together, then batching writes
            together.
          </Paragraph>
          <Callout variant="warning">
            If you can explain layout thrashing clearly, you are already above
            the level of many "frontend basics" answers.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Treating rendering as one opaque step.</li>
            <li>Not knowing that CSS can delay first paint.</li>
            <li>Assuming every animation is equally cheap.</li>
            <li>Ignoring main-thread JavaScript cost when discussing perceived performance.</li>
            <li>Reading layout repeatedly right after style writes.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default BrowserRendering;
