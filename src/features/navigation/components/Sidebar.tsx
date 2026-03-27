import React from "react";
import { useLocation } from "react-router-dom";
import type { MenuItem } from "@/features/navigation/types/menuItem.interface";
import { MENU_ITEMS } from "../data/menuItems";

// Session storage key for persisted menu state
const MENU_STATE_KEY = "sidebar-menu-state";

const getStoredMenuState = (): Record<string, boolean> => {
  try {
    const stored = sessionStorage.getItem(MENU_STATE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const storeMenuState = (state: Record<string, boolean>) => {
  try {
    sessionStorage.setItem(MENU_STATE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
};

export interface MenuItemProps {
  item: MenuItem;
  depth?: number;
}

const depthStyles = {
  0: {
    button: "text-lg font-semibold px-3 py-2",
    link: "text-lg font-medium px-3 py-2",
    icon: "text-base",
    label: "text-lg",
    chevron: "text-xs",
  },
  1: {
    button: "text-sm font-medium px-3 py-1.5",
    link: "text-sm font-normal px-3 py-1",
    icon: "text-sm",
    label: "text-sm",
    chevron: "text-xs",
  },
  2: {
    button: "text-sm font-normal px-3 py-1",
    link: "text-sm font-normal px-3 py-1",
    icon: "text-xs",
    label: "text-xs",
    chevron: "text-xs",
  },
};

const getDepthStyles = (depth: number) => {
  if (depthStyles[depth as keyof typeof depthStyles]) {
    return depthStyles[depth as keyof typeof depthStyles];
  }
  throw new Error(`Unsupported menu depth: ${depth}`);
};

const BASE_INDENT_PX = 12;
const INDENT_PER_LEVEL_PX = 6;

const getIndent = (depth: number) => {
  return BASE_INDENT_PX + depth * INDENT_PER_LEVEL_PX;
};

// Custom hook to manage menu expanded state with sessionStorage persistence
const useMenuExpanded = (itemLabel: string): [boolean, () => void] => {
  const [isOpen, setIsOpen] = React.useState(() => {
    return getStoredMenuState()[itemLabel] ?? false;
  });

  // Use ref to always read current state from sessionStorage, avoiding stale closures
  const storedStateRef = React.useRef(getStoredMenuState());

  const toggle = React.useCallback(() => {
    const currentStored = storedStateRef.current;
    const newValue = !currentStored[itemLabel];
    // Build fresh state object to ensure clean updates
    const newState: Record<string, boolean> = {};
    // Preserve other items' state
    for (const key of Object.keys(currentStored)) {
      newState[key] = currentStored[key];
    }
    // Set new value for this item
    newState[itemLabel] = newValue;
    storedStateRef.current = newState;
    storeMenuState(newState);
    setIsOpen(newValue);
  }, [itemLabel]);

  return [isOpen, toggle];
};

export const MenuItemComponent = React.memo(function MenuItemComponent({
  item,
  depth = 0,
}: MenuItemProps) {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const styles = getDepthStyles(depth);
  const indent = getIndent(depth);

  const [isOpen, toggleOpen] = useMenuExpanded(item.label);

  const isActive =
    item.href && item.href !== "#" && location.pathname === item.href;

  const linkClasses = isActive
    ? "bg-primary/10 text-foreground font-medium"
    : "text-foreground hover:bg-accent/50";

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={toggleOpen}
          className={`flex items-center justify-between w-full rounded-lg text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${linkClasses} ${styles.button}`}
          style={{
            paddingLeft: `${indent}px`,
            paddingRight: `${indent / 2}px`,
          }}
          aria-expanded={isOpen}
          aria-current={isActive ? "page" : undefined}
        >
          <span className="flex items-center gap-2.5">
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
          </span>
          <span
            className={`${styles.chevron} transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          >
            ▶
          </span>
        </button>
        {isOpen && (
          <ul className="mt-1 space-y-0.5">
            {item.children!.map((child) => (
              <MenuItemComponent
                key={`${child.label}-${depth + 1}`}
                item={child}
                depth={depth + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href || "#"}
        className={`flex items-center gap-2 rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${linkClasses} ${styles.link}`}
        style={{
          paddingLeft: `${indent + (item.icon ? 8 : 0)}px`,
          paddingRight: `${indent / 2}px`,
        }}
        aria-current={isActive ? "page" : undefined}
      >
        {item.icon && <span className={styles.icon}>{item.icon}</span>}
        <span className={styles.label}>{item.label}</span>
      </a>
    </li>
  );
});

export interface SidebarProps {
  menuItems?: MenuItem[];
}

export function Sidebar({ menuItems = MENU_ITEMS }: SidebarProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-r border-gray-300 shrink-0 w-full">
        <h1 className="text-xl font-semibold text-black">📖 Study Guide</h1>
      </div>

      {/* Navigation */}
      <nav className="overflow-y-auto h-[calc(100vh-64px)] border-r border-gray-300">
        <ul className="p-2 space-y-1">
          {menuItems.map((item) => (
            <MenuItemComponent key={item.label} item={item} />
          ))}
        </ul>
      </nav>
    </>
  );
}
