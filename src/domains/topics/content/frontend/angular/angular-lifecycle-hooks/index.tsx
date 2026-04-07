import {
  BulletList,
  CodeBlock,
  CollapsibleSection,
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
          description="Lifecycle hooks let Angular components react at predictable points such as initialization, input changes, view creation, and teardown."
        />

        <CollapsibleSection title="Common Hooks" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`export class UserListComponent implements OnInit, OnDestroy {
  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}`}
          />
          <Paragraph>
            Interviewers usually ask when to use `ngOnInit`, `ngOnChanges`, and
            `ngOnDestroy`, especially for data loading, reacting to input
            changes, and cleanup.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Practical Usage</SectionHeader>

        <CollapsibleSection title="Initialization vs Input Change Logic">
          <Paragraph>
            `ngOnInit` is a good place for initialization that depends on the
            component existing. `ngOnChanges` is for responding specifically to
            input changes. Mixing these concerns is a common source of confusion.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Cleanup Matters">
          <Paragraph>
            `ngOnDestroy` is critical when you manage subscriptions, timers, or
            DOM listeners manually. Failing to clean up creates leaks and stale
            updates.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Beyond the Three Common Hooks" collapsible={false}>
          <BulletList
            items={[
              "`ngAfterViewInit` is for logic that needs the component view or view children to exist first.",
              "`ngAfterContentInit` matters when projected content changes what the component can access or measure.",
              "Touching view-dependent APIs too early is a common cause of undefined references or timing bugs.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Cleanup Patterns and Hook Selection" collapsible={false}>
          <BulletList
            items={[
              "`takeUntilDestroyed` is often a clearer modern cleanup pattern than manual subscription bookkeeping.",
              "Memory leaks are not only forgotten `unsubscribe` calls. They also include stale timers, listeners, and async flows that keep updating dead views.",
              "If logic depends on changing inputs, `ngOnChanges` is usually more precise than `ngOnInit`.",
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
