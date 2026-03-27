import {
  TopicCard,
  CollapsibleSection,
  Callout,
  CodeBlock,
  SectionHeader,
  Paragraph,
  SubHeader,
} from "@/features/content";

export function HtmlSemantics() {
  return (
    <>
      <TopicCard
        icon="📜"
        title="Semantic HTML"
        description="Learn when to use article, section, nav, and aside elements for meaningful markup."
        href="#"
      />

      <CollapsibleSection title="Why Semantic HTML Matters" defaultOpen={true}>
        <Paragraph>
          Semantic HTML elements clearly describe their meaning to both browsers
          and developers. They help screen readers navigate content and improve
          SEO rankings.
        </Paragraph>
        <Callout variant="tip">
          Screen reader users often navigate by landmarks (nav, main, aside).
          Using semantic elements creates a better experience for them.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Structural Semantic Elements">
        <SubHeader>&lt;header&gt;</SubHeader>
        <Paragraph>
          Represents introductory content or a group of navigational aids. Can
          contain headings, logos, search forms, and author names.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<header>
  <nav aria-label="Main navigation">
    <logo />
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>`}
        />

        <SubHeader>&lt;nav&gt;</SubHeader>
        <Paragraph>
          Contains navigation links. Not all link groups need to be wrapped in
          nav — only major navigation blocks.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`}
        />

        <SubHeader>&lt;main&gt;</SubHeader>
        <Paragraph>
          The dominant content of the document. There should be only one main
          element per page. It should not include content that repeats across
          pages (sidebars, navigation links, etc.).
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <h1>Page Title</h1>
    <article>The main content unique to this page</article>
  </main>
  <footer>...</footer>
</body>`}
        />

        <SubHeader>&lt;article&gt;</SubHeader>
        <Paragraph>
          Self-contained content that could be distributed independently (blog
          posts, news articles, forum posts). Think of it as content that makes
          sense on its own.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<article>
  <header>
    <h1>How to Learn React</h1>
    <p>Published on <time datetime="2024-03-15">March 15, 2024</time></p>
  </header>
  <p>Article content goes here...</p>
  <footer>
    <p>Written by Jane Developer</p>
  </footer>
</article>`}
        />

        <SubHeader>&lt;section&gt;</SubHeader>
        <Paragraph>
          A thematic grouping of content, typically with a heading. Use section
          when content would be listed in a document outline.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<section>
  <h2>Features</h2>
  <p>Our product has the following features...</p>
</section>

<section>
  <h2>Pricing</h2>
  <p>Choose a plan that works for you...</p>
</section>`}
        />

        <SubHeader>&lt;aside&gt;</SubHeader>
        <Paragraph>
          Content tangentially related to the surrounding content, like a
          sidebar. It should make sense when separated from the main content.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<article>
  <h1>Main Article Title</h1>
  <p>Article content...</p>
  <aside>
    <h4>Related Articles</h4>
    <ul>
      <li><a href="#">Related Post 1</a></li>
      <li><a href="#">Related Post 2</a></li>
    </ul>
  </aside>
</article>`}
        />

        <SubHeader>&lt;footer&gt;</SubHeader>
        <Paragraph>
          Contains footer content for its nearest sectioning content or root
          element. Typically includes author info, copyright, related links,
          etc.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<footer>
  <p>© 2024 Company Name</p>
  <nav aria-label="Footer navigation">
    <a href="/privacy">Privacy Policy</a>
    <a href="/terms">Terms of Service</a>
  </nav>
