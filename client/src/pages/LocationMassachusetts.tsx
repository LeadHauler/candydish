import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/Map";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Phone,
  MapPin,
  Menu,
  X,
  Search,
  BarChart3,
  Globe,
  MessageSquare,
  Megaphone,
  BadgeCheck,
  Users,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=c99dc4ab72a1909f&sxsrf=ANbL-n7Zez4D2AuPTeCHAsuBs7RqsGZ66w:1775763978450&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOeDDeN_mda_Y_zp3sKq3OZzlH7IxW1OU3Z2Lxr0YLUQGfZEXFEVfwCLpdFlc_6OCZ_ua_pPq0ymrdMUARoBZmhLvnNJPu7upy6t0IAChSqhHwQFttntv9MvL2PUnpHpiRr82M%3D&q=Fly+By+Junk+Haulers+%26+Demolition+Reviews&sa=X&ved=2ahUKEwjl9Y6pxOGTAxUokIkEHVWHMH0Q0bkNegQIMBAH";

const MA_CITIES = [
  "Boston", "Worcester", "Springfield", "Lowell", "Cambridge",
  "New Bedford", "Brockton", "Quincy", "Lynn", "Fall River",
  "Newton", "Somerville", "Lawrence", "Framingham", "Haverhill",
  "Waltham", "Malden", "Brookline", "Plymouth", "Medford",
  "Taunton", "Chicopee", "Weymouth", "Revere", "Peabody",
  "Methuen", "Barnstable", "Pittsfield", "Attleboro", "Salem",
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

const services = [
  {
    icon: Search,
    title: "Google Ads & Local SEO",
    description: "Dominate search results in Boston, Worcester, Springfield, and every Massachusetts market you want to own.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MapPin,
    title: "Google Business Profile Optimization",
    description: "Rank in the Google Maps 3-Pack for 'junk removal near me' searches across Massachusetts cities and towns.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Globe,
    title: "Website Design & Optimization",
    description: "Fast, conversion-focused websites built for Massachusetts junk haulers — mobile-first, with booking forms and trust signals.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    description: "Local content across Facebook, Instagram, and Nextdoor — targeted to Massachusetts homeowners, landlords, and contractors.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: MessageSquare,
    title: "Review & Reputation Management",
    description: "Automated review requests after every job to build your Google rating across Massachusetts markets.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: BadgeCheck,
    title: "Google Local Service Ads",
    description: "Get the Google Guaranteed badge and appear above all other ads when Massachusetts residents search for junk removal.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: BarChart3,
    title: "Lead Tracking & Reporting",
    description: "A real-time dashboard showing every lead, call, and booked job from your Massachusetts campaigns.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Users,
    title: "Local Partnership Outreach",
    description: "We connect you with Massachusetts real estate agents, property managers, and contractors who can send you steady referral jobs.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Mail,
    title: "Remarketing & Re-Engagement",
    description: "SMS and email campaigns to past customers and warm leads across Massachusetts — so they book again and refer their neighbors.",
    color: "bg-green-50 text-green-600",
  },
];

const faqs = [
  {
    q: "Do you work with junk removal businesses in Massachusetts?",
    a: "Yes — we work with junk removal operators across the entire state of Massachusetts, from Boston and the Greater Boston area to Worcester, Springfield, Cape Cod, and everywhere in between. Our strategies are built specifically for the Massachusetts market.",
  },
  {
    q: "How competitive is the junk removal market in Massachusetts?",
    a: "Massachusetts is a competitive market, especially in Greater Boston. That's exactly why having a specialized marketing partner matters. We know which keywords drive calls in MA, how to compete in dense urban markets like Boston and Cambridge, and how to dominate smaller suburban and rural markets where the competition is thinner.",
  },
  {
    q: "How quickly will I start getting leads in Massachusetts?",
    a: "Most Massachusetts clients see their first leads within 14 days of launch. Google Ads campaigns typically go live within 48 hours of onboarding. If leads haven't started coming in within 14 days, we keep working — for free — until they do.",
  },
  {
    q: "Do I need a long-term contract?",
    a: "No long-term contracts. We work month-to-month because we believe our results should be the reason you stay, not a contract.",
  },
  {
    q: "Can you help me rank in multiple Massachusetts cities?",
    a: "Absolutely. We build multi-location SEO strategies that help you rank in every city and town you serve — whether that's just Boston or a 50-mile radius across Eastern or Western Massachusetts.",
  },
  {
    q: "What makes LeadHauler different from a general marketing agency?",
    a: "We work exclusively with junk removal businesses. That means our ad copy, landing pages, targeting, and strategies are all built for your industry — not adapted from a restaurant or law firm template.",
  },
];

export default function LocationMassachusetts() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", business: "" });
  const [submitting, setSubmitting] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const submitLead = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("We'll be in touch within 24 hours!");
      setFormData({ name: "", email: "", phone: "", city: "", business: "" });
      setSubmitting(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    submitLead.mutate({
      name: formData.name,
      phone: formData.phone,
      city: formData.city || "Massachusetts",
      business: formData.business || undefined,
    });
  };

  // SEO: update document title and meta description
  useEffect(() => {
    document.title = "Junk Removal Marketing in Massachusetts | LeadHauler";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "LeadHauler helps Massachusetts junk removal businesses get more leads with Google Ads, Local SEO, and done-for-you marketing. Serving Boston, Worcester, Springfield, and all of MA."
      );
    }
  }, []);

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "Results", href: "/#results" },
    { label: "Tactics", href: "/tactics" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAV ── */}
      <nav className="border-b border-border bg-card/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/leadhauler_top-removebg-preview_eb70e94b.png"
              alt="LeadHauler — Marketing for Junk Removal"
              className="h-12 md:h-14 lg:h-[72px] w-auto object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#contact" className="hidden md:block">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Get Free Strategy Call
            </Button>
          </a>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
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
            <a href="#contact" onClick={() => setMobileNavOpen(false)}>
              <Button className="w-full mt-2 bg-primary text-primary-foreground font-semibold">
                Get Free Strategy Call
              </Button>
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-5 border border-accent/30">
                <MapPin className="w-3.5 h-3.5" />
                Serving All of Massachusetts
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-5"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                Junk Removal Marketing in Massachusetts
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                LeadHauler is the only done-for-you marketing system built exclusively for Massachusetts junk removal businesses. We handle Google Ads, Local SEO, and 6 more channels — so your phone rings and your schedule stays full.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contact">
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 shadow-lg">
                    Get My Free Strategy Call <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="#services">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    See What We Do
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-primary-foreground/70">14-Day Lead Guarantee · No Long-Term Contracts</span>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-2xl" style={{ height: "380px" }}>
              <MapView
                initialCenter={{ lat: 42.4072, lng: -71.3824 }}
                initialZoom={8}
                onMapReady={(map) => {
                  mapRef.current = map;
                  // Add a marker for Massachusetts center
                  new google.maps.marker.AdvancedMarkerElement({
                    map,
                    position: { lat: 42.4072, lng: -71.3824 },
                    title: "Massachusetts",
                  });
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-accent py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "47+", label: "Avg. leads/month" },
              { value: "$3.20", label: "Avg. cost per lead" },
              { value: "90%", label: "Client retention rate" },
              { value: "14 days", label: "To your first lead" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-accent-foreground">{s.value}</p>
                <p className="text-sm font-semibold text-accent-foreground/70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MA ── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Why Massachusetts</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              The Massachusetts Junk Removal Market Is Booming
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With over 7 million residents, a dense housing market, and one of the highest home-renovation rates in the country, Massachusetts is one of the best states in the nation to run a junk removal business. The demand is there — the question is whether customers can find <em>you</em>.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Dense Urban Markets",
                body: "Boston, Cambridge, Somerville, and Quincy have some of the highest search volumes for 'junk removal near me' in New England. We help you own these markets.",
              },
              {
                title: "Strong Suburban Demand",
                body: "From Framingham to Plymouth, Massachusetts suburbs are full of homeowners clearing out basements, garages, and estates. We target them precisely.",
              },
              {
                title: "Year-Round Opportunity",
                body: "Unlike warmer states, Massachusetts has strong junk removal demand all year — spring cleanouts, fall estate clearances, and winter basement purges keep your calendar full.",
              },
            ].map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-xl p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-16 md:py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">What we do</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Everything Your Massachusetts Business Needs to Grow
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One system. Eight channels. All managed for you — so you can focus on running jobs, not running ads.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-xl p-5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-foreground mb-1.5 text-sm">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Social proof</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              What customers are saying about us
            </h2>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
              <span>View all Google reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <a
                key={t.name}
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow block"
              >
                <div className="flex mb-3">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES SERVED ── */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-accent uppercase tracking-widest mb-3">Coverage</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              We Serve Junk Removal Businesses Across All of Massachusetts
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Whether you're in Greater Boston or the Berkshires, we build campaigns that target the exact cities and towns where your customers are searching.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {MA_CITIES.map((city) => (
              <span
                key={city}
                className="px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-medium text-primary-foreground/90"
              >
                {city}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-sm font-medium text-accent">
              + Every City & Town in MA
            </span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Questions About Marketing in Massachusetts
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm text-foreground">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ── */}
      <section id="contact" className="py-16 md:py-20 bg-muted/40">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Get started</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Ready to Grow Your Massachusetts Junk Removal Business?
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll schedule a free 30-minute strategy call. No pressure, no obligation — just a real conversation about what's possible for your business.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Business City in MA</label>
                <input
                  type="text"
                  placeholder="e.g. Boston, Worcester"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                placeholder="john@yourcompany.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="(617) 555-0100"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 text-base"
            >
              {submitting ? "Sending..." : "Get My Free Massachusetts Strategy Call"}
              {!submitting && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              14-Day Lead Guarantee · No Long-Term Contracts · Massachusetts Specialists
            </p>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-primary text-primary-foreground py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <Link href="/">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/leadhauler_top-removebg-preview_eb70e94b.png"
                  alt="LeadHauler — Marketing for Junk Removal"
                  className="h-10 w-auto object-contain mb-2"
                />
              </Link>
              <p className="text-xs text-primary-foreground/60">
                Done-for-you marketing for junk removal businesses in Massachusetts and nationwide.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2 text-sm text-primary-foreground/70">
              <a href="tel:+18005550100" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="w-3.5 h-3.5" /> (800) 555-0100
              </a>
              <a href="mailto:hello@leadhauler.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail className="w-3.5 h-3.5" /> hello@leadhauler.com
              </a>
              <p className="text-xs text-primary-foreground/40 mt-2">© {new Date().getFullYear()} LeadHauler. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
