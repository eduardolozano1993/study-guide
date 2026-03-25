import { useState, useEffect } from "react";

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
          className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-left text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
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
        className="flex items-center gap-2 px-3 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        style={{ paddingLeft: `${indent + 36}px` }}
      >
        <span className="text-base">{item.icon}</span>
        <span className="text-sm">{item.label}</span>
      </a>
    </li>
  );
}

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-background border-b border-border">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-4 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <span className="text-2xl">{isMobileOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileSidebar}
          onTouchStart={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? "fixed top-0 left-0 h-full z-50" : "relative"}
          ${isMobileOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : ""}
          w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out
        `}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="flex items-center gap-2 font-semibold text-lg text-black">
              <span>📖</span>
              <span>Study Guide</span>
            </span>
            <button
              onClick={closeMobileSidebar}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-xl"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        )}

        {/* Desktop Header */}
        {!isMobile && (
          <div className="p-4 border-b border-border">
            <h2 className="flex items-center gap-2 font-semibold text-lg text-black">
              <span>📖</span>
              <span>Study Guide</span>
            </h2>
          </div>
        )}

        {/* Navigation */}
        <nav className="overflow-y-auto h-[calc(100%-64px)]">
          <ul className="p-2 space-y-1">
            {menuItems.map((item, index) => (
              <MenuItemComponent key={index} item={item} />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
