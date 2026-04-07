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
import { abstractionLesson } from "./meta";

const paymentGatewayExample = `interface PaymentGateway {
  charge(amountInCents: number): Promise<string>;
  refund(transactionId: string): Promise<void>;
}

class StripeGateway implements PaymentGateway {
  async charge(amountInCents: number) {
    return \`stripe_\${amountInCents}\`;
  }

  async refund(transactionId: string) {
    console.log("Refunded in Stripe:", transactionId);
  }
}

class CheckoutService {
  constructor(private readonly gateway: PaymentGateway) {}

  async checkout(total: number) {
    return this.gateway.charge(total);
  }
}`;

const abstractClassExample = `abstract class NotificationSender {
  sendWelcome(userEmail: string) {
    const message = this.buildMessage(userEmail);
    this.deliver(userEmail, message);
  }

  protected buildMessage(userEmail: string) {
    return \`Welcome, \${userEmail}!\`;
  }

  protected abstract deliver(to: string, message: string): void;
}

class EmailSender extends NotificationSender {
  protected deliver(to: string, message: string) {
    console.log(\`Email to \${to}: \${message}\`);
  }
}`;

export function Abstraction() {
  return (
    <TopicLessonPage
      title={abstractionLesson.title}
      summary={abstractionLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={abstractionLesson.estimatedReadingTimeMinutes}
      difficulty={abstractionLesson.difficulty}
      relatedTopics={[
        { label: "Encapsulation", href: "/topic/encapsulation" },
        { label: "Inheritance", href: "/topic/inheritance" },
        { label: "Polymorphism", href: "/topic/polymorphism" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🧭"
          title="Focus on What, Not How"
          description="Abstraction defines the behavior a consumer can rely on and hides the internal steps used to achieve it. It reduces mental load and lets implementations evolve safely."
        />

        <CollapsibleSection title="What Abstraction Means" collapsible={false}>
          <Paragraph>
            Abstraction is the practice of exposing only the essential behavior
            of an object or module while hiding the implementation details that
            callers do not need to know.
          </Paragraph>
          <Paragraph>
            In object-oriented design, abstraction gives consumers a stable
            contract. They interact with capabilities such as `charge`,
            `save`, or `render` instead of depending on internal algorithms or
            private state transitions.
          </Paragraph>
          <Callout variant="tip">
            Good abstractions remove irrelevant detail without removing useful
            meaning. If a caller still has to understand internals, the
            abstraction is too leaky.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Why It Matters" collapsible={false}>
          <Paragraph>
            Abstraction supports low-level design by reducing coupling. If code
            depends on a contract rather than a concrete implementation, you can
            swap implementations, test in isolation, and evolve behavior with
            less breakage.
          </Paragraph>

          <SubHeader>Common Benefits</SubHeader>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Consumers learn a smaller, clearer API surface.</li>
            <li>Implementations can change without changing every caller.</li>
            <li>Tests can replace real dependencies with fakes or stubs.</li>
            <li>Responsibilities become easier to separate.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>TypeScript Forms</SectionHeader>

        <CollapsibleSection title="Interfaces as Contracts" collapsible={false}>
          <Paragraph>
            In TypeScript, an interface is one of the clearest ways to model
            abstraction. It tells consumers which operations are available
            without exposing the underlying implementation.
          </Paragraph>
          <CodeBlock language="ts" code={paymentGatewayExample} />
          <Paragraph>
            `CheckoutService` only knows that a gateway can charge and refund.
            It does not need to care whether the real implementation talks to
            Stripe, PayPal, or a test double.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Abstract Classes" collapsible={false}>
          <Paragraph>
            Abstract classes are useful when you want to define a shared
            template plus extension points. They can provide common logic and
            leave selected methods for subclasses to implement.
          </Paragraph>
          <CodeBlock language="ts" code={abstractClassExample} />
          <Callout variant="note">
            Use an interface when you only need a contract. Use an abstract
            class when you need both a contract and reusable base behavior.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Design Guidance</SectionHeader>

        <CollapsibleSection title="How to Recognize a Good Abstraction" collapsible={false}>
          <Paragraph>
            A good abstraction is cohesive, intention-revealing, and stable
            under normal change. Its methods should describe a meaningful
            capability, not mirror internal implementation steps one by one.
          </Paragraph>
          <CodeBlock
            language="ts"
            code={`// Better
interface Cache {
  get(key: string): string | undefined;
  set(key: string, value: string, ttlInSeconds?: number): void;
}

// Too tied to internals
interface CacheInternals {
  hashKey(key: string): number;
  selectBucket(bucketId: number): number;
  updateEvictionList(key: string): void;
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Mistakes">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Creating interfaces for every class even when no abstraction is needed.</li>
            <li>Exposing methods that reveal internal workflow details.</li>
            <li>Making the abstraction so generic that it loses domain meaning.</li>
            <li>Forcing callers to downcast to concrete types to get real work done.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Abstraction Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Abstraction:
- Expose essential behavior
- Hide implementation detail

TypeScript tools:
- interface -> pure contract
- abstract class -> shared logic + extension points

Goal:
- Depend on capabilities, not concrete internals`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Abstraction;
