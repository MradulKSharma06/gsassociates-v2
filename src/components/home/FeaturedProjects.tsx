"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { ArrowRight, MapPin, Building2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";

const featured = projects.filter((p) => p.featured).slice(0, 3);
const flagship = featured[0];
const secondary = featured.slice(1, 3);

export function FeaturedProjects() {
    return (
        <section className="section-padding bg-transparent border-b border-slate-200/80 relative z-10">
            <div className="container-site">
                {/* Section Header */}
                <MotionWrapper direction="up">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div>
                            <SectionLabel>Civil Infrastructure Portfolio</SectionLabel>
                            <h2 className="section-heading">
                                Landmark <span>Projects</span>
                            </h2>
                            <p className="section-subheading mt-3">
                                High-capacity expressways, civic headquarters, and multi-tier grade
                                separators delivered across Tamil Nadu with zero structural defects.
                            </p>
                        </div>
                        <Link
                            href="/projects"
                            className="btn btn-outline shrink-0 self-start sm:self-auto group bg-white/80 backdrop-blur-md"
                        >
                            <span>All 200+ Projects</span>
                            <ArrowRight
                                size={14}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </MotionWrapper>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Flagship Card (Spans 7 Columns) */}
                    {flagship && (
                        <MotionWrapper direction="up" delay={0.08} className="lg:col-span-7">
                            <Tilt3DCard maxTilt={5} className="h-full">
                                <Link
                                    href={`/projects/${flagship.slug}`}
                                    className="group flex flex-col h-full rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-matte-sm hover:shadow-matte-lg hover:border-slate-300 hover:bg-white/90 transition-all duration-300 overflow-hidden"
                                >
                                {/* Top Technical CAD Blueprint Header */}
                                <div className="p-7 sm:p-9 bg-white/60 backdrop-blur-md border-b border-slate-200/80 relative overflow-hidden">
                                    {/* Blueprint CAD Fine Grid */}
                                    <svg
                                        className="absolute inset-0 w-full h-full opacity-30"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden
                                    >
                                        <defs>
                                            <pattern
                                                id="flagshipCad"
                                                width="24"
                                                height="24"
                                                patternUnits="userSpaceOnUse"
                                            >
                                                <path
                                                    d="M 24 0 L 0 0 0 24"
                                                    fill="none"
                                                    stroke="#0d1b2e"
                                                    strokeWidth="0.4"
                                                />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#flagshipCad)" />
                                    </svg>

                                    <div className="relative z-10 flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <span className="badge badge-gold">Flagship Project</span>
                                            <span className="badge badge-blue">{flagship.category}</span>
                                        </div>
                                        <span className="text-xs font-mono-tech text-slate-500">
                                            {flagship.year}
                                        </span>
                                    </div>

                                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                        <div>
                                            <div className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 mb-1">
                                                Tender Project Value
                                            </div>
                                            <div
                                                style={{ fontFamily: "var(--font-condensed)" }}
                                                className="text-4xl sm:text-5xl font-extrabold text-[#0d1b2e] tracking-tight"
                                            >
                                                {flagship.value}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 w-fit">
                                            <CheckCircle2 size={13} />
                                            <span>{flagship.status} · Verified Handover</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Body Content */}
                                <div className="p-7 sm:p-9 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-2xl sm:text-3xl font-bold text-[#0d1b2e] group-hover:text-[#185FA5] transition-colors leading-tight mb-3"
                                        >
                                            {flagship.title}
                                        </h3>

                                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                            {flagship.description}
                                        </p>

                                        {/* Highlights Pill Matrix */}
                                        <div className="grid grid-cols-2 gap-2.5 mb-6">
                                            {flagship.highlights.slice(0, 4).map((h, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 text-xs font-mono-tech text-slate-700"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#185FA5] shrink-0" />
                                                    <span className="truncate">{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                        <div className="flex items-center gap-1.5 truncate">
                                            <Building2 size={13} className="text-slate-400 shrink-0" />
                                            <span className="truncate">{flagship.client}</span>
                                        </div>
                                        <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[#185FA5] group-hover:text-[#0d1b2e] transition-colors shrink-0">
                                            <span>View Dossier</span>
                                            <ArrowUpRight size={13} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </Tilt3DCard>
                    </MotionWrapper>
                    )}

                    {/* Secondary 2 Cards (Spans 5 Columns in Stack) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {secondary.map((project, idx) => (
                            <MotionWrapper
                                key={project.id}
                                direction="up"
                                delay={0.12 + idx * 0.08}
                                className="flex-1"
                            >
                                <Tilt3DCard maxTilt={5} className="h-full">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="group flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-matte-sm hover:shadow-matte-lg hover:border-slate-300 hover:bg-white/90 transition-all duration-300"
                                    >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <Badge variant="blue">{project.category}</Badge>
                                            <span
                                                style={{ fontFamily: "var(--font-condensed)" }}
                                                className="text-2xl font-extrabold text-[#0d1b2e]"
                                            >
                                                {project.value}
                                            </span>
                                        </div>

                                        <h3
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-xl sm:text-2xl font-bold text-[#0d1b2e] group-hover:text-[#185FA5] transition-colors leading-snug mb-2"
                                        >
                                            {project.title}
                                        </h3>

                                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                        <span className="flex items-center gap-1.5 truncate">
                                            <MapPin size={12} className="text-slate-400 shrink-0" />
                                            <span className="truncate">{project.location}</span>
                                        </span>
                                        <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[#185FA5] group-hover:text-[#0d1b2e] transition-colors shrink-0">
                                            <span>Inspect Specs</span>
                                            <ArrowUpRight size={13} />
                                        </span>
                                    </div>
                                </Link>
                            </Tilt3DCard>
                        </MotionWrapper>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
