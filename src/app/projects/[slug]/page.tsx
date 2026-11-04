import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ArrowLeft, MapPin, Building2, Clock, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return { title: "Project Not Found" };
    return {
        title: project.title,
        description: project.description,
    };
}

export default function ProjectDetailPage({ params }: Props) {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) notFound();

    const related = projects
        .filter((p) => p.category === project.category && p.id !== project.id)
        .slice(0, 2);

    return (
        <>
            {/* Top Architectural Header */}
            <section className="relative bg-[#FAF9F6] border-b border-slate-200/80 py-12 lg:py-16 blueprint-grid">
                <div className="container-site relative z-10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-slate-500 hover:text-[#0d1b2e] mb-6 transition-colors"
                    >
                        <ArrowLeft size={13} /> Return to Portfolio
                    </Link>

                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        <Badge variant={project.category === "Government Buildings" ? "gold" : "blue"}>
                            {project.category}
                        </Badge>
                        <span className="badge badge-green">
                            <CheckCircle2 size={11} className="mr-1" />
                            {project.status}
                        </span>
                        <span className="text-xs font-mono-tech text-slate-400">
                            ID: {project.id.toUpperCase()}
                        </span>
                    </div>

                    <h1
                        style={{ fontFamily: "var(--font-condensed)" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] uppercase tracking-tight leading-tight max-w-4xl"
                    >
                        {project.title}
                    </h1>
                </div>
            </section>

            {/* Dossier Content & Sticky Spec Sheet */}
            <section className="section-padding bg-white border-b border-slate-200/80">
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left: Project Narrative & Highlights */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* CAD Elevation Banner */}
                            <div className="rounded-2xl border border-slate-200 bg-[#F4F5F7] p-8 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                                <svg
                                    className="absolute inset-0 w-full h-full opacity-25"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                >
                                    <defs>
                                        <pattern id="dossierCad" width="28" height="28" patternUnits="userSpaceOnUse">
                                            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#0d1b2e" strokeWidth="0.4" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#dossierCad)" />
                                </svg>

                                <div className="relative z-10 flex items-center justify-between">
                                    <span className="text-xs font-mono-tech text-slate-500 uppercase">
                                        Architectural Blueprint Elevation
                                    </span>
                                    <span className="text-xs font-mono-tech text-[#c88a22] font-bold">
                                        IRC:SP:84-2014
                                    </span>
                                </div>

                                <div className="relative z-10 my-8">
                                    <div className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-500 mb-1">
                                        Total Executed Contract Value
                                    </div>
                                    <div
                                        style={{ fontFamily: "var(--font-condensed)" }}
                                        className="text-5xl sm:text-6xl font-extrabold text-[#0d1b2e] tracking-tight"
                                    >
                                        {project.value}
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-center gap-2 text-xs font-mono-tech text-slate-600">
                                    <Building2 size={13} className="text-[#185FA5]" />
                                    <span>Client Authority: {project.client}</span>
                                </div>
                            </div>

                            {/* Overview Narrative */}
                            <div>
                                <SectionLabel>Project Scope & Engineering</SectionLabel>
                                <h2 className="section-heading mb-4 text-3xl">
                                    Executive <span>Overview</span>
                                </h2>
                                <p className="text-base text-slate-700 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Key Highlights Checklist */}
                            <div>
                                <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-500 mb-4">
                                    Structural Deliverables & Metrics
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {project.highlights.map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-4 rounded-xl bg-[#FAF9F6] border border-slate-200"
                                        >
                                            <CheckCircle2 size={16} className="text-[#185FA5] shrink-0" />
                                            <span className="text-xs font-semibold text-slate-700 font-sans">
                                                {h}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Sticky Executive Spec Sheet */}
                        <div className="lg:col-span-4">
                            <div className="rounded-2xl border border-slate-200 bg-[#FAF9F6] p-7 shadow-matte-sm sticky top-28 space-y-6">
                                <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
                                    <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#0d1b2e]">
                                        Tender Dossier Specs
                                    </span>
                                    <ShieldCheck size={16} className="text-[#c88a22]" />
                                </div>

                                <div className="space-y-4 text-xs font-mono-tech">
                                    <div>
                                        <div className="text-slate-400 text-[10px] uppercase">Client Department</div>
                                        <div className="text-[#0d1b2e] font-bold text-sm font-sans mt-0.5">{project.client}</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] uppercase">District Location</div>
                                        <div className="text-[#0d1b2e] font-semibold mt-0.5">{project.location}</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] uppercase">Execution Period</div>
                                        <div className="text-[#0d1b2e] font-semibold mt-0.5">{project.duration}</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] uppercase">Completion Year</div>
                                        <div className="text-[#0d1b2e] font-semibold mt-0.5">{project.year}</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] uppercase">Contractor Status</div>
                                        <div className="text-emerald-700 font-bold mt-0.5">Class A · Verified Handover</div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-200">
                                    <ArchitecturalButton href="/contact" variant="primary" size="md" className="w-full justify-center">
                                        Inquire on Similar Works
                                    </ArchitecturalButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {related.length > 0 && (
                <section className="section-padding-sm bg-[#FAF9F6] border-b border-slate-200/80">
                    <div className="container-site">
                        <h3 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-slate-500 mb-6">
                            Related Infrastructure Works
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {related.map((r) => (
                                <Link
                                    key={r.id}
                                    href={`/projects/${r.slug}`}
                                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-matte-sm hover:shadow-matte-md hover:border-slate-300 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="text-xs font-mono-tech text-[#185FA5] font-bold uppercase mb-2">
                                            {r.category}
                                        </div>
                                        <h4
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-2xl font-bold text-[#0d1b2e] leading-snug mb-2"
                                        >
                                            {r.title}
                                        </h4>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono-tech text-slate-500">
                                        <span>{r.location}</span>
                                        <span className="font-bold text-[#0d1b2e]">{r.value}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <CtaBanner />
        </>
    );
}
