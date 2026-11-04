import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { team, milestones } from "@/data/stats";
import { CheckCircle2, Award, Shield, Users } from "lucide-react";

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
            {/* Page hero */}
            <section
                className="relative overflow-hidden section-padding-sm"
                style={{ background: "var(--color-navy)" }}
            >
                <div className="accent-bar absolute top-0 left-0 right-0" />
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <defs>
                        <pattern id="pg" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pg)" />
                </svg>
                <div className="container-site relative z-10">
                    <SectionLabel light>Company</SectionLabel>
                    <h1
                        style={{
                            fontFamily: "var(--font-condensed)",
                            fontSize: "clamp(40px, 6vw, 72px)",
                            fontWeight: 800,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            lineHeight: 1,
                        }}
                    >
                        About <span style={{ color: "var(--color-blue-bright)" }}>GSAssociates</span>
                    </h1>
                    <p className="mt-4 text-[15px] font-light max-w-[560px]" style={{ color: "#8aadcc" }}>
                        A decade of building Tamil Nadu&apos;s roads, bridges, and civic
                        infrastructure — with integrity, precision, and pride.
                    </p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section-padding" style={{ background: "var(--color-surface)" }}>
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                            {
                                label: "Our Vision",
                                heading: "To be Tamil Nadu's most trusted infrastructure builder",
                                body: "We envision a Tamil Nadu where every citizen has access to world-class roads, reliable bridges, and dignified public buildings — built with integrity, built to last.",
                                accentColor: "var(--color-blue-primary)",
                            },
                            {
                                label: "Our Mission",
                                heading: "Deliver government infrastructure with precision and pride",
                                body: "Our mission is to execute every public works contract with the highest standards of quality, safety, and timeliness — serving the Government of Tamil Nadu and its citizens with unwavering commitment.",
                                accentColor: "var(--color-gold)",
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-card p-8 border"
                                style={{
                                    background: "var(--color-page-bg)",
                                    borderColor: "var(--color-border)",
                                    borderLeft: `4px solid ${item.accentColor}`,
                                }}
                            >
                                <div
                                    className="text-[10px] font-bold tracking-[2.5px] uppercase mb-3"
                                    style={{ color: item.accentColor }}
                                >
                                    {item.label}
                                </div>
                                <h2
                                    style={{
                                        fontFamily: "var(--font-condensed)",
                                        fontSize: "26px",
                                        fontWeight: 700,
                                        color: "var(--color-text-primary)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        lineHeight: 1.15,
                                        marginBottom: "12px",
                                    }}
                                >
                                    {item.heading}
                                </h2>
                                <p className="text-[14px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding" style={{ background: "var(--color-page-bg)" }}>
                <div className="container-site">
                    <div className="text-center mb-12">
                        <SectionLabel className="justify-center">What We Stand For</SectionLabel>
                        <h2 className="section-heading">Core <span>Values</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div
                                    key={v.title}
                                    className="card-base p-6"
                                >
                                    <div
                                        className="w-10 h-10 rounded-[6px] flex items-center justify-center mb-4"
                                        style={{ background: "var(--color-blue-pale)" }}
                                    >
                                        <Icon size={20} style={{ color: "var(--color-blue-primary)" }} />
                                    </div>
                                    <h3
                                        style={{
                                            fontFamily: "var(--font-condensed)",
                                            fontSize: "18px",
                                            fontWeight: 700,
                                            color: "var(--color-text-primary)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {v.title}
                                    </h3>
                                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                        {v.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline / Milestones */}
            <section id="milestones" className="section-padding" style={{ background: "var(--color-surface)" }}>
                <div className="container-site">
                    <div className="mb-12">
                        <SectionLabel>Our Journey</SectionLabel>
                        <h2 className="section-heading">
                            10 Years of <span>Milestones</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div
                            className="absolute left-[27px] top-0 bottom-0 w-[1px] lg:left-1/2"
                            style={{ background: "var(--color-border)" }}
                        />

                        <div className="flex flex-col gap-8">
                            {milestones.map((m, i) => (
                                <div
                                    key={m.year}
                                    className={`flex gap-6 relative ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                        }`}
                                >
                                    {/* Dot */}
                                    <div
                                        className="absolute left-[20px] w-[16px] h-[16px] rounded-full border-2 z-10 lg:left-1/2 lg:-translate-x-1/2"
                                        style={{
                                            background: "var(--color-blue-primary)",
                                            borderColor: "var(--color-surface)",
                                            boxShadow: "0 0 0 3px var(--color-blue-pale)",
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="ml-12 lg:ml-0 lg:w-[calc(50%-2rem)]">
                                        <div
                                            className={`rounded-card p-5 border ${i % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                                                }`}
                                            style={{
                                                background: "var(--color-page-bg)",
                                                borderColor: "var(--color-border)",
                                            }}
                                        >
                                            <div
                                                className="text-[10px] font-bold tracking-[2.5px] uppercase mb-1"
                                                style={{ color: "var(--color-blue-primary)" }}
                                            >
                                                {m.year}
                                            </div>
                                            <h3
                                                style={{
                                                    fontFamily: "var(--font-condensed)",
                                                    fontSize: "18px",
                                                    fontWeight: 700,
                                                    color: "var(--color-text-primary)",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px",
                                                    marginBottom: "4px",
                                                }}
                                            >
                                                {m.title}
                                            </h3>
                                            <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                                {m.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section id="team" className="section-padding" style={{ background: "var(--color-page-bg)" }}>
                <div className="container-site">
                    <div className="text-center mb-12">
                        <SectionLabel className="justify-center">Leadership</SectionLabel>
                        <h2 className="section-heading">Our <span>Team</span></h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {team.map((member) => (
                            <div key={member.id} className="card-base p-6 text-center">
                                {/* Avatar placeholder */}
                                <div
                                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                                    style={{ background: "var(--color-blue-pale)" }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "var(--font-condensed)",
                                            fontSize: "28px",
                                            fontWeight: 800,
                                            color: "var(--color-blue-primary)",
                                        }}
                                    >
                                        {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .slice(0, 2)
                                            .join("")}
                                    </span>
                                </div>
                                <h3
                                    style={{
                                        fontFamily: "var(--font-condensed)",
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        color: "var(--color-text-primary)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    {member.name}
                                </h3>
                                <div
                                    className="text-[10px] font-bold tracking-[1.5px] uppercase mb-3"
                                    style={{ color: "var(--color-blue-primary)" }}
                                >
                                    {member.designation}
                                </div>
                                <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section id="certifications" className="section-padding-sm" style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                <div className="container-site">
                    <div className="mb-8">
                        <SectionLabel>Credentials</SectionLabel>
                        <h2 className="section-heading">
                            Certifications <span>&amp; Empanelments</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {certifications.map((cert) => (
                            <div
                                key={cert}
                                className="flex items-center gap-3 p-4 rounded-card border"
                                style={{ borderColor: "var(--color-border)", background: "var(--color-page-bg)" }}
                            >
                                <CheckCircle2 size={16} style={{ color: "var(--color-blue-primary)" }} className="shrink-0" />
                                <span className="text-[13px] font-500" style={{ color: "var(--color-text-body)" }}>
                                    {cert}
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