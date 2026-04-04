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
  calculate(costInCents: number): number;
}

class StandardShipping implements ShippingStrategy {
  calculate(costInCents: number) {
    return costInCents + 500;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(costInCents: number) {
    return costInCents + 1500;
  }
}

class CheckoutService {
  constructor(private readonly shippingStrategy: ShippingStrategy) {}

  total(subtotalInCents: number) {
    return this.shippingStrategy.calculate(subtotalInCents);
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
            the same interface.
          </Paragraph>
          <CodeBlock language="ts" code={strategyExample} />
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
