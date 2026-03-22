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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Plus,
  Users,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
  LogIn,
  Building2,
  DollarSign,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";

const partnerTypeLabels: Record<string, string> = {
  real_estate_agent: "Real Estate Agent",
  contractor: "Contractor",
  property_manager: "Property Manager",
  interior_designer: "Interior Designer",
  moving_company: "Moving Company",
  other: "Other",
};

const partnerTypeColors: Record<string, string> = {
  real_estate_agent: "bg-blue-100 text-blue-700",
  contractor: "bg-orange-100 text-orange-700",
  property_manager: "bg-purple-100 text-purple-700",
  interior_designer: "bg-rose-100 text-rose-700",
  moving_company: "bg-teal-100 text-teal-700",
  other: "bg-gray-100 text-gray-700",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  prospect: "bg-amber-100 text-amber-700",
};

type PartnerForm = {
  name: string;
  company: string;
  type: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  status: string;
};

const emptyPartnerForm: PartnerForm = {
  name: "", company: "", type: "real_estate_agent",
  phone: "", email: "", address: "", notes: "", status: "prospect",
};

type ReferralForm = {
  leadName: string;
  date: string;
  status: string;
  revenue: string;
  notes: string;
};

const emptyReferralForm: ReferralForm = {
  leadName: "", date: new Date().toISOString().split("T")[0],
  status: "pending", revenue: "", notes: "",
};

