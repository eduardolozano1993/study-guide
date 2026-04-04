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
import { objectOrientedPrinciplesLesson } from "./meta";

const srpBadExample = `class InvoiceService {
  generateInvoice(orderId: string) {
    return { orderId, total: 120 };
  }

  saveToDatabase(invoice: { orderId: string; total: number }) {
    console.log("saving invoice", invoice);
  }

  sendEmail(invoice: { orderId: string; total: number }) {
    console.log("emailing invoice", invoice);
  }
}`;

const srpGoodExample = `class InvoiceGenerator {
  generate(orderId: string) {
    return { orderId, total: 120 };
  }
}

class InvoiceRepository {
  save(invoice: { orderId: string; total: number }) {
    console.log("saving invoice", invoice);
  }
}

class InvoiceEmailSender {
  send(invoice: { orderId: string; total: number }) {
    console.log("emailing invoice", invoice);
  }
}`;

const ocpBadExample = `function calculateDiscount(type: "regular" | "premium", amount: number) {
  if (type === "regular") {
    return amount * 0.05;
  }

  if (type === "premium") {
    return amount * 0.1;
  }

  return 0;
}`;

const ocpGoodExample = `interface DiscountStrategy {
  calculate(amount: number): number;
}

class RegularDiscount implements DiscountStrategy {
  calculate(amount: number) {
    return amount * 0.05;
  }
}

class PremiumDiscount implements DiscountStrategy {
  calculate(amount: number) {
    return amount * 0.1;
  }
}

function getDiscountAmount(strategy: DiscountStrategy, amount: number) {
  return strategy.calculate(amount);
}`;

const lspBadExample = `class Bird {
  fly() {
    console.log("flying");
  }
}

class Penguin extends Bird {
  override fly() {
    throw new Error("Penguins cannot fly");
  }
}`;

const lspGoodExample = `interface Bird {
  move(): void;
}

class Sparrow implements Bird {
  move() {
    console.log("flying");
  }
}

class Penguin implements Bird {
  move() {
    console.log("swimming");
  }
}`;

const ispBadExample = `interface Worker {
  writeCode(): void;
  testCode(): void;
  deployRelease(): void;
}

class FrontendDeveloper implements Worker {
  writeCode() {}
  testCode() {}
  deployRelease() {
    throw new Error("Not responsible for deployments");
  }
}`;

const ispGoodExample = `interface Coder {
  writeCode(): void;
}

interface Tester {
  testCode(): void;
}

interface Deployer {
  deployRelease(): void;
}

class FrontendDeveloper implements Coder, Tester {
  writeCode() {}
  testCode() {}
}`;

const dipBadExample = `class StripePaymentGateway {
  charge(amount: number) {
    console.log("Charging with Stripe:", amount);
  }
}

class CheckoutService {
  private gateway = new StripePaymentGateway();

  checkout(amount: number) {
    this.gateway.charge(amount);
  }
}`;

const dipGoodExample = `interface PaymentGateway {
  charge(amount: number): void;
}

class StripePaymentGateway implements PaymentGateway {
  charge(amount: number) {
    console.log("Charging with Stripe:", amount);
  }
}

class CheckoutService {
  constructor(private readonly gateway: PaymentGateway) {}

  checkout(amount: number) {
    this.gateway.charge(amount);
  }
}`;

export function ObjectOrientedPrinciples() {
  return (
    <TopicLessonPage
      title={objectOrientedPrinciplesLesson.title}
      summary={objectOrientedPrinciplesLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={objectOrientedPrinciplesLesson.estimatedReadingTimeMinutes}
      difficulty={objectOrientedPrinciplesLesson.difficulty}
      relatedTopics={[
        { label: "General Software Principles", href: "/topic/general-software-principles" },
        { label: "Abstraction", href: "/topic/abstraction" },
        { label: "Polymorphism", href: "/topic/polymorphism" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🧱"
          title="SOLID-Oriented Design Pressure"
          description="These principles help classes and interfaces stay focused, extensible, substitutable, and loosely coupled. They are most useful when they make code easier to change, not when applied dogmatically."
        />

        <CollapsibleSection title="The Five Principles in This Lesson" collapsible={false}>
          <Paragraph>
            The image lists five object-oriented principles commonly grouped as
            SOLID: SRP, OCP, LSP, ISP, and DIP.
          </Paragraph>
          <Paragraph>
            Together they help you design types that are easier to extend,
            easier to test, and less likely to break when requirements change.
          </Paragraph>
          <Callout variant="tip">
            SOLID is a set of design heuristics. If applying a principle makes
            the code harder to understand, the design probably needs a simpler
            interpretation.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>SRP</SectionHeader>

        <CollapsibleSection title="Single Responsibility Principle" collapsible={false}>
          <Paragraph>
            SRP says a class should have one clear reason to change. If one
            class handles business logic, persistence, and notifications, it is
            carrying multiple responsibilities.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={srpBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={srpGoodExample} />
        </CollapsibleSection>

        <SectionHeader>OCP</SectionHeader>

        <CollapsibleSection title="Open/Closed Principle" collapsible={false}>
          <Paragraph>
            OCP says software entities should be open for extension but closed
            for modification. Adding a new behavior should usually mean adding a
            new type, not repeatedly editing an existing conditional block.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={ocpBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={ocpGoodExample} />
        </CollapsibleSection>

        <SectionHeader>LSP</SectionHeader>

        <CollapsibleSection title="Liskov Substitution Principle" collapsible={false}>
          <Paragraph>
            LSP says a subtype should be usable anywhere its base type is
            expected without breaking correctness. If a subclass must throw or
            disable core inherited behavior, the hierarchy is probably wrong.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={lspBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={lspGoodExample} />
        </CollapsibleSection>

        <SectionHeader>ISP</SectionHeader>

        <CollapsibleSection title="Interface Segregation Principle" collapsible={false}>
          <Paragraph>
            ISP says clients should not be forced to depend on methods they do
            not use. Smaller focused interfaces are usually better than one
            oversized contract.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={ispBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={ispGoodExample} />
        </CollapsibleSection>

        <SectionHeader>DIP</SectionHeader>

        <CollapsibleSection title="Dependency Inversion Principle" collapsible={false}>
          <Paragraph>
            DIP says high-level policy should depend on abstractions, not on
            low-level concrete implementations. This reduces coupling and makes
            code easier to test and replace.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={dipBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={dipGoodExample} />
          <Callout variant="note">
            DIP does not mean every class needs an interface. It means key
            dependencies should be abstracted where that reduces coupling in a
            meaningful way.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Object-Oriented Principles Cheat Sheet">
          <CodeBlock
            language="text"
            code={`SRP:
- One clear responsibility per class

OCP:
- Extend behavior without repeatedly editing old logic

LSP:
- Subtypes must honor base-type expectations

ISP:
- Prefer small focused interfaces

DIP:
- Depend on abstractions instead of concrete implementations`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ObjectOrientedPrinciples;
