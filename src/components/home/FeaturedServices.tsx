"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/data/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

const accentColors = {
    blue: {
        bar: "var(--color-blue-primary)",
        badge: "bg-blue-50 text-blue-700 border-blue-200",
    },
    navy: {
        bar: "var(--color-navy-700)",
        badge: "bg-slate-100 text-navy border-slate-200",
    },
    gold: {
        bar: "var(--color-gold)",
        badge: "bg-amber-50 text-amber-800 border-amber-200",
    },
};

const featured = services.slice(0, 4);

export function FeaturedServices() {
    return (
        <section
            className="section-padding"
            style={{ background: "var(--color-surface)" }}
        >
            <div className="container-site">
                {/* Header */}
                <MotionWrapper direction="up">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div>
                            <SectionLabel>Core Capabilities</SectionLabel>
                            <h2 className="section-heading">
                                Engineering <span>Services</span>
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
                            <span>All Capabilities</span>
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
                        const accent = accentColors[svc.accentColor];
                        return (
                            <MotionWrapper key={svc.id} direction="up" delay={i * 0.08}>
                                <div
                                    className="group flex flex-col h-full rounded-card border bg-white overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 relative"
                                    style={{ borderColor: "var(--color-border)" }}
                                >
                                    {/* Top accent bar */}
                                    <div className="h-[3px] w-full" style={{ background: accent.bar }} />

                                    <div className="p-6 flex flex-col flex-1">
                                        {/* Category tag */}
                                        <div className="mb-4">
                                            <span
                                                className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border ${accent.badge}`}
                                            >
                                                {svc.category}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-2xl font-bold text-navy group-hover:text-blue-primary transition-colors leading-tight mb-3"
                                        >
                                            {svc.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs text-slate-600 leading-relaxed flex-1 mb-5">
                                            {svc.description.substring(0, 115)}…
                                        </p>

                                        {/* Capabilities preview */}
                                        <div className="mb-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                                            {svc.capabilities.slice(0, 3).map((cap) => (
                                                <div
                                                    key={cap}
                                                    className="text-xs text-slate-600 flex items-start gap-2"
                                                >
                                                    <CheckCircle2
                                                        size={12}
                                                        className="mt-0.5 text-blue-primary shrink-0"
                                                    />
                                                    <span className="line-clamp-1">{cap}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Link */}
                                        <Link
                                            href={`/services#${svc.id}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-primary group-hover:text-blue-bright transition-colors mt-auto"
                                        >
                                            <span>Technical Specs</span>
                                            <ArrowRight
                                                size={13}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </MotionWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
