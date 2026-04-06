import {
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularDirectivesLesson } from "./meta";

export function AngularDirectives() {
  return (
    <TopicLessonPage
      title={angularDirectivesLesson.title}
      summary={angularDirectivesLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularDirectivesLesson.estimatedReadingTimeMinutes}
      difficulty={angularDirectivesLesson.difficulty}
      relatedTopics={[
        { label: "Components, Templates, and Data Binding", href: "/topic/angular-components-templates-data-binding" },
        { label: "Lifecycle Hooks", href: "/topic/angular-lifecycle-hooks" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Directives"
          description="Directives extend template behavior. Structural directives change what gets rendered, while attribute directives change how an element behaves or looks."
        />

        <CollapsibleSection title="Structural vs Attribute Directives" collapsible={false}>
          <CodeBlock
            language="html"
            code={`<li *ngFor="let user of users">{{ user.name }}</li>
<p *ngIf="isLoading">Loading...</p>

<div [ngClass]="{ selected: isSelected }"></div>
<button [ngStyle]="{ color: danger ? 'red' : 'black' }"></button>`}
          />
          <Paragraph>
            `*ngIf` and `*ngFor` are structural because they affect embedded
            view creation. `ngClass` and `ngStyle` are attribute directives
            because they modify an existing element.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>What Interviewers Usually Ask</SectionHeader>

        <CollapsibleSection title="How Structural Directives Work">
          <Paragraph>
            Structural directives are syntactic sugar around Angular generating
            or removing views. That is why only one structural directive can be
            applied directly to a single host element without extra wrappers.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Describing `*ngIf` as only CSS-style hiding instead of conditional view creation.</li>
            <li>Not knowing why structural directives use the `*` microsyntax.</li>
            <li>Ignoring custom directives as a way to reuse DOM behavior.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularDirectives;
