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
import loadBalancerImage from "@/assets/images/what-is-a-load-balancer.png";
import { loadBalancerLesson } from "./meta";

export function LoadBalancer() {
  return (
    <TopicLessonPage
      title={loadBalancerLesson.title}
      summary={loadBalancerLesson.summary}
      eyebrow="Architecture"
      estimatedReadingTimeMinutes={loadBalancerLesson.estimatedReadingTimeMinutes}
      difficulty={loadBalancerLesson.difficulty}
      relatedTopics={[
        { label: "DNS", href: "/topic/dns" },
        { label: "TLS", href: "/topic/tls" },
        { label: "HTTP/1.1, HTTP/2, and HTTP/3", href: "/topic/http-1-2-3" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="⚓"
          title="Traffic Distribution Layer"
          description="A load balancer sits in front of multiple servers and decides where each incoming request should go. It helps systems scale, stay available, and recover from instance failures."
        />

        <CollapsibleSection title="What a Load Balancer Does" collapsible={false}>
          <Paragraph>
            A load balancer receives traffic from clients and forwards that
            traffic to one of several backend servers. Instead of every client
            picking a backend directly, the load balancer becomes the entry
            point and routing decision-maker.
          </Paragraph>
          <Paragraph>
            This helps spread work across multiple instances, avoids
            concentrating requests on a single machine, and makes it easier to
            take unhealthy servers out of rotation.
          </Paragraph>
          <Callout variant="tip">
            The core idea is simple: one stable entry point in front of many
            interchangeable backends.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Load Balancer at a Glance" collapsible={false}>
          <Paragraph>
            This diagram shows the basic role of a load balancer between users
            and a pool of backend servers.
          </Paragraph>
          <ContentImage
            src={loadBalancerImage}
            alt="Diagram showing a load balancer distributing client requests across multiple backend servers"
            caption="High-level view of a load balancer distributing traffic to multiple application servers."
          />
        </CollapsibleSection>

        <SectionHeader>Why Systems Need Load Balancers</SectionHeader>

        <TopicCard
          icon="📈"
          title="Scaling and Availability"
          description="Load balancers matter when one server is no longer enough or when a system must keep serving traffic even if some machines fail."
        />

        <CollapsibleSection title="Horizontal Scaling" collapsible={false}>
          <Paragraph>
            When demand grows, adding more servers is often easier than
            continuously making one server larger. A load balancer makes that
            horizontal scaling model practical by distributing requests across
            the server pool.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Clients
  -> Load balancer
     -> App server A
     -> App server B
     -> App server C`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="High Availability" collapsible={false}>
          <Paragraph>
            If one backend instance fails, the load balancer can stop sending
            traffic to it and continue routing requests to healthy instances.
            That reduces downtime and improves resilience.
          </Paragraph>
          <Callout variant="important">
            A load balancer improves availability only if there are healthy
            backend instances to fail over to. It is not magic on its own.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>How Requests Get Distributed</SectionHeader>

        <CollapsibleSection title="Common Balancing Algorithms" collapsible={false}>
          <SubHeader>Round Robin</SubHeader>
          <Paragraph>
            Sends requests to backends in a repeating sequence. This is simple
            and common when servers have similar capacity.
          </Paragraph>

          <SubHeader>Least Connections</SubHeader>
          <Paragraph>
            Sends traffic to the backend with the fewest active connections.
            This can work better when request durations vary.
          </Paragraph>

          <SubHeader>Weighted Distribution</SubHeader>
          <Paragraph>
            Gives more traffic to stronger servers and less traffic to weaker
            ones by assigning different weights.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Round robin:
Request 1 -> A
Request 2 -> B
Request 3 -> C
Request 4 -> A`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Session Affinity">
          <Paragraph>
            Some systems keep a user tied to the same backend for multiple
            requests. This is called sticky sessions or session affinity.
          </Paragraph>
          <Paragraph>
            It can simplify stateful applications, but it also makes scaling
            and failover less clean than fully stateless backends.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Health Checks and Failover</SectionHeader>

        <CollapsibleSection title="How the Load Balancer Knows a Server Is Healthy" collapsible={false}>
          <Paragraph>
            Load balancers usually perform health checks on backend instances.
            These checks may be simple TCP connection tests or application-level
            HTTP checks against a health endpoint.
          </Paragraph>
          <CodeBlock
            language="http"
            code={`GET /health HTTP/1.1
Host: app.internal

HTTP/1.1 200 OK`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Active and Passive Detection">
          <Paragraph>
            Active checks probe backends on a schedule. Passive detection uses
            live traffic signals such as timeouts, connection failures, or high
            error rates to infer that a backend should be removed.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Layer 4 vs Layer 7</SectionHeader>

        <TopicCard
          icon="🧭"
          title="Transport vs Application Routing"
          description="Some load balancers route based on connection-level information, while others inspect HTTP details like hostnames, paths, or headers."
        />

        <CollapsibleSection title="Layer 4 Load Balancing" collapsible={false}>
          <Paragraph>
            Layer 4 load balancers route traffic based on transport information
            such as IP addresses, ports, and TCP or UDP connections. They do
            not need to understand HTTP semantics.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Layer 7 Load Balancing" collapsible={false}>
          <Paragraph>
            Layer 7 load balancers understand application-layer protocols like
            HTTP. They can route based on hostname, URL path, cookies, headers,
            or request methods.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`api.example.com      -> API cluster
www.example.com      -> Web frontend cluster
/images/*            -> Media service
/checkout/*          -> Checkout service`}
          />
          <Callout variant="note">
            Layer 7 routing is more flexible, but it also means the load
            balancer is doing more work and often terminating HTTP or TLS.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TLS Termination and Reverse Proxy Behavior</SectionHeader>

        <CollapsibleSection title="TLS Termination" collapsible={false}>
          <Paragraph>
            Many load balancers terminate TLS. The client establishes an HTTPS
            connection with the load balancer, and the load balancer then
            forwards traffic to the backend, sometimes over plain HTTP inside a
            trusted network and sometimes over re-encrypted HTTPS.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Client -- HTTPS --> Load balancer -- HTTP or HTTPS --> Backend`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Reverse Proxy Role">
          <Paragraph>
            In many architectures, the load balancer also acts as a reverse
            proxy. It can rewrite headers, add forwarding information, compress
            responses, or enforce rate limits.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Operational Considerations</SectionHeader>

        <CollapsibleSection title="Common Real-World Concerns" collapsible={false}>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Avoiding the load balancer itself becoming a single point of failure.</li>
            <li>Keeping backend instances stateless where possible.</li>
            <li>Making health checks meaningful instead of superficial.</li>
            <li>Preserving client IP information with forwarding headers.</li>
            <li>Watching for uneven traffic caused by bad balancing strategy or sticky sessions.</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Common Products and Managed Services">
          <Paragraph>
            Load balancing can be handled by hardware appliances, software
            proxies like NGINX or HAProxy, ingress controllers in Kubernetes,
            or cloud-managed services such as AWS ALB/NLB, Google Cloud Load
            Balancing, or Azure Load Balancer.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Load Balancer Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Load balancer basics:
- Sits in front of multiple backends
- Distributes traffic across servers
- Supports scaling and failover
- Uses health checks to avoid unhealthy instances
- Can operate at Layer 4 or Layer 7
- Often terminates TLS and acts as a reverse proxy`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default LoadBalancer;
