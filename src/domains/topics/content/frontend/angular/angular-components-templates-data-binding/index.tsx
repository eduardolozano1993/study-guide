import {
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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Confusing DOM attributes with DOM properties.</li>
            <li>Using two-way binding everywhere without explaining state flow.</li>
            <li>Forgetting that templates execute expressions within Angular change detection.</li>
            <li>Putting too much business logic directly in template expressions.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularComponentsTemplatesDataBinding;
