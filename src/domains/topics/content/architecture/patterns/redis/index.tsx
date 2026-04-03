import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  ContentImage,
  Paragraph,
  SectionHeader,
  SubHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import redisUsageImage from "@/assets/images/how-can-redis-be-used.png";
import { redisLesson } from "./meta";

const redisComparisonColumns = [
  { key: "redis", label: "Redis" },
  { key: "primary-db", label: "Primary Database" },
];

const redisComparisonRows = [
  {
    label: "Main job",
    values: {
      redis:
        "Fast access to short-lived, high-frequency, or coordination-heavy data.",
      "primary-db":
        "Durable system of record for canonical business data.",
    },
  },
  {
    label: "Latency profile",
    values: {
      redis: "Usually optimized for very low-latency reads and writes in memory.",
      "primary-db":
        "Usually slower than Redis, but designed for richer queries and stronger durability guarantees.",
    },
  },
  {
    label: "Typical data shape",
    values: {
      redis:
        "Cached values, counters, sessions, locks, queues, leaderboards, and pub/sub messages.",
      "primary-db":
        "Users, orders, payments, inventory, and other long-lived relational or document records.",
    },
  },
  {
    label: "Durability expectations",
    values: {
      redis:
        "Can persist, but it is often used where some loss is acceptable or where data can be rebuilt.",
      "primary-db":
        "Strong expectation that writes survive restarts and remain the source of truth.",
    },
  },
];

