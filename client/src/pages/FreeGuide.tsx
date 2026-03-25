import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/tease_277cfc70.PNG";

export default function FreeGuide() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", business: "" });
  const [submitted, setSubmitted] = useState(false);

  const submit = trpc.contact.submitGuide.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", { content_name: "Free Guide Download" });
      }
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "Landing Page",
          event_label: "Free Guide Download",
        });
      }
    },
    onError: (err: { message?: string }) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Please fill in your name, phone number, and email.");
      return;
    }
    submit.mutate(form);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* ── NAV ── */}
      <header className="h-16 flex items-center justify-center border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Lead<span className="text-[#f5a623]">Hauler</span>
          </span>
          <span className="hidden sm:block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
            Smarter Marketing for Junk Removal
          </span>
        </a>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 py-12 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            Free Resource — Junk Removal Owners
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-8 text-foreground">
            Your Competitors Are Missing{" "}
            <span className="text-primary">This Local Lead Source</span>
          </h1>

          {/* ── HERO IMAGE ── */}
          <div className="mb-10">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={HERO_IMAGE}
                alt="LeadHauler — Mike pointing at the free guide"
                className="w-full block object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <p className="mt-3 text-center text-sm italic text-muted-foreground">
              The exact lead source 90% of junk haulers are ignoring.
            </p>
          </div>

          {/* Body copy */}
          <div className="text-muted-foreground text-base sm:text-lg leading-relaxed space-y-4 mb-10">
            <p>Most junk removal companies are fighting over the same leads…</p>
            <p className="text-foreground font-semibold">
              Google Ads.<br />
              Facebook Ads.<br />
              LSAs.
            </p>
            <p>
              Meanwhile, there's a quiet stream of homeowners actively asking for junk removal
              help… and barely anyone is responding.
            </p>
            <p>
              We put together a{" "}
              <span className="text-foreground font-semibold">free breakdown</span> showing:
            </p>
            <ul className="space-y-3 pl-1">
              {[
                "Where these requests are happening",
                "How to find them daily",
                "What to say to turn them into booked jobs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm">
              No fluff. Just a simple system you can start using today.
            </p>
          </div>

          {/* ── FORM ── */}
          {submitted ? (
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-xl font-extrabold text-foreground mb-2">You're all set!</h2>
              <p className="text-muted-foreground text-sm">
                We'll be in touch shortly with your free breakdown. Check your phone — we may reach out via text.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8">
              <p className="text-foreground font-bold text-lg mb-1">Download it free</p>
              <p className="text-muted-foreground text-sm mb-6">
                Enter your info below and we'll send it right over.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@yourcompany.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Business Name{" "}
                    <span className="text-muted-foreground/60 normal-case font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Junk Removal"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submit.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-4 rounded-xl text-base transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
                >
                  {submit.isPending ? (
                    "Sending…"
                  ) : (
                    <>
                      Send Me the Free Breakdown
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Social proof */}
                <div className="flex flex-col items-center gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {["M", "T", "D"].map((initial) => (
                        <div
                          key={initial}
                          className="w-7 h-7 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary"
                        >
                          {initial}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Join <span className="text-foreground font-bold">200+ junk haulers</span> already using this system
                    </p>
                  </div>
                  <blockquote className="w-full text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                    "This one tip alone booked us 4 extra jobs in the first week."
                    <span className="not-italic font-semibold text-foreground block mt-0.5">— Marcus T., Dallas TX</span>
                  </blockquote>
                  <p className="text-center text-muted-foreground text-xs">
                    No spam. Just the breakdown. We may follow up by text or phone.
                  </p>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-5 px-6 text-center text-muted-foreground text-xs border-t border-border">
        © {new Date().getFullYear()} LeadHauler. All rights reserved.
      </footer>

    </div>
  );
}
