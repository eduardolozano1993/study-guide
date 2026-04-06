import {
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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using HttpClient directly in components everywhere.</li>
            <li>Treating HttpClient responses like promises without discussing observables.</li>
            <li>Ignoring interceptors and centralized error handling.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularHttpClient;
