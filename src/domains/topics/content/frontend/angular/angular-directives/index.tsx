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
          description="Directives extend template behavior. In Angular 20+, control flow is typically written with block syntax like `@if`, `@for`, and `@switch`, while attribute directives still modify an existing host element."
        />

        <CollapsibleSection title="Structural vs Attribute Directives" collapsible={false}>
          <CodeBlock
            language="html"
            code={`@if (isLoading) {
  <p>Loading...</p>
} @else {
  <ul>
    @for (user of users; track user.id) {
      <li>{{ user.name }}</li>
    }
  </ul>
}

<div [ngClass]="{ selected: isSelected }"></div>
<button [ngStyle]="{ color: danger ? 'red' : 'black' }"></button>`}
          />
          <Paragraph>
            `@if` and `@for` are the modern control-flow primitives for
            conditional and repeated rendering. `ngClass` and `ngStyle` remain
            attribute directives because they modify an existing element rather
            than controlling whether Angular creates a block of UI.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>What Interviewers Usually Ask</SectionHeader>

        <CollapsibleSection title="How Angular 20+ Control Flow Works">
          <Paragraph>
            In modern Angular, `@if`, `@for`, and `@switch` compile into view
            creation logic without the older `*` microsyntax. The core idea is
            still the same: Angular creates, updates, or removes embedded views
            based on control flow rather than merely toggling CSS visibility.
          </Paragraph>
          <CodeBlock
            language="html"
            code={`@switch (status) {
  @case ("idle") {
    <p>Idle</p>
  }
  @case ("loading") {
    <p>Loading...</p>
  }
  @default {
    <p>Done</p>
  }
}`}
          />
          <Paragraph>
            You still use `ng-container` when you want grouping without adding
            an extra DOM element, but the old rule about stacking multiple
            structural directives on one host is no longer the main thing to
            memorize for interview answers.
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

        <CollapsibleSection title="Modern Template Control Flow and Readability Tradeoffs" collapsible={false}>
          <BulletList
            items={[
              "`@if`, `@for`, and `@switch` make template logic read more like explicit control flow and avoid much of the old microsyntax confusion.",
              "`@for` should usually include a `track` expression so Angular can update list items predictably and efficiently.",
              "Even with cleaner syntax, too much branching and looping directly in a template can still make it hard to scan.",
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
              "What changed with Angular's modern `@if`, `@for`, and `@switch` syntax compared with legacy structural directives?",
              "Why is the `track` expression important in `@for` blocks?",
              "When does a custom directive help readability, and when does it make templates harder to understand?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Describing `@if` as only CSS-style hiding instead of conditional view creation.",
              "Answering with only legacy `*ngIf` and `*ngFor` syntax when the team is using modern Angular.",
              "Forgetting `track` in `@for` examples or not being able to explain why stable identity matters.",
              "Ignoring `@switch` and `@else` when they make template intent clearer.",
              "Ignoring custom directives as a way to reuse DOM behavior.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularDirectives;
