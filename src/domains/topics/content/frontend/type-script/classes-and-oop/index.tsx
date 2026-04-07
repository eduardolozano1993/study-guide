import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { classesAndOopLesson } from "./meta";

export function ClassesAndOop() {
  return (
    <TopicLessonPage
      title={classesAndOopLesson.title}
      summary={classesAndOopLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={classesAndOopLesson.estimatedReadingTimeMinutes}
      difficulty={classesAndOopLesson.difficulty}
      relatedTopics={[
        { label: "Interfaces vs Types", href: "/topic/typescript-interfaces-vs-types" },
        { label: "Senior-Level Judgment", href: "/topic/typescript-senior-level-judgment" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Classes and OOP Typing"
          description="Senior candidates should know class features, but also when classes are the wrong default. In TypeScript, classes are runtime constructs living inside a mostly structural type system."
        />

        <SectionHeader>Classes Exist at Runtime</SectionHeader>
        <Paragraph>
          TypeScript supports classes because JavaScript does. That matters
          because class fields, inheritance, private fields, and emitted
          JavaScript all have runtime consequences, while interfaces and type
          aliases do not.
        </Paragraph>
        <CollapsibleSection title="Abstract class example" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`abstract class PaymentProcessor {
  constructor(protected readonly merchantId: string) {}

  abstract charge(amount: number): Promise<void>;
}

class StripeProcessor extends PaymentProcessor {
  async charge(amount: number) {
    console.log(this.merchantId, amount);
  }
}`}
          />
        </CollapsibleSection>

        <SectionHeader>implements Is Compile-Time Only</SectionHeader>
        <CodeBlock
          language="typescript"
          code={`interface Cache {
  get(key: string): string | undefined;
  set(key: string, value: string): void;
}

class MemoryCache implements Cache {
  private store = new Map<string, string>();

  get(key: string) {
    return this.store.get(key);
  }

  set(key: string, value: string) {
    this.store.set(key, value);
  }
}`}
        />
        <Paragraph>
          `implements` checks compatibility during compilation. It does not
          enforce anything at runtime, and it does not turn TypeScript into a
          nominal type system.
        </Paragraph>

        <SectionHeader>Inheritance vs Composition</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "fit", label: "Good fit" },
            { key: "risk", label: "Common risk" },
          ]}
          rows={[
            {
              label: "Inheritance",
              values: {
                fit: "Stable specialization hierarchy with shared lifecycle or protected hooks.",
                risk: "Rigid coupling and accidental base-class complexity.",
              },
            },
            {
              label: "Composition",
              values: {
                fit: "Frontend services, state machines, and UI behaviors assembled from smaller pieces.",
                risk: "Slightly more wiring, but usually clearer long-term boundaries.",
              },
            },
          ]}
        />

        <BulletList
          items={[
            "Private and protected members affect assignability and emitted code differently than plain object types.",
            "Classes can feel nominal, but many assignability rules in TypeScript still follow structure.",
            "Composition is often a better default for frontend architecture because reuse and testing stay more flexible.",
            "If you reach for inheritance only to share a few helper methods, it is usually the wrong abstraction.",
          ]}
        />
        <Callout variant="warning">
          A common interview mistake is assuming classes automatically bring
          strong runtime enforcement or nominal typing. TypeScript is much more
          nuanced than that.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why is `implements` not runtime enforcement?",
              "How do private or protected members change assignability?",
              "When would composition beat inheritance in frontend code?",
              "Why can classes feel nominal even though TypeScript is mostly structural?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ClassesAndOop;
