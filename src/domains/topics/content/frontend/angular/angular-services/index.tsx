import {
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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Putting all app state into one oversized service.</li>
            <li>Using components for data fetching instead of centralizing that logic in services.</li>
            <li>Describing services as only wrappers around HttpClient.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularServices;
