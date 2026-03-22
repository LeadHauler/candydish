import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  DollarSign,
  Clock,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  Package,
  Zap,
} from "lucide-react";

const categories = [
  { value: "all", label: "All Tactics" },
  { value: "real_estate", label: "Real Estate" },
  { value: "contractors", label: "Contractors" },
  { value: "door_hangers", label: "Door Hangers" },
  { value: "vehicle_wraps", label: "Vehicle Wraps" },
  { value: "community", label: "Community" },
  { value: "digital", label: "Digital" },
  { value: "referral", label: "Referral" },
  { value: "seasonal", label: "Seasonal" },
];

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-red-100 text-red-700",
};

const categoryColors: Record<string, string> = {
  real_estate: "bg-blue-100 text-blue-700",
  contractors: "bg-orange-100 text-orange-700",
  door_hangers: "bg-purple-100 text-purple-700",
  vehicle_wraps: "bg-teal-100 text-teal-700",
  community: "bg-green-100 text-green-700",
  digital: "bg-indigo-100 text-indigo-700",
  referral: "bg-rose-100 text-rose-700",
  seasonal: "bg-amber-100 text-amber-700",
  other: "bg-gray-100 text-gray-700",
};

type Campaign = {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  costMin: number;
  costMax: number;
  description: string;
  steps: string;
  expectedLeads: string | null;
  timeToResults: string | null;
  materials: string | null;
  proTip: string | null;
};

export default function Campaigns() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Campaign | null>(null);

  const { data: campaigns, isLoading } = trpc.campaigns.list.useQuery();
  const { data: savedIds } = trpc.campaigns.savedIds.useQuery(undefined, { enabled: isAuthenticated });
  const utils = trpc.useUtils();

  const saveMutation = trpc.campaigns.save.useMutation({
    onSuccess: () => { utils.campaigns.savedIds.invalidate(); toast.success("Campaign saved!"); },
  });
  const unsaveMutation = trpc.campaigns.unsave.useMutation({
    onSuccess: () => { utils.campaigns.savedIds.invalidate(); toast.success("Campaign removed."); },
  });

  const filtered = campaigns?.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || c.category === category;
    return matchesSearch && matchesCategory;
  });

  const isSaved = (id: number) => savedIds?.includes(id) ?? false;

  const handleSave = (id: number) => {
    if (!isAuthenticated) { toast.error("Sign in to save campaigns"); return; }
    if (isSaved(id)) unsaveMutation.mutate({ campaignId: id });
    else saveMutation.mutate({ campaignId: id });
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Campaign Idea Library</h1>
        <p className="text-muted-foreground mt-1">Proven junk removal lead generation tactics with step-by-step guides.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tactics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                category === c.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-52 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[c.category] ?? "bg-gray-100 text-gray-700"}`}>
                    {c.category.replace(/_/g, " ")}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${difficultyColors[c.difficulty]}`}>
                    {c.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => handleSave(c.id)}
                  className="text-muted-foreground hover:text-primary transition-colors ml-2 flex-shrink-0"
                >
                  {isSaved(c.id) ? (
                    <BookmarkCheck className="w-4.5 h-4.5 text-primary" />
                  ) : (
                    <Bookmark className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>

              <h3 className="font-bold text-foreground mb-2 leading-tight">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">{c.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    ${c.costMin}–${c.costMax}
                  </span>
                  {c.timeToResults && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {c.timeToResults.split(",")[0]}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs h-7 text-primary hover:text-primary hover:bg-primary/8"
                  onClick={() => setSelected(c as Campaign)}
                >
                  View Guide
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Lightbulb className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No campaigns found. Try a different search or filter.</p>
        </div>
      )}

      {/* Campaign detail drawer */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[selected.category] ?? "bg-gray-100 text-gray-700"}`}>
                    {selected.category.replace(/_/g, " ")}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${difficultyColors[selected.difficulty]}`}>
                    {selected.difficulty}
                  </span>
                </div>
                <SheetTitle className="text-xl font-extrabold leading-tight">{selected.title}</SheetTitle>
              </SheetHeader>

              <div className="space-y-6">
                {/* Overview */}
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <DollarSign className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs font-semibold text-foreground">${selected.costMin}–${selected.costMax}</p>
                    <p className="text-xs text-muted-foreground">Cost range</p>
                  </div>
                  {selected.expectedLeads && (
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <TrendingUp className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                      <p className="text-xs font-semibold text-foreground leading-tight">{selected.expectedLeads.split(" ")[0]}</p>
                      <p className="text-xs text-muted-foreground">Expected leads</p>
                    </div>
                  )}
                  {selected.timeToResults && (
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <Clock className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                      <p className="text-xs font-semibold text-foreground leading-tight">{selected.timeToResults.split(",")[0]}</p>
                      <p className="text-xs text-muted-foreground">Time to results</p>
                    </div>
                  )}
                </div>

                {/* Steps */}
                <div>
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Step-by-Step Guide
                  </h4>
                  <ol className="space-y-3">
                    {(JSON.parse(selected.steps) as string[]).map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm text-foreground leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Materials */}
                {selected.materials && (
                  <div>
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4 text-amber-500" />
                      Materials Needed
                    </h4>
                    <ul className="space-y-1.5">
                      {(JSON.parse(selected.materials) as string[]).map((m, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pro tip */}
                {selected.proTip && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="font-bold text-amber-800 mb-1.5 flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4" />
                      Pro Tip
                    </h4>
                    <p className="text-sm text-amber-700 leading-relaxed">{selected.proTip}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 bg-primary text-primary-foreground"
                    onClick={() => handleSave(selected.id)}
                  >
                    {isSaved(selected.id) ? (
                      <><BookmarkCheck className="w-4 h-4 mr-2" />Saved</>
                    ) : (
                      <><Bookmark className="w-4 h-4 mr-2" />Save Campaign</>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
