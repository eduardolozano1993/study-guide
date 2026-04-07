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
import { networkBrowserApisLesson } from "./meta";

export function NetworkBrowserApis() {
  return (
    <TopicLessonPage
      title={networkBrowserApisLesson.title}
      summary={networkBrowserApisLesson.summary}
      eyebrow="Frontend / Fundamentals"
      estimatedReadingTimeMinutes={networkBrowserApisLesson.estimatedReadingTimeMinutes}
      difficulty={networkBrowserApisLesson.difficulty}
      relatedTopics={[
        { label: "DOM, Events, and Event Propagation", href: "/topic/dom-events" },
        { label: "Performance Fundamentals", href: "/topic/performance-fundamentals" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Network and Browser APIs"
          description="The interview goal here is not memorizing browser globals. It is showing that you know which APIs solve which product and networking problems."
        />

        <CollapsibleSection title="Core APIs Frontend Engineers Use Constantly" collapsible={false}>
          <Paragraph>
            You should be comfortable with `fetch`, `URL`, `URLSearchParams`,
            `history`, `localStorage`, `sessionStorage`, timers,
            `AbortController`, and browser signals like `navigator.onLine`.
          </Paragraph>
          <Paragraph>
            Strong answers focus on tradeoffs: what persists, what is shareable
            in the URL, what survives refresh, and what must stay in memory.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="`fetch`: Success, Failure, and Cancellation" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const controller = new AbortController();

try {
  const response = await fetch("/api/topics", {
    signal: controller.signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status}\`);
  }

  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}`}
          />
          <Paragraph>
            `fetch` rejects on network failures and aborts, but not on every
            HTTP error status. That distinction is commonly tested.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Streaming, Retry Boundaries, and Timeouts" collapsible={false}>
          <BulletList
            items={[
              "Cancellation matters most when the user navigates away, types quickly, or requests newer data that should replace older results.",
              "Streaming can improve perceived performance when partial data can be processed incrementally instead of waiting for the full payload.",
              "Retries should usually be limited to transient failures, not every 4xx or mutation request.",
              "Timeouts and retry policies belong where request ownership lives, not scattered across random UI components.",
            ]}
          />
        </CollapsibleSection>

        <SectionHeader>State in the Browser</SectionHeader>

        <CollapsibleSection title="URL State vs Storage vs Memory" collapsible={false}>
          <CodeBlock
            language="javascript"
            code={`const url = new URL(window.location.href);
url.searchParams.set("tab", "performance");
history.replaceState({}, "", url);

localStorage.setItem("theme", "dark");
sessionStorage.setItem("draftId", "42");`}
          />
          <Paragraph>
            Use URL state when the UI should be bookmarkable or shareable. Use
            storage for small persistence needs. Keep ephemeral UI details in
            memory when they should reset naturally.
          </Paragraph>
          <Callout variant="warning">
            Web storage is fine for non-sensitive preferences, but it is not a
            secure home for secrets.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Storage Tradeoffs Go Beyond Persistence" collapsible={false}>
          <BulletList
            items={[
              "`localStorage` is synchronous, which means large reads or writes can block the main thread.",
              "Storage has quota limits and can be cleared or partitioned differently across browsers and privacy modes.",
              "Multi-tab behavior matters: the `storage` event can help synchronize simple state, but it does not replace a real coordination model.",
              "If state should be shareable, bookmarkable, or reviewable in a URL, browser storage is often the wrong first system of record.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What should survive refresh, what should live in the URL, and what should reset naturally in memory?",
              "Why is `localStorage` sometimes a performance problem and not just a convenience API?",
              "When would you retry a failed request, and where should that retry policy live?",
              "How would you keep history, URL params, and UI state synchronized without creating confusing back-button behavior?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Assuming `fetch` throws for every 4xx or 5xx response.",
              "Ignoring request cancellation when UI state changes quickly.",
              "Putting shareable UI state in memory instead of the URL.",
              "Treating `localStorage` as free without mentioning sync blocking, quota, or privacy constraints.",
              "Storing sensitive tokens in easily reachable browser storage without discussing risks.",
              "Confusing browser APIs with framework utilities.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NetworkBrowserApis;
