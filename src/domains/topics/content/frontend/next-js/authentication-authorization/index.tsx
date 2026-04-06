import {
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="Interviewers expect you to separate identity from permissions, and UI gating from actual server-side enforcement."
        />

        <SectionHeader>Sessions and Cookies</SectionHeader>
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
          data. It also avoids shipping secret-bearing logic to the browser.
        </Paragraph>

        <SectionHeader>Auth vs Authorization</SectionHeader>
        <BulletList
          items={[
            "Authentication answers who the user is.",
            "Authorization answers what that user is allowed to do.",
            "Seeing an admin button in the UI is not authorization. The server must still verify the permission before serving data or mutating state.",
          ]}
        />

        <SectionHeader>Where Middleware Fits</SectionHeader>
        <BulletList
          items={[
            "Middleware is useful for broad route protection, redirects, or coarse access checks.",
            "Deeper authorization must still run in Server Components, Route Handlers, or Server Actions.",
            "Relying only on client-side route guards is not a security model.",
          ]}
        />
        <Callout variant="warning">
          In interviews, weak answers usually over-index on hiding pages in the
          client. Strong answers focus on server trust boundaries and data access
          control.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsAuthenticationAuthorization;
