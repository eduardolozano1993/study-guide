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
      import("@/domains/topics/content/frontend/fundamentals/html-semantics"),
  ),
  accessibility: React.lazy(
    () => import("@/domains/topics/content/frontend/fundamentals/accessibility"),
  ),
  "css-box-model": React.lazy(
    () => import("@/domains/topics/content/frontend/fundamentals/css-box-model"),
  ),
  "css-layout": React.lazy(
    () => import("@/domains/topics/content/frontend/fundamentals/css-layout"),
  ),
  "responsive-design": React.lazy(
    () => import("@/domains/topics/content/frontend/fundamentals/responsive-design"),
  ),
  "dom-events": React.lazy(
    () => import("@/domains/topics/content/frontend/fundamentals/dom-events"),
  ),
  "browser-rendering": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/fundamentals/browser-rendering"),
  ),
  "network-browser-apis": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/fundamentals/network-browser-apis"
      ),
  ),
  "performance-fundamentals": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/fundamentals/performance-fundamentals"
      ),
  ),
  "frontend-security": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/fundamentals/frontend-security"),
  ),
  "primitive-vs-reference-types": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/java-script/primitive-vs-reference-types"
      ),
  ),
  closures: React.lazy(
    () => import("@/domains/topics/content/frontend/java-script/closures"),
  ),
  "objects-destructuring-spread-rest": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/java-script/objects-destructuring-spread-rest"
      ),
  ),
  "promises-async-await": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/java-script/promises-async-await"),
  ),
  "error-handling-javascript": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/java-script/error-handling-javascript"
      ),
  ),
  "dom-manipulation-basics": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/java-script/dom-manipulation-basics"
      ),
  ),
  "esm-vs-commonjs": React.lazy(
    () => import("@/domains/topics/content/frontend/java-script/esm-vs-commonjs"),
  ),
  immutability: React.lazy(
    () => import("@/domains/topics/content/frontend/java-script/immutability"),
  ),
  "typescript-type-system-fundamentals": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/type-system-fundamentals"
      ),
  ),
  "typescript-type-narrowing": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/type-script/type-narrowing"),
  ),
  "typescript-interfaces-vs-types": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/interfaces-vs-types"
      ),
  ),
  "typescript-generics": React.lazy(
    () => import("@/domains/topics/content/frontend/type-script/generics"),
  ),
  "typescript-utility-types": React.lazy(
    () => import("@/domains/topics/content/frontend/type-script/utility-types"),
  ),
  "typescript-advanced-types": React.lazy(
    () => import("@/domains/topics/content/frontend/type-script/advanced-types"),
  ),
  "typescript-functions": React.lazy(
    () => import("@/domains/topics/content/frontend/type-script/functions"),
  ),
  "typescript-classes-and-oop": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/type-script/classes-and-oop"),
  ),
  "typescript-modules-and-namespaces": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/modules-and-namespaces"
      ),
  ),
  "typescript-type-assertions": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/type-script/type-assertions"),
  ),
  "typescript-async-typing": React.lazy(
    () => import("@/domains/topics/content/frontend/type-script/async-typing"),
  ),
  "typescript-strict-mode-and-tsconfig": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/strict-mode-and-tsconfig"
      ),
  ),
  "typescript-structural-typing": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/type-script/structural-typing"),
  ),
  "typescript-immutability-and-readonly": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/immutability-and-readonly"
      ),
  ),
  "typescript-runtime-vs-compile-time": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/runtime-vs-compile-time"
      ),
  ),
  "typescript-api-type-design": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/type-script/api-type-design"),
  ),
  "typescript-working-with-external-libraries": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/working-with-external-libraries"
      ),
  ),
  "typescript-type-safe-patterns-in-real-code": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/type-safe-patterns-in-real-code"
      ),
  ),
  "typescript-performance-and-maintainability": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/performance-and-maintainability"
      ),
  ),
  "typescript-senior-level-judgment": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/type-script/senior-level-judgment"
      ),
  ),
  "angular-architecture": React.lazy(
    () => import("@/domains/topics/content/frontend/angular/angular-architecture"),
  ),
  "angular-components-templates-data-binding": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/angular/angular-components-templates-data-binding"
      ),
  ),
  "angular-directives": React.lazy(
    () => import("@/domains/topics/content/frontend/angular/angular-directives"),
  ),
  "angular-inputs-outputs-component-communication": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/angular/angular-inputs-outputs-component-communication"
      ),
  ),
  "angular-lifecycle-hooks": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/angular/angular-lifecycle-hooks"),
  ),
  "angular-dependency-injection": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/angular/angular-dependency-injection"
      ),
  ),
  "angular-services": React.lazy(
    () => import("@/domains/topics/content/frontend/angular/angular-services"),
  ),
  "angular-rxjs-basics": React.lazy(
    () => import("@/domains/topics/content/frontend/angular/angular-rxjs-basics"),
  ),
  "angular-http-client": React.lazy(
    () => import("@/domains/topics/content/frontend/angular/angular-http-client"),
  ),
  "angular-routing": React.lazy(
    () => import("@/domains/topics/content/frontend/angular/angular-routing"),
  ),
  "angular-reactive-forms-validation": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/angular/angular-reactive-forms-validation"
      ),
  ),
  "angular-change-detection": React.lazy(
    () =>
      import("@/domains/topics/content/frontend/angular/angular-change-detection"),
  ),
  "angular-interceptors": React.lazy(
    () => import("@/domains/topics/content/frontend/angular/angular-interceptors"),
  ),
  "angular-signals-standalone-components": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/angular/angular-signals-standalone-components"
      ),
  ),
  "react-fundamentals": React.lazy(
    () => import("@/domains/topics/content/frontend/react/fundamentals"),
  ),
  "react-hooks-in-depth": React.lazy(
    () => import("@/domains/topics/content/frontend/react/hooks-in-depth"),
  ),
  "react-rendering-behavior": React.lazy(
    () => import("@/domains/topics/content/frontend/react/rendering-behavior"),
  ),
  "react-state-management": React.lazy(
    () => import("@/domains/topics/content/frontend/react/state-management"),
  ),
  "react-component-design": React.lazy(
    () => import("@/domains/topics/content/frontend/react/component-design"),
  ),
  "react-performance": React.lazy(
    () => import("@/domains/topics/content/frontend/react/performance"),
  ),
  "react-effects-and-side-effects": React.lazy(
    () => import("@/domains/topics/content/frontend/react/effects-and-side-effects"),
  ),
  "react-forms": React.lazy(
    () => import("@/domains/topics/content/frontend/react/forms"),
  ),
  "react-data-fetching": React.lazy(
    () => import("@/domains/topics/content/frontend/react/data-fetching"),
  ),
  "react-routing": React.lazy(
    () => import("@/domains/topics/content/frontend/react/routing"),
  ),
  "react-server-rendering": React.lazy(
    () => import("@/domains/topics/content/frontend/react/server-rendering"),
  ),
  "react-architecture": React.lazy(
    () => import("@/domains/topics/content/frontend/react/architecture"),
  ),
  "react-error-handling": React.lazy(
    () => import("@/domains/topics/content/frontend/react/error-handling"),
  ),
  "nextjs-rendering-model": React.lazy(
    () => import("@/domains/topics/content/frontend/next-js/rendering-model"),
  ),
  "nextjs-app-router-architecture": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/next-js/app-router-architecture"
      ),
  ),
  "nextjs-server-vs-client-components": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/next-js/server-vs-client-components"
      ),
  ),
  "nextjs-data-fetching": React.lazy(
    () => import("@/domains/topics/content/frontend/next-js/data-fetching"),
  ),
  "nextjs-caching-and-revalidation": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/next-js/caching-and-revalidation"
      ),
  ),
  "nextjs-server-actions-mutations": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/next-js/server-actions-mutations"
      ),
  ),
  "nextjs-routing": React.lazy(
    () => import("@/domains/topics/content/frontend/next-js/routing"),
  ),
  "nextjs-api-route-handlers": React.lazy(
    () => import("@/domains/topics/content/frontend/next-js/api-route-handlers"),
  ),
  "nextjs-middleware-edge-runtime": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/next-js/middleware-edge-runtime"
      ),
  ),
  "nextjs-performance": React.lazy(
    () => import("@/domains/topics/content/frontend/next-js/performance"),
  ),
  "nextjs-seo-metadata": React.lazy(
    () => import("@/domains/topics/content/frontend/next-js/seo-metadata"),
  ),
  "nextjs-authentication-authorization": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/next-js/authentication-authorization"
      ),
  ),
  "nextjs-error-handling-observability": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/next-js/error-handling-observability"
      ),
  ),
  "nextjs-deployment-runtime-tradeoffs": React.lazy(
    () =>
      import(
        "@/domains/topics/content/frontend/next-js/deployment-runtime-tradeoffs"
      ),
  ),
  "nextjs-pages-router-legacy": React.lazy(
    () => import("@/domains/topics/content/frontend/next-js/pages-router-legacy"),
  ),
  dns: React.lazy(() => import("@/domains/topics/content/network/dns")),
  "http-1-2-3": React.lazy(
    () => import("@/domains/topics/content/network/http-1-2-3"),
  ),
  tls: React.lazy(() => import("@/domains/topics/content/network/tls")),
  "http-status-codes": React.lazy(
    () => import("@/domains/topics/content/api/http-status-codes"),
  ),
  rest: React.lazy(() => import("@/domains/topics/content/api/rest")),
  grpc: React.lazy(() => import("@/domains/topics/content/api/grpc")),
  "graph-ql": React.lazy(() => import("@/domains/topics/content/api/graph-ql")),
  "rest-graph-grpc": React.lazy(
    () => import("@/domains/topics/content/api/rest-graph-grpc"),
  ),
  "load-balancer": React.lazy(
    () => import("@/domains/topics/content/architecture/patterns/load-balancer"),
  ),
  "horizontal-vertical-scaling": React.lazy(
    () =>
      import(
        "@/domains/topics/content/architecture/patterns/horizontal-vertical-scaling"
      ),
  ),
  cdn: React.lazy(
    () => import("@/domains/topics/content/architecture/patterns/cdn"),
  ),
  redis: React.lazy(
    () => import("@/domains/topics/content/architecture/patterns/redis"),
  ),
  "latency-vs-throughput": React.lazy(
    () =>
      import(
        "@/domains/topics/content/architecture/fundamentals/latency-vs-throughput"
      ),
  ),
  "cap-theorem": React.lazy(
    () =>
      import(
        "@/domains/topics/content/architecture/fundamentals/cap-theorem"
      ),
  ),
  abstraction: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/oop-concepts/abstraction"
      ),
  ),
  encapsulation: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/oop-concepts/encapsulation"
      ),
  ),
  inheritance: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/oop-concepts/inheritance"
      ),
  ),
  polymorphism: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/oop-concepts/polymorphism"
      ),
  ),
  "general-software-principles": React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-principles/general-software-principles"
      ),
  ),
  "object-oriented-principles": React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-principles/object-oriented-principles"
      ),
  ),
  "factory-method": React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-patterns/creational-patterns/factory-method"
      ),
  ),
  singleton: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-patterns/creational-patterns/singleton"
      ),
  ),
  builder: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-patterns/creational-patterns/builder"
      ),
  ),
  decorator: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-patterns/structural-patterns/decorator"
      ),
  ),
  facade: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-patterns/structural-patterns/facade"
      ),
  ),
  strategy: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-patterns/behavioral-patterns/strategy"
      ),
  ),
  observer: React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-patterns/behavioral-patterns/observer"
      ),
  ),
  "state-machine": React.lazy(
    () =>
      import(
        "@/domains/topics/content/low-level-design/design-patterns/behavioral-patterns/state-machine"
      ),
  ),
};

