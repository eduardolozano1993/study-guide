import {
  Callout,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { restGraphGrpcLesson } from "./meta";

const comparisonColumns = [
  { key: "rest", label: "REST" },
  { key: "graphql", label: "GraphQL" },
  { key: "grpc", label: "gRPC" },
];

const comparisonRows = [
  {
    label: "Primary model",
    values: {
      rest: "Resource-oriented. Clients work with URLs that represent resources and use HTTP methods for actions.",
      graphql:
        "Schema and query-oriented. Clients ask for fields from a typed graph of data.",
      grpc: "Service and method-oriented. Clients call remote procedures defined in a contract.",
    },
  },
  {
    label: "Typical transport",
    values: {
      rest: "Usually JSON over HTTP.",
      graphql:
        "Usually JSON over HTTP, often through one main endpoint.",
      grpc: "Usually Protocol Buffers over HTTP/2.",
    },
  },
  {
    label: "Response shape control",
    values: {
      rest: "Mostly controlled by the server per endpoint.",
      graphql: "Largely controlled by the client query.",
      grpc: "Controlled by the RPC contract and method definition.",
    },
  },
  {
    label: "Best for",
    values: {
      rest: "Public APIs, straightforward CRUD, browser-friendly integrations, and teams that want broad familiarity.",
      graphql:
        "Frontend-heavy products where different clients need different slices of the same data.",
      grpc: "Internal service-to-service systems that benefit from strong typing, compact payloads, and streaming.",
    },
  },
  {
    label: "Strengths",
    values: {
      rest: "Simple mental model, broad ecosystem support, easy debugging, and HTTP-native caching semantics.",
      graphql:
        "Reduces overfetching and underfetching, exposes one typed schema, and lets clients compose nested data needs.",
      grpc: "High performance, generated clients, strong contracts, and built-in streaming patterns.",
    },
  },
  {
    label: "Tradeoffs",
    values: {
      rest: "Can lead to too many endpoints and multiple round trips for related data.",
      graphql:
        "Adds resolver complexity, query-cost control, and caching challenges.",
      grpc: "Harder to inspect manually, less browser-native, and more tooling-heavy.",
    },
  },
  {
    label: "Caching",
    values: {
      rest: "Works naturally with HTTP caching headers and intermediaries.",
      graphql:
        "Possible, but often more complex because many queries share one endpoint with custom shapes.",
      grpc: "Not usually centered on HTTP cache semantics in the same way REST is.",
    },
  },
  {
    label: "Streaming support",
    values: {
      rest: "Limited and usually not the default model.",
      graphql: "Possible with subscriptions, but not the core request model.",
      grpc: "Built-in unary, client streaming, server streaming, and bidirectional streaming.",
    },
  },
  {
    label: "Public API fit",
    values: {
      rest: "Very strong default choice.",
      graphql:
        "Good when clients need flexible queries and the team can support schema governance.",
      grpc: "Usually weaker for direct browser/public consumption without extra gateways.",
    },
  },
  {
    label: "Internal platform fit",
    values: {
      rest: "Works, but may become repetitive across many internal services.",
      graphql:
        "Useful for aggregated data access layers, less common as a universal microservice protocol.",
      grpc: "Often an excellent fit for internal service boundaries.",
    },
  },
];

export function RestGraphGrpc() {
  return (
    <TopicLessonPage
      title={restGraphGrpcLesson.title}
      summary={restGraphGrpcLesson.summary}
      eyebrow="API"
      estimatedReadingTimeMinutes={restGraphGrpcLesson.estimatedReadingTimeMinutes}
      difficulty={restGraphGrpcLesson.difficulty}
      relatedTopics={[
        { label: "REST", href: "/topic/rest" },
        { label: "GraphQL", href: "/topic/graph-ql" },
        { label: "gRPC", href: "/topic/grpc" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="⚖️"
          title="API Style Comparison"
          description="This page is a compact decision aid. Instead of teaching each approach separately, it compares REST, GraphQL, and gRPC across the dimensions that usually drive architecture choices."
        />

        <CollapsibleSection title="Comparison Table" collapsible={false}>
          <Paragraph>
            Use this as a quick selection guide: REST is usually the default
            public API choice, GraphQL shines when clients need flexible data
            shapes, and gRPC is often strongest for typed internal services.
          </Paragraph>
          <ComparisonTable
            columns={comparisonColumns}
            rows={comparisonRows}
          />
          <Callout variant="important">
            None of these approaches is universally best. The right choice
            depends on who the clients are, how much control they need over data
            shape, and how much protocol and tooling complexity your team wants
            to absorb.
          </Callout>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default RestGraphGrpc;
