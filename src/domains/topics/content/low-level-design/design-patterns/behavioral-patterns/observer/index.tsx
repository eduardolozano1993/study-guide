import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { observerLesson } from "./meta";

const observerExample = `type OrderListener = (status: string) => void;

class Order {
  private listeners: OrderListener[] = [];

  subscribe(listener: OrderListener) {
    this.listeners.push(listener);
  }

  setStatus(status: string) {
    console.log("Order status updated:", status);

    for (const listener of this.listeners) {
      listener(status);
    }
  }
}

const order = new Order();

order.subscribe((status) => {
  console.log("Email service received:", status);
});

order.subscribe((status) => {
  console.log("Analytics service received:", status);
});

order.setStatus("shipped");`;

export function Observer() {
  return (
    <TopicLessonPage
      title={observerLesson.title}
      summary={observerLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={observerLesson.estimatedReadingTimeMinutes}
      difficulty={observerLesson.difficulty}
      relatedTopics={[
        { label: "Strategy", href: "/topic/strategy" },
        { label: "State Machine", href: "/topic/state-machine" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="📣"
          title="Notify Many Listeners"
          description="Observer lets one object publish a change or event while multiple subscribers react to it without the sender knowing their concrete details."
        />

        <CollapsibleSection title="What Observer Solves" collapsible={false}>
          <Paragraph>
            Observer is useful when one object changes state and several other
            parts of the system should react, such as UI updates, analytics,
            notifications, or logging.
          </Paragraph>
          <Paragraph>
            Instead of hardcoding all reactions in one place, the subject
            notifies subscribed observers.
          </Paragraph>
          <Callout variant="tip">
            Use Observer when one event should fan out to multiple independent
            reactions.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="Order Status Notifications" collapsible={false}>
          <Paragraph>
            The `Order` publishes status changes, while email and analytics
            subscribers react independently.
          </Paragraph>
          <CodeBlock language="ts" code={observerExample} />
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Observer Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Observer:
- One subject
- Many listeners

Use it when:
- State changes should notify multiple consumers

Goal:
- Decouple event producers from event handlers`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Observer;
