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
import { generalSoftwarePrinciplesLesson } from "./meta";

const kissBadExample = `function getStatusLabel(status: string) {
  if (status === "active") {
    return "Active";
  }

  if (status === "inactive") {
    return "Inactive";
  }

  if (status === "pending") {
    return "Pending";
  }

  if (status === "blocked") {
    return "Blocked";
  }

  return "Unknown";
}`;

const kissGoodExample = `const statusLabels: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  blocked: "Blocked",
};

function getStatusLabel(status: string) {
  return statusLabels[status] ?? "Unknown";
}`;

const dryBadExample = `function calculateWebPrice(price: number) {
  const tax = price * 0.16;
  return price + tax;
}

function calculateMobilePrice(price: number) {
  const tax = price * 0.16;
  return price + tax;
}`;

const dryGoodExample = `function applyTax(price: number, taxRate = 0.16) {
  return price + price * taxRate;
}

function calculateWebPrice(price: number) {
  return applyTax(price);
}

function calculateMobilePrice(price: number) {
  return applyTax(price);
}`;

const yagniBadExample = `class ReportBuilder {
  private formatters = new Map<string, (value: unknown) => string>();
  private validators = new Map<string, (value: unknown) => boolean>();
  private exporters = new Map<string, (value: unknown) => Uint8Array>();

  registerFormatter(name: string, formatter: (value: unknown) => string) {
    this.formatters.set(name, formatter);
  }

  registerValidator(name: string, validator: (value: unknown) => boolean) {
    this.validators.set(name, validator);
  }

  registerExporter(name: string, exporter: (value: unknown) => Uint8Array) {
    this.exporters.set(name, exporter);
  }
}`;

const yagniGoodExample = `class ReportBuilder {
  build(title: string, rows: string[]) {
    return [title, ...rows].join("\\n");
  }
}`;

const socBadExample = `class UserController {
  async createUser(requestBody: { email: string }) {
    const email = requestBody.email.trim().toLowerCase();

    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }

    const user = { id: crypto.randomUUID(), email };

    await database.users.insert(user);
    await emailClient.send({
      to: email,
      subject: "Welcome",
      body: "Thanks for signing up",
    });

    return {
      status: 201,
      body: user,
    };
  }
}`;

const socGoodExample = `class UserValidator {
  validateEmail(email: string) {
    const normalized = email.trim().toLowerCase();

    if (!normalized.includes("@")) {
      throw new Error("Invalid email");
    }

    return normalized;
  }
}

class UserRepository {
  async create(user: { id: string; email: string }) {
    await database.users.insert(user);
  }
}

class WelcomeEmailService {
  async send(email: string) {
    await emailClient.send({
      to: email,
      subject: "Welcome",
      body: "Thanks for signing up",
    });
  }
}

class UserService {
  constructor(
    private readonly validator: UserValidator,
    private readonly repository: UserRepository,
    private readonly welcomeEmailService: WelcomeEmailService,
  ) {}

  async createUser(email: string) {
    const normalizedEmail = this.validator.validateEmail(email);
    const user = { id: crypto.randomUUID(), email: normalizedEmail };

    await this.repository.create(user);
    await this.welcomeEmailService.send(normalizedEmail);

    return user;
  }
}`;

const lodBadExample = `const city = order.customer.address.city.toUpperCase();`;

const lodGoodExample = `class Customer {
  constructor(private readonly address: { city: string }) {}

  getCity() {
    return this.address.city;
  }
}

class Order {
  constructor(private readonly customer: Customer) {}

  getCustomerCity() {
    return this.customer.getCity();
  }
}

const city = order.getCustomerCity().toUpperCase();`;

