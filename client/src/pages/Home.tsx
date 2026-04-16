import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Phone,
  Mail,
  ChevronRight,
  Zap,
  BarChart3,
  Globe,
  MessageSquare,
  Search,
  Megaphone,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Award,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  Facebook,
  Youtube,
  BadgeCheck,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const services = [
  {
    icon: Search,
    title: "Google Ads & Local SEO",
    description:
      "We run your ad campaigns and optimize your local search presence so you show up first on Google, Angi, Nextdoor, or Facebook.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MapPin,
    title: "Google Business Profile Optimization",
    description:
      "We fully optimize your Google Business Profile and keep it active with fresh posts, photos, and updates — so Google keeps ranking you higher every week.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Globe,
    title: "Website Design & Optimization",
    description:
      "A fast, conversion-focused website and landing pages built specifically for junk removal. Booking forms, trust signals, and mobile-first design — all done for you.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    description:
      "We create and post content across Facebook, Instagram, and Nextdoor to keep your brand top-of-mind in your local community.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: MessageSquare,
    title: "Review & Reputation Management",
    description:
      "Automated review requests after every job, plus monitoring and response management across Google, Yelp, and Facebook.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: BarChart3,
    title: "Lead Tracking & Reporting",
    description:
      "A real-time dashboard showing your leads, cost per lead, and booked jobs. You always know exactly what your marketing dollars are producing.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Users,
    title: "Local Partnership Outreach",
    description:
      "We identify and contact real estate agents, contractors, and property managers in your area to build referral pipelines on your behalf.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Mail,
    title: "Remarketing & Re-Engagement Campaigns",
    description:
      "We run targeted SMS and email campaigns to past customers and warm leads — keeping your brand top-of-mind so they book again, refer a friend, or finally pull the trigger.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: BadgeCheck,
    title: "Google Local Service Ads",
    description:
      "We set up and manage your Google Local Service Ads — the pay-per-lead placements that appear above everything else on Google, complete with the Google Guaranteed badge that builds instant trust.",
    color: "bg-sky-50 text-sky-600",
  },
];

const results = [
  { value: "47", label: "Avg. leads per month", suffix: "+" },
  { value: "3.2", label: "Avg. cost per lead", prefix: "$", suffix: "" },
  { value: "90", label: "Client retention rate", suffix: "%" },
  { value: "14", label: "Days to first lead", suffix: "" },
];

const testimonials = [
  {
    name: "Marcus T.",
    location: "Dallas, TX",
    text: "Before LeadHauler, I was spending $800/month on ads and getting maybe 5 calls. Now I'm getting 40+ leads a month and I don't touch any of it. They handle everything.",
    stars: 5,
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/testimonial-mike-aBwsAxv9CGakX8QyAprMo9.webp",
  },
  {
    name: "Jennifer R.",
    location: "Atlanta, GA",
    text: "I was skeptical because I'd tried agencies before. But these guys actually specialize in junk removal — they knew my business better than I did on day one.",
    stars: 5,
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/testimonial-lisa-i6R5tdPVwYdRHFaMGWN4FM.webp",
  },
  {
    name: "Derek S.",
    location: "Phoenix, AZ",
    text: "My Google ranking went from page 4 to the top 3 in my city within 6 weeks. The phone hasn't stopped ringing. Best investment I've made in my business.",
    stars: 5,
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/testimonial-jason-fH6BHHnZbCSCp8PD7ee7nm.webp",
  },
  {
    name: "Chris M.",
    location: "Nashville, TN",
    text: "I was running everything myself — ads, calls, follow-ups. LeadHauler took it all off my plate. Now I just show up and do the work. Revenue is up 60% since we started.",
    stars: 5,
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Tony B.",
    location: "Denver, CO",
    text: "The LSA setup alone was worth every penny. We got the Google Guaranteed badge in two weeks and the leads started coming in immediately. Highly recommend.",
    stars: 5,
    photo: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    name: "Ray V.",
    location: "Charlotte, NC",
    text: "Three months in and we've doubled our monthly jobs. The remarketing campaigns bring back customers we thought were gone for good. Solid team, real results.",
    stars: 5,
    photo: "https://randomuser.me/api/portraits/men/23.jpg",
  },
];

