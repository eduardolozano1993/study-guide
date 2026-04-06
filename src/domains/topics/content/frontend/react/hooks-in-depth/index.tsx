import {
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
          description="Senior React engineers should explain what each hook is for, what problem it solves, and what bugs appear when the hook is used as an escape hatch instead of a design tool."
        />

        <SectionHeader>Core Hook Responsibilities</SectionHeader>
        <Paragraph>
          Hooks let function components use React features such as state,
          effects, refs, reducers, and context. The advanced part is not
          memorizing the names. It is choosing the right primitive for the
          constraint in front of you.
        </Paragraph>
        <Paragraph>
          Strong answers distinguish reactive values from mutable containers,
          state transitions from side effects, and dependency injection through
          context from full application state management.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "use-case", label: "Best fit" },
            { key: "misuse", label: "Common misuse" },
          ]}
          rows={[
            {
              label: "useState",
              values: {
                "use-case": "Simple local state with independent updates.",
                misuse: "Managing many coordinated transitions that really want a reducer.",
              },
            },
            {
              label: "useReducer",
              values: {
                "use-case": "Complex transitions where actions tell a clearer story than multiple setters.",
                misuse: "Adding ceremony for one or two trivial booleans.",
              },
            },
            {
              label: "useRef",
              values: {
                "use-case": "Mutable values that should not trigger renders, or imperative DOM access.",
                misuse: "Hiding reactive state in refs to avoid understanding render behavior.",
              },
            },
            {
              label: "useContext",
              values: {
                "use-case": "Sharing stable values such as theme, auth session, or injected services.",
                misuse: "Treating context like a free global store for high-frequency updates.",
              },
            },
          ]}
        />

        <SectionHeader>useState, useReducer, useRef, and useContext</SectionHeader>
        <Paragraph>
          `useState` schedules re-renders when state changes. `useReducer` does
          the same but centralizes transitions. `useRef` persists mutable data
          without notifying React. `useContext` reads a value from the nearest
          provider above the component.
        </Paragraph>
        <Paragraph>
          Interviewers often test whether you understand when a change should
          participate in rendering. If it affects UI, it belongs in state. If
          it only coordinates imperative work, a ref may be better.
        </Paragraph>
        <CollapsibleSection title="Reducer for coordinated state changes" collapsible={false}>
          <Paragraph>
            Reducers help when multiple updates are related and the action says
            why state changed instead of scattering setters across handlers and
            effects.
          </Paragraph>
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

        <SectionHeader>useEffect, Custom Hooks, and Hook Rules</SectionHeader>
        <Paragraph>
          `useEffect` synchronizes a component with external systems after a
          commit. Custom hooks package stateful logic behind a smaller API so
          components stay focused on rendering.
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

        <CollapsibleSection title="Signals of deep understanding">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>You can explain why hook order must stay stable across renders.</li>
            <li>You know a custom hook shares logic, not state instances, unless it points to shared external state.</li>
            <li>You treat `useEffect` as a synchronization boundary, not as a substitute for application architecture.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactHooksInDepth;
