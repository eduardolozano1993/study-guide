import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { BulletList } from "@/features/content";
import { nextJsDataFetchingLesson } from "./meta";

export function NextJsDataFetching() {
  return (
    <TopicLessonPage
      title={nextJsDataFetchingLesson.title}
      summary={nextJsDataFetchingLesson.summary}
      eyebrow="Frontend / Next.js"
      estimatedReadingTimeMinutes={nextJsDataFetchingLesson.estimatedReadingTimeMinutes}
      difficulty={nextJsDataFetchingLesson.difficulty}
      relatedTopics={[
        { label: "Caching and Revalidation", href: "/topic/nextjs-caching-and-revalidation" },
        { label: "Server vs Client Components", href: "/topic/nextjs-server-vs-client-components" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="N"
          title="Data Fetching"
          description="Senior candidates should be able to explain not just how to fetch data, but where to fetch it, how to avoid waterfalls, and how fetching choices affect rendering and caching."
        />

        <SectionHeader>Fetch on the Server by Default</SectionHeader>
        <Paragraph>
          In the App Router, the default happy path is fetching in Server
          Components. That keeps secrets on the server, reduces client bundle
          size, and allows data to participate in Next.js rendering and caching
          semantics.
        </Paragraph>
        <CodeBlock
          language="tsx"
          code={`export default async function OrdersPage() {
  const orders = await fetch("https://api.example.com/orders", {
    cache: "no-store",
  }).then((response) => response.json());

  return <OrdersTable orders={orders} />;
}`}
        />

        <SectionHeader>Use Client Fetching for Browser-Driven State</SectionHeader>
        <Paragraph>
          Client-side fetching is still appropriate when data depends on browser
          events, live polling, local filters, or post-hydration interactions
          that do not belong in the initial server render.
        </Paragraph>
        <BulletList
          items={[
            "Autocomplete suggestions while the user types.",
            "Real-time dashboards using sockets or polling.",
            "Data tied to viewport events, drag state, or browser-only APIs.",
          ]}
        />

        <SectionHeader>Parallel vs Sequential Fetching</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`// Slower: sequential waterfall
const user = await getUser();
const invoices = await getInvoices(user.id);

// Better: kick off work together when possible
const userPromise = getUser();
const statsPromise = getDashboardStats();

const [user, stats] = await Promise.all([userPromise, statsPromise]);`}
        />
        <Paragraph>
          Waterfalls happen when one fetch unnecessarily waits for another.
          Sometimes dependency is real, but often the first fetch is only being
          awaited too early.
        </Paragraph>

        <SectionHeader>Streaming Slow Subtrees</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div>
      <SummaryCards />
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}

async function RecentActivity() {
  const activity = await getRecentActivity();
  return <ActivityList items={activity} />;
}`}
        />
        <Paragraph>
          Streaming improves perceived performance by allowing fast parts of the
          page to render without waiting for every slow dependency to finish.
        </Paragraph>
        <Callout variant="tip">
          If one slow query blocks the entire route, you probably need better
          component boundaries or a `Suspense` strategy.
        </Callout>

        <CollapsibleSection title="Interview pitfalls to avoid">
          <BulletList
            items={[
              "Assuming all data fetching should move to the client because React can fetch there.",
              "Using sequential awaits by default without checking dependency ordering.",
              "Ignoring how fetching location changes caching, auth, and bundle size.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default NextJsDataFetching;
