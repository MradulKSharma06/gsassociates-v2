"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { ArrowRight, MapPin, Building2, CheckCircle2 } from "lucide-react";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

const featured = projects.filter((p) => p.featured).slice(0, 3);
const flagship = featured[0];
const subFeatured = featured.slice(1, 3);

const categoryColors: Record<string, string> = {
    "Road & Highway": "var(--color-blue-primary)",
    "Bridges & Flyovers": "var(--color-navy-700)",
    "Government Buildings": "var(--color-gold)",
    "Water Infrastructure": "#1a6690",
    "Urban Development": "#2d7a6c",
};

export function FeaturedProjects() {
    return (
        <section
            className="section-padding"
            style={{ background: "var(--color-page-bg)" }}
        >
            <div className="container-site">
                {/* Header */}
                <MotionWrapper direction="up">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div>
                            <SectionLabel>Civil Infrastructure Portfolio</SectionLabel>
                            <h2 className="section-heading">
                                Landmark <span>Projects</span>
                            </h2>
                            <p className="section-subheading mt-3">
                                High-capacity highways, civic landmarks, and heavy structural crossings
                                delivered across Tamil Nadu.
                            </p>
                        </div>
                        <Link
                            href="/projects"
                            className="btn btn-outline shrink-0 self-start sm:self-auto group"
                        >
                            <span>Explore Full Portfolio</span>
                            <ArrowRight
                                size={14}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </MotionWrapper>

                {/* Flagship Hero Card */}
                {flagship && (
                    <MotionWrapper direction="up" delay={0.1} className="mb-6">
                        <Link
                            href={`/projects/${flagship.slug}`}
                            className="group block rounded-card border bg-white overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                            style={{ borderColor: "var(--color-border)" }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12">
                                {/* Banner Visual Side */}
                                <div
                                    className="lg:col-span-5 relative p-8 flex flex-col justify-between overflow-hidden min-h-[260px]"
                                    style={{
                                        background: "linear-gradient(135deg, #0d1b2e 0%, #185FA5 100%)",
                                    }}
                                >
                                    {/* Architectural CAD Grid */}
                                    <svg
                                        className="absolute inset-0 w-full h-full opacity-10"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden
                                    >
                                        <defs>
                                            <pattern
                                                id="flagshipGrid"
                                                width="30"
                                                height="30"
                                                patternUnits="userSpaceOnUse"
                                            >
                                                <path
                                                    d="M 30 0 L 0 0 0 30"
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="0.5"
                                                />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#flagshipGrid)" />
                                    </svg>

                                    <div className="relative z-10 flex items-center justify-between">
                                        <Badge variant="gold">Flagship Project</Badge>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/70">
                                            {flagship.year}
                                        </span>
                                    </div>

                                    <div className="relative z-10 my-6">
                                        <div className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-1">
                                            Project Value
                                        </div>
                                        <div
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide drop-shadow"
                                        >
                                            {flagship.value}
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex items-center gap-2 text-xs text-white/80">
                                        <Building2 size={13} className="shrink-0 text-gold" />
                                        <span className="truncate">{flagship.client}</span>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="blue">{flagship.category}</Badge>
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                                <CheckCircle2 size={10} />
                                                {flagship.status}
                                            </span>
                                        </div>

                                        <h3
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-2xl sm:text-3xl font-bold text-navy group-hover:text-blue-primary transition-colors leading-tight mb-4"
                                        >
                                            {flagship.title}
                                        </h3>

                                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                            {flagship.description}
                                        </p>

                                        {/* Highlights list */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                                            {flagship.highlights.slice(0, 4).map((h, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2 text-xs text-slate-700"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-primary shrink-0" />
                                                    <span>{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <MapPin size={13} className="text-slate-400" />
                                            <span>{flagship.location}</span>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-primary group-hover:text-blue-bright transition-colors">
                                            <span>Read Project Dossier</span>
                                            <ArrowRight
                                                size={14}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </MotionWrapper>
                )}

                {/* Secondary Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subFeatured.map((project, idx) => {
                        const accentColor =
                            categoryColors[project.category] ?? "var(--color-blue-primary)";

                        return (
                            <MotionWrapper key={project.id} direction="up" delay={0.15 + idx * 0.1}>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group flex flex-col h-full rounded-card border bg-white overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                                    style={{ borderColor: "var(--color-border)" }}
                                >
                                    <div
                                        className="h-36 relative p-6 flex flex-col justify-between overflow-hidden"
                                        style={{
                                            background: `linear-gradient(135deg, ${accentColor}dd 0%, #0d1b2e 100%)`,
                                        }}
                                    >
                                        <div className="flex items-center justify-between z-10">
                                            <Badge variant="navy">{project.category}</Badge>
                                            <span className="text-xs font-extrabold text-white tracking-wider">
                                                {project.value}
                                            </span>
                                        </div>
                                        <span
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="absolute bottom-2 right-4 text-6xl font-extrabold text-white/10 select-none pointer-events-none"
                                        >
                                            0{idx + 2}
                                        </span>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1 justify-between">
                                        <div>
                                            <h3
                                                style={{ fontFamily: "var(--font-condensed)" }}
                                                className="text-xl font-bold text-navy group-hover:text-blue-primary transition-colors leading-tight mb-2.5"
                                            >
                                                {project.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                            <span className="flex items-center gap-1.5 truncate">
                                                <MapPin size={12} className="text-slate-400" />
                                                {project.location}
                                            </span>
                                            <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-blue-primary group-hover:text-blue-bright transition-colors shrink-0">
                                                <span>View Dossier</span>
                                                <ArrowRight
                                                    size={13}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </MotionWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
