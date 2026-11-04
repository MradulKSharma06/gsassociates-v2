import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CheckCircle2 } from "lucide-react";

const pillars = [
    "ISO 9001:2015 Certified",
    "Class A PWD Contractor",
    "10+ Year Track Record",
    "200+ Govt. Projects",
    "Zero Structural Failures",
    "On-Time Delivery Rate: 94%",
];

export function AboutSnippet() {
    return (
        <section className="section-padding" style={{ background: "var(--color-page-bg)" }}>
            <div className="container-site">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left — Visual block */}
                    <div className="relative">
                        {/* Main block */}
                        <div
                            className="rounded-card overflow-hidden relative"
                            style={{ height: "420px", background: "linear-gradient(135deg, #0d1b2e 0%, #1a3558 100%)" }}
                        >
                            {/* Grid pattern */}
                            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#about-grid)" />
                            </svg>

                            {/* Year badge */}
                            <div className="absolute top-8 left-8">
                                <div
                                    className="text-[11px] font-bold tracking-[2px] uppercase mb-1"
                                    style={{ color: "var(--color-blue-bright)" }}
                                >
                                    Established
                                </div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-condensed)",
                                        fontSize: "72px",
                                        fontWeight: 800,
                                        color: "rgba(255,255,255,0.12)",
                                        lineHeight: 1,
                                        letterSpacing: "2px",
                                    }}
                                >
                                    2014
                                </div>
                            </div>

                            {/* Bottom content */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <div
                                    style={{
                                        fontFamily: "var(--font-condensed)",
                                        fontSize: "32px",
                                        fontWeight: 800,
                                        color: "#fff",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    A Decade of
                                    <span style={{ color: "var(--color-blue-bright)" }}> Delivering</span>
                                </div>
                                <div className="mt-2 text-[13px] font-light" style={{ color: "#7aadcc" }}>
                                    Tamil Nadu&apos;s government infrastructure
                                </div>
                            </div>
                        </div>

                        {/* Floating stat card */}
                        <div
                            className="absolute -bottom-6 -right-6 rounded-card p-5 border"
                            style={{
                                background: "var(--color-surface)",
                                borderColor: "var(--color-border)",
                                boxShadow: "var(--shadow-card)",
                                minWidth: "180px",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "var(--font-condensed)",
                                    fontSize: "44px",
                                    fontWeight: 800,
                                    color: "var(--color-blue-primary)",
                                    lineHeight: 1,
                                }}
                            >
                                94<span className="text-[24px]">%</span>
                            </div>
                            <div className="text-[10px] font-bold tracking-[1.5px] uppercase mt-1" style={{ color: "var(--color-text-faint)" }}>
                                On-Time Delivery
                            </div>
                        </div>

                        {/* Accent bar at top-left */}
                        <div
                            className="absolute -top-3 -left-3 w-16 h-[3px] rounded-full"
                            style={{ background: "var(--color-gold)" }}
                        />
                    </div>

                    {/* Right — Text content */}
                    <div>
                        <SectionLabel>About GSAssociates</SectionLabel>

                        <h2 className="section-heading mb-5">
                            Tamil Nadu&apos;s
                            <br />
                            <span>Infrastructure</span> Partner
                        </h2>

                        <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--color-text-body)" }}>
                            Founded in 2014, GSAssociates Construction Pvt. Ltd. has grown from a
                            small road-works contractor into one of Tamil Nadu&apos;s most trusted
                            government infrastructure firms — with 200+ projects spanning highways,
                            bridges, civic buildings, and water systems.
                        </p>

                        <p className="text-[15px] leading-relaxed mb-8" style={{ color: "var(--color-text-muted)" }}>
                            Every project we deliver is backed by rigorous quality control, an
                            experienced in-house engineering team, and an unwavering commitment to
                            the communities we build for.
                        </p>

                        {/* Pillars grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                            {pillars.map((p) => (
                                <div key={p} className="flex items-center gap-2.5">
                                    <CheckCircle2
                                        size={15}
                                        className="shrink-0"
                                        style={{ color: "var(--color-blue-primary)" }}
                                    />
                                    <span className="text-[13px] font-500" style={{ color: "var(--color-text-body)" }}>
                                        {p}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Link href="/about" className="btn btn-primary">
                            Our Full Story
                            <span className="ml-1">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}