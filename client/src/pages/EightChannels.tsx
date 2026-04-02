import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  ArrowRight,
  Clock,
  X,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

// Countdown: 24-hour timer from first visit, persisted in sessionStorage
function useCountdown() {
  const getExpiry = () => {
    if (typeof window === "undefined") return Date.now() + 86400000;
    const stored = sessionStorage.getItem("ec_expiry");
    if (stored) return parseInt(stored, 10);
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    sessionStorage.setItem("ec_expiry", String(expiry));
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

// Exit-intent popup
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
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5 pr-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-[10px] font-bold uppercase tracking-widest mb-3">
            <AlertTriangle className="w-3 h-3" /> Wait — You're About to Leave
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight">
            Channel #4 Is the One{" "}
            <span className="text-primary">Your Competitors Hope You Never Find</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Most junk haulers have never heard of it. The ones who use it quietly dominate their local market. Don't leave without knowing what it is.
          </p>
        </div>

        <ul className="space-y-2 mb-5">
          {[
            "Takes less than 20 minutes to set up",
            "Zero ad spend required",
            "Works while you're on a job",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>

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
                Show Me All 8 Channels
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

// Blurred/locked channel preview items
const channels = [
  { num: "01", label: "Google Business Profile", visible: true },
  { num: "02", label: "Google Search Ads (PPC)", visible: true },
  { num: "03", label: "Google Local Service Ads", visible: true },
  { num: "04", label: "████████ ████ ████████", visible: false },
  { num: "05", label: "████████████", visible: false },
  { num: "06", label: "███████ ████████████", visible: false },
  { num: "07", label: "█████ & ███ ███████-██", visible: false },
  { num: "08", label: "████ █████ & ███████ ██████", visible: false },
];

export default function EightChannels() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", business: "" });
  const [, navigate] = useLocation();
  const countdown = useCountdown();

  const [showExitPopup, setShowExitPopup] = useState(false);
  const exitFired = useRef(false);
  const lastScrollY = useRef(0);
  const maxScrollY = useRef(0);

  // Desktop exit intent
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

  // Mobile scroll-back exit intent
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? currentY / docHeight : 0;
      if (scrollPct > maxScrollY.current) maxScrollY.current = scrollPct;
      const scrolledBack = lastScrollY.current - currentY > 80;
      const reachedDepth = maxScrollY.current >= 0.3;
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
      (window as any).fbq("track", "Lead", { content_name: "8 Channels Download" });
    }
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        event_category: "Landing Page",
        event_label: "8 Channels Download",
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
            Free access closes in{" "}
            <span className="font-extrabold tabular-nums">
              {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
            </span>
            {" "}— grab it before it's gone
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

      <main className="flex-1 py-12 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
            <Lock className="w-3.5 h-3.5" />
            Restricted — Junk Removal Operators Only
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-foreground">
            Most Junk Haulers Are Only Using{" "}
            <span className="text-primary">2 of These 8 Channels.</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-3">
            The operators quietly dominating their local markets aren't running better ads. They're running{" "}
            <span className="text-foreground font-semibold">more channels</span> — and most of their competitors have no idea these channels even exist.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
            We've put together the complete breakdown — all 8 channels, exactly how to activate each one, and which ones your market is almost certainly leaving wide open right now. It's free. But we're only sharing it with operators who are serious about growth.
          </p>

          {/* Channel preview with locked items */}
          <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden mb-10">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <p className="text-xs font-bold text-foreground uppercase tracking-widest">
                What's Inside
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="w-3.5 h-3.5" />
                5 channels locked
              </div>
            </div>
            <div className="divide-y divide-border">
              {channels.map(({ num, label, visible }) => (
                <div
                  key={num}
                  className={`flex items-center gap-4 px-5 py-3.5 ${
                    visible ? "" : "opacity-60"
                  }`}
                >
                  <span className="text-xs font-extrabold text-primary w-6 flex-shrink-0">{num}</span>
                  <span className={`text-sm font-semibold flex-1 ${visible ? "text-foreground" : "text-muted-foreground tracking-widest select-none"}`}>
                    {label}
                  </span>
                  {visible ? (
                    <Eye className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-muted/30 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Enter your info below to unlock all 8 channels instantly.
              </p>
            </div>
          </div>

          {/* Curiosity bullets */}
          <div className="mb-10 space-y-3">
            {[
              { icon: TrendingUp, text: "Channel #5 is the one most operators have never heard of — and it generates leads with zero ad spend." },
              { icon: AlertTriangle, text: "Channel #4 is being used by your competitors right now. If you're not on it, you're invisible to a segment of buyers actively looking for you." },
              { icon: Lock, text: "Channel #7 alone is responsible for more repeat business than any paid ad channel. Most haulers skip it entirely." },
              { icon: Eye, text: "Channel #8 costs less than a tank of gas and works 24 hours a day in the neighborhoods where you already work." },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-sm">
                <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Social proof bar */}
          <div className="flex items-center gap-3 mb-10 p-4 rounded-xl bg-muted/40 border border-border">
            <div className="flex -space-x-2 flex-shrink-0">
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
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-bold">200+ junk haulers</span> have already downloaded this breakdown. Most said Channel #5 was the one they wish they'd known about sooner.
            </p>
          </div>

          {/* Testimonial */}
          <blockquote className="rounded-2xl bg-card border border-border p-5 mb-10 shadow-sm">
            <p className="text-sm text-foreground italic leading-relaxed mb-3">
              "I thought I knew every lead source in this industry. Channel #4 and Channel #6 were completely off my radar. We activated both in the same week and had 11 new leads within 30 days — without touching our ad budget."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/78.jpg"
                alt="LeadHauler customer"
                className="w-9 h-9 rounded-full border-2 border-border object-cover"
              />
              <div>
                <p className="text-sm font-bold text-foreground">Ryan C.</p>
                <p className="text-xs text-muted-foreground">Owner, Atlanta GA — Growth Plan</p>
              </div>
            </div>
          </blockquote>

          {/* Form */}
          <div id="download" className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-5">
              <Lock className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  Unlock All 8 Channels — Free
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  We'll send the full breakdown straight to you.
                </p>
              </div>
            </div>

            <p className="text-foreground font-bold text-lg mb-1">Get the free breakdown</p>
            <p className="text-muted-foreground text-sm mb-6">
              Tell us where to send it. Takes 10 seconds.
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
                    Unlock All 8 Channels Now
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-muted-foreground text-xs">
                No spam. We may follow up by text or phone. Free, no commitment.
              </p>
            </form>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} LeadHauler. All rights reserved.{" "}
          <a href="/" className="text-primary hover:underline">Back to main site</a>
        </p>
      </footer>

    </div>
  );
}