const faqs = [
  {
    q: "Do you work with junk removal businesses only?",
    a: "Yes — 100%. We exclusively serve junk removal and hauling businesses. That means our strategies, templates, ad copy, and targeting are all built specifically for your industry.",
  },
  {
    q: "How quickly will I start seeing leads?",
    a: "Most clients see their first leads within 14 days of launch. Google Ads campaigns typically go live within 48 hours of onboarding. And if leads haven't started coming in within 14 days, we keep working — for free — until they do.",
  },
  {
    q: "What is your 14-day lead guarantee?",
    a: "Simple: if you don't receive your first lead within 14 days of your campaign going live, we work for free until you do. No asterisks, no fine print. We're confident enough in our system to put our time on the line.",
  },
  {
    q: "Do I need to sign a long-term contract?",
    a: "No long-term contracts. We work month-to-month because we believe our results should be the reason you stay, not a contract.",
  },
  {
    q: "What if I already have a website?",
    a: "No problem. We can optimize your existing site or build you a new one — whichever will get you better results. We'll audit it during onboarding.",
  },
  {
    q: "How do I know what I'm paying for?",
    a: "You get a live reporting dashboard showing every lead, every call, and every dollar spent. Full transparency, always.",
  },
  {
    q: "What is the Speed-to-Lead tool?",
    a: "Speed-to-Lead is LeadHauler's automated response system included in every package. The moment a new lead comes in — whether from a Google Ad, your website form, a Facebook ad, or a text — the system fires an immediate, personalized follow-up message back to that prospect within minutes. You set your pricing parameters and preferred message once during onboarding; Speed-to-Lead handles every response from there. No more missed leads because you were on a job or off the clock.",
  },
  {
    q: "How does Speed-to-Lead help me win more jobs?",
    a: "Studies consistently show that the first company to respond to a lead wins the job up to 78% of the time. Most junk removal operators call back an hour later — or not at all. Speed-to-Lead puts you in front of every prospect within minutes, every time, automatically. That speed signals professionalism, builds instant trust, and dramatically increases your close rate without any extra effort on your part. It is the single highest-leverage tool we include in every LeadHauler plan.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // True only on real mobile devices (phones/tablets) — uses userAgent only, never maxTouchPoints
  const isMobileDevice =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const [form, setForm] = useState({ name: "", business: "", phone: "", city: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitLead = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("We'll be in touch within 24 hours!");
      // Fire Meta Pixel Lead event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
      // Fire GA4 conversion event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "contact_form",
          event_label: "Book Free Call",
        });
      }
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    submitLead.mutate(form);
  };

  // ── Count-up animation hook ────────────────────────────────────────────
  const useCountUp = (target: number, duration = 1800) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const start = useCallback(() => {
      if (started) return;
      setStarted(true);
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [started, target, duration]);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) start(); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [start]);

    return { count, ref };
  };

  const stat312 = useCountUp(312);
  const stat14  = useCountUp(14, 1200);
  const stat7   = useCountUp(7, 900);
  // Mobile block uses separate refs so they trigger independently
  const mStat312 = useCountUp(312);
  const mStat14  = useCountUp(14, 1200);
  const mStat7   = useCountUp(7, 900);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Results", href: "#results" },
    { label: "Tactics", href: "/tactics" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="border-b border-border bg-card/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/leadhauler_top-removebg-preview_eb70e94b.png"
              alt="LeadHauler — Marketing for Junk Removal"
              className="h-12 md:h-14 lg:h-[72px] w-auto object-contain"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="#contact" className="hidden md:block">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Get Free Strategy Call
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </a>

          {/* Mobile: phone + hamburger — only rendered on actual mobile devices */}
          {isMobileDevice && (
          <div className="flex items-center gap-2">
                  <a href="tel:+15087156385">
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
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobileDevice && mobileNavOpen && (
          <div className="border-t border-border bg-card px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileNavOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2">
              <a href="#contact" onClick={() => setMobileNavOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground font-semibold">
                  Get your first leads in 14 days
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        {/* Subtle gradient + grid texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container relative">
          {/* Two-column layout on desktop: text left, visual right */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-10">

            {/* ── LEFT: copy ── */}
            <div className="flex flex-col items-start pb-16 lg:pb-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold mb-6 border border-accent/30">
                <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                The complete marketing system for junk haulers
              </div>

              {/* Headline — controlled line-break so each sentence sits on its own line */}
              <h1 className="text-[2.6rem] leading-[1.0] sm:text-6xl sm:leading-[0.98] lg:text-6xl xl:text-7xl text-foreground tracking-tight mb-6" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                We Haul In<br className="hidden sm:block" /> the Leads.<br />
                <span className="text-primary">You Haul Out<br className="hidden sm:block" /> the Junk.</span>
              </h1>

              {/* Mobile-only video — shown between headline and body copy */}
              <div className="block lg:hidden w-full mb-6 mt-2">
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 0,
                    paddingBottom: '100%',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
                  }}
                >
                  <iframe
                    allow="fullscreen"
                    allowFullScreen
                    src="https://streamable.com/e/azn80q?loop=0"
                    style={{
                      border: 'none',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      overflow: 'hidden',
                    }}
                  />
                </div>
              </div>

              {/* Body copy */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                LeadHauler is the only complete, done-for-you, 8 channel marketing system built exclusively for junk removal businesses — covering everything from lead generation and local SEO to ads, referrals, and follow-up automation — so your phone rings and your schedule stays full.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8">
                <a href="#contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-3 text-base shadow-lg shadow-primary/25">
                    Get My Free Strategy Call
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="#results" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold px-8 py-3 text-base bg-background border-border">
                    See Client Results
                  </Button>
                </a>
              </div>

              {/* 14-Day Guarantee Badge */}
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-4 w-fit">
                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground">14-Day Lead Guarantee</span>
                <span className="text-sm text-muted-foreground">— or we work free until you do</span>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {[
                  "No long-term contracts",
                  "Junk removal specialists only",
                  "First leads in 14 days",
                  "Full transparency dashboard",
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Mike flush to bottom, shifted left to close gap ── */}
            <div className="hidden lg:flex items-center justify-center" style={{ marginLeft: '-4%', paddingLeft: '2%' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingBottom: '100%',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                }}
              >
                <iframe
                  allow="fullscreen"
                  allowFullScreen
                  src="https://streamable.com/e/azn80q?loop=0"
                  style={{
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    overflow: 'hidden',
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section id="results" className="py-16 sm:py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container">

          {/* Mobile-only stats block — shown above client results on small screens */}
          <div className="md:hidden mb-10 space-y-3">
            {/* 312% card */}
            <div ref={mStat312.ref} className="rounded-2xl bg-card text-card-foreground p-6 shadow-sm border border-border">
              <p className="text-5xl font-extrabold text-accent leading-none mb-2">{mStat312.count}%</p>
              <p className="font-bold text-foreground text-base">Average lead increase</p>
              <p className="text-sm text-muted-foreground mt-1">Across active LeadHauler System clients in their first 90 days.</p>
            </div>
            {/* 14 + 7 side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div ref={mStat14.ref} className="rounded-2xl bg-card text-card-foreground p-5 shadow-sm border border-border">
                <p className="text-4xl font-extrabold text-foreground leading-none mb-2">{mStat14.count}</p>
                <p className="font-semibold text-foreground text-sm">Days to first lead</p>
                <p className="text-xs text-muted-foreground mt-1">Guaranteed or we work free.</p>
              </div>
              <div ref={mStat7.ref} className="rounded-2xl bg-card text-card-foreground p-5 shadow-sm border border-border">
                <p className="text-4xl font-extrabold text-foreground leading-none mb-2">{mStat7.count}</p>
                <p className="font-semibold text-foreground text-sm">Channels managed</p>
                <p className="text-xs text-muted-foreground mt-1">All done for you, every day.</p>
              </div>
            </div>
            {/* Trusted badge */}
            <div className="rounded-2xl bg-accent/10 border border-accent/20 p-4 flex items-center gap-4">
              <div className="flex -space-x-2 flex-shrink-0">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/hero-avatar-mike-Ub4UZgCBy7TE2AVBpybWaY.webp" alt="Mike" className="w-9 h-9 rounded-full border-2 border-background object-cover" />
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/hero-avatar-jason-QEsVpNmgzTvnvzDQ5hrzuq.webp" alt="Jason" className="w-9 h-9 rounded-full border-2 border-background object-cover" />
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/hero-avatar-derek-grnTXPDz5UVywfW3nNMfjD.webp" alt="Derek" className="w-9 h-9 rounded-full border-2 border-background object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-foreground">Trusted by junk haulers nationwide</p>
                <p className="text-xs text-primary-foreground/60">Solo operators to multi-truck fleets</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-bold text-accent uppercase tracking-widest mb-3">Client results</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight">
              Junk removal owners love LeadHauler
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-primary-foreground/90 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-white/20"
                  />
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-primary-foreground/50 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Problem side */}
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Sound familiar?</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-6 tracking-tight leading-tight">
                You're great at hauling junk.<br />Marketing is a different job.
              </h2>
              <div className="space-y-3">
                {[
                  "Spending money on ads that don't convert",
                  "No idea why your phone isn't ringing more",
                  "Competitors showing up above you on Google",
                  "No time to post on social media or chase reviews",
                  "Tried agencies before — they didn't understand your business",
                  "You're losing out on local referrals",
                  "Your website doesn't look professional",
                  "Warm leads go cold from lack of follow-up",
                ].map((pain, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                    <span className="text-red-400 font-bold text-lg leading-none mt-0.5 flex-shrink-0">✕</span>
                    <p className="text-sm text-red-800 font-medium">{pain}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Solution side */}
            <div>
              <p className="text-sm font-bold text-green-600 uppercase tracking-widest mb-3">The LeadHauler difference</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-6 tracking-tight leading-tight">
                We do it all.<br />You just answer the phone.
              </h2>
              <div className="space-y-3">
                {[
                  "Targeted ad campaigns placed only on platforms where your customers are ready to book",
                  "A full optimized and automated Google Business Profile that puts you on the map — literally",
                  "A website and landing pages that convert visitors into booked jobs.",
                  "Social media content posted for you every week",
                  "Automated review requests after every completed job",
                  "A local pipeline of professional referrals — real estate agents, contractors, and property managers consistently sending you jobs",
                  "Targeted, direct mailers to neighborhoods you're already working in — turning nearby homes into new jobs",
                  "Remarketing campaigns via SMS and email that re-engage past customers and warm leads — so no opportunity goes cold",
                ].map((win, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800 font-medium">{win}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────── */}
      <section id="services" className="py-16 sm:py-20 lg:py-28 bg-muted/30 border-y border-border">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">What we do</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Every marketing channel. Fully managed.
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              You get a complete marketing team — strategist, ad manager, SEO specialist, content creator, and account manager — all for less than hiring one employee.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Simple process</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", icon: Phone, title: "Free Strategy Call", desc: "We learn your market, goals, and current situation. No pressure, no pitch — just a real conversation." },
              { step: "02", icon: Shield, title: "Custom Game Plan", desc: "We customize and tailor our system to your city, competition, and budget. You approve everything." },
              { step: "03", icon: Zap, title: "We Launch", desc: "Your LeadHauler system goes live, your site is optimized, and your social media is set up — all within 48–72 hours." },
              { step: "04", icon: TrendingUp, title: "Leads Flow In", desc: "You start answering calls and following up on form fills. We optimize weekly to keep improving." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="relative text-center">
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] right-0 h-px bg-border" />
                  )}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4 relative z-10">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <p className="text-xs font-black text-primary/40 uppercase tracking-widest mb-1">{s.step}</p>
                  <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-28">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Transparent pricing</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Simple plans. No surprises.
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              All plans include a dedicated account manager, monthly reporting, and no long-term contracts.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$1,800",
                period: "/mo",
                desc: "Perfect for new or small junk removal operations ready to grow.",
                features: [
                  "Google Ads management (up to $1,500 ad spend)",
                  "Local SEO optimization",
                  "Google Business Profile audit & management.",
                  "Full access to our local partnership outreach tool.",
                  "Full access to our Speed-to-lead quick quote tool.",
                  "Remarketing & re-engagement campaigns",
                  "Monthly performance report",
                ],
                cta: "Get Started",
                highlight: false,
              },
              {
                name: "Growth",
                price: "$2,500",
                period: "/mo",
                desc: "For established operators ready to dominate their local market.",
                features: [
                  "Everything in Starter",
                  "Google Ads (up to $4,000 ad spend)",
                  "Google Local Service Ads management",
                  "Website design or optimization",
                  "Social media management (3x/week)",
                  "Review & reputation management",
                ],
                cta: "Most Popular — Get Started",
                highlight: true,
              },
              {
                name: "Dominator",
                price: "$5,500",
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
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 sm:p-7 border flex flex-col ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground border-primary shadow-2xl md:scale-[1.03]"
                    : "bg-card border-border"
                }`}
              >
                {plan.highlight && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/30 text-accent text-xs font-bold mb-4 self-start border border-accent/30">
                    <Award className="w-3.5 h-3.5" /> Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-extrabold mb-1 ${plan.highlight ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-3xl sm:text-4xl font-black ${plan.highlight ? "text-accent" : "text-primary"}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mb-5 leading-relaxed ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.desc}
                </p>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-accent" : "text-green-500"}`} />
                      <span className={plan.highlight ? "text-primary-foreground/85" : "text-foreground/80"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact">
                  <Button
                    className={`w-full font-bold ${
                      plan.highlight
                        ? "bg-accent text-foreground hover:bg-accent/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {plan.cta}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>
                <div className={`flex items-center justify-center gap-1.5 mt-3 text-xs ${
                  plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>First leads in 14 days — or we work free</span>
                </div>
                <p className={`text-center text-xs mt-1 ${plan.highlight ? "text-primary-foreground/50" : "text-muted-foreground/70"}`}>
                  No contract. Cancel anytime.
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 space-y-1">
            <p className="text-sm text-muted-foreground">Ad spend is billed separately and goes directly to Google/Meta — we never mark it up.</p>
            <p className="text-sm font-semibold text-foreground">All packages require a $997 one-time setup fee.</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-16 sm:py-20 bg-muted/30 border-y border-border">
        <div className="container max-w-3xl">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
              Common questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-4 sm:px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-foreground text-sm leading-snug">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 sm:px-6 pb-5">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ───────────────────────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-20 lg:py-28 pb-28 sm:pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
            {/* Left: copy */}
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Get started today</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 tracking-tight leading-tight">
                Ready to stop guessing and start growing?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-7">
                Book a free 30-minute strategy call. We'll review your current marketing, show you what your competitors are doing, and give you a custom growth plan — no obligation.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: "30-minute call, no sales pressure" },
                  { icon: BarChart3, text: "Free competitor analysis included" },
                  { icon: Shield, text: "No contracts, cancel anytime" },
                  { icon: Zap, text: "First leads within 14 days of launch" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-7 pt-7 border-t border-border flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <a href="tel:+15087156385" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  (508) 715-6385
                </a>
                <span className="hidden sm:block text-border">|</span>
                <a href="mailto:hello@leadhauler.com" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  hello@leadhauler.com
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">You're on the list!</h3>
                  <p className="text-muted-foreground text-sm">We'll reach out within 24 hours to schedule your free strategy call.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">Book Your Free Strategy Call</h3>
                  <p className="text-muted-foreground text-sm mb-5">Takes 60 seconds. We'll call you.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Business Name</label>
                      <input
                        type="text"
                        placeholder="Smith's Junk Removal"
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">City / Service Area</label>
                      <input
                        type="text"
                        placeholder="Dallas, TX"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 text-base"
                      disabled={submitLead.isPending}
                    >
                      {submitLead.isPending ? "Sending..." : "Book My Free Call →"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We respect your privacy. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-primary text-primary-foreground pt-14 pb-8 border-t border-primary/20">
        <div className="container">
          {/* Top row: brand + columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
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
            {/* Navigation column */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/40 mb-4">Navigation</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Services", href: "#services" },
                  { label: "Results", href: "#results" },
                  { label: "How It Works", href: "#process" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "FAQ", href: "#faq" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Resources column */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/40 mb-4">Resources</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Tactics & Tips", href: "/tactics" },
                  { label: "Get a Free Strategy Call", href: "#contact" },
                  { label: "Client Results", href: "#results" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact column */}
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
          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/40">
            <span>© {new Date().getFullYear()} LeadHauler System. All rights reserved.</span>
            <span>Done-for-you marketing exclusively for junk haulers.</span>
          </div>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA BAR ───────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border shadow-2xl px-4 py-3">
        <a href="#contact">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base py-3">
            Try us risk-free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </a>
      </div>

    </div>
  );
}
