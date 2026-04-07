import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { reactArchitectureLesson } from "./meta";

export function ReactArchitecture() {
  return (
    <TopicLessonPage
      title={reactArchitectureLesson.title}
      summary={reactArchitectureLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactArchitectureLesson.estimatedReadingTimeMinutes}
      difficulty={reactArchitectureLesson.difficulty}
      relatedTopics={[
        { label: "State Management", href: "/topic/react-state-management" },
        { label: "Routing", href: "/topic/react-routing" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Architecture"
          description="Architecture answers should show judgment: how features are divided, where business logic lives, how ownership works across teams, and how the codebase stays understandable as products and organizations grow."
        />

        <SectionHeader>Feature Boundaries Matter More Than Folder Aesthetics</SectionHeader>
        <Paragraph>
          Folder structure should reflect how the product evolves. Feature-first
          organization often scales better than grouping everything by technical
          type because it keeps UI, tests, hooks, route modules, and domain
          logic for one capability close together.
        </Paragraph>
        <CodeBlock
          language="text"
          code={`src/
  features/
    billing/
      components/
      hooks/
      services/
      routes/
      tests/
  shared/
    ui/
    api/
    utils/`}
        />
        <BulletList
          items={[
            "Shared code should become shared only when several features genuinely need the same abstraction.",
            "A shared-everything bucket usually means the architecture is centralizing convenience instead of preserving ownership.",
            "Monorepos raise the same question one level up: what belongs in a shared package, and what should stay feature-local for autonomy?",
          ]}
        />

        <SectionHeader>Where Logic Lives</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "fit", label: "Best fit" },
            { key: "risk", label: "Failure mode" },
          ]}
          rows={[
            {
              label: "Hooks",
              values: {
                fit: "Component-facing orchestration and reusable UI state logic.",
                risk: "Becoming a vague dumping ground for business rules and side effects.",
              },
            },
            {
              label: "Services or domain modules",
              values: {
                fit: "Pure business rules, API coordination, and logic that should outlive one component tree.",
                risk: "Hidden mutable state or service layers that just wrap fetch without adding boundaries.",
              },
            },
            {
              label: "Context",
              values: {
                fit: "Dependency injection or stable shared values such as theme, auth session, or feature services.",
                risk: "Acting like a free global store and coupling unrelated features together.",
              },
            },
            {
              label: "Data layer abstractions",
              values: {
                fit: "Server state, cache invalidation, and fetch orchestration.",
                risk: "Mixing server cache with client workflow state until nothing has a clear owner.",
              },
            },
          ]}
        />

        <SectionHeader>Scale Means Ownership And Testability</SectionHeader>
        <Paragraph>
          Scalability is not only performance. It includes onboarding cost,
          release safety, testability, and whether teams can change one product
          area without tangling several others.
        </Paragraph>
        <Callout variant="tip">
          Strong architecture answers talk about ownership boundaries, shared UI
          criteria, and how to stop cross-feature dependencies from becoming a
          mesh.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How would you organize a large React app so cross-feature dependencies do not become tangled?",
              "When should logic live in a custom hook versus a domain service or data-layer abstraction?",
              "How do shared UI libraries help, and when do they turn into a bottleneck?",
              "What changes when the React app is split across several teams or a monorepo?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactArchitecture;
