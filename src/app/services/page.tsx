import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { services } from "@/data/services";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Services",
    description:
        "GSAssociates Construction provides road & highway construction, bridges, government buildings, water infrastructure, and urban development services across Tamil Nadu.",
};

const accentColors: Record<string, string> = {
    blue: "var(--color-blue-primary)",
    navy: "var(--color-navy-700)",
    gold: "var(--color-gold)",
};

export default function ServicesPage() {
    return (
        <>
            {/* Page hero */}
            <section
                className="relative overflow-hidden section-padding-sm"
                style={{ background: "var(--color-navy)" }}
            >
                <div className="accent-bar absolute top-0 left-0 right-0" />
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <defs>
                        <pattern id="sg" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#sg)" />
                </svg>
                <div className="container-site relative z-10">
                    <SectionLabel light>What We Do</SectionLabel>
                    <h1
                        style={{
                            fontFamily: "var(--font-condensed)",
                            fontSize: "clamp(40px, 6vw, 72px)",
                            fontWeight: 800,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            lineHeight: 1,
                        }}
                    >
                        Our <span style={{ color: "var(--color-blue-bright)" }}>Services</span>
                    </h1>
                    <p className="mt-4 text-[15px] font-light max-w-[560px]" style={{ color: "#8aadcc" }}>
                        End-to-end civil infrastructure construction and project management,
                        built around Tamil Nadu&apos;s government sector needs.
                    </p>
                </div>
            </section>

            {/* Services list */}
            <section className="section-padding" style={{ background: "var(--color-page-bg)" }}>
                <div className="container-site flex flex-col gap-10">
                    {services.map((svc, i) => {
                        const accent = accentColors[svc.accentColor] ?? "var(--color-blue-primary)";
                        const isReversed = i % 2 !== 0;
                        return (
                            <div
                                key={svc.id}
                                id={svc.id}
                                className={`grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 rounded-card overflow-hidden border ${isReversed ? "lg:grid-cols-[2fr_1fr]" : ""}`}
                                style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
                            >
                                {/* Accent panel */}
                                <div
                                    className={`p-8 flex flex-col justify-between ${isReversed ? "lg:order-last" : ""}`}
                                    style={{
                                        background: `linear-gradient(135deg, ${accent}18 0%, ${accent}08 100%)`,
                                        borderRight: isReversed ? "none" : `1px solid var(--color-border)`,
                                        borderLeft: isReversed ? `1px solid var(--color-border)` : "none",
                                    }}
                                >
                                    <div>
                                        <div
                                            className="text-[9.5px] font-bold tracking-[2.5px] uppercase mb-3"
                                            style={{ color: accent }}
                                        >
                                            {svc.category}
                                        </div>
                                        <h2
                                            style={{
                                                fontFamily: "var(--font-condensed)",
                                                fontSize: "clamp(24px, 3vw, 34px)",
                                                fontWeight: 800,
                                                color: "var(--color-text-primary)",
                                                textTransform: "uppercase",
                                                letterSpacing: "1px",
                                                lineHeight: 1.1,
                                            }}
                                        >
                                            {svc.title}
                                        </h2>
                                    </div>
                                    <div
                                        className="w-12 h-[3px] rounded-full mt-6"
                                        style={{ background: accent }}
                                    />
                                </div>

                                {/* Content panel */}
                                <div className="p-8">
                                    <p className="text-[14px] leading-relaxed mb-6" style={{ color: "var(--color-text-muted)" }}>
                                        {svc.description}
                                    </p>
                                    <h3
                                        className="text-[10px] font-bold tracking-[2px] uppercase mb-3"
                                        style={{ color: "var(--color-text-faint)" }}
                                    >
                                        Key Capabilities
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {svc.capabilities.map((cap) => (
                                            <div key={cap} className="flex items-start gap-2.5">
                                                <CheckCircle2
                                                    size={14}
                                                    className="mt-0.5 shrink-0"
                                                    style={{ color: accent }}
                                                />
                                                <span className="text-[13px]" style={{ color: "var(--color-text-body)" }}>
                                                    {cap}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <CtaBanner />
        </>
    );
}