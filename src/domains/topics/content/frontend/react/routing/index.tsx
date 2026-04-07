import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { reactRoutingLesson } from "./meta";

export function ReactRouting() {
  return (
    <TopicLessonPage
      title={reactRoutingLesson.title}
      summary={reactRoutingLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactRoutingLesson.estimatedReadingTimeMinutes}
      difficulty={reactRoutingLesson.difficulty}
      relatedTopics={[
        { label: "Data Fetching", href: "/topic/react-data-fetching" },
        { label: "Architecture", href: "/topic/react-architecture" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Routing"
          description="Routing questions evaluate whether you think in terms of application structure, URL-driven state, data boundaries, and protected-flow UX rather than only link and route syntax."
        />

        <SectionHeader>Nested Routes, Layouts, and URL State</SectionHeader>
        <Paragraph>
          Nested routes let route structure mirror UI structure. Shared layout
          routes work well for application shells, tabs, dashboards, and
          authenticated areas.
        </Paragraph>
        <Paragraph>
          URL state is useful when state should be shareable, refresh-safe, or
          linkable, such as filters, search, selected tabs, sort order, or
          pagination.
        </Paragraph>
        <CodeBlock
          language="tsx"
          code={`const router = createBrowserRouter([
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);`}
        />

        <SectionHeader>Route-Level Data And Protection</SectionHeader>
        <BulletList
          items={[
            "Modern routers can treat route boundaries as data boundaries through loaders and actions, not only navigation configuration.",
            "Protected routes are coordination points between session state, redirects, loading states, and permission-aware UX.",
            "URL state should not be duplicated into component state without a clear synchronization rule, or the app gets two sources of truth.",
            "Back-button behavior is part of routing design, not a browser afterthought.",
          ]}
        />
        <Callout variant="warning">
          Client routing can improve UX, but it is not the real security
          boundary. Backend authorization still matters.
        </Callout>

        <SectionHeader>Failure Modes That Show Up At Scale</SectionHeader>
        <BulletList
          items={[
            "Route guards that render private UI briefly before redirecting create trust and polish problems.",
            "Duplicated state between search params and component state makes back-button behavior feel broken.",
            "Route definitions stop scaling when ownership is unclear and every feature edits one giant central file without boundaries.",
            "Protected flows need explicit unauthorized, loading, and expired-session states instead of one vague redirect pattern.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When should the URL be the source of truth instead of local component state?",
              "How do nested layouts improve route-level architecture?",
              "What role do loaders and actions play in modern router design?",
              "Why do route guards sometimes create a flash of private UI, and how would you avoid it?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactRouting;
