import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularDependencyInjectionLesson } from "./meta";

export function AngularDependencyInjection() {
  return (
    <TopicLessonPage
      title={angularDependencyInjectionLesson.title}
      summary={angularDependencyInjectionLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularDependencyInjectionLesson.estimatedReadingTimeMinutes}
      difficulty={angularDependencyInjectionLesson.difficulty}
      relatedTopics={[
        { label: "Services", href: "/topic/angular-services" },
        { label: "Angular Architecture", href: "/topic/angular-architecture" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Dependency Injection"
          description="Angular uses dependency injection to provide services and other dependencies without manually instantiating them inside components."
        />

        <CollapsibleSection title="Injecting Services" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`@Injectable({ providedIn: "root" })
export class UserService {}

@Component({ selector: "app-user-list", template: "" })
export class UserListComponent {
  constructor(private readonly userService: UserService) {}
}`}
          />
          <Paragraph>
            Angular's injector resolves dependencies based on configured
            providers. Components declare what they need; they do not create it
            directly.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Why DI Matters</SectionHeader>

        <CollapsibleSection title="Provider Scope and Testability" collapsible={false}>
          <Paragraph>
            DI improves separation of concerns and testing because dependencies
            can be replaced with mocks or alternate providers. Provider scope
            also determines whether a service is effectively shared or local to
            part of the component tree.
          </Paragraph>
          <Callout variant="tip">
            A strong interview answer mentions both inversion of control and
            provider scope, not just constructor syntax.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Reducing DI to "constructor injection" only.</li>
            <li>Ignoring provider scopes such as root vs local providers.</li>
            <li>Not connecting DI to testability and decoupling.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularDependencyInjection;
