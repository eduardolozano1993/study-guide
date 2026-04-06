import {
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularRoutingLesson } from "./meta";

export function AngularRouting() {
  return (
    <TopicLessonPage
      title={angularRoutingLesson.title}
      summary={angularRoutingLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularRoutingLesson.estimatedReadingTimeMinutes}
      difficulty={angularRoutingLesson.difficulty}
      relatedTopics={[
        { label: "Angular Architecture", href: "/topic/angular-architecture" },
        { label: "Signals and Standalone Components", href: "/topic/angular-signals-standalone-components" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Routing"
          description="Angular routing maps URLs to views, supports nested feature navigation, and provides parameters, guards, lazy loading, and navigation APIs."
        />

        <CollapsibleSection title="Defining Routes" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "topics/:id", component: TopicDetailComponent },
];`}
          />
          <Paragraph>
            Angular routes describe how URLs map to components or lazy-loaded
            features. This becomes a major part of application architecture in
            non-trivial apps.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Common Routing Concerns</SectionHeader>

        <CollapsibleSection title="Parameters, Guards, and Lazy Loading" collapsible={false}>
          <Paragraph>
            Interviewers commonly ask how Angular handles route parameters,
            child routes, guards, resolvers, and lazy loading. You should be
            able to explain these as tools for navigation, access control, and
            feature partitioning.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Treating routing as only URL-to-component mapping.</li>
            <li>Ignoring lazy loading as an architectural and performance tool.</li>
            <li>Not knowing where guards or resolvers fit into the route lifecycle.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularRouting;
