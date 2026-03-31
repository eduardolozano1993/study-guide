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
import graphQlImage from "@/assets/images/what-is-graphql.png";
import { graphQlLesson } from "./meta";

export function GraphQL() {
  return (
    <TopicLessonPage
      title={graphQlLesson.title}
      summary={graphQlLesson.summary}
      eyebrow="API"
      estimatedReadingTimeMinutes={graphQlLesson.estimatedReadingTimeMinutes}
      difficulty={graphQlLesson.difficulty}
      relatedTopics={[
        { label: "REST", href: "/topic/rest" },
        { label: "gRPC", href: "/topic/grpc" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🕸️"
          title="GraphQL"
          description="GraphQL is a query language and runtime for APIs. Instead of relying on many fixed endpoints, clients ask for exactly the fields they need from a typed schema."
        />

        <CollapsibleSection title="What GraphQL Is" collapsible={false}>
          <Paragraph>
            GraphQL defines a schema describing available types, fields, and
            operations. Clients send queries against that schema, and the server
            returns data shaped to match the query structure.
          </Paragraph>
          <Paragraph>
            In practice, GraphQL is often used to reduce overfetching and
            underfetching by letting the client describe the exact data it
            wants.
          </Paragraph>
          <Callout variant="tip">
            The most important mental shift is this: in GraphQL, the client
            usually controls the response shape more directly than it does in a
            typical REST API.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="GraphQL at a Glance" collapsible={false}>
          <Paragraph>
            This diagram is a useful high-level overview of how GraphQL sits
            between clients and backend data sources.
          </Paragraph>
          <ContentImage
            src={graphQlImage}
            alt="Diagram showing GraphQL as a single API layer between clients and underlying services or databases"
            caption="High-level view of GraphQL as a schema-driven API layer between clients and backend systems."
          />
        </CollapsibleSection>

        <SectionHeader>Core Concepts</SectionHeader>

        <TopicCard
          icon="🧠"
          title="Schema-Driven API Design"
          description="A GraphQL schema is the contract. It defines what data exists, what operations are available, and which fields can be queried."
        />

        <CollapsibleSection title="Types and Fields" collapsible={false}>
          <Paragraph>
            The schema describes object types, scalar fields, lists,
            relationships, and operations. Clients can only request what the
            schema exposes.
          </Paragraph>
          <CodeBlock
            language="graphql"
            code={`type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  user(id: ID!): User
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Queries, Mutations, and Subscriptions" collapsible={false}>
          <SubHeader>Query</SubHeader>
          <Paragraph>
            Reads data from the API.
          </Paragraph>

          <SubHeader>Mutation</SubHeader>
          <Paragraph>
            Changes data on the server.
          </Paragraph>

          <SubHeader>Subscription</SubHeader>
          <Paragraph>
            Streams updates to the client over time, commonly for real-time
            applications.
          </Paragraph>
          <CodeBlock
            language="graphql"
            code={`type Mutation {
  createUser(name: String!, email: String!): User!
}`}
          />
        </CollapsibleSection>

        <SectionHeader>How GraphQL Requests Work</SectionHeader>

        <CollapsibleSection title="A Basic Query" collapsible={false}>
          <Paragraph>
            A client sends a query describing the exact fields it wants. The
            response shape mirrors the query shape.
          </Paragraph>
          <CodeBlock
            language="graphql"
            code={`query GetUser {
  user(id: "42") {
    id
    name
    email
  }
}`}
          />
          <CodeBlock
            language="json"
            code={`{
  "data": {
    "user": {
      "id": "42",
      "name": "Ada Lovelace",
      "email": "ada@example.com"
    }
  }
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Overfetching and Underfetching" collapsible={false}>
          <Paragraph>
            REST endpoints often return either more data than the client needs
            or too little, forcing extra requests. GraphQL addresses that by
            letting the client select fields directly.
          </Paragraph>
          <Callout variant="note">
            GraphQL does not remove all performance issues. Poor resolver logic
            can still create expensive query patterns behind the scenes.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Resolvers and Execution</SectionHeader>

        <CollapsibleSection title="How the Server Produces Data" collapsible={false}>
          <Paragraph>
            GraphQL servers resolve fields by executing resolver functions. A
            resolver might read from a database, call another service, or
            compute a derived value.
          </Paragraph>
          <CodeBlock
            language="typescript"
            code={`const resolvers = {
  Query: {
    user: (_parent, args, context) => {
      return context.db.users.findById(args.id);
    },
  },
};`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="The N+1 Problem">
          <Paragraph>
            GraphQL can accidentally trigger many repeated backend lookups when
            nested fields are resolved inefficiently. Techniques like batching
            and caching at the resolver layer are often needed.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>GraphQL vs REST vs gRPC</SectionHeader>

        <CollapsibleSection title="When GraphQL Is a Better Fit" collapsible={false}>
          <Paragraph>
            GraphQL is often useful when many clients need different views of
            the same data model, especially in frontend-heavy applications where
            controlling response shape is valuable.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`REST
- Resource-oriented
- Multiple endpoints
- Server controls response shape

GraphQL
- Schema and query-oriented
- Often one main endpoint
- Client selects response fields

gRPC
- Service and method oriented
- Strongly typed RPC contracts
- Common for internal service-to-service communication`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Tradeoffs and Limitations" collapsible={false}>
          <Paragraph>
            GraphQL adds flexibility, but also complexity in caching, query
            cost control, authorization, and server-side optimization.
          </Paragraph>
          <Paragraph>
            A simple REST API can still be easier to reason about, while gRPC
            may be a stronger fit for typed internal service boundaries.
          </Paragraph>
          <Callout variant="important">
            GraphQL is not automatically better because it is flexible. It is
            better when that flexibility solves a real client-data-shaping
            problem worth the added operational complexity.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Common Patterns</SectionHeader>

        <CollapsibleSection title="Fragments and Variables">
          <Paragraph>
            GraphQL supports reusable fragments and variables so clients can
            build larger queries without duplicating field selections.
          </Paragraph>
          <CodeBlock
            language="graphql"
            code={`query GetUser($id: ID!) {
  user(id: $id) {
    ...UserFields
  }
}

fragment UserFields on User {
  id
  name
  email
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Mistakes">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Assuming GraphQL removes the need for careful backend design.</li>
            <li>Ignoring query cost and allowing overly expensive nested requests.</li>
            <li>Skipping schema discipline and treating GraphQL as unstructured JSON access.</li>
            <li>Choosing GraphQL when a simple REST API would be easier for the team to maintain.</li>
            <li>Forgetting that resolver performance can become the real bottleneck.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="GraphQL Cheat Sheet">
          <CodeBlock
            language="text"
            code={`GraphQL basics:
- Schema-driven API
- Clients query exact fields
- Main operations: query, mutation, subscription
- Response shape mirrors query shape
- Good for flexible client data needs
- Needs careful resolver and query-cost design`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default GraphQL;
