import { useEffect } from "react";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";

const GUIDE_URL =
  "https://drive.google.com/file/d/1AhPQQLzWqm4SU3qxiQvK9c41Q9PSZxja/view?usp=sharing";

export default function ThankYou() {
  useEffect(() => {
    // GA4 — mark this visitor as a converter so they can be excluded from
    // retargeting and added to a "Converted Leads" audience segment
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "guide_downloaded", {
        event_category: "Conversion",
        event_label: "Thank You Page View",
      });
      // Also set a user property so GA4 can build a segment
      (window as any).gtag("set", "user_properties", {
        lead_converted: "true",
      });
    }
    // Meta Pixel — fire a second Lead event tagged as "Thank You" so Meta
    // can build a custom audience of people who reached this page
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", { content_name: "Thank You Page" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* ── NAV ── */}
      <header className="h-16 flex items-center justify-center border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Lead<span className="text-[#f5a623]">Hauler</span>
          </span>
          <span className="hidden sm:block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
            Smarter Marketing for Junk Removal
          </span>
        </a>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-xl w-full mx-auto text-center">

          {/* Success icon */}
          <div className="w-16 h-16 rounded-full bg-green-100 border border-green-200 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 text-foreground">
            This Is Where Most Junk Removal{" "}
            <span className="text-primary">Companies Miss Out</span>
          </h1>

          {/* Subtext */}
          <p className="text-muted-foreground text-base sm:text-lg mb-8">
            You now have access to a lead source most of your competitors are ignoring.
          </p>

          {/* Bullet points */}
          <div className="rounded-2xl bg-card border border-border shadow-sm p-6 text-left mb-8 space-y-4">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Use this to:
            </p>
            {[
              "Find real homeowners asking for help",
              "Respond faster than competitors",
              "Turn simple posts into booked jobs",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>

          {/* Download button */}
          <a
            href={GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-4 px-6 rounded-xl text-base transition-all duration-150 shadow-md"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag("event", "file_download", {
                  event_category: "Engagement",
                  event_label: "Free Guide PDF",
                });
              }
            }}
          >
            <Download className="w-5 h-5" />
            Download Your Free Breakdown
          </a>

          <p className="mt-4 text-xs text-muted-foreground">
            Opens in Google Drive. No sign-in required to view.
          </p>

          {/* Soft CTA back to main site */}
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Want us to run this system for you — done for you, every day?
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Get a free strategy call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-5 px-6 text-center text-muted-foreground text-xs border-t border-border">
        © {new Date().getFullYear()} LeadHauler. All rights reserved.
      </footer>

    </div>
  );
}
