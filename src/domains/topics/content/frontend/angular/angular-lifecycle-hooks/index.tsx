import {
  BulletList,
  Callout,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularLifecycleHooksLesson } from "./meta";

export function AngularLifecycleHooks() {
  return (
    <TopicLessonPage
      title={angularLifecycleHooksLesson.title}
      summary={angularLifecycleHooksLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularLifecycleHooksLesson.estimatedReadingTimeMinutes}
      difficulty={angularLifecycleHooksLesson.difficulty}
      relatedTopics={[
        { label: "Change Detection", href: "/topic/angular-change-detection" },
        { label: "Directives", href: "/topic/angular-directives" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Lifecycle Hooks"
          description="Lifecycle hooks let Angular components react at predictable points such as input changes, initialization, content projection, view creation, render completion, and teardown."
        />

        <CollapsibleSection title="Lifecycle Hooks in Execution Order" collapsible={false}>
          <Paragraph>
            This is the execution order interviewers usually expect you to know
            for a component instance. Some hooks run once, some repeat during
            change detection, and render hooks run after Angular flushes DOM
            updates.
          </Paragraph>
          <ComparisonTable
            columns={[
              { key: "when", label: "When It Runs", className: "min-w-56" },
              { key: "description", label: "Short Description", className: "min-w-80" },
            ]}
            rows={[
              {
                label: "1. ngOnChanges",
                values: {
                  when: "Before `ngOnInit`, and again whenever an input changes.",
                  description:
                    "Responds to input changes with access to current and previous values through `SimpleChanges`.",
                },
              },
              {
                label: "2. ngOnInit",
                values: {
                  when: "Once, after the first `ngOnChanges`.",
                  description:
                    "Runs component initialization logic after Angular has set the initial inputs.",
                },
              },
              {
                label: "3. ngDoCheck",
                values: {
                  when: "During every change-detection pass.",
                  description:
                    "Lets you run custom change-detection logic when default checks are not enough.",
                },
              },
              {
                label: "4. ngAfterContentInit",
                values: {
                  when: "Once, after projected content is initialized.",
                  description:
                    "Runs when content projected with `ng-content` becomes available for the first time.",
                },
              },
              {
                label: "5. ngAfterContentChecked",
                values: {
                  when: "After every check of projected content.",
                  description:
                    "Runs after Angular checks projected content for updates.",
                },
              },
              {
                label: "6. ngAfterViewInit",
                values: {
                  when: "Once, after the component view and child views initialize.",
                  description:
                    "Use it when view queries or DOM-dependent logic need the rendered view tree to exist.",
                },
              },
              {
                label: "7. ngAfterViewChecked",
                values: {
                  when: "After every check of the component view and child views.",
                  description:
                    "Runs after Angular checks the component's own view, so heavy logic here is usually a mistake.",
                },
              },
              {
                label: "8. afterNextRender",
                values: {
                  when: "Once, after Angular finishes rendering the next full DOM update.",
                  description:
                    "Modern render hook for one-time post-render work such as measuring layout after the UI is painted.",
                },
              },
              {
                label: "9. afterEveryRender",
                values: {
                  when: "After every render that flushes DOM updates.",
                  description:
                    "Modern render hook for repeated post-render work, but it should stay lightweight.",
                },
              },
              {
                label: "10. ngOnDestroy",
                values: {
                  when: "Once, right before Angular destroys the component.",
                  description:
                    "Final cleanup point for subscriptions, timers, listeners, and other resources tied to the instance.",
                },
              },
            ]}
          />
          <Callout variant="tip">
            `constructor` runs before all of this, but it is not a lifecycle
            hook. Keep it for dependency injection and cheap setup, not
            lifecycle work.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Practical Notes</SectionHeader>

        <CollapsibleSection title="Modern Angular Guidance" collapsible={false}>
          <BulletList
            items={[
              "`takeUntilDestroyed` is often a clearer modern cleanup pattern than manual subscription bookkeeping.",
              "Signal-based state and computed values reduce the amount of code that needs manual hook orchestration.",
              "If code depends on final DOM output rather than only the component instance, prefer render hooks or view hooks over early initialization hooks.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why is this logic in `ngOnChanges` instead of `ngOnInit`?",
              "What breaks if you read or mutate the view too early?",
              "When would you use `ngAfterViewInit` or `ngAfterContentInit`?",
              "How does `takeUntilDestroyed` improve cleanup compared with manual unsubscription?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularLifecycleHooks;
