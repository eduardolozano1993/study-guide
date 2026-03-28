import { useEffect } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { ContentContainer, PageTitle, Paragraph } from "@/features/content";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { getTopicById } from "@/features/topics/topicRegistry";

interface TopicPageProps {
  title?: string;
  description?: string;
}

export function TopicPage({ title, description }: TopicPageProps) {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = getTopicById(topicId);
  const TopicComponent = topic?.loader ?? null;
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const computedTitle = title || topic?.title || "Topic";
  const supportingCopy =
    description ||
    (topic?.status === "coming-soon" ? "This topic is coming soon." : "");
  const statusMessage = TopicComponent
    ? `Loaded topic: ${computedTitle}`
    : `Topic not found: ${computedTitle}`;

  useEffect(() => {
    document.title = `${computedTitle} | Study Guide`;
  }, [computedTitle]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [computedTitle]);

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
            {supportingCopy && (
              <Paragraph className="mt-4 max-w-3xl">
                {supportingCopy}
              </Paragraph>
            )}
          </header>
          <div
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {statusMessage}
          </div>
          {TopicComponent ? (
            <React.Suspense
              fallback={<LoadingSpinner label="Loading topic..." />}
            >
              <TopicComponent />
            </React.Suspense>
          ) : (
            <Paragraph>
              Topic not found. Select a topic from the menu to begin studying.
            </Paragraph>
          )}
        </section>
      </div>
    </ContentContainer>
  );
}

export { TopicPage as default };
