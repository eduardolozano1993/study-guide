import { useState } from "react";

interface MenuItem {
  label: string;
  icon?: string;
  children?: MenuItem[];
  href?: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Getting Started",
    icon: "📚",
    children: [
      { label: "Introduction", href: "#" },
      { label: "Installation", href: "#" },
      { label: "Quick Start", href: "#" },
    ],
  },
  {
    label: "Core Concepts",
    icon: "💡",
    children: [
      { label: "Components", href: "#" },
      { label: "State Management", href: "#" },
      { label: "Data Flow", href: "#" },
    ],
  },
  {
    label: "Advanced Topics",
    icon: "🚀",
    children: [
      { label: "Performance", href: "#" },
      { label: "Testing", href: "#" },
      { label: "Deployment", href: "#" },
    ],
  },
  {
    label: "Resources",
    icon: "🔗",
    children: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
];

interface MenuItemProps {
  item: MenuItem;
  depth?: number;
}

function MenuItemComponent({ item, depth = 0 }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const indent = depth * 4;

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          style={{ paddingLeft: `${indent + 12}px` }}
        >
          <span className="flex items-center gap-2">
            <span className="text-base">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </span>
          <span
            className={`text-xs transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        </button>
        {isOpen && (
          <ul className="mt-1 space-y-1">
            {item.children!.map((child, index) => (
              <MenuItemComponent key={index} item={child} depth={depth + 1} />
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
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        style={{ paddingLeft: `${indent + 36}px` }}
      >
        <span className="text-base">{item.icon}</span>
        <span className="text-sm">{item.label}</span>
      </a>
    </li>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky left-0 top-0 h-screen w-[280px] flex-shrink-0 bg-card border-r border-border overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="text-2xl">📖</span>
          Study Guide
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Learn at your own pace
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-3">
        {/* Quick Links */}
        <div className="mb-4">
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <span>🏠</span>
            <span>Home</span>
          </a>
        </div>

        {/* Main Menu */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <MenuItemComponent key={index} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border">
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
          >
            <span>⚙️</span>
            <span>Settings</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
          >
            <span>❓</span>
            <span>Help & Support</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}
