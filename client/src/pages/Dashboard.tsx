import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  ArrowRight,
  Plus,
  LogIn,
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const { data: tactics } = trpc.tactics.list.useQuery(undefined, { enabled: isAuthenticated });
  const { data: partners } = trpc.partners.list.useQuery(undefined, { enabled: isAuthenticated });
  const { data: conversions } = trpc.conversions.list.useQuery(undefined, { enabled: isAuthenticated });

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-8">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Sign in to access your dashboard</h2>
          <p className="text-muted-foreground text-sm mb-6">Track your campaigns, manage partners, and measure ROI.</p>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={() => (window.location.href = getLoginUrl())}
          >
            Sign In
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  const activeTactics = tactics?.filter((t) => t.status === "active").length ?? 0;
  const totalLeads = tactics?.reduce((sum, t) => sum + (t.leadsGenerated ?? 0), 0) ?? 0;
  const totalRevenue = conversions?.reduce((sum, c) => sum + parseFloat(String(c.revenue ?? "0")), 0) ?? 0;
  const activePartners = partners?.filter((p) => p.status === "active").length ?? 0;

  const stats = [
    { label: "Active Tactics", value: activeTactics, icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Leads", value: totalLeads, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Revenue Tracked", value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Active Partners", value: activePartners, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const quickLinks = [
    { href: "/campaigns", label: "Browse Campaigns", icon: Lightbulb, desc: "Find your next lead tactic" },
    { href: "/tactics", label: "Log Activity", icon: Target, desc: "Record today's outreach" },
    { href: "/roi", label: "View ROI", icon: TrendingUp, desc: "Check your numbers" },
    { href: "/partners", label: "Add Partner", icon: Users, desc: "Track a new referral source" },
    { href: "/templates", label: "Get Templates", icon: FileText, desc: "Download marketing materials" },
    { href: "/community", label: "Community Tips", icon: MessageSquare, desc: "See what's working" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground mt-1">Here's your lead generation overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="border-border">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{s.label}</p>
                    <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
                  </div>
                  <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-4.5 h-4.5 ${s.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((q, i) => {
            const Icon = q.icon;
            return (
              <Link key={i} href={q.href}>
                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-sm transition-all duration-150 cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground">{q.label}</p>
                    <p className="text-xs text-muted-foreground">{q.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent tactics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Recent Tactic Logs</CardTitle>
              <Link href="/tactics">
                <Button variant="ghost" size="sm" className="text-xs h-7">
                  View all <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {tactics && tactics.length > 0 ? (
              <div className="space-y-2">
                {tactics.slice(0, 4).map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{t.campaignTitle}</p>
                      <p className="text-xs text-muted-foreground">{t.location || "No location"}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2 ${
                        t.status === "active"
                          ? "bg-green-100 text-green-700"
                          : t.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : t.status === "paused"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No tactic logs yet.</p>
                <Link href="/tactics">
                  <Button size="sm" variant="outline" className="mt-3">
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Log your first tactic
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Top Partners</CardTitle>
              <Link href="/partners">
                <Button variant="ghost" size="sm" className="text-xs h-7">
                  View all <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {partners && partners.length > 0 ? (
              <div className="space-y-2">
                {partners.slice(0, 4).map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{p.type.replace(/_/g, " ")}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2 ${
                        p.status === "active"
                          ? "bg-green-100 text-green-700"
                          : p.status === "prospect"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No partners added yet.</p>
                <Link href="/partners">
                  <Button size="sm" variant="outline" className="mt-3">
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Add your first partner
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
