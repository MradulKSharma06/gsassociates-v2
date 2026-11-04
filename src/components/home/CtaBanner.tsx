import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CtaBanner() {
    return (
        <section
            className="relative overflow-hidden"
            style={{ background: "var(--color-navy)" }}
        >
            {/* Accent bar top */}
            <div className="accent-bar" />

            {/* Geometric background */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.04]"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
            >
                <defs>
                    <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>

            {/* BG watermark text */}
            <div
                className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none select-none"
                aria-hidden
            >
                <span
                    style={{
                        fontFamily: "var(--font-condensed)",
                        fontSize: "clamp(60px, 12vw, 160px)",
                        fontWeight: 800,
                        color: "rgba(255,255,255,0.025)",
                        textTransform: "uppercase",
                        letterSpacing: "6px",
                        lineHeight: 1,
                    }}
                >
                    CONTACT
                </span>
            </div>

            <div className="container-site section-padding-sm relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    <div>
                        <div
                            className="text-[10px] font-bold tracking-[3px] uppercase mb-3"
                            style={{ color: "var(--color-gold)" }}
                        >
                            Let&apos;s Build Together
                        </div>
                        <h2
                            style={{
                                fontFamily: "var(--font-condensed)",
                                fontSize: "clamp(30px, 4vw, 52px)",
                                fontWeight: 800,
                                color: "#fff",
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                                lineHeight: 1.05,
                            }}
                        >
                            Have a Project
                            <br />
                            <span style={{ color: "var(--color-blue-bright)" }}>in Mind?</span>
                        </h2>
                        <p className="mt-3 text-[14px] font-light" style={{ color: "#7aadcc", maxWidth: "480px" }}>
                            From tenders to technical consultancy — reach out and our team will
                            respond within one business day.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 lg:shrink-0">
                        <Link href="/contact" className="btn btn-primary btn-lg">
                            Send Inquiry
                            <ArrowRight size={16} />
                        </Link>
                        <a
                            href="tel:+914412345678"
                            className="btn btn-outline-white btn-lg"
                        >
                            <Phone size={15} />
                            +91 44 1234 5678
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}