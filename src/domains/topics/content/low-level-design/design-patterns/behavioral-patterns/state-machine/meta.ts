import { defineTopicLesson } from "../../../../defineTopicLesson";

export const stateMachineLesson = defineTopicLesson({
  id: "state-machine",
  title: "State Machine",
  summary:
    "Learn how a state machine models allowed transitions explicitly so objects move through valid states in a controlled way.",
  estimatedReadingTimeMinutes: 9,
  difficulty: "intro",
  relatedTopicIds: ["strategy", "observer", "encapsulation"],
});
