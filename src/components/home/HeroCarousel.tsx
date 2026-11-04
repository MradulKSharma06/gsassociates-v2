"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, ChevronDown, CheckCircle2 } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";
import { motion } from "framer-motion";

export function HeroCarousel() {
    return (
        <section className="relative overflow-hidden bg-transparent border-b border-slate-200/80 blueprint-grid pt-10 pb-20 sm:pt-16 sm:pb-28">
            <div className="container-site relative z-10 text-center">
                {/* 1. Official Accreditation Eyebrow Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 text-[#0d1b2e] text-xs font-mono-tech shadow-matte-sm mb-8 select-none"
                >
                    <span className="w-2 h-2 rounded-full bg-[#c88a22] animate-pulse" />
                    <span className="font-semibold tracking-wider uppercase">
                        Class A Contractor · Tamil Nadu PWD &amp; NHAI Empanelled
                    </span>
                </motion.div>

                {/* 2. Monumental Kinetic Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                    style={{ fontFamily: "var(--font-condensed)" }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase text-[#0d1b2e] leading-[0.94] tracking-tight max-w-5xl mx-auto mb-6"
                >
                    Engineering Civil
                    <br />
                    <span className="text-[#185FA5]">Infrastructure</span>
                    <br />
                    Built To Endure
                </motion.h1>

                {/* 3. Refined Editorial Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                    className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-10"
                >
                    Over a decade delivering Tamil Nadu&apos;s landmark arterial expressways,
                    structural grade separators, and civic complexes — engineered to the highest
                    IRC criteria with zero warranty failures.
                </motion.p>

                {/* 4. Handcrafted Tactile Capsule Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-14"
                >
                    <ArchitecturalButton href="/projects" variant="primary" size="lg">
                        <span>Explore 200+ Projects</span>
                        <ArrowRight size={15} className="ml-1" />
                    </ArchitecturalButton>
                    <ArchitecturalButton href="/contact" variant="wireframe" size="lg">
                        <span>Submit Tender Inquiry</span>
                    </ArchitecturalButton>
                </motion.div>

                {/* 5. Translucent Frosted Trust & Telemetry Dock */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
                    className="max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-matte-md grid grid-cols-2 sm:grid-cols-4 gap-6 text-center select-none"
                >
                    <div className="flex flex-col">
                        <span
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] leading-none"
                        >
                            ₹500 Cr+
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-wider text-slate-500 mt-1">
                            Delivered Value
                        </span>
                    </div>

                    <div className="flex flex-col border-l border-slate-200/60 pl-6">
                        <span
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] leading-none"
                        >
                            200+
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-wider text-slate-500 mt-1">
                            Govt. Packages
                        </span>
                    </div>

                    <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-4 sm:pt-0 sm:pl-6">
                        <span
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-3xl sm:text-4xl font-extrabold text-[#185FA5] leading-none"
                        >
                            94%
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-wider text-slate-500 mt-1">
                            On-Time Adherence
                        </span>
                    </div>

                    <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-4 sm:pt-0 sm:pl-6">
                        <span
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-3xl sm:text-4xl font-extrabold text-[#c88a22] leading-none"
                        >
                            100%
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-wider text-slate-500 mt-1">
                            IRC Compliance
                        </span>
                    </div>
                </motion.div>

                {/* 6. Subtle Kinetic Scroll Prompt */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-14 inline-flex flex-col items-center gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-widest select-none"
                >
                    <span>Scroll to Witness Bridge Construction</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    >
                        <ChevronDown size={14} className="text-[#185FA5]" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
