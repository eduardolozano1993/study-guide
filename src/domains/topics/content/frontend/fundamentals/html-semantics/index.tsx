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
import { htmlSemanticsLesson } from "./meta";

export function HtmlSemantics() {
  return (
    <TopicLessonPage
      title={htmlSemanticsLesson.title}
      summary={htmlSemanticsLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={htmlSemanticsLesson.estimatedReadingTimeMinutes}
      difficulty={htmlSemanticsLesson.difficulty}
      relatedTopics={[
        { label: "Accessibility Basics", href: "/topic/accessibility" },
        { label: "DOM, Events, and Event Propagation", href: "/topic/dom-events" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="W"
          title="Semantic HTML"
          description="Interviewers expect you to choose elements for meaning first, then style them. Semantics improve accessibility, maintainability, and browser understanding."
        />

        <CollapsibleSection title="Why Semantic HTML Matters" collapsible={false}>
          <Paragraph>
            Semantic HTML uses elements that describe the role of content:
            headings, landmarks, articles, lists, buttons, and forms. That
            gives browsers and assistive technology stronger signals than a page
            built from generic `div` and `span` elements.
          </Paragraph>
          <Paragraph>
            In interviews, the usual question is not whether you know every
            tag. It is whether you can structure a page correctly without
            reaching for non-semantic wrappers everywhere.
          </Paragraph>
          <Callout variant="tip">
            Use the most meaningful native element first, then add classes for
            layout and styling.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Core Landmarks and Structure" collapsible={false}>
          <SubHeader>Page-level landmarks</SubHeader>
          <Paragraph>
            `header`, `nav`, `main`, `aside`, and `footer` define major regions
            of a page and improve navigation for assistive technology.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`<body>
  <header>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/pricing">Pricing</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Semantic HTML Basics</h1>
      <p>Learn structure before styling.</p>
    </article>
  </main>

  <footer>Last updated April 2026</footer>
</body>`}
          />

          <SubHeader>`article` vs `section` vs `div`</SubHeader>
          <Paragraph>
            Use `article` for self-contained content, `section` for a thematic
            grouping with a heading, and `div` when no semantic element fits.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Text, Lists, and Native Controls">
          <Paragraph>
            Good HTML also means using correct heading hierarchy, lists for list
            data, and native controls such as `button`, `a`, and form inputs.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`<h1>Frontend Interview Guide</h1>
<h2>Core Topics</h2>
<ul>
  <li>Semantic HTML</li>
  <li>Accessibility</li>
  <li>Performance</li>
</ul>

<label for="email">Email</label>
<input id="email" type="email" />
<button type="submit">Subscribe</button>`}
          />
        </CollapsibleSection>

        <SectionHeader>Interview Pitfalls</SectionHeader>

        <CollapsibleSection title="Common Mistakes">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using `div` for buttons, links, or other interactive controls.</li>
            <li>Choosing headings for visual size instead of hierarchy.</li>
            <li>Using `section` everywhere with no meaningful grouping.</li>
            <li>Skipping labels and landmarks.</li>
            <li>Relying on placeholders as form instructions.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default HtmlSemantics;
