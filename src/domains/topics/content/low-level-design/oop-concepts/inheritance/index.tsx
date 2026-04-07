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
import { inheritanceLesson } from "./meta";

const inheritanceExample = `class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {}

  describe() {
    return \`\${this.id} <\${this.email}>\`;
  }
}

class AdminUser extends User {
  constructor(
    id: string,
    email: string,
    private readonly permissions: string[],
  ) {
    super(id, email);
  }

  can(permission: string) {
    return this.permissions.includes(permission);
  }
}`;

const overrideExample = `class FileLogger {
  log(message: string) {
    return \`[file] \${message}\`;
  }
}

class TimestampedFileLogger extends FileLogger {
  override log(message: string) {
    const timestamp = new Date().toISOString();
    return super.log(\`\${timestamp} \${message}\`);
  }
}`;

const compositionExample = `class Permissions {
  constructor(private readonly values: string[]) {}

  has(permission: string) {
    return this.values.includes(permission);
  }
}

class UserAccount {
  constructor(
    public readonly id: string,
    private readonly permissions: Permissions,
  ) {}

  can(permission: string) {
    return this.permissions.has(permission);
  }
}`;

export function Inheritance() {
  return (
    <TopicLessonPage
      title={inheritanceLesson.title}
      summary={inheritanceLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={inheritanceLesson.estimatedReadingTimeMinutes}
      difficulty={inheritanceLesson.difficulty}
      relatedTopics={[
        { label: "Abstraction", href: "/topic/abstraction" },
        { label: "Encapsulation", href: "/topic/encapsulation" },
        { label: "Polymorphism", href: "/topic/polymorphism" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="🧬"
          title="Reuse Through a Base Type"
          description="Inheritance allows a derived class to reuse state and behavior from a base class and then extend or specialize that behavior when an is-a relationship is truly valid."
        />

        <CollapsibleSection title="What Inheritance Means" collapsible={false}>
          <Paragraph>
            Inheritance lets one class derive from another. The subclass gains
            access to the base class behavior and can add new behavior or
            override selected methods.
          </Paragraph>
          <Paragraph>
            It models an is-a relationship. An `AdminUser` is a `User`, so code
            written for `User` should still make sense when given an
            `AdminUser`.
          </Paragraph>
          <Callout variant="important">
            Inheritance only works well when the subtype can safely honor the
            expectations of the base type.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Basic Example" collapsible={false}>
          <Paragraph>
            The subclass inherits the common identity data and behavior from
            `User`, then adds permission-specific logic.
          </Paragraph>
          <CodeBlock language="ts" code={inheritanceExample} />
        </CollapsibleSection>

        <SectionHeader>Extending Behavior</SectionHeader>

        <CollapsibleSection title="Method Overriding" collapsible={false}>
          <Paragraph>
            A subclass can replace inherited behavior with a more specific
            implementation. In TypeScript, `override` makes that intent clear
            and catches mistakes when the base method changes.
          </Paragraph>
          <CodeBlock language="ts" code={overrideExample} />
          <Paragraph>
            `super.log(...)` reuses the base implementation instead of
            duplicating it.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="When Inheritance Helps" collapsible={false}>
          <SubHeader>Useful Cases</SubHeader>
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>A real subtype relationship exists.</li>
            <li>Base behavior is stable and broadly reusable.</li>
            <li>Subclasses only need small, coherent extensions.</li>
            <li>The hierarchy is shallow and easy to understand.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Inheritance vs Composition</SectionHeader>

        <CollapsibleSection title="Prefer Composition When Behavior Varies" collapsible={false}>
          <Paragraph>
            Inheritance can become rigid because subclasses are tightly coupled
            to base-class design decisions. Composition is often safer when you
            want to assemble behavior from smaller collaborating objects.
          </Paragraph>
          <CodeBlock language="ts" code={compositionExample} />
          <Callout variant="tip">
            Prefer composition when the relationship is has-a instead of is-a,
            or when behavior needs to vary independently.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="Common Problems">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Deep class hierarchies that are hard to reason about.</li>
            <li>Subclasses inheriting methods they should not expose.</li>
            <li>Overriding behavior in ways that break base-class expectations.</li>
            <li>Using inheritance only to reuse code instead of modeling a real relationship.</li>
          </ul>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="Inheritance Cheat Sheet">
          <CodeBlock
            language="text"
            code={`Inheritance:
- A subclass derives from a base class
- It reuses and specializes behavior

Use it when:
- There is a real is-a relationship
- Base behavior is stable

Be careful about:
- Tight coupling
- Fragile overrides
- Deep hierarchies`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default Inheritance;
