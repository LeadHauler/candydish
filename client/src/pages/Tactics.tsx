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
  DollarSign,
  Camera,
  CalendarDays,
  BadgeCheck,
  Flame,
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
  {
    id: 18,
    icon: Megaphone,
    category: "Social Media",
    tag: "Community Presence",
    tagColor: "bg-rose-100 text-rose-700",
    title: "Which Social Channels Actually Matter for Junk Removal — and Why Local Groups Are Your Secret Weapon",
    summary:
      "You do not need to be on every platform. You need to be on the right ones, consistently. And the single highest-ROI social move for a local junk removal business is not posting on your own page — it is showing up in the local groups where your customers already hang out.",
    tips: [
      "Facebook is still the most important platform for local service businesses. Your customers are homeowners, landlords, and property managers — and the vast majority of them are active on Facebook. Prioritize it above every other channel. A consistent presence here will outperform sporadic activity across five platforms.",
      "Join every local Facebook group in your service area — neighborhood groups, buy-nothing groups, local community boards, town forums, and HOA groups. Search '[your city] community', '[your neighborhood] neighbors', '[your town] buy sell trade', and join them all. These groups have thousands of engaged local members who trust each other's recommendations.",
      "Do not spam groups with ads. Instead, participate genuinely. When someone posts asking for a junk removal recommendation, respond immediately with a brief, helpful reply: 'We cover [city] — happy to give you a quick quote. DM me or call (508) 715-6385.' Being the first to respond to these posts is worth more than any paid ad.",
      "Post 'job completed nearby' updates in local groups after finishing a job in that area. Keep it natural: 'Just wrapped up a full garage cleanout on [street or neighborhood] — before and after below. If anyone in the area has been putting off a cleanout, we're already in the neighborhood this week.' These posts get organic reach, comments, and saves from people who are not ready yet but will remember you.",
      "Nextdoor is the second most important platform for local service businesses. Homeowners actively ask for contractor and service recommendations on Nextdoor. Claim your free Business Page, keep your profile complete with photos and a clear description of your service area, and respond to every mention or recommendation request within the hour.",
      "Instagram is worth maintaining if you can commit to posting before-and-after photos consistently — at minimum three times per week. Use local hashtags (#[yourcity]junkremoval, #[yourcity]cleanout) and geotag every post. Instagram's visual format makes before-and-after content extremely shareable and helps you get discovered by people searching locally.",
      "YouTube and TikTok are optional but powerful if you are willing to film short job videos. A 60-second 'garage cleanout timelapse' or 'what we hauled today' video can accumulate thousands of local views over time and drives inbound calls with zero ongoing ad spend. Even one video per week compounds significantly over a year.",
      "The single most important rule: pick two or three channels and be consistent on them, rather than being inconsistent on all of them. A business that posts on Facebook and Nextdoor three times per week will always outperform one that posts everywhere once a month. Consistency signals to both algorithms and potential customers that you are active, reliable, and worth hiring.",
    ],
    readTime: "6 min read",
    ctaLine: "We manage your social media presence across Facebook, Nextdoor, and Instagram — posting, engaging in local groups, and responding to leads so you never miss an opportunity.",
  },
  {
    id: 19,
    icon: TrendingUp,
    category: "Growth",
    tag: "Pipeline Mindset",
    tagColor: "bg-teal-100 text-teal-700",
    title: "Why You Should Never Stop Marketing — Even When You're Fully Booked",
    summary:
      "Most junk removal owners only market when they need jobs. That is exactly backwards. The businesses that grow consistently are the ones that market constantly — even when the schedule is full. Here is why always-on marketing is the single most important habit you can build, and what happens to businesses that stop.",
    tips: [
      "Marketing has a lag. The leads you generate today will not all convert this week. Some will call in two weeks. Some in two months. Some will save your number and call six months from now when they finally clean out the garage. If you stop marketing the moment you get busy, you are cutting off the pipeline that fills your schedule three months from now. Busy seasons end. The businesses that stay booked year-round are the ones that never stopped feeding the top of the funnel.",
      "The feast-or-famine cycle is caused by inconsistent marketing, not bad luck. The pattern is predictable: you get slow, you panic and start marketing, leads come in, you get busy, you stop marketing to focus on jobs, you get slow again. Breaking this cycle requires treating marketing as a fixed operating cost — like fuel and insurance — not a variable you turn on and off based on how full your calendar looks today.",
      "Your competitors are marketing right now. Every day you are not visible in Google search, in local Facebook groups, on Nextdoor, and in your Google Business Profile is a day a competitor is capturing the customers who would have called you. Visibility is cumulative. A business that has been consistently active for 12 months will always outrank and out-convert one that has been on and off. The gap compounds over time.",
      "Brand recall takes repeated exposure. Research consistently shows that most buyers need to encounter a brand 5 to 7 times before they take action. A homeowner who sees your truck in the neighborhood, then sees a Facebook post, then sees a Google review, then gets a door hanger is far more likely to call you than one who saw a single ad. Consistent marketing builds the layer of familiarity that makes you the obvious choice when the need arises.",
      "Reviews and referrals require a steady flow of new customers. If you stop marketing and your job volume drops, you get fewer reviews, fewer referrals, and less word-of-mouth. Your Google ranking starts to slip. Your profile goes quiet. The compounding effect works in reverse just as powerfully as it works forward. Maintaining a baseline of new customer acquisition keeps the entire flywheel spinning.",
      "Set a non-negotiable monthly marketing budget and treat it as overhead. Even in your busiest months, keep your Google Ads running at minimum spend, keep posting to your Google Business Profile and social media, and keep following up with past customers. The goal is not to generate more jobs than you can handle — it is to ensure you always have a full pipeline waiting when capacity opens up.",
      "Track your pipeline, not just your bookings. A booked calendar feels like success, but it tells you nothing about next month. The metric that actually predicts your future revenue is the number of leads currently in your pipeline — people who have inquired, gotten a quote, or shown interest but have not yet booked. If that number is shrinking, you have a problem that will show up in your revenue 30 to 60 days from now. Always-on marketing keeps that number healthy.",
    ],
    readTime: "6 min read",
    ctaLine: "LeadHauler runs your marketing continuously — ads, SEO, social, and follow-up — so your pipeline stays full whether you are slammed with jobs or looking to grow.",
  },
  {
    id: 20,
    icon: DollarSign,
    category: "Growth",
    tag: "Pricing Strategy",
    tagColor: "bg-emerald-100 text-emerald-700",
    title: "How to Stop Competing on Price — and Start Winning on Value",
    summary:
      "Price shoppers are not your ideal customers. They are the ones who haggle, leave bad reviews when they feel they overpaid, and refer other price shoppers. The junk removal businesses that grow profitably are the ones that learn to anchor value, present quotes with confidence, and attract customers who care about reliability — not just the lowest number.",
    tips: [
      "Understand why price shopping happens. When customers call three companies and ask \"how much?\", it is usually because all three sound identical. If your phone greeting, your website, and your quote process are indistinguishable from every other hauler in town, price becomes the only differentiator. The fix is not to lower your price — it is to differentiate everything else so price becomes secondary.",
      "Lead with your guarantee, not your price. Before you quote a number, tell the customer what they are getting: same-day availability, a two-person crew, full cleanup of the area after the job, and a satisfaction guarantee. Most competitors quote a number and stop. You quote a number and explain exactly what that number buys. That reframes the conversation from \"how cheap\" to \"how good.\"",
      "Use price anchoring. When presenting options, always give three tiers: a minimum load, a half-load, and a full load. The middle option becomes the anchor — it feels reasonable compared to the full load and more capable than the minimum. Research consistently shows that customers presented with three options choose the middle tier far more often than customers presented with a single price. This technique alone increases average ticket size.",
      "Never apologize for your price. Hesitation and hedging — \"I know it might seem like a lot\" or \"we can probably work something out\" — signal that your price is negotiable and that you do not believe it is fair. Quote with confidence. A flat, matter-of-fact tone communicates that your price is what it is because that is what the job is worth. Customers read confidence as competence.",
      "Compete on speed and certainty, not price. The two things most homeowners actually want when they call a junk hauler are: someone who shows up when they say they will, and someone who will not leave a mess. If you can guarantee a two-hour arrival window and a clean sweep of the area after the job, you can charge 20 to 30 percent more than a competitor who is vague about timing and cleanup. Reliability is worth a premium to most customers.",
      "Stop quoting over the phone when possible. Phone quotes invite price comparison. Whenever you can, offer a free on-site estimate. Once you are standing in front of the customer, the job becomes real, you become a person rather than a voice, and the probability of booking increases dramatically. On-site estimates also reduce disputes about job scope and protect your margins.",
      "Track your close rate, not just your call volume. If you are getting 20 calls a week and booking 8 jobs, your close rate is 40 percent. A price-focused business tries to get more calls. A value-focused business works to get that close rate to 60 or 70 percent from the same call volume — which is far more profitable. Improving your quote process, your follow-up, and your value presentation is the highest-leverage activity in your business.",
    ],
    readTime: "6 min read",
    ctaLine: "LeadHauler builds your brand so customers choose you before they even ask for a price — through reviews, local SEO, and a website that communicates professionalism and trust.",
  },
  {
    id: 21,
    icon: Mail,
    category: "Growth",
    tag: "Email & SMS",
    tagColor: "bg-violet-100 text-violet-700",
    title: "The Highest-ROI Channel Most Junk Haulers Ignore: Email and SMS Follow-Up",
    summary:
      "Most junk removal businesses spend all their marketing budget chasing new customers and nothing re-engaging the ones they already have. That is a costly mistake. A customer who has already hired you once is five times more likely to hire you again than a cold prospect — and they cost nothing to reach if you have their phone number or email address.",
    tips: [
      "Build your list from day one. Every job you complete is an opportunity to add a customer to your follow-up list. Collect a phone number and email address at booking and store them in a simple CRM or even a spreadsheet. Most junk haulers have hundreds of past customers they have never followed up with. That list is one of the most valuable assets in your business and most owners do not even know they have it.",
      "The 30-day re-engagement sequence. Send a single text or email 30 days after a completed job: \"Hey [Name], it is [Your Name] from [Company]. Hope the cleanout went smoothly! If you have more to haul — or know someone who does — we are running a $25 referral credit this month. Just reply to this message.\". This one message, sent consistently to every past customer, generates a measurable lift in repeat bookings and referrals every single month.",
      "Unconverted leads are your most overlooked asset. Every customer who called for a quote but did not book is a warm lead. They already know your name, they already have a junk problem, and they were close enough to book that they picked up the phone. A simple follow-up text two to three days after the quote — \"Hi [Name], just checking in on your cleanout project — still available this week if you need us\" — converts a meaningful percentage of these leads at zero additional ad spend.",
      "Seasonal reactivation campaigns are high-ROI. Send a broadcast message to your entire past-customer list at the start of spring and fall: \"Spring cleanout season is here — we are booking fast. Reply BOOK to get on the schedule this week.\". These campaigns require about 20 minutes to set up and consistently produce bookings from customers who had simply forgotten about you. The cost per booking from a reactivation campaign is a fraction of the cost from paid ads.",
      "Keep messages short, personal, and action-oriented. The best follow-up texts read like they came from a person, not a marketing department. Use the customer's first name. Reference the job if you can. Give them one clear action to take. Long messages, formal language, and multiple calls to action all reduce response rates. A two-sentence text with a clear ask outperforms a paragraph every time.",
      "Use SMS for speed, email for depth. Text messages have a 98 percent open rate and are typically read within three minutes. Use SMS for time-sensitive follow-ups, booking confirmations, and reactivation campaigns. Use email for longer content — seasonal tips, referral program announcements, or a monthly newsletter with a discount code. Both channels work; the key is matching the medium to the message.",
      "Automate what you can, but keep it human. Tools like Jobber, Housecall Pro, and even basic SMS platforms like SimpleTexting allow you to automate follow-up sequences so they go out without you thinking about them. Set up a 30-day post-job text, a 90-day re-engagement email, and a seasonal broadcast — then let them run. The goal is to stay top of mind with every past customer without adding hours to your week.",
    ],
    readTime: "7 min read",
    ctaLine: "LeadHauler builds and manages your follow-up sequences — so every past customer and unconverted lead gets the right message at the right time, automatically.",
  },
  {
    id: 22,
    icon: Camera,
    badge: "Quick Win",
    badgeColor: "bg-green-100 text-green-700",
    category: "Growth",
    title: "The Photo Quote Trick That Closes More Jobs Before You Even Answer the Phone",
    summary:
      "When customers can text a photo of their junk and get a price back in minutes, your close rate jumps — because you've removed the biggest friction point in the buying process.",
    tips: [
      "Most junk removal jobs are lost in the gap between 'I need this gone' and 'I got a price.' The longer that gap, the more likely the customer calls someone else, forgets, or talks themselves out of it. The photo-quote process collapses that gap to minutes — and minutes win jobs.",
      "Set up a dedicated text number for photo quotes. Promote it everywhere: your Google Business Profile, website, Facebook page, and any ad you run. The call to action is simple: 'Text a photo of your junk to [number] and get a price in 10 minutes.' That specificity — 10 minutes — sets an expectation and makes you stand out from competitors who say 'we'll call you back.'",
      "When the photo comes in, respond fast. Speed is the conversion lever here. A quote returned in under 10 minutes signals professionalism and urgency. A quote returned the next day signals the opposite. If you can't monitor the number yourself during business hours, assign someone or use an answering service trained on your pricing.",
      "Keep your quote format simple and confident. Don't send a paragraph of caveats. Send a price range and a booking link: 'Based on your photo, we can haul that for $175–$225. Want to lock in a time? [link].' A clean, confident quote converts far better than a hedged one. Customers want certainty — give it to them.",
      "Use photos to upsell at the door. When you arrive and the job is larger than the photo showed, you already have the customer's trust because you quoted quickly and showed up on time. A calm, professional explanation — 'The photo showed the couch but not the boxes behind it, so we're looking at $X more' — lands much better than a surprise at the end of the job.",
      "Track your photo-quote close rate separately from your other lead sources. Most operators who implement this see a 20–40% higher close rate on photo quotes versus phone estimates — because the customer has already self-qualified, shared their situation, and received a number. They're warmer. Knowing this number helps you justify promoting the channel more aggressively.",
      "Automate the follow-up. If a customer texts a photo but doesn't book, send a follow-up text 2 hours later: 'Hey, just checking — did you want to lock in a time for that pickup? We have openings tomorrow.' Then another the next morning. Two follow-ups on a warm photo-quote lead will recover 15–25% of jobs that would otherwise go cold. Most operators never follow up at all — this alone is a significant competitive edge.",
      "Promote the photo-quote option in your Google Ads and Facebook ads as the primary call to action. 'Text a photo, get a price in 10 minutes' is a more compelling ad hook than 'Call us for a free quote' — because it's faster, lower friction, and more specific. Test it against your current CTA and watch your cost per lead drop.",
    ],
    readTime: "6 min read",
    ctaLine: "LeadHauler sets up and promotes your photo-quote system across every channel — so you're capturing leads and closing jobs faster than any competitor in your market.",
  },
  {
    id: 23,
    icon: CalendarDays,
    badge: "Strategy",
    badgeColor: "bg-blue-100 text-blue-700",
    category: "Growth",
    title: "How to Use Seasonal Demand Spikes to Fill Your Schedule Weeks in Advance",
    summary:
      "Spring cleanouts, estate hauls, and post-holiday purges are predictable demand windows. Junk removal owners who market into them early fill their calendars before competitors even start their campaigns.",
    tips: [
      "Junk removal has a seasonal rhythm, and most operators ignore it entirely. They run the same ads year-round, post the same content, and wonder why some months are slow. The owners who understand the calendar — and market ahead of it — consistently outbook their competitors because they're in front of customers before the urge to clean strikes, not after.",
      "Spring is your biggest window. March through May is when homeowners tackle garages, basements, and attics after months of winter. Start your spring push in late February — before the season begins. Run Google Ads targeting 'spring cleanout junk removal,' post before-and-after content on Facebook and Nextdoor, and send an email or text blast to past customers with a spring discount or priority booking offer. The operators who start early capture the early bookers and the referrals that flow from them.",
      "Estate cleanouts spike in spring and fall. When a family member passes or downsizes, the estate often needs a full cleanout on a tight timeline. These jobs are large, high-margin, and often come with referrals to neighbors and friends. Target estate attorneys, senior living facilities, and real estate agents in your area — introduce yourself, leave cards, and ask to be their go-to referral for cleanouts. A few strong referral relationships in this channel can add tens of thousands of dollars a year.",
      "Post-holiday hauls run from late December through January. After Christmas, people are surrounded by boxes, old furniture being replaced by new gifts, and a general desire to declutter. Run a 'New Year, New Space' campaign starting December 26. A simple Facebook post or Google ad with that hook — timed to when people are already in a purging mindset — can generate a strong January pipeline at a time when many competitors go quiet.",
      "Back-to-school season (July–August) drives apartment and dorm moves. College towns and suburban areas see a surge in furniture disposal as students move in and out. If you're in or near a college town, this is a reliable annual spike. Run ads targeting moving-related keywords, partner with local moving companies for referrals, and promote your same-day or next-day availability — move-out timelines are tight and speed wins the job.",
      "Fall is the second cleanout season. September and October bring another round of garage and basement cleanouts as people prepare for winter. It's also when homeowners finishing summer renovation projects need debris hauled. Run a 'Fall Cleanout Special' campaign in late August and keep it running through October. Pair it with a referral incentive — 'Refer a neighbor and both of you save $25' — to amplify reach during a naturally active period.",
      "Build a seasonal content calendar at the start of each year. Map the six demand windows — spring cleanout, estate season, post-holiday, back-to-school, fall cleanout, and holiday prep — and plan your ads, emails, and social posts around them. A simple spreadsheet with campaign start dates, ad copy, and budget allocations is enough. The goal is to never be caught flat-footed by a demand spike you knew was coming.",
      "Use seasonal campaigns to build your review base. After each busy season, send a follow-up text to every customer from that period asking for a Google review. Busy seasons generate volume; volume generates reviews; reviews generate the next busy season. Operators who close this loop consistently outrank competitors on Google Maps within 12–18 months, regardless of how long those competitors have been in the market.",
    ],
    readTime: "6 min read",
    ctaLine: "LeadHauler plans and executes your seasonal campaigns for you — so every demand window is captured with the right ads, content, and follow-up running at exactly the right time.",
  },
  {
    id: 24,
    icon: BadgeCheck,
    badge: "High ROI",
    badgeColor: "bg-green-100 text-green-700",
    category: "Google Ads",
    title: "How Google Local Service Ads Can Become Your Cheapest Source of Booked Jobs",
    summary:
      "Google Local Service Ads (LSAs) put your business above everything else on the search results page — above regular Google Ads, above the map pack. And you only pay when a customer actually calls or messages you. For junk removal, this is one of the highest-ROI ad formats available.",
    tips: [
      "Most junk removal owners have heard of Google Ads but have never heard of Local Service Ads — and that's a competitive advantage waiting to be taken. LSAs are a separate product from regular Google Ads. They appear at the very top of Google search results, above the map pack and above standard pay-per-click ads, with a green 'Google Screened' or 'Google Guaranteed' badge next to your name. That badge alone dramatically increases click-through rates because it signals trust before a customer even reads your listing.",
      "The biggest difference between LSAs and regular Google Ads is how you pay. With standard Google Ads, you pay every time someone clicks your ad — whether they call you, bounce immediately, or never intended to hire anyone. With LSAs, you only pay when a customer contacts you directly through the ad (a call or a message). This pay-per-lead model means your budget goes toward actual potential customers, not wasted clicks. For junk removal, where average job values run $200–$600+, even a $30–$60 cost-per-lead is extremely profitable.",
      "To run LSAs, you need to pass Google's verification process. This includes a background check on the business owner, proof of a valid business license, and proof of general liability insurance. The process takes 1–2 weeks but is worth every minute. Once verified, you receive the 'Google Guaranteed' badge — Google will refund customers up to $2,000 if they're unsatisfied with your service. This guarantee is displayed on your ad and is one of the strongest trust signals in local advertising.",
      "Setting up your LSA profile correctly is critical. Use a professional photo of your truck or team (not a stock image), write a clear business description that mentions your service area and what you haul, and select every relevant job type — furniture removal, appliance removal, yard waste, estate cleanouts, construction debris, and more. The more job types you select, the more searches your ad is eligible to appear for. Many operators leave job types unchecked and wonder why their ad volume is low.",
      "Bid strategy matters. LSAs use a bidding system where you set a weekly budget and Google distributes your leads within that budget. Start with a modest weekly budget ($150–$300) to gather data on your cost-per-lead, then scale up once you know your numbers. Google also offers an automated bidding option that optimizes for lead volume — this works well once your profile has enough history (typically 20+ leads). In the early weeks, monitor your leads closely and dispute any that are clearly wrong numbers, spam, or outside your service area — Google will credit you for invalid leads.",
      "Respond to every LSA lead within minutes. Google tracks your response rate and response time, and these metrics directly affect how often your ad is shown. Operators with fast response rates get more ad impressions for the same budget. Set up the Google Local Services app on your phone so you get instant notifications for new leads. If you miss a call, call back within 5 minutes — speed is the single biggest factor in converting LSA leads into booked jobs.",
      "Use LSAs alongside — not instead of — regular Google Ads. LSAs cover high-intent searches like 'junk removal near me' and 'haul away old furniture,' but they don't cover every keyword. Regular Google Ads let you target a broader set of searches, run retargeting campaigns, and control your messaging more precisely. The strongest Google strategy for junk removal combines LSAs for top-of-page trust placement with standard search ads for broader keyword coverage. Together, they dominate the entire top section of Google search results.",
      "Track your LSA performance weekly. Log into your LSA dashboard and review your cost-per-lead, lead volume, and booking rate. If your cost-per-lead is rising, check whether competitors have entered your market or whether your response rate has dropped. If lead volume is low, consider expanding your service area radius or adding more job types. LSAs reward active management — operators who check in weekly and make small adjustments consistently outperform those who set it and forget it.",
    ],
    readTime: "7 min read",
    ctaLine: "LeadHauler sets up and manages your Google Local Service Ads — including verification, profile optimization, and weekly bid management — so you get the cheapest possible cost-per-lead from the most trusted ad placement on Google.",
  },
  {
    id: 25,
    icon: Flame,
    badge: "Low Cost",
    badgeColor: "bg-orange-100 text-orange-700",
    category: "Guerrilla Marketing",
    title: "The Zero-Budget Visibility Playbook: How to Get Your Truck Seen by Thousands Without Spending a Dollar on Ads",
    summary:
      "The most effective junk removal marketing doesn't always come from Google or Facebook. Sometimes it comes from a door hanger, a chalk arrow, a truck parked in the right spot, or a $20 yard sign. Guerrilla marketing is about using creativity, timing, and local presence to generate leads that digital ads can't reach.",
    tips: [
      "Your truck is a moving billboard — treat it like one. A clean, fully wrapped truck with your phone number in large readable text parked in a busy neighborhood generates calls. But most operators park at home or at a storage unit. Instead, park your truck on a high-traffic street near a shopping center, hardware store, or neighborhood entrance during your lunch break or after a job. You're not paying for that impression. A well-placed truck in a neighborhood for 30 minutes can generate more local awareness than a week of Facebook posts.",
      "Door hangers in the neighborhoods where you just completed a job are one of the highest-converting low-cost tactics in junk removal. After every job, walk 20–30 houses in each direction and leave a door hanger that says something like: 'We just hauled junk from your neighbor's house at [street name]. If you've been putting off a cleanout, here's $25 off your first load — call us today.' Neighbors who see your truck and then find a hanger are already warm. Conversion rates on these are dramatically higher than cold outreach.",
      "Yard signs work — but placement is everything. A $3 corrugated yard sign with your number placed at a busy intersection or near a dumpster rental site can generate 5–10 calls per week in a mid-size market. Ask permission from local businesses to place signs in their parking lots. Offer a small referral fee or free service in exchange. Rotate signs every few weeks to keep them visible and prevent them from being ignored. The key is volume and placement — 20 signs in the right spots outperform 200 signs in random locations.",
      "Chalk marketing sounds gimmicky until you try it. After completing a job in a neighborhood, use sidewalk chalk to write your business name, phone number, and a simple message — 'Junk Removed Fast. Call [number]' — near the curb where you worked. It washes away in the rain, it's free, and in dense neighborhoods it gets noticed. Pair it with a door hanger drop on the same block for a one-two punch that costs under $5 and takes 10 minutes.",
      "Partner with dumpster rental companies in your area. Dumpster companies and junk removal companies serve the same customers at different stages of the same project. When a homeowner's dumpster is full and they still have junk left, they need you. When a customer calls a junk removal company but has a volume that requires a dumpster, you need them. Reach out to every dumpster rental company in your market, introduce yourself, and propose a mutual referral arrangement. A handshake deal with two or three dumpster companies can add 10–20 jobs per month with zero ad spend.",
      "Leave cards at every thrift store, consignment shop, and donation center in your area. These businesses regularly turn away items they can't accept — furniture that's too worn, electronics, mattresses. When they can't take it, they need to send the customer somewhere. A stack of your cards at the front desk with a note to the staff ('If you can't take it, we'll haul it') positions you as the solution. Visit monthly to refresh your cards and build a relationship with the staff. This channel is almost entirely ignored by competitors.",
      "Show up at estate sales on the last day. Estate sale companies always have leftover items that didn't sell — furniture, appliances, boxes of miscellaneous goods. On the last day of the sale, introduce yourself to the estate sale organizer and offer to haul whatever's left at a discounted rate. You get a paid job, they get a clean house, and the family avoids the stress of disposal. Many estate sale companies will add you to their regular rotation if you show up reliably and do good work. This is a recurring, low-competition channel most junk haulers never tap.",
      "Create a 'neighborhood cleanout event' once a quarter. Partner with a neighborhood association, HOA, or community Facebook group to host a free or discounted cleanout day. Promote it as a community service — 'We're in [neighborhood] on Saturday, April 12. First 5 households get $50 off a full load.' You'll book 5–10 jobs in a single day in a concentrated area, generate photos and video content, collect reviews from multiple customers at once, and build word-of-mouth in a neighborhood that now knows your name. The cost is a small discount. The return is a neighborhood that thinks of you first.",
    ],
    readTime: "7 min read",
    ctaLine: "LeadHauler builds your complete local visibility system — combining digital ads with the offline tactics your competitors are ignoring — so your phone rings from every direction, not just Google.",
  },
  {
    id: 27,
    icon: Zap,
    badge: "Conversion Booster",
    badgeColor: "bg-yellow-100 text-yellow-700",
    category: "Growth",
    title: "Why a Fast Quote Is Your Most Powerful Marketing Tool",
    summary:
      "Speed is not just a customer service virtue — it is a direct revenue driver. The junk removal business that responds to a lead first wins the job up to 78% of the time. Here is why fast quoting is the highest-leverage marketing move you can make, and how to build a system that does it automatically.",
    tips: [
      "The first company to respond wins. Research on lead response time consistently shows that businesses that respond to an inquiry within five minutes are dramatically more likely to convert that lead than those who respond in an hour — and businesses that wait longer than an hour lose the majority of leads entirely. In junk removal, where customers often have a time-sensitive problem (a move, an estate cleanout, a contractor waiting on a cleared space), this effect is even more pronounced. Speed is not a nice-to-have. It is the single biggest variable in your close rate.",
      "A fast quote signals professionalism before the customer even meets you. When a homeowner texts or calls for a quote and gets a clear, confident price back in under 10 minutes, it communicates that you are organized, responsive, and serious about your business. That impression — formed before the truck ever shows up — sets the tone for the entire customer relationship. A slow or vague response communicates the opposite, regardless of how good your actual service is.",
      "Build a quote-response system, not a quote-response habit. Habits break. Systems run. Set up a dedicated text number or web form that routes quote requests directly to whoever is responsible for responding — whether that is you, a dispatcher, or an answering service. Define a maximum response time (10 minutes during business hours is the standard to beat) and hold yourself to it. The operators who consistently win on speed are the ones who have made it a process, not a personal effort.",
      "Use a simple pricing framework that lets you quote from a photo or a brief description. You do not need to see every job in person to give a ballpark. Most junk removal loads fall into predictable categories — single items, partial loads, full loads, estate cleanouts. Build a simple internal pricing guide with ranges for each category and train yourself (and any staff) to use it confidently. A quote range returned in 5 minutes beats a precise quote returned in 2 hours every time.",
      "Follow up every quote that does not book within 2 hours. Most operators quote and wait. The ones who win follow up. A simple text — 'Hey, just checking in on that quote I sent — still have openings this week if you want to lock in a time' — recovers a meaningful percentage of leads that went quiet. Most customers are not ignoring you; they got distracted. A single follow-up puts you back at the top of their mind at the exact moment they are ready to decide.",
      "Promote your response speed as a marketing differentiator. If you can genuinely quote in under 10 minutes, say so everywhere: in your Google Ads headline, on your website, in your Google Business Profile description, and in your social media bio. 'Text a photo and get a price in 10 minutes' is a more compelling call to action than 'Call for a free quote' — because it is specific, it sets an expectation, and it signals that your operation is fast and organized. Speed is a brand attribute. Own it.",
      "The compounding effect of fast quoting on your reviews and referrals. Customers who get a fast, clear quote and a smooth job do not just book again — they tell people. The two things homeowners mention most in junk removal reviews are 'they showed up on time' and 'they were easy to deal with.' Fast quoting is the first impression of that ease. A business that is known in its market for being fast and responsive builds a reputation that generates inbound leads without additional ad spend. Speed is not just a close-rate tactic — it is a long-term brand asset.",
      "LeadHauler includes a Speed-to-Lead tool in all packages. This tool automatically sends a quote response or follow-up message to every inbound lead within minutes — even when you are on a job, driving, or off the clock. You set the pricing parameters once; the system handles the response. It is the single most effective way to ensure you are always the first company a customer hears back from, regardless of when they reach out. In a market where most competitors are still calling back an hour later, this alone is a significant competitive advantage.",
    ],
    readTime: "6 min read",
    ctaLine: "LeadHauler's Speed-to-Lead tool is included in every package — so every inbound lead gets a fast, professional response automatically, even when you're on a job.",
  },
  {
    id: 26,
    icon: Megaphone,
    badge: "Zero Cost",
    badgeColor: "bg-orange-100 text-orange-700",
    category: "Guerrilla Marketing",
    title: "The Free Job for a Yard Sign Trade: How to Turn One Hauling Job Into a Week of Calls",
    summary:
      "One of the oldest tricks in local service marketing is also one of the most underused in junk removal: do a small job for free in a high-traffic area in exchange for placing your yard sign in the customer's yard for 30 days. It costs you an hour of labor. In return, you get a real sign, in a real yard, on a real street — with your name and number in front of hundreds of passing cars and neighbors every single day.",
    tips: [
      "Choose your location strategically — not randomly. The value of this tactic is entirely determined by where the sign ends up. Target neighborhoods with high foot and vehicle traffic: corner lots on busy residential streets, homes near school drop-off routes, properties adjacent to parks, community centers, or neighborhood entrances. A sign in a cul-de-sac with 8 houses is nearly worthless. A sign on a corner lot that 3,000 cars pass daily is a billboard you're getting for free. Before you offer the deal, drive the area and identify 5–10 specific properties where a sign would get maximum exposure.",
      "Make the offer feel like a gift, not a transaction. When you approach a homeowner, lead with the value to them — not the trade. Something like: 'We're doing a free cleanout for one homeowner in this neighborhood this week as part of a local promotion. You'd get [specific item or small load] hauled at no charge. The only thing we ask is that we can put a small yard sign out front for about 30 days.' Most people say yes immediately. You're giving them something for free. The sign is almost an afterthought. Never lead with 'I'll do it free if you let me put a sign up' — that sounds like a sales pitch. Lead with the free job.",
      "Target the right type of small job. The ideal free job is one that takes 30–60 minutes, requires minimal dumping fees, and is highly visible to neighbors while you're working. A single couch, a pile of boxes, a small furniture set, or a few bags of yard debris are perfect. You want neighbors to see your truck, your crew in uniform, and the job getting done cleanly and professionally. The work itself is a live demonstration of your service. If a neighbor walks by while you're loading up, hand them a card and say 'We just helped your neighbor out — we're in the area today if you've got anything you need gone.'",
      "Use the yard sign as a 30-day lead generator, not a one-time placement. A standard corrugated yard sign with your logo, phone number, and a short message ('Junk Removal — Fast & Affordable — [Phone Number]') costs $3–5 each when ordered in bulk. Design it for readability at 30 mph: large phone number, minimal text, high contrast colors. After the 30 days, go back and collect the sign — or offer to leave it longer. When you pick it up, knock on the door, thank the homeowner, and ask if they have any friends or neighbors who might need a haul. You've now turned a free job into a 30-day ad campaign and a warm referral conversation.",
      "Document the job for social media content. Every free job you do in a visible neighborhood is also a content opportunity. Take before-and-after photos, a short video of the load going in the truck, and a photo of the yard sign in place. Post it to your Facebook and Instagram with the neighborhood name tagged: 'We just helped a homeowner in [Neighborhood Name] clear out their [item] — completely free as part of our local community promotion. If you're in [City] and need a haul, give us a call.' This post will be seen by people who actually live in that neighborhood, know the street, and can picture their own junk going the same way.",
      "Scale it systematically — one free job per week, rotating neighborhoods. If you do one free job per week in a different high-traffic neighborhood, you'll have 52 yard signs placed across your market over the course of a year. Even if only 10% of those signs generate one call each, that's 5 inbound leads from a tactic that cost you nothing but time. In practice, a well-placed sign in a busy neighborhood generates far more than one call over 30 days. Track which neighborhoods produce the most calls and double down on those areas with door hangers, follow-up visits, and additional sign placements.",
      "Combine the yard sign with a door hanger drop on the same block. After completing the free job and placing the sign, walk the 20 houses on either side of the property and leave a door hanger that says: 'We just hauled junk from your neighbor at [street]. If you've been putting off a cleanout, here's $25 off your first load — call us today.' The combination of a visible sign, a truck they may have seen, and a door hanger in their hand creates a three-touch impression in a single afternoon. This is how local service businesses build neighborhood-level dominance without spending a dollar on digital ads.",
      "Negotiate a Google review as part of the deal. When you complete the free job and the homeowner is happy — and they will be, because you just did something for free — ask for a Google review on the spot. Pull up your Google Business Profile on your phone, hand it to them, and say: 'It would mean a lot to us if you left us a quick review while I finish loading up.' A happy customer who just got a free service is the most motivated reviewer you'll ever have. You've now turned one free job into a yard sign, a social post, a door hanger campaign, and a 5-star Google review — all in under two hours.",
    ],
    readTime: "6 min read",
    ctaLine: "LeadHauler helps you build a complete local marketing system — from yard signs and door hangers to Google Ads and LSAs — so your phone rings from every direction, not just one channel.",
  },
  {
    id: 28,
    icon: Globe,
    category: "Growth",
    tag: "Must-Have",
    tagColor: "bg-blue-100 text-blue-700",
    title: "The 8 Marketing Channels Every Junk Hauler Should Be Using",
    summary:
      "Most junk removal operators run their entire business off one or two lead sources — usually Google Ads or word of mouth. That works until it doesn't. When your one channel dries up, gets more expensive, or gets flooded by competitors, your phone stops ringing. The operators who dominate their markets aren't better at one channel. They're present on all eight. Here is exactly what those channels are and how to activate each one.",
    tips: [
      "Channel 1: Google Business Profile (Local Map Pack). This is the single highest-converting lead source in local service businesses — and it's free. When someone types 'junk removal near me,' the three businesses in the map pack get the majority of clicks. Getting there requires consistent photo uploads, weekly posts, active Q&A management, and a steady stream of Google reviews. Most operators claim their profile and forget it. The ones who actively manage it — even 20 minutes a week — consistently rank in the top 3 and generate 10–30 inbound calls per month without spending a dollar on ads. This is your foundation. Everything else amplifies it.",
      "Channel 2: Google Search Ads (PPC). Paid search puts your business at the top of Google the moment someone searches for junk removal in your city. Unlike SEO, it works immediately — you can be generating calls within 24 hours of launching a campaign. The key is targeting high-intent keywords ('junk removal [city],' 'furniture pickup near me,' 'same day junk hauling') and sending traffic to a landing page built to convert — not your homepage. A well-managed Google Ads campaign with a $1,500–$4,000 monthly ad budget should generate 30–80 qualified leads per month depending on your market. The mistake most operators make is running ads to a weak page or letting Google's auto-suggestions waste their budget on irrelevant searches.",
      "Channel 3: Google Local Service Ads (LSAs). LSAs are the 'Google Guaranteed' listings that appear above regular search ads. You pay per lead — not per click — and Google pre-screens your business with a background check and license verification. The trust badge alone increases conversion rates significantly. LSAs are particularly powerful for junk removal because the category is well-established and the leads are high-intent. Getting set up takes a few days, but once approved, LSA leads often come in at a lower cost-per-lead than standard PPC. Run both simultaneously — they target slightly different segments of the same search page.",
      "Channel 4: Facebook and Instagram Ads. Social ads are not for immediate demand — they're for creating it. The people you reach on Facebook aren't searching for junk removal right now, but they have a garage full of stuff they've been meaning to deal with for six months. A well-targeted ad with a before-and-after photo, a clear offer, and a simple call-to-action ('Text us for a free quote — we haul same day') reaches homeowners in your exact service area who match the demographic profile of your best customers. Facebook ads work best as a retargeting tool — showing ads to people who've already visited your website — and as a brand awareness play in neighborhoods you want to dominate. Budget $300–$800/month to start.",
      "Channel 5: Nextdoor. Nextdoor is the most underused channel in local service marketing. It's a neighborhood-specific social network where homeowners ask each other for recommendations constantly. 'Does anyone know a good junk removal company?' gets posted in local Nextdoor groups every single day. You can advertise directly on Nextdoor as a local business, but the more powerful play is organic: encourage every happy customer in a specific neighborhood to recommend you on Nextdoor by name. A single recommendation from a trusted neighbor carries more weight than any ad. Five recommendations in the same neighborhood and you own that area's word-of-mouth. It's free, it's hyper-local, and almost no junk removal companies are doing it intentionally.",
      "Channel 6: Referral Partnerships. Real estate agents, property managers, estate attorneys, senior living coordinators, and storage facility managers all have clients who need junk removal regularly. One relationship with a busy real estate agent can generate 3–5 jobs per month indefinitely. The key is to make the referral frictionless: give them a stack of your cards, offer a small referral incentive, and follow up after every job they send you. These partnerships take 30–90 days to build but compound over time. A portfolio of 10 active referral partners sending you one job each per month is 120 jobs per year from a channel that costs you nothing in ad spend.",
      "Channel 7: Email and SMS Follow-Up. Most junk removal operators never contact a past customer again after the job is done. This is a massive missed opportunity. A customer who used you once is 5× more likely to use you again than a cold prospect — and they're your best source of referrals. A simple follow-up system — a thank-you text the day after the job, a check-in email 90 days later, and a seasonal promotion before spring and fall cleanout season — keeps your name top of mind and generates repeat business on autopilot. You don't need a sophisticated CRM. A basic email list and a text message tool is enough to start. LeadHauler's Speed-to-Lead tool handles the immediate post-lead follow-up automatically, so every new inquiry gets a response within minutes — before your competitors even see the notification.",
      "Channel 8: Yard Signs and Vehicle Wraps. The oldest channels still work. A branded truck is a rolling billboard — every job site, every neighborhood, every traffic light is an impression. A yard sign placed with permission in a high-traffic yard after a job generates calls for 30 days at a cost of $4. These offline channels build brand recognition in the specific neighborhoods where you work, which makes every other channel more effective. When someone sees your truck on their street on Tuesday and then sees your Google ad on Friday, they don't feel like they're seeing an ad — they feel like they already know you. The combination of offline presence and online targeting is how local service businesses build the kind of market dominance that's nearly impossible for a new competitor to break.",
    ],
    readTime: "7 min read",
    ctaLine: "LeadHauler activates all 8 of these channels for your business — managed, optimized, and running simultaneously — so your phone rings from every direction, not just one.",
  },
];

