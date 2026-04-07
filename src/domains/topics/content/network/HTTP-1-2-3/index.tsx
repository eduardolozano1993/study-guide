import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  ContentImage,
  Paragraph,
  SectionHeader,
  SubHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import http123Diagram from "@/assets/images/http-1-http-2-http-3.png";
import { http123Lesson } from "./meta";

export function HTTP123() {
  return (
    <TopicLessonPage
      title={http123Lesson.title}
      summary={http123Lesson.summary}
      eyebrow="Network"
      estimatedReadingTimeMinutes={http123Lesson.estimatedReadingTimeMinutes}
      difficulty={http123Lesson.difficulty}
      relatedTopics={[{ label: "DNS", href: "/topic/dns" }]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🚦"
          title="HTTP Evolution"
          description="HTTP/1.1, HTTP/2, and HTTP/3 solve the same core problem of moving web requests and responses, but they differ sharply in how they manage connections, concurrency, and latency."
        />

        <CollapsibleSection title="Why Multiple HTTP Versions Exist" collapsible={false}>
          <Paragraph>
            The web grew from simple document requests into pages that load many
            assets, maintain long-lived connections, and need strong
            performance on unreliable networks. Each HTTP revision tries to
            remove bottlenecks that became obvious at the previous scale.
          </Paragraph>
          <Paragraph>
            The big themes are request concurrency, transport efficiency, and
            recovery from packet loss.
          </Paragraph>
          <Callout variant="tip">
            Focus on the performance problem each version addresses. That makes
            the differences much easier to remember than memorizing protocol
            details in isolation.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="At a Glance" collapsible={false}>
          <Paragraph>
            This diagram gives the quickest comparison of the three versions
            before diving into the mechanics behind each one.
          </Paragraph>
          <ContentImage
            src={http123Diagram}
            alt="Diagram comparing HTTP/1.1, HTTP/2, and HTTP/3 request handling and transport behavior"
            caption="High-level comparison of how HTTP/1.1, HTTP/2, and HTTP/3 handle multiple requests."
          />
        </CollapsibleSection>

        <SectionHeader>HTTP/1.1</SectionHeader>

        <TopicCard
          icon="1️⃣"
          title="HTTP/1.1 Basics"
          description="HTTP/1.1 improved persistence and caching behavior, but each TCP connection still became a bottleneck when many resources were requested together."
        />

        <CollapsibleSection title="How HTTP/1.1 Works" collapsible={false}>
          <Paragraph>
            HTTP/1.1 is a text-based protocol carried over TCP. A client opens
            a connection to the server, sends a request, and receives a
            response with headers and a body.
          </Paragraph>
          <CodeBlock
            language="http"
            code={`GET /index.html HTTP/1.1
Host: example.com
User-Agent: Browser

HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1256

<html>...</html>`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Strengths and Limits" collapsible={false}>
          <Paragraph>
            Persistent connections reduced the cost of reconnecting for every
            asset, but request handling was still effectively sequential on a
            single connection. Browsers often opened multiple TCP connections
            to work around that constraint.
          </Paragraph>
          <SubHeader>Head-of-Line Blocking at the HTTP Layer</SubHeader>
          <Paragraph>
            If several requests share one connection, later responses can be
            delayed behind earlier ones. That made pages with many small assets
            noticeably slower.
          </Paragraph>
          <Callout variant="warning">
            HTTP/1.1 pipelining existed on paper, but support was inconsistent
            and it never became the normal answer to the concurrency problem.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Why Developers Started Optimizing Around It">
          <Paragraph>
            Many frontend performance techniques were reactions to HTTP/1.1
            constraints rather than inherently good design choices.
          </Paragraph>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Bundling many files into one request.</li>
            <li>Inlining CSS or JavaScript to avoid extra round trips.</li>
            <li>Using image sprites to reduce the number of asset fetches.</li>
            <li>Sharding assets across subdomains to gain more TCP connections.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>HTTP/2</SectionHeader>

        <TopicCard
          icon="2️⃣"
          title="HTTP/2 Improvements"
          description="HTTP/2 keeps TCP underneath but changes the application protocol so many streams can share one connection efficiently."
        />

        <CollapsibleSection title="What HTTP/2 Changes" collapsible={false}>
          <Paragraph>
            HTTP/2 introduces binary framing, multiplexing, header compression,
            and stream prioritization. The most important concept is that
            multiple requests and responses can be in flight on one connection
            at the same time.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Single TCP connection
  ├─ Stream 1: HTML
  ├─ Stream 3: CSS
  ├─ Stream 5: JavaScript
  └─ Stream 7: Image`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Why HTTP/2 Is Faster for Many Assets" collapsible={false}>
          <Paragraph>
            Multiplexing means the browser no longer needs many parallel TCP
            connections just to fetch a modern page. Header compression also
            reduces repeated metadata overhead across requests.
          </Paragraph>
          <SubHeader>HPACK Header Compression</SubHeader>
          <Paragraph>
            Repeated headers like cookies or user-agent strings can be encoded
            more compactly, which reduces bandwidth waste.
          </Paragraph>
          <Callout variant="note">
            HTTP/2 solves application-layer head-of-line blocking, but it still
            runs on TCP. Packet loss at the transport layer can still stall all
            streams sharing that connection.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Server Push and Practical Reality">
          <Paragraph>
            HTTP/2 also introduced server push, where a server could send a
            resource before the browser explicitly requested it. In practice,
            this feature proved hard to use well and has seen limited value.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>HTTP/3</SectionHeader>

        <TopicCard
          icon="3️⃣"
          title="HTTP/3 and QUIC"
          description="HTTP/3 moves HTTP onto QUIC over UDP, which gives it stream multiplexing without TCP's shared-loss penalty."
        />

        <CollapsibleSection title="What Makes HTTP/3 Different" collapsible={false}>
          <Paragraph>
            HTTP/3 uses QUIC instead of TCP. QUIC runs over UDP and builds in
            encryption, connection management, and independent streams at the
            transport layer.
          </Paragraph>
          <Paragraph>
            The big win is that packet loss on one stream does not block all
            the other streams in the same way it does when everything sits on a
            single TCP connection.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`HTTP/1.1 -> HTTP over TCP
HTTP/2   -> HTTP over TCP
HTTP/3   -> HTTP over QUIC over UDP`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Why QUIC Helps" collapsible={false}>
          <SubHeader>Faster Connection Setup</SubHeader>
          <Paragraph>
            QUIC combines transport and security handshakes more efficiently,
            which can reduce setup latency, especially on repeated connections.
          </Paragraph>

          <SubHeader>Better Loss Recovery</SubHeader>
          <Paragraph>
            Because streams are managed independently, one delayed packet is
            less likely to freeze unrelated work.
          </Paragraph>

          <SubHeader>Connection Migration</SubHeader>
          <Paragraph>
            QUIC can preserve a connection when a client changes networks, such
            as moving from Wi-Fi to cellular, which is particularly useful on
            mobile devices.
          </Paragraph>
          <Callout variant="important">
            HTTP/3 is not "just a faster HTTP/2." The transport change from TCP
            to QUIC is the key architectural difference.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Comparing the Versions</SectionHeader>

        <CollapsibleSection title="Feature Comparison" collapsible={false}>
          <CodeBlock
            language="text"
            code={`HTTP/1.1
- Text protocol
- Usually multiple TCP connections for parallelism
- Request queueing issues on a connection

HTTP/2
- Binary framing
- Multiplexed streams on one TCP connection
- Header compression
- Still affected by TCP-level head-of-line blocking

HTTP/3
- Runs over QUIC on UDP
- Multiplexed streams with better loss isolation
- Faster connection setup and mobility support`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="When the Differences Matter Most">
          <Paragraph>
            HTTP/1.1 can still work well for simple traffic, but HTTP/2 and
            HTTP/3 matter most when a page loads many resources, latency is
            meaningful, or mobile network quality fluctuates.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview or Study Traps">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Confusing HTTP/2 multiplexing with a switch away from TCP.</li>
            <li>Assuming HTTP/3 is encrypted only because the app chooses TLS separately.</li>
            <li>Treating HTTP/1.1 pipelining as the normal solution that replaced many connections.</li>
            <li>Missing that HTTP/2 and HTTP/3 improve performance differently.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="HTTP/1.1 vs HTTP/2 vs HTTP/3 Cheat Sheet">
          <CodeBlock
            language="text"
            code={`HTTP/1.1: text over TCP, limited parallelism, many connection workarounds
HTTP/2: binary framing over TCP, multiplexing, compressed headers
HTTP/3: HTTP over QUIC/UDP, multiplexing with better behavior under packet loss`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default HTTP123;
