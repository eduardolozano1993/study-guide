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

        <CollapsibleSection title="Custom Directives Matter in Real Apps" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`@Directive({
  selector: "[appAutofocus]",
})
export class AutofocusDirective {
  @HostBinding("attr.data-ready") ready = "true";

  @HostListener("focus")
  onFocus() {
    console.log("focused");
  }
}`}
          />
          <Paragraph>
            Custom directives are useful when you want reusable DOM behavior
            without wrapping everything in extra components. Focus behavior,
            permissions, keyboard shortcuts, and analytics hooks are common
            examples.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Structural Microsyntax and Readability Tradeoffs" collapsible={false}>
          <BulletList
            items={[
              "Only one structural directive can sit on the same host element, which is why `ng-container` often becomes the extra wrapper boundary.",
              "The microsyntax is concise, but too much hidden control flow in a template can become hard to scan.",
              "Directives are better than wrapper components when the main concern is behavior on an existing host element rather than new structure.",
            ]}
          />
          <Callout variant="warning">
            A reusable directive is powerful, but it can also hide too much
            behavior if the template stops being obvious to the reader.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When is a directive better than a wrapper component?",
              "How would you implement reusable focus or permission behavior?",
              "Why can only one structural directive live directly on a host element?",
              "When does a custom directive help readability, and when does it make templates harder to understand?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Describing `*ngIf` as only CSS-style hiding instead of conditional view creation.",
              "Not knowing why structural directives use the `*` microsyntax.",
              "Ignoring `ng-container` when multiple structural concerns need composition.",
              "Ignoring custom directives as a way to reuse DOM behavior.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularDirectives;
