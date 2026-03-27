import type { MenuItem } from "../types/menuItem.interface";

const BASE = "/study-guide";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "frontend",
    label: "Frontend",
    children: [
      {
        id: "core-web-fundamentals",
        label: "Core Web Fundamentals",
        children: [
          {
            id: "html-semantics",
            label: "HTML — semantics, forms, SEO",
            href: `${BASE}/topic/html-semantics`,
          },
          {
            id: "css-box-model",
            label: "CSS — box model, Flexbox, Grid",
            href: `${BASE}/topic/css-box-model`,
          },
          {
            id: "responsive-design",
            label: "Responsive design",
            href: `${BASE}/topic/responsive-design`,
          },
          {
            id: "accessibility",
            label: "Accessibility (a11y)",
            href: `${BASE}/topic/accessibility`,
          },
        ],
      },
      {
        id: "javascript",
        label: "JavaScript",
        children: [
          {
            id: "closures-scope",
            label: "Closures & scope",
            href: `${BASE}/topic/closures-scope`,
          },
          {
            id: "prototypes-inheritance",
            label: "Prototypes & inheritance",
            href: `${BASE}/topic/prototypes-inheritance`,
          },
          {
            id: "this-bind-call-apply",
            label: "this, bind, call, apply",
            href: `${BASE}/topic/this-bind-call-apply`,
          },
          {
            id: "async-js",
            label: "Async JS — Promises, async/await",
            href: `${BASE}/topic/async-js`,
          },
          {
            id: "event-loop",
            label: "Event loop — call stack, microtasks, task queue",
            href: `${BASE}/topic/event-loop`,
          },
          {
            id: "es6-plus",
            label: "ES6+ features",
            href: `${BASE}/topic/es6-plus`,
          },
        ],
      },
      {
        id: "browser-rendering",
        label: "Browser & Rendering",
        children: [
          {
            id: "critical-rendering-path",
            label: "Critical rendering path",
            href: `${BASE}/topic/critical-rendering-path`,
          },
          {
            id: "dom-virtual-dom",
            label: "DOM & Virtual DOM",
            href: `${BASE}/topic/dom-virtual-dom`,
          },
          {
            id: "reflow-repaint",
            label: "Reflow vs repaint",
            href: `${BASE}/topic/reflow-repaint`,
          },
          { id: "web-apis", label: "Web APIs", href: `${BASE}/topic/web-apis` },
        ],
      },
      {
        id: "angular",
        label: "Angular",
        children: [
          {
            id: "angular-change-detection",
            label: "Change Detection",
            href: `${BASE}/topic/angular-change-detection`,
          },
          {
            id: "rxjs-observables",
            label: "RxJS (Observables, Operators)",
            href: `${BASE}/topic/rxjs-observables`,
          },
          {
            id: "angular-forms",
            label: "Forms (Reactive vs Template)",
            href: `${BASE}/topic/angular-forms`,
          },
          {
            id: "http-interceptors",
            label: "HTTP & Interceptors",
            href: `${BASE}/topic/http-interceptors`,
          },
          {
            id: "angular-performance",
            label: "Performance (OnPush, trackBy)",
            href: `${BASE}/topic/angular-performance`,
          },
        ],
      },
      {
        id: "react",
        label: "React",
        children: [
          {
            id: "react-component-architecture",
            label: "Component architecture",
            href: `${BASE}/topic/react-component-architecture`,
          },
          {
            id: "react-hooks",
            label: "Hooks — useState, useEffect, useMemo, useCallback",
            href: `${BASE}/topic/react-hooks`,
          },
          {
            id: "react-context",
            label: "Context vs external state (Redux, Zustand)",
            href: `${BASE}/topic/react-state-management`,
          },
          {
            id: "react-rendering",
            label: "Rendering behavior & reconciliation",
            href: `${BASE}/topic/react-rendering`,
          },
          {
            id: "react-performance",
            label: "Performance optimization",
            href: `${BASE}/topic/react-performance`,
          },
          {
            id: "react-lifecycle",
            label: "Lifecycle concepts",
            href: `${BASE}/topic/react-lifecycle`,
          },
          {
            id: "react-forms",
            label: "Forms handling",
            href: `${BASE}/topic/react-forms`,
          },
          {
            id: "react-testing",
            label: "Testing — RTL & Jest",
            href: `${BASE}/topic/react-testing`,
          },
        ],
      },
      {
        id: "nextjs",
        label: "Next.js",
        children: [
          { id: "ssr-ssg-csr", label: "SSR vs SSG vs CSR", href: "#" },
          {
            id: "app-router",
            label: "App Router & Server Components",
            href: "#",
          },
          { id: "data-fetching", label: "Data Fetching Strategies", href: "#" },
          { id: "api-routes", label: "API Routes", href: "#" },
          {
            id: "server-components",
            label: "Server components (React / Next.js)",
            href: "#",
          },
          { id: "deployment-edge", label: "Deployment & Edge", href: "#" },
        ],
      },
      {
        id: "performance",
        label: "Performance",
        children: [
          {
            id: "code-splitting",
            label: "Code splitting & lazy loading",
            href: "#",
          },
          { id: "tree-shaking", label: "Tree shaking", href: "#" },
          { id: "caching-strategies", label: "Caching strategies", href: "#" },
          {
            id: "core-web-vitals",
            label: "Core Web Vitals (LCP, CLS, INP)",
            href: "#",
          },
        ],
      },
      {
        id: "networking-apis",
        label: "Networking & APIs",
        children: [
          {
            id: "http-basics",
            label: "HTTP — methods, status codes, headers",
            href: "#",
          },
          { id: "rest-graphql", label: "REST vs GraphQL", href: "#" },
          {
            id: "auth-jwt-oauth",
            label: "Authentication — JWT, OAuth",
            href: "#",
          },
          { id: "cors", label: "CORS", href: "#" },
        ],
      },
      {
        id: "testing",
        label: "Testing",
        children: [
          { id: "unit-testing", label: "Unit testing", href: "#" },
          {
            id: "integration-testing",
            label: "Integration testing",
            href: "#",
          },
          { id: "e2e-testing", label: "E2E testing", href: "#" },
          {
            id: "mocking-strategies",
            label: "Mocking & test strategies",
            href: "#",
          },
        ],
      },
      {
        id: "architecture-patterns",
        label: "Architecture & Patterns",
        children: [
          {
            id: "separation-of-concerns",
            label: "Separation of concerns",
            href: "#",
          },
          {
            id: "design-patterns",
            label: "Common design patterns — MVC, hooks, services",
            href: "#",
          },
          { id: "state-architecture", label: "State architecture", href: "#" },
          {
            id: "component-composition",
            label: "Component composition patterns",
            href: "#",
          },
        ],
      },
      {
        id: "tooling-build",
        label: "Tooling & Build",
        children: [
          { id: "webpack-vite", label: "Webpack / Vite — basics", href: "#" },
          { id: "babel-typescript", label: "Babel & TypeScript", href: "#" },
          { id: "cicd-basics", label: "CI/CD basics", href: "#" },
        ],
      },
    ],
  },
  //   {
  //     label: "Programming",
  //     icon: "💻",
  //     children: [
  //       {
  //         label: "Fundamentals",
  //         href: "#",
  //         children: [
  //           { label: "Data Structures", href: "#" },
  //           { label: "Algorithms", href: "#" },
  //           { label: "Design Patterns", href: "#" },
  //           { label: "OOP Concepts", href: "#" },
  //         ],
  //       },
  //       {
  //         label: "Languages",
  //         href: "#",
  //         children: [
  //           { label: "JavaScript", href: "#" },
  //           { label: "TypeScript", href: "#" },
  //           { label: "SQL", href: "#" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     label: "Backend",
  //     icon: "🖥️",
  //     children: [
  //       {
  //         label: "APIs",
  //         href: "#",
  //         children: [
  //           { label: "REST", href: "#" },
  //           { label: "GraphQL", href: "#" },
  //           { label: "Authentication", href: "#" },
  //           { label: "API Security", href: "#" },
  //         ],
  //       },
  //       {
  //         label: "Databases",
  //         href: "#",
  //         children: [
  //           { label: "SQL", href: "#" },
  //           { label: "NoSQL", href: "#" },
  //           { label: "ORM", href: "#" },
  //           { label: "Indexing", href: "#" },
  //         ],
  //       },
  //       { label: "Caching", href: "#" },
  //       { label: "Message Queues", href: "#" },
  //     ],
  //   },
  //   {
  //     label: "DevOps",
  //     icon: "🔄",
  //     children: [
  //       {
  //         label: "Version Control",
  //         href: "#",
  //         children: [
  //           { label: "Git", href: "#" },
  //           { label: "GitHub", href: "#" },
  //           { label: "Branching Strategies", href: "#" },
  //         ],
  //       },
  //       {
  //         label: "Containers",
  //         href: "#",
  //         children: [
  //           { label: "Docker", href: "#" },
  //           { label: "Docker Compose", href: "#" },
  //           { label: "Kubernetes", href: "#" },
  //         ],
  //       },
  //       {
  //         label: "Cloud",
  //         href: "#",
  //         children: [
  //           { label: "AWS", href: "#" },
  //           { label: "Azure", href: "#" },
  //           { label: "GCP", href: "#" },
  //         ],
  //       },
  //       { label: "CI/CD", href: "#" },
  //       { label: "Infrastructure as Code", href: "#" },
  //     ],
  //   },
  //   {
  //     label: "Computer Science",
  //     icon: "🧠",
  //     children: [
  //       {
  //         label: "Networking",
  //         href: "#",
  //         children: [
  //           { label: "TCP/IP", href: "#" },
  //           { label: "HTTP/HTTPS", href: "#" },
  //           { label: "DNS", href: "#" },
  //           { label: "WebSockets", href: "#" },
  //         ],
  //       },
  //       {
  //         label: "Security",
  //         href: "#",
  //         children: [
  //           { label: "Encryption", href: "#" },
  //           { label: "Authentication", href: "#" },
  //           { label: "Common Vulnerabilities", href: "#" },
  //           { label: "OWASP", href: "#" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     label: "Architecture",
  //     icon: "🏗️",
  //     children: [
  //       { label: "Monolith vs Microservices", href: "#" },
  //       { label: "Event-Driven Architecture", href: "#" },
  //       { label: "CQRS & Event Sourcing", href: "#" },
  //       { label: "System Design", href: "#" },
  //     ],
  //   },
  //   {
  //     label: "Soft Skills",
  //     icon: "🤝",
  //     children: [
  //       { label: "Technical Writing", href: "#" },
  //       { label: "Code Review", href: "#" },
  //       { label: "Agile Methodologies", href: "#" },
  //       { label: "Problem Solving", href: "#" },
  //     ],
  //   },
];
