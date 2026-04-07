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
import { reactDataFetchingLesson } from "./meta";

export function ReactDataFetching() {
  return (
    <TopicLessonPage
      title={reactDataFetchingLesson.title}
      summary={reactDataFetchingLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactDataFetchingLesson.estimatedReadingTimeMinutes}
      difficulty={reactDataFetchingLesson.difficulty}
      relatedTopics={[
        { label: "Effects and Side Effects", href: "/topic/react-effects-and-side-effects" },
        { label: "Server Rendering", href: "/topic/react-server-rendering" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="D"
          title="Data Fetching"
          description="Senior frontend interviews care less about raw fetch syntax and more about server-state modeling, loading UX, mutation boundaries, stale-data risks, and where fetching should live in the architecture."
        />

        <SectionHeader>Server State Is Not Just More Component State</SectionHeader>
        <Paragraph>
          Fetched data is server state. You do not fully own it, it can become
          stale, and reads and writes need caching, invalidation, retries,
          background refresh, and sometimes optimistic updates.
        </Paragraph>
        <Paragraph>
          That is why `useEffect` plus `useState` stops scaling once multiple
          components depend on the same resource or mutations must keep views in
          sync.
        </Paragraph>

        <SectionHeader>Choose the Right Fetching Boundary</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "best", label: "Best fit" },
            { key: "tradeoff", label: "Main tradeoff" },
          ]}
          rows={[
            {
              label: "Server rendering or framework loader",
              values: {
                best: "Route-level data needed for first paint, SEO, auth-aware content, or shared shells.",
                tradeoff: "You must reason about caching, hydration, and server-client boundaries.",
              },
            },
            {
              label: "Query library in the client",
              values: {
                best: "Interactive server state with refetching, cache invalidation, optimistic updates, and background sync.",
                tradeoff: "Adds another layer to learn, but it pays off once data flows get real.",
              },
            },
            {
              label: "Plain effect-driven fetch",
              values: {
                best: "Small isolated widgets with simple lifetime and no shared cache requirements.",
                tradeoff: "Manual race handling, cache coordination, and repeated boilerplate arrive quickly.",
              },
            },
          ]}
        />

        <SectionHeader>Loading, Mutation, and Failure Design</SectionHeader>
        <Paragraph>
          Strong answers name the full UI state machine: pending, empty, error,
          success, refetching, optimistic pending, rollback, and offline or
          partial failure when relevant.
        </Paragraph>
        <CollapsibleSection title="Query-based read flow" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.getUser(userId),
    staleTime: 60_000,
  });
}

function UserProfile({ userId }: { userId: string }) {
  const { data, isPending, isError, isFetching } = useUser(userId);

  if (isPending) return <Spinner />;
  if (isError) return <ErrorState />;

  return <ProfileCard user={data} showRefreshingState={isFetching} />;
}`}
          />
        </CollapsibleSection>
        <BulletList
          items={[
            "Optimistic updates only sound senior if you also explain rollback, deduplication, and what happens when the server rejects the write.",
            "A mutation should know what cache entries or route data become stale after success.",
            "If filters or route params change quickly, request cancellation or ownership checks prevent out-of-order results from flashing the wrong UI.",
          ]}
        />
        <Callout variant="warning">
          A weak answer says `fetch in useEffect`. A stronger answer says where
          the data belongs, how freshness is controlled, and how writes keep the
          UI coherent.
        </Callout>

        <SectionHeader>Debugging Stale and Duplicate Data</SectionHeader>
        <BulletList
          items={[
            "When the UI looks stale, check cache keys and invalidation before blaming React rendering.",
            "When duplicate requests appear, inspect component remounts, unstable query keys, and Strict Mode development behavior.",
            "When the wrong data flashes briefly, suspect async race conditions or competing sources of truth between URL, cache, and component state.",
            "Measure whether the bottleneck is network latency, server latency, serialization cost, or client rendering after the data arrives.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why is fetched data different from ordinary client state?",
              "When is a query library the right answer, and when is it unnecessary?",
              "How do you design optimistic UI without hiding consistency problems?",
              "What causes stale data to persist after a mutation, and how would you diagnose it?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactDataFetching;
