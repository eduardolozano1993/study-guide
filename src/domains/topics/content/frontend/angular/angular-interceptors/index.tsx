import {
  BulletList,
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

        <CollapsibleSection title="Ordering, Retry Safety, and Auth Refresh Races" collapsible={false}>
          <BulletList
            items={[
              "Interceptor order matters because each wrapper changes the request and response pipeline seen by the next one.",
              "Blind retry is dangerous for non-idempotent mutations because duplicated writes can create real incidents.",
              "Token refresh flows need coordination so multiple failing requests do not all trigger competing refresh calls.",
              "Auth interceptors also need bypass rules for endpoints like login, refresh, or public assets.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Boundary Discipline" collapsible={false}>
          <BulletList
            items={[
              "Interceptors are good for cross-cutting transport concerns such as auth headers, tracing, normalization, and safe retry policy.",
              "Feature-specific business decisions usually belong in services or domain logic instead.",
              "Route guards handle navigation decisions, not request mutation. Mixing those responsibilities weakens both layers.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why does interceptor ordering matter?",
              "When is retry safe, and when can it create data integrity problems?",
              "How would you handle token refresh without infinite loops or refresh races?",
              "What belongs in an interceptor versus a guard, service, or domain layer?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Using interceptors for feature-specific business logic that belongs in services.",
              "Not understanding that requests are immutable and must be cloned.",
              "Retrying non-idempotent requests without discussing risk.",
              "Ignoring the observable pipeline returned by `next`.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularInterceptors;
