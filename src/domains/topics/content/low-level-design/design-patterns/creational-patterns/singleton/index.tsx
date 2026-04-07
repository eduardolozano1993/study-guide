import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { singletonLesson } from "./meta";

const singletonExample = `class AppConfig {
  private static instance: AppConfig | null = null;

  private constructor(
    readonly apiBaseUrl: string,
    readonly timeoutMs: number,
  ) {}

  static getInstance() {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig(
        "https://api.example.com",
        5000,
      );
    }

    return AppConfig.instance;
  }
}

const configA = AppConfig.getInstance();
const configB = AppConfig.getInstance();

console.log(configA === configB); // true`;

const dependencyInjectionAlternative = `type AppConfig = {
  apiBaseUrl: string;
  timeoutMs: number;
};

class CheckoutService {
  constructor(private readonly config: AppConfig) {}

  getTimeout() {
    return this.config.timeoutMs;
  }
}

const config: AppConfig = {
  apiBaseUrl: "https://api.example.com",
  timeoutMs: 5000,
};

const checkout = new CheckoutService(config);`;

export function Singleton() {
  return (
    <TopicLessonPage
      title={singletonLesson.title}
      summary={singletonLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={singletonLesson.estimatedReadingTimeMinutes}
      difficulty={singletonLesson.difficulty}
      relatedTopics={[
        { label: "Factory Method", href: "/topic/factory-method" },
        { label: "Builder", href: "/topic/builder" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="1️⃣"
          title="One Shared Instance"
          description="Singleton ensures a class creates only one instance and gives the rest of the system a single access point to that shared object."
        />

        <CollapsibleSection title="What Singleton Solves" collapsible={false}>
          <Paragraph>
            Singleton is useful when the application should coordinate through
            exactly one shared instance, such as a configuration holder or a
            central in-memory registry.
          </Paragraph>
          <Paragraph>
            The pattern hides direct construction and exposes a method that
            always returns the same object.
          </Paragraph>
          <Callout variant="warning">
            Singleton can easily become disguised global state. Use it
            carefully, especially when testability and explicit dependencies
            matter.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="Single Config Instance" collapsible={false}>
          <Paragraph>
            The constructor is private, so callers must go through
            `getInstance()`, which always returns the same `AppConfig`.
          </Paragraph>
          <CodeBlock language="ts" code={singletonExample} />
        </CollapsibleSection>

        <CollapsibleSection title="Why Teams Use It Carefully" collapsible={false}>
          <Paragraph>
            Singleton can look convenient because callers can access shared
            state from anywhere, but that convenience comes with hidden
            coupling. The more code reaches into a singleton directly, the
            harder it becomes to reason about dependencies and isolate tests.
          </Paragraph>
          <Paragraph>
            This is why many codebases avoid Singleton for services and prefer
            explicit construction or dependency injection instead.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="When Not to Use Singleton" collapsible={false}>
          <Paragraph>
            Avoid Singleton when the object represents a service that could
            reasonably have different implementations, lifetimes, or test
            doubles. In those cases, hidden global access usually hurts more
            than it helps.
          </Paragraph>
          <CodeBlock
            language="text"
            code={`Singleton is usually a poor fit for:
- payment gateways
- repositories
- HTTP clients with environment-specific config
- domain services that should be injected explicitly`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Prefer Explicit Dependencies When Possible" collapsible={false}>
          <Paragraph>
            If the main goal is to share configuration or infrastructure, it is
            often clearer to construct the dependency once and pass it where it
            is needed.
          </Paragraph>
          <CodeBlock language="ts" code={dependencyInjectionAlternative} />
          <Callout variant="tip">
            Reach for Singleton only when a true single instance is part of the
            design. Do not use it merely to avoid passing dependencies around.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Singleton Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Singleton:
- One instance for the whole application
- Global access to that instance

Use it when:
- Exactly one shared instance is part of the design

Be careful about:
- Hidden global coupling
- Harder testing
- Replacing explicit dependencies with implicit ones`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Singleton;