</footer>`}
        />

        <Callout variant="note">
          Use the element that best describes the content's purpose. If none of
          the semantic elements fit, use a plain div.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Text-Level Semantic Elements">
        <SubHeader>&lt;time&gt;</SubHeader>
        <Paragraph>
          Represents a specific date, time, or duration. Always use the datetime
          attribute for machine-readable dates.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<time datetime="2024-03-15">March 15, 2024</time>
<time datetime="2024-03-15T14:30">March 15, 2024 at 2:30 PM</time>
<time datetime="P1D">1 day</time>`}
        />

        <SubHeader>&lt;mark&gt;</SubHeader>
        <Paragraph>
          Highlights or marks text that is relevant in the enclosing context
          (like search results).
        </Paragraph>
        <CodeBlock
          language="html"
          code={`Search results for: <mark>React hooks</mark>`}
        />

        <SubHeader>&lt;address&gt;</SubHeader>
        <Paragraph>
          Contact information for the author of the nearest article or body
          section. Not for physical addresses.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<address>
  Written by <a href="mailto:author@example.com">Jane Developer</a>.<br />
  Visit us at: <a href="https://example.com">example.com</a>
</address>`}
        />

        <SubHeader>&lt;figure&gt; and &lt;figcaption&gt;</SubHeader>
        <Paragraph>
          Represents self-contained content with an optional caption. Great for
          images, diagrams, code blocks, etc.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<figure>
  <img src="/diagram.png" alt="Architecture diagram" />
  <figcaption>Figure 1: System Architecture Overview</figcaption>
</figure>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Lists and Figures">
        <SubHeader>Semantic List Usage</SubHeader>
        <Paragraph>
          Use proper list elements for related items. ul for unordered lists, ol
          for ordered lists, and dl for description lists.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<!-- Unordered list for items without sequence -->
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>

<!-- Ordered list for sequential steps -->
<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>

<!-- Description list for term/definition pairs -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>`}
        />
      </CollapsibleSection>

      {/* HTML Forms Section */}
      <TopicCard
        icon="📝"
        title="HTML Forms"
        description="Master form structure, validation, and accessibility for user input."
        href="#"
      />

      <CollapsibleSection title="Form Structure & Best Practices">
        <Paragraph>
          Forms collect user input. Well-structured forms improve usability and
          accessibility. Always associate labels with form controls.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<form action="/submit" method="POST">
  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" required />

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required />

  <button type="submit">Sign In</button>
</form>`}
        />
        <Callout variant="tip">
          Always use the for attribute on labels to explicitly associate them
          with form controls. This improves accessibility and allows clicking
          the label to focus the input.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Form Validation">
        <SubHeader>HTML5 Built-in Validation</SubHeader>
        <Paragraph>
          HTML5 provides native validation attributes without JavaScript.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<input
  type="email"
  required
  minlength="5"
  maxlength="100"
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
  placeholder="you@example.com"
/>

<input type="number" min="1" max="100" step="1" />

<input
  type="text"
  required
  pattern="[A-Za-z]+"
  title="Letters only, no numbers or symbols"
/>`}
        />

        <SubHeader>Custom Validation Messages</SubHeader>
        <Paragraph>
          Use the setCustomValidity() method for custom error messages.
        </Paragraph>
        <CodeBlock
          language="javascript"
          code={`const input = document.getElementById('username');

input.addEventListener('invalid', (event) => {
  if (input.validity.valueMissing) {
    input.setCustomValidity('Please enter a username');
  } else if (input.validity.tooShort) {
    input.setCustomValidity('Username must be at least 3 characters');
  }
});

input.addEventListener('input', () => {
  input.setCustomValidity('');
});`}
        />

        <Callout variant="warning">
          Never rely solely on client-side validation. Always validate on the
          server as well. Client-side validation improves UX but does not
          provide security.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Form Accessibility">
        <Paragraph>
          Accessible forms work for everyone, including screen reader users and
          keyboard-only users.
        </Paragraph>
        <SubHeader>Key Accessibility Practices</SubHeader>
        <CodeBlock
          language="html"
          code={`<!-- Always associate labels with inputs -->
<label for="name">Full Name</label>
<input type="text" id="name" name="name" />

<!-- Use fieldset and legend for groups -->
<fieldset>
  <legend>Shipping Address</legend>

  <label for="street">Street Address</label>
  <input type="text" id="street" name="street" />

  <label for="city">City</label>
  <input type="text" id="city" name="city" />
</fieldset>

<!-- Indicate required fields clearly -->
<label for="email">
  Email Address
  <span aria-hidden="true">*</span>
  <span class="sr-only">(required)</span>
</label>
<input type="email" id="email" required aria-required="true" />

<!-- Provide error descriptions -->
<input
  type="email"
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
/>
<span id="email-error">Please enter a valid email address</span>`}
        />

        <SubHeader>Autocomplete Attributes</SubHeader>
        <Paragraph>
          The autocomplete attribute helps browsers fill forms faster and aids
          users with cognitive disabilities.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<input type="text" name="name" autocomplete="name" />
