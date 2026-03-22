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
    category: "Referrals",
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
  {
    id: 8,
    icon: MapPin,
    category: "Local SEO",
    tag: "Free Traffic",
    tagColor: "bg-green-100 text-green-700",
    title: "How to Rank in Every City You Serve (Without Paying for Ads)",
    summary:
      "If you serve multiple towns or zip codes, you are leaving free Google traffic on the table. Here is how to create location pages that rank and drive calls from every area you cover.",
    tips: [
      "Create a separate page on your website for each city or town you serve (e.g., /junk-removal-cleveland, /junk-removal-parma). Google ranks pages, not websites.",
      "Each location page needs unique content — mention local landmarks, neighborhoods, and specific services you offer in that area. Copy-pasting the same page with a different city name will not work.",
      "Embed a Google Map on each location page showing your service area. This sends a strong local relevance signal to Google.",
      "Add a local phone number or tracking number for each city if possible. Local numbers rank better in local search results than toll-free numbers.",
      "Get at least one Google review that mentions the city name. Reviews with location keywords directly boost your local rankings for that area.",
    ],
    readTime: "4 min read",
    ctaLine: "We build and optimize location pages for every city you serve — driving free organic traffic and calls from your entire service area.",
  },
  {
    id: 9,
    icon: Users,
    category: "Referrals",
    tag: "High ROI",
    tagColor: "bg-amber-100 text-amber-700",
    title: "The Estate Sale Company Partnership: A Hidden Gold Mine for Junk Haulers",
    summary:
      "Estate sale companies deal with leftover items after every single sale — and they need a reliable hauler every time. One relationship here can mean 4 to 8 jobs per month, every month.",
    tips: [
      "Search Google for 'estate sale companies [your city]' and make a list of the top 10. These are your targets.",
      "Call or email each one and introduce yourself as a local junk removal company that specializes in post-sale cleanouts. Keep it short and direct.",
      "Offer to do their first cleanout at a discounted rate so they can see your quality and reliability firsthand. One good job earns a long-term partner.",
      "Ask to be added to their vendor list or preferred hauler list. Many estate sale companies maintain these and refer from them automatically.",
      "Follow up every 60 days with a quick check-in text or email. Staying top of mind is the entire game with referral partners.",
    ],
    readTime: "4 min read",
    ctaLine: "We identify and build referral relationships with estate sale companies, senior living facilities, and property managers in your market.",
  },
  {
    id: 10,
    icon: MessageSquare,
    category: "Reputation",
    tag: "Trust Builder",
    tagColor: "bg-blue-100 text-blue-700",
    title: "How to Handle a Negative Review Without Making It Worse",
    summary:
      "A bad review is not a death sentence — it is an opportunity. How you respond publicly is more important than the review itself. Here is the exact framework we use.",
    tips: [
      "Respond within 24 hours. A fast, calm response shows future customers you take service seriously. Silence looks like guilt.",
      "Never argue or get defensive in your response. Even if the customer is wrong, your reply is for the 100 people reading it, not the one who wrote it.",
      "Use this structure: Acknowledge the issue, apologize for the experience, offer to make it right offline. Example: 'We are sorry this was not the experience we aim to provide. Please call us directly at [number] so we can make this right.'",
      "After resolving the issue, politely ask the customer to update their review. Many will — and a 1-star that becomes a 4-star is actually a powerful trust signal.",
      "Counterbalance negative reviews by actively collecting new positive ones. One bad review among 50 good ones barely moves the needle.",
    ],
    readTime: "3 min read",
    ctaLine: "We monitor and respond to every review for you — protecting your reputation while you focus on running jobs.",
  },
  {
    id: 11,
    icon: Megaphone,
    category: "Social Media",
    tag: "Brand Building",
    tagColor: "bg-rose-100 text-rose-700",
    title: "Nextdoor: The Most Underused Lead Source in Junk Removal",
    summary:
      "Nextdoor is a neighborhood app where homeowners ask for local service recommendations daily. Most junk removal companies are completely absent. Here is how to dominate it.",
    tips: [
      "Create a free Nextdoor Business Page and verify your service area. It takes 15 minutes and puts you in front of homeowners actively looking for local services.",
      "Ask your best customers to recommend you on Nextdoor. A recommendation from a neighbor carries enormous trust — far more than a Google review from a stranger.",
      "Join neighborhood discussions and offer helpful advice when someone asks about junk removal, cleanouts, or decluttering. Be genuinely helpful, not salesy.",
      "Post a 'neighborhood special' offer once a month — something like 'Serving [neighborhood name] this week — mention Nextdoor for 10% off.' Hyperlocal offers convert extremely well.",
      "Monitor Nextdoor for posts where people mention moving, cleaning out a garage, or dealing with a deceased relative's belongings. These are warm leads — reach out directly and offer to help.",
    ],
    readTime: "4 min read",
    ctaLine: "We manage your Nextdoor presence and social media content so you stay visible in every neighborhood you serve.",
  },
  {
    id: 12,
    icon: Search,
    category: "Google Ads",
    tag: "Lead Gen",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Google Local Services Ads: The Fastest Way to Get Junk Removal Calls",
    summary:
      "Google Local Services Ads (LSA) show up above everything else in search results — above regular ads, above maps, above organic results. And you only pay when someone actually calls you.",
    tips: [
      "Apply for Google Guaranteed status through the LSA program. It requires a background check and license verification, but the Google Guaranteed badge dramatically increases call rates.",
      "Set your budget based on how many calls you can handle per week. Start with 5 to 10 calls per week and scale up as you hire.",
      "Keep your response time under 1 hour. Google tracks how quickly you respond to leads and rewards fast responders with more impressions.",
      "Dispute invalid leads directly in the LSA dashboard. If someone called about something you do not offer, you can get a credit. Most businesses never do this and waste money.",
      "Combine LSA with regular Google Ads for maximum coverage — LSA for calls, standard ads for form fills and quote requests.",
    ],
    readTime: "5 min read",
    ctaLine: "We set up and manage your Google Local Services Ads — so you only pay for real calls from real customers ready to book.",
  },
  {
    id: 13,
    icon: TrendingUp,
    category: "Growth",
    tag: "Scale Up",
    tagColor: "bg-teal-100 text-teal-700",
    title: "How to Get Jobs from Property Management Companies",
    summary:
      "Property managers deal with tenant move-outs, evictions, and unit turnovers constantly — and they always need a reliable junk removal company on call. Landing one property management company can mean 10 to 20 recurring jobs per year.",
    tips: [
      "Search for property management companies in your area on Google, Yelp, and LinkedIn. Build a list of 20 targets to contact over the next 30 days.",
      "Call the office manager directly and ask who handles vendor relationships. Skip the front desk when possible — you want the decision maker.",
      "Offer a flat-rate pricing sheet specifically for tenant move-out cleanouts. Property managers love predictability — they will choose you over a competitor who quotes every job individually.",
      "Be available on short notice. Property managers often need a unit cleared quickly between tenants. Being the company that says 'yes, we can be there tomorrow' wins the relationship.",
      "Ask for a preferred vendor agreement in writing. Even an informal email confirmation that you are their go-to hauler protects the relationship and gives you recurring work.",
    ],
    readTime: "5 min read",
    ctaLine: "We reach out to property managers and build recurring commercial relationships in your market — so you have steady work beyond one-off residential jobs.",
  },
  {
    id: 14,
    icon: Globe,
    category: "Website",
    tag: "Conversions",
    tagColor: "bg-indigo-100 text-indigo-700",
    title: "The Landing Page Formula That Books Junk Removal Jobs",
    summary:
      "A landing page is different from your homepage. It is a single-focus page built to convert one type of visitor into one action — booking a job. Here is the exact formula that works for junk removal.",
    tips: [
      "Lead with the outcome, not the service. Instead of 'Junk Removal Services,' say 'Get Your Space Back in 24 Hours.' Customers buy results, not services.",
      "Add a prominent phone number and a one-field quote form above the fold. The fewer steps to contact you, the higher your conversion rate.",
      "Include a trust block with your Google rating, number of reviews, years in business, and a Google Guaranteed badge if you have one. Place it directly below your headline.",
      "Add 3 to 5 before-and-after photos specific to the service the page is about (garage cleanout, estate cleanout, appliance removal, etc.). Specificity converts better than generic.",
      "End the page with a strong guarantee — 'Same-day service or your next job is free' or 'Upfront pricing, no surprise fees.' Removing risk is the final objection to overcome.",
    ],
    readTime: "4 min read",
    ctaLine: "We build dedicated landing pages for every service and city you cover — each one engineered to turn visitors into booked jobs.",
  },
  {
    id: 15,
    icon: Star,
    category: "Reputation",
    tag: "Trust Builder",
    tagColor: "bg-blue-100 text-blue-700",
    title: "How to Use Your Truck as a Lead Generation Machine",
    summary:
      "Your truck drives through neighborhoods all day. It is a rolling billboard — but most junk removal trucks are either blank or have outdated contact info. Here is how to turn yours into a lead source.",
    tips: [
      "Put your phone number in the largest possible font on both sides and the back of your truck. It should be readable from 100 feet away while driving.",
      "Add a QR code that links directly to your booking page or Google Business Profile. Curious neighbors can scan it while you are parked on a job.",
      "Include your Google star rating on the truck if it is 4.5 or above. '4.8 Stars on Google' is a powerful trust signal right on the street.",
      "Park your truck visibly during jobs — not hidden in a driveway. The street-facing side of your truck is free advertising to every neighbor who drives or walks by.",
      "Keep your truck clean. A dirty, beat-up truck signals a low-quality operation. A clean, well-branded truck signals professionalism and commands higher prices.",
    ],
    readTime: "3 min read",
    ctaLine: "We handle your digital marketing so your brand looks as professional online as your truck does on the street.",
  },
  {
    id: 16,
    icon: Search,
    category: "Local SEO",
    tag: "Google Business Profile",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Why Keeping Your Google Business Profile Fresh Is One of the Highest-ROI Things You Can Do",
    summary:
      "Most junk removal owners set up their Google Business Profile once and forget it. That is a mistake. Google actively rewards businesses that treat their profile like a living, breathing marketing channel — and punishes those that go quiet. Here is why freshness matters and exactly how to stay active.",
    tips: [
      "Post to your GBP at least once a week. Google Posts appear directly in search results and Maps listings. A recent post signals to Google — and to potential customers — that your business is active, responsive, and worth ranking. Topics can include completed jobs, seasonal promotions, tips for homeowners, or before-and-after photos.",
      "Upload new photos consistently — aim for at least 4 to 8 per month. Businesses with fresh, high-quality photos get significantly more profile views and direction requests than those with stale or no photos. After every job, snap a quick before-and-after shot. It takes 30 seconds and compounds over time.",
      "Answer every question in the Q&A section. Google allows anyone to ask and answer questions on your profile. If you are not answering them, a stranger might — with wrong information. Seed your own Q&A with the most common questions you get: pricing, service areas, what items you take, same-day availability.",
      "Keep your business hours, service areas, and contact info 100% accurate and up to date. Outdated hours are one of the fastest ways to lose a customer's trust before they ever call you. Update holiday hours, add new service areas as you expand, and make sure your phone number and website link are correct.",
      "Use the 'Services' and 'Products' sections to list every type of junk you remove. Furniture removal, appliance removal, estate cleanouts, garage cleanouts, construction debris — each one is a keyword that can help you show up in more specific searches. The more complete your profile, the more surface area you have in local search.",
      "Respond to every review — positive and negative — within 24 hours. Google tracks your response rate and response time. A business that engages with its reviews signals to Google that it is active and trustworthy. For negative reviews, a calm, professional response often impresses future customers more than the review itself.",
      "Monitor your profile for unauthorized edits. Google allows the public to suggest changes to your listing — including your hours, address, and even business name. Check your GBP dashboard weekly for suggested edits and approve or reject them. Unreviewed changes can go live automatically and send customers to the wrong location or phone number.",
    ],
    readTime: "5 min read",
    ctaLine: "We fully manage your Google Business Profile — weekly posts, photo uploads, Q&A, review responses, and profile optimization — all done for you.",
  },
  {
    id: 17,
    icon: Users,
    category: "Referrals",
    tag: "On-the-Job Marketing",
    tagColor: "bg-orange-100 text-orange-700",
    title: "How to Turn Every Job Site Into a Lead Source by Connecting With Neighbors",
    summary:
      "Every time you pull up to a job, you are surrounded by potential customers. Neighbors are watching. Some are curious. Some have been meaning to clean out their garage for months. Here is how to turn that moment of visibility into booked jobs — without being pushy or awkward.",
    tips: [
      "Door-knock the three houses on each side and the three directly across the street before you start the job. Introduce yourself with something simple: 'Hey, I'm with LeadHauler — we're doing a cleanout next door today. If you've got anything you've been meaning to get rid of, we're already in the neighborhood and can usually fit in a quick pickup.' Most people won't say yes on the spot, but you've planted the seed and put a face to the business.",
      "Leave a door hanger on every house within a two-block radius. The message should be hyper-local: 'We're working in your neighborhood today at [street name]. If you've been putting off a cleanout, now is the perfect time — we're already here.' Proximity and timing create urgency that generic mailers can't replicate.",
      "Park your truck on the most visible street-facing position possible. Do not tuck it in a driveway or alley. The truck is a moving billboard — let it do its job. Make sure your phone number is large and readable from across the street.",
      "Take a before-and-after photo of the job and post it to your Google Business Profile and Facebook the same day, tagging the neighborhood or city. 'Just finished a full garage cleanout in [neighborhood name] — before and after!' This creates a digital breadcrumb that shows up when neighbors search for junk removal in their area.",
      "Carry a small stack of business cards or referral cards with a handwritten note on the back: 'Met you at [street name] — 10% off your first pickup.' Personalization makes a card worth keeping instead of tossing. Neighbors who were not ready to book today will remember you when they are.",
      "If a neighbor stops to watch or asks what you are hauling, treat it as a warm lead. Have a quick, confident answer ready: 'Full garage cleanout — took about two hours. We do estates, foreclosures, construction debris, anything really. Want me to give you a quick quote while I'm here?' You are already on site, already trusted by their neighbor, and already in work mode. The conversion rate on these conversations is extremely high.",
      "Follow up with a postcard to the same street two weeks after the job. The message: 'We recently completed a cleanout on your street. Spring cleaning coming up? We make it easy.' Timing the follow-up to a season or upcoming event (moving season, tax refund season, spring cleaning) dramatically increases response rates.",
    ],
    readTime: "5 min read",
    ctaLine: "We handle your direct mail, neighborhood follow-up campaigns, and local marketing — so every job you run turns into more jobs nearby.",
  },
];

