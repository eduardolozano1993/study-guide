import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { factoryMethodLesson } from "./meta";

const factoryMethodExample = `interface NotificationSender {
  send(message: string): void;
}

class EmailSender implements NotificationSender {
  send(message: string) {
    console.log("Email:", message);
  }
}

class SmsSender implements NotificationSender {
  send(message: string) {
    console.log("SMS:", message);
  }
}

abstract class NotificationCreator {
  abstract createSender(): NotificationSender;

  notify(message: string) {
    const sender = this.createSender();
    sender.send(message);
  }
}

class EmailNotificationCreator extends NotificationCreator {
  createSender() {
    return new EmailSender();
  }
}

class SmsNotificationCreator extends NotificationCreator {
  createSender() {
    return new SmsSender();
  }
}

const creator: NotificationCreator = new EmailNotificationCreator();
creator.notify("Welcome aboard");`;

export function FactoryMethod() {
  return (
    <TopicLessonPage
      title={factoryMethodLesson.title}
      summary={factoryMethodLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={factoryMethodLesson.estimatedReadingTimeMinutes}
      difficulty={factoryMethodLesson.difficulty}
      relatedTopics={[
        { label: "Abstraction", href: "/topic/abstraction" },
        { label: "Polymorphism", href: "/topic/polymorphism" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🏭"
          title="Create Through a Method, Not Inline"
          description="Factory Method moves object creation into a dedicated method so client code works with an abstraction and the concrete product can vary by creator."
        />

        <CollapsibleSection title="What Factory Method Solves" collapsible={false}>
          <Paragraph>
            Factory Method is useful when a class needs to create an object but
            should not hardcode the exact concrete type it creates.
          </Paragraph>
          <Paragraph>
            Instead of calling `new` directly in client logic, the class
            delegates creation to a factory method that subclasses or concrete
            creators can customize.
          </Paragraph>
          <Callout variant="tip">
            Use Factory Method when object creation varies, but the workflow
            using that object should stay the same.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="One Workflow, Different Products" collapsible={false}>
          <Paragraph>
            Here the `notify` workflow stays fixed, while each creator chooses
            which concrete sender to instantiate.
          </Paragraph>
          <CodeBlock language="ts" code={factoryMethodExample} />
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Factory Method Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Factory Method:
- Define a method for creating an object
- Let subclasses choose the concrete product

Use it when:
- Creation logic varies
- Usage flow stays the same

Goal:
- Reduce coupling to concrete classes`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default FactoryMethod;
