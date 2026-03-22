import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Campaign Idea Library",
    description:
      "10+ pre-built junk removal lead tactics — real estate drop-offs, contractor partnerships, door hangers, and more. Each with step-by-step guides.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Target,
    title: "Offline Tactic Tracker",
    description:
      "Log every activity with date, location, materials used, and contacts made. Track status from planned to completed.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "ROI Dashboard",
    description:
      "See your cost per lead, conversion rates, and revenue attribution by tactic. Know exactly what's working.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Users,
    title: "Partner Management",
    description:
      "Track real estate agents, contractors, and property managers. Log referrals and measure partner performance.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: FileText,
    title: "Marketing Templates",
    description:
      "Customizable flyers, business cards, door hangers, and postcards. Fill in your details and download instantly.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: MessageSquare,
    title: "Community Tips",
    description:
      "Share and discover what's working. Vote on tactics, read success stories, and learn from other junk removal owners.",
    color: "bg-teal-50 text-teal-600",
  },
];

const tactics = [
  "Real estate office drop-offs",
  "Contractor partnership programs",
  "Door hanger campaigns",
  "Vehicle wrap strategies",
  "Property manager outreach",
  "Estate sale partnerships",
  "Neighborhood Facebook groups",
  "Seasonal postcard mailers",
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-black text-primary-foreground">C</span>
            </div>
            <div>
              <span className="font-bold text-foreground">CandyDish</span>
              <span className="text-muted-foreground text-sm ml-1.5">Leads</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/community">
              <Button variant="ghost" size="sm" className="hidden sm:flex">Community</Button>
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            ) : (
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => (window.location.href = getLoginUrl())}
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
        <div className="container py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold mb-6 border border-accent/30">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              Built specifically for junk removal businesses
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
              Creative Local Leads,{" "}
              <span className="relative">
                <span className="text-primary">Made Simple</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent rounded-full" />
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              CandyDish Leads helps junk removal owners implement low-cost, creative local lead generation strategies — from dropping off materials at real estate offices to building contractor partnerships. Track every activity, measure ROI, and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
                    Open Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
                  onClick={() => (window.location.href = getLoginUrl())}
                >
                  Start for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              <Link href="/campaigns">
                <Button size="lg" variant="outline" className="font-semibold px-8">
                  Browse Tactics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tactics ticker */}
      <section className="border-y border-border bg-primary py-4 overflow-hidden">
        <div className="flex gap-8 animate-none">
          <div className="flex gap-8 items-center whitespace-nowrap px-4 flex-wrap justify-center">
            {tactics.map((t, i) => (
              <span key={i} className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Everything you need to generate local leads
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete toolkit for junk removal owners who want to grow through offline, community-driven marketing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight">
              From idea to lead in 3 steps
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
              Simple enough to use daily, powerful enough to track everything.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Pick a tactic",
                desc: "Browse the campaign library and choose a strategy that fits your market and budget.",
              },
              {
                step: "02",
                title: "Execute & track",
                desc: "Log your activities with location, materials, and contacts. Track status as you go.",
              },
              {
                step: "03",
                title: "Measure ROI",
                desc: "See which tactics generate the most leads and revenue. Double down on what works.",
              },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-black text-lg">{s.step}</span>
                </div>
                <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-6 tracking-tight">
                Built for the junk removal industry
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Every tactic, template, and tip in CandyDish is designed specifically for junk removal businesses. No generic marketing advice — just proven local strategies that work in your market.
              </p>
              <ul className="space-y-3">
                {[
                  "10 pre-built campaign tactics with step-by-step guides",
                  "ROI calculator with cost-per-lead tracking",
                  "Partner CRM for real estate agents and contractors",
                  "5 customizable marketing material templates",
                  "Community forum with real owner success stories",
                  "Mobile-friendly for use in the field",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold">This Month's Performance</span>
                    <span className="text-xs text-primary-foreground/60">Live</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Leads", value: "24" },
                      { label: "Cost/Lead", value: "$8.50" },
                      { label: "Revenue", value: "$4,200" },
                    ].map((m, i) => (
                      <div key={i} className="text-center">
                        <p className="text-2xl font-black text-accent">{m.value}</p>
                        <p className="text-xs text-primary-foreground/60 mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { tactic: "Real Estate Drop-offs", leads: 8, roi: "420%" },
                    { tactic: "Contractor Partnerships", leads: 12, roi: "680%" },
                    { tactic: "Door Hangers", leads: 4, roi: "210%" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-sm text-primary-foreground/80">{t.tactic}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-primary-foreground/50">{t.leads} leads</span>
                        <span className="text-xs font-bold text-accent">{t.roi} ROI</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent/10 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            Ready to fill your schedule with local leads?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join junk removal owners who are growing their business with creative, low-cost local marketing.
          </p>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10">
                Open Your Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Get Started — It's Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-xs font-black text-primary-foreground">C</span>
            </div>
            <span className="text-sm font-semibold text-foreground">CandyDish Leads</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Creative local lead tactics made simple for junk removal businesses.
          </p>
          <div className="flex gap-4">
            <Link href="/campaigns"><span className="text-xs text-muted-foreground hover:text-foreground transition-colors">Campaigns</span></Link>
            <Link href="/community"><span className="text-xs text-muted-foreground hover:text-foreground transition-colors">Community</span></Link>
            <Link href="/templates"><span className="text-xs text-muted-foreground hover:text-foreground transition-colors">Templates</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
