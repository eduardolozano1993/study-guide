import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { stateMachineLesson } from "./meta";

const stateMachineExample = `type OrderState = "pending" | "paid" | "shipped";

class Order {
  private state: OrderState = "pending";

  pay() {
    if (this.state !== "pending") {
      throw new Error("Only pending orders can be paid");
    }

    this.state = "paid";
  }

  ship() {
    if (this.state !== "paid") {
      throw new Error("Only paid orders can be shipped");
    }

    this.state = "shipped";
  }

  getState() {
    return this.state;
  }
}

const order = new Order();
order.pay();
order.ship();
console.log(order.getState()); // shipped`;

export function StateMachine() {
  return (
    <TopicLessonPage
      title={stateMachineLesson.title}
      summary={stateMachineLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={stateMachineLesson.estimatedReadingTimeMinutes}
      difficulty={stateMachineLesson.difficulty}
      relatedTopics={[
        { label: "Observer", href: "/topic/observer" },
        { label: "Encapsulation", href: "/topic/encapsulation" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🔄"
          title="Control Valid Transitions"
          description="A state machine models the allowed states of an object and the transitions between them, making invalid transitions explicit and easier to prevent."
        />

        <CollapsibleSection title="What a State Machine Solves" collapsible={false}>
          <Paragraph>
            A state machine is useful when an object can only move through a
            limited set of valid states, such as order processing, workflow
            approvals, or UI screens.
          </Paragraph>
          <Paragraph>
            Instead of scattering state rules around the codebase, the object
            centralizes allowed transitions in one place.
          </Paragraph>
          <Callout variant="tip">
            Use a state machine when transitions matter as much as the state
            values themselves.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="Order Lifecycle" collapsible={false}>
          <Paragraph>
            The order can move from `pending` to `paid` to `shipped`, and the
            methods reject invalid transitions.
          </Paragraph>
          <CodeBlock language="ts" code={stateMachineExample} />
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="State Machine Cheat Sheet">
          <CodeBlock
            language="text"
            code={`State Machine:
- Define valid states
- Define valid transitions between them

Use it when:
- Objects follow a lifecycle

Goal:
- Prevent invalid state changes`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default StateMachine;