const frontendMenuPath: TopicMenuPathItem[] = [
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "fundamentals",
    label: "Fundamentals",
  },
];

const frontendJavaScriptMenuPath: TopicMenuPathItem[] = [
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "java-script",
    label: "JavaScript",
  },
];

const frontendTypeScriptMenuPath: TopicMenuPathItem[] = [
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "type-script",
    label: "TypeScript",
  },
];

const frontendAngularMenuPath: TopicMenuPathItem[] = [
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "angular",
    label: "Angular",
  },
];

const frontendReactMenuPath: TopicMenuPathItem[] = [
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "react",
    label: "React",
  },
];

const frontendNextJsMenuPath: TopicMenuPathItem[] = [
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "next-js",
    label: "Next.js",
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

const architectureFundamentalsMenuPath: TopicMenuPathItem[] = [
  ...architectureMenuPath,
  {
    id: "fundamentals",
    label: "Fundamentals",
  },
];

const architecturePatternsMenuPath: TopicMenuPathItem[] = [
  ...architectureMenuPath,
  {
    id: "patterns",
    label: "Patterns",
  },
];

const authenticationPatternsMenuPath: TopicMenuPathItem[] = [
  ...architecturePatternsMenuPath,
  {
    id: "authentication",
    label: "Authentication",
  },
];

const lowLevelDesignMenuPath: TopicMenuPathItem[] = [
  {
    id: "low-level-design",
    label: "Low-Level Design",
  },
];

const oopConceptsMenuPath: TopicMenuPathItem[] = [
  ...lowLevelDesignMenuPath,
  {
    id: "oop-concepts",
    label: "OOP Concepts",
  },
];

const designPrinciplesMenuPath: TopicMenuPathItem[] = [
  ...lowLevelDesignMenuPath,
  {
    id: "design-principles",
    label: "Design Principles",
  },
];

const creationalPatternsMenuPath: TopicMenuPathItem[] = [
  ...lowLevelDesignMenuPath,
  {
    id: "design-patterns",
    label: "Design Patterns",
  },
  {
    id: "creational-patterns",
    label: "Creational Patterns",
  },
];

const structuralPatternsMenuPath: TopicMenuPathItem[] = [
  ...lowLevelDesignMenuPath,
  {
    id: "design-patterns",
    label: "Design Patterns",
  },
  {
    id: "structural-patterns",
    label: "Structural Patterns",
  },
];

const behavioralPatternsMenuPath: TopicMenuPathItem[] = [
  ...lowLevelDesignMenuPath,
  {
    id: "design-patterns",
    label: "Design Patterns",
  },
  {
    id: "behavioral-patterns",
    label: "Behavioral Patterns",
  },
];

const topicDefinitions: TopicDefinition[] = [
  {
    id: "html-semantics",
    title: "Semantic HTML",
    menuLabel: "Semantic HTML",
    path: "/topic/html-semantics",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["html-semantics"],
  },
  {
    id: "accessibility",
    title: "Accessibility Basics",
    menuLabel: "Accessibility basics",
    path: "/topic/accessibility",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders.accessibility,
  },
  {
    id: "css-box-model",
    title: "CSS Box Model and Sizing",
    menuLabel: "CSS box model and sizing",
    path: "/topic/css-box-model",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["css-box-model"],
  },
  {
    id: "css-layout",
    title: "CSS Layout: Flexbox, Grid, Positioning",
    menuLabel: "CSS layout",
    path: "/topic/css-layout",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["css-layout"],
  },
  {
    id: "responsive-design",
    title: "Responsive Design and Mobile-First CSS",
    menuLabel: "Responsive design",
    path: "/topic/responsive-design",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["responsive-design"],
  },
  {
    id: "dom-events",
    title: "DOM, Events, and Event Propagation",
    menuLabel: "DOM and events",
    path: "/topic/dom-events",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["dom-events"],
  },
  {
    id: "browser-rendering",
    title: "Browser Rendering Basics",
    menuLabel: "Browser rendering basics",
    path: "/topic/browser-rendering",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["browser-rendering"],
  },
  {
    id: "network-browser-apis",
    title: "Network and Browser APIs",
    menuLabel: "Network and browser APIs",
    path: "/topic/network-browser-apis",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["network-browser-apis"],
  },
  {
    id: "performance-fundamentals",
    title: "Performance Fundamentals",
    menuLabel: "Performance fundamentals",
    path: "/topic/performance-fundamentals",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["performance-fundamentals"],
  },
  {
    id: "frontend-security",
    title: "Web Security Basics for Frontend",
    menuLabel: "Web security basics",
    path: "/topic/frontend-security",
    status: "ready",
    menuPath: frontendMenuPath,
    loader: topicLoaders["frontend-security"],
  },
  {
    id: "primitive-vs-reference-types",
    title: "Primitive vs Reference Types",
    menuLabel: "Primitive vs reference types",
    path: "/topic/primitive-vs-reference-types",
    status: "ready",
    menuPath: frontendJavaScriptMenuPath,
    loader: topicLoaders["primitive-vs-reference-types"],
  },
  {
    id: "closures",
    title: "Closures",
    menuLabel: "Closures",
    path: "/topic/closures",
    status: "ready",
    menuPath: frontendJavaScriptMenuPath,
    loader: topicLoaders.closures,
  },
  {
    id: "objects-destructuring-spread-rest",
    title: "Objects, Destructuring, and Spread/Rest",
    menuLabel: "Objects, destructuring, spread/rest",
    path: "/topic/objects-destructuring-spread-rest",
    status: "ready",
    menuPath: frontendJavaScriptMenuPath,
    loader: topicLoaders["objects-destructuring-spread-rest"],
  },
  {
    id: "promises-async-await",
    title: "Promises and Async/Await",
    menuLabel: "Promises and async/await",
    path: "/topic/promises-async-await",
    status: "ready",
    menuPath: frontendJavaScriptMenuPath,
    loader: topicLoaders["promises-async-await"],
  },
  {
    id: "error-handling-javascript",
    title: "Error Handling in JavaScript",
    menuLabel: "Error handling",
    path: "/topic/error-handling-javascript",
    status: "ready",
    menuPath: frontendJavaScriptMenuPath,
    loader: topicLoaders["error-handling-javascript"],
  },
  {
    id: "dom-manipulation-basics",
    title: "DOM Manipulation Basics",
    menuLabel: "DOM manipulation basics",
    path: "/topic/dom-manipulation-basics",
    status: "ready",
    menuPath: frontendJavaScriptMenuPath,
    loader: topicLoaders["dom-manipulation-basics"],
  },
  {
    id: "esm-vs-commonjs",
    title: "Modules: ESM vs CommonJS",
    menuLabel: "ESM vs CommonJS",
    path: "/topic/esm-vs-commonjs",
    status: "ready",
    menuPath: frontendJavaScriptMenuPath,
    loader: topicLoaders["esm-vs-commonjs"],
  },
  {
    id: "immutability",
    title: "Immutability",
    menuLabel: "Immutability",
    path: "/topic/immutability",
    status: "ready",
    menuPath: frontendJavaScriptMenuPath,
    loader: topicLoaders.immutability,
  },
  {
    id: "typescript-type-system-fundamentals",
    title: "Type System Fundamentals",
    menuLabel: "Type system fundamentals",
    path: "/topic/typescript-type-system-fundamentals",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-type-system-fundamentals"],
  },
  {
    id: "typescript-type-narrowing",
    title: "Type Narrowing",
    menuLabel: "Type narrowing",
    path: "/topic/typescript-type-narrowing",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-type-narrowing"],
  },
  {
    id: "typescript-interfaces-vs-types",
    title: "Interfaces vs Types",
    menuLabel: "Interfaces vs types",
    path: "/topic/typescript-interfaces-vs-types",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-interfaces-vs-types"],
  },
  {
    id: "typescript-generics",
    title: "Generics",
    menuLabel: "Generics",
    path: "/topic/typescript-generics",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-generics"],
  },
  {
    id: "typescript-utility-types",
    title: "Utility Types",
    menuLabel: "Utility types",
    path: "/topic/typescript-utility-types",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-utility-types"],
  },
  {
    id: "typescript-advanced-types",
    title: "Advanced Types",
    menuLabel: "Advanced types",
    path: "/topic/typescript-advanced-types",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-advanced-types"],
  },
  {
    id: "typescript-functions",
    title: "Functions in TypeScript",
    menuLabel: "Functions in TypeScript",
    path: "/topic/typescript-functions",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-functions"],
  },
  {
    id: "typescript-classes-and-oop",
    title: "Classes and OOP Typing",
    menuLabel: "Classes and OOP typing",
    path: "/topic/typescript-classes-and-oop",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-classes-and-oop"],
  },
  {
    id: "typescript-modules-and-namespaces",
    title: "Modules and Namespaces",
    menuLabel: "Modules and namespaces",
    path: "/topic/typescript-modules-and-namespaces",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-modules-and-namespaces"],
  },
  {
    id: "typescript-type-assertions",
    title: "Type Assertions and Casting",
    menuLabel: "Type assertions and casting",
    path: "/topic/typescript-type-assertions",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-type-assertions"],
  },
  {
    id: "typescript-async-typing",
    title: "Async Typing",
    menuLabel: "Async typing",
    path: "/topic/typescript-async-typing",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-async-typing"],
  },
  {
    id: "typescript-strict-mode-and-tsconfig",
    title: "Strict Mode and tsconfig",
    menuLabel: "Strict mode and tsconfig",
    path: "/topic/typescript-strict-mode-and-tsconfig",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-strict-mode-and-tsconfig"],
  },
  {
    id: "typescript-structural-typing",
    title: "Structural Typing",
    menuLabel: "Structural typing",
    path: "/topic/typescript-structural-typing",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-structural-typing"],
  },
  {
    id: "typescript-immutability-and-readonly",
    title: "Immutability and Readonly",
    menuLabel: "Immutability and readonly",
    path: "/topic/typescript-immutability-and-readonly",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-immutability-and-readonly"],
  },
  {
    id: "typescript-runtime-vs-compile-time",
    title: "Runtime vs Compile Time",
    menuLabel: "Runtime vs compile time",
    path: "/topic/typescript-runtime-vs-compile-time",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-runtime-vs-compile-time"],
  },
  {
    id: "typescript-api-type-design",
    title: "API Type Design",
    menuLabel: "API type design",
    path: "/topic/typescript-api-type-design",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-api-type-design"],
  },
  {
    id: "typescript-working-with-external-libraries",
    title: "Working with External Libraries",
    menuLabel: "Working with external libraries",
    path: "/topic/typescript-working-with-external-libraries",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-working-with-external-libraries"],
  },
  {
    id: "typescript-type-safe-patterns-in-real-code",
    title: "Type-Safe Patterns in Real Code",
    menuLabel: "Type-safe patterns in real code",
    path: "/topic/typescript-type-safe-patterns-in-real-code",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-type-safe-patterns-in-real-code"],
  },
  {
    id: "typescript-performance-and-maintainability",
    title: "Performance and Maintainability",
    menuLabel: "Performance and maintainability",
    path: "/topic/typescript-performance-and-maintainability",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-performance-and-maintainability"],
  },
  {
    id: "typescript-senior-level-judgment",
    title: "Senior-Level Judgment",
    menuLabel: "Senior-level judgment",
    path: "/topic/typescript-senior-level-judgment",
    status: "ready",
    menuPath: frontendTypeScriptMenuPath,
    loader: topicLoaders["typescript-senior-level-judgment"],
  },
  {
    id: "angular-architecture",
    title: "Angular Architecture",
    menuLabel: "Angular architecture",
    path: "/topic/angular-architecture",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-architecture"],
  },
  {
    id: "angular-components-templates-data-binding",
    title: "Components, Templates, and Data Binding",
    menuLabel: "Components, templates, data binding",
    path: "/topic/angular-components-templates-data-binding",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-components-templates-data-binding"],
  },
  {
    id: "angular-directives",
    title: "Directives",
    menuLabel: "Directives",
    path: "/topic/angular-directives",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-directives"],
  },
  {
    id: "angular-inputs-outputs-component-communication",
    title: "Inputs, Outputs, and Component Communication",
    menuLabel: "Inputs, outputs, communication",
    path: "/topic/angular-inputs-outputs-component-communication",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-inputs-outputs-component-communication"],
  },
  {
    id: "angular-lifecycle-hooks",
    title: "Lifecycle Hooks",
    menuLabel: "Lifecycle hooks",
    path: "/topic/angular-lifecycle-hooks",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-lifecycle-hooks"],
  },
  {
    id: "angular-dependency-injection",
    title: "Dependency Injection",
    menuLabel: "Dependency injection",
    path: "/topic/angular-dependency-injection",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-dependency-injection"],
  },
  {
    id: "angular-services",
    title: "Services",
    menuLabel: "Services",
    path: "/topic/angular-services",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-services"],
  },
  {
    id: "angular-rxjs-basics",
    title: "RxJS Basics",
    menuLabel: "RxJS basics",
    path: "/topic/angular-rxjs-basics",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-rxjs-basics"],
  },
  {
    id: "angular-http-client",
    title: "HTTP Client",
    menuLabel: "HTTP client",
    path: "/topic/angular-http-client",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-http-client"],
  },
  {
    id: "angular-routing",
    title: "Routing",
    menuLabel: "Routing",
    path: "/topic/angular-routing",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-routing"],
  },
  {
    id: "angular-reactive-forms-validation",
    title: "Reactive Forms and Validations",
    menuLabel: "Reactive forms and validations",
    path: "/topic/angular-reactive-forms-validation",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-reactive-forms-validation"],
  },
  {
    id: "angular-change-detection",
    title: "Change Detection",
    menuLabel: "Change detection",
    path: "/topic/angular-change-detection",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-change-detection"],
  },
  {
    id: "angular-interceptors",
    title: "Interceptors",
    menuLabel: "Interceptors",
    path: "/topic/angular-interceptors",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-interceptors"],
  },
  {
    id: "angular-signals-standalone-components",
    title: "Signals and Standalone Components",
    menuLabel: "Signals and standalone components",
    path: "/topic/angular-signals-standalone-components",
    status: "ready",
    menuPath: frontendAngularMenuPath,
    loader: topicLoaders["angular-signals-standalone-components"],
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    menuLabel: "React fundamentals",
    path: "/topic/react-fundamentals",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-fundamentals"],
  },
  {
    id: "react-hooks-in-depth",
    title: "Hooks in Depth",
    menuLabel: "Hooks in depth",
    path: "/topic/react-hooks-in-depth",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-hooks-in-depth"],
  },
  {
    id: "react-rendering-behavior",
    title: "Rendering Behavior",
    menuLabel: "Rendering behavior",
    path: "/topic/react-rendering-behavior",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-rendering-behavior"],
  },
  {
    id: "react-state-management",
    title: "State Management",
    menuLabel: "State management",
    path: "/topic/react-state-management",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-state-management"],
  },
  {
    id: "react-component-design",
    title: "Component Design",
    menuLabel: "Component design",
    path: "/topic/react-component-design",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-component-design"],
  },
  {
    id: "react-performance",
    title: "Performance",
    menuLabel: "Performance",
    path: "/topic/react-performance",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-performance"],
  },
  {
    id: "react-effects-and-side-effects",
    title: "Effects and Side Effects",
    menuLabel: "Effects and side effects",
    path: "/topic/react-effects-and-side-effects",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-effects-and-side-effects"],
  },
  {
    id: "react-forms",
    title: "Forms",
    menuLabel: "Forms",
    path: "/topic/react-forms",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-forms"],
  },
  {
    id: "react-data-fetching",
    title: "Data Fetching",
    menuLabel: "Data fetching",
    path: "/topic/react-data-fetching",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-data-fetching"],
  },
  {
    id: "react-routing",
    title: "Routing",
    menuLabel: "Routing",
    path: "/topic/react-routing",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-routing"],
  },
  {
    id: "react-server-rendering",
    title: "Server Rendering",
    menuLabel: "Server rendering",
    path: "/topic/react-server-rendering",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-server-rendering"],
  },
  {
    id: "react-architecture",
    title: "Architecture",
    menuLabel: "Architecture",
    path: "/topic/react-architecture",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-architecture"],
  },
  {
    id: "react-error-handling",
    title: "Error Handling",
    menuLabel: "Error handling",
    path: "/topic/react-error-handling",
    status: "ready",
    menuPath: frontendReactMenuPath,
    loader: topicLoaders["react-error-handling"],
  },
  {
    id: "nextjs-rendering-model",
    title: "Rendering Model",
    menuLabel: "Rendering model",
    path: "/topic/nextjs-rendering-model",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-rendering-model"],
  },
  {
    id: "nextjs-app-router-architecture",
    title: "App Router Architecture",
    menuLabel: "App Router architecture",
    path: "/topic/nextjs-app-router-architecture",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-app-router-architecture"],
  },
  {
    id: "nextjs-server-vs-client-components",
    title: "Server Components vs Client Components",
    menuLabel: "Server vs client components",
    path: "/topic/nextjs-server-vs-client-components",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-server-vs-client-components"],
  },
  {
    id: "nextjs-data-fetching",
    title: "Data Fetching",
    menuLabel: "Data fetching",
    path: "/topic/nextjs-data-fetching",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-data-fetching"],
  },
  {
    id: "nextjs-caching-and-revalidation",
    title: "Caching and Revalidation",
    menuLabel: "Caching and revalidation",
    path: "/topic/nextjs-caching-and-revalidation",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-caching-and-revalidation"],
  },
  {
    id: "nextjs-server-actions-mutations",
    title: "Server Actions and Mutations",
    menuLabel: "Server actions and mutations",
    path: "/topic/nextjs-server-actions-mutations",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-server-actions-mutations"],
  },
  {
    id: "nextjs-routing",
    title: "Routing",
    menuLabel: "Routing",
    path: "/topic/nextjs-routing",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-routing"],
  },
  {
    id: "nextjs-api-route-handlers",
    title: "API Layer and Route Handlers",
    menuLabel: "API layer and route handlers",
    path: "/topic/nextjs-api-route-handlers",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-api-route-handlers"],
  },
  {
    id: "nextjs-middleware-edge-runtime",
    title: "Middleware and Edge Runtime",
    menuLabel: "Middleware and Edge runtime",
    path: "/topic/nextjs-middleware-edge-runtime",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-middleware-edge-runtime"],
  },
  {
    id: "nextjs-performance",
    title: "Performance",
    menuLabel: "Performance",
    path: "/topic/nextjs-performance",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-performance"],
  },
  {
    id: "nextjs-seo-metadata",
    title: "SEO and Metadata",
    menuLabel: "SEO and metadata",
    path: "/topic/nextjs-seo-metadata",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-seo-metadata"],
  },
  {
    id: "nextjs-authentication-authorization",
    title: "Authentication and Authorization",
    menuLabel: "Authentication and authorization",
    path: "/topic/nextjs-authentication-authorization",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-authentication-authorization"],
  },
  {
    id: "nextjs-error-handling-observability",
    title: "Error Handling and Observability",
    menuLabel: "Error handling and observability",
    path: "/topic/nextjs-error-handling-observability",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-error-handling-observability"],
  },
  {
    id: "nextjs-deployment-runtime-tradeoffs",
    title: "Deployment and Runtime Tradeoffs",
    menuLabel: "Deployment and runtime tradeoffs",
    path: "/topic/nextjs-deployment-runtime-tradeoffs",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-deployment-runtime-tradeoffs"],
  },
  {
    id: "nextjs-pages-router-legacy",
    title: "Pages Router Legacy Knowledge",
    menuLabel: "Pages Router legacy knowledge",
    path: "/topic/nextjs-pages-router-legacy",
    status: "ready",
    menuPath: frontendNextJsMenuPath,
    loader: topicLoaders["nextjs-pages-router-legacy"],
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
    id: "tcp-ip",
    title: "TCP/IP",
    menuLabel: "TCP/IP",
    path: "/topic/tcp-ip",
    status: "coming-soon",
    menuPath: networkMenuPath,
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
    id: "rest-graph-grpc",
    title: "REST vs GraphQL vs gRPC",
    menuLabel: "REST vs GraphQL vs gRPC",
    path: "/topic/rest-graph-grpc",
    status: "ready",
    menuPath: apiMenuPath,
    loader: topicLoaders["rest-graph-grpc"],
  },
  {
    id: "access-vs-refresh",
    title: "Access vs Refresh Tokens",
    menuLabel: "Access vs refresh tokens",
    path: "/topic/access-vs-refresh",
    status: "coming-soon",
    menuPath: authenticationPatternsMenuPath,
  },
  {
    id: "api-key",
    title: "API Key",
    menuLabel: "API key",
    path: "/topic/api-key",
    status: "coming-soon",
    menuPath: authenticationPatternsMenuPath,
  },
  {
    id: "basic-digest",
    title: "Basic and Digest Auth",
    menuLabel: "Basic and Digest auth",
    path: "/topic/basic-digest",
    status: "coming-soon",
    menuPath: authenticationPatternsMenuPath,
  },
  {
    id: "jwt-bearer",
    title: "JWT Bearer",
    menuLabel: "JWT bearer",
    path: "/topic/jwt-bearer",
    status: "coming-soon",
    menuPath: authenticationPatternsMenuPath,
  },
  {
    id: "oauth2-oidc",
    title: "OAuth 2.0 and OIDC",
    menuLabel: "OAuth 2.0 and OIDC",
    path: "/topic/oauth2-oidc",
    status: "coming-soon",
    menuPath: authenticationPatternsMenuPath,
  },
  {
    id: "session",
    title: "Session Auth",
    menuLabel: "Session auth",
    path: "/topic/session",
    status: "coming-soon",
    menuPath: authenticationPatternsMenuPath,
  },
  {
    id: "sso",
    title: "Single Sign-On",
    menuLabel: "Single sign-on",
    path: "/topic/sso",
    status: "coming-soon",
    menuPath: authenticationPatternsMenuPath,
  },
  {
    id: "load-balancer",
    title: "Load Balancer",
    menuLabel: "Load balancer",
    path: "/topic/load-balancer",
    status: "ready",
    menuPath: architecturePatternsMenuPath,
    loader: topicLoaders["load-balancer"],
  },
  {
    id: "horizontal-vertical-scaling",
    title: "Horizontal vs Vertical Scaling",
    menuLabel: "Horizontal vs vertical scaling",
    path: "/topic/horizontal-vertical-scaling",
    status: "ready",
    menuPath: architecturePatternsMenuPath,
    loader: topicLoaders["horizontal-vertical-scaling"],
  },
  {
    id: "cdn",
    title: "CDN",
    menuLabel: "CDN",
    path: "/topic/cdn",
    status: "ready",
    menuPath: architecturePatternsMenuPath,
    loader: topicLoaders.cdn,
  },
  {
    id: "redis",
    title: "Redis",
    menuLabel: "Redis",
    path: "/topic/redis",
    status: "ready",
    menuPath: architecturePatternsMenuPath,
    loader: topicLoaders.redis,
  },
  {
    id: "latency-vs-throughput",
    title: "Latency vs Throughput",
    menuLabel: "Latency vs throughput",
    path: "/topic/latency-vs-throughput",
    status: "ready",
    menuPath: architectureFundamentalsMenuPath,
    loader: topicLoaders["latency-vs-throughput"],
  },
  {
    id: "cap-theorem",
    title: "CAP Theorem",
    menuLabel: "CAP theorem",
    path: "/topic/cap-theorem",
    status: "ready",
    menuPath: architectureFundamentalsMenuPath,
    loader: topicLoaders["cap-theorem"],
  },
  {
    id: "abstraction",
    title: "Abstraction",
    menuLabel: "Abstraction",
    path: "/topic/abstraction",
    status: "ready",
    menuPath: oopConceptsMenuPath,
    loader: topicLoaders.abstraction,
  },
  {
    id: "encapsulation",
    title: "Encapsulation",
    menuLabel: "Encapsulation",
    path: "/topic/encapsulation",
    status: "ready",
    menuPath: oopConceptsMenuPath,
    loader: topicLoaders.encapsulation,
  },
  {
    id: "inheritance",
    title: "Inheritance",
    menuLabel: "Inheritance",
    path: "/topic/inheritance",
    status: "ready",
    menuPath: oopConceptsMenuPath,
    loader: topicLoaders.inheritance,
  },
  {
    id: "polymorphism",
    title: "Polymorphism",
    menuLabel: "Polymorphism",
    path: "/topic/polymorphism",
    status: "ready",
    menuPath: oopConceptsMenuPath,
    loader: topicLoaders.polymorphism,
  },
  {
    id: "general-software-principles",
    title: "General Software Principles",
    menuLabel: "General software principles",
    path: "/topic/general-software-principles",
    status: "ready",
    menuPath: designPrinciplesMenuPath,
    loader: topicLoaders["general-software-principles"],
  },
  {
    id: "object-oriented-principles",
    title: "Object-Oriented Principles",
    menuLabel: "Object-oriented principles",
    path: "/topic/object-oriented-principles",
    status: "ready",
    menuPath: designPrinciplesMenuPath,
    loader: topicLoaders["object-oriented-principles"],
  },
  {
    id: "factory-method",
    title: "Factory Method",
    menuLabel: "Factory method",
    path: "/topic/factory-method",
    status: "ready",
    menuPath: creationalPatternsMenuPath,
    loader: topicLoaders["factory-method"],
  },
  {
    id: "singleton",
    title: "Singleton",
    menuLabel: "Singleton",
    path: "/topic/singleton",
    status: "ready",
    menuPath: creationalPatternsMenuPath,
    loader: topicLoaders.singleton,
  },
  {
    id: "builder",
    title: "Builder",
    menuLabel: "Builder",
    path: "/topic/builder",
    status: "ready",
    menuPath: creationalPatternsMenuPath,
    loader: topicLoaders.builder,
  },
  {
    id: "decorator",
    title: "Decorator",
    menuLabel: "Decorator",
    path: "/topic/decorator",
    status: "ready",
    menuPath: structuralPatternsMenuPath,
    loader: topicLoaders.decorator,
  },
  {
    id: "facade",
    title: "Facade",
    menuLabel: "Facade",
    path: "/topic/facade",
    status: "ready",
    menuPath: structuralPatternsMenuPath,
    loader: topicLoaders.facade,
  },
  {
    id: "strategy",
    title: "Strategy",
    menuLabel: "Strategy",
    path: "/topic/strategy",
    status: "ready",
    menuPath: behavioralPatternsMenuPath,
    loader: topicLoaders.strategy,
  },
  {
    id: "observer",
    title: "Observer",
    menuLabel: "Observer",
    path: "/topic/observer",
    status: "ready",
    menuPath: behavioralPatternsMenuPath,
    loader: topicLoaders.observer,
  },
  {
    id: "state-machine",
    title: "State Machine",
    menuLabel: "State machine",
    path: "/topic/state-machine",
    status: "ready",
    menuPath: behavioralPatternsMenuPath,
    loader: topicLoaders["state-machine"],
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
