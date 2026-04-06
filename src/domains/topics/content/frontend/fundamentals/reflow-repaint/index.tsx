import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { reflowRepaintLesson } from "./meta";

export function ReflowRepaint() {
  return (
    <TopicLessonPage
      title={reflowRepaintLesson.title}
      summary={reflowRepaintLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={reflowRepaintLesson.estimatedReadingTimeMinutes}
      difficulty={reflowRepaintLesson.difficulty}
      relatedTopics={[
        { label: "Browser Rendering Basics", href: "/topic/browser-rendering" },
        { label: "Performance Fundamentals", href: "/topic/performance-fundamentals" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="R"
          title="Reflow and Repaint"
          description="Interviewers ask this topic to see whether you understand what kinds of DOM and style changes actually cost the browser work."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          Reflow, also called layout, happens when the browser has to
          recalculate element geometry: sizes, positions, and how elements
          affect one another in the document flow.
        </Paragraph>
        <Paragraph>
          Repaint happens when geometry stays the same but pixels need to be
          redrawn, such as color, background, border, or shadow changes.
          Reflow is usually more expensive because it often leads to repaint as
          well.
        </Paragraph>
        <Callout variant="tip">
          Short interview version: reflow changes geometry, repaint changes
          pixels.
        </Callout>

        <CollapsibleSection title="Typical examples" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`element.style.width = "320px"; // reflow + repaint
element.style.padding = "24px"; // reflow + repaint
element.style.backgroundColor = "tomato"; // repaint
element.style.color = "#111"; // repaint
element.style.transform = "translateX(20px)"; // often composite only
element.style.opacity = "0.5"; // often composite only`}
          />
          <Paragraph>
            Geometry-affecting changes are more disruptive because nearby
            elements may also need layout updates. Pure pixel changes avoid that
            layout pass, while transform and opacity can often skip both layout
            and paint-heavy work.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Why It Matters</SectionHeader>

        <CollapsibleSection title="Layout thrashing" collapsible={false}>
          <Paragraph>
            One of the most common performance problems is layout thrashing:
            code alternates writes that invalidate layout with reads that force
            the browser to calculate layout immediately.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`for (const card of cards) {
  card.style.width = "200px";
  console.log(card.offsetWidth);
}`}
          />
          <Paragraph>
            A better pattern is batching reads first, then batching writes, so
            the browser does not keep recalculating layout inside the same loop.
          </Paragraph>
          <Callout variant="warning">
            If you can explain forced synchronous layout clearly, you are
            usually above the level of many frontend basics answers.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="What to optimize for">
          <Paragraph>
            In hot paths like animations, scrolling, resizing, and drag
            interactions, prefer changes that avoid layout when possible. That
            usually means avoiding width, height, top, and left when transform
            or opacity can achieve the same visual outcome.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`// less ideal for animation
box.style.left = "120px";

// usually better
box.style.transform = "translateX(120px)";`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common interview pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using reflow and repaint as if they mean the same thing.</li>
            <li>Forgetting that reflow often causes repaint too.</li>
            <li>Ignoring layout reads like `offsetWidth`, `getBoundingClientRect`, or `scrollTop` in performance discussions.</li>
            <li>Claiming every animation is cheap without separating layout, paint, and compositing.</li>
            <li>Suggesting transform and opacity without explaining why they are usually preferred.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReflowRepaint;
