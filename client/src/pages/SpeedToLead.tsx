import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Zap,
  CheckCircle2,
  ArrowRight,
  Clock,
  X,
  PhoneCall,
  TrendingUp,
  Timer,
  Star,
} from "lucide-react";

// Countdown: 24-hour timer from first visit, persisted in sessionStorage
function useCountdown() {
  const getExpiry = () => {
    if (typeof window === "undefined") return Date.now() + 86400000;
    const stored = sessionStorage.getItem("stl_expiry");
    if (stored) return parseInt(stored, 10);
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    sessionStorage.setItem("stl_expiry", String(expiry));
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
      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
            <Zap className="w-3 h-3" /> Don't Leave Without This
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight">
            Your Next Lead Is Being Answered{" "}
            <span className="text-primary">By a Competitor Right Now</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Speed-to-Lead is included in every plan. Let us show you how it works for your market — free strategy call, no commitment.
          </p>
        </div>

        <ul className="space-y-2 mb-5">
          {[
            "Respond to every lead in under 5 minutes — automatically",
            "Stop losing jobs to operators who simply answer faster",
            "Set it up once during onboarding — we handle the rest",
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
                Claim My Free Strategy Call
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

const stats = [
  { icon: Timer, value: "< 5 min", label: "Average response time" },
  { icon: TrendingUp, value: "78%", label: "Of jobs go to the first responder" },
  { icon: PhoneCall, value: "24/7", label: "Automated lead coverage" },
  { icon: Star, value: "3×", label: "Higher close rate vs. slow responders" },
];

const plans = [
  {
    name: "Starter",
    price: "$1,800",
    highlight: false,
    features: [
      "Speed-to-Lead tool included",
      "Google Ads management (up to $1,500 ad spend)",
      "Local SEO optimization",
      "Google Business Profile audit & management",
      "Monthly performance report",
    ],
    cta: "Start with Starter",
  },
  {
    name: "Growth",
    price: "$2,500",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Speed-to-Lead tool included",
      "Everything in Starter",
      "Google Ads (up to $4,000 ad spend)",
      "Google Local Service Ads management",
      "Website design or optimization",
      "Social media management (3×/week)",
      "Review & reputation management",
    ],
    cta: "Get Started — Most Popular",
  },
  {
    name: "Dominator",
    price: "$5,500",
    highlight: false,
    features: [
      "Speed-to-Lead tool included",
      "Everything in Growth",
      "Unlimited ad spend management",
      "Multi-location SEO",
      "Daily social media content",
      "Email & SMS follow-up sequences",
      "Bi-weekly strategy calls",
    ],
    cta: "Scale Up — Get Started",
  },
];

export default function SpeedToLead() {
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
      (window as any).fbq("track", "Lead", { content_name: "Speed-to-Lead Signup" });
    }
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        event_category: "Landing Page",
        event_label: "Speed-to-Lead Signup",
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
            Limited-time offer — waived setup fee expires in{" "}
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

      <main className="flex-1 py-12 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
            <Zap className="w-3.5 h-3.5" />
            Included in Every LeadHauler Plan
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-foreground">
            The First Company to Respond{" "}
            <span className="text-primary">Wins the Job.</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
            78% of junk removal jobs go to the operator who responds first. Our{" "}
            <span className="text-foreground font-semibold">Speed-to-Lead tool</span> fires an
            automatic, personalized response to every inbound lead within minutes — even when
            you're on a job, driving, or off the clock.
          </p>

          {/* Video embed */}
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg" style={{ position: "relative", width: "100%", height: 0, paddingBottom: "100%" }}>
            <iframe
              allow="fullscreen"
              allowFullScreen
              src="https://streamable.com/e/crcfcf?loop=0"
              style={{ border: "none", width: "100%", height: "100%", position: "absolute", left: 0, top: 0, overflow: "hidden" }}
              title="Speed-to-Lead Demo"
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-xl bg-card border border-border p-4 text-center shadow-sm"
              >
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-extrabold text-foreground">{value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">How It Works</p>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "A lead comes in",
                  desc: "From Google Ads, your website form, Facebook, or a text — the moment a prospect reaches out, Speed-to-Lead detects it instantly.",
                },
                {
                  step: "02",
                  title: "An automatic response fires",
                  desc: "A personalized message goes back to the prospect within minutes — with your name, your pricing range, and a link to book a time. You set it up once during onboarding.",
                },
                {
                  step: "03",
                  title: "You get notified",
                  desc: "You receive an alert so you can follow up personally when you're free. By then, you've already made the first impression — and your competitor hasn't responded yet.",
                },
                {
                  step: "04",
                  title: "You close the job",
                  desc: "Prospects who hear back fast are warmer, more trusting, and far more likely to book. Speed-to-Lead turns your response time into your biggest competitive advantage.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-extrabold text-xs">
                    {step}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{title}</p>
                    <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="rounded-2xl bg-card border border-border p-6 mb-12 shadow-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#f5a623] text-[#f5a623]" />
              ))}
            </div>
            <blockquote className="text-foreground text-sm sm:text-base leading-relaxed italic mb-3">
              "I used to miss leads constantly because I was on jobs all day. Speed-to-Lead changed everything. Now every inquiry gets a response in minutes and my close rate is up significantly. It's the one tool I tell every junk hauler they need."
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/52.jpg"
                alt="LeadHauler customer"
                className="w-9 h-9 rounded-full border-2 border-border object-cover"
              />
              <div>
                <p className="text-sm font-bold text-foreground">Derek M.</p>
                <p className="text-xs text-muted-foreground">Owner, Phoenix AZ — Growth Plan</p>
              </div>
            </div>
          </div>

          {/* Pricing plans */}
          <div className="mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Choose Your Plan</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">
              Speed-to-Lead is included in all plans.
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              No long-term contracts. Cancel anytime. All packages require a $997 one-time setup fee.
            </p>

            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-6 shadow-sm transition-all ${
                    plan.highlight
                      ? "bg-foreground text-background border-foreground shadow-lg"
                      : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {plan.badge && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#f5a623] text-background mb-2">
                          {plan.badge}
                        </span>
                      )}
                      <p className={`text-lg font-extrabold ${plan.highlight ? "text-background" : "text-foreground"}`}>
                        {plan.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-3xl font-extrabold ${plan.highlight ? "text-background" : "text-foreground"}`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm ${plan.highlight ? "text-background/70" : "text-muted-foreground"}`}>/mo</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            plan.highlight ? "text-[#f5a623]" : "text-primary"
                          }`}
                        />
                        <span className={plan.highlight ? "text-background/90" : "text-foreground"}>
                          {f === "Speed-to-Lead tool included" ? (
                            <span className="font-bold">{f}</span>
                          ) : f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#signup"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-extrabold text-sm transition-all duration-150 shadow-sm ${
                      plan.highlight
                        ? "bg-[#f5a623] hover:bg-[#e09610] text-background"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Signup form */}
          <div id="signup" className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-5">
              <Zap className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  Get Started Today
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  We'll match you to the right plan on your strategy call.
                </p>
              </div>
            </div>

            <p className="text-foreground font-bold text-lg mb-1">Book your free strategy call</p>
            <p className="text-muted-foreground text-sm mb-6">
              Tell us about your business and we'll show you exactly how Speed-to-Lead works in your market.
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
                    Book My Free Strategy Call
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
                    Join <span className="text-foreground font-bold">200+ junk haulers</span> already on LeadHauler
                  </p>
                </div>
                <blockquote className="w-full text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                  "Speed-to-Lead alone paid for the entire plan in the first month."
                  <span className="not-italic font-semibold text-foreground block mt-0.5">— Travis K., Houston TX</span>
                </blockquote>
                <p className="text-center text-muted-foreground text-xs">
                  No spam. We may follow up by text or phone. No long-term contracts.
                </p>
              </div>
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
