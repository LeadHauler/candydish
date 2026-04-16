import { useState } from "react";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="py-16 bg-foreground text-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
            {/* Left */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-3">Get Started Today</p>
              <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
                Ready to stop guessing and<br className="hidden sm:block" /> start growing?
              </h2>
              <p className="text-background/70 mb-8 text-base leading-relaxed">
                Book a free strategy call. We'll review your market, your current setup, and show you exactly what a LeadHauler campaign would look like for your business — no obligation.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "30-minute call, no sales pressure",
                  "Free competitive analysis included",
                  "No long-term contracts",
                  "First leads in 14 days or we work free",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-background/80">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 text-sm text-background/60">
                <span>📞 (608) 719 - 4381</span>
                <span>✉ hello@leadhauler.com</span>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-background text-foreground rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold mb-1">Book Your Free Strategy Call</h3>
              <p className="text-sm text-muted-foreground mb-5">Takes less than 2 minutes to get started.</p>

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
      <footer className="bg-foreground border-t border-background/10 py-6 text-center text-background/40 text-xs">
        © {new Date().getFullYear()} LeadHauler. All rights reserved.
      </footer>
    </div>
  );
}
