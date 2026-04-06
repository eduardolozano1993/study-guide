import {
  BulletList,
  CodeBlock,
  Paragraph,
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
          description="Third-party types are only as good as their declaration files. Senior engineers need to know what to do when those declarations are incomplete or wrong."
        />

        <Paragraph>
          Libraries may ship their own types or rely on community-maintained
          declarations. Either way, TypeScript only knows what those
          declarations say.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`declare module "my-logger" {
  export interface LoggerContext {
    requestId?: string;
  }
}`}
        />

        <BulletList
          items={[
            "Verify whether the problem is your usage or the library type definition.",
            "Patch weak spots with a local wrapper or augmentation instead of spreading unsafe casts.",
            "Contribute upstream when the correction is broadly useful.",
            "Keep runtime expectations separate from declarations until you trust both.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default WorkingWithExternalLibraries;
