import { useParams } from "react-router-dom";
import { ContentContainer, PageTitle, Paragraph } from "@/features/content";
import * as React from "react";

// Registry of all topic components
const topicComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<object>>
> = {
  // Frontend → Core Web Fundamentals
  "html-semantics": React.lazy(
    () => import("@/pages/frontend/core-web-fundamentals/HtmlSemantics"),
  ),
  // "css-box-model": React.lazy(() => import("@/pages/frontend/core-web-fundamentals/CssBoxModel")),
  // "responsive-design": React.lazy(() => import("@/pages/frontend/core-web-fundamentals/ResponsiveDesign")),
  // "accessibility": React.lazy(() => import("@/pages/frontend/core-web-fundamentals/Accessibility")),
  // // Frontend → JavaScript
  // "closures-scope": React.lazy(() => import("@/pages/frontend/javascript/ClosuresScope")),
  // "prototypes-inheritance": React.lazy(() => import("@/pages/frontend/javascript/PrototypesInheritance")),
  // "this-bind-call-apply": React.lazy(() => import("@/pages/frontend/javascript/ThisBindCallApply")),
  // "async-js": React.lazy(() => import("@/pages/frontend/javascript/AsyncJs")),
  // "event-loop": React.lazy(() => import("@/pages/frontend/javascript/EventLoop")),
  // "es6-plus": React.lazy(() => import("@/pages/frontend/javascript/Es6Plus")),
  // // Frontend → Browser & Rendering
  // "critical-rendering-path": React.lazy(() => import("@/pages/frontend/browser-rendering/CriticalRenderingPath")),
  // "dom-virtual-dom": React.lazy(() => import("@/pages/frontend/browser-rendering/DomVirtualDom")),
  // "reflow-repaint": React.lazy(() => import("@/pages/frontend/browser-rendering/ReflowRepaint")),
  // "web-apis": React.lazy(() => import("@/pages/frontend/browser-rendering/WebApis")),
  // // Frontend → Angular
  // "angular-change-detection": React.lazy(() => import("@/pages/frontend/angular/AngularChangeDetection")),
  // "rxjs-observables": React.lazy(() => import("@/pages/frontend/angular/RxjsObservables")),
  // "angular-forms": React.lazy(() => import("@/pages/frontend/angular/AngularForms")),
  // "http-interceptors": React.lazy(() => import("@/pages/frontend/angular/HttpInterceptors")),
  // "angular-performance": React.lazy(() => import("@/pages/frontend/angular/AngularPerformance")),
  // // Frontend → React
  // "react-component-architecture": React.lazy(() => import("@/pages/frontend/react/ReactComponentArchitecture")),
  // "react-hooks": React.lazy(() => import("@/pages/frontend/react/ReactHooks")),
  // "react-state-management": React.lazy(() => import("@/pages/frontend/react/ReactStateManagement")),
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

  return (
    <ContentContainer>
      <PageTitle>{computedTitle}</PageTitle>
      {description && <Paragraph>{description}</Paragraph>}
      {TopicComponent ? (
        <React.Suspense fallback={<div className="p-4">Loading...</div>}>
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