<input type="email" name="email" autocomplete="email" />
<input type="tel" name="tel" autocomplete="tel" />
<input type="street-address" name="address" autocomplete="street-address" />
<input type="url" name="website" autocomplete="url" />`}
        />

        <Callout variant="important">
          Forms should be keyboard-navigable. Ensure all interactive elements
          are reachable via Tab and activated via Enter or Space.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Form Input Types">
        <Paragraph>
          HTML5 provides many input types that improve UX with built-in keyboard
          layouts and validation.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<input type="email" />           <!-- Shows email keyboard -->
<input type="tel" />            <!-- Shows phone keyboard -->
<input type="url" />            <!-- Shows URL keyboard -->
<input type="number" />         <!-- Shows number input -->
<input type="date" />           <!-- Shows date picker -->
<input type="time" />           <!-- Shows time picker -->
<input type="datetime-local" /> <!-- Date and time picker -->
<input type="color" />          <!-- Color picker -->
<input type="range" />          <!-- Slider control -->
<input type="search" />         <!-- Search input with clear button -->`}
        />
      </CollapsibleSection>

      {/* SEO Section */}
      <TopicCard
        icon="🔍"
        title="SEO Fundamentals"
        description="Learn essential SEO techniques including meta tags, Open Graph, and structured data."
        href="#"
      />

      <CollapsibleSection title="Title Tags & Meta Description">
        <Paragraph>
          The title tag and meta description are the first things users see in
          search results. They should be compelling and accurate.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<head>
  <title>How to Learn React in 2024 | Beginner&apos;s Guide</title>
  <meta name="description" content="A comprehensive beginner&apos;s guide to learning React.js, covering components, hooks, and state management with practical examples." />
</head>`}
        />
        <Callout variant="tip">
          Keep title tags under 60 characters and meta descriptions under 160
          characters for optimal display in search results.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Open Graph & Social Sharing">
        <Paragraph>
          Open Graph tags control how your page appears when shared on social
          media platforms like Facebook, LinkedIn, and X.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<head>
  <meta property="og:title" content="How to Learn React in 2024" />
  <meta property="og:description" content="A comprehensive guide to learning React.js from scratch." />
  <meta property="og:image" content="https://example.com/react-guide-og.jpg" />
  <meta property="og:url" content="https://example.com/learn-react" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="My Website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="How to Learn React in 2024" />
  <meta name="twitter:description" content="A comprehensive guide to learning React.js from scratch." />
  <meta name="twitter:image" content="https://example.com/react-guide-twitter.jpg" />
</head>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Canonical URLs">
        <Paragraph>
          Canonical tags prevent duplicate content issues by specifying the
          preferred version of a page.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<head>
  <!-- Use when multiple URLs show same content -->
  <link rel="canonical" href="https://example.com/canonical-page" />

  <!-- Common duplicate scenarios -->
  <!-- URL with/without trailing slash -->
  <!-- HTTP vs HTTPS versions -->
  <!-- Pages with UTM parameters -->
</head>`}
        />
        <Callout variant="warning">
          Always specify a canonical URL to consolidate link equity and prevent
          search engines from indexing duplicate pages.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="JSON-LD Structured Data">
        <Paragraph>
          JSON-LD is a format for structured data that helps search engines
          understand your content. It uses schema.org vocabulary.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Learn React in 2024",
    "description": "A comprehensive guide to learning React.js from scratch.",
    "author": {
      "@type": "Person",
      "name": "Jane Developer"
    },
    "datePublished": "2024-03-15",
    "publisher": {
      "@type": "Organization",
      "name": "My Website",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      }
    }
  }
  </script>
