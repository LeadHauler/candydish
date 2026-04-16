import { useState, useMemo } from "react";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, Star, Calculator, Phone, Mail, Facebook, Youtube, Clock, BarChart2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function RoiCalculator() {
  const [jobValue, setJobValue] = useState(350);
  const [bookingRate, setBookingRate] = useState(35);
  const [jobsWanted, setJobsWanted] = useState(30);
  const [cpl, setCpl] = useState(60);
  const [margin, setMargin] = useState(55);

  const calc = useMemo(() => {
    const leadsNeeded = Math.ceil(jobsWanted / (bookingRate / 100));
    const adSpend = leadsNeeded * cpl;
    const revenue = jobsWanted * jobValue;
    const grossProfit = revenue * (margin / 100);
    const roi = adSpend > 0 ? ((grossProfit - adSpend) / adSpend) * 100 : 0;
    return { leadsNeeded, adSpend, revenue, grossProfit, roi };
  }, [jobValue, bookingRate, jobsWanted, cpl, margin]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card shadow-md overflow-hidden">
      <div className="bg-primary/10 border-b border-border px-6 py-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground text-lg">ROI Calculator</h3>
        <span className="ml-auto text-xs text-muted-foreground">Adjust the sliders to estimate your results</span>
      </div>
      <div className="p-6 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          {[
            { label: "Jobs wanted per month", value: jobsWanted, set: setJobsWanted, min: 5, max: 200, step: 5, fmt: (v: number) => `${v} jobs` },
            { label: "Average job value", value: jobValue, set: setJobValue, min: 100, max: 2000, step: 50, fmt: (v: number) => `$${v}` },
            { label: "Booking rate", value: bookingRate, set: setBookingRate, min: 10, max: 80, step: 5, fmt: (v: number) => `${v}%` },
            { label: "Cost per lead (CPL)", value: cpl, set: setCpl, min: 20, max: 200, step: 5, fmt: (v: number) => `$${v}` },
            { label: "Gross margin", value: margin, set: setMargin, min: 20, max: 80, step: 5, fmt: (v: number) => `${v}%` },
          ].map(({ label, value, set, min, max, step, fmt: fmtVal }) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <span className="text-sm font-bold text-primary">{fmtVal(value)}</span>
              </div>
              <input
                type="range"
                min={min} max={max} step={step}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full accent-primary h-2 rounded-full cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>{fmtVal(min)}</span><span>{fmtVal(max)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Leads needed", value: `${calc.leadsNeeded}`, sub: "per month" },
              { label: "Est. ad spend", value: fmt(calc.adSpend), sub: "per month" },
              { label: "Est. revenue", value: fmt(calc.revenue), sub: "per month" },
              { label: "Est. gross profit", value: fmt(calc.grossProfit), sub: "after margin" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="rounded-xl bg-muted/50 border border-border p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <p className="text-xl font-black text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
          <div className={`rounded-xl p-4 text-center border ${
            calc.roi >= 100 ? "bg-green-50 border-green-200" :
            calc.roi >= 0 ? "bg-amber-50 border-amber-200" :
            "bg-red-50 border-red-200"
          }`}>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Estimated ROI on Ad Spend</p>
            <p className={`text-3xl font-black ${
              calc.roi >= 100 ? "text-green-600" :
              calc.roi >= 0 ? "text-amber-600" :
              "text-red-600"
            }`}>{calc.roi.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground mt-1">
              {calc.roi >= 200 ? "Strong returns — ready to scale" :
               calc.roi >= 100 ? "Solid — room to grow" :
               calc.roi >= 0 ? "Marginal — improve booking rate first" :
               "Negative — review capacity before spending more"}
            </p>
          </div>
          <a href="#contact">
            <Button className="w-full bg-primary text-primary-foreground font-bold">
              Get My Free Strategy Call →
            </Button>
          </a>
        </div>
      </div>
      <p className="text-xs text-center text-muted-foreground px-6 pb-4">Estimates are illustrative. Actual results vary by market, competition, and conversion performance.</p>
    </div>
  );
}

const plans = [
  {
    name: "Starter",
    price: "$1800",
    period: "/mo",
    desc: "Perfect for new or small junk removal operations ready to grow.",
    features: [
      "Google Ads management (up to $1,500 ad spend)",
      "Local SEO optimization",
      "Google Business Profile audit & management",
      "Full access to our local partnership outreach tool",
      "Full access to our Speed-to-lead quick quote tool",
      "Remarketing & re-engagement campaigns",
      "Monthly performance report",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$2500",
    period: "/mo",
    badge: "Most Popular",
    desc: "For established operators ready to dominate their local market.",
    features: [
      "Everything in Starter",
      "Google Ads (up to $4,000 ad spend)",
      "Google Local Service Ads management",
      "Website design or optimization",
      "Social media management (3×/week)",
      "Review & reputation management",
    ],
    cta: "Most Popular — Get Started",
    highlight: true,
  },
  {
    name: "Dominator",
    price: "$5500",
    period: "/mo",
    desc: "For multi-truck operations or owners expanding to new markets.",
    features: [
      "Everything in Growth",
      "Unlimited ad spend management",
      "Multi-location SEO",
      "Daily social media content",
      "Email & SMS follow-up sequences",
      "Bi-weekly strategy calls",
    ],
    cta: "Scale Up — Get Started",
    highlight: false,
  },
];

export default function Pricing() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", city: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast.success("We'll be in touch within one business day.");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAV ── */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight">
              <span className="text-foreground">Lead</span>
              <span className="text-amber-500">Hauler</span>
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground font-medium tracking-widest uppercase ml-1">Marketing for Junk Removal</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="/#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="/#results" className="hover:text-foreground transition-colors">Results</a>
            <a href="/tactics" className="hover:text-foreground transition-colors">Tactics</a>
            <a href="/pricing" className="text-foreground font-semibold">Pricing</a>
            <a href="/#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <a href="#contact">
            <Button size="sm" className="bg-primary text-primary-foreground font-bold px-5">
              Get Free Strategy Call <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="pt-16 pb-10 text-center">
        <div className="container max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold mb-5 border border-accent/30">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Transparent Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
            Simple plans. No surprises.
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            All plans include full-service management, monthly reporting, and no long-term contracts.
          </p>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="pb-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.highlight
                    ? "bg-foreground text-background shadow-2xl scale-[1.03] z-10"
                    : "bg-card border border-border shadow-sm"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      <Star className="w-3 h-3 fill-white" /> {plan.badge}
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <p className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-background/70" : "text-muted-foreground"}`}>{plan.name}</p>
                  <div className="flex items-end gap-1">
                    <span className={`text-3xl sm:text-4xl font-black ${plan.highlight ? "text-amber-400" : "text-primary"}`}>{plan.price}</span>
                    <span className={`text-sm mb-1 ${plan.highlight ? "text-background/60" : "text-muted-foreground"}`}>{plan.period}</span>
                  </div>
                  <p className={`text-sm mt-2 leading-snug ${plan.highlight ? "text-background/70" : "text-muted-foreground"}`}>{plan.desc}</p>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-amber-400" : "text-green-500"}`} />
                      <span className={plan.highlight ? "text-background/90" : "text-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact">
                  <Button
                    className={`w-full font-bold ${
                      plan.highlight
                        ? "bg-amber-500 hover:bg-amber-400 text-white"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </a>
                <p className={`text-xs text-center mt-3 ${plan.highlight ? "text-background/50" : "text-muted-foreground"}`}>
                  First leads in 14 days — or we work free
                </p>
                <p className={`text-xs text-center mt-1 ${plan.highlight ? "text-background/50" : "text-muted-foreground"}`}>
                  No contract. Cancel anytime.
                </p>
              </div>
            ))}
          </div>

          {/* Footnotes */}
          <div className="text-center mt-8 space-y-1">
            <p className="text-sm text-muted-foreground">Ad spend is billed separately and goes directly to Google/Meta — we never mark it up.</p>
            <p className="text-sm text-muted-foreground">All packages require a $997 one-time setup fee.</p>
          </div>
        </div>
      </section>

      {/* ── CAPACITY SECTION (replaces FAQ) ── */}
      <section className="py-16 bg-muted/30 border-t border-border/50">
        <div className="container max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-6 leading-tight">
            Can you handle all of the leads we're going to send you?
          </h2>

          <div className="prose prose-neutral max-w-none text-muted-foreground space-y-6 text-base leading-relaxed">
            <p>
              LeadHauler will bring you leads, that's a guarantee, but your results depend on how well you convert those leads into booked jobs. The goal is to link what you spend on ads to the number of jobs you book and the profit margin you need. You don't need perfect data — just a clear way to estimate leads, jobs and profit so you can adjust as you go.
            </p>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">1. Start With Your Cost Per Lead and Booking Rate</h3>
              <p>
                Decide how many jobs you want each month. Divide that by your booking rate to see how many leads you need. Multiply leads needed by your cost per lead to find your monthly ad spend.
              </p>
              <p className="mt-3">
                For example, if you need 30 jobs, have a 35% booking rate and your CPL is $60, you'll want around 86 leads, which costs about $5,160. As your booking rate improves, your required ad spend usually drops faster than chasing cheaper leads.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">2. Check Revenue and Margin</h3>
              <p>
                Make sure the numbers work for your business. Multiply booked jobs by your average job value to get revenue. Multiply revenue by your gross margin to estimate gross profit. Compare profit to your ad spend to see whether there's enough left over for overhead and growth.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">3. Make Sure You Have Capacity to Handle Leads</h3>
              <p>
                Ads only help when calls are answered, quotes are fast and scheduling is smooth. Phone coverage, follow-up speed, crew availability, and your ability to handle estimates and disposal logistics all affect whether leads become jobs. Solid capacity makes scaling safer; weak capacity makes even a good campaign feel expensive.
              </p>
              <p className="mt-3">
                Before you pick a budget, clarify your market, competition, goals and capacity. When capacity is tight, increasing ad spend often adds stress without increasing profit.
              </p>
            </div>

            <p className="font-semibold text-foreground">
              LeadHauler can deliver the leads — but your systems and crew need to be ready to turn those leads into revenue.
            </p>

            {/* ── ROI CALCULATOR ── */}
            <RoiCalculator />
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
            {/* Left */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-amber-500 mb-3">Get Started Today</p>
              <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight text-foreground">
                Ready to stop guessing and<br className="hidden sm:block" /> start growing?
              </h2>
              <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                Book a free 30-minute strategy call. We'll review your current marketing, show you what your competitors are doing, and give you a custom growth plan — no obligation.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: <Clock className="w-4 h-4" />, text: "30-minute call, no sales pressure" },
                  { icon: <BarChart2 className="w-4 h-4" />, text: "Free competitor analysis included" },
                  { icon: <Shield className="w-4 h-4" />, text: "No contracts, cancel anytime" },
                  { icon: <Zap className="w-4 h-4" />, text: "First leads within 14 days of launch" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-border flex flex-wrap gap-6 text-sm text-muted-foreground">
                <a href="tel:+15087156385" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4" /> (508) 715-6385
                </a>
                <a href="mailto:hello@leadhauler.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4" /> hello@leadhauler.com
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-card text-foreground rounded-2xl p-6 shadow-xl border border-border">
              <h3 className="text-lg font-bold mb-1">Book Your Free Strategy Call</h3>
              <p className="text-sm text-muted-foreground mb-5">Takes 60 seconds. We'll call you.</p>

              {submitted ? (
                <div className="text-center py-8">
                  <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-bold text-lg mb-1">You're on the list!</p>
                  <p className="text-muted-foreground text-sm">We'll reach out within one business day to schedule your call.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="First and last name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Your company name"
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City / Service Area *</label>
                    <input
                      required
                      type="text"
                      placeholder="Dallas TX"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3">
                    Book My Free Call →
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">No spam. No obligation. Unsubscribe anytime.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-primary text-primary-foreground pt-14 pb-8 border-t border-primary/20">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-1">
              <div className="mb-4">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/leadhauler_top-removebg-preview_eb70e94b.png"
                  alt="LeadHauler"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-primary-foreground/55 text-sm leading-relaxed">
                The complete, done-for-you marketing system built exclusively for junk removal businesses.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/40 mb-4">Navigation</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Services", href: "/#services" },
                  { label: "Results", href: "/#results" },
                  { label: "How It Works", href: "/#process" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "FAQ", href: "/#faq" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/40 mb-4">Resources</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Tactics & Tips", href: "/tactics" },
                  { label: "Get a Free Strategy Call", href: "#contact" },
                  { label: "Client Results", href: "/#results" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/40 mb-4">Contact</p>
              <ul className="space-y-2.5 text-sm text-primary-foreground/65">
                <li>
                  <a href="tel:+15087156385" className="hover:text-primary-foreground transition-colors flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                    (508) 715-6385
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@leadhauler.com" className="hover:text-primary-foreground transition-colors flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    hello@leadhauler.com
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/leadhauler" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors flex items-center gap-2">
                    <Facebook className="w-3.5 h-3.5 flex-shrink-0" />
                    facebook.com/leadhauler
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@LeadHauler" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors flex items-center gap-2">
                    <Youtube className="w-3.5 h-3.5 flex-shrink-0" />
                    youtube.com/@LeadHauler
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/40">
            <span>© {new Date().getFullYear()} LeadHauler System. All rights reserved.</span>
            <span>Done-for-you marketing exclusively for junk haulers.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