export function GeneralSoftwarePrinciples() {
  return (
    <TopicLessonPage
      title={generalSoftwarePrinciplesLesson.title}
      summary={generalSoftwarePrinciplesLesson.summary}
      eyebrow="Low-Level Design"
      estimatedReadingTimeMinutes={generalSoftwarePrinciplesLesson.estimatedReadingTimeMinutes}
      difficulty={generalSoftwarePrinciplesLesson.difficulty}
      relatedTopics={[
        { label: "Abstraction", href: "/topic/abstraction" },
        { label: "Encapsulation", href: "/topic/encapsulation" },
        { label: "Polymorphism", href: "/topic/polymorphism" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          className="mb-2"
          icon="📐"
          title="Small Principles, Large Impact"
          description="These principles help keep code readable, changeable, and less fragile. They are heuristics, not rigid laws, but they consistently improve low-level design when applied with judgment."
        />

        <CollapsibleSection title="The Five Principles in This Lesson" collapsible={false}>
          <Paragraph>
            The image lists five common software design principles: KISS, DRY,
            YAGNI, Separation of Concerns, and the Law of Demeter.
          </Paragraph>
          <Paragraph>
            They all push in the same direction: avoid unnecessary complexity,
            keep responsibilities clear, and reduce coupling between parts of
            the system.
          </Paragraph>
          <Callout variant="tip">
            These principles are best used as design pressure, not as slogans to
            repeat mechanically.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>KISS</SectionHeader>

        <CollapsibleSection title="KISS: Keep It Simple" collapsible={false}>
          <Paragraph>
            KISS means prefer the simplest design that clearly solves the
            current problem. Simple code is easier to read, test, and change.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={kissBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={kissGoodExample} />
        </CollapsibleSection>

        <SectionHeader>DRY</SectionHeader>

        <CollapsibleSection title="DRY: Don't Repeat Yourself" collapsible={false}>
          <Paragraph>
            DRY means avoid duplicating the same knowledge in multiple places.
            If a rule changes, you should not need to hunt down many copies.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={dryBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={dryGoodExample} />
        </CollapsibleSection>

        <SectionHeader>YAGNI</SectionHeader>

        <CollapsibleSection title="YAGNI: You Aren't Gonna Need It" collapsible={false}>
          <Paragraph>
            YAGNI means do not build speculative flexibility before you have a
            real requirement. Extra abstractions and extension points add cost
            immediately, even if they are never used.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={yagniBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={yagniGoodExample} />
        </CollapsibleSection>

        <SectionHeader>Separation Of Concerns</SectionHeader>

        <CollapsibleSection title="Separate Responsibilities Clearly" collapsible={false}>
          <Paragraph>
            Separation of Concerns means different parts of the system should
            handle different responsibilities. Validation, persistence, and
            notifications should not all be tangled into one class.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={socBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={socGoodExample} />
        </CollapsibleSection>

        <SectionHeader>Law Of Demeter</SectionHeader>

        <CollapsibleSection title="Talk to Close Neighbors" collapsible={false}>
          <Paragraph>
            The Law of Demeter says an object should interact mainly with its
            direct collaborators, not reach through long chains of internal
            structure. That keeps coupling lower.
          </Paragraph>
          <SubHeader>Bad Example</SubHeader>
          <CodeBlock language="ts" code={lodBadExample} />
          <SubHeader>Good Example</SubHeader>
          <CodeBlock language="ts" code={lodGoodExample} />
          <Callout variant="note">
            Long property chains are not always wrong, but they are often a
            sign that one part of the system knows too much about another
            part&apos;s internals.
          </Callout>
        </CollapsibleSection>

        <SectionHeader>Quick Reference</SectionHeader>

        <CollapsibleSection title="General Software Principles Cheat Sheet">
          <CodeBlock
            language="text"
            code={`KISS:
- Prefer the simplest clear solution

DRY:
- Keep shared knowledge in one place

YAGNI:
- Do not build for hypothetical future needs

Separation of Concerns:
- Split different responsibilities cleanly

Law of Demeter:
- Avoid reaching through deep object chains`}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default GeneralSoftwarePrinciples;