</head>`}
        />

        <SubHeader>Common Schema Types</SubHeader>
        <CodeBlock
          language="javascript"
          code={`// Article/BlogPosting - for news articles and blog posts
{ "@type": "Article", "headline": "...", "datePublished": "..." }

// BreadcrumbList - for breadcrumb navigation
{ "@type": "BreadcrumbList", "itemListElement": [...] }

// FAQPage - for frequently asked questions
{ "@type": "FAQPage", "mainEntity": [...] }

// Product - for product pages
{ "@type": "Product", "name": "...", "price": "..." }

// Organization - for company information
{ "@type": "Organization", "name": "...", "url": "..." }`}
        />
        <Callout variant="note">
          Use Google's Rich Results Test tool to validate your structured data:{" "}
          https://search.google.com/test/rich-results
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection title="Additional SEO Best Practices">
        <SubHeader>Heading Hierarchy</SubHeader>
        <Paragraph>
          Use headings (h1-h6) in a logical order. Only one h1 per page, and
          don't skip levels.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<h1>Page Title</h1>
  <h2>Main Section</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Another Section</h2>
    <h3>Another Subsection</h3>`}
        />

        <SubHeader>Image SEO</SubHeader>
        <Paragraph>Always include descriptive alt text for images.</Paragraph>
        <CodeBlock
          language="html"
          code={`<img
  src="/images/react-components-diagram.png"
  alt="Diagram showing the relationship between React components, props, and state"
  width="800"
  height="600"
/>`}
        />

        <SubHeader>Mobile-Friendly</SubHeader>
        <Paragraph>
          Ensure your viewport meta tag is properly configured.
        </Paragraph>
        <CodeBlock
          language="html"
          code={`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`}
        />

        <Callout variant="important">
          Page speed is a ranking factor. Optimize images, minify CSS/JS, and
          use lazy loading for below-the-fold content.
        </Callout>
      </CollapsibleSection>

      {/* Quick Reference */}
      <SectionHeader>Quick Reference</SectionHeader>

      <CollapsibleSection title="Semantic HTML Cheat Sheet">
        <CodeBlock
          language="html"
          code={`Structural Elements:
<header>  - Page/section header with nav, logos, intro
<nav>     - Navigation links (use aria-label for multiple)
<main>    - Dominant content (only one per page)
<article> - Self-contained distributable content
<section> - Thematic grouping with heading
<aside>   - Tangentially related (sidebars)
<footer>  - Footer info for nearest section

Text Elements:
<time datetime="..."> - Machine-readable dates
<mark> - Highlighted/relevant text
<address> - Contact info (not physical address)
<figure>/<figcaption> - Self-contained content with caption

Forms:
<label for="id"> - Associates label with input
<fieldset>/<legend> - Groups related form controls
<input required> - Built-in validation
autocomplete="..." - Browser autofill hints`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="SEO Checklist">
        <Paragraph>Ensure your pages have:</Paragraph>
        <ul className="list-disc pl-6 text-sm text-foreground my-2">
          <li>Unique, descriptive title tag under 60 characters</li>
          <li>Meta description under 160 characters</li>
          <li>Proper heading hierarchy (h1 → h2 → h3)</li>
          <li>Descriptive alt text for all images</li>
          <li>Canonical URL to prevent duplicates</li>
          <li>Open Graph tags for social sharing</li>
          <li>JSON-LD structured data where applicable</li>
          <li>Mobile-friendly viewport</li>
          <li>Fast loading speed (Core Web Vitals)</li>
        </ul>
      </CollapsibleSection>
    </>
  );
}

export default HtmlSemantics;
