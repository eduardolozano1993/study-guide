import {
  BulletList,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
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
          description="Senior candidates should know class features, but also know when classes are the wrong default for a TypeScript codebase."
        />

        <Paragraph>
          TypeScript supports classes because JavaScript does, but the language
          remains structurally typed. Classes are runtime constructs; interfaces
          and type aliases are not.
        </Paragraph>

        <CollapsibleSection title="Core class features" collapsible={false}>
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

        <CollapsibleSection title="Implements and runtime reality">
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
        </CollapsibleSection>

        <CollapsibleSection title="Interview pitfalls">
          <BulletList
            items={[
              "Assuming classes make TypeScript nominally typed.",
              "Thinking implements provides runtime validation.",
              "Using inheritance for reuse when composition would be simpler.",
              "Forgetting that many frontend problems do not need classes at all.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ClassesAndOop;
