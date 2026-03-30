import { useEffect } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { ContentContainer, PageTitle, Paragraph } from "@/features/content";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { getTopicById } from "@/features/topics/topicRegistry";
import { TopicStatusPage } from "./TopicStatusPage";

interface TopicPageProps {
  title?: string;
  description?: string;
}

export function TopicRoutePage({ title, description }: TopicPageProps) {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = getTopicById(topicId);
  const TopicComponent = topic?.loader ?? null;
  const computedTitle = title || topic?.title || "Topic not found";
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // Sync the tab title with the active lesson so browser history stays self-describing.
    document.title = `${computedTitle} | Study Guide`;
  }, [computedTitle]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [computedTitle]);

  if (!topic) {
    return (
      <TopicStatusPage
        title={computedTitle}
        kind="not-found"
        description={description}
      />
    );
  }

  if (topic.status !== "ready" || !TopicComponent) {
    return (
      <TopicStatusPage
        title={computedTitle}
        kind={topic.status}
        description={description}
      />
    );
  }

  return (
    <ContentContainer>
      <div className="grid gap-10 xl:grid-cols-[minmax(0,72rem)]">
        <section className="min-w-0">
          <header className="mb-10 border-b border-border/70 pb-8">
            <PageTitle
              ref={headingRef}
              tabIndex={-1}
              className="focus:outline-none"
            >
              {computedTitle}
            </PageTitle>
            {description && (
              <Paragraph className="mt-4 max-w-3xl">{description}</Paragraph>
            )}
          </header>
          <React.Suspense
            fallback={<LoadingSpinner label="Loading topic..." />}
          >
            <TopicComponent />
          </React.Suspense>
        </section>
      </div>
    </ContentContainer>
  );
}

export { TopicRoutePage as default };
