import {
  CodeBlock,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
import { nextJsPagesRouterLegacyLesson } from "./meta";

export function NextJsPagesRouterLegacy() {
  return (
    <TopicLessonPage
      title={nextJsPagesRouterLegacyLesson.title}
      summary={nextJsPagesRouterLegacyLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsPagesRouterLegacyLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsPagesRouterLegacyLesson.difficulty}
      relatedTopics={[
        { label: "Rendering Model", href: "/topic/nextjs-rendering-model" },
        { label: "App Router Architecture", href: "/topic/nextjs-app-router-architecture" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Pages Router Legacy Knowledge"
          description="Many production apps still use the Pages Router. Senior candidates do not need nostalgia, but they do need enough knowledge to maintain or migrate those codebases."
        />

        <SectionHeader>Core Pages Router APIs</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { posts },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: "blocking",
  };
}`}
        />
        <CodeBlock
          language="tsx"
          code={`export async function getServerSideProps(context) {
  const session = context.req.cookies.session;
  const account = await getAccount(session);

  return {
    props: { account },
  };
}`}
        />

        <SectionHeader>How It Differs from the App Router</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "pages", label: "Pages Router" },
            { key: "app", label: "App Router" },
          ]}
          rows={[
            {
              label: "Data model",
              values: {
                pages: "Route-level data functions such as `getStaticProps` and `getServerSideProps`.",
                app: "Data fetching directly inside components with server-first rendering semantics.",
              },
            },
            {
              label: "Component model",
              values: {
                pages: "Classic React pages with client-centric composition.",
                app: "Server Components, layouts, streaming, and segment-level boundaries.",
              },
            },
            {
              label: "Routing shape",
              values: {
                pages: "`pages/` filesystem routes and API routes.",
                app: "`app/` segment-based routing with layouts and special files.",
              },
            },
          ]}
        />

        <SectionHeader>Why It Still Matters</SectionHeader>
        <BulletList
          items={[
            "Many companies are mid-migration and need engineers who can work on both models.",
            "Interviewers often ask for differences to see whether you understand the architectural shift rather than just current syntax.",
            "Knowing legacy APIs helps you reason about old ISR setups, fallback behavior, and migration tradeoffs.",
          ]}
        />
        <Paragraph>
          A strong senior answer explains the migration in terms of architecture:
          fewer route-level data functions, more server-first composition, and
          better layout and streaming primitives.
        </Paragraph>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsPagesRouterLegacy;
