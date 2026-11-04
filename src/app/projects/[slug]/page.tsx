import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ArrowLeft, MapPin, Building2, Clock, Calendar, CheckCircle2, ShieldCheck, FileCheck, Layers, Award } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";

interface Props {
    params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for BOTH slug and project ID (e.g. /projects/proj-001 & /projects/chennai-tambaram-elevated-expressway)
 */
export async function generateStaticParams() {
    const slugParams = projects.map((p) => ({ slug: p.slug }));
    const idParams = projects.map((p) => ({ slug: p.id }));
    return [...slugParams, ...idParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find(
        (p) => p.slug === slug || (p.id && p.id.toLowerCase() === slug?.toLowerCase())
    );
    if (!project) return { title: "Project Not Found" };
    return {
        title: `${project.title} | GSAssociates Dossier ${project.id.toUpperCase()}`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = projects.find(
        (p) => p.slug === slug || (p.id && p.id.toLowerCase() === slug?.toLowerCase())
    );
    if (!project) notFound();

    const related = projects
        .filter((p) => p.category === project.category && p.id !== project.id)
        .slice(0, 2);

    return (
        <>
            {/* Top Architectural Header */}
            <section className="relative bg-[#FAF9F6] border-b border-slate-200/80 pt-8 pb-12 lg:pt-10 lg:pb-16 blueprint-grid">
                <div className="container-site relative z-10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-slate-500 hover:text-[#0d1b2e] mb-6 transition-colors"
                    >
                        <ArrowLeft size={13} /> Return to Portfolio
                    </Link>

                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-mono-tech font-bold uppercase tracking-wider bg-[#185FA5]/10 text-[#185FA5] border border-[#185FA5]/20">
                            {project.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-tech font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 size={12} />
                            {project.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono-tech font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                            ID: {project.id.toUpperCase()}
                        </span>
                    </div>

                    <h1
                        style={{ fontFamily: "var(--font-condensed)" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] uppercase tracking-tight leading-[0.98] max-w-4xl"
                    >
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-200/80 text-xs font-mono-tech text-slate-600">
                        <div className="flex items-center gap-1.5">
                            <Building2 size={14} className="text-[#185FA5]" />
                            <span className="font-semibold text-[#0d1b2e]">{project.client}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-[#c88a22]" />
                            <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-slate-400" />
                            <span>Fiscal Year: {project.year}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dossier Content & Sticky Spec Sheet */}
            <section className="section-padding bg-white border-b border-slate-200/80">
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left: Project Narrative & Highlights */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* CAD Elevation Banner */}
                            <div className="rounded-2xl border border-slate-200 bg-[#FAF9F6] p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-matte-sm">
                                <svg
                                    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                >
                                    <defs>
                                        <pattern id="dossierCad" width="28" height="28" patternUnits="userSpaceOnUse">
                                            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#185fa5" strokeWidth="0.5" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#dossierCad)" />
                                </svg>

                                <div className="relative z-10 flex items-center justify-between border-b border-slate-200/80 pb-3">
                                    <span className="text-xs font-mono-tech text-slate-500 uppercase font-semibold flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-[#185FA5]" />
                                        Official Engineering Contract Record
                                    </span>
                                    <span className="text-xs font-mono-tech text-[#c88a22] font-bold">
                                        IRC / PWD CLASS A
                                    </span>
                                </div>

                                <div className="relative z-10 my-8">
                                    <div className="text-[11px] font-mono-tech uppercase tracking-widest text-slate-500 mb-1">
                                        Total Executed Contract Value
                                    </div>
                                    <div
                                        style={{ fontFamily: "var(--font-condensed)" }}
                                        className="text-5xl sm:text-6xl font-extrabold text-[#0d1b2e] tracking-tight leading-none"
                                    >
                                        {project.value}
                                    </div>
                                </div>

                                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/80 text-xs font-mono-tech text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={15} className="text-[#185FA5]" />
                                        <span>Tender Notice Ref: NIT/{project.id.toUpperCase()}/{project.year}</span>
                                    </div>
                                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                                        Zero Warranty Claims
                                    </span>
                                </div>
                            </div>

                            {/* Overview Narrative */}
                            <div>
                                <SectionLabel>Project Scope &amp; Engineering</SectionLabel>
                                <h2 className="section-heading mb-4 text-3xl">
                                    Executive <span>Overview</span>
                                </h2>
                                <p className="text-base text-slate-700 leading-relaxed font-normal">
                                    {project.description}
                                </p>
                            </div>

                            {/* Key Highlights Checklist */}
                            <div>
                                <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-500 mb-4">
                                    Structural Deliverables &amp; Verified Quantities
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {project.highlights.map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-4 rounded-xl bg-[#FAF9F6] border border-slate-200 shadow-matte-sm"
                                        >
                                            <CheckCircle2 size={16} className="text-[#185FA5] shrink-0" />
                                            <span className="text-xs font-semibold text-slate-800 font-sans">
                                                {h}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Material & Statutory Specifications Sheet */}
                            <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-matte-sm">
                                <h3 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-[#0d1b2e] mb-4 flex items-center gap-2">
                                    <FileCheck size={15} className="text-[#185FA5]" />
                                    Statutory Material Criteria &amp; Testing Reports
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-tech">
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                                        <span className="text-slate-400 text-[10px] uppercase block">Structural Concrete</span>
                                        <span className="text-[#0d1b2e] font-bold text-sm block mt-0.5">M45 / M50 Design Mix</span>
                                        <span className="text-emerald-700 text-[10px] mt-1 block">28-Day Strength: Verified</span>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                                        <span className="text-slate-400 text-[10px] uppercase block">Reinforcement Steel</span>
                                        <span className="text-[#0d1b2e] font-bold text-sm block mt-0.5">Fe 550D TMT Bars</span>
                                        <span className="text-emerald-700 text-[10px] mt-1 block">Tensile &amp; Bend: Passed</span>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                                        <span className="text-slate-400 text-[10px] uppercase block">Third-Party Audit</span>
                                        <span className="text-[#0d1b2e] font-bold text-sm block mt-0.5">TNPWD / NHAI Lab</span>
                                        <span className="text-[#185FA5] text-[10px] mt-1 block">100% Quality Conformance</span>
                                    </div>
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
                                        <div className="text-slate-400 text-[10px] uppercase">Project Identification</div>
                                        <div className="text-[#0d1b2e] font-bold text-sm font-sans mt-0.5">{project.id.toUpperCase()}</div>
                                    </div>
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
                                    href={`/projects/${r.id}`}
                                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-matte-sm hover:shadow-matte-md hover:border-slate-300 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="text-xs font-mono-tech text-[#185FA5] font-bold uppercase mb-2">
                                            {r.category} · {r.id.toUpperCase()}
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
