import {
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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Describing OnPush as "only rerender on input change" without mentioning events and explicit triggers.</li>
            <li>Ignoring the relationship between change detection and immutable state updates.</li>
            <li>Not connecting signals to Angular's modern reactivity story.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularChangeDetection;
