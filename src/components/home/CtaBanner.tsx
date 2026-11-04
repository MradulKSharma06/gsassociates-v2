import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";

export function CtaBanner() {
    return (
        <section className="relative overflow-hidden bg-[#0d1b2e] text-white py-20 border-t border-slate-800">
            {/* Top gold hairline divider */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c88a22] to-transparent opacity-60" />

            {/* Geometric blueprint coordinate watermark */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
            >
                <defs>
                    <pattern id="cta-arch-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-arch-grid)" />
            </svg>

            {/* Subtle background drafting label */}
            <div
                className="absolute right-6 sm:right-12 bottom-4 pointer-events-none select-none font-mono text-[10px] text-white/10 uppercase tracking-[3px]"
                aria-hidden
            >
                REF: GS/SEC-CIVIL/2026 · LAT 13.0827° N / LON 80.2707° E
            </div>

            <div className="container-site relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#c88a22] font-mono text-[11px] uppercase tracking-widest mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c88a22] animate-pulse" />
                            Direct Engineering Inquiries
                        </div>
                        <h2
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight"
                        >
                            Have a Major Infrastructure{" "}
                            <span className="text-[#8aadcc]">Package in Mind?</span>
                        </h2>
                        <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                            From state highway tenders to turnkey civic facilities — consult directly with our Chief Engineers and project management team. Responsive within one business day.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 lg:shrink-0">
                        <ArchitecturalButton href="/contact" variant="white" size="lg">
                            Initiate Tender Inquiry
                            <ArrowRight size={14} className="ml-1" />
                        </ArchitecturalButton>
                        <a
                            href="tel:+914412345678"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider text-white/90 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all select-none"
                        >
                            <Phone size={13} className="text-[#c88a22]" />
                            +91 44 1234 5678
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
