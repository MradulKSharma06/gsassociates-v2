import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { projects } from "@/data/projects";
import { ProjectsClient } from "@/components/projects/ProjectsClient";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Explore GSAssociates's portfolio of 200+ government infrastructure projects across Tamil Nadu — roads, bridges, buildings, and more.",
};

export default function ProjectsPage() {
    return (
        <>
            {/* Architectural Page Hero */}
            <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#FAF9F6] border-b border-slate-200/80 blueprint-grid">
                <div className="container-site relative z-10">
                    <SectionLabel>Institutional Portfolio</SectionLabel>
                    <h1
                        style={{ fontFamily: "var(--font-condensed)" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] uppercase tracking-tight leading-none mt-2"
                    >
                        Civil Works &amp; <span className="text-[#185FA5]">Infrastructure</span>
                    </h1>
                    <p className="mt-4 text-base text-slate-600 max-w-xl font-normal">
                        200+ landmark civil infrastructure projects executed for the Government of Tamil
                        Nadu, NHAI, and TNRDC — delivered on time, on spec.
                    </p>
                </div>
            </section>

            {/* Interactive animated client-side project showcase */}
            <ProjectsClient initialProjects={projects} />

            {/* Call to Action */}
            <CtaBanner />
        </>
    );
}
