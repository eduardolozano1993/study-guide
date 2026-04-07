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
import cdnImage from "@/assets/images/how-cdn-works.png";
import { cdnLesson } from "./meta";

export function CDN() {
  return (
    <TopicLessonPage
      title={cdnLesson.title}
      summary={cdnLesson.summary}
      eyebrow="Architecture"
      estimatedReadingTimeMinutes={cdnLesson.estimatedReadingTimeMinutes}
      difficulty={cdnLesson.difficulty}
      relatedTopics={[
        { label: "DNS", href: "/topic/dns" },
        { label: "Load Balancer", href: "/topic/load-balancer" },
        {
          label: "Horizontal vs Vertical Scaling",
          href: "/topic/horizontal-vertical-scaling",
        },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🌍"
          title="Content Delivery Network"
          description="A CDN places cached content closer to users at geographically distributed edge locations. Its main goals are lower latency, less origin load, and better resilience under traffic spikes."
        />

        <CollapsibleSection title="What a CDN Does" collapsible={false}>
          <Paragraph>
            A content delivery network stores copies of cacheable content at
            edge servers around the world. When a user requests an asset, the
            CDN tries to serve it from a nearby edge location instead of making
            every request travel all the way back to the origin server.
          </Paragraph>
          <Paragraph>
            This shortens network distance, reduces origin traffic, and often
            makes websites and APIs feel much faster for users who are far from
            the main infrastructure region.
          </Paragraph>
          <Callout variant="tip">
            The key mental model is simple: the origin stays the source of
            truth, but the CDN serves cached copies from the edge whenever it
            safely can.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="CDN at a Glance" collapsible={false}>
          <Paragraph>
            This diagram gives the high-level request flow from the user to the
            CDN edge and, when needed, back to the origin.
          </Paragraph>
          <ContentImage
            src={cdnImage}
            alt="Diagram showing how a CDN serves content from edge locations and falls back to the origin server on cache miss"
            caption="High-level view of a CDN serving requests from edge caches and forwarding misses to the origin."
          />
        </CollapsibleSection>

        <SectionHeader>How CDN Request Flow Works</SectionHeader>

        <TopicCard
          icon="🧭"
          title="Edge First"
          description="The edge location closest to the user checks whether it already has a valid cached copy. If it does, the response can be served immediately without contacting the origin."
        />

        <CollapsibleSection title="Cache Hit vs Cache Miss" collapsible={false}>
          <SubHeader>Cache Hit</SubHeader>
          <Paragraph>
            The requested object is already stored at the edge and is still
            valid according to cache rules, so the CDN serves it directly.
          </Paragraph>

          <SubHeader>Cache Miss</SubHeader>
          <Paragraph>
            The edge does not have the object or the cached version is stale,
            so the CDN fetches it from the origin, returns it to the user, and
            may store it for later requests.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`User -> CDN edge
  Cache hit  -> Response returned immediately
  Cache miss -> CDN fetches from origin -> stores result -> returns response`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Origin Server Role" collapsible={false}>
          <Paragraph>
            The origin remains the authoritative source of the content. The CDN
            improves delivery, but it does not replace the origin's role in
            generating or storing the canonical version.
          </Paragraph>
          <Callout variant="important">
            A CDN reduces origin load, but it cannot save a broken origin that
            produces wrong content or cannot respond to misses and refreshes.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>What CDNs Are Good At</SectionHeader>

        <CollapsibleSection title="Static Assets and Media" collapsible={false}>
          <Paragraph>
            CDNs are especially effective for static files such as images,
            stylesheets, JavaScript bundles, fonts, videos, and downloadable
            assets that many users request repeatedly.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`/images/logo.png
/assets/app.js
/assets/app.css
/videos/intro.mp4`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Cacheable HTML and APIs">
          <Paragraph>
            CDNs can also accelerate full HTML pages and some API responses when
            the content is cacheable, varies predictably, and the cache rules
            are well designed.
          </Paragraph>
          <Paragraph>
            This is more nuanced than static assets because personalization,
            authentication, and rapid data changes can make caching harder.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Cache Control and Freshness</SectionHeader>

        <TopicCard
          icon="🗃️"
          title="Caching Rules Matter"
          description="A CDN is only as effective as the cacheability of the content it receives. HTTP cache headers and invalidation strategy strongly influence performance outcomes."
        />

        <CollapsibleSection title="TTL and Cache Headers" collapsible={false}>
          <Paragraph>
            CDNs often rely on cache headers such as `Cache-Control`, `ETag`,
            and expiration metadata to decide how long an object can stay at the
            edge before it must be revalidated or refetched.
          </Paragraph>
          <CodeBlock
            language="http"
            code={`HTTP/1.1 200 OK
Cache-Control: public, max-age=3600
ETag: "app-js-v12"`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Cache Invalidation">
          <Paragraph>
            When content changes before its TTL expires, teams may need to
            purge or invalidate cached objects. Another common strategy is asset
            versioning, where the filename changes whenever the content changes.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`app.js          -> hard to invalidate globally
app.v12.js      -> safer versioned asset pattern`}
          />
          <Callout variant="note">
            Versioned asset names are often easier to manage than frequent
            global cache purges.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Performance and Resilience Benefits</SectionHeader>

        <CollapsibleSection title="Why CDNs Improve Performance" collapsible={false}>
          <Paragraph>
            The biggest improvement often comes from geography. Serving from an
            edge location closer to the user usually reduces round-trip time and
            speeds up page rendering and asset loading.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Why CDNs Help with Scale" collapsible={false}>
          <Paragraph>
            CDNs can absorb large volumes of repeated traffic so the origin does
            not have to serve every request directly. This can reduce bandwidth
            costs and protect application servers during spikes.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Security and Traffic Protection">
          <Paragraph>
            Many CDNs also provide TLS termination, request filtering, bot
            mitigation, and DDoS absorption. In practice, the CDN may become a
            major part of both performance and edge security strategy.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Common CDN Pitfalls</SectionHeader>

        <CollapsibleSection title="Mistakes That Reduce CDN Value" collapsible={false}>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Not setting cache headers, so almost every request becomes a miss.</li>
            <li>Caching personalized or sensitive content incorrectly.</li>
            <li>Using long TTLs without a clear invalidation strategy.</li>
            <li>Assuming the CDN will fix slow origin generation time for uncached requests.</li>
            <li>Forgetting that dynamic APIs may need more selective caching rules than static assets.</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="CDN, DNS, and Load Balancers Together">
          <Paragraph>
            These systems often work together. DNS helps direct the user to the
            CDN, the CDN handles edge caching and protection, and load balancers
            help distribute traffic among origin servers when the CDN needs to
            reach them.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="CDN Cheat Sheet">
          <CodeBlock
            language="text"
            code={`CDN basics:
- Caches content at edge locations
- Serves nearby users with lower latency
- Reduces origin traffic
- Works best for static and cacheable content
- Depends on good cache headers and invalidation
- Often also provides TLS and traffic protection`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default CDN;
