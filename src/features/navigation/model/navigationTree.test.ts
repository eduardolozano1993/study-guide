import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { TOPIC_DEFINITIONS } from "@/features/topics/topicRegistry";
import { buildNavigationTree } from "./navigationTree";

describe("buildNavigationTree", () => {
  it("builds explicit group and topic nodes from the topic registry", () => {
    const tree = buildNavigationTree(TOPIC_DEFINITIONS);

    expect(tree).toHaveLength(5);
    expect(tree[0]).toMatchObject({
      kind: "group",
      id: "frontend",
      label: "Frontend",
    });

    if (tree[0].kind !== "group") {
      throw new Error("Expected the root node to be a group node");
    }

    expect(tree[0].children).toHaveLength(9);
    expect(tree[0].children[0]).toMatchObject({
      kind: "group",
      id: "fundamentals",
      label: "Fundamentals",
    });
    expect(tree[0].children[1]).toMatchObject({
      kind: "group",
      id: "java-script",
      label: "JavaScript",
    });
    expect(tree[0].children[2]).toMatchObject({
      kind: "group",
      id: "type-script",
      label: "TypeScript",
    });
    expect(tree[0].children[3]).toMatchObject({
      kind: "group",
      id: "testing",
      label: "Testing",
    });
    expect(tree[0].children[4]).toMatchObject({
      kind: "group",
      id: "performance",
      label: "Performance",
    });
    expect(tree[0].children[5]).toMatchObject({
      kind: "group",
      id: "tooling",
      label: "Tooling",
    });

    if (tree[0].children[0].kind !== "group") {
      throw new Error("Expected the nested node to be a group node");
    }

    const leafKinds = tree[0].children[0].children.map((node) => node.kind);
    expect(leafKinds.every((kind) => kind === "topic")).toBe(true);
    expect(tree[0].children[2].kind).toBe("group");
    expect(tree[0].children[3].kind).toBe("group");
    expect(tree[0].children[4].kind).toBe("group");
    expect(tree[0].children[5].kind).toBe("group");
    expect(tree[4]).toMatchObject({
      kind: "group",
      id: "low-level-design",
      label: "Low-Level Design",
    });
  });
});
