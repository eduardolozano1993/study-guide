import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { facadeLesson } from "./meta";

const facadeExample = `class InventoryService {
  reserve(productId: string, quantity: number) {
    console.log("Reserved inventory", { productId, quantity });
  }
}

class PaymentService {
  charge(userId: string, amount: number) {
    console.log("Charged payment", { userId, amount });
  }
}

class ShippingService {
  schedule(productId: string) {
    console.log("Scheduled shipping", { productId });
  }
}

class OrderFacade {
  constructor(
    private readonly inventory = new InventoryService(),
    private readonly payment = new PaymentService(),
    private readonly shipping = new ShippingService(),
  ) {}

  placeOrder(userId: string, productId: string, quantity: number, amount: number) {
    this.inventory.reserve(productId, quantity);
    this.payment.charge(userId, amount);
    this.shipping.schedule(productId);
  }
}

const orderFacade = new OrderFacade();
orderFacade.placeOrder("user-1", "keyboard", 1, 120);`;

export function Facade() {
  return (
    <TopicLessonPage
      title={facadeLesson.title}
      summary={facadeLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={facadeLesson.estimatedReadingTimeMinutes}
      difficulty={facadeLesson.difficulty}
      relatedTopics={[
        { label: "Decorator", href: "/topic/decorator" },
        { label: "General Software Principles", href: "/topic/general-software-principles" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🪟"
          title="Simple Front Door to a Complex System"
          description="Facade hides subsystem complexity behind one simpler API, so callers do not need to coordinate many collaborating classes directly."
        />

        <CollapsibleSection title="What Facade Solves" collapsible={false}>
          <Paragraph>
            Facade is useful when a subsystem has several moving parts but most
            callers only need a simpler, higher-level workflow.
          </Paragraph>
          <Paragraph>
            Instead of forcing every caller to know the exact order of service
            calls, the facade centralizes that orchestration behind one method.
          </Paragraph>
          <Callout variant="tip">
            Use Facade to simplify usage, not to remove the subsystem itself.
            The lower-level services can still exist for advanced cases.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="Placing an Order Through One API" collapsible={false}>
          <Paragraph>
            The facade coordinates inventory, payment, and shipping so the
            caller only needs one `placeOrder(...)` call.
          </Paragraph>
          <CodeBlock language="ts" code={facadeExample} />
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Facade Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Facade:
- Provide one simplified interface
- Hide subsystem orchestration details

Use it when:
- A workflow spans multiple services or classes

Goal:
- Reduce complexity for common callers`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Facade;
