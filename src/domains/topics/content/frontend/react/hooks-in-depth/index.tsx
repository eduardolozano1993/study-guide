import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { reactHooksInDepthLesson } from "./meta";

export function ReactHooksInDepth() {
  return (
    <TopicLessonPage
      title={reactHooksInDepthLesson.title}
      summary={reactHooksInDepthLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactHooksInDepthLesson.estimatedReadingTimeMinutes}
      difficulty={reactHooksInDepthLesson.difficulty}
      relatedTopics={[
        { label: "Effects and Side Effects", href: "/topic/react-effects-and-side-effects" },
        { label: "State Management", href: "/topic/react-state-management" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="H"
          title="Hooks In Depth"
          description="Senior React engineers should explain what each hook is for, how to choose the right primitive, and what bugs appear when hooks are used as escape hatches instead of design tools."
        />

        <SectionHeader>Choose the Primitive That Matches the Constraint</SectionHeader>
        <Paragraph>
          Hooks let function components use React features such as state,
          effects, refs, reducers, and context. The advanced part is not
          memorizing the names. It is choosing the right primitive for the
          constraint in front of you.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "fit", label: "Best fit" },
            { key: "misuse", label: "Common misuse" },
          ]}
          rows={[
            {
              label: "useState",
              values: {
                fit: "Simple local state with independent updates.",
                misuse: "Managing many coordinated transitions that really want a reducer.",
              },
            },
            {
              label: "useReducer",
              values: {
                fit: "Complex transitions where actions tell a clearer story than scattered setters.",
                misuse: "Adding ceremony for one or two trivial booleans.",
              },
            },
            {
              label: "useRef",
              values: {
                fit: "Mutable values that should not trigger renders, or imperative DOM access.",
                misuse: "Hiding reactive state in refs to avoid understanding render behavior.",
              },
            },
            {
              label: "useContext",
              values: {
                fit: "Dependency injection or sharing stable values such as theme, auth session, or services.",
                misuse: "Treating context like a free high-frequency global store.",
              },
            },
          ]}
        />

        <SectionHeader>Reducer, Ref, Effect, or Event Handler?</SectionHeader>
        <BulletList
          items={[
            "If it affects UI and changes over time, it probably belongs in state or a reducer.",
            "If it only coordinates imperative work and should not cause a re-render, a ref may be better.",
            "If it synchronizes with an external system after commit, use an effect.",
            "If it is caused by a user interaction and can happen directly there, an event handler is usually clearer than an effect.",
          ]}
        />
        <CollapsibleSection title="Reducer for coordinated state changes" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`type CheckoutState = {
  status: "idle" | "submitting" | "success" | "error";
  error: string | null;
};

type CheckoutAction =
  | { type: "submit" }
  | { type: "success" }
  | { type: "failure"; message: string };

function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction,
): CheckoutState {
  switch (action.type) {
    case "submit":
      return { status: "submitting", error: null };
    case "success":
      return { status: "success", error: null };
    case "failure":
      return { status: "error", error: action.message };
  }
}`}
          />
        </CollapsibleSection>

        <SectionHeader>Custom Hooks and Hook Rules</SectionHeader>
        <Paragraph>
          Custom hooks package stateful logic behind a smaller API so components
          stay focused on rendering. They share logic, not component instances,
          unless they intentionally point at shared external state.
        </Paragraph>
        <Paragraph>
          The Rules of Hooks exist because React matches hook calls by order.
          Call hooks at the top level of React functions, never in conditions,
          loops, or nested callbacks.
        </Paragraph>
        <CollapsibleSection title="Custom hook that hides synchronization details" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}`}
          />
        </CollapsibleSection>
        <BulletList
          items={[
            "Weak custom hooks leak effects, expose unstable callback contracts, or hide too much business logic behind a vague abstraction.",
            "Dependency arrays and stable references matter because hooks participate in React’s dataflow model, not because the linter likes arrays.",
            "A hook is not automatically a better abstraction than a plain function or domain module.",
          ]}
        />
        <Callout variant="warning">
          The weak answer is `I put logic in a custom hook`. The strong answer
          is why the hook is the right boundary and what contract it exposes to
          components.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When should state be a ref instead of `useState`?",
              "When is a reducer warranted instead of several independent setters?",
              "Why is context better understood as dependency injection than as a free global store?",
              "What failure modes show that a custom hook has become the wrong abstraction?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactHooksInDepth;
