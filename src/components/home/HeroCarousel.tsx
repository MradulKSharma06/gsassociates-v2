"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";
import { HeroArchitecturalCanvas } from "@/components/home/HeroArchitecturalCanvas";

export function HeroCarousel() {
    return (
        <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-slate-200/80 blueprint-grid py-12 lg:py-20">
            <div className="container-site relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                    {/* Left Column: Architectural Editorial Typography & Actions */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                        {/* Official Accreditation Stamp */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0d1b2e] text-xs font-mono-tech shadow-sm mb-6 w-fit">
                            <span className="w-2 h-2 rounded-full bg-[#c88a22]"></span>
                            <span className="font-semibold">Class A Contractor · Tamil Nadu PWD & NHAI</span>
                        </div>

                        {/* Master Architectural Headline */}
                        <h1
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-[#0d1b2e] leading-[0.98] tracking-tight mb-6"
                        >
                            Engineering Civil
                            <br />
                            <span className="text-[#185FA5]">Infrastructure</span>
                            <br />
                            Built To Endure
                        </h1>

                        {/* Editorial Subtitle */}
                        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mb-8">
                            Over a decade delivering Tamil Nadu&apos;s high-capacity arterial expressways,
                            multi-tier grade separators, and landmark government complexes — engineered to
                            the highest IRC structural criteria.
                        </p>

                        {/* Handcrafted Capsule Actions (from Image 2) */}
                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <ArchitecturalButton href="/projects" variant="primary" size="lg">
                                <span>Explore Portfolio</span>
                                <ArrowRight size={15} />
                            </ArchitecturalButton>
                            <ArchitecturalButton href="/contact" variant="wireframe" size="lg">
                                <span>Submit Tender Bid</span>
                            </ArchitecturalButton>
                        </div>

                        {/* Monospace Telemetry Strip */}
                        <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
                            <div>
                                <div
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-2xl sm:text-3xl font-extrabold text-[#0d1b2e]"
                                >
                                    ₹500+ Cr
                                </div>
                                <div className="text-[11px] font-mono-tech uppercase text-slate-500 mt-0.5">
                                    Delivered Value
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-2xl sm:text-3xl font-extrabold text-[#0d1b2e]"
                                >
                                    200+
                                </div>
                                <div className="text-[11px] font-mono-tech uppercase text-slate-500 mt-0.5">
                                    Govt. Projects
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-2xl sm:text-3xl font-extrabold text-[#c88a22]"
                                >
                                    99.4%
                                </div>
                                <div className="text-[11px] font-mono-tech uppercase text-slate-500 mt-0.5">
                                    On-Spec Delivery
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: 3D CAD Wireframe Interactive Canvas (Image 2 style) */}
                    <div className="lg:col-span-6 w-full">
                        <HeroArchitecturalCanvas />
                    </div>
                </div>
            </div>
        </section>
    );
}
