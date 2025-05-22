import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Banknote,
  ClipboardList,
  Settings,
  ChevronLeft,
  ChevronRight,
  PieChart
} from "lucide-react";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  collapsed: boolean;
}

function SidebarItem({ href, icon, title, isActive, collapsed }: SidebarItemProps) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-3 py-2 h-10",
          isActive
            ? "bg-primary/10 text-primary hover:bg-primary/15"
            : "hover:bg-muted text-muted-foreground hover:text-foreground"
        )}
      >
        <span>{icon}</span>
        {!collapsed && <span>{title}</span>}
      </Button>
    </Link>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Sidebar items
  const items = [
    {
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      title: "Dashboard",
    },
    {
      href: "/products",
      icon: <Package className="h-5 w-5" />,
      title: "Products",
    },
    {
      href: "/sales",
      icon: <ShoppingCart className="h-5 w-5" />,
      title: "Sales",
    },
    {
      href: "/expenses",
      icon: <Banknote className="h-5 w-5" />,
      title: "Expenses",
    },
    {
      href: "/activity-logs",
      icon: <ClipboardList className="h-5 w-5" />,
      title: "Activity Logs",
    },
    {
      href: "/reports",
      icon: <PieChart className="h-5 w-5" />,
      title: "Reports",
    },
    {
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      title: "Settings",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-background",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      {/* Logo/header */}
      <div className="px-3 py-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold">Fertilizer Factory</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "h-8 w-8",
              collapsed && "mx-auto"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={location === item.href}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t text-center text-xs text-muted-foreground">
        {!collapsed && (
          <div>
            <p>Fertilizer Factory Finance</p>
            <p>v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );
}