export function Redis() {
  return (
    <TopicLessonPage
      title={redisLesson.title}
      summary={redisLesson.summary}
      eyebrow="Architecture"
      estimatedReadingTimeMinutes={redisLesson.estimatedReadingTimeMinutes}
      difficulty={redisLesson.difficulty}
      relatedTopics={[
        {
          label: "Horizontal vs Vertical Scaling",
          href: "/topic/horizontal-vertical-scaling",
        },
        { label: "CDN", href: "/topic/cdn" },
        {
          label: "Latency vs Throughput",
          href: "/topic/latency-vs-throughput",
        },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="R"
          title="In-Memory Data Store and Coordination Layer"
          description="Redis usually fits as a supporting architecture component in front of, beside, or between core services. It is most valuable when systems need very fast access to transient data, shared counters, distributed coordination, or cache-backed performance improvements."
        />

        <CollapsibleSection title="Where Redis Fits Best" collapsible={false}>
          <Paragraph>
            In this content structure, Redis fits best under architecture
            patterns because teams usually adopt it as an infrastructure
            building block rather than as a transport protocol or API style.
          </Paragraph>
          <Paragraph>
            It commonly appears between application servers and a primary
            database, or as a shared utility service for sessions, rate
            limiting, queues, and distributed locks.
          </Paragraph>
          <Callout variant="tip">
            The clearest mental model is that Redis is usually not the main
            source of truth. It is the fast layer that helps the rest of the
            system respond quickly and coordinate safely.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Redis at a Glance" collapsible={false}>
          <Paragraph>
            This diagram shows several common ways Redis is inserted into a
            production architecture.
          </Paragraph>
          <ContentImage
            src={redisUsageImage}
            alt="Diagram showing Redis used for caching, sessions, pub-sub, queues, and fast data access between applications and databases"
            caption="High-level view of Redis as a shared in-memory layer for caching, sessions, messaging, and coordination."
          />
        </CollapsibleSection>

        <SectionHeader>What Redis Is</SectionHeader>

        <TopicCard
          icon="RAM"
          title="Memory First"
          description="Redis stores data primarily in memory, which is why it is so often chosen when speed matters more than complex querying."
        />

        <CollapsibleSection title="Core Idea" collapsible={false}>
          <Paragraph>
            Redis is an in-memory key-value data store with support for several
            data structures such as strings, hashes, lists, sets, sorted sets,
            streams, and bitmaps.
          </Paragraph>
          <Paragraph>
            That combination makes it broader than a basic cache. It can act as
            a cache, a counter store, a task buffer, a pub/sub broker, or a
            coordination service depending on how the application uses it.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Typical placement:
Client -> App server -> Redis -> Primary database
                     \\-> Other services using the same Redis cluster`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Why Teams Reach for Redis" collapsible={false}>
          <Paragraph>
            Teams usually add Redis when repeated database reads become too
            expensive, when latency targets are strict, or when many application
            instances need access to shared ephemeral state.
          </Paragraph>
          <Callout variant="important">
            Redis is powerful because it solves several narrow, high-value
            problems extremely well. It becomes dangerous when it is treated
            like a drop-in replacement for the system of record.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Most Common Redis Uses</SectionHeader>

        <CollapsibleSection title="Caching" collapsible={false}>
          <Paragraph>
            The most common Redis pattern is caching expensive or frequently
            requested data so the application does not need to recompute it or
            fetch it from the primary database on every request.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Read-through flow:
1. App checks Redis for user:42
2. Cache hit -> return value immediately
3. Cache miss -> query database
4. Store result in Redis with TTL
5. Return response`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Sessions and Authentication State" collapsible={false}>
          <Paragraph>
            Redis is a strong fit for server-side sessions because multiple app
            instances can read and update the same session store without tying a
            user to one machine.
          </Paragraph>
          <Paragraph>
            This pairs naturally with horizontal scaling and load-balanced
            applications.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Counters, Rate Limiting, and Leaderboards">
          <SubHeader>Counters and quotas</SubHeader>
          <Paragraph>
            Atomic increment operations make Redis useful for counting events,
            enforcing per-user quotas, or tracking request volume over time
            windows.
          </Paragraph>

          <SubHeader>Leaderboards</SubHeader>
          <Paragraph>
            Sorted sets are a natural fit for ranking scenarios where scores and
            ordering must be updated quickly.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Examples:
INCR api:rate-limit:user:42
ZADD game:leaderboard 980 "alice"
ZADD game:leaderboard 1050 "bob"`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Queues, Pub/Sub, and Distributed Coordination">
          <Paragraph>
            Redis is also used for lightweight messaging and coordination. Teams
            use it for background job queues, publish-subscribe signaling,
            distributed locks, and short-lived shared state.
          </Paragraph>
          <Paragraph>
            These patterns are useful, but each comes with caveats around
            delivery guarantees, retry behavior, and failure recovery.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Redis vs Primary Database</SectionHeader>

        <CollapsibleSection title="Different Roles in the Architecture" collapsible={false}>
          <Paragraph>
            Redis and a primary database usually complement each other instead
            of competing directly.
          </Paragraph>
          <ComparisonTable
            columns={redisComparisonColumns}
            rows={redisComparisonRows}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Good Rule of Thumb">
          <Paragraph>
            If losing the data would immediately break core business correctness,
            that data probably belongs in the primary database first. Redis can
            still accelerate access to it, but should not silently become the
            only durable home for it without deliberate design.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Expiration, Persistence, and Scaling</SectionHeader>

        <CollapsibleSection title="TTL and Eviction" collapsible={false}>
          <Paragraph>
            Redis often stores data with a time to live so cached entries expire
            automatically. When memory fills up, eviction policies decide which
            keys should be removed.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Examples:
SET product:123 "{...}" EX 300
SET session:abc "{...}" EX 1800`}
          />
          <Callout variant="note">
            A cache without expiration strategy often turns into a stale data
            store with unpredictable behavior.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Persistence Options">
          <Paragraph>
            Redis can write snapshots or append-only logs to disk, which helps
            it recover after restarts. That matters, but persistence does not
            automatically make Redis equivalent to a primary transactional
            database.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Replication and Sharding">
          <Paragraph>
            Redis can be replicated for availability and read scaling, and it
            can be partitioned across nodes when one instance is no longer
            enough. Those decisions increase operational complexity, especially
            when applications assume all keys are always local and instantly
            consistent.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Common Pitfalls</SectionHeader>

        <CollapsibleSection title="Mistakes That Cause Trouble" collapsible={false}>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using Redis as the only store for critical data without explicit durability design.</li>
            <li>Adding a cache but not defining invalidation, TTLs, or stale-read behavior.</li>
            <li>Assuming pub/sub or queue patterns provide stronger delivery guarantees than they actually do.</li>
            <li>Letting one hot key or one giant value become a bottleneck.</li>
            <li>Ignoring memory growth, eviction policy, and operational visibility.</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="When Redis Is the Wrong Tool">
          <Paragraph>
            Redis is not the best default choice for analytics-heavy querying,
            long-term archival storage, complex relational joins, or workloads
            where the full value comes from durable transactional guarantees.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Redis Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Redis basics:
- In-memory data store
- Commonly used for caching and shared ephemeral state
- Strong fit for sessions, counters, rate limiting, and leaderboards
- Can support queues, pub/sub, and coordination patterns
- Usually complements a primary database instead of replacing it
- Needs clear TTL, invalidation, and durability decisions`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Redis;
