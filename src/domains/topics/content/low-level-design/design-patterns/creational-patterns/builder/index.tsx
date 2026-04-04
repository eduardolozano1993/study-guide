import {
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { builderLesson } from "./meta";

const builderExample = `type HttpClientConfig = {
  baseUrl: string;
  timeoutMs: number;
  retries: number;
  enableLogging: boolean;
};

class HttpClientBuilder {
  private config: HttpClientConfig = {
    baseUrl: "",
    timeoutMs: 3000,
    retries: 0,
    enableLogging: false,
  };

  setBaseUrl(baseUrl: string) {
    this.config.baseUrl = baseUrl;
    return this;
  }

  setTimeout(timeoutMs: number) {
    this.config.timeoutMs = timeoutMs;
    return this;
  }

  setRetries(retries: number) {
    this.config.retries = retries;
    return this;
  }

  enableLogging() {
    this.config.enableLogging = true;
    return this;
  }

  build() {
    return { ...this.config };
  }
}

const clientConfig = new HttpClientBuilder()
  .setBaseUrl("https://api.example.com")
  .setTimeout(5000)
  .setRetries(2)
  .enableLogging()
  .build();`;

export function Builder() {
  return (
    <TopicLessonPage
      title={builderLesson.title}
      summary={builderLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={builderLesson.estimatedReadingTimeMinutes}
      difficulty={builderLesson.difficulty}
      relatedTopics={[
        { label: "Factory Method", href: "/topic/factory-method" },
        { label: "Singleton", href: "/topic/singleton" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🧱"
          title="Build Step by Step"
          description="Builder helps when creating an object would otherwise require a large constructor or many optional parameters, making object creation easier to read and assemble."
        />

        <CollapsibleSection title="What Builder Solves" collapsible={false}>
          <Paragraph>
            Builder is useful when an object has many configuration options or
            should be assembled in a readable sequence instead of one long
            constructor call.
          </Paragraph>
          <Paragraph>
            The pattern separates the construction steps from the final object,
            so callers can compose the parts they need more clearly.
          </Paragraph>
          <Callout variant="tip">
            Builder is most helpful when creation is complex. For small plain
            objects, a normal object literal is usually enough.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>TypeScript Example</SectionHeader>

        <CollapsibleSection title="Configuring an HTTP Client" collapsible={false}>
          <Paragraph>
            The builder collects each option step by step, then returns the
            final configuration with `build()`.
          </Paragraph>
          <CodeBlock language="ts" code={builderExample} />
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Builder Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Builder:
- Construct an object step by step
- Keep creation readable

Use it when:
- There are many optional fields
- Construction is complex

Goal:
- Avoid messy constructors and unclear setup`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Builder;
