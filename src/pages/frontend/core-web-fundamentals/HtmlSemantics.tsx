import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  SubHeader,
  TopicCard,
} from "@/features/content";

export function HtmlSemantics() {
  return (
    <div className="space-y-8">
      <TopicCard
        className="mb-2"
        icon="📜"
        title="Semantic HTML"
        description="Use HTML elements that describe meaning first. The most important ideas stay visible; reference-heavy details collapse only when they are secondary."
      />

      <CollapsibleSection title="Why Semantic HTML Matters" collapsible={false}>
        <Paragraph>
          Semantic elements make structure obvious to browsers, assistive
          technology, and other developers. They improve navigation, make code
          easier to reason about, and give search engines better signals.
        </Paragraph>
        <Callout variant="tip">
          Good docs layouts should not hide the core explanation. This section
          stays open because it is foundational context, not optional detail.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Structural Semantic Elements" collapsible={false}>
        <Paragraph>
          These are the main building blocks users need to learn first, so they
          should remain immediately visible instead of being buried behind a
          disclosure.
        </Paragraph>

        <SubHeader>&lt;header&gt;</SubHeader>
        <Paragraph>
          Introductory content for a page or section. It often contains titles,
          logos, metadata, or navigation.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/docs">Docs</a>
  </nav>
</header>`}
        />

        <SubHeader>&lt;nav&gt;</SubHeader>
        <Paragraph>
          Reserve `nav` for major navigation areas, not every list of links.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<nav aria-label="Main navigation">
  <ul>
    <li><a href="/guides">Guides</a></li>
    <li><a href="/tutorials">Tutorials</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`}
        />

        <SubHeader>&lt;main&gt;</SubHeader>
        <Paragraph>
          The primary content of the document. There should only be one
          `main` landmark per page.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<body>
  <header>...</header>
  <main>
    <h1>Page Title</h1>
    <article>Main content unique to this page</article>
  </main>
</body>`}
        />

        <SubHeader>&lt;article&gt;, &lt;section&gt;, &lt;aside&gt;, &lt;footer&gt;</SubHeader>
        <Paragraph>
          Use `article` for self-contained content, `section` for thematic
          groups with headings, `aside` for tangential content, and `footer`
          for metadata or secondary links.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<article>
  <h2>How to Learn React</h2>
  <section>
    <h3>Core Concepts</h3>
    <p>Start with components, props, and state.</p>
  </section>
  <aside>Related reading</aside>
  <footer>Written by Jane Developer</footer>
</article>`}
        />

        <Callout variant="note">
          A section is not just a styled box. If the content does not form a
          meaningful unit with a heading, a plain `div` is usually better.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Text-Level Semantic Elements">
        <Paragraph>
          This is useful reference material, but it is not the first thing a
          learner needs. Collapsing it keeps the page scannable.
        </Paragraph>

        <SubHeader>&lt;time&gt;</SubHeader>
        <Paragraph>
          Use it for machine-readable dates, times, or durations.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<time datetime="2026-03-28">March 28, 2026</time>
<time datetime="PT45M">45 minutes</time>`}
        />

        <SubHeader>&lt;mark&gt;, &lt;address&gt;, &lt;figure&gt;</SubHeader>
        <Paragraph>
          These elements add useful semantics for highlighted text, author
          contact details, and self-contained media or diagrams.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<figure>
  <img src="/diagram.png" alt="App architecture diagram" />
  <figcaption>System overview</figcaption>
</figure>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Lists and Figures">
        <Paragraph>
          Keep this collapsed because it is supportive detail, not the main
          conceptual path through the page.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<ul>
  <li>Unordered item</li>
</ul>

<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
</dl>`}
        />
      </CollapsibleSection>

      <SectionHeader>HTML Forms</SectionHeader>

      <TopicCard
        icon="📝"
        title="HTML Forms"
        description="Forms are high-value material, so the practical sections stay open. Reference-only lists can collapse."
      />

      <CollapsibleSection title="Form Structure & Best Practices" collapsible={false}>
        <Paragraph>
          Forms collect user input and should be easy to scan, label, and
          validate. Structure and accessibility matter more than visual styling.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<form action="/submit" method="POST">
  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" required />

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required />

  <button type="submit">Sign in</button>
