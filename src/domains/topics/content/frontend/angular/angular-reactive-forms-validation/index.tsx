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

        <CollapsibleSection title="Typed Forms, FormArray, and Cross-Field Rules" collapsible={false}>
          <BulletList
            items={[
              "Typed forms improve safety when large forms evolve and refactors need compiler support.",
              "`FormArray` matters when the form shape is dynamic, such as repeated addresses, aliases, or line items.",
              "Cross-field validation belongs at the right group level when one control depends on another, not only at individual control validators.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Async Validation and `updateOn` Tradeoffs" collapsible={false}>
          <BulletList
            items={[
              "Async validators can race if multiple requests return out of order while the user is still typing.",
              "`updateOn: 'blur'` or `'submit'` can reduce noisy remote validation and improve UX for expensive checks.",
              "Validation strategy should balance fast feedback with not hammering backend services on every keystroke.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why do reactive forms scale better than template-driven forms for complex apps?",
              "When would you reach for `FormArray` or nested `FormGroup`s?",
              "How would you implement cross-field or async validation safely?",
              "What tradeoff changes when you switch validation to `updateOn: 'blur'` or `updateOn: 'submit'`?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              'Describing reactive forms only as "forms in TypeScript".',
              "Ignoring nested groups, dynamic controls, and validation state.",
              "Ignoring async validator races and chatty backend validation.",
              "Not distinguishing form validity from when and how validation messages are shown.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularReactiveFormsValidation;
