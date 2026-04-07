import {
  BulletList,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { nextJsSeoMetadataLesson } from "./meta";

export function NextJsSeoMetadata() {
  return (
    <TopicLessonPage
      title={nextJsSeoMetadataLesson.title}
      summary={nextJsSeoMetadataLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsSeoMetadataLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsSeoMetadataLesson.difficulty}
      relatedTopics={[
        { label: "Rendering Model", href: "/topic/nextjs-rendering-model" },
        { label: "Pages Router Legacy Knowledge", href: "/topic/nextjs-pages-router-legacy" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="SEO and Metadata"
          description="Strong candidates can explain both technical SEO mechanics and how Next.js makes metadata composition part of route architecture instead of an afterthought."
        />

        <SectionHeader>Metadata API Basics</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Interview Guide",
  description: "Senior-level Next.js study notes",
  alternates: {
    canonical: "https://example.com/interview-guide",
  },
  openGraph: {
    title: "Next.js Interview Guide",
    description: "Senior-level Next.js study notes",
    url: "https://example.com/interview-guide",
    type: "article",
  },
};`}
        />
        <Paragraph>
          Metadata lives near the route, which is valuable because titles,
          descriptions, canonical URLs, social cards, and structured data often
          depend on the same content and routing boundaries as the page itself.
        </Paragraph>

        <SectionHeader>Dynamic Metadata And Crawlability</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.summary,
  };
}`}
        />
        <BulletList
          items={[
            "Canonical tags help prevent duplicate URL variants from competing in search indexes.",
            "`hreflang`, robots directives, structured data, and sitemap coverage often matter more in real follow-up questions than a basic title tag.",
            "Client-only rendering can still create crawlability risk when meaningful content or metadata is unavailable in server-rendered HTML.",
            "Multi-tenant apps need metadata strategies that respect tenant branding while preserving canonical and indexing discipline.",
          ]}
        />

        <SectionHeader>How To Measure It</SectionHeader>
        <BulletList
          items={[
            "Inspect rendered HTML, not just the React tree, to confirm what crawlers actually receive.",
            "Validate indexing and canonical behavior with search tooling instead of assuming route metadata is correct.",
            "Check social preview output because Open Graph and Twitter metadata affect real sharing behavior, not just abstract SEO quality.",
          ]}
        />

        <SectionHeader>Sitemap And Robots</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// app/sitemap.ts
export default async function sitemap() {
  const posts = await getPosts();

  return posts.map((post) => ({
    url: "https://example.com/blog/" + post.slug,
    lastModified: post.updatedAt,
  }));
}`}
        />
      </div>
    </TopicLessonPage>
  );
}

export default NextJsSeoMetadata;
