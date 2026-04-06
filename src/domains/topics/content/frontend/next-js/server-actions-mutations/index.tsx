import {
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="Server Actions let forms and client interactions call trusted server-side mutation logic without creating a separate public API route for every write."
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
          The main value here is architectural simplicity. The server remains
          the trusted execution environment for validation, auth checks, writes,
          and cache invalidation.
        </Paragraph>

        <SectionHeader>Optimistic UI</SectionHeader>
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
        <Paragraph>
          Optimistic UI is appropriate when success is likely and the rollback
          story is well understood. It should not hide weak validation or weak
          authorization on the server.
        </Paragraph>

        <SectionHeader>What Good Mutation Design Includes</SectionHeader>
        <BulletList
          items={[
            "Server-side validation even if the client already validated.",
            "Authorization checks based on the authenticated user, not client input.",
            "Idempotency or duplicate-submit handling when forms can be retried.",
            "Explicit cache invalidation after successful writes.",
          ]}
        />
        <Callout variant="warning">
          A Server Action is not a permission model. The server action itself
          must verify the caller can perform the write.
        </Callout>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsServerActionsMutations;
