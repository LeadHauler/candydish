import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Plus,
  Target,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  MoreVertical,
  Pencil,
  Trash2,
  LogIn,
} from "lucide-react";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  planned: "bg-gray-100 text-gray-600",
  active: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  paused: "bg-amber-100 text-amber-700",
};

type TacticForm = {
  campaignTitle: string;
  date: string;
  location: string;
  contactsMade: string;
  leadsGenerated: string;
  cost: string;
  status: "planned" | "active" | "completed" | "paused";
  notes: string;
};

const emptyForm: TacticForm = {
  campaignTitle: "",
  date: new Date().toISOString().split("T")[0],
  location: "",
  contactsMade: "0",
  leadsGenerated: "0",
  cost: "0",
  status: "planned",
  notes: "",
};

export default function Tactics() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<TacticForm>(emptyForm);
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: tactics, isLoading } = trpc.tactics.list.useQuery(undefined, { enabled: isAuthenticated });
  const utils = trpc.useUtils();

  const createMutation = trpc.tactics.create.useMutation({
    onSuccess: () => {
      utils.tactics.list.invalidate();
      toast.success("Tactic logged!");
      setOpen(false);
      setForm(emptyForm);
    },
    onError: () => toast.error("Failed to save tactic"),
  });

  const updateMutation = trpc.tactics.update.useMutation({
    onSuccess: () => {
      utils.tactics.list.invalidate();
      toast.success("Tactic updated!");
      setOpen(false);
      setEditId(null);
      setForm(emptyForm);
    },
  });

  const deleteMutation = trpc.tactics.delete.useMutation({
    onSuccess: () => {
      utils.tactics.list.invalidate();
      toast.success("Tactic deleted.");
    },
  });

  const handleSubmit = () => {
    if (!form.campaignTitle.trim()) { toast.error("Campaign title is required"); return; }
    const payload = {
      campaignTitle: form.campaignTitle,
      date: new Date(form.date),
      location: form.location || undefined,
      contactsMade: parseInt(form.contactsMade) || 0,
      leadsGenerated: parseInt(form.leadsGenerated) || 0,
      cost: form.cost || "0",
      status: form.status,
      notes: form.notes || undefined,
    };
    if (editId) updateMutation.mutate({ id: editId, ...payload });
    else createMutation.mutate(payload);
  };

  const openEdit = (t: typeof tactics extends (infer U)[] | undefined ? U : never) => {
    if (!t) return;
    setEditId(t.id);
    setForm({
      campaignTitle: t.campaignTitle,
      date: new Date(t.date).toISOString().split("T")[0],
      location: t.location ?? "",
      contactsMade: String(t.contactsMade ?? 0),
      leadsGenerated: String(t.leadsGenerated ?? 0),
      cost: String(t.cost ?? "0"),
      status: t.status,
      notes: t.notes ?? "",
    });
    setOpen(true);
  };

  const filtered = tactics?.filter((t) => filterStatus === "all" || t.status === filterStatus);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-8">
        <div className="text-center max-w-sm">
          <Target className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Sign in to track your tactics</h2>
          <p className="text-muted-foreground text-sm mb-6">Log activities, track leads, and measure your offline marketing performance.</p>
          <Button className="bg-primary text-primary-foreground" onClick={() => (window.location.href = getLoginUrl())}>
            <LogIn className="w-4 h-4 mr-2" />Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Tactic Tracker</h1>
          <p className="text-muted-foreground mt-1">Log and track your offline lead generation activities.</p>
        </div>
        <Button
          className="bg-primary text-primary-foreground"
          onClick={() => { setEditId(null); setForm(emptyForm); setOpen(true); }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Log Activity
        </Button>
      </div>

      {/* Summary row */}
      {tactics && tactics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Logs", value: tactics.length, icon: Target, color: "text-blue-600 bg-blue-50" },
            { label: "Active", value: tactics.filter((t) => t.status === "active").length, icon: TrendingUp, color: "text-green-600 bg-green-50" },
            { label: "Total Leads", value: tactics.reduce((s, t) => s + (t.leadsGenerated ?? 0), 0), icon: Users, color: "text-amber-600 bg-amber-50" },
            { label: "Total Spent", value: `$${tactics.reduce((s, t) => s + parseFloat(String(t.cost ?? "0")), 0).toFixed(0)}`, icon: DollarSign, color: "text-purple-600 bg-purple-50" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-foreground leading-none">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["all", "planned", "active", "completed", "paused"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-bold text-foreground">{t.campaignTitle}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[t.status]}`}>
                      {t.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(t.date), "MMM d, yyyy")}
                    </span>
                    {t.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {t.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {t.contactsMade} contacts
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {t.leadsGenerated} leads
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      ${parseFloat(String(t.cost ?? "0")).toFixed(2)}
                    </span>
                  </div>
                  {t.notes && <p className="text-xs text-muted-foreground mt-2 italic line-clamp-1">{t.notes}</p>}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEdit(t)}>
                      <Pencil className="w-4 h-4 mr-2" />Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => deleteMutation.mutate({ id: t.id })}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Target className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No tactic logs yet. Start tracking your activities!</p>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={() => { setEditId(null); setForm(emptyForm); setOpen(true); }}
          >
            <Plus className="w-4 h-4 mr-2" />Log Your First Activity
          </Button>
        </div>
      )}

      {/* Log/Edit Dialog */}
      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditId(null); setForm(emptyForm); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Tactic Log" : "Log New Activity"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Campaign / Tactic Name *</Label>
              <Input
                value={form.campaignTitle}
                onChange={(e) => setForm({ ...form, campaignTitle: e.target.value })}
                placeholder="e.g., Real Estate Office Drop-Off"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Date *</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as TacticForm["status"] })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g., Downtown real estate offices" className="mt-1" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Contacts Made</Label>
                <Input type="number" min="0" value={form.contactsMade} onChange={(e) => setForm({ ...form, contactsMade: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Leads Generated</Label>
                <Input type="number" min="0" value={form.leadsGenerated} onChange={(e) => setForm({ ...form, leadsGenerated: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Cost ($)</Label>
                <Input type="number" min="0" step="0.01" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any observations, follow-up actions..." className="mt-1 resize-none" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {editId ? "Save Changes" : "Log Activity"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
