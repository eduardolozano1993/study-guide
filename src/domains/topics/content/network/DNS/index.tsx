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
import dnsRecordTypesImage from "@/assets/images/dns-record-types-you-should-know.png";
import { dnsLesson } from "./meta";

export function DNS() {
  return (
    <TopicLessonPage
      title={dnsLesson.title}
      summary={dnsLesson.summary}
      eyebrow="Network"
      estimatedReadingTimeMinutes={dnsLesson.estimatedReadingTimeMinutes}
      difficulty={dnsLesson.difficulty}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🌐"
          title="Domain Name System"
          description="DNS translates names like example.com into records that computers can use. Learn the lookup flow first, then the record types and operational details."
        />

        <CollapsibleSection title="What DNS Does" collapsible={false}>
          <Paragraph>
            DNS is the naming system of the internet. Humans prefer readable
            names such as `openai.com`, while networks need structured records,
            usually IP addresses, to route traffic to the right server.
          </Paragraph>
          <Paragraph>
            A DNS lookup answers questions like "Which IP address serves this
            website?" or "Which mail server accepts email for this domain?"
          </Paragraph>
          <Callout variant="tip">
            Treat DNS as a distributed directory, not as a single central
            database. Different name servers are authoritative for different
            parts of the namespace.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="How a DNS Lookup Works" collapsible={false}>
          <Paragraph>
            The core request path is foundational, so it should stay visible.
            Most DNS confusion comes from not separating the resolver from the
            authoritative server.
          </Paragraph>

          <SubHeader>1. Stub Resolver</SubHeader>
          <Paragraph>
            Your device asks a recursive resolver for the answer. This is often
            provided by your ISP, router, operating system, or a public DNS
            provider.
          </Paragraph>

          <SubHeader>2. Recursive Resolver</SubHeader>
          <Paragraph>
            If the answer is not already cached, the recursive resolver queries
            the DNS hierarchy on your behalf.
          </Paragraph>

          <SubHeader>3. Root, TLD, and Authoritative Name Servers</SubHeader>
          <Paragraph>
            The resolver follows referrals: root servers point to TLD servers
            like `.com`, then TLD servers point to the authoritative servers
            for the domain, which return the final record.
          </Paragraph>

          <CodeBlock
            language="text"
            code={`Client
  -> Recursive resolver
     -> Root name server
     -> .com TLD name server
     -> Authoritative name server for example.com
  <- Final answer cached and returned`}
          />

          <Callout variant="note">
            Recursive resolvers usually cache answers to reduce latency and
            avoid repeating the full lookup chain for every request.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="DNS Hierarchy and Zones" collapsible={false}>
          <Paragraph>
            DNS is organized as a tree. Responsibility is delegated downward:
            the root delegates to top-level domains, TLDs delegate to domain
            owners, and domain owners can delegate subdomains further.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`.
└── com
    └── example.com
        ├── www.example.com
        └── api.example.com`}
          />
          <Paragraph>
            A zone is the portion of the namespace managed by a particular set
            of authoritative name servers.
          </Paragraph>
          <Callout variant="important">
            A domain name and a DNS zone are related but not identical. A zone
            is an administrative boundary, not just a label in the tree.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Core Record Types</SectionHeader>

        <TopicCard
          icon="📘"
          title="DNS Records"
          description="Keep A, AAAA, CNAME, MX, NS, and TXT visible. They cover most beginner and operational use cases."
        />

        <CollapsibleSection title="Essential Records" collapsible={false}>
          <Paragraph>
            This diagram is a good compact reference for how common record
            types map to practical DNS jobs.
          </Paragraph>
          <ContentImage
            src={dnsRecordTypesImage}
            alt="Diagram showing common DNS record types including A, AAAA, CNAME, MX, TXT, NS, PTR, SOA, CAA, and SRV"
            caption="Common DNS record types and the kind of data each one stores."
          />

          <SubHeader>A and AAAA</SubHeader>
          <Paragraph>
            `A` maps a hostname to an IPv4 address. `AAAA` maps a hostname to
            an IPv6 address.
          </Paragraph>
          <CodeBlock
            language="dns"
            code={`example.com.      300 IN A     93.184.216.34
example.com.      300 IN AAAA  2606:2800:220:1:248:1893:25c8:1946`}
          />

          <SubHeader>CNAME</SubHeader>
          <Paragraph>
            `CNAME` aliases one hostname to another hostname. It does not point
            directly to an IP address.
          </Paragraph>
          <CodeBlock
            language="dns"
            code={`www.example.com.  300 IN CNAME example.com.`}
          />

          <SubHeader>MX</SubHeader>
          <Paragraph>
            `MX` specifies which mail servers receive email for a domain.
          </Paragraph>
          <CodeBlock
            language="dns"
            code={`example.com.      300 IN MX    10 mail1.example.com.
example.com.      300 IN MX    20 mail2.example.com.`}
          />

          <SubHeader>NS</SubHeader>
          <Paragraph>
            `NS` identifies the authoritative name servers for a zone.
          </Paragraph>
          <CodeBlock
            language="dns"
            code={`example.com.      172800 IN NS ns1.provider.net.
example.com.      172800 IN NS ns2.provider.net.`}
          />

          <SubHeader>TXT</SubHeader>
          <Paragraph>
            `TXT` stores arbitrary text data and is commonly used for domain
            verification, SPF, DKIM, and other policies.
          </Paragraph>
          <CodeBlock
            language="dns"
            code={`example.com.      300 IN TXT   "v=spf1 include:_spf.example.net -all"`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Additional Records and Reverse DNS">
          <Paragraph>
            These are useful once the basics are clear, but they are better as
            reference material than as part of the initial learning path.
          </Paragraph>
          <CodeBlock
            language="dns"
            code={`api.example.com.  300 IN CAA   0 issue "letsencrypt.org"
_sip._tcp.example.com. 3600 IN SRV 10 5 5060 sip.example.com.
34.216.184.93.in-addr.arpa. 300 IN PTR example.com.`}
          />
        </CollapsibleSection>

        <SectionHeader>Caching and TTL</SectionHeader>

        <CollapsibleSection title="Why TTL Matters" collapsible={false}>
          <Paragraph>
            Each DNS record includes a TTL, or time to live. This tells caches
            how long they may reuse an answer before asking again.
          </Paragraph>
          <CodeBlock
            language="dns"
            code={`example.com.  300 IN A 93.184.216.34`}
          />
          <Paragraph>
            In this example, `300` means caches may reuse the answer for about
            five minutes.
          </Paragraph>
          <Callout variant="warning">
            Changing a record in the control panel does not instantly update
            every client. Cached answers may remain in use until the TTL
            expires.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Propagation vs. Caching">
          <Paragraph>
            People often say "DNS propagation" when they mean "caches have not
            expired yet." The new record may already be authoritative while
            recursive resolvers still serve the older cached answer.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Practical DNS Operations</SectionHeader>

        <CollapsibleSection title="Common Real-World Tasks" collapsible={false}>
          <Paragraph>
            These tasks are what most developers hit first: pointing a domain
            to a site, connecting email, or proving domain ownership.
          </Paragraph>
          <CodeBlock
            language="dns"
            code={`@     IN A      203.0.113.10
www   IN CNAME  @
@     IN MX     10 mail.provider.com.
@     IN TXT    "google-site-verification=abc123"`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Using dig or nslookup">
          <Paragraph>
            Query tools are ideal for troubleshooting because they show the
            record returned by DNS instead of what a browser happens to cache.
          </Paragraph>
          <CodeBlock
            language="bash"
            code={`dig example.com A
dig example.com MX
nslookup example.com
nslookup -type=TXT example.com`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using `CNAME` where the DNS provider does not allow it at the zone apex.</li>
            <li>Expecting record changes to bypass cached TTL values immediately.</li>
            <li>Confusing registrar settings with DNS zone records.</li>
            <li>Pointing email to a host with no matching `MX` setup.</li>
            <li>Mixing up authoritative answers with local or browser cache behavior.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="DNS Lookup Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Name lookup flow:
Client -> Recursive resolver -> Root -> TLD -> Authoritative server -> Answer

Core records:
A      Hostname -> IPv4
AAAA   Hostname -> IPv6
CNAME  Hostname -> hostname alias
MX     Mail routing
NS     Zone authority
TXT    Verification and policy text`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default DNS;
