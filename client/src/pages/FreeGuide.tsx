import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight, Clock, X } from "lucide-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/tease_277cfc70.PNG";

// Countdown: 24-hour timer from first visit, persisted in sessionStorage
function useCountdown() {
  const getExpiry = () => {
    if (typeof window === "undefined") return Date.now() + 86400000;
    const stored = sessionStorage.getItem("fg_expiry");
    if (stored) return parseInt(stored, 10);
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    sessionStorage.setItem("fg_expiry", String(expiry));
    return expiry;
  };

  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = getExpiry() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const tick = setInterval(() => {
      const diff = getExpiry() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const h = Math.floor(timeLeft / 3600000);
  const m = Math.floor((timeLeft % 3600000) / 60000);
  const s = Math.floor((timeLeft % 60000) / 1000);
  return { h, m, s, expired: timeLeft === 0 };
}

// Exit-intent popup component
function ExitIntentPopup({
  onClose,
  onSubmit,
  isPending,
}: {
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string; email: string; business: string }) => void;
  isPending: boolean;
}) {
  const [popupForm, setPopupForm] = useState({ name: "", phone: "", email: "", business: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!popupForm.name.trim() || !popupForm.phone.trim() || !popupForm.email.trim()) {
      toast.error("Please fill in your name, phone, and email.");
      return;
    }
    onSubmit(popupForm);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5 pr-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
            Wait — Don't Leave Yet
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight">
            Your Competitors Are Already{" "}
            <span className="text-primary">Using This Lead Source</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Grab the free breakdown before you go — it takes 10 seconds and could change how you get jobs this week.
          </p>
        </div>

        {/* Bullet points */}
        <ul className="space-y-2 mb-5">
          {[
            "Find homeowners actively asking for junk removal help",
            "Respond faster than every competitor in your area",
            "Turn simple posts into booked jobs — starting today",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your name *"
              value={popupForm.name}
              onChange={(e) => setPopupForm({ ...popupForm, name: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition"
              required
            />
            <input
              type="tel"
              placeholder="Phone number *"
              value={popupForm.phone}
              onChange={(e) => setPopupForm({ ...popupForm, phone: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email address *"
            value={popupForm.email}
            onChange={(e) => setPopupForm({ ...popupForm, email: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-3.5 rounded-xl text-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
          >
            {isPending ? "Sending…" : (
              <>
                Send Me the Free Breakdown
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-center text-muted-foreground text-xs">
            No spam. We may follow up by text or phone.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function FreeGuide() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", business: "" });
  const [, navigate] = useLocation();
  const countdown = useCountdown();

  // Exit-intent state
  const [showExitPopup, setShowExitPopup] = useState(false);
  const exitFired = useRef(false);
  const lastScrollY = useRef(0);
  const maxScrollY = useRef(0);

  // Desktop: mouseleave at top of viewport
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !exitFired.current) {
        exitFired.current = true;
        setShowExitPopup(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Mobile: fire popup when user scrolls back up after reaching 30% depth
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? currentY / docHeight : 0;

      if (scrollPct > maxScrollY.current) maxScrollY.current = scrollPct;

      const scrolledBack = lastScrollY.current - currentY > 80; // scrolled up 80px
      const reachedDepth = maxScrollY.current >= 0.30; // had reached 30% depth
      const isMobile = window.innerWidth < 768;

      if (isMobile && scrolledBack && reachedDepth && !exitFired.current) {
        exitFired.current = true;
        setShowExitPopup(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fireConversionEvents = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", { content_name: "Free Guide Download" });
    }
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        event_category: "Landing Page",
        event_label: "Free Guide Download",
      });
    }
  };

  const submit = trpc.contact.submitGuide.useMutation({
    onSuccess: () => {
      fireConversionEvents();
      navigate("/thank-you");
    },
    onError: (err: { message?: string }) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.business.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submit.mutate(form);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* EXIT INTENT POPUP */}
      {showExitPopup && (
        <ExitIntentPopup
          onClose={() => setShowExitPopup(false)}
          onSubmit={(data) => submit.mutate(data)}
          isPending={submit.isPending}
        />
      )}

      {/* URGENCY BANNER */}
      {!countdown.expired && (
        <div className="bg-primary text-primary-foreground text-center py-2.5 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            Limited offer — this free breakdown expires in{" "}
            <span className="font-extrabold tabular-nums">
              {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
            </span>
          </span>
        </div>
      )}

      {/* NAV */}
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

      {/* MAIN */}
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

          {/* Hero image */}
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

          {/* Form */}
          <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8">
            {/* Limited-time offer badge */}
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-5">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  Limited-Time Offer
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Download free today.
                </p>
              </div>
            </div>

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
                  Business Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Acme Junk Removal"
                  value={form.business}
                  onChange={(e) => setForm({ ...form, business: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition"
                  required
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
                    {[
                      "https://randomuser.me/api/portraits/men/32.jpg",
                      "https://randomuser.me/api/portraits/men/45.jpg",
                      "https://randomuser.me/api/portraits/men/67.jpg",
                      "https://randomuser.me/api/portraits/men/12.jpg",
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="LeadHauler customer"
                        className="w-8 h-8 rounded-full border-2 border-background object-cover"
                      />
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

        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-5 px-6 text-center text-muted-foreground text-xs border-t border-border">
        © {new Date().getFullYear()} LeadHauler. All rights reserved.
      </footer>
    </div>
  );
}
