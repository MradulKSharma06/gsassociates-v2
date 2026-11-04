import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { services } from "@/data/services";
import { ServicesList } from "@/components/services/ServicesList";

export const metadata: Metadata = {
    title: "Services",
    description:
        "GSAssociates Construction provides road & highway construction, bridges, government buildings, water infrastructure, and urban development services across Tamil Nadu.",
};

export default function ServicesPage() {
    return (
        <>
            {/* Architectural Page Hero */}
            <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#FAF9F6] border-b border-slate-200/80 blueprint-grid">
                <div className="container-site relative z-10">
                    <SectionLabel>Institutional Capabilities</SectionLabel>
                    <h1
                        style={{ fontFamily: "var(--font-condensed)" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] uppercase tracking-tight leading-none mt-2"
                    >
                        Civil Engineering <span className="text-[#185FA5]">Disciplines</span>
                    </h1>
                    <p className="mt-4 text-base text-slate-600 max-w-xl font-normal">
                        End-to-end heavy civil construction and project management, calibrated to
                        Tamil Nadu&apos;s government infrastructure standards.
                    </p>
                </div>
            </section>

            {/* Services Detailed List with Scroll-Driven Animations & Authentic CAD Graphics */}
            <section className="section-padding bg-transparent border-b border-slate-200/80 relative z-10">
                <ServicesList services={services} />
            </section>

            <CtaBanner />
        </>
    );
}
