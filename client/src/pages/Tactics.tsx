import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
  Zap,
  MapPin,
  Star,
  Megaphone,
  Users,
  Search,
  MessageSquare,
  TrendingUp,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const tactics = [
  {
    id: 1,
    icon: MapPin,
    category: "Local SEO",
    tag: "Quick Win",
    tagColor: "bg-green-100 text-green-700",
    title: "The #1 Thing Junk Removal Owners Ignore on Google Maps",
    summary:
      "Most junk removal businesses claim their Google Business Profile but never touch it again. Here is the simple weekly routine that puts you in the top 3 map pack and keeps you there.",
    tips: [
      "Post at least one photo of a completed job every week. Google rewards active profiles with higher rankings.",
      "Answer every question in the Q&A section yourself before a stranger does. Pre-fill it with your most common customer questions.",
      "Use your city name and service type naturally in your business description (e.g., 'Dallas junk removal' not just 'junk removal').",
      "Respond to every review within 24 hours, positive or negative. Google tracks this as a trust signal.",
    ],
    readTime: "3 min read",
    ctaLine: "We fully manage and automate your Google Business Profile — posts, reviews, Q&A, and all.",
  },
  {
    id: 2,
    icon: Users,
    category: "Referral Marketing",
    tag: "High ROI",
    tagColor: "bg-amber-100 text-amber-700",
    title: "How to Build a Referral Machine with Real Estate Agents",
    summary:
      "Real estate agents need junk removal constantly for estate cleanouts, pre-listing cleanups, and hoarder situations. Here is exactly how to get on their speed dial.",
    tips: [
      "Drop off a simple one-page flyer at 5 real estate offices per week. Include a Realtor Referral Rate — even a small discount creates loyalty.",
      "Join your local Association of Realtors Facebook group and introduce yourself. Do not pitch — just be helpful and visible.",
      "Give every agent a stack of your business cards to hand out. Make it easy for them to refer you without thinking.",
      "Follow up with a handwritten thank-you note after your first job from a new referral source. Nobody does this. You will be remembered.",
    ],
    readTime: "4 min read",
    ctaLine: "We build and manage your entire local referral network — so agents and contractors send you jobs on autopilot.",
  },
  {
    id: 3,
    icon: MessageSquare,
    category: "Reputation",
    tag: "Trust Builder",
    tagColor: "bg-blue-100 text-blue-700",
    title: "The 5-Star Review System Every Junk Hauler Needs",
    summary:
      "Reviews are the number one factor customers use to choose a junk removal company. Here is the dead-simple system to get a steady stream of 5-star reviews without begging.",
    tips: [
      "Text your review link to every customer within 2 hours of completing the job, while the experience is still fresh.",
      "Train your crew to say 'If we did a great job today, we would really appreciate a quick Google review' before leaving the job site.",
      "Create a QR code that links directly to your Google review page. Put it on your truck, your invoice, and your business card.",
      "Never offer incentives for reviews — it violates Google's terms. Instead, just make it effortless by sending a direct link.",
    ],
    readTime: "3 min read",
    ctaLine: "We automate your entire review collection process — texts, follow-ups, and response management handled for you.",
  },
  {
    id: 4,
    icon: Search,
    category: "Google Ads",
    tag: "Lead Gen",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Why Your Google Ads Are Not Ringing the Phone (And How to Fix It)",
    summary:
      "Most junk removal owners waste half their ad budget on the wrong keywords. Here is what is actually working in 2024 for local haulers.",
    tips: [
      "Bid on 'junk removal near me' and '[your city] junk removal' first — these have the highest purchase intent of any search terms.",
      "Add negative keywords like 'free', 'DIY', 'how to', and 'rental' to stop paying for clicks that will never convert.",
      "Use call-only ads during business hours — most junk removal customers want to call, not fill out a form.",
      "Set a location radius of 15 to 20 miles max. Bidding statewide or nationally burns your budget on people you cannot serve.",
    ],
    readTime: "5 min read",
    ctaLine: "We manage your Google Ads campaigns end-to-end — targeting, bidding, copy, and weekly optimization.",
  },
  {
    id: 5,
    icon: Megaphone,
    category: "Social Media",
    tag: "Brand Building",
    tagColor: "bg-rose-100 text-rose-700",
    title: "What to Post on Facebook to Get Junk Removal Jobs (Not Just Likes)",
    summary:
      "Social media for junk removal is not about going viral. It is about staying visible to the 500 people in your community who will eventually need you. Here is what actually works.",
    tips: [
      "Post before-and-after photos of every significant job. These get shared more than anything else and show real proof of your work.",
      "Join local Facebook community groups and post a 'just finished a job nearby' update with a photo. Keep it casual, not salesy.",
      "Share tips your audience finds useful — '5 signs it is time to call a junk removal company' positions you as the expert.",
      "Post your crew on the job. People hire people they trust. Showing faces builds familiarity and trust before they ever call.",
    ],
    readTime: "4 min read",
    ctaLine: "We create and post your social media content every week — so you stay visible without spending hours on your phone.",
  },
  {
    id: 6,
    icon: TrendingUp,
    category: "Growth",
    tag: "Scale Up",
    tagColor: "bg-teal-100 text-teal-700",
    title: "The Contractor Partnership Play: How to Get Jobs from Plumbers, Roofers, and Remodelers",
    summary:
      "Contractors generate debris constantly and need reliable haulers. One good contractor relationship can send you 5 to 10 jobs per month indefinitely. Here is how to land them.",
    tips: [
      "Show up at contractor supply stores (Home Depot Pro desk, local lumber yards) in the morning — that is where contractors start their day.",
      "Offer a contractor rate — a small discount for repeat business. Print it on a simple card and hand it out personally.",
      "Be reliable above all else. Show up on time, quote accurately, and clean up after yourself. Contractors refer who they trust.",
      "Ask every contractor you work with: 'Do you know any other contractors who might need a hauler?' One referral becomes five.",
    ],
    readTime: "4 min read",
    ctaLine: "We identify and reach out to contractors in your area on your behalf — building referral relationships while you focus on jobs.",
  },
  {
    id: 7,
    icon: Globe,
    category: "Website",
    tag: "Conversions",
    tagColor: "bg-indigo-100 text-indigo-700",
    title: "Your Website Is Losing You Jobs — Here Is the 5-Minute Audit",
    summary:
      "Most junk removal websites look fine but convert terribly. Here is the exact checklist we use to turn a website that gets visitors into one that books jobs.",
    tips: [
      "Your phone number must be visible above the fold on mobile — if someone has to scroll to find it, you have already lost them.",
      "Add a 'Book Online' or 'Get a Free Quote' button in the top navigation. One click to start the booking process.",
      "Include at least 5 real before-and-after photos on your homepage. Stock photos kill trust instantly.",
      "Add a simple FAQ section answering 'How much does junk removal cost?' — this is the number one question and it keeps people on your site.",
    ],
    readTime: "3 min read",
    ctaLine: "We build and optimize your website and landing pages specifically to convert junk removal visitors into booked jobs.",
  },
];

