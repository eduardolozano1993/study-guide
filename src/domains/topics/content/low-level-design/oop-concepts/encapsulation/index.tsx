import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  SubHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { encapsulationLesson } from "./meta";

const bankAccountExample = `class BankAccount {
  private balanceInCents = 0;

  deposit(amountInCents: number) {
    if (amountInCents <= 0) {
      throw new Error("Deposit amount must be positive");
    }

    this.balanceInCents += amountInCents;
  }

  withdraw(amountInCents: number) {
    if (amountInCents <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }

    if (amountInCents > this.balanceInCents) {
      throw new Error("Insufficient funds");
    }

    this.balanceInCents -= amountInCents;
  }

  getBalance() {
    return this.balanceInCents;
  }
}`;

const badExample = `class BankAccount {
  public balanceInCents = 0;
}

const account = new BankAccount();
account.balanceInCents = -5000;`;

const getterSetterExample = `class Temperature {
  #celsius = 0;

  get celsius() {
    return this.#celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature cannot go below absolute zero");
    }

    this.#celsius = value;
  }
}`;

export function Encapsulation() {
  return (
    <TopicLessonPage
      title={encapsulationLesson.title}
      summary={encapsulationLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={encapsulationLesson.estimatedReadingTimeMinutes}
      difficulty={encapsulationLesson.difficulty}
      relatedTopics={[
        { label: "Abstraction", href: "/topic/abstraction" },
        { label: "Inheritance", href: "/topic/inheritance" },
        { label: "Polymorphism", href: "/topic/polymorphism" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🔒"
          title="Protect State and Invariants"
          description="Encapsulation keeps data together with the methods that manage it, so objects can enforce valid transitions instead of letting any caller mutate state freely."
        />

        <CollapsibleSection title="What Encapsulation Means" collapsible={false}>
          <Paragraph>
            Encapsulation is the practice of bundling state with the behavior
            that operates on it and restricting direct access to that state when
            unrestricted access would break the object&apos;s rules.
          </Paragraph>
          <Paragraph>
            The goal is not secrecy for its own sake. The goal is to preserve
            invariants, such as a bank balance never becoming negative or an
            order only moving through valid status transitions.
          </Paragraph>
          <Callout variant="tip">
            If external code can change an object into an invalid state,
            encapsulation is weak.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Why It Matters" collapsible={false}>
          <Paragraph>
            Strong encapsulation reduces bugs by centralizing validation and
            business rules. Instead of scattering checks across controllers,
            services, and UI code, the object protects itself.
          </Paragraph>

          <SubHeader>Typical Benefits</SubHeader>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Invariants are enforced in one place.</li>
            <li>Callers work with explicit operations instead of raw mutation.</li>
            <li>Internal representation can change with less external impact.</li>
            <li>Objects become easier to reason about and test.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="Encapsulated State" collapsible={false}>
          <Paragraph>
            This account object hides its balance and only permits updates
            through methods that validate the change.
          </Paragraph>
          <CodeBlock language="ts" code={bankAccountExample} />
          <Paragraph>
            The account stays valid because every state change goes through
            `deposit` or `withdraw`, where the rules are enforced.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="What Weak Encapsulation Looks Like" collapsible={false}>
          <Paragraph>
            Exposing mutable fields directly makes it easy for callers to bypass
            rules and create invalid state.
          </Paragraph>
          <CodeBlock language="ts" code={badExample} />
          <Callout variant="warning">
            Public writable fields are often fine for simple data structures,
            but they are risky when the type is supposed to protect business
            rules.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Language Tools</SectionHeader>

        <CollapsibleSection title="private, protected, and #fields" collapsible={false}>
          <Paragraph>
            TypeScript supports `private` and `protected`, and modern
            JavaScript also supports `#private` fields. They help communicate
            and enforce which parts of a class are internal.
          </Paragraph>
          <CodeBlock language="ts" code={getterSetterExample} />
          <Paragraph>
            Getters and setters are useful when reading or writing a value
            requires validation or transformation. They are not mandatory for
            every property.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Encapsulation vs Abstraction" collapsible={false}>
          <Paragraph>
            Encapsulation is about controlling access to state and behavior.
            Abstraction is about exposing the right level of conceptual detail.
            They often work together but solve different design problems.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Common Mistakes</SectionHeader>

        <CollapsibleSection title="Misunderstandings to Avoid">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using getters and setters mechanically for every field.</li>
            <li>Exposing collections directly so callers can mutate internal state.</li>
            <li>Putting validation in callers instead of the object that owns the rule.</li>
            <li>Confusing encapsulation with simply making everything private.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Encapsulation Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Encapsulation:
- Keep state with the behavior that manages it
- Restrict invalid direct mutation

In practice:
- Hide mutable internals
- Expose intention-revealing methods
- Enforce invariants inside the object

Goal:
- Make invalid states harder to represent`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Encapsulation;
