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
import httpStatusCodeImage from "@/assets/images/http-status-code.png";
import { httpStatusCodesLesson } from "./meta";

export function HttpStatusCodes() {
  return (
    <TopicLessonPage
      title={httpStatusCodesLesson.title}
      summary={httpStatusCodesLesson.summary}
      eyebrow="API"
      estimatedReadingTimeMinutes={httpStatusCodesLesson.estimatedReadingTimeMinutes}
      difficulty={httpStatusCodesLesson.difficulty}
      relatedTopics={[
        { label: "REST", href: "/topic/rest" },
        { label: "HTTP/1.1, HTTP/2, and HTTP/3", href: "/topic/http-1-2-3" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🚥"
          title="HTTP Response Semantics"
          description="Status codes are the first structured signal a server gives about the outcome of a request. Good APIs use them consistently so clients can react correctly without guessing."
        />

        <CollapsibleSection title="What Status Codes Do" collapsible={false}>
          <Paragraph>
            Every HTTP response starts with a status code. It tells the client
            whether the request succeeded, redirected somewhere else, failed
            because of the request itself, or failed because of the server.
          </Paragraph>
          <Paragraph>
            Status codes are part of the protocol, not just documentation
            conventions. Browsers, proxies, caches, SDKs, and monitoring tools
            all use them as signals.
          </Paragraph>
          <Callout variant="tip">
            Think of the status code as the transport-level summary of the
            result. The response body can add details, but it should not
            contradict the code.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="At a Glance" collapsible={false}>
          <Paragraph>
            This chart is a useful quick reference for the most common codes and
            the families they belong to.
          </Paragraph>
          <ContentImage
            src={httpStatusCodeImage}
            alt="HTTP status code chart showing categories such as 2xx success, 3xx redirection, 4xx client error, and 5xx server error"
            caption="A compact reference for common HTTP status code families and examples."
          />
        </CollapsibleSection>

        <SectionHeader>Status Code Families</SectionHeader>

        <TopicCard
          icon="🗂️"
          title="The Five Families"
          description="The first digit is the fastest way to interpret a response: informational, success, redirection, client error, or server error."
        />

        <CollapsibleSection title="1xx to 5xx Overview" collapsible={false}>
          <CodeBlock
            language="text"
            code={`1xx Informational  Request received, processing continues
2xx Success        Request succeeded
3xx Redirection    Client should take another step
4xx Client Error   Problem with the request
5xx Server Error   Server failed to fulfill a valid request`}
          />
          <Paragraph>
            In day-to-day API work, `2xx`, `4xx`, and `5xx` matter the most.
            `1xx` and many `3xx` codes are more common in browser or network
            infrastructure scenarios than in JSON API design.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Most Important Success Codes</SectionHeader>

        <CollapsibleSection title="200, 201, and 204" collapsible={false}>
          <SubHeader>200 OK</SubHeader>
          <Paragraph>
            The request succeeded and the server is returning a normal response
            body.
          </Paragraph>

          <SubHeader>201 Created</SubHeader>
          <Paragraph>
            A new resource was created. This is a strong fit for successful
            `POST` requests that create records.
          </Paragraph>

          <SubHeader>204 No Content</SubHeader>
          <Paragraph>
            The request succeeded but there is no response body to send back.
            This often fits `DELETE` requests or updates where the client does
            not need a fresh representation.
          </Paragraph>
          <CodeBlock
            language="http"
            code={`HTTP/1.1 201 Created
Location: /users/42
Content-Type: application/json

{
  "id": 42,
  "name": "Ada Lovelace"
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Success Mistakes">
          <Paragraph>
            Returning `200 OK` for every successful action is common, but it
            throws away useful semantics.
          </Paragraph>
          <Callout variant="note">
            If a resource was created, prefer `201 Created`. If success has no
            body, `204 No Content` is often clearer than `200 OK`.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Redirect and Cache-Relevant Codes</SectionHeader>

        <CollapsibleSection title="301, 302, and 304">
          <Paragraph>
            Redirect and cache-validation codes matter most in browsers, CDNs,
            and web infrastructure.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`301 Moved Permanently  Resource has a new permanent URL
302 Found              Temporary redirect
304 Not Modified       Client can use its cached copy`}
          />
        </CollapsibleSection>

        <SectionHeader>Most Important Client Errors</SectionHeader>

        <CollapsibleSection title="400, 401, 403, 404, and 409" collapsible={false}>
          <SubHeader>400 Bad Request</SubHeader>
          <Paragraph>
            The server could not process the request because the input was
            malformed or invalid.
          </Paragraph>

          <SubHeader>401 Unauthorized</SubHeader>
          <Paragraph>
            Authentication is required or the provided credentials are invalid.
          </Paragraph>

          <SubHeader>403 Forbidden</SubHeader>
          <Paragraph>
            The client is authenticated but does not have permission for this
            action.
          </Paragraph>

          <SubHeader>404 Not Found</SubHeader>
          <Paragraph>
            The requested resource does not exist or is intentionally hidden.
          </Paragraph>

          <SubHeader>409 Conflict</SubHeader>
          <Paragraph>
            The request conflicts with current server state, such as trying to
            create a duplicate unique resource.
          </Paragraph>
          <CodeBlock
            language="json"
            code={`{
  "error": "Validation failed",
  "details": {
    "email": "Email address is required"
  }
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="422 and Other Validation Codes">
          <Paragraph>
            Some APIs use `422 Unprocessable Entity` for semantically invalid
            input instead of `400 Bad Request`. The important part is being
            consistent and documenting the choice clearly.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Server Errors</SectionHeader>

        <CollapsibleSection title="500, 502, 503, and 504" collapsible={false}>
          <Paragraph>
            `5xx` responses mean the request may be valid, but the server or one
            of its dependencies failed while handling it.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`500 Internal Server Error  Unexpected application failure
502 Bad Gateway            Upstream service returned an invalid response
503 Service Unavailable    Service is overloaded or down for maintenance
504 Gateway Timeout        Upstream dependency took too long to respond`}
          />
          <Callout variant="warning">
            Do not return `500` for client mistakes just because the server hit
            an exception path. That hides the real cause and makes debugging
            harder for clients and operators.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Designing Better API Responses</SectionHeader>

        <CollapsibleSection title="Match Code and Body" collapsible={false}>
          <Paragraph>
            A good API response uses a status code for the broad outcome and a
            response body for human-readable detail, field errors, or machine
            actionable metadata.
          </Paragraph>
          <CodeBlock
            language="http"
            code={`HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "User not found",
  "resource": "user",
  "id": 42
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Status Code Mistakes" collapsible={false}>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Returning `200 OK` for validation failures and embedding the error only in JSON.</li>
            <li>Using `401` when the real problem is authorization, which should be `403`.</li>
            <li>Returning `500` for missing resources instead of `404`.</li>
            <li>Using `404` for malformed requests that should be `400`.</li>
            <li>Creating resources with `200 OK` and no `Location` or clear representation.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="HTTP Status Code Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Success:
200 OK
201 Created
204 No Content

Client errors:
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict

Server errors:
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default HttpStatusCodes;
