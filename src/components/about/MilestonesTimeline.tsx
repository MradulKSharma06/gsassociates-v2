"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { milestones } from "@/data/stats";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { Award, Compass, Flag, Shield, Building2, Sparkles } from "lucide-react";

const milestoneIcons = [Flag, Compass, Shield, Award, Building2, Sparkles];

export function MilestonesTimeline() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 50%"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div ref={containerRef} className="relative py-8">
            {/* Background static track */}
            <div className="absolute left-6 lg:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-slate-200" />

            {/* Dynamic laser progress line (draws down as user scrolls) */}
            <motion.div
                style={{ scaleY, originY: 0 }}
                className="absolute left-6 lg:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#185FA5] via-[#2563eb] to-[#c88a22] z-0"
            />

            <div className="flex flex-col gap-10 sm:gap-14 relative z-10">
                {milestones.map((m, i) => {
                    const isEven = i % 2 === 0;
                    const Icon = milestoneIcons[i % milestoneIcons.length];

                    return (
                        <div
                            key={m.year}
                            className={`flex items-start gap-6 lg:gap-0 relative ${
                                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                            }`}
                        >
                            {/* Animated Node Anchor on the Timeline Track */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                                className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#185FA5] shadow-[0_0_0_4px_#e0f2fe,0_2px_8px_rgba(24,95,165,0.25)] flex items-center justify-center z-20 top-4"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-[#185FA5]" />
                            </motion.div>

                            {/* Milestone Card Container */}
                            <motion.div
                                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`ml-14 lg:ml-0 lg:w-[calc(50%-2.5rem)] ${
                                    isEven ? "lg:mr-auto" : "lg:ml-auto"
                                }`}
                            >
                                <Tilt3DCard maxTilt={5}>
                                    <div className="p-6 sm:p-7 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-matte-sm hover:shadow-matte-md hover:border-slate-300 hover:bg-white/95 transition-all group">
                                        <div className="flex items-center justify-between mb-3">
                                            {/* Glowing Year Stamp */}
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#c88a22] animate-pulse" />
                                                <span className="font-mono text-xs font-bold text-[#185FA5] tracking-wider">
                                                    YEAR {m.year}
                                                </span>
                                            </div>

                                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0d1b2e] group-hover:scale-110 transition-transform">
                                                <Icon size={15} className="text-[#185FA5]" />
                                            </div>
                                        </div>

                                        <h3
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-2xl font-bold uppercase text-[#0d1b2e] tracking-tight mb-2 group-hover:text-[#185FA5] transition-colors"
                                        >
                                            {m.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                            {m.desc}
                                        </p>

                                        {/* Subtle CAD station datum watermark */}
                                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                                            <span>MILESTONE STA 0{i + 1}</span>
                                            <span>VERIFIED PWD RECORD</span>
                                        </div>
                                    </div>
                                </Tilt3DCard>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
