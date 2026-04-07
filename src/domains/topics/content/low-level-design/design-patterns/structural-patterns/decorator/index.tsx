import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { decoratorLesson } from "./meta";

const decoratorExample = `interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string) {
    console.log("Email:", message);
  }
}

class SmsDecorator implements Notifier {
  constructor(private readonly wrapped: Notifier) {}

  send(message: string) {
    this.wrapped.send(message);
    console.log("SMS:", message);
  }
}

class SlackDecorator implements Notifier {
  constructor(private readonly wrapped: Notifier) {}

  send(message: string) {
    this.wrapped.send(message);
    console.log("Slack:", message);
  }
}

const notifier = new SlackDecorator(
  new SmsDecorator(new EmailNotifier()),
);

notifier.send("Deployment completed");`;

export function Decorator() {
  return (
    <TopicLessonPage
      title={decoratorLesson.title}
      summary={decoratorLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={decoratorLesson.estimatedReadingTimeMinutes}
      difficulty={decoratorLesson.difficulty}
      relatedTopics={[
        { label: "Facade", href: "/topic/facade" },
        { label: "Polymorphism", href: "/topic/polymorphism" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🎁"
          title="Wrap to Extend Behavior"
          description="Decorator adds behavior by wrapping an object that follows the same interface, so features can be combined without changing the original class."
        />

        <CollapsibleSection title="What Decorator Solves" collapsible={false}>
          <Paragraph>
            Decorator is useful when you want to add responsibilities to an
            object dynamically instead of creating many subclasses for every
            feature combination.
          </Paragraph>
          <Paragraph>
            Each decorator keeps the same interface as the wrapped object, so
            callers can use the decorated object in the same way.
          </Paragraph>
          <Callout variant="tip">
            Use Decorator when behavior should be layered incrementally around a
            base object.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="Layering Notification Channels" collapsible={false}>
          <Paragraph>
            The base notifier sends email, and decorators add SMS and Slack
            behavior without modifying `EmailNotifier`.
          </Paragraph>
          <CodeBlock language="ts" code={decoratorExample} />
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Decorator Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Decorator:
- Wrap an object
- Add behavior before or after delegating

Use it when:
- Features should be combined flexibly

Goal:
- Extend behavior without changing the original class`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Decorator;