export default function Tactics() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "Results", href: "/#results" },
    { label: "Tactics", href: "/tactics" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* NAV */}
      <nav className="border-b border-border bg-card/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-black text-primary-foreground">L</span>
              </div>
              <div>
                <span className="font-bold text-foreground">LeadPile</span>
                <span className="text-muted-foreground text-sm ml-1.5 hidden sm:inline">Agency</span>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={"hover:text-foreground transition-colors" + (l.href === "/tactics" ? " text-primary font-semibold" : "")}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a href="/#contact" className="hidden md:block">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Get Free Strategy Call
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </a>

          <div className="flex items-center gap-2 md:hidden">
            <a href="tel:+12164710116">
              <Button size="sm" variant="outline" className="bg-background px-2.5">
                <Phone className="w-4 h-4 text-primary" />
              </Button>
            </a>
            <Button
              size="sm"
              variant="outline"
              className="bg-background px-2.5"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileNavOpen(false)}
                className={"block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors" + (l.href === "/tactics" ? " text-primary bg-primary/5" : " text-foreground")}
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2">
              <a href="/#contact" onClick={() => setMobileNavOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground font-semibold">
                  Get Free Strategy Call
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* PAGE HEADER */}
      <section className="relative overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container py-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold mb-5 border border-accent/30">
              <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              Free tactics from the LeadPile team
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-4">
              Proven Lead Tactics for<br />
              <span className="text-primary">Junk Removal Owners</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Real strategies we use for our clients, broken down into simple actionable steps. Read them, try them yourself, or let us handle all of it for you.
            </p>
          </div>
        </div>
      </section>

      {/* TACTIC POSTS */}
      <section className="py-12 sm:py-16 pb-28 sm:pb-16">
        <div className="container max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            {tactics.map((tactic) => {
              const Icon = tactic.icon;
              const isExpanded = expandedTip === tactic.id;
              return (
                <article
                  key={tactic.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-5 sm:p-8">
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className={"text-xs font-bold px-2.5 py-1 rounded-full " + tactic.tagColor}>
                          {tactic.tag}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">{tactic.category}</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">·</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">{tactic.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-lg sm:text-2xl font-extrabold text-foreground mb-3 leading-tight">
                      {tactic.title}
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5">
                      {tactic.summary}
                    </p>

                    <button
                      onClick={() => setExpandedTip(isExpanded ? null : tactic.id)}
                      className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      {isExpanded ? "Hide tactics" : "Read the tactics"}
                      <ChevronRight className={"w-4 h-4 transition-transform" + (isExpanded ? " rotate-90" : "")} />
                    </button>
                  </div>

                  {isExpanded && (
                    <>
                      <div className="px-5 sm:px-8 pb-5 sm:pb-6 border-t border-border pt-5 sm:pt-6">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Step-by-step tactics</p>
                        <div className="space-y-3">
                          {tactic.tips.map((tip, j) => (
                            <div key={j} className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-muted/40 border border-border">
                              <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-black text-primary">{j + 1}</span>
                              </div>
                              <p className="text-sm text-foreground leading-relaxed">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mx-5 sm:mx-8 mb-5 sm:mb-8 rounded-xl bg-primary p-4 sm:p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <p className="text-primary-foreground/90 text-sm leading-relaxed font-medium">
                            {tactic.ctaLine}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a href="/#contact" className="flex-1 sm:flex-none">
                            <Button className="w-full sm:w-auto bg-accent text-foreground hover:bg-accent/90 font-bold text-sm">
                              Let Us Handle This For You
                              <ArrowRight className="w-4 h-4 ml-1.5" />
                            </Button>
                          </a>
                          <a href="tel:+12164710116" className="flex-1 sm:flex-none">
                            <Button variant="outline" className="w-full sm:w-auto border-white/30 text-primary-foreground hover:bg-white/10 font-semibold text-sm bg-transparent">
                              <Phone className="w-4 h-4 mr-1.5" />
                              Call (216) 471-0116
                            </Button>
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="bg-primary py-14 sm:py-20">
        <div className="container max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-5 border border-accent/30">
            <Zap className="w-3.5 h-3.5" />
            Done-for-you, not DIY
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-4 tracking-tight leading-tight">
            These tactics work.<br />We do them for you.
          </h2>
          <p className="text-primary-foreground/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Every strategy on this page is something we implement for our clients every day. You do not have to figure it out yourself — let us run it all while you focus on the jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-foreground hover:bg-accent/90 font-bold px-8 text-base">
                Book My Free Strategy Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="tel:+12164710116">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-primary-foreground hover:bg-white/10 font-semibold px-8 text-base bg-transparent">
                <Phone className="w-5 h-5 mr-2" />
                Call (216) 471-0116
              </Button>
            </a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-primary-foreground/50">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              No long-term contracts
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              First leads in 14 days
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Junk removal specialists only
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground py-10 sm:py-12 border-t border-primary/20">
        <div className="container">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:gap-6">
            <Link href="/">
              <div className="flex items-center gap-2.5 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-accent/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-black text-accent">L</span>
                </div>
                <div>
                  <span className="font-bold">LeadPile</span>
                  <span className="text-primary-foreground/60 text-sm ml-1.5">Agency</span>
                </div>
              </div>
            </Link>
            <p className="text-primary-foreground/50 text-sm text-center">
              Done-for-you marketing exclusively for junk removal businesses.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
              <a href="/#services" className="hover:text-primary-foreground transition-colors">Services</a>
              <a href="/#pricing" className="hover:text-primary-foreground transition-colors">Pricing</a>
              <a href="/#contact" className="hover:text-primary-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-7 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/40">
            <span>2025 LeadPile Agency. All rights reserved.</span>
            <div className="flex items-center gap-3">
              <a href="tel:+12164710116" className="flex items-center gap-1.5 hover:text-primary-foreground/70 transition-colors">
                <Phone className="w-3.5 h-3.5" /> (216) 471-0116
              </a>
              <span>·</span>
              <a href="mailto:hello@leadpileagency.com" className="flex items-center gap-1.5 hover:text-primary-foreground/70 transition-colors">
                <Mail className="w-3.5 h-3.5" /> hello@leadpileagency.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border shadow-2xl px-4 py-3">
        <a href="/#contact">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base py-3">
            Book Free Call
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </a>
      </div>

    </div>
  );
}
