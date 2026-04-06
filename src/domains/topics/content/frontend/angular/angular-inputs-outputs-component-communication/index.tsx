import {
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularInputsOutputsComponentCommunicationLesson } from "./meta";

export function AngularInputsOutputsComponentCommunication() {
  return (
    <TopicLessonPage
      title={angularInputsOutputsComponentCommunicationLesson.title}
      summary={angularInputsOutputsComponentCommunicationLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularInputsOutputsComponentCommunicationLesson.estimatedReadingTimeMinutes}
      difficulty={angularInputsOutputsComponentCommunicationLesson.difficulty}
      relatedTopics={[
        { label: "Components, Templates, and Data Binding", href: "/topic/angular-components-templates-data-binding" },
        { label: "Services", href: "/topic/angular-services" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Inputs, Outputs, and Component Communication"
          description="Angular components usually communicate through inputs for incoming data and outputs for outgoing events, with services handling broader shared state."
        />

        <CollapsibleSection title="Parent to Child and Child to Parent" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`@Component({
  selector: "app-user-card",
  template: \`<button (click)="select.emit(userId)">Select</button>\`,
})
export class UserCardComponent {
  @Input() userId!: string;
  @Output() select = new EventEmitter<string>();
}`}
          />
          <Paragraph>
            Inputs pass data down. Outputs emit events up. This keeps parent and
            child responsibilities explicit.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>When Inputs and Outputs Are Not Enough</SectionHeader>

        <CollapsibleSection title="Services for Shared State">
          <Paragraph>
            For sibling communication, global state, caching, or coordination
            across feature boundaries, a shared service is usually cleaner than
            repeatedly threading outputs upward and inputs downward.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using outputs for broad shared state when a service is the better fit.</li>
            <li>Confusing `EventEmitter` with a general-purpose RxJS event bus.</li>
            <li>Not explaining how communication changes when components are not directly related.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularInputsOutputsComponentCommunication;
