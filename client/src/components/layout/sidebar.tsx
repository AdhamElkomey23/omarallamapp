import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LuLayoutDashboard,
  LuBox,
  LuShoppingCart,
  LuDollarSign,
  LuClipboardList,
  LuSettings,
  LuLogOut,
  LuChevronLeft,
  LuChevronRight,
  LuMenu
} from "react-icons/lu";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      <a
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
        )}
      >
        <span className="text-xl">{icon}</span>
        {!collapsed && <span>{title}</span>}
      </a>
    </Link>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarItems = [
    { href: "/dashboard", icon: <LuLayoutDashboard />, title: "Dashboard" },
    { href: "/products", icon: <LuBox />, title: "Products" },
    { href: "/sales", icon: <LuShoppingCart />, title: "Sales" },
    { href: "/expenses", icon: <LuDollarSign />, title: "Expenses" },
    { href: "/activity-logs", icon: <LuClipboardList />, title: "Activity Logs" },
    { href: "/settings", icon: <LuSettings />, title: "Settings" },
  ];

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleMobileSidebar}
      >
        <LuMenu className="h-4 w-4" />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-white border-r transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            {!collapsed && <h1 className="text-xl font-bold">Fertilizer FM</h1>}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={toggleSidebar}
            >
              {collapsed ? <LuChevronRight className="h-4 w-4" /> : <LuChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                isActive={location === item.href || location.startsWith(`${item.href}/`)}
                collapsed={collapsed}
              />
            ))}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t">
            <Link href="/login">
              <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                <span className="text-xl"><LuLogOut /></span>
                {!collapsed && <span>Logout</span>}
              </a>
            </Link>
          </div>
        </div>
      </aside>

      {/* Content margin to push content away from sidebar */}
      <div className={cn(
        "hidden md:block",
        collapsed ? "ml-16" : "ml-64"
      )} />
    </>
  );
}