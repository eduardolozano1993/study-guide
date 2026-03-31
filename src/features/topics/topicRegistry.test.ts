import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { MENU_ITEMS } from "@/features/navigation/data/menuItems";
import type { NavigationNode } from "@/features/navigation/model/navigationTree";
import { TOPIC_DEFINITIONS } from "./topicRegistry";

const getLeafItems = (items: NavigationNode[] = MENU_ITEMS): NavigationNode[] =>
  items.flatMap((item: NavigationNode): NavigationNode[] => {
    if (item.kind === "group") {
      return getLeafItems(item.children);
    }

    return [item];
  });

describe("topic registry", () => {
  it("drives the sidebar menu from the canonical topic definitions", () => {
    const leafItems = getLeafItems();

    expect(leafItems).toHaveLength(TOPIC_DEFINITIONS.length);
    expect(leafItems.every((item) => item.kind === "topic")).toBe(true);
    expect(leafItems.map((item) => item.id)).toEqual(
      TOPIC_DEFINITIONS.map((topic) => topic.id),
    );
    expect(
      leafItems.map((item) => (item.kind === "topic" ? item.href : "")),
    ).toEqual(
      TOPIC_DEFINITIONS.map((topic) => topic.path),
    );
    expect(
      leafItems.every(
        (item) => item.kind === "topic" && item.href && item.href !== "#",
      ),
    ).toBe(true);
  });

  it("preserves the shared frontend navigation grouping", () => {
    expect(MENU_ITEMS).toHaveLength(3);
    expect(MENU_ITEMS[0]).toMatchObject({
      kind: "group",
      id: "frontend",
      label: "Frontend",
    });
    const firstGroup = MENU_ITEMS[0].kind === "group" ? MENU_ITEMS[0] : null;
    expect(firstGroup?.children).toHaveLength(1);
    expect(firstGroup?.children?.[0]).toMatchObject({
      kind: "group",
      id: "core-web-fundamentals",
      label: "Core Web Fundamentals",
    });
    expect(MENU_ITEMS[1]).toMatchObject({
      kind: "group",
      id: "network",
      label: "Network",
    });
    expect(MENU_ITEMS[2]).toMatchObject({
      kind: "group",
      id: "api",
      label: "API",
    });
  });

  it("marks placeholder lessons as coming soon in the registry", () => {
    expect(
      TOPIC_DEFINITIONS.filter((topic) => topic.status === "coming-soon"),
    ).toHaveLength(3);
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "html-semantics")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "dns")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "http-1-2-3")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "tls")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "rest")?.status,
    ).toBe("ready");
  });
});
