import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { toast } from "sonner";
import {
  TrendingUp,
  DollarSign,
  Target,
  Calculator,
  Plus,
  Trash2,
  LogIn,
} from "lucide-react";
import { format } from "date-fns";

export default function ROIDashboard() {
  const { isAuthenticated } = useAuth();
  const [calcOpen, setCalcOpen] = useState(false);
  const [convOpen, setConvOpen] = useState(false);
  const [calcInputs, setCalcInputs] = useState({ cost: "", leads: "", conversions: "", avgRevenue: "" });
  const [convForm, setConvForm] = useState({ campaignTitle: "", leadName: "", revenue: "", notes: "" });

  const { data: tactics } = trpc.tactics.list.useQuery(undefined, { enabled: isAuthenticated });
  const { data: conversions } = trpc.conversions.list.useQuery(undefined, { enabled: isAuthenticated });
  const utils = trpc.useUtils();

  const createConversion = trpc.conversions.create.useMutation({
    onSuccess: () => {
      utils.conversions.list.invalidate();
      toast.success("Conversion logged!");
      setConvOpen(false);
      setConvForm({ campaignTitle: "", leadName: "", revenue: "", notes: "" });
    },
  });

  const deleteConversion = trpc.conversions.delete.useMutation({
    onSuccess: () => { utils.conversions.list.invalidate(); toast.success("Deleted."); },
  });

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-8">
        <div className="text-center max-w-sm">
          <TrendingUp className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Sign in to view your ROI</h2>
          <p className="text-muted-foreground text-sm mb-6">Track revenue, cost per lead, and conversion rates across all your tactics.</p>
          <Button className="bg-primary text-primary-foreground" onClick={() => (window.location.href = getLoginUrl())}>
            <LogIn className="w-4 h-4 mr-2" />Sign In
          </Button>
        </div>
      </div>
    );
  }

  // Aggregate stats
  const totalCost = tactics?.reduce((s, t) => s + parseFloat(String(t.cost ?? "0")), 0) ?? 0;
  const totalLeads = tactics?.reduce((s, t) => s + (t.leadsGenerated ?? 0), 0) ?? 0;
  const totalRevenue = conversions?.reduce((s, c) => s + parseFloat(String(c.revenue ?? "0")), 0) ?? 0;
  const totalConversions = conversions?.length ?? 0;
  const costPerLead = totalLeads > 0 ? totalCost / totalLeads : 0;
  const conversionRate = totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0;
  const roi = totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;

  // Chart data: revenue by tactic
  const tacticRevenueMap: Record<string, { leads: number; cost: number; revenue: number }> = {};
  tactics?.forEach((t) => {
    if (!tacticRevenueMap[t.campaignTitle]) tacticRevenueMap[t.campaignTitle] = { leads: 0, cost: 0, revenue: 0 };
    tacticRevenueMap[t.campaignTitle].leads += t.leadsGenerated ?? 0;
    tacticRevenueMap[t.campaignTitle].cost += parseFloat(String(t.cost ?? "0"));
  });
  conversions?.forEach((c) => {
    if (!tacticRevenueMap[c.campaignTitle]) tacticRevenueMap[c.campaignTitle] = { leads: 0, cost: 0, revenue: 0 };
    tacticRevenueMap[c.campaignTitle].revenue += parseFloat(String(c.revenue ?? "0"));
  });

  const barData = Object.entries(tacticRevenueMap)
    .map(([name, d]) => ({
      name: name.length > 18 ? name.slice(0, 18) + "…" : name,
      Revenue: Math.round(d.revenue),
      Cost: Math.round(d.cost),
      Leads: d.leads,
    }))
    .sort((a, b) => b.Revenue - a.Revenue)
    .slice(0, 8);

  // Monthly trend
  const monthlyMap: Record<string, { leads: number; revenue: number }> = {};
  tactics?.forEach((t) => {
    const m = format(new Date(t.date), "MMM yy");
    if (!monthlyMap[m]) monthlyMap[m] = { leads: 0, revenue: 0 };
    monthlyMap[m].leads += t.leadsGenerated ?? 0;
  });
  conversions?.forEach((c) => {
    const m = format(new Date(c.convertedAt), "MMM yy");
    if (!monthlyMap[m]) monthlyMap[m] = { leads: 0, revenue: 0 };
    monthlyMap[m].revenue += parseFloat(String(c.revenue ?? "0"));
  });
  const lineData = Object.entries(monthlyMap).map(([month, d]) => ({ month, ...d }));

  // Calculator results
  const calcCost = parseFloat(calcInputs.cost) || 0;
  const calcLeads = parseFloat(calcInputs.leads) || 0;
  const calcConv = parseFloat(calcInputs.conversions) || 0;
  const calcRev = parseFloat(calcInputs.avgRevenue) || 0;
  const calcCPL = calcLeads > 0 ? calcCost / calcLeads : 0;
  const calcTotalRev = calcConv * calcRev;
  const calcROI = calcCost > 0 ? ((calcTotalRev - calcCost) / calcCost) * 100 : 0;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">ROI Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your lead generation performance and revenue attribution.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCalcOpen(true)}>
            <Calculator className="w-4 h-4 mr-2" />ROI Calculator
          </Button>
          <Button className="bg-primary text-primary-foreground" onClick={() => setConvOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />Log Conversion
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: DollarSign, color: "text-green-600 bg-green-50", change: "tracked" },
          { label: "Cost Per Lead", value: `$${costPerLead.toFixed(2)}`, icon: Target, color: "text-blue-600 bg-blue-50", change: `${totalLeads} leads` },
          { label: "Conversion Rate", value: `${conversionRate.toFixed(1)}%`, icon: TrendingUp, color: "text-amber-600 bg-amber-50", change: `${totalConversions} conversions` },
          { label: "Overall ROI", value: `${roi.toFixed(0)}%`, icon: TrendingUp, color: roi >= 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50", change: `$${totalCost.toFixed(0)} spent` },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{s.label}</p>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue by tactic */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Revenue & Cost by Tactic</h3>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => `$${v}`} />
                <Bar dataKey="Revenue" fill="oklch(0.22 0.06 265)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Cost" fill="oklch(0.82 0.16 75)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
              Log tactics and conversions to see data here.
            </div>
          )}
        </div>

        {/* Monthly trend */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Monthly Leads & Revenue</h3>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={lineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="oklch(0.22 0.06 265)" strokeWidth={2} dot={false} name="Leads" />
                <Line type="monotone" dataKey="revenue" stroke="oklch(0.82 0.16 75)" strokeWidth={2} dot={false} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
              No trend data yet. Keep logging!
            </div>
          )}
        </div>
      </div>

      {/* Conversions table */}
      <div className="bg-card border border-border rounded-xl">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-foreground">Conversion Log</h3>
          <Button size="sm" variant="outline" onClick={() => setConvOpen(true)}>
            <Plus className="w-3.5 h-3.5 mr-1.5" />Add
          </Button>
        </div>
        {conversions && conversions.length > 0 ? (
          <div className="divide-y divide-border">
            {conversions.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{c.leadName || "Unnamed Lead"}</p>
                  <p className="text-xs text-muted-foreground">{c.campaignTitle} · {format(new Date(c.convertedAt), "MMM d, yyyy")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-green-600">${parseFloat(String(c.revenue ?? "0")).toFixed(0)}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => deleteConversion.mutate({ id: c.id })}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <DollarSign className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No conversions logged yet.</p>
          </div>
        )}
      </div>

      {/* ROI Calculator Dialog */}
      <Dialog open={calcOpen} onOpenChange={setCalcOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              ROI Calculator
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {[
              { label: "Total Cost ($)", key: "cost", placeholder: "e.g., 150" },
              { label: "Leads Generated", key: "leads", placeholder: "e.g., 20" },
              { label: "Conversions", key: "conversions", placeholder: "e.g., 4" },
              { label: "Avg Revenue per Job ($)", key: "avgRevenue", placeholder: "e.g., 350" },
            ].map((f) => (
              <div key={f.key}>
                <Label>{f.label}</Label>
                <Input
                  type="number"
                  min="0"
                  placeholder={f.placeholder}
                  value={calcInputs[f.key as keyof typeof calcInputs]}
                  onChange={(e) => setCalcInputs({ ...calcInputs, [f.key]: e.target.value })}
                  className="mt-1"
                />
              </div>
            ))}
            {calcCost > 0 && (
              <div className="bg-muted rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cost per Lead</span>
                  <span className="font-bold">${calcCPL.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-bold text-green-600">${calcTotalRev.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-border pt-2">
                  <span className="text-muted-foreground">ROI</span>
                  <span className={`font-extrabold text-base ${calcROI >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {calcROI.toFixed(0)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Log Conversion Dialog */}
      <Dialog open={convOpen} onOpenChange={setConvOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Log Conversion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Campaign / Tactic *</Label>
              <Input value={convForm.campaignTitle} onChange={(e) => setConvForm({ ...convForm, campaignTitle: e.target.value })} placeholder="Which tactic generated this lead?" className="mt-1" />
            </div>
            <div>
              <Label>Lead Name</Label>
              <Input value={convForm.leadName} onChange={(e) => setConvForm({ ...convForm, leadName: e.target.value })} placeholder="Customer name (optional)" className="mt-1" />
            </div>
            <div>
              <Label>Revenue ($)</Label>
              <Input type="number" min="0" step="0.01" value={convForm.revenue} onChange={(e) => setConvForm({ ...convForm, revenue: e.target.value })} placeholder="Job revenue" className="mt-1" />
            </div>
            <div>
              <Label>Notes</Label>
              <Input value={convForm.notes} onChange={(e) => setConvForm({ ...convForm, notes: e.target.value })} placeholder="Any notes..." className="mt-1" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setConvOpen(false)}>Cancel</Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground"
              onClick={() => {
                if (!convForm.campaignTitle.trim()) { toast.error("Campaign title required"); return; }
                createConversion.mutate({
                  campaignTitle: convForm.campaignTitle,
                  leadName: convForm.leadName || undefined,
                  revenue: convForm.revenue || "0",
                  notes: convForm.notes || undefined,
                });
              }}
              disabled={createConversion.isPending}
            >
              Log Conversion
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
