import {
  BulletList,
  Callout,
  CodeBlock,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { modulesAndNamespacesLesson } from "./meta";

export function ModulesAndNamespaces() {
  return (
    <TopicLessonPage
      title={modulesAndNamespacesLesson.title}
      summary={modulesAndNamespacesLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={modulesAndNamespacesLesson.estimatedReadingTimeMinutes}
      difficulty={modulesAndNamespacesLesson.difficulty}
      relatedTopics={[
        { label: "Strict Mode and tsconfig", href: "/topic/typescript-strict-mode-and-tsconfig" },
        { label: "ESM vs CommonJS", href: "/topic/esm-vs-commonjs" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Modules and Namespaces"
          description="In modern TypeScript projects, most module questions are really questions about build behavior, emitted code, and runtime compatibility."
        />

        <Paragraph>
          Modern application code generally uses ES module syntax. TypeScript,
          the bundler, and the runtime all need to agree on how those imports
          resolve.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`import type { User } from "./user.types";
import { createUser } from "./user.service";

export function saveUser(user: User) {
  return createUser(user);
}`}
        />
        <Paragraph>
          <code>import type</code> is not only style. It clarifies intent and
          can change emitted runtime behavior in some toolchains.
        </Paragraph>

        <Callout variant="warning">
          Module bugs often come from confusing TypeScript configuration with
          bundler behavior and actual runtime loading. Those systems overlap,
          but they are not the same thing.
        </Callout>

        <BulletList
          items={[
            "Use file-based modules for modern application code.",
            "Be explicit about ESM and CommonJS interop.",
            "Treat path aliases as compile-time or bundler conveniences, not automatic runtime support.",
            "Know that namespaces are mostly legacy outside a few declaration scenarios.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default ModulesAndNamespaces;
