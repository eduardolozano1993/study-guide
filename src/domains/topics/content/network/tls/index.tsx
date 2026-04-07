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
import tlsCompareGraphic from "@/assets/images/tls-compare-graphic.jpg";
import { tlsLesson } from "./meta";

export function TLS() {
  return (
    <TopicLessonPage
      title={tlsLesson.title}
      summary={tlsLesson.summary}
      eyebrow="Network"
      estimatedReadingTimeMinutes={tlsLesson.estimatedReadingTimeMinutes}
      difficulty={tlsLesson.difficulty}
      relatedTopics={[
        { label: "DNS", href: "/topic/dns" },
        { label: "HTTP/1.1, HTTP/2, and HTTP/3", href: "/topic/http-1-2-3" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🔐"
          title="Transport Layer Security"
          description="TLS protects traffic between clients and servers by authenticating the endpoint and encrypting the connection. The core ideas are trust, key exchange, and data integrity."
        />

        <CollapsibleSection title="What TLS Solves" collapsible={false}>
          <Paragraph>
            TLS protects data while it moves across the network. Without it,
            anyone on the path could potentially read, modify, or impersonate
            traffic between a client and a server.
          </Paragraph>
          <Paragraph>
            Modern HTTPS is HTTP running over TLS. The browser still sends HTTP
            requests, but TLS encrypts the bytes on the wire and verifies that
            the client is talking to the expected server.
          </Paragraph>
          <Callout variant="tip">
            The three core TLS goals are confidentiality, integrity, and
            authentication. Keeping those three in mind makes the rest of the
            protocol easier to reason about.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="TLS at a Glance" collapsible={false}>
          <Paragraph>
            This graphic is useful as a quick reference for how secure and
            insecure protocol combinations compare at a high level.
          </Paragraph>
          <ContentImage
            src={tlsCompareGraphic}
            alt="Graphic comparing secure and insecure protocol combinations such as HTTP, HTTPS, SSL, and TLS"
            caption="High-level comparison of protocol combinations and where TLS fits into secure web communication."
          />
        </CollapsibleSection>

        <SectionHeader>How TLS Works</SectionHeader>

        <TopicCard
          icon="🤝"
          title="TLS Handshake"
          description="The handshake establishes the cryptographic parameters, verifies identity with certificates, and derives the keys that will protect the session."
        />

        <CollapsibleSection title="Handshake Overview" collapsible={false}>
          <Paragraph>
            Before application data is exchanged, client and server perform a
            handshake. They agree on protocol settings, authenticate the
            server, and derive shared secrets that will encrypt the session.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Client -> ClientHello
Server -> ServerHello + certificate
Client <-> Server: key exchange and verification
Client <-> Server: encrypted application data`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Step by Step" collapsible={false}>
          <SubHeader>ClientHello</SubHeader>
          <Paragraph>
            The client begins by sending supported TLS versions, cipher suites,
            extensions, and random values.
          </Paragraph>

          <SubHeader>ServerHello</SubHeader>
          <Paragraph>
            The server picks the protocol parameters to use and sends its own
            random value, along with certificate data so the client can verify
            who it is talking to.
          </Paragraph>

          <SubHeader>Key Exchange</SubHeader>
          <Paragraph>
            The two sides perform a key exchange, commonly using ephemeral
            Diffie-Hellman, so they can derive shared session keys without
            sending those keys directly over the network.
          </Paragraph>

          <SubHeader>Finished Messages</SubHeader>
          <Paragraph>
            Once both sides confirm the handshake transcript, application data
            can be sent under encryption.
          </Paragraph>
          <Callout variant="note">
            TLS uses asymmetric cryptography to establish trust and exchange
            secrets safely, then switches to faster symmetric encryption for
            the ongoing data transfer.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Certificates and Trust</SectionHeader>

        <CollapsibleSection title="Why Certificates Matter" collapsible={false}>
          <Paragraph>
            Encryption alone is not enough. A client also needs to know whether
            the server is actually the domain it claims to be. Certificates
            provide that identity layer.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Certificate says:
- This public key belongs to example.com
- It is valid for a given time window
- It was signed by a trusted certificate authority`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Certificate Authorities and Validation" collapsible={false}>
          <Paragraph>
            Browsers and operating systems maintain trust stores containing
            certificate authorities they accept. If a server certificate chains
            back to one of those trusted authorities and matches the hostname,
            the client can continue.
          </Paragraph>
          <Paragraph>
            If the certificate is expired, self-signed without trust, or issued
            for the wrong hostname, the browser warns the user because the
            server identity is no longer reliable.
          </Paragraph>
          <Callout variant="warning">
            A valid certificate does not mean the application is safe in every
            other way. It only means the identity and encrypted transport checks
            passed.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TLS 1.2 vs TLS 1.3</SectionHeader>

        <TopicCard
          icon="⚡"
          title="Modern TLS"
          description="TLS 1.3 removes older legacy features, simplifies the handshake, and improves security defaults compared with earlier versions."
        />

        <CollapsibleSection title="Why TLS 1.3 Matters" collapsible={false}>
          <Paragraph>
            TLS 1.3 reduces handshake complexity, removes obsolete algorithms,
            and generally reaches encrypted communication with fewer round trips
            than older versions.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`TLS 1.2
- More negotiation paths
- More legacy algorithms
- More handshake complexity

TLS 1.3
- Fewer round trips
- Stronger default choices
- Obsolete options removed`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Forward Secrecy and Safer Defaults" collapsible={false}>
          <Paragraph>
            Modern TLS emphasizes forward secrecy, which means that even if a
            long-term private key is compromised later, past captured sessions
            should remain protected if ephemeral key exchange was used.
          </Paragraph>
          <Paragraph>
            TLS 1.3 also removes weak ciphers and old handshake patterns that
            created unnecessary attack surface.
          </Paragraph>
          <Callout variant="important">
            Current systems should prefer TLS 1.3 when available and disable
            old protocol versions unless there is a very specific compatibility
            requirement.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>HTTP, HTTPS, and TLS</SectionHeader>

        <CollapsibleSection title="How TLS Relates to HTTPS" collapsible={false}>
          <Paragraph>
            HTTPS is not a different application protocol from HTTP in the way
            many beginners assume. It is HTTP carried over a TLS-protected
            connection.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`HTTP  = application data sent without TLS
HTTPS = HTTP sent over TLS`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="What TLS Does Not Do">
          <Paragraph>
            TLS does not fix bad authorization logic, insecure cookies, broken
            application code, or data leaks at the server itself. It protects
            the transport layer, not the entire system.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Common TLS Problems</SectionHeader>

        <CollapsibleSection title="Operational Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Expired certificates causing browsers to reject the site.</li>
            <li>Hostname mismatches between the certificate and the requested domain.</li>
            <li>Serving old TLS versions or weak cipher suites for legacy compatibility.</li>
            <li>Forgetting that mixed content can still expose insecure resource loads.</li>
            <li>Assuming HTTPS alone guarantees application-level security.</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="A Minimal HTTPS Request View">
          <CodeBlock
            language="text"
            code={`1. Client resolves the domain name
2. Client connects to the server
3. TLS handshake establishes trust and session keys
4. HTTP request and response travel inside the encrypted channel`}
          />
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="TLS Cheat Sheet">
          <CodeBlock
            language="text"
            code={`TLS goals:
- Confidentiality
- Integrity
- Authentication

Main ideas:
- Certificates prove identity
- Handshake establishes session keys
- Symmetric encryption protects bulk data
- TLS 1.3 is the modern default`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default TLS;
