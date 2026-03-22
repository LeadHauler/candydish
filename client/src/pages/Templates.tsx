import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  FileText,
  Download,
  Printer,
  Eye,
  Sparkles,
} from "lucide-react";

const typeLabels: Record<string, string> = {
  flyer: "Flyer",
  business_card: "Business Card",
  door_hanger: "Door Hanger",
  postcard: "Postcard",
  yard_sign: "Yard Sign",
};

const typeColors: Record<string, string> = {
  flyer: "bg-blue-100 text-blue-700",
  business_card: "bg-purple-100 text-purple-700",
  door_hanger: "bg-green-100 text-green-700",
  postcard: "bg-amber-100 text-amber-700",
  yard_sign: "bg-teal-100 text-teal-700",
};

const fieldLabels: Record<string, string> = {
  businessName: "Business Name",
  ownerName: "Owner Name",
  phone: "Phone Number",
  email: "Email Address",
  website: "Website",
  tagline: "Tagline",
  serviceArea: "Service Area",
  offer: "Special Offer",
  expiry: "Offer Expiry",
  agentOffer: "Agent Offer",
  referralOffer: "Referral Offer",
};

type Template = {
  id: number;
  title: string;
  type: string;
  description: string | null;
  fields: string;
  htmlTemplate: string;
};

export default function Templates() {
  const [selected, setSelected] = useState<Template | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [filterType, setFilterType] = useState("all");
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewing, setPreviewing] = useState(false);

  const { data: templates, isLoading } = trpc.templates.list.useQuery();

  const filtered = templates?.filter((t) => filterType === "all" || t.type === filterType);

  const openTemplate = (t: Template) => {
    setSelected(t);
    const fields = JSON.parse(t.fields) as string[];
    const defaults: Record<string, string> = {};
    fields.forEach((f) => {
      defaults[f] = fieldLabels[f] ? `[${fieldLabels[f]}]` : `[${f}]`;
    });
    setFieldValues(defaults);
    setPreviewing(false);
  };

  const buildHtml = (template: Template, values: Record<string, string>) => {
    let html = template.htmlTemplate;
    Object.entries(values).forEach(([key, val]) => {
      html = html.replaceAll(`{{${key}}}`, val || `[${key}]`);
    });
    return html;
  };

  const handlePreview = () => {
    if (!selected) return;
    setPreviewHtml(buildHtml(selected, fieldValues));
    setPreviewing(true);
  };

  const handlePrint = () => {
    if (!selected) return;
    const html = buildHtml(selected, fieldValues);
    const win = window.open("", "_blank");
    if (!win) { toast.error("Pop-up blocked. Please allow pop-ups to print."); return; }
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${selected.title}</title>
          <style>
            body { margin: 0; padding: 20px; font-family: 'Helvetica Neue', Arial, sans-serif; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 500);
  };

  const handleDownload = () => {
    if (!selected) return;
    const html = buildHtml(selected, fieldValues);
    const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${selected.title}</title>
    <style>
      body { margin: 0; padding: 20px; font-family: 'Helvetica Neue', Arial, sans-serif; }
    </style>
  </head>
  <body>${html}</body>
</html>`;
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selected.title.replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Template downloaded!");
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Marketing Templates</h1>
        <p className="text-muted-foreground mt-1">Customizable flyers, business cards, door hangers, and postcards. Fill in your details and print or download.</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ value: "all", label: "All Templates" }, ...Object.entries(typeLabels).map(([v, l]) => ({ value: v, label: l }))].map((f) => (
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

      {/* Template grid */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-primary/20 transition-all duration-200">
              {/* Preview thumbnail */}
              <div className="h-36 bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center border-b border-border">
                <div className="text-center">
                  <FileText className="w-10 h-10 text-primary/40 mx-auto mb-2" />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[t.type] ?? "bg-gray-100 text-gray-700"}`}>
                    {typeLabels[t.type] ?? t.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-1">{t.title}</h3>
                {t.description && <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{t.description}</p>}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {(JSON.parse(t.fields) as string[]).length} customizable fields
                  </span>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-primary text-primary-foreground"
                    onClick={() => openTemplate(t as Template)}
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No templates found.</p>
        </div>
      )}

      {/* Customize sheet */}
      <Sheet open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[selected.type] ?? "bg-gray-100 text-gray-700"}`}>
                    {typeLabels[selected.type] ?? selected.type}
                  </span>
                </div>
                <SheetTitle className="text-xl font-extrabold">{selected.title}</SheetTitle>
                {selected.description && <p className="text-sm text-muted-foreground">{selected.description}</p>}
              </SheetHeader>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-foreground text-sm">Customize Your Details</h4>
                {(JSON.parse(selected.fields) as string[]).map((field) => (
                  <div key={field}>
                    <Label className="text-xs">{fieldLabels[field] ?? field}</Label>
                    <Input
                      value={fieldValues[field] ?? ""}
                      onChange={(e) => setFieldValues({ ...fieldValues, [field]: e.target.value })}
                      placeholder={`Enter ${(fieldLabels[field] ?? field).toLowerCase()}...`}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>

              {/* Preview */}
              {previewing && previewHtml && (
                <div className="mb-6">
                  <h4 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4" />Preview
                  </h4>
                  <div
                    className="border border-border rounded-xl overflow-hidden bg-white p-4"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={handlePreview}>
                  <Eye className="w-4 h-4 mr-2" />Preview Template
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-primary text-primary-foreground" onClick={handlePrint}>
                    <Printer className="w-4 h-4 mr-2" />Print
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />Download
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
