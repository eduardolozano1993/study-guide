import {
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

        <CollapsibleSection title="Common Interview Pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Treating signals as a full replacement for RxJS.</li>
            <li>Describing standalone components as "Angular without modules" without explaining composition benefits.</li>
            <li>Ignoring how signals affect modern Angular change detection patterns.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularSignalsStandaloneComponents;
