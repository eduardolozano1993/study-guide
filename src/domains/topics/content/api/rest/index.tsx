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
import restApiCheatSheetImage from "@/assets/images/rest-api-cheatsheet.png";
import { restLesson } from "./meta";

export function REST() {
  return (
    <TopicLessonPage
      title={restLesson.title}
      summary={restLesson.summary}
      eyebrow="API"
      estimatedReadingTimeMinutes={restLesson.estimatedReadingTimeMinutes}
      difficulty={restLesson.difficulty}
      relatedTopics={[
        { label: "HTTP/1.1, HTTP/2, and HTTP/3", href: "/topic/http-1-2-3" },
        { label: "TLS", href: "/topic/tls" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🧭"
          title="Representational State Transfer"
          description="REST is an architectural style for networked systems. In practice, most developers meet it as a set of conventions for designing HTTP APIs around resources, verbs, and predictable responses."
        />

        <CollapsibleSection title="What REST Means" collapsible={false}>
          <Paragraph>
            REST is not a protocol. It is a set of architectural constraints
            for how clients and servers should interact. Most modern REST APIs
            use HTTP, but an API is not automatically RESTful just because it
            returns JSON over HTTP.
          </Paragraph>
          <Paragraph>
            The practical goal is consistency: clients should be able to infer
            how to work with resources by looking at URLs, methods, and status
            codes instead of memorizing one-off behaviors for every endpoint.
          </Paragraph>
          <Callout variant="tip">
            Think "resources plus standard HTTP behavior" before thinking
            "RPC over URLs." That distinction is the foundation of RESTful API
            design.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="REST at a Glance" collapsible={false}>
          <Paragraph>
            This cheat sheet is a useful quick reference for the HTTP methods
            and response patterns developers most often associate with REST APIs.
          </Paragraph>
          <ContentImage
            src={restApiCheatSheetImage}
            alt="REST API cheat sheet showing common HTTP methods, status codes, and usage patterns"
            caption="A compact REST API cheat sheet for common request methods and response semantics."
          />
        </CollapsibleSection>

        <SectionHeader>Resources and URLs</SectionHeader>

        <TopicCard
          icon="📦"
          title="Resource-Oriented Design"
          description="In REST, URLs identify resources such as users, orders, or articles. HTTP methods describe the action, rather than encoding verbs directly into the path."
        />

        <CollapsibleSection title="Design Around Nouns" collapsible={false}>
          <Paragraph>
            A resource is the thing your API exposes: a user, product, invoice,
            or article. Good REST paths usually name collections and individual
            resources clearly.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`/users
/users/42
/orders
/orders/abc123`}
          />
          <Paragraph>
            These paths identify what the client is working with. The HTTP
            method tells the server what operation is being requested.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Avoid Verb-Heavy Paths" collapsible={false}>
          <Paragraph>
            Paths like `/getUsers` or `/createOrder` push API design toward RPC
            instead of resource-oriented interaction.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Prefer:
GET /users
POST /orders

Avoid:
GET /getUsers
POST /createOrder`}
          />
          <Callout variant="note">
            Not every non-REST pattern is wrong, but mixing RPC and REST
            semantics without intention usually makes APIs harder to learn.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>HTTP Methods</SectionHeader>

        <CollapsibleSection title="Common REST Methods" collapsible={false}>
          <SubHeader>GET</SubHeader>
          <Paragraph>
            Reads a resource or a collection. It should not create side effects
            visible to the client.
          </Paragraph>

          <SubHeader>POST</SubHeader>
          <Paragraph>
            Creates a new resource or triggers server-side processing when the
            server decides the resulting URI.
          </Paragraph>

          <SubHeader>PUT</SubHeader>
          <Paragraph>
            Replaces a resource representation at a known URI.
          </Paragraph>

          <SubHeader>PATCH</SubHeader>
          <Paragraph>
            Applies a partial update to an existing resource.
          </Paragraph>

          <SubHeader>DELETE</SubHeader>
          <Paragraph>
            Removes a resource.
          </Paragraph>
          <CodeBlock
            language="http"
            code={`GET    /users
GET    /users/42
POST   /users
PUT    /users/42
PATCH  /users/42
DELETE /users/42`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Idempotency and Safety">
          <Paragraph>
            These HTTP properties matter because they affect retries, caching,
            and client expectations.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Safe methods:
GET, HEAD

Idempotent methods:
GET, PUT, DELETE, HEAD, OPTIONS

Usually not idempotent:
POST`}
          />
        </CollapsibleSection>

        <SectionHeader>Status Codes and Responses</SectionHeader>

        <CollapsibleSection title="Use Status Codes Intentionally" collapsible={false}>
          <Paragraph>
            REST APIs should use HTTP status codes to communicate the outcome of
            a request, rather than always returning `200 OK` with a custom
            application-level status in the body.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`200 OK       Request succeeded
201 Created  Resource created
204 No Content  Success with no response body
400 Bad Request  Invalid input
401 Unauthorized  Authentication required
403 Forbidden  Authenticated but not allowed
404 Not Found  Resource does not exist
409 Conflict  State conflict
500 Internal Server Error  Server failure`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="A Typical JSON Response" collapsible={false}>
          <CodeBlock
            language="json"
            code={`{
  "id": 42,
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}`}
          />
          <Paragraph>
            JSON is the most common representation format in modern REST APIs,
            but REST is about the interaction model, not about JSON
            specifically.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>REST Constraints</SectionHeader>

        <TopicCard
          icon="🧱"
          title="Core Constraints"
          description="The most important REST constraints for everyday API work are client-server separation, statelessness, cacheability, and a uniform interface."
        />

        <CollapsibleSection title="Stateless Requests" collapsible={false}>
          <Paragraph>
            Each request should contain the information the server needs to
            process it. The server should not rely on hidden conversational
            state stored between requests.
          </Paragraph>
          <Callout variant="important">
            Stateless does not mean the server stores no data. It means the
            server does not depend on per-client session context hidden outside
            the request itself.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Uniform Interface" collapsible={false}>
          <Paragraph>
            A uniform interface means the API behaves consistently across
            resources. Similar operations should use similar URL shapes,
            methods, headers, and response conventions.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Cacheability">
          <Paragraph>
            REST embraces HTTP caching where it makes sense. Responses can carry
            headers that tell clients and intermediaries whether the result can
            be reused safely.
          </Paragraph>
          <CodeBlock
            language="http"
            code={`HTTP/1.1 200 OK
Cache-Control: max-age=60
ETag: "users-page-1-v5"`}
          />
        </CollapsibleSection>

        <SectionHeader>Practical REST Design</SectionHeader>

        <CollapsibleSection title="Filtering, Sorting, and Pagination" collapsible={false}>
          <Paragraph>
            Query parameters are a common way to refine collection endpoints
            without changing the resource identity.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`GET /users?role=admin
GET /articles?sort=-publishedAt
GET /orders?page=2&pageSize=20`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Mistakes">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using verbs in every path instead of letting HTTP methods carry intent.</li>
            <li>Returning `200 OK` for validation failures or missing resources.</li>
            <li>Making partial updates with `PUT` while documenting them as patches.</li>
            <li>Ignoring pagination for large collections.</li>
            <li>Calling an API RESTful even though every endpoint behaves like custom RPC.</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="A Small REST Example">
          <CodeBlock
            language="http"
            code={`POST /users
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}

HTTP/1.1 201 Created
Location: /users/42`}
          />
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="REST Cheat Sheet">
          <CodeBlock
            language="text"
            code={`REST basics:
- Design around resources
- Use HTTP methods consistently
- Keep requests stateless
- Return meaningful status codes
- Use query params for filtering and pagination
- Prefer predictable URL and response patterns`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default REST;