export default function Partners() {
  const { isAuthenticated } = useAuth();
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [editPartnerId, setEditPartnerId] = useState<number | null>(null);
  const [partnerForm, setPartnerForm] = useState<PartnerForm>(emptyPartnerForm);
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [referralOpen, setReferralOpen] = useState(false);
  const [referralForm, setReferralForm] = useState<ReferralForm>(emptyReferralForm);
  const [filterType, setFilterType] = useState("all");

  const { data: partners, isLoading } = trpc.partners.list.useQuery(undefined, { enabled: isAuthenticated });
  const { data: referrals } = trpc.partners.referrals.byPartner.useQuery(
    { partnerId: selectedPartner! },
    { enabled: !!selectedPartner && isAuthenticated }
  );
  const utils = trpc.useUtils();

  const createPartner = trpc.partners.create.useMutation({
    onSuccess: () => { utils.partners.list.invalidate(); toast.success("Partner added!"); setPartnerOpen(false); setPartnerForm(emptyPartnerForm); },
  });
  const updatePartner = trpc.partners.update.useMutation({
    onSuccess: () => { utils.partners.list.invalidate(); toast.success("Partner updated!"); setPartnerOpen(false); setEditPartnerId(null); setPartnerForm(emptyPartnerForm); },
  });
  const deletePartner = trpc.partners.delete.useMutation({
    onSuccess: () => { utils.partners.list.invalidate(); toast.success("Partner removed."); },
  });
  const createReferral = trpc.partners.referrals.create.useMutation({
    onSuccess: () => {
      utils.partners.referrals.byPartner.invalidate({ partnerId: selectedPartner! });
      toast.success("Referral logged!");
      setReferralOpen(false);
      setReferralForm(emptyReferralForm);
    },
  });
  const updateReferral = trpc.partners.referrals.update.useMutation({
    onSuccess: () => { utils.partners.referrals.byPartner.invalidate({ partnerId: selectedPartner! }); toast.success("Updated!"); },
  });
  const deleteReferral = trpc.partners.referrals.delete.useMutation({
    onSuccess: () => { utils.partners.referrals.byPartner.invalidate({ partnerId: selectedPartner! }); toast.success("Deleted."); },
  });

  const handlePartnerSubmit = () => {
    if (!partnerForm.name.trim()) { toast.error("Name required"); return; }
    const payload = {
      name: partnerForm.name,
      company: partnerForm.company || undefined,
      type: partnerForm.type as Parameters<typeof createPartner.mutate>[0]["type"],
      phone: partnerForm.phone || undefined,
      email: partnerForm.email || undefined,
      address: partnerForm.address || undefined,
      notes: partnerForm.notes || undefined,
      status: partnerForm.status as "active" | "inactive" | "prospect",
    };
    if (editPartnerId) updatePartner.mutate({ id: editPartnerId, ...payload });
    else createPartner.mutate(payload);
  };

  const openEditPartner = (p: NonNullable<typeof partners>[number]) => {
    setEditPartnerId(p.id);
    setPartnerForm({
      name: p.name, company: p.company ?? "", type: p.type,
      phone: p.phone ?? "", email: p.email ?? "", address: p.address ?? "",
      notes: p.notes ?? "", status: p.status,
    });
    setPartnerOpen(true);
  };

  const filtered = partners?.filter((p) => filterType === "all" || p.type === filterType);
  const selectedPartnerData = partners?.find((p) => p.id === selectedPartner);
  const referralRevenue = referrals?.reduce((s, r) => s + parseFloat(String(r.revenue ?? "0")), 0) ?? 0;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-8">
        <div className="text-center max-w-sm">
          <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Sign in to manage partners</h2>
          <p className="text-muted-foreground text-sm mb-6">Track real estate agents, contractors, and referral sources.</p>
          <Button className="bg-primary text-primary-foreground" onClick={() => (window.location.href = getLoginUrl())}>
            <LogIn className="w-4 h-4 mr-2" />Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Partner & Referral Management</h1>
          <p className="text-muted-foreground mt-1">Track your local referral network and measure partner performance.</p>
        </div>
        <Button className="bg-primary text-primary-foreground" onClick={() => { setEditPartnerId(null); setPartnerForm(emptyPartnerForm); setPartnerOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />Add Partner
        </Button>
      </div>

      {/* Stats */}
      {partners && partners.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Partners", value: partners.length },
            { label: "Active", value: partners.filter((p) => p.status === "active").length },
            { label: "Prospects", value: partners.filter((p) => p.status === "prospect").length },
            { label: "Real Estate", value: partners.filter((p) => p.type === "real_estate_agent").length },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[{ value: "all", label: "All" }, ...Object.entries(partnerTypeLabels).map(([v, l]) => ({ value: v, label: l }))].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterType(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === f.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Partner grid */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${partnerTypeColors[p.type]}`}>
                      {partnerTypeLabels[p.type]}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status]}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground">{p.name}</h3>
                  {p.company && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Building2 className="w-3 h-3" />{p.company}</p>}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditPartner(p)}>
                      <Pencil className="w-4 h-4 mr-2" />Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => deletePartner.mutate({ id: p.id })}>
                      <Trash2 className="w-4 h-4 mr-2" />Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-1 mb-3">
                {p.phone && <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Phone className="w-3 h-3" />{p.phone}</p>}
                {p.email && <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Mail className="w-3 h-3" />{p.email}</p>}
                {p.address && <p className="text-xs text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3 h-3" />{p.address}</p>}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs h-7 text-primary hover:text-primary hover:bg-primary/8"
                onClick={() => setSelectedPartner(p.id)}
              >
                View Referrals <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Users className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No partners yet. Add your first referral source!</p>
          <Button className="bg-primary text-primary-foreground" onClick={() => { setEditPartnerId(null); setPartnerForm(emptyPartnerForm); setPartnerOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" />Add Partner
          </Button>
        </div>
      )}

      {/* Partner detail / referrals sheet */}
      <Sheet open={!!selectedPartner} onOpenChange={(v) => !v && setSelectedPartner(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selectedPartnerData && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${partnerTypeColors[selectedPartnerData.type]}`}>
                    {partnerTypeLabels[selectedPartnerData.type]}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[selectedPartnerData.status]}`}>
                    {selectedPartnerData.status}
                  </span>
                </div>
                <SheetTitle className="text-xl font-extrabold">{selectedPartnerData.name}</SheetTitle>
                {selectedPartnerData.company && <p className="text-sm text-muted-foreground">{selectedPartnerData.company}</p>}
              </SheetHeader>

              {/* Contact info */}
              <div className="space-y-2 mb-6">
                {selectedPartnerData.phone && (
                  <a href={`tel:${selectedPartnerData.phone}`} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4 text-muted-foreground" />{selectedPartnerData.phone}
                  </a>
                )}
                {selectedPartnerData.email && (
                  <a href={`mailto:${selectedPartnerData.email}`} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 text-muted-foreground" />{selectedPartnerData.email}
                  </a>
                )}
                {selectedPartnerData.address && (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />{selectedPartnerData.address}
                  </p>
                )}
              </div>

              {/* Referral stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-muted rounded-xl p-3 text-center">
                  <TrendingUp className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                  <p className="text-lg font-extrabold text-foreground">{referrals?.length ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Total Referrals</p>
                </div>
                <div className="bg-muted rounded-xl p-3 text-center">
                  <DollarSign className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                  <p className="text-lg font-extrabold text-foreground">${referralRevenue.toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">Revenue Attributed</p>
                </div>
              </div>

              {/* Referrals */}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-foreground">Referral History</h4>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setReferralOpen(true)}>
                  <Plus className="w-3.5 h-3.5 mr-1" />Log Referral
                </Button>
              </div>

              {referrals && referrals.length > 0 ? (
                <div className="space-y-2">
                  {referrals.map((r) => (
                    <div key={r.id} className="bg-muted rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{r.leadName || "Unnamed Lead"}</p>
                          <p className="text-xs text-muted-foreground">{format(new Date(r.date), "MMM d, yyyy")}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            r.status === "converted" ? "bg-green-100 text-green-700" :
                            r.status === "pending" ? "bg-amber-100 text-amber-700" :
                            r.status === "contacted" ? "bg-blue-100 text-blue-700" :
                            "bg-red-100 text-red-700"
                          }`}>{r.status}</span>
                          {parseFloat(String(r.revenue ?? "0")) > 0 && (
                            <span className="text-xs font-bold text-green-600">${parseFloat(String(r.revenue ?? "0")).toFixed(0)}</span>
                          )}
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => deleteReferral.mutate({ id: r.id })}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      {r.notes && <p className="text-xs text-muted-foreground mt-1 italic">{r.notes}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No referrals logged yet.</p>
                </div>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Add/Edit Partner Dialog */}
      <Dialog open={partnerOpen} onOpenChange={(v) => { setPartnerOpen(v); if (!v) { setEditPartnerId(null); setPartnerForm(emptyPartnerForm); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editPartnerId ? "Edit Partner" : "Add Partner"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Name *</Label>
                <Input value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} placeholder="Full name" className="mt-1" />
              </div>
              <div>
                <Label>Company</Label>
                <Input value={partnerForm.company} onChange={(e) => setPartnerForm({ ...partnerForm, company: e.target.value })} placeholder="Company name" className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Type</Label>
                <Select value={partnerForm.type} onValueChange={(v) => setPartnerForm({ ...partnerForm, type: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(partnerTypeLabels).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={partnerForm.status} onValueChange={(v) => setPartnerForm({ ...partnerForm, status: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Phone</Label>
                <Input value={partnerForm.phone} onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })} placeholder="(555) 000-0000" className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={partnerForm.email} onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })} placeholder="email@example.com" className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Input value={partnerForm.address} onChange={(e) => setPartnerForm({ ...partnerForm, address: e.target.value })} placeholder="Office address" className="mt-1" />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea value={partnerForm.notes} onChange={(e) => setPartnerForm({ ...partnerForm, notes: e.target.value })} placeholder="Any notes about this partner..." className="mt-1 resize-none" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPartnerOpen(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={handlePartnerSubmit} disabled={createPartner.isPending || updatePartner.isPending}>
              {editPartnerId ? "Save Changes" : "Add Partner"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Log Referral Dialog */}
      <Dialog open={referralOpen} onOpenChange={setReferralOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Log Referral</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Lead Name</Label>
              <Input value={referralForm.leadName} onChange={(e) => setReferralForm({ ...referralForm, leadName: e.target.value })} placeholder="Customer name" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Date</Label>
                <Input type="date" value={referralForm.date} onChange={(e) => setReferralForm({ ...referralForm, date: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={referralForm.status} onValueChange={(v) => setReferralForm({ ...referralForm, status: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Revenue ($)</Label>
              <Input type="number" min="0" step="0.01" value={referralForm.revenue} onChange={(e) => setReferralForm({ ...referralForm, revenue: e.target.value })} placeholder="Job revenue if converted" className="mt-1" />
            </div>
            <div>
              <Label>Notes</Label>
              <Input value={referralForm.notes} onChange={(e) => setReferralForm({ ...referralForm, notes: e.target.value })} placeholder="Any notes..." className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReferralOpen(false)}>Cancel</Button>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={() => {
                if (!selectedPartner) return;
                createReferral.mutate({
                  partnerId: selectedPartner,
                  leadName: referralForm.leadName || undefined,
                  date: new Date(referralForm.date),
                  status: referralForm.status as "pending" | "contacted" | "converted" | "lost",
                  revenue: referralForm.revenue || "0",
                  notes: referralForm.notes || undefined,
                });
              }}
              disabled={createReferral.isPending}
            >
              Log Referral
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
