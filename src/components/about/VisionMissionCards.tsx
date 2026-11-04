"use client";

import { motion } from "framer-motion";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { Compass, CheckCircle2, ShieldCheck, Target, Award } from "lucide-react";

export function VisionMissionCards() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. Institutional Vision Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
            >
                <Tilt3DCard maxTilt={5} className="h-full">
                    <div className="relative h-full flex flex-col justify-between rounded-3xl p-8 sm:p-10 bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-matte-md hover:shadow-matte-lg hover:border-blue-300/80 transition-all duration-300 overflow-hidden group">
                        {/* Architectural Blueprint CAD Grid Background & Watermark */}
                        <svg
                            className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                        >
                            <defs>
                                <pattern id="vision-cad-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#185fa5" strokeWidth="0.8" />
                                    <circle cx="0" cy="0" r="1.5" fill="#185fa5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#vision-cad-grid)" />
                        </svg>

                        {/* Top Ambient Glow Pill */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

                        {/* Corner Drafting Crosshairs */}
                        <span className="absolute top-3 left-3 text-slate-300 font-mono-tech text-[10px] select-none">+</span>
                        <span className="absolute top-3 right-3 text-slate-300 font-mono-tech text-[10px] select-none">+</span>

                        <div>
                            {/* Card Header: Seal Badge + Technical Datum */}
                            <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/80 text-[#185FA5] text-[10px] sm:text-xs font-mono-tech font-bold uppercase tracking-wider">
                                    <Compass size={13} className="text-[#185FA5]" />
                                    <span>Our Institutional Vision</span>
                                </div>
                                <span className="font-mono-tech text-[10px] text-slate-400 tracking-widest uppercase">
                                    REF: VIS-2035 / TN
                                </span>
                            </div>

                            {/* Monumental Headline */}
                            <h2
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-3xl sm:text-4xl font-extrabold uppercase text-[#0d1b2e] leading-[0.96] tracking-tight mb-4 relative z-10"
                            >
                                To Be Tamil Nadu&apos;s Premier{" "}
                                <span className="text-[#185FA5]">Infrastructure</span> Builder
                            </h2>

                            {/* Refined Editorial Narrative */}
                            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-8 relative z-10">
                                We envision a Tamil Nadu where every citizen has access to world-class arterial expressways,
                                grade-separated flyovers, and dignified public complexes — engineered with unyielding integrity,
                                built to endure for generations.
                            </p>
                        </div>

                        {/* Bottom Strategic Execution Pillars */}
                        <div className="relative z-10 pt-6 border-t border-slate-200/80">
                            <span className="block text-[10px] font-mono-tech font-bold uppercase tracking-widest text-slate-400 mb-3">
                                Foundational Mandates
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {[
                                    "State Arterial Highways",
                                    "Precast Grade Separators",
                                    "100-Year Life Design",
                                ].map((pillar) => (
                                    <div
                                        key={pillar}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs font-mono-tech text-[#0d1b2e] font-semibold"
                                    >
                                        <CheckCircle2 size={13} className="text-[#185FA5] shrink-0" />
                                        <span className="truncate">{pillar}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Tilt3DCard>
            </motion.div>

            {/* 2. Core Mission Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                className="h-full"
            >
                <Tilt3DCard maxTilt={5} className="h-full">
                    <div className="relative h-full flex flex-col justify-between rounded-3xl p-8 sm:p-10 bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-matte-md hover:shadow-matte-lg hover:border-amber-300/80 transition-all duration-300 overflow-hidden group">
                        {/* Architectural Blueprint CAD Grid Background & Watermark */}
                        <svg
                            className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                        >
                            <defs>
                                <pattern id="mission-cad-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#c88a22" strokeWidth="0.8" />
                                    <circle cx="0" cy="0" r="1.5" fill="#c88a22" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#mission-cad-grid)" />
                        </svg>

                        {/* Top Ambient Glow Pill */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

                        {/* Corner Drafting Crosshairs */}
                        <span className="absolute top-3 left-3 text-slate-300 font-mono-tech text-[10px] select-none">+</span>
                        <span className="absolute top-3 right-3 text-slate-300 font-mono-tech text-[10px] select-none">+</span>

                        <div>
                            {/* Card Header: Seal Badge + Technical Datum */}
                            <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50/80 border border-amber-200/80 text-[#c88a22] text-[10px] sm:text-xs font-mono-tech font-bold uppercase tracking-wider">
                                    <ShieldCheck size={13} className="text-[#c88a22]" />
                                    <span>Our Core Mission</span>
                                </div>
                                <span className="font-mono-tech text-[10px] text-slate-400 tracking-widest uppercase">
                                    STD: IRC / TNPWD
                                </span>
                            </div>

                            {/* Monumental Headline */}
                            <h2
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-3xl sm:text-4xl font-extrabold uppercase text-[#0d1b2e] leading-[0.96] tracking-tight mb-4 relative z-10"
                            >
                                Deliver Government Infrastructure With{" "}
                                <span className="text-[#c88a22]">Precision &amp; Pride</span>
                            </h2>

                            {/* Refined Editorial Narrative */}
                            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-8 relative z-10">
                                Our mission is to execute every public works contract with the highest statutory standards
                                of structural safety, material testing, and timeline fidelity — serving the Government of Tamil Nadu
                                and its citizens with disciplined accountability.
                            </p>
                        </div>

                        {/* Bottom Strategic Execution Pillars */}
                        <div className="relative z-10 pt-6 border-t border-slate-200/80">
                            <span className="block text-[10px] font-mono-tech font-bold uppercase tracking-widest text-slate-400 mb-3">
                                Accountability Criteria
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {[
                                    "Zero Warranty Failures",
                                    "100% IRC / MORTH Adherence",
                                    "94% On-Time Record",
                                ].map((pillar) => (
                                    <div
                                        key={pillar}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs font-mono-tech text-[#0d1b2e] font-semibold"
                                    >
                                        <Award size={13} className="text-[#c88a22] shrink-0" />
                                        <span className="truncate">{pillar}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Tilt3DCard>
            </motion.div>
        </div>
    );
}
