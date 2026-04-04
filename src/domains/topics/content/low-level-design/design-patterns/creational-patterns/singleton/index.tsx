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

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Singleton Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Singleton:
- One instance for the whole application
- Global access to that instance

Use it when:
- Shared state must be centralized

Be careful about:
- Hidden global coupling
- Harder testing`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Singleton;
