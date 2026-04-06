import {
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
          description="Forms test your understanding of controlled inputs, validation, async workflows, and API design under user interaction pressure."
        />

        <SectionHeader>Controlled Inputs and Validation</SectionHeader>
        <Paragraph>
          Controlled inputs make React state the source of truth. This is useful
          when validation, formatting, conditional UI, or analytics depends on
          the current value.
        </Paragraph>
        <Paragraph>
          Validation can be synchronous, asynchronous, field-level, or
          form-level. Strong answers explain where validation belongs and how to
          keep UX stable while requests are in flight.
        </Paragraph>
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

        <SectionHeader>Async Submission UX</SectionHeader>
        <Paragraph>
          Good form UX requires more than successful submission. You need
          pending state, duplicate submission prevention, error messaging, and
          preserved input for recoverable failures.
        </Paragraph>
        <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
          <li>Disable or debounce repeated submits when appropriate.</li>
          <li>Keep field-level and submission-level errors separate.</li>
          <li>Do not clear recoverable user input before the server confirms success.</li>
        </ul>

        <SectionHeader>Form Libraries</SectionHeader>
        <Paragraph>
          Libraries like React Hook Form reduce boilerplate, minimize re-renders,
          and improve ergonomics for large forms with nested fields or reusable
          validation schemas.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "plain", label: "Plain React" },
            { key: "library", label: "Form library" },
          ]}
          rows={[
            {
              label: "Best fit",
              values: {
                plain: "Small or moderate forms with straightforward validation.",
                library: "Large forms, nested fields, reusable schemas, or performance-sensitive workflows.",
              },
            },
            {
              label: "Tradeoff",
              values: {
                plain: "Less abstraction overhead, more manual wiring.",
                library: "Faster at scale, but adds conventions and dependency surface area.",
              },
            },
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default ReactForms;
