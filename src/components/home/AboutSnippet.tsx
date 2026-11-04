"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

const pillars = [
    "ISO 9001:2015 Quality Management",
    "Class A Tamil Nadu PWD Empanelled",
    "10+ Year Flawless Delivery Record",
    "200+ Delivered Govt. Projects",
    "Zero Structural Warranty Failures",
    "94% Schedule Adherence Rate",
];

export function AboutSnippet() {
    return (
        <section className="section-padding bg-[#FAF9F6] border-b border-slate-200/80">
            <div className="container-site">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Architectural Drafting Block */}
                    <MotionWrapper direction="left" className="lg:col-span-5 relative">
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 relative overflow-hidden shadow-matte-sm min-h-[380px] flex flex-col justify-between">
                            {/* Blueprint CAD hatching */}
                            <svg
                                className="absolute inset-0 w-full h-full opacity-20"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                            >
                                <defs>
                                    <pattern
                                        id="aboutGrid"
                                        width="30"
                                        height="30"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M 30 0 L 0 0 0 30"
                                            fill="none"
                                            stroke="#0d1b2e"
                                            strokeWidth="0.4"
                                        />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#aboutGrid)" />
                            </svg>

                            <div className="relative z-10">
                                <div className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#185FA5] mb-1">
                                    FOUNDATION YEAR
                                </div>
                                <div
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-7xl font-extrabold text-[#0d1b2e] tracking-tight leading-none"
                                >
                                    2014
                                </div>
                            </div>

                            <div className="relative z-10 pt-8 border-t border-slate-100">
                                <div
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-2xl font-bold uppercase text-[#0d1b2e] leading-tight"
                                >
                                    Civil Engineering
                                    <br />
                                    <span className="text-[#185FA5]">Authority</span>
                                </div>
                                <div className="text-xs text-slate-500 font-mono-tech mt-1">
                                    Headquartered in Tamil Nadu, India
                                </div>
                            </div>
                        </div>

                        {/* Floating Metric Badge */}
                        <div className="absolute -bottom-5 -right-5 rounded-xl p-4 bg-white border border-slate-200 shadow-matte-md min-w-[170px] z-20">
                            <div
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-4xl font-extrabold text-[#0d1b2e] leading-none"
                            >
                                94<span className="text-xl text-[#c88a22]">%</span>
                            </div>
                            <div className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 mt-1 font-semibold">
                                On-Time Delivery Rate
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Right: Text Content */}
                    <MotionWrapper direction="right" className="lg:col-span-7">
                        <SectionLabel>About GSAssociates</SectionLabel>

                        <h2 className="section-heading mb-6">
                            Tamil Nadu&apos;s
                            <br />
                            <span>Infrastructure</span> Partner
                        </h2>

                        <p className="text-base text-slate-700 leading-relaxed mb-4">
                            Founded in 2014, GSAssociates Construction Pvt. Ltd. has grown from a specialized
                            road-works contractor into one of Tamil Nadu&apos;s preeminent government
                            infrastructure firms — delivering 200+ arterial corridors, bridges, and civic
                            headquarters.
                        </p>

                        <p className="text-sm text-slate-500 leading-relaxed mb-8">
                            Every structure is built to rigorous Indian Roads Congress (IRC) and Tamil Nadu
                            Public Works Department specifications, backed by an experienced in-house
                            surveying and structural engineering corps.
                        </p>

                        {/* Pillars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {pillars.map((p) => (
                                <div key={p} className="flex items-center gap-2.5">
                                    <CheckCircle2 size={15} className="shrink-0 text-[#185FA5]" />
                                    <span className="text-xs font-semibold text-slate-700 font-sans">
                                        {p}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <ArchitecturalButton href="/about" variant="primary" size="md">
                            <span>Our Institutional Story</span>
                            <ArrowRight size={14} />
                        </ArchitecturalButton>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}
