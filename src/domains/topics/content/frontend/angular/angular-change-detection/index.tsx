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
import { angularChangeDetectionLesson } from "./meta";

export function AngularChangeDetection() {
  return (
    <TopicLessonPage
      title={angularChangeDetectionLesson.title}
      summary={angularChangeDetectionLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularChangeDetectionLesson.estimatedReadingTimeMinutes}
      difficulty={angularChangeDetectionLesson.difficulty}
      relatedTopics={[
        { label: "Lifecycle Hooks", href: "/topic/angular-lifecycle-hooks" },
        { label: "Signals and Standalone Components", href: "/topic/angular-signals-standalone-components" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Change Detection"
          description="Angular change detection decides when template expressions are re-evaluated and when the view needs to update."
        />

        <CollapsibleSection title="Default vs OnPush" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`@Component({
  selector: "app-user-list",
  template: \`...\`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {}`}
          />
          <Paragraph>
            The key interview distinction is that `OnPush` reduces unnecessary
            checks by relying more on input reference changes, events, and
            explicit update triggers.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Why It Matters</SectionHeader>

        <CollapsibleSection title="Performance and Predictability" collapsible={false}>
          <Paragraph>
            Change detection affects both performance and correctness. Angular
            developers are often expected to understand why immutable updates,
            signals, and `OnPush` can reduce accidental or excessive checks.
          </Paragraph>
          <Callout variant="tip">
            Immutability and OnPush work well together because reference changes
            are easier to detect than in-place mutation.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="What Actually Triggers OnPush Updates" collapsible={false}>
          <BulletList
            items={[
              "Input reference changes can trigger re-evaluation in an `OnPush` child.",
              "Template-originated events still mark the component path for checking.",
              "`async` pipe emissions and signal reads can also cause the view to update when their values change.",
              "Manual APIs like `markForCheck()` or `detectChanges()` exist for cases where Angular cannot infer the right trigger automatically.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Why OnPush Bugs Feel Random" collapsible={false}>
          <BulletList
            items={[
              "Mutating an object in place can leave an `OnPush` child with no new input reference, so the child appears stale.",
              "Zone-related behavior can make some updates feel automatic until a callback happens outside the expected Angular path.",
              "Signals change the conversation because explicit reads establish reactive dependencies in a more predictable way.",
              "If you reach for `ChangeDetectorRef` often, that usually signals a missing state-model or ownership decision upstream.",
            ]}
          />
          <Callout variant="warning">
            `OnPush + mutable object` is a classic source of bugs that look
            intermittent but are really reference-stability problems.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why did this `OnPush` child not update even though the data changed?",
              "When would you call `markForCheck()` instead of `detectChanges()`?",
              "How do signals change the change-detection conversation?",
              "Why do immutable updates pair so naturally with `OnPush`?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              'Describing OnPush as "only rerender on input change" without mentioning events and explicit triggers.',
              "Ignoring the relationship between change detection and immutable state updates.",
              "Blaming Angular when the real bug is in-place mutation under `OnPush`.",
              "Not connecting signals to Angular's modern reactivity story.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularChangeDetection;
