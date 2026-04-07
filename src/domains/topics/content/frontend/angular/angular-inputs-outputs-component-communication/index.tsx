import {
  BulletList,
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

        <CollapsibleSection title="Choosing Between Inputs/Outputs, Services, and Store" collapsible={false}>
          <BulletList
            items={[
              "Inputs and outputs are ideal when the parent already owns the state and the relationship is direct.",
              "A shared service is better when siblings or nearby feature parts need coordination without prop drilling through unrelated wrappers.",
              "Route-level or feature-level state containers become more appropriate when communication starts spanning many branches and ownership is no longer local.",
              "If every presentational wrapper forwards the same inputs and outputs, the architecture is signaling that state probably lives too high or in the wrong place.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Failure Modes" collapsible={false}>
          <BulletList
            items={[
              "Long event chains can make debugging ownership and timing difficult.",
              "A shared service can quietly become hidden global state if everything starts writing to it.",
              "Smart-versus-presentational splits help when you want easier testing and clearer ownership boundaries.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When are inputs and outputs enough, and when would you move to a shared service?",
              "What smell tells you prop drilling through wrappers is becoming a problem?",
              "How do smart and presentational components affect communication design?",
              "When does route-level state make more sense than component-level event chains?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Using outputs for broad shared state when a service is the better fit.",
              "Confusing `EventEmitter` with a general-purpose RxJS event bus.",
              "Not explaining how communication changes when components are not directly related.",
              "Letting a shared service become hidden mutable global state.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularInputsOutputsComponentCommunication;
