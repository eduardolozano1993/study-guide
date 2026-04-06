import {
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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Describing Angular as only a component framework.</li>
            <li>Ignoring dependency injection as a core architectural feature.</li>
            <li>Not distinguishing app bootstrap, routing, and feature composition.</li>
            <li>Assuming standalone components mean Angular no longer has structure.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularArchitecture;
