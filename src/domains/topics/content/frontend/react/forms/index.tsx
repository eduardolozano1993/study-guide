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
import { reactFormsLesson } from "./meta";

export function ReactForms() {
  return (
    <TopicLessonPage
      title={reactFormsLesson.title}
      summary={reactFormsLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactFormsLesson.estimatedReadingTimeMinutes}
      difficulty={reactFormsLesson.difficulty}
      relatedTopics={[
        { label: "Component Design", href: "/topic/react-component-design" },
        { label: "Error Handling", href: "/topic/react-error-handling" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="F"
          title="Forms"
          description="Forms test your understanding of controlled inputs, validation, async workflows, accessibility, and state ownership under constant user interaction pressure."
        />

        <SectionHeader>Controlled, Uncontrolled, and Library Choice</SectionHeader>
        <Paragraph>
          Controlled inputs make React state the source of truth. This is useful
          when validation, formatting, conditional UI, or analytics depends on
          the current value. Uncontrolled inputs and form libraries can be
          better when reducing re-render cost or boilerplate matters more.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "fit", label: "Best fit" },
            { key: "tradeoff", label: "Tradeoff" },
          ]}
          rows={[
            {
              label: "Controlled inputs",
              values: {
                fit: "Explicit validation, cross-field interactions, and synchronized UI.",
                tradeoff: "More wiring and more opportunities for large-form re-render churn.",
              },
            },
            {
              label: "Uncontrolled or ref-driven inputs",
              values: {
                fit: "Simple forms, file inputs, or APIs that do not need constant React ownership.",
                tradeoff: "Harder to coordinate when many parts of the UI need current values.",
              },
            },
            {
              label: "Form libraries",
              values: {
                fit: "Large forms, nested fields, schema validation, or performance-sensitive workflows.",
                tradeoff: "Adds conventions and abstraction that the team must understand well.",
              },
            },
          ]}
        />

        <SectionHeader>Async Validation and Submission</SectionHeader>
        <CodeBlock
          language="tsx"
          code={`function SignUpForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      await api.signUp({ email });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <button disabled={status === "submitting"}>Create account</button>
    </form>
  );
}`}
        />
        <BulletList
          items={[
            "Async validation can race when users type quickly, so stale responses should not overwrite newer field state.",
            "Duplicate-submit prevention matters because users retry and networks wobble.",
            "Recoverable failures should preserve dirty input and give the user a credible next step.",
            "Optimistic form submission only makes sense when rollback and server truth are clear.",
          ]}
        />

        <SectionHeader>Accessibility and UX Responsibilities</SectionHeader>
        <BulletList
          items={[
            "Labels, inline errors, submission-level errors, and focus movement all affect form usability.",
            "Complex forms need keyboard-safe interactions and clear focus targets after validation failures.",
            "Field-level and submission-level errors should be separate so the user knows what to fix and what the system is reporting.",
          ]}
        />
        <Callout variant="warning">
          A form is not done when it submits successfully. Pending state, error
          recovery, accessibility, and input preservation are part of the real
          product behavior.
        </Callout>

        <SectionHeader>Interviewer Questions</SectionHeader>
        <BulletList
          items={[
            "When is a controlled form the right choice, and when is a library or uncontrolled pattern better?",
            "How do you prevent async validation races in large forms?",
            "Why should recoverable submission failures preserve user input?",
            "How do you keep a large form responsive without making validation and accessibility worse?",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default ReactForms;
