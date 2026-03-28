import type { ComponentType, LazyExoticComponent } from "react";
import * as React from "react";

export type TopicStatus = "ready" | "coming-soon";

export interface TopicDefinition {
  id: string;
  title: string;
  path: string;
  status: TopicStatus;
  loader?: LazyExoticComponent<ComponentType<object>>;
}

const topicLoaders: Record<string, LazyExoticComponent<ComponentType<object>>> = {
  // Lazy-load each study page so the landing bundle stays small and route changes only fetch what is needed.
  "html-semantics": React.lazy(
    () => import("@/pages/frontend/core-web-fundamentals/HtmlSemantics"),
  ),
  "css-box-model": React.lazy(
    () => import("@/pages/frontend/core-web-fundamentals/CssBoxModel"),
  ),
  "responsive-design": React.lazy(
    () => import("@/pages/frontend/core-web-fundamentals/ResponsiveDesign"),
  ),
  accessibility: React.lazy(
    () => import("@/pages/frontend/core-web-fundamentals/Accessibility"),
  ),
};

const topicDefinitions: TopicDefinition[] = [
  {
    id: "html-semantics",
    title: "HTML Semantics",
    path: "/topic/html-semantics",
    status: "ready",
    loader: topicLoaders["html-semantics"],
  },
  {
    id: "css-box-model",
    title: "CSS Box Model",
    path: "/topic/css-box-model",
    status: "ready",
    loader: topicLoaders["css-box-model"],
  },
  {
    id: "responsive-design",
    title: "Responsive Design",
    path: "/topic/responsive-design",
    status: "ready",
    loader: topicLoaders["responsive-design"],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    path: "/topic/accessibility",
    status: "ready",
    loader: topicLoaders["accessibility"],
  },
];

// Route lookups happen often, so keep an O(1) index instead of scanning the array for every navigation.
const topicById = new Map(topicDefinitions.map((topic) => [topic.id, topic]));

export function getTopicById(topicId: string | undefined) {
  return topicId ? topicById.get(topicId) : undefined;
}

export function getTopicTitle(topicId: string | undefined) {
  return getTopicById(topicId)?.title;
}

export const TOPIC_DEFINITIONS = topicDefinitions;
