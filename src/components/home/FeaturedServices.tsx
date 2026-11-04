"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/data/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import {
    HighwayIcon,
    BridgeSpanIcon,
    CivicBuildingIcon,
    CaliperIcon,
} from "@/components/ui/ArchitecturalIcons";

const featured = services.slice(0, 4);

const iconMap = [
    HighwayIcon,
    BridgeSpanIcon,
    CivicBuildingIcon,
    CaliperIcon,
];

export function FeaturedServices() {
    return (
        <section className="section-padding bg-white border-b border-slate-200/80">
            <div className="container-site">
                {/* Header */}
                <MotionWrapper direction="up">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div>
                            <SectionLabel>Core Capabilities</SectionLabel>
                            <h2 className="section-heading">
                                Civil <span>Specializations</span>
                            </h2>
                            <p className="section-subheading mt-3">
                                Over a decade of specialized civil engineering, focused entirely on
                                Tamil Nadu&apos;s government infrastructure requirements.
                            </p>
                        </div>
                        <Link
                            href="/services"
                            className="btn btn-outline shrink-0 self-start sm:self-auto group"
                        >
                            <span>Technical Breakdown</span>
                            <ArrowRight
                                size={14}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </MotionWrapper>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((svc, i) => {
                        const IconComponent = iconMap[i % iconMap.length];

                        return (
                            <MotionWrapper key={svc.id} direction="up" delay={i * 0.08} className="h-full">
                                <Tilt3DCard maxTilt={6} className="h-full">
                                    <div className="group flex flex-col h-full rounded-2xl bg-[#FAF9F6] border border-slate-200/90 p-7 shadow-matte-sm hover:shadow-matte-md hover:border-slate-300 transition-all duration-300">
                                        {/* Icon Header */}
                                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                                            <IconComponent size={22} className="text-[#0d1b2e]" />
                                        </div>

                                        {/* Category tag */}
                                        <div className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#185FA5] mb-2">
                                            {svc.category}
                                        </div>

                                        {/* Title */}
                                        <h3
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-2xl font-bold text-[#0d1b2e] group-hover:text-[#185FA5] transition-colors leading-tight mb-3"
                                        >
                                            {svc.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs text-slate-600 leading-relaxed flex-1 mb-5">
                                            {svc.description.substring(0, 115)}…
                                        </p>

                                        {/* Capabilities Preview List */}
                                        <div className="mb-6 pt-4 border-t border-slate-200/70 flex flex-col gap-2">
                                            {svc.capabilities.slice(0, 3).map((cap) => (
                                                <div
                                                    key={cap}
                                                    className="text-xs text-slate-600 flex items-start gap-2"
                                                >
                                                    <CheckCircle2
                                                        size={12}
                                                        className="mt-0.5 text-[#185FA5] shrink-0"
                                                    />
                                                    <span className="line-clamp-1">{cap}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Link */}
                                        <Link
                                            href={`/services#${svc.id}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#185FA5] group-hover:text-[#0d1b2e] transition-colors mt-auto"
                                        >
                                            <span>Technical Specs</span>
                                            <ArrowRight
                                                size={13}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </Link>
                                    </div>
                                </Tilt3DCard>
                            </MotionWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
