import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Sidebar } from "./features/navigation/components/Sidebar";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";
import {
  ContentContainer,
  TopicCard,
  CollapsibleSection,
  Callout,
  CodeBlock,
  PageTitle,
  SectionHeader,
  Paragraph,
} from "./features/content";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/study-guide">
        <div className="flex h-screen overflow-hidden">
          <aside className="sticky top-0 h-screen w-64 shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-1 overflow-y-auto">
            <ContentContainer>
              <PageTitle>Frontend — Core Web Fundamentals</PageTitle>
              <Paragraph>
                Understanding core web fundamentals is essential for every
                frontend engineer. This guide covers semantics, forms, and SEO
                basics.
              </Paragraph>

              <SectionHeader>HTML — Semantics, Forms, SEO</SectionHeader>

              <TopicCard
                icon="📜"
                title="Semantic HTML"
                description="Learn when to use article, section, nav, and aside elements."
                href="/topic/semantic-html"
              />

              <CollapsibleSection title="Semantic Elements" defaultOpen={true}>
                <Paragraph>
                  Semantic elements clearly describe their meaning to both
                  browsers and developers.
                </Paragraph>
                <Callout variant="tip">
                  Use <code>&lt;article&gt;</code> for self-contained content
                  that could be distributed independently.
                </Callout>
              </CollapsibleSection>

              <CollapsibleSection title="Forms & Accessibility">
                <Callout variant="warning">
                  Avoid using divs for interactive elements — use buttons and
                  links instead for proper accessibility.
                </Callout>
              </CollapsibleSection>

              <CollapsibleSection title="SEO Basics">
                <Callout variant="important">
                  Search engines prioritize well-structured content with proper
                  heading hierarchy.
                </Callout>
              </CollapsibleSection>

              <SectionHeader>Code Example</SectionHeader>
              <CodeBlock
                language="html"
                code={`<!-- Good semantic HTML -->
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2024-01-15">January 15, 2024</time>
  </header>
  <p>Article content here...</p>
  <footer>
    <p>Written by Author Name</p>
  </footer>
</article>`}
              />
            </ContentContainer>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
