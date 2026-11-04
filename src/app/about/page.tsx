import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { team } from "@/data/stats";
import { CheckCircle2, Award, Shield, Users } from "lucide-react";
import { MilestonesTimeline } from "@/components/about/MilestonesTimeline";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "GSAssociates Construction — 10 years of delivering Tamil Nadu's roads, bridges, and government infrastructure with integrity and precision.",
};

const values = [
    {
        icon: Shield,
        title: "Quality First",
        desc: "Every structure we build meets or exceeds IRC and TNPWD specifications. Zero compromise on materials, workmanship, or safety.",
    },
    {
        icon: CheckCircle2,
        title: "On-Time Delivery",
        desc: "94% of our projects are delivered on or before scheduled completion. Time is public money — we treat it that way.",
    },
    {
        icon: Users,
        title: "Community Impact",
        desc: "We build infrastructure that serves millions. Every road, bridge, and building is a long-term investment in Tamil Nadu's citizens.",
    },
    {
        icon: Award,
        title: "Integrity",
        desc: "Transparent pricing, honest reporting, and accountable project management. We hold ourselves to the same standards we promise clients.",
    },
];

const certifications = [
    "ISO 9001:2015 — Quality Management",
    "ISO 14001:2015 — Environmental Management",
    "Class A Contractor — Tamil Nadu PWD",
    "Empanelled — NHAI",
    "Empanelled — TNRDC",
    "GRIHA Certified Projects",
];

export default function AboutPage() {
    return (
        <>
            {/* Architectural Page Hero */}
            <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#FAF9F6] border-b border-slate-200/80 blueprint-grid">
                <div className="container-site relative z-10">
                    <SectionLabel>Institutional Profile</SectionLabel>
                    <h1
                        style={{ fontFamily: "var(--font-condensed)" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] uppercase tracking-tight leading-none mt-2"
                    >
                        About <span className="text-[#185FA5]">GSAssociates</span>
                    </h1>
                    <p className="mt-4 text-base text-slate-600 max-w-xl font-normal">
                        Over a decade delivering Tamil Nadu&apos;s roads, bridges, and civic
                        infrastructure — with uncompromising engineering precision and public accountability.
                    </p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section-padding bg-white border-b border-slate-200/80">
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                            {
                                label: "Our Institutional Vision",
                                heading: "To be Tamil Nadu's premier infrastructure builder",
                                body: "We envision a Tamil Nadu where every citizen has access to world-class roads, reliable bridges, and dignified public buildings — built with integrity, built to endure.",
                                accentColor: "#185FA5",
                            },
                            {
                                label: "Our Core Mission",
                                heading: "Deliver government infrastructure with precision and pride",
                                body: "Our mission is to execute every public works contract with the highest standards of quality, safety, and timeliness — serving the Government of Tamil Nadu and its citizens with unwavering commitment.",
                                accentColor: "#c88a22",
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl p-8 border border-slate-200 bg-[#FAF9F6] shadow-matte-sm"
                                style={{ borderLeft: `4px solid ${item.accentColor}` }}
                            >
                                <div
                                    className="text-[10px] font-mono-tech font-bold tracking-widest uppercase mb-3"
                                    style={{ color: item.accentColor }}
                                >
                                    {item.label}
                                </div>
                                <h2
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-2xl sm:text-3xl font-extrabold text-[#0d1b2e] uppercase leading-tight mb-3"
                                >
                                    {item.heading}
                                </h2>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding bg-[#FAF9F6] border-b border-slate-200/80">
                <div className="container-site">
                    <div className="text-center mb-12">
                        <SectionLabel className="justify-center">Guiding Principles</SectionLabel>
                        <h2 className="section-heading">Core <span>Values</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div
                                    key={v.title}
                                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-matte-sm hover:shadow-matte-md transition-shadow"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 text-[#185FA5]">
                                        <Icon size={20} />
                                    </div>
                                    <h3
                                        style={{ fontFamily: "var(--font-condensed)" }}
                                        className="text-xl font-bold text-[#0d1b2e] uppercase mb-2"
                                    >
                                        {v.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {v.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Animated 10 Years of Milestones (Responsive Scroll Progression) */}
            <section id="milestones" className="section-padding bg-transparent border-b border-slate-200/80 relative z-10">
                <div className="container-site">
                    <div className="mb-12">
                        <SectionLabel>Institutional Growth</SectionLabel>
                        <h2 className="section-heading">
                            10 Years of <span>Milestones</span>
                        </h2>
                        <p className="section-subheading mt-3">
                            A decade of sustained execution, statutory empanelments, and landmark engineering delivery across Tamil Nadu.
                        </p>
                    </div>

                    <MilestonesTimeline />
                </div>
            </section>

            {/* Certifications Strip */}
            <section id="certifications" className="section-padding-sm bg-[#FAF9F6]">
                <div className="container-site">
                    <div className="text-center mb-8">
                        <SectionLabel className="justify-center">Accreditation</SectionLabel>
                        <h2 className="section-heading text-3xl">Certifications &amp; Standards</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {certifications.map((c) => (
                            <div
                                key={c}
                                className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-matte-sm flex flex-col justify-center"
                            >
                                <span className="text-xs font-mono-tech font-bold uppercase text-[#0d1b2e]">
                                    {c}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CtaBanner />
        </>
    );
}
