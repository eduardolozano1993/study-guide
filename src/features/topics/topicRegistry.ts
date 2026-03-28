import type { ComponentType, LazyExoticComponent } from "react";
import * as React from "react";

export type TopicStatus = "ready" | "coming-soon";

export interface TopicMenuPathItem {
  id: string;
  label: string;
}

export interface TopicDefinition {
  id: string;
  title: string;
  menuLabel: string;
  path: string;
  status: TopicStatus;
  menuPath: TopicMenuPathItem[];
  loader?: LazyExoticComponent<ComponentType<object>>;
}

const topicLoaders: Record<string, LazyExoticComponent<ComponentType<object>>> = {
  // Lazy-load each study page so the landing bundle stays small and route changes only fetch what is needed.
  "html-semantics": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/core-web-fundamentals/html-semantics"
      ),
  ),
  "css-box-model": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/core-web-fundamentals/css-box-model"
      ),
  ),
  "responsive-design": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/core-web-fundamentals/responsive-design"
      ),
  ),
  accessibility: React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/core-web-fundamentals/accessibility"
      ),
  ),
};

const frontendMenuPath: TopicMenuPathItem[] = [
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "core-web-fundamentals",
    label: "Core Web Fundamentals",
  },
];

const topicDefinitions: TopicDefinition[] = [
  {
    id: "html-semantics",
    title: "HTML Semantics",
    menuLabel: "HTML semantics, forms, SEO",
    path: "/topic/html-semantics",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["html-semantics"],
  },
  {
    id: "css-box-model",
    title: "CSS Box Model",
    menuLabel: "CSS box model, Flexbox, Grid",
    path: "/topic/css-box-model",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["css-box-model"],
  },
  {
    id: "responsive-design",
    title: "Responsive Design",
    menuLabel: "Responsive design",
    path: "/topic/responsive-design",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["responsive-design"],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    menuLabel: "Accessibility (a11y)",
    path: "/topic/accessibility",
    status: "ready",
    menuPath: frontendMenuPath,
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
