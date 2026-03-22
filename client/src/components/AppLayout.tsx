import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  LogOut,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaign Library", icon: Lightbulb },
  { href: "/tactics", label: "Tactic Tracker", icon: Target },
  { href: "/roi", label: "ROI Dashboard", icon: TrendingUp },
  { href: "/partners", label: "Partners", icon: Users },
  { href: "/templates", label: "Templates", icon: FileText },
  { href: "/community", label: "Community", icon: MessageSquare },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, loading } = useAuth();
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "var(--sidebar)", color: "var(--sidebar-foreground)" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--sidebar-border)]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--sidebar-primary)" }}>
              <span className="text-sm font-black" style={{ color: "var(--sidebar-primary-foreground)" }}>C</span>
            </div>
            <div>
              <p className="font-bold text-sm leading-none" style={{ color: "var(--sidebar-foreground)" }}>CandyDish</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--sidebar-accent-foreground)", opacity: 0.6 }}>Leads Platform</p>
            </div>
          </Link>
          <button
            className="lg:hidden p-1 rounded"
            onClick={() => setSidebarOpen(false)}
            style={{ color: "var(--sidebar-foreground)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "text-[var(--sidebar-primary-foreground)]"
                    : "hover:text-[var(--sidebar-foreground)]"
                )}
                style={
                  isActive
                    ? { background: "var(--sidebar-primary)", color: "var(--sidebar-primary-foreground)" }
                    : { color: "oklch(0.75 0.02 265)" }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "var(--sidebar-accent)";
                    (e.currentTarget as HTMLElement).style.color = "var(--sidebar-accent-foreground)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.02 265)";
                  }
                }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="px-3 py-4 border-t border-[var(--sidebar-border)]">
          {loading ? (
            <div className="h-10 rounded-lg bg-[var(--sidebar-accent)] animate-pulse" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--sidebar-accent)] transition-colors">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="text-xs font-semibold" style={{ background: "var(--sidebar-primary)", color: "var(--sidebar-primary-foreground)" }}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--sidebar-foreground)" }}>{user.name || "User"}</p>
                    <p className="text-xs truncate" style={{ color: "oklch(0.65 0.02 265)" }}>{user.email || ""}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout.mutate()}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => (window.location.href = getLoginUrl())}
              style={{ borderColor: "var(--sidebar-border)", color: "var(--sidebar-foreground)", background: "transparent" }}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign in
            </Button>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-xs font-black text-primary-foreground">C</span>
            </div>
            <span className="font-bold text-sm">CandyDish</span>
          </Link>
          <div className="w-9" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
