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
import { responsiveDesignLesson } from "./meta";

export function ResponsiveDesign() {
  return (
    <TopicLessonPage
      title={responsiveDesignLesson.title}
      summary={responsiveDesignLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={responsiveDesignLesson.estimatedReadingTimeMinutes}
      difficulty={responsiveDesignLesson.difficulty}
      relatedTopics={[
        { label: "CSS Box Model and Sizing", href: "/topic/css-box-model" },
        { label: "CSS Layout: Flexbox, Grid, Positioning", href: "/topic/css-layout" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="R"
          title="Responsive Design and Mobile-First CSS"
          description="High-quality interview answers focus on fluid systems, content-driven breakpoints, and preserving usability across viewports, not memorizing device sizes."
        />

        <CollapsibleSection title="What Mobile-First Actually Means" collapsible={false}>
          <Paragraph>
            Mobile-first means starting with the smallest practical layout and
            progressively enhancing it as space becomes available. It is not
            just a syntax choice for media queries. It is a prioritization
            choice: decide what must work everywhere before adding complexity.
          </Paragraph>
          <CodeBlock
            language="css"
            code={`.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 72rem) {
  .cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Responsive Design Is About Content, Not Devices" collapsible={false}>
          <Paragraph>
            Good breakpoints appear where the layout stops working: line length
            becomes uncomfortable, cards become too narrow, or controls no
            longer fit. That is more stable than targeting specific phones or
            laptops.
          </Paragraph>
          <Callout variant="tip">
            Use breakpoints because the design needs a new layout, not because
            a framework gave you a named screen size.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Practical Techniques</SectionHeader>

        <CollapsibleSection title="Fluid Containers, Media, and Typography" collapsible={false}>
          <CodeBlock
            language="css"
            code={`img,
video {
  display: block;
  max-width: 100%;
  height: auto;
}

.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

.title {
  font-size: clamp(1.5rem, 1.1rem + 2vw, 3rem);
}`}
          />
          <Paragraph>
            The best responsive systems mix percentages, viewport-aware sizing,
            max constraints, and `clamp()` so the UI scales smoothly between
            breakpoints instead of jumping abruptly.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Example: Turning a Desktop Shell into a Responsive Layout" collapsible={false}>
          <CodeBlock
            language="css"
            code={`.page {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.sidebar {
  order: 2;
}

.main {
  order: 1;
}

@media (min-width: 64rem) {
  .page {
    grid-template-columns: 18rem minmax(0, 1fr);
    align-items: start;
  }

  .sidebar,
  .main {
    order: initial;
  }
}`}
          />
          <Paragraph>
            This is the kind of example interviewers like because it shows real
            decision-making: stack by default, add columns when space exists,
            and preserve readable main content width.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Modern Responsive Strategy</SectionHeader>

        <CollapsibleSection title="Container Queries and Responsive Media" collapsible={false}>
          <CodeBlock
            language="css"
            code={`.card-grid {
  container-type: inline-size;
}

@container (min-width: 36rem) {
  .card {
    grid-template-columns: 9rem minmax(0, 1fr);
  }
}`}
          />
          <Paragraph>
            Viewport breakpoints are not enough for every component. Container
            queries let components adapt to the space they actually receive,
            which is often more reusable inside dashboards, sidebars, and CMS
            layouts.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Fluid Scaling vs Hard Breakpoints vs System Constraints" collapsible={false}>
          <BulletList
            items={[
              "Fluid sizing with percentages and `clamp()` can reduce the number of hard jumps in the UI.",
              "Hard breakpoints are still useful when the information architecture truly changes, such as stacked cards becoming a multi-column shell.",
              "Design-system constraints sometimes deliberately limit fluid behavior so spacing, typography, and component composition stay predictable.",
              "The strongest answer explains which constraint dominates instead of saying one responsive technique always wins.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why is mobile-first a prioritization strategy and not only a media-query syntax style?",
              "When are container queries better than viewport breakpoints?",
              "How do zoom, touch target size, safe areas, and soft keyboards affect responsive decisions?",
              "When would you choose fluid scaling versus a hard breakpoint in a design system?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Desktop-first CSS with many overrides that become hard to maintain.",
              "Fixed widths that cause horizontal scrolling.",
              "Ignoring touch target size, spacing, and text readability on small screens.",
              "Treating viewport breakpoints as the whole responsive story while ignoring container-driven adaptation.",
              "Using too many breakpoints with no content-based reason.",
              "Forgetting that images, tables, and code blocks also need responsive behavior.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ResponsiveDesign;
