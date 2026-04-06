import {
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularInterceptorsLesson } from "./meta";

export function AngularInterceptors() {
  return (
    <TopicLessonPage
      title={angularInterceptorsLesson.title}
      summary={angularInterceptorsLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularInterceptorsLesson.estimatedReadingTimeMinutes}
      difficulty={angularInterceptorsLesson.difficulty}
      relatedTopics={[
        { label: "HTTP Client", href: "/topic/angular-http-client" },
        { label: "Services", href: "/topic/angular-services" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Interceptors"
          description="Interceptors wrap outgoing HTTP requests and incoming responses so cross-cutting concerns stay out of individual services and components."
        />

        <CollapsibleSection title="Common Interceptor Use Cases" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      Authorization: "Bearer token",
    },
  });

  return next(cloned);
};`}
          />
          <Paragraph>
            Interceptors commonly handle auth headers, error normalization,
            request timing, retries, and logging.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Why Interceptors Exist</SectionHeader>

        <CollapsibleSection title="Centralizing Cross-Cutting Concerns">
          <Paragraph>
            Interceptors prevent every service from reimplementing the same
            auth, logging, or response transformation logic. That is why they
            are an architectural feature, not just an HTTP convenience.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using interceptors for feature-specific business logic that belongs in services.</li>
            <li>Not understanding that requests are immutable and must be cloned.</li>
            <li>Ignoring the observable pipeline returned by `next`.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularInterceptors;
