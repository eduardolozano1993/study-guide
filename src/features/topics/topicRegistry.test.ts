import "@testing-library/jest-dom/vitest";
import type { MenuItem } from "@/features/navigation/types/menuItem.interface";
import { describe, expect, it } from "vitest";
import { MENU_ITEMS } from "@/features/navigation/data/menuItems";
import { TOPIC_DEFINITIONS } from "./topicRegistry";

const getLeafItems = (items: MenuItem[] = MENU_ITEMS): MenuItem[] =>
  items.flatMap((item: MenuItem): MenuItem[] => {
    if (item.children?.length) {
      return getLeafItems(item.children);
    }

    return [item];
  });

describe("topic registry", () => {
  it("drives the sidebar menu from the canonical topic definitions", () => {
    const leafItems = getLeafItems();

    expect(leafItems).toHaveLength(TOPIC_DEFINITIONS.length);
    expect(leafItems.map((item) => item.id)).toEqual(
      TOPIC_DEFINITIONS.map((topic) => topic.id),
    );
    expect(leafItems.map((item) => item.href)).toEqual(
      TOPIC_DEFINITIONS.map((topic) => topic.path),
    );
    expect(leafItems.every((item) => item.href && item.href !== "#")).toBe(
      true,
    );
  });

  it("preserves the shared frontend navigation grouping", () => {
    expect(MENU_ITEMS).toHaveLength(1);
    expect(MENU_ITEMS[0]).toMatchObject({
      id: "frontend",
      label: "Frontend",
    });
    expect(MENU_ITEMS[0].children).toHaveLength(1);
    expect(MENU_ITEMS[0].children?.[0]).toMatchObject({
      id: "core-web-fundamentals",
      label: "Core Web Fundamentals",
    });
  });
});
