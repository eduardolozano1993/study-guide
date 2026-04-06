import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularReactiveFormsValidationLesson } from "./meta";

export function AngularReactiveFormsValidation() {
  return (
    <TopicLessonPage
      title={angularReactiveFormsValidationLesson.title}
      summary={angularReactiveFormsValidationLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularReactiveFormsValidationLesson.estimatedReadingTimeMinutes}
      difficulty={angularReactiveFormsValidationLesson.difficulty}
      relatedTopics={[
        { label: "Components, Templates, and Data Binding", href: "/topic/angular-components-templates-data-binding" },
        { label: "Services", href: "/topic/angular-services" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Reactive Forms and Validations"
          description="Reactive forms model form state in TypeScript, which makes validation, dynamic controls, and testing easier to reason about."
        />

        <CollapsibleSection title="Building a Reactive Form" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`form = new FormGroup({
  email: new FormControl("", [Validators.required, Validators.email]),
  password: new FormControl("", [Validators.required, Validators.minLength(12)]),
});`}
          />
          <Paragraph>
            Reactive forms give you direct programmatic control over form state,
            validation, and nested structures.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Validation Thinking</SectionHeader>

        <CollapsibleSection title="Built-In and Custom Validators" collapsible={false}>
          <Paragraph>
            Angular interviews often compare reactive forms to template-driven
            forms and ask why reactive forms scale better for complex flows,
            dynamic controls, and custom validators.
          </Paragraph>
          <Callout variant="tip">
            Be ready to explain form controls, form groups, validators, and how
            custom validators fit into the model.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Describing reactive forms only as "forms in TypeScript".</li>
            <li>Ignoring nested groups, dynamic controls, and validation state.</li>
            <li>Not distinguishing form validity from when and how validation messages are shown.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularReactiveFormsValidation;
