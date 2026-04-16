import { useState, useMemo } from "react";
import { Calculator, TrendingUp, DollarSign, Target, Zap, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoiLanding() {
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

  const roiColor =
    calc.roi >= 200 ? "text-green-600" :
    calc.roi >= 50 ? "text-amber-500" :
    "text-red-500";

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${Math.round(n)}`;

  return (
    <div className="min-h-screen bg-[#f5f3ee] font-sans">
      {/* ── NAV ── */}
      <header className="bg-[#f5f3ee] border-b border-border/40 py-4">
        <div className="container max-w-5xl flex items-center justify-between">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/leadhauler_top-removebg-preview_eb70e94b.png"
            alt="LeadHauler"
            className="h-9 w-auto object-contain"
          />
          <a href="tel:+15087156385" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" /> (508) 715-6385
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="pt-14 pb-6 text-center">
        <div className="container max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" /> Free ROI Calculator
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-tight mb-4">
            See Exactly What Your<br className="hidden sm:block" /> Marketing Budget Should Be
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-3">
            Stop guessing. Enter your numbers below and the calculator shows you how many leads you need, what to spend on ads, and what your return looks like — before you spend a dollar.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Used by junk removal operators across the country to plan their growth.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="pb-8">
        <div className="container max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <Target className="w-5 h-5 text-amber-500" />, title: "Set Your Goal", desc: "Tell the calculator how many jobs you want per month." },
              { icon: <TrendingUp className="w-5 h-5 text-amber-500" />, title: "Enter Your Numbers", desc: "Add your average job value, booking rate, and cost per lead." },
              { icon: <DollarSign className="w-5 h-5 text-amber-500" />, title: "See Your ROI", desc: "Instantly see your required ad spend, revenue, and profit margin." },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-5 border border-border/50 shadow-sm flex gap-3">
                <div className="mt-0.5 flex-shrink-0">{s.icon}</div>
                <div>
                  <p className="font-bold text-sm text-foreground mb-1">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="pb-12">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl border border-border/60 shadow-lg overflow-hidden">
            <div className="bg-primary px-6 py-4 flex items-center gap-3">
              <Calculator className="w-5 h-5 text-primary-foreground/70" />
              <h2 className="text-base font-bold text-primary-foreground">LeadHauler ROI Calculator</h2>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Sliders */}
              {[
                { label: "Jobs Wanted Per Month", value: jobsWanted, min: 5, max: 150, step: 5, set: setJobsWanted, display: `${jobsWanted} jobs` },
                { label: "Average Job Value", value: jobValue, min: 100, max: 1500, step: 25, set: setJobValue, display: `$${jobValue}` },
                { label: "Booking Rate", value: bookingRate, min: 10, max: 80, step: 5, set: setBookingRate, display: `${bookingRate}%` },
                { label: "Cost Per Lead (CPL)", value: cpl, min: 20, max: 200, step: 5, set: setCpl, display: `$${cpl}` },
                { label: "Gross Margin", value: margin, min: 20, max: 80, step: 5, set: setMargin, display: `${margin}%` },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-foreground">{s.label}</label>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{s.display}</span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    onChange={(e) => s.set(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary bg-muted"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{s.min}{s.label.includes("Value") || s.label.includes("CPL") ? "" : s.label.includes("Rate") || s.label.includes("Margin") ? "%" : ""}</span>
                    <span>{s.max}{s.label.includes("Rate") || s.label.includes("Margin") ? "%" : ""}</span>
                  </div>
                </div>
              ))}

              {/* Results */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { label: "Leads Needed", value: `${calc.leadsNeeded}`, sub: "per month", icon: <Target className="w-4 h-4" /> },
                  { label: "Est. Ad Spend", value: fmt(calc.adSpend), sub: "per month", icon: <DollarSign className="w-4 h-4" /> },
                  { label: "Est. Revenue", value: fmt(calc.revenue), sub: "per month", icon: <TrendingUp className="w-4 h-4" /> },
                  { label: "Gross Profit", value: fmt(calc.grossProfit), sub: "per month", icon: <Zap className="w-4 h-4" /> },
                ].map((r) => (
                  <div key={r.label} className="bg-muted/50 rounded-xl p-4 text-center border border-border/40">
                    <div className="flex justify-center mb-1 text-muted-foreground">{r.icon}</div>
                    <p className="text-xl font-black text-foreground">{r.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.label}</p>
                    <p className="text-xs text-muted-foreground/60">{r.sub}</p>
                  </div>
                ))}
              </div>

              {/* ROI Badge */}
              <div className="bg-muted/30 rounded-xl p-4 border border-border/40 text-center">
                <p className="text-sm text-muted-foreground mb-1">Estimated Return on Ad Spend</p>
                <p className={`text-4xl font-black ${roiColor}`}>
                  {calc.roi >= 0 ? "+" : ""}{Math.round(calc.roi)}% ROI
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {calc.roi >= 200 ? "Strong — your market is ready to scale." : calc.roi >= 50 ? "Solid — worth testing and optimizing." : "Tight — focus on improving booking rate first."}
                </p>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Estimates are illustrative. Actual results vary by market, competition, and conversion performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-16">
        <div className="container max-w-3xl">
          <div className="bg-primary rounded-2xl p-8 sm:p-10 text-center text-primary-foreground shadow-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-primary-foreground/80 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Ready to make these numbers real?
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
              Let LeadHauler Build<br className="hidden sm:block" /> Your Growth Plan
            </h2>
            <p className="text-primary-foreground/75 text-base leading-relaxed max-w-xl mx-auto mb-8">
              Book a free 30-minute strategy call. We'll plug in your actual numbers, show you what your competitors are spending, and map out exactly what a LeadHauler campaign looks like for your market.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
              {[
                "No contracts, cancel anytime",
                "First leads in 14 days — guaranteed",
                "Free competitor analysis included",
              ].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-sm text-primary-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" /> {b}
                </span>
              ))}
            </div>
            <a href="/#contact">
              <Button className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-base px-8 py-4 h-auto rounded-xl shadow-lg">
                Book My Free Strategy Call <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="text-xs text-primary-foreground/40 mt-4">No spam. No obligation. Takes 60 seconds.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground bg-[#f5f3ee]">
        © {new Date().getFullYear()} LeadHauler System. All rights reserved. · <a href="/#contact" className="hover:text-foreground transition-colors">Book a Call</a>
      </footer>
    </div>
  );
}
