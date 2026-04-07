import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { nextJsAuthenticationAuthorizationLesson } from "./meta";

export function NextJsAuthenticationAuthorization() {
  return (
    <TopicLessonPage
      title={nextJsAuthenticationAuthorizationLesson.title}
      summary={nextJsAuthenticationAuthorizationLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsAuthenticationAuthorizationLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsAuthenticationAuthorizationLesson.difficulty}
      relatedTopics={[
        { label: "Middleware and Edge Runtime", href: "/topic/nextjs-middleware-edge-runtime" },
        { label: "Server Actions and Mutations", href: "/topic/nextjs-server-actions-mutations" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Authentication and Authorization"
          description="Interviewers expect you to separate identity from permissions, and UI gating from actual enforcement. The server remains the trust boundary even when the client helps with navigation and UX."
        />

        <SectionHeader>Read Sessions on the Server</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    redirect("/login");
  }

  const user = await getUserFromSession(session);
  return <AccountDetails user={user} />;
}`}
        />
        <Paragraph>
          Reading the session on the server keeps auth checks close to trusted
          data and avoids shipping secret-bearing logic to the browser.
        </Paragraph>

        <SectionHeader>Authentication, Authorization, and UI Gating</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "means", label: "What it means" },
            { key: "mistake", label: "Common mistake" },
          ]}
          rows={[
            {
              label: "Authentication",
              values: {
                means: "Identify who the user is, usually through a session or token-backed flow.",
                mistake: "Treating presence of a client-side user object as proof the server trusts the request.",
              },
            },
            {
              label: "Authorization",
              values: {
                means: "Decide what the authenticated user is allowed to read or mutate.",
                mistake: "Hiding admin UI and calling that access control.",
              },
            },
            {
              label: "UI gating",
              values: {
                means: "Improve UX by redirecting, hiding controls, or showing fallback states early.",
                mistake: "Confusing a smoother UI with actual enforcement.",
              },
            },
          ]}
        />

        <SectionHeader>Where Middleware Fits</SectionHeader>
        <BulletList
          items={[
            "Middleware is useful for broad redirects, coarse route protection, locale/session bootstrapping, or early request shaping.",
            "Detailed authorization still belongs in Server Components, Route Handlers, or Server Actions where the actual data access happens.",
            "Client-side guards can reduce a flash of unauthenticated UI, but they are never the real security boundary.",
          ]}
        />

        <SectionHeader>Failure Modes and Tradeoffs</SectionHeader>
        <BulletList
          items={[
            "If private UI flashes briefly before redirect, the route likely relied too much on client-side checks.",
            "If permissions are checked only in middleware, deeper data reads or mutations may still be exposed elsewhere.",
            "Cookie-backed sessions usually fit same-origin web apps well, but the exact storage choice only matters after you explain the XSS and CSRF tradeoffs clearly.",
            "Auth refresh races, stale sessions, and cross-tab logout are operational issues that separate toy auth from production auth.",
          ]}
        />
        <Callout variant="warning">
          In interviews, weak answers over-index on hiding pages in the client.
          Strong answers focus on server trust boundaries, permission checks, and
          protecting the data path itself.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What is the difference between authentication and authorization in a Next.js app?",
              "What belongs in middleware, and what still has to be checked deeper in the stack?",
              "Why is hiding an admin button not authorization?",
              "How would you prevent a flash of private UI without pretending the client is the security boundary?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsAuthenticationAuthorization;
