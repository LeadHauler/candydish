import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function FreeGuide() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", business: "" });
  const [submitted, setSubmitted] = useState(false);

  const submit = trpc.contact.submitGuide.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      // Fire Meta Pixel Lead event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", { content_name: "Free Guide Download" });
      }
      // Fire GA4 generate_lead event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "Landing Page",
          event_label: "Free Guide Download",
        });
      }
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    submit.mutate(form);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col">
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="py-5 px-6 flex justify-center border-b border-white/10">
        <span className="text-lg font-extrabold tracking-tight text-white">
          Lead<span className="text-[#f5a623]">Hauler</span>
        </span>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-20">
        <div className="w-full max-w-2xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5a623]/15 border border-[#f5a623]/30 text-[#f5a623] text-xs font-bold uppercase tracking-widest mb-6">
            Free Resource — Junk Removal Owners
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white">
            Your Competitors Are Missing<br className="hidden sm:block" />{" "}
            <span className="text-[#f5a623]">This Local Lead Source</span>
          </h1>

          {/* Body copy */}
          <div className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-4 mb-8">
            <p>
              Most junk removal companies are fighting over the same leads…
            </p>
            <p className="text-white font-semibold">
              Google Ads.<br />
              Facebook Ads.<br />
              LSAs.
            </p>
            <p>
              Meanwhile, there's a quiet stream of homeowners actively asking for junk removal
              help… and barely anyone is responding.
            </p>
            <p>
              We put together a <span className="text-white font-semibold">free breakdown</span> showing:
            </p>
            <ul className="space-y-2 pl-1">
              {[
                "Where these requests are happening",
                "How to find them daily",
                "What to say to turn them into booked jobs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#f5a623]/20 border border-[#f5a623]/40 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#f5a623]" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-400 text-sm">
              No fluff. Just a simple system you can start using today.
            </p>
          </div>

          {/* ── FORM ─────────────────────────────────────────────────────── */}
          {submitted ? (
            <div className="rounded-2xl bg-[#f5a623]/10 border border-[#f5a623]/30 p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#f5a623]/20 border border-[#f5a623]/40 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#f5a623]" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-white mb-2">You're all set!</h2>
              <p className="text-gray-300 text-sm">
                We'll be in touch shortly with your free breakdown. Check your phone — we may reach out via text.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
              <p className="text-white font-bold text-lg mb-1">Download it free</p>
              <p className="text-gray-400 text-sm mb-6">Enter your info below and we'll send it right over.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                      Your Name <span className="text-[#f5a623]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f5a623]/60 focus:ring-1 focus:ring-[#f5a623]/30 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                      Phone Number <span className="text-[#f5a623]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f5a623]/60 focus:ring-1 focus:ring-[#f5a623]/30 transition"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                    Email Address <span className="text-gray-600">(optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@yourcompany.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f5a623]/60 focus:ring-1 focus:ring-[#f5a623]/30 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                    Business Name <span className="text-gray-600">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Junk Removal"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f5a623]/60 focus:ring-1 focus:ring-[#f5a623]/30 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submit.isPending}
                  className="w-full bg-[#f5a623] hover:bg-[#e09510] text-black font-extrabold py-4 rounded-xl text-base transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#f5a623]/20 hover:shadow-[#f5a623]/30"
                >
                  {submit.isPending ? "Sending…" : "Send Me the Free Breakdown →"}
                </button>
                <p className="text-center text-gray-500 text-xs">
                  No spam. No pitch. Just the breakdown. We may follow up by text or phone.
                </p>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="py-5 px-6 text-center text-gray-600 text-xs border-t border-white/10">
        © {new Date().getFullYear()} LeadHauler. All rights reserved.
      </footer>
    </div>
  );
}