const CATEGORIES = [
  { value: "all",         label: "All Tactics" },
  { value: "Local SEO",   label: "Local SEO" },
  { value: "Google Ads",  label: "Google Ads" },
  { value: "Referrals",   label: "Referrals" },
  { value: "Reputation",  label: "Reputation" },
  { value: "Social Media", label: "Social Media" },
  { value: "Website",     label: "Website" },
  { value: "Growth",      label: "Growth" },
  { value: "Guerrilla Marketing", label: "Guerrilla Marketing" },
];

export default function Tactics() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // True only on real mobile devices (phones/tablets) — uses userAgent only, never maxTouchPoints
  const isMobileDevice =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/leadhauler_top-removebg-preview_eb70e94b.png"
              alt="LeadHauler — Marketing for Junk Removal"
              className="h-12 md:h-14 lg:h-[72px] w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
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

        {isMobileDevice && mobileNavOpen && (
          <div className="border-t border-border bg-card px-4 py-4 space-y-1">
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
                  Get your first leads in 14 days
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
                          <a href="tel:+15087156385" className="flex-1 sm:flex-none">
                            <Button variant="outline" className="w-full sm:w-auto border-white/30 text-primary-foreground hover:bg-white/10 font-semibold text-sm bg-transparent">
                              <Phone className="w-4 h-4 mr-1.5" />
                              Call (508) 715-6385
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
            <a href="tel:+15087156385">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-primary-foreground hover:bg-white/10 font-semibold px-8 text-base bg-transparent">
                <Phone className="w-5 h-5 mr-2" />
                Call (508) 715-6385
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
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663189932034/JBPbRyHCe55ySNBJ7tAau7/leadhauler_top-removebg-preview_eb70e94b.png"
                alt="LeadHauler"
                className="h-10 w-auto object-contain"
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
              <a href="tel:+15087156385" className="flex items-center gap-1.5 hover:text-primary-foreground/70 transition-colors">
                <Phone className="w-3.5 h-3.5" /> (508) 715-6385
              </a>
              <span>·</span>
              <a href="mailto:hello@leadhauler.com" className="flex items-center gap-1.5 hover:text-primary-foreground/70 transition-colors">
                <Mail className="w-3.5 h-3.5" /> hello@leadhauler.com
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
