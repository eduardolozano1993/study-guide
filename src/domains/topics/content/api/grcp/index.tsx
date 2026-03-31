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
import grpcImage from "@/assets/images/what-is-grpc.png";
import { grpcLesson } from "./meta";

export function GRPC() {
  return (
    <TopicLessonPage
      title={grpcLesson.title}
      summary={grpcLesson.summary}
      eyebrow="API"
      estimatedReadingTimeMinutes={grpcLesson.estimatedReadingTimeMinutes}
      difficulty={grpcLesson.difficulty}
      relatedTopics={[
        { label: "REST", href: "/topic/rest" },
        { label: "HTTP/1.1, HTTP/2, and HTTP/3", href: "/topic/http-1-2-3" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="📡"
          title="gRPC"
          description="gRPC is a high-performance RPC framework built around strongly typed service definitions, Protocol Buffers, and HTTP/2. It is especially common in internal service-to-service communication."
        />

        <CollapsibleSection title="What gRPC Is" collapsible={false}>
          <Paragraph>
            gRPC is a remote procedure call framework. Instead of designing an
            API mainly around URLs and HTTP verbs, you define services and
            methods, then clients call those methods as if they were remote
            functions.
          </Paragraph>
          <Paragraph>
            Under the hood, gRPC typically uses HTTP/2 for transport and
            Protocol Buffers for efficient binary serialization.
          </Paragraph>
          <Callout variant="tip">
            REST usually emphasizes resources. gRPC emphasizes services and
            operations. That is the clearest conceptual difference to keep in
            mind.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="gRPC at a Glance" collapsible={false}>
          <Paragraph>
            This diagram gives a compact overview of how gRPC sits on top of
            Protocol Buffers and HTTP/2.
          </Paragraph>
          <ContentImage
            src={grpcImage}
            alt="Diagram explaining what gRPC is and how it uses Protocol Buffers and HTTP/2"
            caption="High-level view of gRPC as a service-oriented RPC framework built on Protocol Buffers and HTTP/2."
          />
        </CollapsibleSection>

        <SectionHeader>Core Building Blocks</SectionHeader>

        <TopicCard
          icon="🧩"
          title="Contracts First"
          description="In gRPC, the API contract is usually defined in a `.proto` file first, then code is generated for clients and servers from that shared schema."
        />

        <CollapsibleSection title="Protocol Buffers" collapsible={false}>
          <Paragraph>
            Protocol Buffers, or protobuf, define message shapes and service
            methods in a language-neutral schema format. Code generators then
            produce typed models and client/server stubs for many languages.
          </Paragraph>
          <CodeBlock
            language="proto"
            code={`syntax = "proto3";

message GetUserRequest {
  int32 id = 1;
}

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Service Definitions" collapsible={false}>
          <Paragraph>
            A gRPC service lists the available RPC methods and the request and
            response messages each method uses.
          </Paragraph>
          <CodeBlock
            language="proto"
            code={`service UserService {
  rpc GetUser(GetUserRequest) returns (User);
}`}
          />
          <Callout variant="note">
            The schema is the source of truth. Clients and servers both rely on
            generated code that comes from the same contract.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>How Requests Flow</SectionHeader>

        <CollapsibleSection title="Unary RPC" collapsible={false}>
          <Paragraph>
            The simplest gRPC pattern is unary RPC: one request message in, one
            response message out. This is the closest gRPC equivalent to a basic
            REST request-response interaction.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Client -> GetUser(id: 42)
Server -> User(id: 42, name: "Ada", email: "ada@example.com")`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Streaming RPC" collapsible={false}>
          <Paragraph>
            gRPC also supports streaming, which is one of its strongest
            differentiators. Methods can stream messages from server to client,
            client to server, or both directions.
          </Paragraph>

          <SubHeader>Server Streaming</SubHeader>
          <Paragraph>
            One request, many streamed responses.
          </Paragraph>

          <SubHeader>Client Streaming</SubHeader>
          <Paragraph>
            Many streamed requests, one final response.
          </Paragraph>

          <SubHeader>Bidirectional Streaming</SubHeader>
          <Paragraph>
            Client and server both send streams of messages over the same RPC.
          </Paragraph>
          <CodeBlock
            language="proto"
            code={`service ChatService {
  rpc JoinRoom(stream ChatMessage) returns (stream ChatMessage);
}`}
          />
        </CollapsibleSection>

        <SectionHeader>Why gRPC Performs Well</SectionHeader>

        <CollapsibleSection title="HTTP/2 and Binary Serialization" collapsible={false}>
          <Paragraph>
            gRPC benefits from HTTP/2 features such as multiplexing and
            long-lived connections. Protocol Buffers also produce compact binary
            payloads that are usually smaller and faster to parse than JSON.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`gRPC stack:
Application method call
-> Protobuf message serialization
-> gRPC framing
-> HTTP/2 transport`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Where gRPC Fits Best" collapsible={false}>
          <Paragraph>
            gRPC is often a strong fit for internal microservices, mobile back
            ends, and systems where strict contracts, generated clients, and
            efficient transport matter.
          </Paragraph>
          <Callout variant="important">
            gRPC is especially attractive when many services are controlled by
            one organization and can all share the same schema and tooling.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>gRPC vs REST</SectionHeader>

        <CollapsibleSection title="Key Differences" collapsible={false}>
          <CodeBlock
            language="text"
            code={`REST
- Resource-oriented
- Usually JSON over HTTP
- Easy to inspect in browsers and tools
- Very common for public APIs

gRPC
- Service and method oriented
- Usually Protobuf over HTTP/2
- Strongly typed generated clients
- Strong fit for internal service communication`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Tradeoffs and Limitations">
          <Paragraph>
            gRPC can be harder to inspect manually than JSON APIs, browser
            support is more limited without special adapters, and the tooling
            model is more contract-centric.
          </Paragraph>
          <Paragraph>
            For public web APIs consumed directly from browsers, REST often
            stays simpler. For internal systems with many services and strong
            typing needs, gRPC often scales better operationally.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Error Handling and Metadata</SectionHeader>

        <CollapsibleSection title="Status and Metadata" collapsible={false}>
          <Paragraph>
            gRPC has its own status model and metadata mechanism. Instead of
            HTTP status codes as the main application signal, gRPC responses
            often use gRPC status codes such as `OK`, `INVALID_ARGUMENT`, or
            `NOT_FOUND`.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Common gRPC statuses:
OK
INVALID_ARGUMENT
NOT_FOUND
PERMISSION_DENIED
UNAVAILABLE
INTERNAL`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Mistakes">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Assuming gRPC is just REST with different syntax.</li>
            <li>Ignoring schema versioning concerns in `.proto` files.</li>
            <li>Choosing gRPC for browser-heavy public APIs without considering compatibility needs.</li>
            <li>Forgetting that generated clients are a major part of the gRPC workflow.</li>
            <li>Using gRPC streaming without a clear need for long-lived message flows.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Sending gRPC Requests</SectionHeader>

        <CollapsibleSection title="Node.js and Browser Examples" collapsible={false}>
          <SubHeader>Node.js with a generated client</SubHeader>
          <CodeBlock
            language="javascript"
            code={`import { credentials } from "@grpc/grpc-js";
import { UserServiceClient } from "./generated/user_grpc_pb.js";
import { GetUserRequest } from "./generated/user_pb.js";

const client = new UserServiceClient(
  "localhost:50051",
  credentials.createInsecure(),
);

const request = new GetUserRequest();
request.setId(42);

client.getUser(request, (error, response) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(response.toObject());
});`}
          />

          <SubHeader>React or Angular in the browser with grpc-web</SubHeader>
          <CodeBlock
            language="typescript"
            code={`import { UserServiceClient } from "./generated/UserServiceClientPb";
import { GetUserRequest } from "./generated/user_pb";

const client = new UserServiceClient("https://api.example.com");
const request = new GetUserRequest();
request.setId(42);

client.getUser(request, {}, (error, response) => {
  if (error) {
    console.error(error.message);
    return;
  }

  console.log(response.toObject());
});`}
          />

          <Callout variant="note">
            Direct browser use usually relies on `grpc-web` or an HTTP gateway.
            Plain gRPC clients are most natural in Node.js and internal
            services.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="gRPC Cheat Sheet">
          <CodeBlock
            language="text"
            code={`gRPC basics:
- RPC framework
- Contract-first with .proto files
- Uses Protocol Buffers
- Commonly runs over HTTP/2
- Supports unary and streaming RPCs
- Strong fit for internal service-to-service APIs`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default GRPC;
