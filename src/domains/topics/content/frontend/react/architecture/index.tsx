import {
  CodeBlock,
  CollapsibleSection,
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
          description="Architecture answers should show judgment: how you divide features, where logic lives, and how the codebase stays understandable as teams and requirements grow."
        />

        <SectionHeader>Folder Structure and Feature Boundaries</SectionHeader>
        <Paragraph>
          Folder structure should reflect how the product evolves.
          Feature-oriented organization often scales better than grouping
          everything by technical type because it keeps UI, hooks, tests, and
          domain logic for the same capability together.
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

        <SectionHeader>Separating UI from Business Logic</SectionHeader>
        <Paragraph>
          UI components should focus on presentation and interaction wiring.
          Business rules, orchestration, and data access often belong in hooks,
          services, or domain modules depending on the application shape.
        </Paragraph>
        <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
          <li>Put pure transformations in utility or domain modules.</li>
          <li>Put data coordination in custom hooks or data-layer modules.</li>
          <li>Keep presentational components narrow and predictable.</li>
        </ul>

        <SectionHeader>Scalability Decisions</SectionHeader>
        <Paragraph>
          Scalability is not only performance. It includes onboarding cost,
          release safety, testability, and clarity of ownership across teams.
        </Paragraph>
        <CollapsibleSection title="Good architectural signals">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Feature boundaries align with product workflows.</li>
            <li>Shared code has clear criteria for becoming shared.</li>
            <li>Business logic is not duplicated across page components.</li>
            <li>Cross-cutting concerns such as API clients and logging have explicit homes.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactArchitecture;
