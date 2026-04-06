import {
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
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
          description="Strong candidates can explain both technical SEO mechanics and how Next.js makes metadata composition part of the route architecture."
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
          descriptions, canonical URLs, and social cards often depend on the
          same route structure and content boundaries as the page itself.
        </Paragraph>

        <SectionHeader>Dynamic Metadata</SectionHeader>
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

        <SectionHeader>What a Senior Answer Should Cover</SectionHeader>
        <BulletList
          items={[
            "Canonical tags prevent duplicate URL variants from competing in search indexes.",
            "Open Graph and Twitter card metadata shape link previews rather than search ranking directly.",
            "Sitemaps help discovery for large or frequently updated sites.",
            "Server-rendered or statically generated content is generally easier for crawlers than content hidden behind client-only rendering.",
          ]}
        />

        <SectionHeader>Sitemap and Robots</SectionHeader>
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
