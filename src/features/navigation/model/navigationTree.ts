import type { TopicDefinition, TopicStatus } from "@/features/topics/topicRegistry";

export interface NavigationGroupNode {
  kind: "group";
  id: string;
  label: string;
  icon?: string;
  children: NavigationNode[];
}

export interface NavigationTopicNode {
  kind: "topic";
  id: string;
  label: string;
  icon?: string;
  href: string;
  status: TopicStatus;
  disabled: boolean;
}

export type NavigationNode = NavigationGroupNode | NavigationTopicNode;

interface NavigationNodeBuilder {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  status?: TopicStatus;
  disabled?: boolean;
  children: Map<string, NavigationNodeBuilder>;
}

const createNode = (
  id: string,
  label: string,
  icon?: string,
  href?: string,
  status?: TopicStatus,
  disabled = false,
): NavigationNodeBuilder => ({
  id,
  label,
  icon,
  href,
  status,
  disabled,
  children: new Map(),
});

const toNavigationNode = (node: NavigationNodeBuilder): NavigationNode => {
  const children = Array.from(node.children.values()).map(toNavigationNode);

  if (children.length > 0) {
    return {
      kind: "group",
      id: node.id,
      label: node.label,
      icon: node.icon,
      children,
    };
  }

  return {
    kind: "topic",
    id: node.id,
    label: node.label,
    icon: node.icon,
    href: node.href ?? "",
    status: node.status ?? "draft",
    disabled: node.disabled ?? false,
  };
};

export const buildNavigationTree = (
  topics: readonly TopicDefinition[],
): NavigationNode[] => {
  const rootNodes = new Map<string, NavigationNodeBuilder>();

  for (const topic of topics) {
    let currentLevel = rootNodes;

    for (const pathItem of topic.menuPath) {
      const existingNode = currentLevel.get(pathItem.id);

      if (existingNode) {
        currentLevel = existingNode.children;
        continue;
      }

      const newNode = createNode(pathItem.id, pathItem.label);
      currentLevel.set(pathItem.id, newNode);
      currentLevel = newNode.children;
    }

    currentLevel.set(
      topic.id,
      createNode(
        topic.id,
        topic.menuLabel,
        undefined,
        topic.path,
        topic.status,
        topic.status === "draft" || topic.status === "archived",
      ),
    );
  }

  return Array.from(rootNodes.values()).map(toNavigationNode);
};
