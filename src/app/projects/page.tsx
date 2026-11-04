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
            {/* Page hero */}
            <section
                className="relative overflow-hidden section-padding-sm"
                style={{ background: "var(--color-navy)" }}
            >
                <div className="accent-bar absolute top-0 left-0 right-0" />
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.04]"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <defs>
                        <pattern id="prg" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#prg)" />
                </svg>

                <div className="container-site relative z-10">
                    <SectionLabel light>Our Portfolio</SectionLabel>
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
                        Our <span style={{ color: "var(--color-blue-bright)" }}>Projects</span>
                    </h1>
                    <p className="mt-4 text-[15px] font-light max-w-[560px]" style={{ color: "#8aadcc" }}>
                        200+ government infrastructure projects delivered across Tamil Nadu — on time, on spec.
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
