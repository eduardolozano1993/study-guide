import {
  BulletList,
  CodeBlock,
  ComparisonTable,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
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
          description="Many production apps still use the Pages Router. Senior candidates do not need nostalgia, but they do need enough knowledge to maintain, compare, and migrate those codebases credibly."
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
        <BulletList
          items={[
            "`getStaticProps` handled build-time generation plus ISR revalidation for cacheable routes.",
            "`getStaticPaths` defined which dynamic routes were known at build time and how fallback behavior should work.",
            "`getServerSideProps` handled request-time rendering for personalized or rapidly changing pages.",
          ]}
        />

        <SectionHeader>How It Differs From The App Router</SectionHeader>
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
                app: "Server-first composition with data fetching directly in components and layouts.",
              },
            },
            {
              label: "Layout model",
              values: {
                pages: "More manual layout composition and duplication risk.",
                app: "Nested layouts, streaming, and segment boundaries are first-class.",
              },
            },
            {
              label: "Migration trap",
              values: {
                pages: "Client-centric habits often survive too long.",
                app: "Teams may expect migration to be mechanical when it is actually architectural.",
              },
            },
          ]}
        />

        <SectionHeader>Why It Still Matters</SectionHeader>
        <BulletList
          items={[
            "Many companies are mid-migration and need engineers who can reason about both models.",
            "Interviewers often ask for differences to see whether you understand the architectural shift, not just current syntax.",
            "Legacy data waterfalls, duplicated layouts, and misunderstood ISR fallback behavior are common maintenance topics.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default NextJsPagesRouterLegacy;
