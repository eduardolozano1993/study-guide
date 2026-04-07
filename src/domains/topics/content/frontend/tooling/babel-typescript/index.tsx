import {
  BulletList,
  Callout,
  CodeBlock,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { babelTypeScriptLesson } from "./meta";

export function BabelTypeScript() {
  return (
    <TopicLessonPage
      title={babelTypeScriptLesson.title}
      summary={babelTypeScriptLesson.summary}
      eyebrow="Frontend / Tooling"
      estimatedReadingTimeMinutes={babelTypeScriptLesson.estimatedReadingTimeMinutes}
      difficulty={babelTypeScriptLesson.difficulty}
      relatedTopics={[
        { label: "Strict Mode and tsconfig", href: "/topic/typescript-strict-mode-and-tsconfig" },
        { label: "Runtime vs Compile Time", href: "/topic/typescript-runtime-vs-compile-time" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Babel and TypeScript"
          description="This topic matters because many teams confuse transforming TypeScript-flavored syntax with actually type-checking the project. Senior answers separate transpilation, type analysis, and declaration emission clearly."
        />

        <SectionHeader>Who Does What</SectionHeader>
        <Paragraph>
          Babel, <code>tsc</code>, and SWC overlap around syntax transforms, but
          they do not all provide the same guarantees. The interviewer usually
          wants to know whether you can separate syntax compilation from static
          analysis.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "main", label: "Primary role" },
            { key: "note", label: "What to remember" },
          ]}
          rows={[
            {
              label: "Babel",
              values: {
                main: "Transforms syntax and framework-specific code into runnable JavaScript.",
                note: "Does not type-check your project by itself.",
              },
            },
            {
              label: "TypeScript compiler",
              values: {
                main: "Understands TypeScript semantics, type-checks, and can emit JS plus declaration files.",
                note: "Often runs as a separate step even when another tool handles transforms.",
              },
            },
            {
              label: "SWC",
              values: {
                main: "Fast transpilation and many modern framework transforms.",
                note: "Like Babel, it is usually not the full replacement for type-checking semantics.",
              },
            },
          ]}
        />

        <SectionHeader>Build-Pipeline Reality</SectionHeader>
        <CodeBlock
          language="text"
          code={`Common modern pipeline:
- dev server uses Babel or SWC transforms for fast feedback
- bundler builds application code
- tsc --noEmit runs separately for type-checking
- tsc or a dedicated step emits .d.ts files for libraries when needed`}
        />
        <Paragraph>
          That is why a project can transpile successfully while still having
          real type errors if the type-check step is separate or missing.
        </Paragraph>

        <SectionHeader>Edge Cases That Matter</SectionHeader>
        <BulletList
          items={[
            "Decorators, `const enum`, namespaces, and declaration emit are common places where toolchain behavior diverges.",
            "Source-map quality affects debugging credibility, especially when stack traces cross several transform steps.",
            "If you build a library, declaration emission becomes a practical requirement, which usually pushes `tsc` back into the pipeline even if Babel or SWC handles JavaScript transforms.",
            "A team should know which tool is responsible for syntax, type-checking, declaration files, and production bundling instead of assuming one tool does everything.",
          ]}
        />
        <Callout variant="warning">
          A build can succeed after Babel or SWC transpilation while the codebase
          still has real type errors if type-checking runs separately or not at
          all.
        </Callout>

        <SectionHeader>Interviewer Questions</SectionHeader>
        <BulletList
          items={[
            "What is the difference between Babel, `tsc`, and SWC in a modern frontend pipeline?",
            "Which tool emits declaration files, and why does that matter for libraries?",
            "Why can a Babel-based build succeed while the TypeScript project is still unsafe?",
            "What language features or transforms commonly expose differences between toolchains?",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default BabelTypeScript;
