import {
  CodeBlock,
  CollapsibleSection,
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
          description="Senior frontend interviews care less about raw fetch syntax and more about server-state modeling, cache strategy, and how loading and failure states shape the user experience."
        />

        <SectionHeader>Client Fetching and Server State</SectionHeader>
        <Paragraph>
          Fetched data is server state, not ordinary client state. You do not
          fully own it, it can become stale, and it often needs caching,
          invalidation, retries, and background refresh.
        </Paragraph>
        <Paragraph>
          That is why mature React apps often separate server-state tooling from
          client-state tooling. `useEffect` plus `useState` stops scaling once
          caching and synchronization get real.
        </Paragraph>

        <SectionHeader>Caching, Loading States, and Optimistic Updates</SectionHeader>
        <Paragraph>
          Good cache strategy balances freshness with bandwidth and consistency
          needs. Loading, empty, error, success, and refetching states should be
          treated as first-class UI scenarios.
        </Paragraph>
        <Paragraph>
          Optimistic updates improve responsiveness by updating UI before the
          server confirms success, but they require rollback logic and careful
          failure handling.
        </Paragraph>
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
  const { data, isPending, isError } = useUser(userId);

  if (isPending) return <Spinner />;
  if (isError) return <ErrorState />;

  return <ProfileCard user={data} />;
}`}
        />

        <SectionHeader>When TanStack Query Is the Right Answer</SectionHeader>
        <Paragraph>
          TanStack Query is a strong default when an app has multiple reads and
          writes against the same resources, background refetching, optimistic
          updates, or cache invalidation concerns.
        </Paragraph>
        <CollapsibleSection title="Interview framing">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Separate server state from client UI state.</li>
            <li>Discuss loading, empty, error, success, and refetching states explicitly.</li>
            <li>Explain how invalidation follows mutations so stale views do not linger.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactDataFetching;
