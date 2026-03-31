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
import scalingImage from "@/assets/images/horizontal-vs-vertical-scaling.png";
import { horizontalVerticalScalingLesson } from "./meta";

export function HorizontalVerticalScaling() {
  return (
    <TopicLessonPage
      title={horizontalVerticalScalingLesson.title}
      summary={horizontalVerticalScalingLesson.summary}
      eyebrow="Architecture"
      estimatedReadingTimeMinutes={horizontalVerticalScalingLesson.estimatedReadingTimeMinutes}
      difficulty={horizontalVerticalScalingLesson.difficulty}
      relatedTopics={[
        { label: "Load Balancer", href: "/topic/load-balancer" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="📐"
          title="Two Ways to Grow Capacity"
          description="Systems can handle more load either by making one machine stronger or by adding more machines. The core tradeoff is simplicity versus flexibility."
        />

        <CollapsibleSection title="What Scaling Means" collapsible={false}>
          <Paragraph>
            Scaling is the process of increasing a system's ability to handle
            more traffic, more data, or more work. The two classic approaches
            are vertical scaling and horizontal scaling.
          </Paragraph>
          <Paragraph>
            Vertical scaling means making one machine bigger. Horizontal
            scaling means adding more machines and distributing work across
            them.
          </Paragraph>
          <Callout variant="tip">
            Ask two questions first: "Can one stronger server still solve this?"
            and "Do we need multiple instances for resilience as well as
            capacity?"
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Scaling at a Glance" collapsible={false}>
          <Paragraph>
            This diagram is a useful visual summary of scaling up versus
            scaling out.
          </Paragraph>
          <ContentImage
            src={scalingImage}
            alt="Diagram comparing vertical scaling with horizontal scaling"
            caption="High-level comparison of vertical scaling and horizontal scaling."
          />
        </CollapsibleSection>

        <SectionHeader>Vertical Scaling</SectionHeader>

        <TopicCard
          icon="⬆️"
          title="Scale Up"
          description="Vertical scaling increases the capacity of a single machine by giving it more CPU, RAM, storage, or faster hardware."
        />

        <CollapsibleSection title="How Vertical Scaling Works" collapsible={false}>
          <Paragraph>
            Instead of adding new instances, vertical scaling upgrades the
            existing server. This might mean moving from a 2-core machine to a
            16-core machine, or adding significantly more memory and storage.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Before:
1 server -> 4 CPU / 8 GB RAM

After:
1 server -> 16 CPU / 64 GB RAM`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Advantages of Vertical Scaling" collapsible={false}>
          <Paragraph>
            Vertical scaling is often simpler to implement because the
            application can keep running as a single instance without needing
            distributed coordination or request distribution across many nodes.
          </Paragraph>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Simple operational model.</li>
            <li>Fewer moving parts to coordinate.</li>
            <li>Can be enough for smaller systems or early stages.</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Limits of Vertical Scaling" collapsible={false}>
          <Paragraph>
            Vertical scaling has a ceiling. Machines cannot become infinitely
            large, and bigger machines often become much more expensive.
          </Paragraph>
          <Paragraph>
            It also leaves the system more exposed to a single-machine failure
            if there is only one primary instance serving traffic.
          </Paragraph>
          <Callout variant="warning">
            A bigger server can increase capacity, but it does not remove the
            single point of failure if your architecture still depends on one
            machine.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Horizontal Scaling</SectionHeader>

        <TopicCard
          icon="↔️"
          title="Scale Out"
          description="Horizontal scaling adds more instances and spreads work between them, usually behind a load balancer."
        />

        <CollapsibleSection title="How Horizontal Scaling Works" collapsible={false}>
          <Paragraph>
            Instead of upgrading one server, horizontal scaling adds more
            servers. Traffic or work is distributed across those instances so
            the system can handle higher overall load.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Before:
1 app server

After:
Load balancer
  -> App server A
  -> App server B
  -> App server C`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Advantages of Horizontal Scaling" collapsible={false}>
          <Paragraph>
            Horizontal scaling supports both capacity growth and resilience. If
            one node fails, other nodes can continue serving traffic.
          </Paragraph>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Better availability when multiple instances exist.</li>
            <li>Can keep growing by adding more instances.</li>
            <li>Fits cloud-native and auto-scaling environments well.</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="What Horizontal Scaling Requires" collapsible={false}>
          <Paragraph>
            Scaling out introduces architectural requirements. Applications
            often need to be stateless, shared state may need to move into a
            database or cache, and traffic usually needs a load balancer.
          </Paragraph>
          <Callout variant="important">
            Horizontal scaling is not just adding servers. It usually forces
            cleaner separation of state, coordination, and traffic management.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Choosing Between Them</SectionHeader>

        <CollapsibleSection title="When Vertical Scaling Makes Sense" collapsible={false}>
          <Paragraph>
            Vertical scaling is often a good first step when the system is
            small, the software is not yet ready to run across multiple
            instances, or the current bottleneck can be solved cheaply by
            upgrading one machine.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="When Horizontal Scaling Makes Sense" collapsible={false}>
          <Paragraph>
            Horizontal scaling becomes more attractive when uptime matters,
            demand varies, one machine is no longer enough, or the system
            already needs multiple instances for regional or operational
            reasons.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Many Real Systems Use Both">
          <Paragraph>
            Real architectures often combine both strategies. Teams may first
            increase instance size vertically, then later add more instances and
            distribute load horizontally.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Step 1: Move from small server to larger server
Step 2: Run several larger servers behind a load balancer`}
          />
        </CollapsibleSection>

        <SectionHeader>Common Tradeoffs</SectionHeader>

        <CollapsibleSection title="Operational Comparison" collapsible={false}>
          <SubHeader>Vertical Scaling Tradeoff</SubHeader>
          <Paragraph>
            Simpler architecture, but lower fault tolerance and a harder upper
            limit.
          </Paragraph>

          <SubHeader>Horizontal Scaling Tradeoff</SubHeader>
          <Paragraph>
            More operational complexity, but better resilience and room for
            long-term growth.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Common Mistakes">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Assuming horizontal scaling is always better, regardless of system size.</li>
            <li>Ignoring application state when trying to add more instances.</li>
            <li>Using vertical scaling as the only long-term strategy for critical systems.</li>
            <li>Adding a load balancer without meaningful health checks or stateless design.</li>
            <li>Forgetting that databases and other dependencies may scale differently from app servers.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Horizontal vs Vertical Scaling Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Vertical scaling:
- Make one machine stronger
- Simpler architecture
- Harder capacity ceiling
- More single-instance risk

Horizontal scaling:
- Add more machines
- Needs load distribution
- Better resilience
- Better long-term growth path`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default HorizontalVerticalScaling;
