import { TOPIC_DEFINITIONS } from "@/features/topics/topicRegistry";
import { buildNavigationTree } from "../model/navigationTree";
import type { NavigationNode } from "../model/navigationTree";

export const BASE_PATH = "/study-guide";

export const MENU_ITEMS: NavigationNode[] = buildNavigationTree(
  TOPIC_DEFINITIONS,
);
