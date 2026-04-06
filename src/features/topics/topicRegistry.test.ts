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

  it("preserves the shared top-level navigation grouping", () => {
    expect(MENU_ITEMS).toHaveLength(5);
    expect(MENU_ITEMS[0]).toMatchObject({
      kind: "group",
      id: "frontend",
      label: "Frontend",
    });
    const firstGroup = MENU_ITEMS[0].kind === "group" ? MENU_ITEMS[0] : null;
    expect(firstGroup?.children).toHaveLength(2);
    expect(firstGroup?.children?.[0]).toMatchObject({
      kind: "group",
      id: "fundamentals",
      label: "Fundamentals",
    });
    expect(firstGroup?.children?.[1]).toMatchObject({
      kind: "group",
      id: "java-script",
      label: "JavaScript",
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
    expect(MENU_ITEMS[3]).toMatchObject({
      kind: "group",
      id: "architecture",
      label: "Architecture",
    });
    expect(MENU_ITEMS[4]).toMatchObject({
      kind: "group",
      id: "low-level-design",
      label: "Low-Level Design",
    });
    const architectureGroup =
      MENU_ITEMS[3].kind === "group" ? MENU_ITEMS[3] : null;
    expect(architectureGroup?.children).toHaveLength(2);
    expect(architectureGroup?.children?.[0]).toMatchObject({
      kind: "group",
      id: "patterns",
      label: "Patterns",
    });
    expect(architectureGroup?.children?.[1]).toMatchObject({
      kind: "group",
      id: "fundamentals",
      label: "Fundamentals",
    });
    const patternsGroup =
      architectureGroup?.children?.[0]?.kind === "group"
        ? architectureGroup.children[0]
        : null;
    expect(patternsGroup?.children?.[0]).toMatchObject({
      kind: "group",
      id: "authentication",
      label: "Authentication",
    });
    const lowLevelDesignGroup =
      MENU_ITEMS[4].kind === "group" ? MENU_ITEMS[4] : null;
    expect(lowLevelDesignGroup?.children?.length).toBeGreaterThan(0);
  });

  it("marks placeholder lessons as coming soon in the registry", () => {
    expect(
      TOPIC_DEFINITIONS.filter((topic) => topic.status === "coming-soon"),
    ).toHaveLength(8);
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "html-semantics")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "accessibility")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "css-box-model")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "css-layout")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "responsive-design")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "dom-events")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "browser-rendering")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "network-browser-apis")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "performance-fundamentals")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "frontend-security")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "primitive-vs-reference-types")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "closures")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "objects-destructuring-spread-rest")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "promises-async-await")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "error-handling-javascript")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "dom-manipulation-basics")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "esm-vs-commonjs")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "immutability")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "dns")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "tcp-ip")?.status,
    ).toBe("coming-soon");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "http-1-2-3")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "tls")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "rest")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "http-status-codes")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "grpc")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "graph-ql")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "rest-graph-grpc")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "access-vs-refresh")?.status,
    ).toBe("coming-soon");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "api-key")?.status,
    ).toBe("coming-soon");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "basic-digest")?.status,
    ).toBe("coming-soon");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "jwt-bearer")?.status,
    ).toBe("coming-soon");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "oauth2-oidc")?.status,
    ).toBe("coming-soon");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "session")?.status,
    ).toBe("coming-soon");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "sso")?.status,
    ).toBe("coming-soon");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "load-balancer")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "horizontal-vertical-scaling")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "cdn")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "redis")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "latency-vs-throughput")?.status,
    ).toBe("ready");
    expect(
      TOPIC_DEFINITIONS.find((topic) => topic.id === "cap-theorem")?.status,
    ).toBe("ready");
  });
});
