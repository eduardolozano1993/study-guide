import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContentContainer, PageTitle, Paragraph } from "@/features/content";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import * as React from "react";

// Registry of all topic components
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
  const computedTitle =
    title ||
    (topicId
      ? topicId
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "Topic");

  useEffect(() => {
    document.title = `${computedTitle} | Study Guide`;
  }, [computedTitle]);

  return (
    <ContentContainer>
      <PageTitle>{computedTitle}</PageTitle>
      {description && <Paragraph>{description}</Paragraph>}
      {TopicComponent ? (
        <React.Suspense fallback={<LoadingSpinner label="Loading topic..." />}>
          <TopicComponent />
        </React.Suspense>
      ) : (
        <Paragraph>
          Topic not found. Select a topic from the menu to begin studying.
        </Paragraph>
      )}
    </ContentContainer>
  );
}

export { TopicPage as default };
