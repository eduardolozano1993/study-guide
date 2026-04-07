import {
  BulletList,
  Callout,
  CodeBlock,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { workingWithExternalLibrariesLesson } from "./meta";

export function WorkingWithExternalLibraries() {
  return (
    <TopicLessonPage
      title={workingWithExternalLibrariesLesson.title}
      summary={workingWithExternalLibrariesLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={workingWithExternalLibrariesLesson.estimatedReadingTimeMinutes}
      difficulty={workingWithExternalLibrariesLesson.difficulty}
      relatedTopics={[
        { label: "Modules and Namespaces", href: "/topic/typescript-modules-and-namespaces" },
        { label: "Type Assertions and Casting", href: "/topic/typescript-type-assertions" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Working with External Libraries"
          description="Third-party types are only as good as their declaration files. Senior engineers need to know how to diagnose whether the problem is in their code, the runtime behavior, or the library’s typings."
        />

        <Paragraph>
          Libraries may ship their own types or rely on community-maintained
          declarations. Either way, TypeScript only knows what those
          declarations say, not what the runtime necessarily does.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`declare module "my-logger" {
  export interface LoggerContext {
    requestId?: string;
  }
}`}
        />

        <SectionHeader>Practical Workflow</SectionHeader>
        <BulletList
          items={[
            "Verify whether the bug is your usage, the library runtime behavior, or the declaration file.",
            "Contain unsafe edges with a local wrapper instead of spreading assertions across the codebase.",
            "Use module augmentation or local declaration patches when the typings are mostly right but need targeted fixes.",
            "Contribute upstream when the fix is broadly useful and stable, but do not block product work on that contribution landing first.",
          ]}
        />
        <Callout variant="warning">
          The worst pattern is sprinkling `as any` around a bad dependency until
          the whole feature becomes untrustworthy.
        </Callout>

        <SectionHeader>Tradeoffs</SectionHeader>
        <Paragraph>
          Wrappers add a small maintenance layer, but they isolate instability
          and let the rest of the app depend on a sane local contract. That is
          often better than letting one weak library type infect every call
          site.
        </Paragraph>
      </div>
    </TopicLessonPage>
  );
}

export default WorkingWithExternalLibraries;
