import type { MenuItem } from "../interfaces/menuItem.interface";

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Frontend",
    children: [
      {
        label: "Core Web Fundamentals",
        children: [
          { label: "HTML — semantics, forms, SEO", href: "#" },
          { label: "CSS — box model, Flexbox, Grid", href: "#" },
          { label: "Responsive design", href: "#" },
          { label: "Accessibility (a11y)", href: "#" },
        ],
      },
      {
        label: "JavaScript",
        children: [
          { label: "Closures & scope", href: "#" },
          { label: "Prototypes & inheritance", href: "#" },
          { label: "this, bind, call, apply", href: "#" },
          { label: "Async JS — Promises, async/await", href: "#" },
          {
            label: "Event loop — call stack, microtasks, task queue",
            href: "#",
          },
          { label: "ES6+ features", href: "#" },
        ],
      },
      {
        label: "Browser & Rendering",
        children: [
          { label: "Critical rendering path", href: "#" },
          { label: "DOM & Virtual DOM", href: "#" },
          { label: "Reflow vs repaint", href: "#" },
          { label: "Web APIs", href: "#" },
        ],
      },
      {
        label: "Angular",
        children: [
          { label: "Change Detection", href: "#" },
          { label: "RxJS (Observables, Operators)", href: "#" },
          { label: "Forms (Reactive vs Template)", href: "#" },
          { label: "HTTP & Interceptors", href: "#" },
          { label: "Performance (OnPush, trackBy)", href: "#" },
        ],
      },
      {
        label: "React",
        children: [
          { label: "Component architecture", href: "#" },
          {
            label: "Hooks — useState, useEffect, useMemo, useCallback",
            href: "#",
          },
          { label: "Context vs external state (Redux, Zustand)", href: "#" },
          { label: "Rendering behavior & reconciliation", href: "#" },
          { label: "Performance optimization", href: "#" },
          { label: "Lifecycle concepts", href: "#" },
          { label: "Forms handling", href: "#" },
          { label: "Testing — RTL & Jest", href: "#" },
        ],
      },
      {
        label: "Next.js",
        children: [
          { label: "SSR vs SSG vs CSR", href: "#" },
          { label: "App Router & Server Components", href: "#" },
          { label: "Data Fetching Strategies", href: "#" },
          { label: "API Routes", href: "#" },
          { label: "Deployment & Edge", href: "#" },
        ],
      },
      {
        label: "SSR & Fullstack Concepts",
        children: [
          { label: "SSR vs SSG vs CSR — tradeoffs", href: "#" },
          { label: "Data fetching strategies", href: "#" },
          { label: "Server components (React / Next.js)", href: "#" },
          { label: "API routes", href: "#" },
        ],
      },
      {
        label: "Performance",
        children: [
          { label: "Code splitting & lazy loading", href: "#" },
          { label: "Tree shaking", href: "#" },
          { label: "Caching strategies", href: "#" },
          { label: "Core Web Vitals (LCP, CLS, INP)", href: "#" },
        ],
      },
      {
        label: "Networking & APIs",
        children: [
          { label: "HTTP — methods, status codes, headers", href: "#" },
          { label: "REST vs GraphQL", href: "#" },
          { label: "Authentication — JWT, OAuth", href: "#" },
          { label: "CORS", href: "#" },
        ],
      },
      {
        label: "Testing",
        children: [
          { label: "Unit testing", href: "#" },
          { label: "Integration testing", href: "#" },
          { label: "E2E testing", href: "#" },
          { label: "Mocking & test strategies", href: "#" },
        ],
      },
      {
        label: "Architecture & Patterns",
        children: [
          { label: "Separation of concerns", href: "#" },
          { label: "Common design patterns — MVC, hooks, services", href: "#" },
          { label: "State architecture", href: "#" },
          { label: "Component composition patterns", href: "#" },
        ],
      },
      {
        label: "Tooling & Build",
        children: [
          { label: "Webpack / Vite — basics", href: "#" },
          { label: "Babel & TypeScript", href: "#" },
          { label: "CI/CD basics", href: "#" },
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
