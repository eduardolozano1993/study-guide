import {
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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Assuming `fetch` throws for every 4xx or 5xx response.</li>
            <li>Ignoring request cancellation when UI state changes quickly.</li>
            <li>Putting shareable UI state in memory instead of the URL.</li>
            <li>Storing sensitive tokens in easily reachable browser storage without discussing risks.</li>
            <li>Confusing browser APIs with framework utilities.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NetworkBrowserApis;
