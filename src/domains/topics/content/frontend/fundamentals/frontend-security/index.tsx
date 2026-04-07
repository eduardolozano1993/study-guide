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
          description="Interviewers want to know whether you can distinguish XSS, CSRF, CORS, clickjacking, token handling, and the limits of what the frontend can actually enforce."
        />

        <CollapsibleSection title="The Core Security Mindset" collapsible={false}>
          <Paragraph>
            Frontend code runs in an untrusted environment. Users control the
            browser, extensions can inspect the page, and client-side checks can
            be bypassed. The frontend can reduce risk and improve defaults, but
            the server must enforce authorization and data integrity.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Do Not Blur the Threats Together</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "meaning", label: "What it is" },
            { key: "note", label: "Key frontend takeaway" },
          ]}
          rows={[
            {
              label: "XSS",
              values: {
                meaning: "Untrusted content becomes executable script in your origin.",
                note: "Escape by default, sanitize rich HTML carefully, and treat injected scripts as high risk.",
              },
            },
            {
              label: "CSRF",
              values: {
                meaning: "An attacker tricks a trusted browser into sending a request with ambient credentials.",
                note: "Especially relevant with cookie-backed auth and weak request protections.",
              },
            },
            {
              label: "CORS",
              values: {
                meaning: "A browser policy controlling which origins may read responses.",
                note: "It is not an authorization system and does not protect your server by itself.",
              },
            },
            {
              label: "Clickjacking",
              values: {
                meaning: "Users are tricked into interacting with a hidden or framed UI.",
                note: "Frame protection headers matter more than client tricks.",
              },
            },
            {
              label: "Open redirects",
              values: {
                meaning: "User-controlled redirect targets send users somewhere unsafe.",
                note: "Validate destinations instead of trusting arbitrary next URLs.",
              },
            },
          ]}
        />

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
            when you inject raw HTML, render unsanitized markdown, or load
            third-party scripts carelessly.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Cross-Site Request Forgery (CSRF)" collapsible={false}>
          <Paragraph>
            CSRF is different from XSS. The attacker does not need to run code
            in your app. They only need the browser to send a request that
            automatically includes the user&apos;s cookies or other ambient
            credentials.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`<!-- attacker-controlled page -->
<form action="https://bank.example/transfer" method="POST">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="5000" />
</form>

<script>
  document.forms[0].submit();
</script>`}
          />
          <Paragraph>
            Frontend code helps by using explicit anti-CSRF tokens, avoiding
            state-changing GET requests, and understanding when cookie-backed
            auth needs SameSite and server-side CSRF validation.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`await fetch("/api/profile", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-Token": csrfToken,
  },
  body: JSON.stringify({ displayName: "Ada" }),
});`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Cross-Origin Resource Sharing (CORS)" collapsible={false}>
          <Paragraph>
            CORS is a browser rule about which origins may read a response. It
            does not stop requests from reaching the server, and it does not
            replace authentication or authorization.
          </Paragraph>
          <CodeBlock
            language="javascript"
            code={`fetch("https://api.example.com/admin/stats", {
  credentials: "include",
})
  .then((response) => response.json())
  .catch((error) => {
    console.error("Blocked by the browser if CORS headers do not allow it", error);
  });`}
          />
          <Paragraph>
            If the API does not return the right `Access-Control-Allow-Origin`
            policy, the browser blocks JavaScript from reading the response.
            That is useful, but it is not real backend protection because
            non-browser clients can still call the endpoint directly.
          </Paragraph>
          <CodeBlock
            language="http"
            code={`Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true`}
          />
        </CollapsibleSection>

        <SectionHeader>Storage and Browser-Side Tradeoffs</SectionHeader>
        <BulletList
          items={[
            "Cookie-backed sessions can reduce some token-exposure patterns, but they bring CSRF considerations that must be handled deliberately.",
            "Local storage avoids automatic request sending, but any successful XSS can usually read it.",
            "Content Security Policy and Trusted Types are defense-in-depth tools that reduce script-injection risk, not excuses to relax sanitization discipline.",
            "Third-party scripts, analytics tags, markdown renderers, and rich-text inputs deserve explicit trust and sanitization review.",
          ]}
        />
        <Callout variant="warning">
          A good senior answer says what the frontend can improve and what the
          server must still enforce. False confidence is the real failure mode.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What is the difference between XSS, CSRF, and CORS?",
              "What can the frontend enforce, and what must the server enforce?",
              "How would you handle user-generated markdown or rich text safely?",
              "What are the security tradeoffs between cookies and local storage for auth-related data?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default FrontendSecurity;
