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
import latencyVsThroughputImage from "@/assets/images/latency-vs-throughput.jpg";
import { latencyVsThroughputLesson } from "./meta";

export function LatencyVsThroughput() {
  return (
    <TopicLessonPage
      title={latencyVsThroughputLesson.title}
      summary={latencyVsThroughputLesson.summary}
      eyebrow="Architecture"
      estimatedReadingTimeMinutes={latencyVsThroughputLesson.estimatedReadingTimeMinutes}
      difficulty={latencyVsThroughputLesson.difficulty}
      relatedTopics={[
        {
          label: "Horizontal vs Vertical Scaling",
          href: "/topic/horizontal-vertical-scaling",
        },
        { label: "Load Balancer", href: "/topic/load-balancer" },
        { label: "CDN", href: "/topic/cdn" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="⏱️"
          title="Speed Per Request vs Work Per Second"
          description="Latency and throughput describe different kinds of performance. Latency measures how long one unit of work takes; throughput measures how much work the system completes over time."
        />

        <CollapsibleSection title="Why These Two Metrics Matter" collapsible={false}>
          <Paragraph>
            These terms are often mentioned together because they both describe
            performance, but they answer different questions. Latency asks,
            "How long does one request take?" Throughput asks, "How many
            requests can the system handle in a period of time?"
          </Paragraph>
          <Paragraph>
            A system can have low latency for one user but still poor overall
            throughput under load. It can also process huge volumes of work
            while still making individual requests feel slow.
          </Paragraph>
          <Callout variant="tip">
            If you mix these concepts together, performance discussions become
            vague very quickly. Keep them separate before deciding what to
            optimize.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Latency vs Throughput at a Glance" collapsible={false}>
          <Paragraph>
            This diagram is a good visual shortcut for the difference between
            per-request delay and total system capacity.
          </Paragraph>
          <ContentImage
            src={latencyVsThroughputImage}
            alt="Diagram comparing latency and throughput"
            caption="High-level comparison between latency, which measures delay, and throughput, which measures volume over time."
          />
        </CollapsibleSection>

        <SectionHeader>Latency</SectionHeader>

        <TopicCard
          icon="🐢"
          title="How Long One Operation Takes"
          description="Latency is the elapsed time for a single request, query, or operation to complete from start to finish."
        />

        <CollapsibleSection title="What Latency Measures" collapsible={false}>
          <Paragraph>
            Latency is usually expressed as a duration such as milliseconds or
            seconds. For a web request, latency might mean the time between the
            client sending the request and receiving the full response.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Example:
User sends request at 10:00:00.000
Response arrives at 10:00:00.120
Latency = 120 ms`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="What Contributes to Latency" collapsible={false}>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Network travel time between client and server.</li>
            <li>Queueing delays when the system is busy.</li>
            <li>Application processing time.</li>
            <li>Database queries and downstream service calls.</li>
            <li>Serialization, encryption, or disk access overhead.</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Why Percentiles Matter">
          <Paragraph>
            Average latency can hide bad user experience. Teams often watch p95
            or p99 latency because a system with a decent average but terrible
            tail latency can still feel unreliable.
          </Paragraph>
          <Callout variant="note">
            The slowest requests often shape user perception more than the
            average request does.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Throughput</SectionHeader>

        <TopicCard
          icon="🚚"
          title="How Much Work Gets Done"
          description="Throughput measures total output over time, such as requests per second, jobs per minute, or megabytes transferred per second."
        />

        <CollapsibleSection title="What Throughput Measures" collapsible={false}>
          <Paragraph>
            Throughput is about capacity, not delay. It tells you how much work
            the system can sustain during a given time window.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Example:
System completes 10,000 requests in 100 seconds
Throughput = 100 requests per second`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="What Affects Throughput" collapsible={false}>
          <Paragraph>
            Throughput depends on the amount of parallel work the system can
            handle, available CPU and memory, efficient I/O, and how well the
            architecture scales under concurrency.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Why They Are Not the Same</SectionHeader>

        <CollapsibleSection title="You Can Improve One Without Improving the Other" collapsible={false}>
          <Paragraph>
            Reducing latency means making each operation faster. Increasing
            throughput means processing more operations overall. Those goals can
            align, but they do not automatically move together.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Case 1:
Low latency, low throughput
- Fast single requests
- System cannot handle many concurrent requests

Case 2:
High latency, high throughput
- Individual requests take longer
- System handles a large overall volume`}
          />
          <Callout variant="important">
            A system tuned for maximum throughput may batch, queue, or defer
            work in ways that increase latency for each individual operation.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="A Useful Analogy">
          <Paragraph>
            Think of a highway. Latency is how long one car takes to get
            through. Throughput is how many cars the highway moves each minute.
            A road can move many cars overall while still making each driver
            wait a long time.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Tradeoffs in Real Systems</SectionHeader>

        <CollapsibleSection title="Batching, Queueing, and Parallelism" collapsible={false}>
          <Paragraph>
            Techniques like batching and queueing often improve throughput
            because the system processes work more efficiently in groups, but
            they can increase latency for any one item waiting in line.
          </Paragraph>
          <SubHeader>Parallelism</SubHeader>
          <Paragraph>
            Adding more workers, instances, or partitions can improve
            throughput, but coordination overhead or cross-node communication
            can increase latency in some cases.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Caching and Edge Delivery">
          <Paragraph>
            Caching can improve both metrics when it removes expensive origin
            work. A CDN, for example, can reduce latency for users and also
            increase effective throughput at the origin by absorbing repeated
            requests.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>When to Optimize Which</SectionHeader>

        <CollapsibleSection title="Latency-Sensitive Systems" collapsible={false}>
          <Paragraph>
            User-facing applications such as search, checkout flows, gaming,
            and interactive UIs usually care deeply about latency because human
            perception is affected by delay very quickly.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Throughput-Sensitive Systems" collapsible={false}>
          <Paragraph>
            Background pipelines, analytics jobs, batch processing, and message
            consumers often care more about total work completed per unit of
            time than about the delay of any single item.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Many Systems Need Both">
          <Paragraph>
            Real production systems usually need acceptable latency and strong
            throughput. The engineering challenge is deciding which metric is
            the primary constraint for a given component.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Common Mistakes</SectionHeader>

        <CollapsibleSection title="Misunderstandings to Avoid" collapsible={false}>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using latency and throughput as if they mean the same thing.</li>
            <li>Focusing only on average latency instead of tail latency.</li>
            <li>Assuming higher throughput always means a better user experience.</li>
            <li>Ignoring queueing effects under load.</li>
            <li>Optimizing one subsystem's throughput while making end-to-end latency worse.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Latency vs Throughput Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Latency:
- Time for one operation
- Usually measured in ms or s
- Important for user responsiveness

Throughput:
- Total work per unit time
- Often measured in requests/second
- Important for system capacity

Key point:
- Lower latency does not guarantee higher throughput
- Higher throughput does not guarantee lower latency`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default LatencyVsThroughput;
