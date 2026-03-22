import { getDb } from "./db";
import { campaigns, communityPosts, templates, users } from "../drizzle/schema";
import { sql } from "drizzle-orm";

let campaignsSeeded = false;
let templatesSeeded = false;

export async function seedCampaigns() {
  if (campaignsSeeded) return;
  const db = await getDb();
  if (!db) return;

  const existing = await db.select({ id: campaigns.id }).from(campaigns).limit(1);
  if (existing.length > 0) {
    campaignsSeeded = true;
    return;
  }

  const data = [
    {
      title: "Real Estate Office Drop-Off",
      category: "real_estate" as const,
      difficulty: "easy" as const,
      costMin: 25,
      costMax: 75,
      description:
        "Visit local real estate offices and drop off branded materials. Agents regularly encounter clients who need junk removal after buying or selling homes.",
      steps: JSON.stringify([
        "Print 50–100 flyers and business cards with your contact info and a special agent referral offer (e.g., 10% off for their clients).",
        "Research 10–15 real estate offices within a 15-mile radius using Google Maps.",
        "Visit each office during business hours (9am–4pm, avoid Monday mornings).",
        "Ask to speak with the office manager or a senior agent.",
        "Leave a small branded package: flyers, business cards, and a short handwritten note.",
        "Follow up by phone or email 1 week later to introduce yourself.",
        "Track each office visit in CandyDish with date, contact name, and materials left.",
      ]),
      expectedLeads: "2–5 leads per 10 offices visited",
      timeToResults: "2–4 weeks",
      materials: JSON.stringify(["Flyers (50–100)", "Business cards (50)", "Handwritten note", "Branded folder or envelope"]),
      proTip:
        "Offer a dedicated referral code for each office so you can track which agents are sending you business. A small gift card ($10–$25) for the first referral that converts goes a long way.",
      isBuiltIn: true,
    },
    {
      title: "Contractor Partnership Program",
      category: "contractors" as const,
      difficulty: "medium" as const,
      costMin: 50,
      costMax: 150,
      description:
        "Build ongoing referral relationships with general contractors, remodelers, and renovation companies who constantly generate debris and junk that needs hauling.",
      steps: JSON.stringify([
        "Create a contractor referral one-pager explaining your services, pricing, and the referral incentive.",
        "Search for licensed contractors in your area on Angi, HomeAdvisor, and local permit databases.",
        "Visit active job sites early morning (7–9am) when contractors are on-site.",
        "Introduce yourself and leave materials. Offer to haul their current debris at a discounted rate.",
        "Follow up with a text or email within 3 days.",
        "Set up a simple referral tracking system — give each contractor a unique code.",
        "Send a monthly check-in text with a seasonal promotion.",
      ]),
      expectedLeads: "5–15 leads per month per active contractor",
      timeToResults: "4–8 weeks to build the relationship",
      materials: JSON.stringify(["Contractor one-pager", "Business cards", "Referral code cards", "Branded pen or small gift"]),
      proTip:
        "Contractors value reliability above all else. Show up on time, do great work, and they'll become your most consistent lead source. Consider offering net-30 invoicing for established contractor partners.",
      isBuiltIn: true,
    },
    {
      title: "Door Hanger Campaign",
      category: "door_hangers" as const,
      difficulty: "easy" as const,
      costMin: 100,
      costMax: 300,
      description:
        "Deploy door hangers in targeted neighborhoods — especially near estate sales, foreclosures, or areas with older homes where junk accumulation is common.",
      steps: JSON.stringify([
        "Design a door hanger with a clear offer (e.g., 'Free estimate + 15% off this week only').",
        "Print 500–1,000 door hangers using a local printer or online service.",
        "Identify target neighborhoods: older homes (30+ years), estate sale listings, or areas with recent foreclosures.",
        "Walk the neighborhood and hang on door knobs — avoid mailboxes (federal law).",
        "Track which streets you covered and the date.",
        "Note any immediate callbacks or inquiries.",
        "Repeat in the same neighborhood 4–6 weeks later for a second touch.",
      ]),
      expectedLeads: "1–3 leads per 100 door hangers",
      timeToResults: "1–2 weeks",
      materials: JSON.stringify(["Door hangers (500–1,000)", "Comfortable walking shoes", "Route map", "Tracking sheet"]),
      proTip:
        "Hit the same neighborhood twice — once with a door hanger and once with a postcard mailer 2 weeks later. The repeated exposure dramatically increases response rates.",
      isBuiltIn: true,
    },
    {
      title: "Vehicle Wrap & Parking Strategy",
      category: "vehicle_wraps" as const,
      difficulty: "hard" as const,
      costMin: 1500,
      costMax: 4000,
      description:
        "Turn your truck into a rolling billboard and strategically park it in high-traffic areas to generate passive brand awareness and inbound calls.",
      steps: JSON.stringify([
        "Design a professional vehicle wrap with your company name, phone number, and website prominently displayed.",
        "Get quotes from 3 local wrap shops. Budget $1,500–$4,000 for a full truck wrap.",
        "Identify 5–10 high-traffic parking locations: near home improvement stores, in busy commercial areas, near real estate offices.",
        "Park your wrapped truck in these locations during peak hours (weekends, lunch hours).",
        "Track which locations generate calls by asking callers 'How did you hear about us?'.",
        "Rotate locations monthly to maximize exposure.",
      ]),
      expectedLeads: "3–8 inbound calls per month",
      timeToResults: "Immediate visibility, 1–3 months for consistent leads",
      materials: JSON.stringify(["Vehicle wrap design", "Wrap installation", "Location tracking log"]),
      proTip:
        "Park near Home Depot or Lowe's on Saturday mornings. Homeowners in project mode are your ideal customers. A simple 'Free Estimates' call-out on the wrap increases call volume significantly.",
      isBuiltIn: true,
    },
    {
      title: "Property Manager Outreach",
      category: "real_estate" as const,
      difficulty: "medium" as const,
      costMin: 30,
      costMax: 100,
      description:
        "Property managers handle tenant move-outs, evictions, and property cleanouts regularly — making them one of the highest-value referral sources for junk removal.",
      steps: JSON.stringify([
        "Search for property management companies in your area on Google, Yelp, and local business directories.",
        "Create a targeted one-pager specifically for property managers highlighting your cleanout services.",
        "Call ahead to schedule a 10-minute meeting with the property manager.",
        "Bring a small gift (coffee, donuts) to the first meeting.",
        "Offer a standing discount (10–15%) for all their properties.",
        "Ask to be added to their vendor list.",
        "Follow up quarterly with a check-in and seasonal promotion.",
      ]),
      expectedLeads: "3–10 jobs per month per active property manager",
      timeToResults: "2–6 weeks",
      materials: JSON.stringify(["Property manager one-pager", "Business cards", "Small gift", "Vendor agreement template"]),
      proTip:
        "Offer a 24-hour response guarantee for property managers. They often need cleanouts done quickly between tenants. Being the most responsive vendor is your biggest competitive advantage.",
      isBuiltIn: true,
    },
    {
      title: "Estate Sale Company Partnership",
      category: "community" as const,
      difficulty: "medium" as const,
      costMin: 20,
      costMax: 60,
      description:
        "Estate sale companies deal with leftover items after every sale. Partner with them to handle the post-sale cleanout — a natural fit that creates recurring work.",
      steps: JSON.stringify([
        "Search for estate sale companies in your area on EstateSales.net and local Google searches.",
        "Attend a local estate sale as a customer to understand their process.",
        "Contact the company after the sale and introduce your cleanout services.",
        "Offer to do one free or deeply discounted post-sale cleanout to demonstrate your reliability.",
        "Create a simple referral agreement: they refer clients, you pay a flat fee or percentage.",
        "Ask them to mention your services at every sale.",
      ]),
      expectedLeads: "2–6 jobs per month per active partner",
      timeToResults: "3–6 weeks",
      materials: JSON.stringify(["Introduction letter", "Business cards", "Referral agreement template"]),
      proTip:
        "Estate sale companies often have a backlog of clients who need cleanouts but haven't acted yet. Ask for a list of recent sale addresses and do a targeted door hanger drop in those neighborhoods.",
      isBuiltIn: true,
    },
    {
      title: "Neighborhood Facebook Group Posts",
      category: "digital" as const,
      difficulty: "easy" as const,
      costMin: 0,
      costMax: 20,
      description:
        "Leverage local Facebook neighborhood groups and Nextdoor to share helpful content, answer questions, and organically promote your services.",
      steps: JSON.stringify([
        "Join 10–20 local Facebook neighborhood groups and Nextdoor in your service area.",
        "Spend 1 week just engaging — commenting helpfully, not promoting.",
        "Post a genuine introduction: 'Hey neighbors, I run a local junk removal company...'",
        "Share helpful tips: 'Spring cleaning? Here's what you can and can't donate...'",
        "When someone asks about junk removal, respond quickly and professionally.",
        "Post before/after photos of jobs (with client permission).",
        "Run a monthly 'free item pickup' offer to generate goodwill and visibility.",
      ]),
      expectedLeads: "3–10 leads per month",
      timeToResults: "2–4 weeks",
      materials: JSON.stringify(["Before/after photos", "Helpful content ideas", "Response templates"]),
      proTip:
        "Nextdoor has a 'Local Business' feature that lets you post promotions. It's free and highly targeted. Combine with a seasonal offer for best results.",
      isBuiltIn: true,
    },
    {
      title: "Seasonal Postcard Mailer",
      category: "seasonal" as const,
      difficulty: "medium" as const,
      costMin: 200,
      costMax: 600,
      description:
        "Send targeted postcards during peak junk removal seasons (spring cleaning, post-holiday, moving season) to homeowners in your service area.",
      steps: JSON.stringify([
        "Identify your 2–3 peak seasons (spring: March–May, post-holiday: January, moving: June–August).",
        "Design a postcard with a seasonal offer and clear call-to-action.",
        "Purchase a targeted mailing list from USPS Every Door Direct Mail (EDDM) — no list needed.",
        "Select routes in your target neighborhoods using the EDDM online tool.",
        "Print and mail 500–1,000 postcards per campaign.",
        "Track responses with a unique phone number or promo code.",
        "Follow up with a second mailer 3 weeks later to the same route.",
      ]),
      expectedLeads: "2–5 leads per 500 postcards",
      timeToResults: "1–3 weeks after mailing",
      materials: JSON.stringify(["Postcard design", "EDDM mailing list", "Unique tracking phone number or promo code"]),
      proTip:
        "USPS EDDM is the most cost-effective direct mail option — no list purchase required. Target routes near your best existing customers for the highest response rates.",
      isBuiltIn: true,
    },
    {
      title: "Moving Company Referral Network",
      category: "referral" as const,
      difficulty: "medium" as const,
      costMin: 40,
      costMax: 120,
      description:
        "Partner with local moving companies who frequently encounter clients needing junk removal before or after a move. Create a mutual referral arrangement.",
      steps: JSON.stringify([
        "List all moving companies in your area from Google, Yelp, and local directories.",
        "Call or visit each company and ask to speak with the owner or operations manager.",
        "Propose a mutual referral arrangement: you refer clients who need moving, they refer clients who need junk removal.",
        "Create referral cards for each partner with their name on it.",
        "Check in monthly to see if they've sent any referrals.",
        "Send a thank-you gift for every converted referral.",
      ]),
      expectedLeads: "2–8 leads per month per active partner",
      timeToResults: "3–6 weeks",
      materials: JSON.stringify(["Referral cards", "Thank-you gift budget", "Partner tracking spreadsheet"]),
      proTip:
        "Moving companies are often too busy to think about referrals. Make it easy: give them a stack of your cards and a simple text script they can send to clients who mention junk.",
      isBuiltIn: true,
    },
    {
      title: "Yard Sign Blitz",
      category: "community" as const,
      difficulty: "easy" as const,
      costMin: 150,
      costMax: 400,
      description:
        "Place branded yard signs in high-visibility locations and at job sites to build local brand awareness and generate inbound calls.",
      steps: JSON.stringify([
        "Design and order 20–50 corrugated yard signs with your company name and phone number.",
        "Ask satisfied customers if you can leave a sign in their yard for 1–2 weeks after the job.",
        "Place signs at busy intersections (check local ordinances first).",
        "Place signs near active job sites, estate sales, and foreclosed properties.",
        "Track which sign locations generate calls.",
        "Rotate signs to new locations every 2–3 weeks.",
      ]),
      expectedLeads: "1–4 calls per week",
      timeToResults: "Immediate",
      materials: JSON.stringify(["Yard signs (20–50)", "Sign stakes", "Location tracking log"]),
      proTip:
        "The best yard sign placement is at your own job sites. A sign that says 'Junk Removal in Progress — Call [number]' placed at the curb while you work generates immediate neighborhood interest.",
      isBuiltIn: true,
    },
  ];

  await db.insert(campaigns).values(data);
  campaignsSeeded = true;
}

