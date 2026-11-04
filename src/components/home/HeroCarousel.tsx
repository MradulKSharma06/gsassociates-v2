"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";
import { motion } from "framer-motion";

export function HeroCarousel() {
    return (
        <section className="relative overflow-hidden bg-transparent border-b border-slate-200/80 blueprint-grid min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] flex flex-col justify-between pt-3 pb-5 sm:pt-5 sm:pb-7">
            <div className="container-site relative z-10 text-center flex-1 flex flex-col justify-center items-center max-w-6xl mx-auto">
                {/* 1. Official Accreditation Eyebrow Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 text-[#0d1b2e] text-[11px] sm:text-xs font-mono-tech shadow-matte-sm mb-3 sm:mb-4 select-none"
                >
                    <span className="w-2 h-2 rounded-full bg-[#c88a22] animate-pulse" />
                    <span className="font-semibold tracking-wider uppercase">
                        Class A Contractor · Tamil Nadu PWD &amp; NHAI Empanelled
                    </span>
                </motion.div>

                {/* 2. Monumental Kinetic Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                    style={{ fontFamily: "var(--font-condensed)" }}
                    className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-[#0d1b2e] leading-[0.96] tracking-tight max-w-4xl mx-auto mb-3 sm:mb-4"
                >
                    Engineering Civil
                    <br />
                    <span className="text-[#185FA5]">Infrastructure</span>
                    <br />
                    Built To Endure
                </motion.h1>

                {/* 3. Refined Editorial Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                    className="text-xs sm:text-sm lg:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-5 sm:mb-6"
                >
                    Over a decade delivering Tamil Nadu&apos;s landmark arterial expressways,
                    structural grade separators, and civic complexes — engineered to the highest
                    IRC criteria with zero warranty failures.
                </motion.p>

                {/* 4. Handcrafted Tactile Capsule Actions (Explicitly Visible Above The Fold) */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                    className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6"
                >
                    <ArchitecturalButton href="/projects" variant="primary" size="md">
                        <span>Explore 200+ Projects</span>
                        <ArrowRight size={14} className="ml-1" />
                    </ArchitecturalButton>
                    <ArchitecturalButton href="/contact" variant="wireframe" size="md">
                        <span>Submit Tender Inquiry</span>
                    </ArchitecturalButton>
                </motion.div>

                {/* 5. Translucent Frosted Trust & Telemetry Dock */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
                    className="w-full max-w-3xl mx-auto px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-matte-sm grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center select-none mb-3 sm:mb-4"
                >
                    <div className="flex flex-col">
                        <span
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-2xl sm:text-3xl font-extrabold text-[#0d1b2e] leading-none"
                        >
                            ₹500 Cr+
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 mt-1">
                            Delivered Value
                        </span>
                    </div>

                    <div className="flex flex-col border-l border-slate-200/60 pl-3 sm:pl-4">
                        <span
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-2xl sm:text-3xl font-extrabold text-[#0d1b2e] leading-none"
                        >
                            200+
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 mt-1">
                            Govt. Packages
                        </span>
                    </div>

                    <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-2 sm:pt-0 sm:pl-4">
                        <span
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-2xl sm:text-3xl font-extrabold text-[#185FA5] leading-none"
                        >
                            94%
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 mt-1">
                            On-Time Adherence
                        </span>
                    </div>

                    <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-2 sm:pt-0 sm:pl-4">
                        <span
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-2xl sm:text-3xl font-extrabold text-[#c88a22] leading-none"
                        >
                            100%
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 mt-1">
                            IRC Compliance
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* 6. Kinetic Scroll Cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                onClick={() => {
                    const target = window.innerHeight * 0.85;
                    window.scrollTo({ top: target, behavior: "smooth" });
                }}
                className="w-full text-center inline-flex flex-col items-center gap-1 font-mono-tech text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest select-none cursor-pointer pt-1"
            >
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#185FA5] hover:text-[#0d1b2e] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5] animate-ping" />
                    <span>Scroll</span>
                </span>
                <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <ChevronDown size={15} className="text-[#185FA5]" />
                </motion.div>
            </motion.div>
        </section>
    );
}
