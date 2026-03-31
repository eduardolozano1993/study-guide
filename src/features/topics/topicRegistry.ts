import type { ComponentType, LazyExoticComponent } from "react";
import * as React from "react";

export type TopicStatus = "draft" | "ready" | "coming-soon" | "archived";

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

const topicLoaders: Record<
  string,
  LazyExoticComponent<ComponentType<object>>
> = {
  // Lazy-load each study page so the landing bundle stays small and route changes only fetch what is needed.
  "html-semantics": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/core-web-fundamentals/html-semantics"),
  ),
  dns: React.lazy(() => import("@/domains/topics/content/network/DNS")),
  "http-1-2-3": React.lazy(
    () => import("@/domains/topics/content/network/HTTP-1-2-3"),
  ),
  tls: React.lazy(() => import("@/domains/topics/content/network/TLS")),
  "http-status-codes": React.lazy(
    () => import("@/domains/topics/content/api/http-status-codes"),
  ),
  rest: React.lazy(() => import("@/domains/topics/content/api/rest")),
  grpc: React.lazy(() => import("@/domains/topics/content/api/grcp")),
  "graph-ql": React.lazy(() => import("@/domains/topics/content/api/graph-ql")),
  "rest-graph-grcp": React.lazy(
    () => import("@/domains/topics/content/api/rest-graph-grcp"),
  ),
  "load-balancer": React.lazy(
    () => import("@/domains/topics/content/architecture/load-balancer"),
  ),
  "horizontal-vertical-scaling": React.lazy(
    () =>
      import(
        "@/domains/topics/content/architecture/horizontal-vertical-scaling"
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

const networkMenuPath: TopicMenuPathItem[] = [
  {
    id: "network",
    label: "Network",
  },
];

const apiMenuPath: TopicMenuPathItem[] = [
  {
    id: "api",
    label: "API",
  },
];

const architectureMenuPath: TopicMenuPathItem[] = [
  {
    id: "architecture",
    label: "Architecture",
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
    status: "coming-soon",
    menuPath: frontendMenuPath,
  },
  {
    id: "responsive-design",
    title: "Responsive Design",
    menuLabel: "Responsive design",
    path: "/topic/responsive-design",
    status: "coming-soon",
    menuPath: frontendMenuPath,
  },
  {
    id: "accessibility",
    title: "Accessibility",
    menuLabel: "Accessibility (a11y)",
    path: "/topic/accessibility",
    status: "coming-soon",
    menuPath: frontendMenuPath,
  },
  {
    id: "dns",
    title: "DNS",
    menuLabel: "DNS",
    path: "/topic/dns",
    status: "ready",
    menuPath: networkMenuPath,
    loader: topicLoaders.dns,
  },
  {
    id: "http-1-2-3",
    title: "HTTP/1.1, HTTP/2, HTTP/3",
    menuLabel: "HTTP/1.1, 2, and 3",
    path: "/topic/http-1-2-3",
    status: "ready",
    menuPath: networkMenuPath,
    loader: topicLoaders["http-1-2-3"],
  },
  {
    id: "tls",
    title: "TLS",
    menuLabel: "TLS",
    path: "/topic/tls",
    status: "ready",
    menuPath: networkMenuPath,
    loader: topicLoaders.tls,
  },
  {
    id: "http-status-codes",
    title: "HTTP Status Codes",
    menuLabel: "HTTP status codes",
    path: "/topic/http-status-codes",
    status: "ready",
    menuPath: apiMenuPath,
    loader: topicLoaders["http-status-codes"],
  },
  {
    id: "rest",
    title: "REST",
    menuLabel: "REST",
    path: "/topic/rest",
    status: "ready",
    menuPath: apiMenuPath,
    loader: topicLoaders.rest,
  },
  {
    id: "grpc",
    title: "gRPC",
    menuLabel: "gRPC",
    path: "/topic/grpc",
    status: "ready",
    menuPath: apiMenuPath,
    loader: topicLoaders.grpc,
  },
  {
    id: "graph-ql",
    title: "GraphQL",
    menuLabel: "GraphQL",
    path: "/topic/graph-ql",
    status: "ready",
    menuPath: apiMenuPath,
    loader: topicLoaders["graph-ql"],
  },
  {
    id: "rest-graph-grcp",
    title: "REST vs GraphQL vs gRPC",
    menuLabel: "REST vs GraphQL vs gRPC",
    path: "/topic/rest-graph-grcp",
    status: "ready",
    menuPath: apiMenuPath,
    loader: topicLoaders["rest-graph-grcp"],
  },
  {
    id: "load-balancer",
    title: "Load Balancer",
    menuLabel: "Load balancer",
    path: "/topic/load-balancer",
    status: "ready",
    menuPath: architectureMenuPath,
    loader: topicLoaders["load-balancer"],
  },
  {
    id: "horizontal-vertical-scaling",
    title: "Horizontal vs Vertical Scaling",
    menuLabel: "Horizontal vs vertical scaling",
    path: "/topic/horizontal-vertical-scaling",
    status: "ready",
    menuPath: architectureMenuPath,
    loader: topicLoaders["horizontal-vertical-scaling"],
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
