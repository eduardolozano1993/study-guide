import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { strategyLesson } from "./meta";

const strategyExample = `interface ShippingStrategy {
  shippingCostFor(subtotalInCents: number): number;
}

class StandardShipping implements ShippingStrategy {
  shippingCostFor(subtotalInCents: number) {
    return subtotalInCents >= 5000 ? 0 : 500;
  }
}

class ExpressShipping implements ShippingStrategy {
  shippingCostFor(_subtotalInCents: number) {
    return 1500;
  }
}

class CheckoutService {
  constructor(private readonly shippingStrategy: ShippingStrategy) {}

  total(subtotalInCents: number) {
    const shippingCost = this.shippingStrategy.shippingCostFor(
      subtotalInCents,
    );

    return subtotalInCents + shippingCost;
  }
}

const checkout = new CheckoutService(new ExpressShipping());
console.log(checkout.total(5000));`;

export function Strategy() {
  return (
    <TopicLessonPage
      title={strategyLesson.title}
      summary={strategyLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={strategyLesson.estimatedReadingTimeMinutes}
      difficulty={strategyLesson.difficulty}
      relatedTopics={[
        { label: "Observer", href: "/topic/observer" },
        { label: "Polymorphism", href: "/topic/polymorphism" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🧠"
          title="Swap Behavior Through a Common Interface"
          description="Strategy moves interchangeable algorithms behind a shared contract so the client can choose behavior without large conditional blocks."
        />

        <CollapsibleSection title="What Strategy Solves" collapsible={false}>
          <Paragraph>
            Strategy is useful when the same workflow can use different
            algorithms or policies, such as pricing, sorting, validation, or
            shipping rules.
          </Paragraph>
          <Paragraph>
            The client depends on an abstraction and can switch strategies
            without rewriting its core logic.
          </Paragraph>
          <Callout variant="tip">
            Use Strategy when behavior varies by policy, but the caller should
            not need `if` or `switch` statements for every option.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="Choosing a Shipping Policy" collapsible={false}>
          <Paragraph>
            `CheckoutService` works with any shipping strategy that implements
            the same interface. The strategy decides only the shipping policy,
            while the checkout flow still owns the total calculation.
          </Paragraph>
          <CodeBlock language="ts" code={strategyExample} />
        </CollapsibleSection>

        <CollapsibleSection title="How to Spot a Good Strategy Boundary" collapsible={false}>
          <Paragraph>
            A good strategy interface isolates the part of the behavior that
            truly varies. In this example, the variable part is how shipping is
            priced, not how the final order total is assembled.
          </Paragraph>
          <Callout variant="note">
            If a strategy starts absorbing unrelated workflow logic, the
            boundary is probably too broad.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Strategy Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Strategy:
- Define interchangeable algorithms behind one interface

Use it when:
- Behavior varies by policy or rule

Goal:
- Replace branching with swappable behavior`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Strategy;
