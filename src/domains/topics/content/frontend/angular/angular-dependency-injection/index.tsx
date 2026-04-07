import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { angularDependencyInjectionLesson } from "./meta";

export function AngularDependencyInjection() {
  return (
    <TopicLessonPage
      title={angularDependencyInjectionLesson.title}
      summary={angularDependencyInjectionLesson.summary}
      eyebrow="Frontend / Angular"
      estimatedReadingTimeMinutes={angularDependencyInjectionLesson.estimatedReadingTimeMinutes}
      difficulty={angularDependencyInjectionLesson.difficulty}
      relatedTopics={[
        { label: "Services", href: "/topic/angular-services" },
        { label: "Angular Architecture", href: "/topic/angular-architecture" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="A"
          title="Dependency Injection"
          description="Angular uses dependency injection to provide services and other dependencies without manually instantiating them inside components, and modern Angular commonly accesses them with `inject()`."
        />

        <CollapsibleSection title="Injecting Services with `inject()`" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`import { Component, Injectable, inject } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {}

@Component({ selector: "app-user-list", template: "" })
export class UserListComponent {
  private readonly userService = inject(UserService);

  load() {
    return this.userService.getUsers();
  }
}`}
          />
          <Paragraph>
            Angular's injector resolves dependencies based on configured
            providers. Components declare what they need; they do not create it
            directly. In Angular 20+, `inject()` is a common default because it
            works cleanly with standalone APIs, field initializers, and
            function-based patterns.
          </Paragraph>
        </CollapsibleSection>

        <SectionHeader>Why DI Matters</SectionHeader>

        <CollapsibleSection title="Provider Scope and Testability" collapsible={false}>
          <Paragraph>
            DI improves separation of concerns and testing because dependencies
            can be replaced with mocks or alternate providers. Provider scope
            also determines whether a service is effectively shared or local to
            part of the component tree.
          </Paragraph>
          <Callout variant="tip">
            A strong interview answer mentions both inversion of control and
            provider scope, not just injection syntax.
          </Callout>
        </CollapsibleSection>

        <CollapsibleSection title="`inject()` Also Works with Tokens" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`import { inject, InjectionToken } from "@angular/core";

export interface ApiConfig {
  baseUrl: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>("api.config");

const config = inject(API_CONFIG);`}
          />
          <Paragraph>
            `inject()` is not only for classes. It also works with
            `InjectionToken`, which matters because interfaces do not exist at
            runtime and cannot be used as dependency keys by themselves.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Provider Scope Changes Lifetime and Sharing" collapsible={false}>
          <BulletList
            items={[
              "`providedIn: 'root'` usually creates one app-wide instance.",
              "Route-level or feature-level providers can isolate state per navigation subtree or lazy boundary.",
              "Component providers create new instances per component subtree, which is useful for local state and test isolation.",
              "Unexpected sharing or unexpected recreation usually comes from misunderstanding which injector provided the dependency.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="InjectionToken, Multi-Providers, and Runtime Reality" collapsible={false}>
          <BulletList
            items={[
              "`InjectionToken` exists because interfaces disappear at runtime and cannot act as DI keys by themselves.",
              "Multi-providers are useful when multiple implementations contribute to one extensibility point.",
              "DI cycles and hidden coupling are architectural smells, not just injector errors to patch around.",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "Why might a team prefer `inject()` over constructor injection in modern Angular?",
              "What is the difference between root, route, and component provider scope?",
              "Why do you need `InjectionToken` for some abstractions?",
              "When are multi-providers a better fit than one concrete service?",
              "Why might a service be unexpectedly shared or unexpectedly recreated?",
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Common Interview Pitfalls">
          <BulletList
            items={[
              'Reducing DI to "constructor injection" only.',
              "Answering with old constructor-only examples when the codebase uses `inject()`.",
              "Ignoring provider scopes such as root vs local providers.",
              "Forgetting that interfaces do not exist at runtime as injector tokens.",
              "Not connecting DI to testability and decoupling.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default AngularDependencyInjection;