export async function seedTemplates() {
  if (templatesSeeded) return;
  const db = await getDb();
  if (!db) return;

  const existing = await db.select({ id: templates.id }).from(templates).limit(1);
  if (existing.length > 0) {
    templatesSeeded = true;
    return;
  }

  const data = [
    {
      title: "Classic Junk Removal Flyer",
      type: "flyer" as const,
      description: "A clean, professional flyer for general junk removal services. Perfect for leaving at offices and community boards.",
      fields: JSON.stringify(["businessName", "phone", "email", "website", "tagline", "serviceArea", "offer"]),
      htmlTemplate: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px;background:#fff;border:2px solid #1a1a2e;border-radius:8px;">
  <div style="text-align:center;margin-bottom:24px;">
    <h1 style="font-size:28px;font-weight:800;color:#1a1a2e;margin:0;letter-spacing:-0.5px;">{{businessName}}</h1>
    <p style="font-size:14px;color:#6b7280;margin:4px 0 0;">Junk Removal &amp; Hauling Services</p>
  </div>
  <div style="background:#f59e0b;color:#fff;text-align:center;padding:16px;border-radius:6px;margin-bottom:24px;">
    <p style="font-size:20px;font-weight:700;margin:0;">{{offer}}</p>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
    <div style="background:#f9fafb;padding:16px;border-radius:6px;">
      <p style="font-weight:700;color:#1a1a2e;margin:0 0 8px;">Our Services</p>
      <ul style="margin:0;padding-left:16px;color:#374151;font-size:14px;line-height:1.8;">
        <li>Furniture &amp; Appliances</li>
        <li>Estate Cleanouts</li>
        <li>Construction Debris</li>
        <li>Yard Waste</li>
        <li>Office Cleanouts</li>
      </ul>
    </div>
    <div style="background:#f9fafb;padding:16px;border-radius:6px;">
      <p style="font-weight:700;color:#1a1a2e;margin:0 0 8px;">Why Choose Us</p>
      <ul style="margin:0;padding-left:16px;color:#374151;font-size:14px;line-height:1.8;">
        <li>Same-day service</li>
        <li>Upfront pricing</li>
        <li>Licensed &amp; insured</li>
        <li>Eco-friendly disposal</li>
        <li>Free estimates</li>
      </ul>
    </div>
  </div>
  <div style="text-align:center;border-top:1px solid #e5e7eb;padding-top:20px;">
    <p style="font-size:22px;font-weight:800;color:#1a1a2e;margin:0;">{{phone}}</p>
    <p style="color:#6b7280;font-size:13px;margin:4px 0;">{{email}} &nbsp;|&nbsp; {{website}}</p>
    <p style="color:#6b7280;font-size:13px;margin:4px 0;">Serving {{serviceArea}}</p>
    <p style="font-style:italic;color:#9ca3af;font-size:12px;margin:8px 0 0;">{{tagline}}</p>
  </div>
</div>`,
      isBuiltIn: true,
    },
    {
      title: "Contractor Partner One-Pager",
      type: "flyer" as const,
      description: "A professional one-pager designed specifically for contractors. Highlights your debris hauling capabilities and referral program.",
      fields: JSON.stringify(["businessName", "phone", "email", "website", "referralOffer", "serviceArea", "ownerName"]),
      htmlTemplate: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px;background:#1a1a2e;color:#fff;border-radius:8px;">
  <div style="margin-bottom:28px;">
    <p style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#f59e0b;margin:0 0 8px;">For Contractors &amp; Builders</p>
    <h1 style="font-size:26px;font-weight:800;margin:0;line-height:1.2;">Your Trusted Debris<br/>Hauling Partner</h1>
    <p style="color:#9ca3af;margin:8px 0 0;font-size:14px;">{{businessName}} — {{serviceArea}}</p>
  </div>
  <div style="background:#f59e0b;color:#1a1a2e;padding:16px;border-radius:6px;margin-bottom:24px;">
    <p style="font-weight:800;font-size:16px;margin:0;">Referral Program: {{referralOffer}}</p>
    <p style="font-size:13px;margin:4px 0 0;">For every client you refer who books a job</p>
  </div>
  <div style="margin-bottom:24px;">
    <p style="font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#f59e0b;margin:0 0 12px;">What We Handle</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:14px;color:#d1d5db;">
      <div>✓ Construction debris</div><div>✓ Demo waste</div>
      <div>✓ Drywall &amp; lumber</div><div>✓ Concrete &amp; tile</div>
      <div>✓ Appliances</div><div>✓ Full cleanouts</div>
    </div>
  </div>
  <div style="border-top:1px solid #374151;padding-top:20px;">
    <p style="font-size:20px;font-weight:800;margin:0;">{{phone}}</p>
    <p style="color:#9ca3af;font-size:13px;margin:4px 0;">{{email}} &nbsp;|&nbsp; {{website}}</p>
    <p style="color:#9ca3af;font-size:13px;margin:8px 0 0;">— {{ownerName}}, Owner</p>
  </div>
</div>`,
      isBuiltIn: true,
    },
    {
      title: "Standard Business Card",
      type: "business_card" as const,
      description: "A clean, professional business card layout for junk removal services.",
      fields: JSON.stringify(["businessName", "ownerName", "phone", "email", "website", "tagline"]),
      htmlTemplate: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;width:350px;height:200px;padding:24px;background:#1a1a2e;color:#fff;border-radius:8px;display:flex;flex-direction:column;justify-content:space-between;">
  <div>
    <p style="font-size:18px;font-weight:800;margin:0;letter-spacing:-0.3px;">{{businessName}}</p>
    <p style="font-size:11px;color:#f59e0b;margin:2px 0 0;text-transform:uppercase;letter-spacing:1.5px;">Junk Removal &amp; Hauling</p>
  </div>
  <div>
    <p style="font-size:13px;font-weight:600;margin:0;">{{ownerName}}</p>
    <p style="font-size:11px;color:#9ca3af;margin:2px 0 0;font-style:italic;">{{tagline}}</p>
  </div>
  <div style="border-top:1px solid #374151;padding-top:12px;">
    <p style="font-size:13px;font-weight:700;margin:0;">{{phone}}</p>
    <p style="font-size:11px;color:#9ca3af;margin:2px 0 0;">{{email}} &nbsp;·&nbsp; {{website}}</p>
  </div>
</div>`,
      isBuiltIn: true,
    },
    {
      title: "Door Hanger — Neighborhood Special",
      type: "door_hanger" as const,
      description: "An eye-catching door hanger with a neighborhood-specific offer and clear call-to-action.",
      fields: JSON.stringify(["businessName", "phone", "offer", "expiry", "serviceArea", "website"]),
      htmlTemplate: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;width:280px;padding:32px 24px;background:#fff;border:2px solid #1a1a2e;border-radius:12px;text-align:center;">
  <div style="width:40px;height:40px;border-radius:50%;border:2px solid #1a1a2e;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
    <span style="font-size:18px;">🗑️</span>
  </div>
  <p style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#6b7280;margin:0 0 8px;">Your Neighbors Use Us</p>
  <h2 style="font-size:22px;font-weight:800;color:#1a1a2e;margin:0 0 16px;line-height:1.2;">{{businessName}}</h2>
  <div style="background:#f59e0b;padding:14px;border-radius:6px;margin-bottom:20px;">
    <p style="font-weight:800;font-size:16px;color:#1a1a2e;margin:0;">{{offer}}</p>
    <p style="font-size:12px;color:#1a1a2e;margin:4px 0 0;opacity:0.8;">Expires {{expiry}}</p>
  </div>
  <p style="font-size:13px;color:#374151;margin:0 0 16px;">Serving {{serviceArea}}</p>
  <p style="font-size:22px;font-weight:800;color:#1a1a2e;margin:0;">{{phone}}</p>
  <p style="font-size:12px;color:#9ca3af;margin:4px 0 0;">{{website}}</p>
  <p style="font-size:11px;color:#d1d5db;margin:16px 0 0;">Licensed &amp; Insured · Free Estimates · Same-Day Available</p>
</div>`,
      isBuiltIn: true,
    },
    {
      title: "Real Estate Agent Postcard",
      type: "postcard" as const,
      description: "A targeted postcard for real estate agents highlighting your estate cleanout and move-out services.",
      fields: JSON.stringify(["businessName", "phone", "email", "website", "agentOffer", "ownerName"]),
      htmlTemplate: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:500px;margin:0 auto;">
  <div style="background:#1a1a2e;color:#fff;padding:28px;border-radius:8px 8px 0 0;">
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#f59e0b;margin:0 0 8px;">For Real Estate Professionals</p>
    <h2 style="font-size:22px;font-weight:800;margin:0;line-height:1.3;">Help Your Clients Close Faster<br/>with Professional Junk Removal</h2>
  </div>
  <div style="background:#f9fafb;padding:24px;border-radius:0 0 8px 8px;border:2px solid #1a1a2e;border-top:none;">
    <div style="background:#fff;border:1px solid #e5e7eb;padding:16px;border-radius:6px;margin-bottom:20px;">
      <p style="font-weight:700;color:#1a1a2e;margin:0 0 4px;">Exclusive Agent Offer</p>
      <p style="color:#f59e0b;font-weight:800;font-size:18px;margin:0;">{{agentOffer}}</p>
    </div>
    <div style="font-size:13px;color:#374151;margin-bottom:20px;line-height:1.7;">
      <p style="margin:0;">We help your clients with:</p>
      <p style="margin:4px 0;">✓ Pre-listing cleanouts &nbsp; ✓ Estate cleanouts</p>
      <p style="margin:4px 0;">✓ Move-out junk removal &nbsp; ✓ Garage &amp; basement cleanouts</p>
    </div>
    <div style="border-top:1px solid #e5e7eb;padding-top:16px;">
      <p style="font-weight:700;font-size:16px;color:#1a1a2e;margin:0;">{{phone}}</p>
      <p style="color:#6b7280;font-size:12px;margin:4px 0;">{{email}} &nbsp;|&nbsp; {{website}}</p>
      <p style="color:#9ca3af;font-size:12px;margin:8px 0 0;">— {{ownerName}}, {{businessName}}</p>
    </div>
  </div>
</div>`,
      isBuiltIn: true,
    },
  ];

  await db.insert(templates).values(data);
  templatesSeeded = true;
}

let communitySeeded = false;

export async function seedCommunityPosts() {
  if (communitySeeded) return;
  const db = await getDb();
  if (!db) return;

  const existing = await db.select({ id: communityPosts.id }).from(communityPosts).limit(1);
  if (existing.length > 0) {
    communitySeeded = true;
    return;
  }

  // We need a system user for seeded posts — use owner or skip if none
  const ownerUser = await db.select({ id: users.id }).from(users).limit(1);
  if (ownerUser.length === 0) {
    communitySeeded = true;
    return;
  }
  const systemUserId = ownerUser[0].id;

  const posts = [
    {
      userId: systemUserId,
      title: "How I got 8 leads from one real estate office visit",
      content: `Last Tuesday I drove to a cluster of 6 real estate offices downtown. I had 60 flyers, 60 business cards, and a handwritten note for each office manager.\n\nI introduced myself, said I specialize in estate cleanouts and move-out junk removal, and left a small package. I also offered 10% off for any client they refer.\n\nWithin 2 weeks I had 8 calls, 5 quotes, and 3 booked jobs. Total cost: $45 in printing. Total revenue: $1,850.\n\nKey insight: go in person, don't just mail stuff. The face-to-face connection is everything.`,
      category: "success_story" as const,
      isPinned: true,
      isFeatured: true,
    },
    {
      userId: systemUserId,
      title: "Contractor partnerships: my #1 lead source after 6 months",
      content: `I started reaching out to contractors 6 months ago. Today they account for 40% of my monthly revenue.\n\nHere's what worked:\n1. Show up at job sites early morning (7-8am) when they're setting up\n2. Offer to haul their current debris at cost just to get a foot in the door\n3. Give them a unique referral code so you can track their business\n4. Text them monthly with a seasonal promo\n\nMy best contractor partner sends me 4-6 jobs per month. I pay him $50 per converted job. Completely worth it.`,
      category: "contractors" as const,
      isPinned: false,
      isFeatured: true,
    },
    {
      userId: systemUserId,
      title: "Door hanger tip: hit the same neighborhood twice",
      content: `I've been doing door hangers for 2 years. The biggest thing I've learned: one touch is never enough.\n\nMy process:\n- Week 1: Door hangers with a time-limited offer\n- Week 3: Postcard mailer to the same addresses\n- Week 6: Second door hanger with a different offer\n\nThe response rate on the second and third touch is 3x higher than the first. People need to see your name multiple times before they call.\n\nBest neighborhoods: 30+ year old homes, areas with recent estate sales, near senior living communities.`,
      category: "door_hangers" as const,
      isPinned: false,
      isFeatured: false,
    },
    {
      userId: systemUserId,
      title: "Property managers are goldmines — here's how to approach them",
      content: `Property managers deal with tenant move-outs and evictions constantly. They NEED reliable junk removal.\n\nMy approach:\n1. Call ahead and ask for a 10-minute meeting (don't just show up)\n2. Bring donuts or coffee to the first meeting\n3. Offer a standing 15% discount for all their properties\n4. Promise 24-hour response time — this is your biggest differentiator\n5. Ask to be added to their vendor list\n\nOne property manager I work with manages 200+ units. She calls me 2-3 times per month. That's $3,000-$5,000 in monthly revenue from one relationship.`,
      category: "real_estate" as const,
      isPinned: false,
      isFeatured: false,
    },
    {
      userId: systemUserId,
      title: "Vehicle wrap ROI after 18 months — worth it?",
      content: `I got my truck wrapped 18 months ago. Cost: $2,800. Here's the honest breakdown:\n\nMonth 1-3: 2-3 calls per month directly attributed to the wrap\nMonth 4-12: 4-6 calls per month as brand recognition built\nMonth 13-18: 6-8 calls per month\n\nTotal estimated revenue from wrap-generated leads: $28,000+\nROI: ~900%\n\nBest parking spots in my market:\n- Home Depot on Saturday mornings\n- Near real estate offices\n- Busy grocery store parking lots on weekends\n\nAlways ask callers how they found you. It's the only way to track this accurately.`,
      category: "vehicle_wraps" as const,
      isPinned: false,
      isFeatured: false,
    },
    {
      userId: systemUserId,
      title: "Spring cleaning season prep — start in February",
      content: `Don't wait until March to prep for spring cleaning season. Here's my February checklist:\n\n1. Design and order spring-themed door hangers (2-3 week lead time)\n2. Set up EDDM postcard campaign targeting your best neighborhoods\n3. Email/text all your real estate and contractor contacts with a spring promo\n4. Post in local Facebook groups about spring cleaning tips (not promotions — be helpful first)\n5. Update your Google Business Profile with spring-specific services\n\nMarch-May is my highest revenue quarter every year. The prep you do in February determines how good it is.`,
      category: "seasonal" as const,
      isPinned: false,
      isFeatured: false,
    },
  ];

  await db.insert(communityPosts).values(posts);
  communitySeeded = true;
}
