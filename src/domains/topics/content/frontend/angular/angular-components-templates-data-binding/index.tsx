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
import { angularComponentsTemplatesDataBindingLesson } from "./meta";

export function AngularComponentsTemplatesDataBinding() {
  return (
    <TopicLessonPage
      title={angularComponentsTemplatesDataBindingLesson.title}
      summary={angularComponentsTemplatesDataBindingLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularComponentsTemplatesDataBindingLesson.estimatedReadingTimeMinutes}
      difficulty={angularComponentsTemplatesDataBindingLesson.difficulty}
      relatedTopics={[
        { label: "Directives", href: "/topic/angular-directives" },
        { label: "Inputs, Outputs, and Component Communication", href: "/topic/angular-inputs-outputs-component-communication" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Components, Templates, and Data Binding"
          description="Angular components own state and behavior, while templates render that state through declarative binding syntax."
        />

        <CollapsibleSection title="Component and Template Relationship" collapsible={false}>
          <Paragraph>
            A component class contains state and methods. The template declares
            how that state should appear in the DOM. Angular keeps them in sync
            through change detection and binding expressions.
          </Paragraph>
          <CodeBlock
            language="typescript"
            code={`@Component({
  selector: "app-user-card",
  template: \`
    <h2>{{ user.name }}</h2>
    <button [disabled]="isSaving" (click)="save()">Save</button>
    <input [(ngModel)]="search" />
  \`,
})
export class UserCardComponent {
  user = { name: "Ada" };
  isSaving = false;
  search = "";

  save() {}
}`}
          />
        </CollapsibleSection>

        <SectionHeader>Binding Types</SectionHeader>

        <CollapsibleSection title="Interpolation, Property, Event, and Two-Way Binding" collapsible={false}>
          <Paragraph>
            Interpolation renders text, property binding sets DOM properties,
            event binding reacts to user interaction, and two-way binding keeps
            view and component state synchronized.
          </Paragraph>
          <Callout variant="tip">
            Use interpolation for text, property binding for DOM properties, and
            event binding for interaction. Two-way binding is convenient, but it
            should not replace clear state ownership.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Binding Tradeoffs Are About Clarity and Ownership" collapsible={false}>
          <BulletList
            items={[
              "Interpolation is best for plain text output with minimal template logic.",
              "Property binding is clearer when you are expressing DOM state such as `disabled`, `value`, or ARIA properties.",
              "Event binding is the right boundary for user intent because state changes stay explicit in the component class.",
              "`[(ngModel)]` is convenient for simple forms, but one-way data flow is often easier to reason about in complex screens.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Template Cost and Correctness Traps" collapsible={false}>
          <CodeBlock
            language="html"
            code={`<!-- risky when expensive or stateful -->
<div>{{ computeExpensiveSummary() }}</div>

<!-- usually clearer -->
<div>{{ summary }}</div>`}
          />
          <BulletList
            items={[
              "Calling methods from templates can cause repeated recomputation during change detection.",
              "Dense expressions in templates make ownership and debugging harder.",
              "Two-way binding can blur the boundary between form state, component state, and domain state when the form grows complex.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When is `[(ngModel)]` appropriate, and when is one-way data flow clearer?",
              "What is the practical difference between interpolation and property binding?",
              "Why can template method calls become a performance or correctness problem?",
              "How do your binding choices affect state ownership in a large form or feature?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Confusing DOM attributes with DOM properties.",
              "Using two-way binding everywhere without explaining state flow.",
              "Forgetting that templates execute expressions within Angular change detection.",
              "Calling methods freely from templates without discussing recomputation cost.",
              "Putting too much business logic directly in template expressions.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularComponentsTemplatesDataBinding;
