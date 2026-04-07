import {
  BulletList,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularServicesLesson } from "./meta";

export function AngularServices() {
  return (
    <TopicLessonPage
      title={angularServicesLesson.title}
      summary={angularServicesLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularServicesLesson.estimatedReadingTimeMinutes}
      difficulty={angularServicesLesson.difficulty}
      relatedTopics={[
        { label: "Dependency Injection", href: "/topic/angular-dependency-injection" },
        { label: "HTTP Client", href: "/topic/angular-http-client" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Services"
          description="Services encapsulate reusable business logic, shared state, and side effects outside components."
        />

        <CollapsibleSection title="Why Services Exist" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>("/api/users");
  }
}`}
          />
          <Paragraph>
            Services keep components focused on presentation and interaction
            instead of HTTP calls, caching, and domain logic.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>What Good Service Design Looks Like</SectionHeader>

        <CollapsibleSection title="Shared Logic, Not Dumping Ground">
          <Paragraph>
            Good services group related responsibilities. A service should not
            become a random container for unrelated utility methods just because
            it is injectable.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Different Kinds of Services" collapsible={false}>
          <BulletList
            items={[
              "API services focus on transport and backend boundaries.",
              "Domain services hold feature logic and decisions that outgrow a component.",
              "Facade services can simplify complex UI coordination behind a smaller interface.",
              "Utility modules or pure helpers should not automatically become services just because Angular can inject them.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Failure Modes and Ownership" collapsible={false}>
          <BulletList
            items={[
              "A god-service often appears when every feature starts storing state, side effects, and helpers in one injectable class.",
              "Hidden mutable state inside a root service can accidentally become an app-wide store without the discipline of one.",
              "Caching ownership should be explicit: know which layer owns freshness, invalidation, and side-effect timing.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What is the difference between an API service, a domain service, and a facade service?",
              "How do you keep components thin without moving all complexity into one giant service?",
              "Where should caching and side effects live in an Angular feature?",
              "What smells tell you a service has become hidden global state?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Putting all app state into one oversized service.",
              "Using components for data fetching instead of centralizing that logic in services.",
              "Describing services as only wrappers around HttpClient.",
              "Hiding mutable global state inside root services without naming it as a store-like decision.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularServices;
