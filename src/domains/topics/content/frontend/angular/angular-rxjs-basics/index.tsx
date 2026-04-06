import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularRxjsBasicsLesson } from "./meta";

export function AngularRxjsBasics() {
  return (
    <TopicLessonPage
      title={angularRxjsBasicsLesson.title}
      summary={angularRxjsBasicsLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularRxjsBasicsLesson.estimatedReadingTimeMinutes}
      difficulty={angularRxjsBasicsLesson.difficulty}
      relatedTopics={[
        { label: "HTTP Client", href: "/topic/angular-http-client" },
        { label: "Signals and Standalone Components", href: "/topic/angular-signals-standalone-components" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="RxJS Basics"
          description="RxJS is central to Angular because HTTP, forms, router state, and many async flows are exposed as observables."
        />

        <CollapsibleSection title="Observables and Operators" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`this.userService.getUsers().pipe(
  map((users) => users.filter((user) => user.active)),
  catchError((error) => {
    console.error(error);
    return of([]);
  }),
);`}
          />
          <Paragraph>
            Observables represent streams over time, and operators transform,
            combine, or recover from those streams.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Angular-Specific RxJS Thinking</SectionHeader>

        <CollapsibleSection title="Why RxJS Fits Angular" collapsible={false}>
          <Paragraph>
            HttpClient returns observables, form value changes are observable,
            router state can be observed, and Angular templates can consume
            observables with the `async` pipe. That is why RxJS is more than an
            optional library in Angular ecosystems.
          </Paragraph>
          <Callout variant="tip">
            Be ready to explain `pipe`, `map`, `switchMap`, `catchError`, and
            cleanup patterns like `takeUntil` or `async` pipe usage.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Describing observables as just "promises with extra steps".</li>
            <li>Using `subscribe` everywhere instead of composing streams first.</li>
            <li>Ignoring cleanup for long-lived subscriptions.</li>
            <li>Not knowing why `switchMap` is often preferred for request replacement flows.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularRxjsBasics;
