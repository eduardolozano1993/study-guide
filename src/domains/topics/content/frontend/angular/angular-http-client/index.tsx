import {
  BulletList,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularHttpClientLesson } from "./meta";

export function AngularHttpClient() {
  return (
    <TopicLessonPage
      title={angularHttpClientLesson.title}
      summary={angularHttpClientLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularHttpClientLesson.estimatedReadingTimeMinutes}
      difficulty={angularHttpClientLesson.difficulty}
      relatedTopics={[
        { label: "RxJS Basics", href: "/topic/angular-rxjs-basics" },
        { label: "Interceptors", href: "/topic/angular-interceptors" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="HTTP Client"
          description="Angular's HttpClient provides typed request APIs that return observables and fit naturally into service-based architecture."
        />

        <CollapsibleSection title="Making Requests" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`@Injectable({ providedIn: "root" })
export class TopicsService {
  constructor(private readonly http: HttpClient) {}

  getTopics() {
    return this.http.get<Topic[]>("/api/topics");
  }
}`}
          />
          <Paragraph>
            HttpClient is usually used inside services, not directly in every
            component. That keeps data access consistent and easier to test.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>What Interviewers Usually Expect</SectionHeader>

        <CollapsibleSection title="Observables, Typing, and Error Flow">
          <Paragraph>
            Angular interview answers should mention that HttpClient returns
            observables, supports strong typing, fits into RxJS pipelines, and
            often works with interceptors for auth and cross-cutting behavior.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Typing Is Not Runtime Validation" collapsible={false}>
          <BulletList
            items={[
              "`this.http.get<User>()` tells TypeScript what you expect, but it does not prove the server actually returned that shape.",
              "Senior answers often mention DTO-to-domain mapping or runtime validation at system boundaries.",
              "If the payload shape matters for safety, you usually need validation or normalization before the rest of the app trusts it.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Cancellation, Retry, and Boundary Design" collapsible={false}>
          <BulletList
            items={[
              "Observables make cancellation natural through unsubscription, which matters for fast-changing route or search flows.",
              "Retry and backoff policies should live where the ownership is clear, often in a service or carefully chosen interceptor rather than every component.",
              "Error normalization and DTO mapping are often better handled near the API boundary so the rest of the app sees consistent data and failure shapes.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why does `get<User>()` not guarantee the server response is actually a `User`?",
              "When would you map a DTO into a domain model inside a service?",
              "What belongs in an interceptor versus in the API service itself?",
              "When is returning an observable stream better than hiding everything behind a promise-like abstraction?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Using HttpClient directly in components everywhere.",
              "Treating HttpClient responses like promises without discussing observables.",
              "Assuming TypeScript response types validate payloads at runtime.",
              "Ignoring interceptors and centralized error handling.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularHttpClient;
