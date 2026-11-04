"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ShieldCheck, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSlide {
    id: number;
    tag: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    stat: { label: string; value: string };
    watermark: string;
    gradient: string;
}

const slides: HeroSlide[] = [
    {
        id: 1,
        tag: "10+ Years of Excellence · Tamil Nadu",
        title: "Engineering Civil Infrastructure",
        titleAccent: "Built to Endure",
        subtitle:
            "Government-grade construction across arterial expressways, civic headquarters, and high-load bridges — executed with precision engineering standards.",
        stat: { value: "₹500+ Cr", label: "Infrastructure Delivered" },
        watermark: "PRECISION",
        gradient: "linear-gradient(135deg, #0d1b2e 0%, #163254 60%, #102640 100%)",
    },
    {
        id: 2,
        tag: "Highways & Expressways",
        title: "Connecting Districts With",
        titleAccent: "High-Capacity Corridors",
        subtitle:
            "Empanelled contractor to Tamil Nadu Highways, NHAI, and TNRDC. Over 200+ lane kilometres of state and national highways completed on schedule.",
        stat: { value: "200+ km", label: "Highways & Corridors" },
        watermark: "HIGHWAYS",
        gradient: "linear-gradient(135deg, #07192b 0%, #1a3c63 60%, #0d2642 100%)",
    },
    {
        id: 3,
        tag: "Bridges & Grade Separators",
        title: "Heavy Structural Engineering",
        titleAccent: "To IRC Standards",
        subtitle:
            "Flyovers, river crossings, and multi-tier grade separators engineered to the highest Indian Roads Congress (IRC) structural criteria.",
        stat: { value: "99.4%", label: "Tender Quality Compliance" },
        watermark: "STRUCTURES",
        gradient: "linear-gradient(135deg, #091a2e 0%, #133966 60%, #0c2847 100%)",
    },
];

const AUTOPLAY_INTERVAL = 6000;

export function HeroCarousel() {
    const [active, setActive] = useState(0);

    const next = useCallback(() => {
        setActive((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setActive((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, AUTOPLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [next]);

    const currentSlide = slides[active];

    return (
        <section
            className="relative w-full overflow-hidden bg-navy flex items-center"
            style={{ minHeight: "clamp(580px, 86vh, 820px)" }}
        >
            {/* Background Transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                    style={{ background: currentSlide.gradient }}
                >
                    {/* CAD Blueprint Grid Pattern */}
                    <svg
                        className="absolute inset-0 w-full h-full opacity-[0.05]"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                    >
                        <defs>
                            <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                                <circle cx="60" cy="0" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#heroGrid)" />
                    </svg>

                    {/* Architectural Ambient Glow */}
                    <div
                        className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none"
                        style={{ background: "rgba(55, 138, 221, 0.18)" }}
                    />

                    {/* Watermark Typographic Accent */}
                    <div
                        className="absolute inset-0 flex items-center justify-end pr-8 sm:pr-16 pointer-events-none select-none overflow-hidden"
                        aria-hidden
                    >
                        <span
                            style={{
                                fontFamily: "var(--font-condensed)",
                                fontSize: "clamp(90px, 15vw, 210px)",
                                fontWeight: 800,
                                color: "rgba(255,255,255,0.024)",
                                textTransform: "uppercase",
                                letterSpacing: "8px",
                                lineHeight: 1,
                            }}
                        >
                            {currentSlide.watermark}
                        </span>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="container-site relative z-10 w-full py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Heading, Subtitle & Actions */}
                    <div className="lg:col-span-8">
                        {/* Live Government Accreditation Pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold backdrop-blur-sm mb-6">
                            <ShieldCheck size={14} className="text-gold" />
                            <span>Class A Contractor · Tamil Nadu PWD & NHAI</span>
                        </div>

                        {/* Animated Slide Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide.id}
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Slide Tag */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-[2px] w-8 bg-gold" />
                                    <span className="text-[11px] font-bold tracking-[3px] uppercase text-gold">
                                        {currentSlide.tag}
                                    </span>
                                </div>

                                {/* Main Heading */}
                                <h1
                                    style={{
                                        fontFamily: "var(--font-condensed)",
                                        fontSize: "clamp(44px, 6.8vw, 84px)",
                                        fontWeight: 800,
                                        color: "#ffffff",
                                        textTransform: "uppercase",
                                        letterSpacing: "1.5px",
                                        lineHeight: 1.02,
                                    }}
                                    className="max-w-[780px]"
                                >
                                    {currentSlide.title}
                                    <br />
                                    <span style={{ color: "var(--color-blue-bright)" }}>
                                        {currentSlide.titleAccent}
                                    </span>
                                </h1>

                                {/* Subtitle */}
                                <p
                                    className="mt-6 mb-8 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-[560px]"
                                    style={{ color: "#95b8d8" }}
                                >
                                    {currentSlide.subtitle}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <Link href="/projects" className="btn btn-primary btn-lg shadow-btn group">
                                <span>Explore Projects</span>
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                            <Link href="/contact" className="btn btn-outline-white btn-lg">
                                Submit Tender Inquiry
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Dynamic Engineering Telemetry Card */}
                    <div className="hidden lg:flex lg:col-span-4 justify-end">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide.id}
                                initial={{ opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.94 }}
                                transition={{ duration: 0.4 }}
                                className="w-full max-w-xs p-6 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
                                <div className="text-[10px] font-bold tracking-widest uppercase text-blue-300 mb-1">
                                    Project Telemetry
                                </div>
                                <div
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-4xl font-extrabold text-white tracking-wide mb-1"
                                >
                                    {currentSlide.stat.value}
                                </div>
                                <div className="text-xs text-slate-300 font-medium mb-4">
                                    {currentSlide.stat.label}
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                                    <span>TNPWD Empanelled</span>
                                    <span className="text-gold font-bold">100% On-Time</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Bottom Controls: Previous/Next Arrows & Indicators */}
            <div className="absolute bottom-6 left-0 right-0 z-30">
                <div className="container-site flex items-center justify-between">
                    {/* Slide Dots */}
                    <div className="flex items-center gap-2.5">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActive(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={cn(
                                    "transition-all duration-300 rounded-full",
                                    idx === active
                                        ? "w-8 h-2 bg-blue-bright"
                                        : "w-2.5 h-2 bg-white/30 hover:bg-white/60"
                                )}
                            />
                        ))}
                    </div>

                    {/* Prev / Next Arrows */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevSlide}
                            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={next}
                            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Smooth Top-of-Slide Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/10">
                <div
                    key={active}
                    className="h-full bg-blue-bright origin-left"
                    style={{
                        animation: `heroProgress ${AUTOPLAY_INTERVAL}ms linear forwards`,
                    }}
                />
            </div>

            <style>{`
                @keyframes heroProgress {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
            `}</style>
        </section>
    );
}