</form>`}
        />
        <Callout variant="tip">
          Label-to-input association is core knowledge, so it should never be
          hidden in a collapsed section on a study page.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Form Validation" collapsible={false}>
        <SubHeader>Built-in Validation</SubHeader>
        <Paragraph>
          Native validation covers many cases before JavaScript is needed.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<input
  type="email"
  required
  minlength="5"
  maxlength="100"
  placeholder="you@example.com"
/>

<input type="number" min="1" max="100" step="1" />`}
        />

        <SubHeader>Custom Validation Messages</SubHeader>
        <CodeBlock
          language="javascript"
          code={`const input = document.getElementById("username");

input.addEventListener("invalid", () => {
  if (input.validity.valueMissing) {
    input.setCustomValidity("Please enter a username");
  }
});

input.addEventListener("input", () => {
  input.setCustomValidity("");
});`}
        />

        <Callout variant="warning">
          Client-side validation improves UX, but the server must still enforce
          the rules.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Form Accessibility" collapsible={false}>
        <Paragraph>
          This also stays open because it is essential knowledge, not optional
          reference material.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<fieldset>
  <legend>Shipping Address</legend>

  <label for="street">Street Address</label>
  <input type="text" id="street" name="street" />
</fieldset>

<input
  type="email"
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
/>
<span id="email-error">Please enter a valid email address</span>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Form Input Types">
        <Paragraph>
          This is practical reference material. It makes sense as a disclosure
          because users often revisit it rather than read it linearly.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<input type="email" />
<input type="tel" />
<input type="url" />
<input type="date" />
<input type="time" />
<input type="search" />`}
        />
      </CollapsibleSection>

      <SectionHeader>SEO Fundamentals</SectionHeader>

      <TopicCard
        icon="🔎"
        title="SEO Fundamentals"
        description="Keep the search-result basics visible. Collapse social-sharing and structured-data details until they are needed."
      />

      <CollapsibleSection title="Title Tags & Meta Description" collapsible={false}>
        <Paragraph>
          This is the most important SEO section for most learners, so it stays
          visible by default.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<head>
  <title>How to Learn React | Beginner Guide</title>
  <meta
    name="description"
    content="A beginner-friendly guide to learning React with practical examples."
  />
</head>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Open Graph & Social Sharing">
        <Paragraph>
          Useful, but secondary. It makes sense to collapse because it is
          platform-specific metadata.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<meta property="og:title" content="How to Learn React" />
<meta property="og:description" content="A practical React guide." />
<meta property="og:image" content="https://example.com/og-image.jpg" />`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Canonical URLs">
        <Paragraph>
          Canonicals matter when duplicate URLs exist, but they are not always
          the first concept to teach, so collapsing them is reasonable.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<link rel="canonical" href="https://example.com/canonical-page" />`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="JSON-LD Structured Data">
        <Paragraph>
          Structured data is reference-heavy and more advanced than the basics,
          so this is a good candidate for a collapsed section.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Learn React"
}
</script>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Additional SEO Best Practices">
        <CodeBlock
          language="html"
          code={`<h1>Page Title</h1>
<h2>Main Section</h2>
<img
  src="/images/diagram.png"
  alt="Diagram showing React component relationships"
  width="800"
  height="600"
/>`}
        />
        <Callout variant="important">
          Core Web Vitals, image optimization, and clear heading structure have
          more day-to-day impact than piling every SEO detail into the main
          reading flow.
        </Callout>
      </CollapsibleSection>

      <SectionHeader>Quick Reference</SectionHeader>

      <CollapsibleSection title="Semantic HTML Cheat Sheet">
        <CodeBlock
          language="html"
          code={`<header>Page or section header</header>
<nav>Main navigation landmark</nav>
<main>Primary page content</main>
<article>Self-contained content</article>
<section>Thematic grouping with heading</section>
<aside>Related but tangential content</aside>
<footer>Metadata or related links</footer>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="SEO Checklist">
        <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
          <li>Use a unique, descriptive title tag.</li>
          <li>Write a concise meta description.</li>
          <li>Keep heading hierarchy logical.</li>
          <li>Add descriptive alt text to images.</li>
          <li>Use canonicals when duplicate URLs exist.</li>
          <li>Add Open Graph tags for social previews.</li>
        </ul>
      </CollapsibleSection>
    </div>
  );
}

export default HtmlSemantics;
