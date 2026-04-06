import {
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
          description="Routing questions evaluate whether you think in terms of application structure, authorization boundaries, and URL-driven state rather than only link and route syntax."
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

        <SectionHeader>Protected Routes</SectionHeader>
        <Paragraph>
          Protected routes are a coordination point between session state,
          redirects, loading states, and role-based authorization.
        </Paragraph>
        <Callout variant="warning">
          Client routing can improve UX, but it is not the real security
          boundary. Backend authorization still matters.
        </Callout>

        <SectionHeader>React Router Patterns That Scale</SectionHeader>
        <Paragraph>
          As applications grow, route definitions become a structural map. Keep
          route modules aligned with product areas and centralize access logic
          at route boundaries rather than scattering it across leaf pages.
        </Paragraph>
        <CollapsibleSection title="Strong interview points">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Explain when state belongs in the URL versus component state.</li>
            <li>Describe nested routes as UI composition, not only path composition.</li>
            <li>Mention loading, redirect, and unauthorized states around protected areas.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactRouting;
