import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { frontendSecurityLesson } from "./meta";

export function FrontendSecurity() {
  return (
    <TopicLessonPage
      title={frontendSecurityLesson.title}
      summary={frontendSecurityLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={frontendSecurityLesson.estimatedReadingTimeMinutes}
      difficulty={frontendSecurityLesson.difficulty}
      relatedTopics={[
        { label: "Network and Browser APIs", href: "/topic/network-browser-apis" },
        { label: "Accessibility Basics", href: "/topic/accessibility" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="S"
          title="Web Security Basics for Frontend"
          description="Interviewers usually want to know whether you understand XSS, CSRF, token handling, and the fact that client code can improve security but cannot be the security boundary."
        />

        <CollapsibleSection title="The Core Security Mindset" collapsible={false}>
          <Paragraph>
            Frontend code runs in an untrusted environment. Users control the
            browser, extensions can inspect the page, and any client-side check
            can be bypassed. The frontend can reduce risk and improve defaults,
            but the server must enforce authorization and data integrity.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Cross-Site Scripting (XSS)" collapsible={false}>
          <Paragraph>
            XSS happens when untrusted content is treated as executable code in
            the page. The safest default is to render user content as text, not
            HTML.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`const message = "<img src=x onerror=alert(1) />";

element.textContent = message; // safer
element.innerHTML = message; // risky`}
          />
          <Paragraph>
            Frameworks help by escaping text by default, but the risk comes back
            whenever you inject raw HTML, render unsanitized markdown, or load
            third-party scripts carelessly.
          </Paragraph>
          <Callout variant="warning">
            Treat `innerHTML`, user-generated HTML, and dynamic script injection
            as high-risk areas that deserve explicit review.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Common Interview Topics</SectionHeader>

        <CollapsibleSection title="XSS vs CSRF vs Token Handling" collapsible={false}>
          <CodeBlock
            language="text"
            code={`XSS:
- attacker runs script in your origin
- often caused by unsafe HTML injection

CSRF:
- attacker triggers a trusted browser to send a request
- often relevant when cookies are sent automatically

Token handling:
- ask where credentials live, who can read them, and what happens if XSS exists`}
          />
          <Paragraph>
            One of the fastest ways to lose credibility is to blur these
            threats together. They are related, but they are not interchangeable.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Safe Defaults">
          <Paragraph>
            Escape untrusted content, validate and authorize on the server, use
            secure headers, minimize risky third-party scripts, and be careful
            where credentials are stored or exposed.
          </Paragraph>
          <Callout variant="tip">
            A good interview answer often includes the phrase "defense in
            depth" because no single frontend control is sufficient on its own.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Saying client-side validation is a security boundary.</li>
            <li>Confusing XSS with CSRF.</li>
            <li>Injecting untrusted HTML without discussing sanitization.</li>
            <li>Assuming browser storage is "secure enough" without acknowledging XSS risk.</li>
            <li>Ignoring third-party scripts and dependency trust as part of frontend security.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default FrontendSecurity;
