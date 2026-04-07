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
import { angularSignalsStandaloneComponentsLesson } from "./meta";

export function AngularSignalsStandaloneComponents() {
  return (
    <TopicLessonPage
      title={angularSignalsStandaloneComponentsLesson.title}
      summary={angularSignalsStandaloneComponentsLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularSignalsStandaloneComponentsLesson.estimatedReadingTimeMinutes}
      difficulty={angularSignalsStandaloneComponentsLesson.difficulty}
      relatedTopics={[
        { label: "Change Detection", href: "/topic/angular-change-detection" },
        { label: "RxJS Basics", href: "/topic/angular-rxjs-basics" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Signals and Standalone Components"
          description="Modern Angular emphasizes standalone APIs and signals to simplify application structure and reactive state modeling."
        />

        <CollapsibleSection title="Standalone Components" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`@Component({
  selector: "app-counter",
  standalone: true,
  template: \`<button (click)="increment()">{{ count() }}</button>\`,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}`}
          />
          <Paragraph>
            Standalone components reduce reliance on NgModules for component
            composition, while signals provide explicit reactive state reads and
            writes.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Signals vs RxJS</SectionHeader>

        <CollapsibleSection title="When Each Tool Fits Better" collapsible={false}>
          <Paragraph>
            Signals are great for local reactive state and computed values in a
            component-driven model. RxJS remains stronger for asynchronous
            streams, cancellation, combination of external events, and complex
            operator pipelines.
          </Paragraph>
          <Callout variant="tip">
            A strong interview answer can explain when signals are simpler than
            RxJS and when streams are still the better fit.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Signal Primitives and Common Mistakes" collapsible={false}>
          <BulletList
            items={[
              "Writable signals hold mutable state, computed signals derive values, and effects react to changes with side effects.",
              "Effects are for side effects, not for derivation that should really be a computed value.",
              "Feedback loops can appear when an effect writes to the same state graph it depends on without clear boundaries.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Migration and Interop" collapsible={false}>
          <BulletList
            items={[
              "Signals and RxJS interoperate, so migration can be incremental rather than a rewrite.",
              "Replacing every observable-based state flow with signals is not automatically a win if the problem is really asynchronous composition or cancellation.",
              "Standalone APIs simplify composition, but teams still need architectural conventions for imports, providers, and route boundaries.",
              "A zoneless future changes some automatic assumptions, which makes explicit reactive dependencies more important.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Would you replace an existing observable-based state flow with signals? Why or why not?",
              "What is the difference between a computed signal and an effect?",
              "How do signals and RxJS complement each other instead of simply competing?",
              "What changes in Angular architecture when standalone APIs and a zoneless future are part of the conversation?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              "Treating signals as a full replacement for RxJS.",
              'Describing standalone components as "Angular without modules" without explaining composition benefits.',
              "Using effects for derivation instead of side effects.",
              "Ignoring how signals affect modern Angular change detection patterns.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularSignalsStandaloneComponents;
