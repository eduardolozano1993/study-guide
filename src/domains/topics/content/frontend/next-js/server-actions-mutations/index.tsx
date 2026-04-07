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
import { nextJsServerActionsMutationsLesson } from "./meta";

export function NextJsServerActionsMutations() {
  return (
    <TopicLessonPage
      title={nextJsServerActionsMutationsLesson.title}
      summary={nextJsServerActionsMutationsLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsServerActionsMutationsLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsServerActionsMutationsLesson.difficulty}
      relatedTopics={[
        { label: "Caching and Revalidation", href: "/topic/nextjs-caching-and-revalidation" },
        { label: "Authentication and Authorization", href: "/topic/nextjs-authentication-authorization" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Server Actions and Mutations"
          description="Server Actions let forms and client interactions call trusted mutation logic on the server, but senior answers also cover validation, authorization, idempotency, invalidation, and rollback when writes fail."
        />

        <SectionHeader>Basic Mutation Flow</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// app/projects/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    throw new Error("Project name is required");
  }

  await db.project.create({ data: { name } });
  revalidatePath("/projects");
}

// app/projects/page.tsx
import { createProject } from "./actions";

export default function ProjectsPage() {
  return (
    <form action={createProject}>
      <input name="name" />
      <button type="submit">Create</button>
    </form>
  );
}`}
        />
        <Paragraph>
          The architectural value is that the trusted environment stays on the
          server for validation, auth checks, writes, and cache invalidation.
        </Paragraph>

        <SectionHeader>Designing Safe Mutation Flows</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "why", label: "Why it matters" },
            { key: "risk", label: "What breaks without it" },
          ]}
          rows={[
            {
              label: "Server-side validation",
              values: {
                why: "Client validation improves UX, but the server decides what is allowed.",
                risk: "Malformed or malicious input reaches storage or downstream services.",
              },
            },
            {
              label: "Authorization",
              values: {
                why: "The action itself must verify the caller can perform the write.",
                risk: "Hidden buttons and client checks create false confidence.",
              },
            },
            {
              label: "Idempotency or duplicate-submit handling",
              values: {
                why: "Users retry, networks wobble, and forms can be submitted twice.",
                risk: "Duplicate orders, repeated comments, or inconsistent mutations appear in production.",
              },
            },
            {
              label: "Cache invalidation",
              values: {
                why: "Reads must observe the successful write.",
                risk: "The database is correct but the user still sees stale UI.",
              },
            },
          ]}
        />

        <SectionHeader>Optimistic UI and Rollback Thinking</SectionHeader>
        <Paragraph>
          Optimistic UI improves responsiveness when success is likely and the
          rollback story is explicit. It should not be used to hide weak server
          validation or uncertain mutation semantics.
        </Paragraph>
        <CollapsibleSection title="Optimistic list update" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`"use client";

import { useOptimistic } from "react";

export function CommentList({ comments }: { comments: string[] }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment: string) => [...state, newComment],
  );

  return (
    <ul>
      {optimisticComments.map((comment) => (
        <li key={comment}>{comment}</li>
      ))}
    </ul>
  );
}`}
          />
        </CollapsibleSection>
        <BulletList
          items={[
            "If the write can fail for business reasons, explain how you undo the optimistic UI and preserve user intent.",
            "Non-idempotent mutations need more care than toggles or append-only comments because retries can create incidents.",
            "Server Actions are great when the caller is your own app UI, but route handlers may still be better for public APIs or third-party clients.",
          ]}
        />
        <Callout variant="warning">
          A Server Action is not a permission model. The action itself must
          verify identity and authorization before mutating anything.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When are Server Actions a better fit than building a separate route handler?",
              "How do you prevent duplicate writes when a form is retried?",
              "What needs to happen after a successful mutation so the user sees fresh data?",
              "When is optimistic UI worth the complexity, and when is it dangerous?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsServerActionsMutations;
