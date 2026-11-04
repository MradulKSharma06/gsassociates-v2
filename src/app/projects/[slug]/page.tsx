import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ArrowLeft, MapPin, Building2, Clock, Calendar, CheckCircle2 } from "lucide-react";

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
            {/* Hero */}
            <section
                className="relative section-padding-sm"
                style={{ background: "var(--color-navy)" }}
            >
                <div className="accent-bar absolute top-0 left-0 right-0" />
                <div className="container-site relative z-10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[1.5px] uppercase mb-6 transition-colors"
                        style={{ color: "#5a7a99" }}
                    >
                        <ArrowLeft size={13} /> Back to Projects
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant={project.category === "Government Buildings" ? "gold" : "blue"}>
                            {project.category}
                        </Badge>
                        <Badge variant={project.status === "Ongoing" ? "navy" : "green"}>
                            {project.status}
                        </Badge>
                    </div>

                    <h1
                        style={{
                            fontFamily: "var(--font-condensed)",
                            fontSize: "clamp(32px, 5vw, 60px)",
                            fontWeight: 800,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            lineHeight: 1.05,
                            maxWidth: "800px",
                        }}
                    >
                        {project.title}
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding" style={{ background: "var(--color-page-bg)" }}>
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                        {/* Left */}
                        <div>
                            {/* Project image placeholder */}
                            <div
                                className="rounded-card mb-8 flex items-center justify-center"
                                style={{
                                    height: "360px",
                                    background: "linear-gradient(135deg, var(--color-navy-700) 0%, var(--color-blue-primary) 100%)",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "var(--font-condensed)",
                                        fontSize: "80px",
                                        fontWeight: 800,
                                        color: "rgba(255,255,255,0.06)",
                                        letterSpacing: "4px",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    PHOTO
                                </span>
                            </div>

                            <SectionLabel>Project Overview</SectionLabel>
                            <h2 className="section-heading mb-4" style={{ fontSize: "clamp(22px, 3vw, 32px)" }}>
                                About This <span>Project</span>
                            </h2>
                            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "var(--color-text-body)" }}>
                                {project.description}
                            </p>

                            <h3
                                className="text-[10px] font-bold tracking-[2.5px] uppercase mb-4"
                                style={{ color: "var(--color-text-faint)" }}
                            >
                                Key Highlights
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.highlights.map((h) => (
                                    <div
                                        key={h}
                                        className="flex items-center gap-3 p-4 rounded-card border"
                                        style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
                                    >
                                        <CheckCircle2 size={16} className="shrink-0" style={{ color: "var(--color-blue-primary)" }} />
                                        <span className="text-[13px]" style={{ color: "var(--color-text-body)" }}>{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — Info sidebar */}
                        <div>
                            <div
                                className="rounded-card border sticky top-24"
                                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
                            >
                                <div className="p-6 border-b" style={{ borderColor: "var(--color-border)" }}>
                                    <h3
                                        className="text-[10px] font-bold tracking-[2.5px] uppercase mb-0"
                                        style={{ color: "var(--color-blue-primary)" }}
                                    >
                                        Project Details
                                    </h3>
                                </div>
                                <div className="p-6 flex flex-col gap-5">
                                    {[
                                        { icon: Building2, label: "Client", value: project.client },
                                        { icon: MapPin, label: "Location", value: project.location },
                                        { icon: Clock, label: "Duration", value: project.duration },
                                        { icon: Calendar, label: "Year", value: project.year },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div key={label} className="flex items-start gap-3">
                                            <div
                                                className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0"
                                                style={{ background: "var(--color-blue-pale)" }}
                                            >
                                                <Icon size={15} style={{ color: "var(--color-blue-primary)" }} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold tracking-[1.5px] uppercase" style={{ color: "var(--color-text-faint)" }}>
                                                    {label}
                                                </div>
                                                <div className="text-[13px] font-500 mt-0.5" style={{ color: "var(--color-text-body)" }}>
                                                    {value}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Value */}
                                    <div
                                        className="mt-2 p-4 rounded-card text-center"
                                        style={{ background: "var(--color-navy)" }}
                                    >
                                        <div className="text-[9px] font-bold tracking-[2px] uppercase" style={{ color: "#5a7a99" }}>
                                            Project Value
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: "var(--font-condensed)",
                                                fontSize: "36px",
                                                fontWeight: 800,
                                                color: "#fff",
                                                lineHeight: 1.1,
                                                marginTop: "4px",
                                            }}
                                        >
                                            {project.value}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 pb-6">
                                    <Link href="/contact" className="btn btn-primary w-full justify-center">
                                        Enquire About This Project
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related */}
                    {related.length > 0 && (
                        <div className="mt-16">
                            <h2 className="section-heading mb-6" style={{ fontSize: "clamp(22px, 3vw, 32px)" }}>
                                Related <span>Projects</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {related.map((rp) => (
                                    <Link key={rp.id} href={`/projects/${rp.slug}`} className="card-base p-5 block group">
                                        <Badge variant="blue" className="mb-3">{rp.category}</Badge>
                                        <h3
                                            className="group-hover:text-blue-primary transition-colors"
                                            style={{
                                                fontFamily: "var(--font-condensed)",
                                                fontSize: "18px",
                                                fontWeight: 700,
                                                color: "var(--color-text-primary)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.5px",
                                                marginBottom: "6px",
                                            }}
                                        >
                                            {rp.title}
                                        </h3>
                                        <p className="text-[12px]" style={{ color: "var(--color-text-muted)" }}>
                                            {rp.client} · {rp.value}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <CtaBanner />
        </>
    );
}