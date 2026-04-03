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
import { polymorphismLesson } from "./meta";

const rendererExample = `interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string) {
    console.log("Email:", message);
  }
}

class SmsNotification implements Notification {
  send(message: string) {
    console.log("SMS:", message);
  }
}

class PushNotification implements Notification {
  send(message: string) {
    console.log("Push:", message);
  }
}

function notifyAll(
  channels: Notification[],
  message: string,
) {
  for (const channel of channels) {
    channel.send(message);
  }
}`;

const branchingExample = `function sendNotification(
  type: "email" | "sms" | "push",
  message: string,
) {
  if (type === "email") {
    console.log("Email:", message);
  } else if (type === "sms") {
    console.log("SMS:", message);
  } else {
    console.log("Push:", message);
  }
}`;

const shapeExample = `abstract class Shape {
  abstract area(): number;
}

class Rectangle extends Shape {
  constructor(
    private readonly width: number,
    private readonly height: number,
  ) {
    super();
  }

  area() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(private readonly radius: number) {
    super();
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

function totalArea(shapes: Shape[]) {
  return shapes.reduce((sum, shape) => sum + shape.area(), 0);
}`;

export function Polymorphism() {
  return (
    <TopicLessonPage
      title={polymorphismLesson.title}
      summary={polymorphismLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={polymorphismLesson.estimatedReadingTimeMinutes}
      difficulty={polymorphismLesson.difficulty}
      relatedTopics={[
        { label: "Abstraction", href: "/topic/abstraction" },
        { label: "Encapsulation", href: "/topic/encapsulation" },
        { label: "Inheritance", href: "/topic/inheritance" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🎭"
          title="One Interface, Many Behaviors"
          description="Polymorphism allows different concrete types to be used through the same contract, so code can dispatch behavior without large conditional chains."
        />

        <CollapsibleSection title="What Polymorphism Means" collapsible={false}>
          <Paragraph>
            Polymorphism means code can send the same message to different
            objects and let each object respond in its own way, as long as each
            object satisfies the expected contract.
          </Paragraph>
          <Paragraph>
            In practice, this often means working with an interface or abstract
            base type instead of switching on concrete type names manually.
          </Paragraph>
          <Callout variant="tip">
            Polymorphism moves variation into types. That usually scales better
            than centralizing every variation in one big conditional block.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="Shared Interface, Different Implementations" collapsible={false}>
          <Paragraph>
            Each notification type implements the same `send` method, so the
            caller can treat them uniformly.
          </Paragraph>
          <CodeBlock language="ts" code={rendererExample} />
        </CollapsibleSection>

        <CollapsibleSection title="Why It Beats Branching" collapsible={false}>
          <Paragraph>
            Without polymorphism, behavior often gets packed into a function
            that keeps growing as new cases are added.
          </Paragraph>
          <CodeBlock language="ts" code={branchingExample} />
          <Paragraph>
            The branching version works for small cases, but it couples all
            behavior to one place. Adding a new channel means editing the same
            function again.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Runtime Dispatch</SectionHeader>

        <CollapsibleSection title="Polymorphism with Abstract Classes" collapsible={false}>
          <Paragraph>
            Abstract classes can also enable polymorphism. The caller only
            depends on the base type and dispatches to the concrete
            implementation at runtime.
          </Paragraph>
          <CodeBlock language="ts" code={shapeExample} />
        </CollapsibleSection>

        <CollapsibleSection title="Where It Helps Most" collapsible={false}>
          <SubHeader>Common Design Wins</SubHeader>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Adding new strategies, providers, or renderers.</li>
            <li>Reducing repeated `if` or `switch` logic across the codebase.</li>
            <li>Writing extensible domain behavior around clear contracts.</li>
            <li>Testing the same workflow against fake and real implementations.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Common Mistakes</SectionHeader>

        <CollapsibleSection title="Misunderstandings to Avoid">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Using inheritance everywhere when an interface would be enough.</li>
            <li>Keeping big type switches even after introducing a shared contract.</li>
            <li>Designing contracts that are too broad or too vague.</li>
            <li>Forcing implementations to support methods they do not meaningfully need.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Polymorphism Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Polymorphism:
- Same contract
- Different concrete behavior

Typical tools:
- interfaces
- abstract classes
- method overriding

Goal:
- Replace branching on concrete types with contract-based dispatch`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Polymorphism;
