import { useEffect } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { ContentContainer, PageTitle, Paragraph } from "@/features/content";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";

const topicComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<object>>
> = {
  "html-semantics": React.lazy(
    () => import("@/pages/frontend/core-web-fundamentals/HtmlSemantics"),
  ),
};

interface TopicPageProps {
  title?: string;
  description?: string;
}

export function TopicPage({ title, description }: TopicPageProps) {
  const { topicId } = useParams<{ topicId: string }>();
  const TopicComponent = topicId ? topicComponents[topicId] : null;
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const [statusMessage, setStatusMessage] = React.useState("");
  const computedTitle =
    title ||
    (topicId
      ? topicId
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Topic");

  useEffect(() => {
    document.title = `${computedTitle} | Study Guide`;
  }, [computedTitle]);

  useEffect(() => {
    headingRef.current?.focus();
    setStatusMessage(
      TopicComponent
        ? `Loaded topic: ${computedTitle}`
        : `Topic not found: ${computedTitle}`,
    );
  }, [TopicComponent, computedTitle]);

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
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
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
