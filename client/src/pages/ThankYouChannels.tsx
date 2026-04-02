import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Download,
  CheckCircle2,
  ArrowRight,
  Unlock,
  Phone,
  Calendar,
} from "lucide-react";

// Confetti burst on mount
function useConfetti() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const colors = ["#f5a623", "#1a2744", "#22c55e", "#3b82f6", "#f43f5e"];
    const count = 80;
    const container = document.body;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const size = Math.random() * 8 + 5;
      el.style.cssText = `
        position:fixed;
        top:-${size}px;
        left:${Math.random() * 100}vw;
        width:${size}px;
        height:${size}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
        opacity:1;
        pointer-events:none;
        z-index:9999;
        transform:rotate(${Math.random() * 360}deg);
        transition:top ${1.2 + Math.random() * 1.5}s ease-in, opacity 0.4s ease ${1.5 + Math.random()}s;
      `;
      container.appendChild(el);
      requestAnimationFrame(() => {
        el.style.top = `${80 + Math.random() * 30}vh`;
        el.style.opacity = "0";
      });
      setTimeout(() => el.remove(), 3500);
    }
  }, []);
}

const allChannels = [
  "Google Business Profile (Local Map Pack)",
  "Google Search Ads (PPC)",
  "Google Local Service Ads",
  "Facebook & Instagram Ads",
  "Nextdoor — The Neighborhood Secret",
  "Referral Partnerships",
  "Email & SMS Follow-Up",
  "Yard Signs & Vehicle Wraps",
];

export default function ThankYouChannels() {
  useConfetti();
  const [revealed, setRevealed] = useState(false);

  // Auto-reveal locked channels after a short delay for delight
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* NAV */}
      <header className="h-16 flex items-center justify-center border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Lead<span className="text-[#f5a623]">Hauler</span>
          </span>
          <span className="hidden sm:block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
            Smarter Marketing for Junk Removal
          </span>
        </Link>
      </header>

      <main className="flex-1 py-14 sm:py-20 px-4">
        <div className="max-w-xl mx-auto text-center">

          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border-2 border-green-300 mb-5 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3 text-foreground">
            You're In. All 8 Channels{" "}
            <span className="text-primary">Unlocked.</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
            The breakdown is yours. Every channel your competitors are missing — and exactly how to activate each one — is in the guide below. Download it now and start with Channel #5 first.
          </p>

          {/* Revealed channel list */}
          <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden mb-8 text-left">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <p className="text-xs font-bold text-foreground uppercase tracking-widest">
                All 8 Channels — Now Unlocked
              </p>
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                <Unlock className="w-3.5 h-3.5" />
                Full access
              </div>
            </div>
            <div className="divide-y divide-border">
              {allChannels.map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 px-5 py-3 transition-all duration-500 ${
                    revealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="text-xs font-extrabold text-primary w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-foreground flex-1">{label}</span>
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Primary CTA — Download */}
          <a
            href="https://drive.google.com/file/d/1NgIPApZUUaiP5GDkmNxhFGesPLB-iFzS/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-4 rounded-xl text-base transition-all duration-150 shadow-md mb-4"
          >
            <Download className="w-5 h-5" />
            Download the 8 Channels Breakdown
          </a>

          <p className="text-xs text-muted-foreground mb-10">
            Opens in Google Drive — free PDF download, no login required.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
              What's next
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Next steps */}
          <div className="space-y-4 mb-10 text-left">
            {[
              {
                icon: CheckCircle2,
                title: "Start with Channel #5",
                body: "It takes less than 20 minutes to set up and generates leads with zero ad spend. Most of your competitors have never heard of it.",
              },
              {
                icon: Phone,
                title: "We may reach out shortly",
                body: "One of our junk removal marketing specialists may give you a quick call to walk through which channels make the most sense for your specific market.",
              },
              {
                icon: Calendar,
                title: "Book a free strategy call",
                body: "Want us to build and run all 8 channels for you? Book a free 20-minute strategy call and we'll show you exactly what's available in your market.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-0.5">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary CTA — Strategy call */}
          <a
            href="https://calendly.com/leadhauler/strategy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-card hover:bg-muted border border-border text-foreground font-bold py-4 rounded-xl text-sm transition-all duration-150 shadow-sm mb-6"
          >
            Book My Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </a>

          <Link href="/tactics" className="text-sm text-primary hover:underline font-semibold">
            Browse more free tactics →
          </Link>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} LeadHauler. All rights reserved.{" "}
          <Link href="/" className="text-primary hover:underline">Back to main site</Link>
        </p>
      </footer>

    </div>
  );
}
