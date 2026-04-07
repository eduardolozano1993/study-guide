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
import capTheoremImage from "@/assets/images/cap-theorem.jpeg";
import { capTheoremLesson } from "./meta";

export function CapTheorem() {
  return (
    <TopicLessonPage
      title={capTheoremLesson.title}
      summary={capTheoremLesson.summary}
      eyebrow="Architecture"
      estimatedReadingTimeMinutes={capTheoremLesson.estimatedReadingTimeMinutes}
      difficulty={capTheoremLesson.difficulty}
      relatedTopics={[
        { label: "Latency vs Throughput", href: "/topic/latency-vs-throughput" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🔺"
          title="Distributed System Tradeoffs"
          description="CAP theorem is about what happens when a distributed system experiences a network partition. In that situation, you cannot fully preserve both consistency and availability at the same time."
        />

        <CollapsibleSection title="What CAP Theorem Actually Says" collapsible={false}>
          <Paragraph>
            CAP stands for Consistency, Availability, and Partition tolerance.
            The theorem says that when a partition occurs in a distributed
            system, the system must choose between consistency and availability.
          </Paragraph>
          <Paragraph>
            It does not mean you casually pick any two properties at all times.
            The key condition is the presence of a network partition.
          </Paragraph>
          <Callout variant="tip">
            The most common mistake is treating CAP as a permanent "pick two of
            three" menu. The real question is what your system does during a
            partition.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="CAP at a Glance" collapsible={false}>
          <Paragraph>
            This diagram is a useful visual summary of the three properties and
            the tradeoff they imply.
          </Paragraph>
          <ContentImage
            src={capTheoremImage}
            alt="Diagram illustrating consistency, availability, and partition tolerance in CAP theorem"
            caption="High-level view of the CAP theorem tradeoff in distributed systems."
          />
        </CollapsibleSection>

        <SectionHeader>The Three Properties</SectionHeader>

        <TopicCard
          icon="🧩"
          title="Consistency, Availability, Partition Tolerance"
          description="Understanding the theorem starts with defining these words precisely in a distributed systems context, not in loose product or UX language."
        />

        <CollapsibleSection title="Consistency" collapsible={false}>
          <Paragraph>
            In CAP, consistency means every read receives the most recent write
            or an error. All nodes appear to agree on one up-to-date value.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Write x = 5 to node A
Read from node B
Consistent behavior: node B returns 5 or fails`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Availability" collapsible={false}>
          <Paragraph>
            Availability means every request to a non-failing node receives a
            response. That response may not always contain the newest data, but
            the system remains responsive.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Partition Tolerance" collapsible={false}>
          <Paragraph>
            Partition tolerance means the system continues operating even if
            network communication between nodes is delayed, dropped, or broken.
            In real distributed systems, partitions are not hypothetical, so
            this property is usually non-negotiable.
          </Paragraph>
          <Callout variant="important">
            If your system is distributed across multiple machines or regions,
            you generally cannot just opt out of partition tolerance.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Why the Tradeoff Exists</SectionHeader>

        <CollapsibleSection title="A Simple Partition Scenario" collapsible={false}>
          <Paragraph>
            Imagine two database replicas that can normally synchronize with
            each other. If the network link between them breaks, each side must
            decide how to respond to new requests.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Node A <---X---> Node B

Client 1 writes to A
Client 2 reads from B`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Choose Consistency or Availability" collapsible={false}>
          <SubHeader>Favor Consistency</SubHeader>
          <Paragraph>
            The system may reject reads or writes on one side of the partition
            to avoid serving stale or conflicting data.
          </Paragraph>

          <SubHeader>Favor Availability</SubHeader>
          <Paragraph>
            The system continues answering requests on both sides, but some
            responses may be stale or conflicting until the partition heals.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`CP-style behavior:
- Some requests fail during partition
- Data stays consistent

AP-style behavior:
- Requests keep succeeding
- Data may temporarily diverge`}
          />
        </CollapsibleSection>

        <SectionHeader>CP vs AP in Practice</SectionHeader>

        <CollapsibleSection title="Consistency-Preferring Systems" collapsible={false}>
          <Paragraph>
            Systems that prefer consistency may block writes, reject reads, or
            require a quorum before confirming an operation. This is often
            desirable when correctness matters more than always answering.
          </Paragraph>
          <Paragraph>
            Examples include financial ledgers, inventory correctness, or
            metadata that must not diverge.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Availability-Preferring Systems" collapsible={false}>
          <Paragraph>
            Systems that prefer availability keep responding even during
            partitions, then reconcile later. This is often acceptable when
            stale data is tolerable for a period of time.
          </Paragraph>
          <Paragraph>
            Examples include social feeds, analytics dashboards, or caches that
            can tolerate eventual convergence.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>What CAP Does Not Mean</SectionHeader>

        <CollapsibleSection title="Not a Universal Ranking of Databases" collapsible={false}>
          <Paragraph>
            CAP does not say one class of system is always better. It just
            frames one important failure-mode tradeoff. Real-world systems also
            care about latency, throughput, durability, cost, and operational
            complexity.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Not Always Two Out of Three" collapsible={false}>
          <Paragraph>
            Outside a partition, many systems can offer both consistency and
            availability quite well. CAP becomes relevant precisely when the
            network stops behaving reliably.
          </Paragraph>
          <Callout variant="note">
            The theorem is most useful when you are thinking about failure
            behavior, not when you are trying to summarize an entire system in
            one label.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Related Ideas</SectionHeader>

        <CollapsibleSection title="Eventual Consistency">
          <Paragraph>
            Availability-preferring systems often adopt eventual consistency.
            That means replicas may disagree temporarily, but they are expected
            to converge after communication is restored.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Quorums and Replication">
          <Paragraph>
            Many distributed databases use replication and quorum rules to tune
            where they sit in the consistency-availability space during failure.
            These implementation choices are where CAP tradeoffs become
            concrete.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Common Mistakes</SectionHeader>

        <CollapsibleSection title="Misunderstandings to Avoid" collapsible={false}>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Treating CAP as a casual "pick any two" slogan.</li>
            <li>Ignoring the role of network partitions in the theorem.</li>
            <li>Confusing CAP consistency with everyday business correctness in a broad sense.</li>
            <li>Assuming availability means responses are always fresh.</li>
            <li>Using CAP alone to evaluate an entire architecture.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="CAP Theorem Cheat Sheet">
          <CodeBlock
            language="text"
            code={`CAP theorem:
- C = every read gets latest write or error
- A = every request gets a response
- P = system continues across network partitions

Key point:
- During a partition, distributed systems must trade off
  consistency vs availability

Typical shorthand:
- CP = prefer consistency during partition
- AP = prefer availability during partition`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CapTheorem;
