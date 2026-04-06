import {
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
      </div>
    </TopicLessonPage>
  );
}

export default AngularLifecycleHooks;