const CATEGORIES = [
  { value: "all",         label: "All Tactics" },
  { value: "Local SEO",   label: "Local SEO" },
  { value: "Google Ads",  label: "Google Ads" },
  { value: "Referrals",   label: "Referrals" },
  { value: "Reputation",  label: "Reputation" },
  { value: "Social Media",label: "Social Media" },
  { value: "Website",     label: "Website" },
  { value: "Growth",      label: "Growth" },
];

export default function Tactics() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTactics = activeCategory === "all"
    ? tactics
    : tactics.filter((t) => t.category === activeCategory);

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
        <div className="container flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/leadhauler-toplogo_1e131e73.png"
              alt="LeadHauler — Marketing for Junk Removal"
              className="h-16 sm:h-[72px] w-auto object-contain"
            />
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
              Free tactics from the LeadHauler team
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

          {/* ── CATEGORY FILTER BAR ── */}
          <div className="mb-8 sm:mb-10">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setActiveCategory(cat.value);
                    setExpandedTip(null);
                  }}
                  className={
                    "px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 " +
                    (activeCategory === cat.value
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground")
                  }
                >
                  {cat.label}
                  {cat.value !== "all" && (
                    <span className={
                      "ml-1.5 text-xs font-bold " +
                      (activeCategory === cat.value ? "text-primary-foreground/70" : "text-muted-foreground/60")
                    }>
                      ({tactics.filter((t) => t.category === cat.value).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {filteredTactics.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No tactics in this category yet.
            </div>
          )}

          <div className="space-y-6 sm:space-y-8">
            {filteredTactics.map((tactic) => {
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
            <Link href="/" className="flex items-center">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/leadhauler-logo_a788182a.png"
                alt="LeadHauler"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
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
            <span>2025 LeadHauler System. All rights reserved.</span>
            <div className="flex items-center gap-3">
              <a href="tel:+12164710116" className="flex items-center gap-1.5 hover:text-primary-foreground/70 transition-colors">
                <Phone className="w-3.5 h-3.5" /> (216) 471-0116
              </a>
              <span>·</span>
              <a href="mailto:hello@leadhauleragency.com" className="flex items-center gap-1.5 hover:text-primary-foreground/70 transition-colors">
                <Mail className="w-3.5 h-3.5" /> hello@leadhauleragency.com
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
