import {
  BulletList,
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

        <CollapsibleSection title="Operator Tradeoffs and Stream Types" collapsible={false}>
          <BulletList
            items={[
              "`switchMap` is often best for replacing stale requests, such as typeahead or route-driven loading.",
              "`mergeMap` allows concurrency, `concatMap` preserves order, and `exhaustMap` ignores overlapping triggers until the current one completes.",
              "Hot versus cold streams matter because not every subscription starts the same work or shares the same source.",
              "Subjects are useful, but they are not the default answer for every communication problem.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Cancellation and Cleanup" collapsible={false}>
          <BulletList
            items={[
              "`async` pipe manages subscription lifecycle for template consumption.",
              "`takeUntilDestroyed` or similar teardown patterns help when the stream is consumed imperatively.",
              "Nested subscriptions are usually a sign that composition should happen higher in the stream pipeline.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why is `switchMap` a common choice for request replacement flows?",
              "When would `mergeMap`, `concatMap`, or `exhaustMap` be the safer operator?",
              "What is the difference between a hot and cold observable?",
              "How would you combine route params with remote data without nested subscriptions?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              'Describing observables as just "promises with extra steps".',
              "Using `subscribe` everywhere instead of composing streams first.",
              "Ignoring cleanup for long-lived subscriptions.",
              "Not knowing why `switchMap` is often preferred for request replacement flows.",
              "Using Subjects as a reflex instead of reasoning about ownership and stream shape.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularRxjsBasics;
