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
          description="In modern TypeScript projects, most module questions are really questions about build behavior, runtime resolution, and interop pain between ESM, CommonJS, bundlers, and tests."
        />

        <SectionHeader>Compile-Time Paths vs Runtime Resolution</SectionHeader>
        <Paragraph>
          Modern application code generally uses file-based modules with ES
          module syntax. TypeScript, the bundler, the test runner, and the
          runtime all need to agree on how those imports resolve.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`import type { User } from "./user.types";
import { createUser } from "./user.service";

export function saveUser(user: User) {
  return createUser(user);
}`}
        />
        <BulletList
          items={[
            "`import type` clarifies intent and can affect emitted behavior in some toolchains.",
            "Path aliases are conveniences until the bundler, test runner, and runtime are configured to understand them too.",
            "What compiles successfully is not automatically what resolves correctly in Node, Vitest, Jest, or the browser build.",
          ]}
        />

        <SectionHeader>ESM, CommonJS, and Legacy Namespaces</SectionHeader>
        <BulletList
          items={[
            "Interop bugs often come from default imports, named imports, or synthetic compatibility settings masking the actual module format.",
            "Side-effect imports should be explicit because they change runtime behavior even when no value is referenced.",
            "Namespaces are mostly legacy in application code, but they still appear in some declaration and ambient-typing scenarios.",
          ]}
        />
        <Callout variant="warning">
          Module bugs often come from confusing TypeScript configuration with
          bundler behavior and actual runtime loading. Those systems overlap,
          but they are not the same thing.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What is the difference between a path alias compiling and actually resolving at runtime?",
              "Why can `import type` matter beyond code style?",
              "What are common pain points in ESM and CommonJS interop?",
              "When do namespaces still appear in modern TypeScript work?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ModulesAndNamespaces;
