import { TOPIC_DEFINITIONS } from "@/features/topics/topicRegistry";
import type { MenuItem } from "../types/menuItem.interface";

export const BASE_PATH = "/study-guide";

interface MenuNode {
  id: string;
  label: string;
  href?: string;
  children: Map<string, MenuNode>;
}

const createNode = (id: string, label: string, href?: string): MenuNode => ({
  id,
  label,
  href,
  children: new Map(),
});

const buildMenuItems = (topics: typeof TOPIC_DEFINITIONS): MenuItem[] => {
  const rootNodes = new Map<string, MenuNode>();

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

    currentLevel.set(topic.id, createNode(topic.id, topic.menuLabel, topic.path));
  }

  const convertNode = (node: MenuNode): MenuItem => {
    const children = Array.from(node.children.values()).map((child) =>
      convertNode(child),
    );

    return children.length > 0
      ? {
          id: node.id,
          label: node.label,
          children,
        }
      : {
          id: node.id,
          label: node.label,
          href: node.href,
        };
  };

  return Array.from(rootNodes.values()).map((node) => convertNode(node));
};

export const MENU_ITEMS: MenuItem[] = buildMenuItems(TOPIC_DEFINITIONS);
