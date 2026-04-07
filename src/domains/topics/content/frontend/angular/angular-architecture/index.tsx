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
import { angularArchitectureLesson } from "./meta";

export function AngularArchitecture() {
  return (
    <TopicLessonPage
      title={angularArchitectureLesson.title}
      summary={angularArchitectureLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularArchitectureLesson.estimatedReadingTimeMinutes}
      difficulty={angularArchitectureLesson.difficulty}
      relatedTopics={[
        { label: "Components, Templates, and Data Binding", href: "/topic/angular-components-templates-data-binding" },
        { label: "Dependency Injection", href: "/topic/angular-dependency-injection" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Angular Architecture"
          description="Angular is a batteries-included framework built around components, templates, services, dependency injection, routing, and a structured application bootstrap process."
        />

        <CollapsibleSection title="How Angular Apps Are Structured" collapsible={false}>
          <Paragraph>
            Angular applications are usually organized around feature areas.
            Components own UI, templates declare markup, services hold shared
            logic, the router handles navigation, and dependency injection wires
            everything together without manual construction.
          </Paragraph>
          <CodeBlock
            language="typescript"
            code={`bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});`}
          />
          <Callout variant="tip">
            In interviews, explain Angular as a full framework with strong
            opinions around DI, forms, HTTP, and routing, not just as a view
            layer.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Core Building Blocks</SectionHeader>

        <CollapsibleSection title="Components, Services, and Router" collapsible={false}>
          <Paragraph>
            Components render views. Services encapsulate reusable behavior and
            side effects. The router maps URLs to views. Together they form the
            default architectural backbone of most Angular apps.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`App bootstrap
-> router selects a feature view
-> component renders template
-> component injects services
-> services fetch or coordinate data
-> view updates through Angular reactivity`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="NgModules vs Modern Standalone APIs">
          <Paragraph>
            Older Angular apps are often organized around NgModules. Modern
            Angular increasingly favors standalone components and provider-based
            bootstrap. Interviewers may ask whether you understand both.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Scaling Decisions</SectionHeader>

        <CollapsibleSection title="Feature Boundaries, Monorepos, and Shared Libraries" collapsible={false}>
          <BulletList
            items={[
              "Strong Angular architecture usually follows feature boundaries first, not technical folders only.",
              "Shared libraries are useful for stable cross-cutting primitives, but a 'shared-everything' module quickly becomes a dumping ground with unclear ownership.",
              "In a monorepo, teams need boundaries for domain logic, UI primitives, and infrastructure so features do not reach through each other casually.",
              "Architecture is partly about team ownership: lazy boundaries, testability, and release independence often matter as much as code organization.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Standalone Migration and Lazy Boundaries" collapsible={false}>
          <BulletList
            items={[
              "Migrating from NgModules to standalone APIs can simplify bootstrap and local feature composition.",
              "That migration is not always urgent. Legacy consistency can be a reasonable tradeoff if the team has stable patterns and higher-priority work.",
              "Lazy-loading boundaries should follow product slices and ownership boundaries, not arbitrary file groupings.",
              "Cross-feature dependencies should flow through explicit contracts instead of importing internals across lazy boundaries.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How would you organize a large Angular monorepo without creating a giant shared library nobody owns?",
              "When would you migrate an existing NgModule-heavy app to standalone APIs, and when would you not?",
              "How do lazy-loading boundaries affect startup cost, testing, and team ownership?",
              "What architectural smell tells you a feature boundary is too porous?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Describing Angular as only a component framework.",
              "Ignoring dependency injection as a core architectural feature.",
              "Not distinguishing app bootstrap, routing, and feature composition.",
              "Treating shared libraries as always good without discussing ownership and coupling costs.",
              "Assuming standalone components mean Angular no longer has structure.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularArchitecture;
