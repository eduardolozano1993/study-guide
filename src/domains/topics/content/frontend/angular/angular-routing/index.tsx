import {
  BulletList,
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

        <CollapsibleSection title="Route Boundaries Are Architectural Boundaries" collapsible={false}>
          <BulletList
            items={[
              "Guards control navigation, resolvers prepare route data, and preload strategies trade startup cost against later navigation speed.",
              "Lazy-loaded routes are not only a performance feature. They also help enforce feature ownership and dependency boundaries.",
              "Nested child routes can mirror UI shells and preserve context, but they can also create confusing ownership if overused.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Edge Cases" collapsible={false}>
          <BulletList
            items={[
              "Route reuse can keep components alive longer than expected, which affects state lifetime.",
              "Cancelled navigations and resolver failures need explicit reasoning so UX does not feel broken.",
              "Client-side route protection is not the same thing as real authorization on the backend.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When would you put data loading in a resolver versus in the component or service?",
              "How do lazy-loaded routes change architecture beyond bundle size?",
              "Why is a route guard not a substitute for actual authorization?",
              "How would you structure routing in a large app with nested sections and distinct ownership boundaries?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Treating routing as only URL-to-component mapping.",
              "Ignoring lazy loading as an architectural and performance tool.",
              "Not knowing where guards or resolvers fit into the route lifecycle.",
              "Confusing UX route protection with real authorization.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularRouting;
