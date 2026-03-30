import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { TOPIC_DEFINITIONS } from "./topicRegistry";
import { htmlSemanticsLesson } from "@/domains/topics/content/frontend/core-web-fundamentals/html-semantics/meta";
import { dnsLesson } from "@/domains/topics/content/network/DNS/meta";

describe("topic integrity", () => {
  it("keeps topic ids and routes unique", () => {
    const ids = TOPIC_DEFINITIONS.map((topic) => topic.id);
    const paths = TOPIC_DEFINITIONS.map((topic) => topic.path);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("requires ready topics to have a loader and placeholder topics to stay loader-free", () => {
    const readyTopics = TOPIC_DEFINITIONS.filter(
      (topic) => topic.status === "ready",
    );
    const placeholderTopics = TOPIC_DEFINITIONS.filter(
      (topic) => topic.status !== "ready",
    );

    expect(readyTopics.every((topic) => topic.loader)).toBe(true);
    expect(placeholderTopics.every((topic) => !topic.loader)).toBe(true);
  });

  it("keeps lesson metadata aligned with the topic registry", () => {
    const topicIds = new Set(TOPIC_DEFINITIONS.map((topic) => topic.id));

    expect(htmlSemanticsLesson.id).toBe("html-semantics");
    expect(htmlSemanticsLesson.title.length).toBeGreaterThan(0);
    expect(htmlSemanticsLesson.summary.length).toBeGreaterThan(0);
    expect(htmlSemanticsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(dnsLesson.id).toBe("dns");
    expect(dnsLesson.title.length).toBeGreaterThan(0);
    expect(dnsLesson.summary.length).toBeGreaterThan(0);
    expect(dnsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);
  });
});
