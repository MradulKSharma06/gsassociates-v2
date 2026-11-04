import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { services } from "@/data/services";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";
import { AbstractGeometricGraphic } from "@/components/services/AbstractGeometricGraphic";

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

            {/* Services Detailed List */}
            <section className="section-padding bg-transparent border-b border-slate-200/80 relative z-10">
                <div className="container-site flex flex-col gap-8">
                    {services.map((svc, i) => {
                        const isReversed = i % 2 !== 0;

                        return (
                            <div
                                key={svc.id}
                                id={svc.id}
                                className={`grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-slate-200/80 shadow-matte-sm bg-white/80 backdrop-blur-xl hover:shadow-matte-md hover:bg-white/90 transition-all ${
                                    isReversed ? "lg:direction-rtl" : ""
                                }`}
                            >
                                {/* Left/Side Panel */}
                                <div className="lg:col-span-4 p-8 bg-[#FAF9F6]/80 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col justify-between relative overflow-hidden">
                                    <div>
                                        <div className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#185FA5] mb-2">
                                            {svc.category}
                                        </div>
                                        <h2
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-3xl font-extrabold text-[#0d1b2e] uppercase leading-tight"
                                        >
                                            {svc.title}
                                        </h2>
                                    </div>

                                    {/* Minimalist Abstract Vector Shape Artwork */}
                                    <AbstractGeometricGraphic index={i} />

                                    <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono-tech text-slate-500">
                                        <span>SPEC: IRC / PWD</span>
                                        <span className="text-[#c88a22] font-bold">CLASS A</span>
                                    </div>
                                </div>

                                {/* Content Panel */}
                                <div className="lg:col-span-8 p-8 flex flex-col justify-between bg-white/60 backdrop-blur-md">
                                    <div>
                                        <p className="text-sm text-slate-700 leading-relaxed mb-6">
                                            {svc.description}
                                        </p>

                                        <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-400 mb-3">
                                            Key Engineering Deliverables
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                            {svc.capabilities.map((cap) => (
                                                <div key={cap} className="flex items-start gap-2.5">
                                                    <CheckCircle2
                                                        size={14}
                                                        className="mt-0.5 shrink-0 text-[#185FA5]"
                                                    />
                                                    <span className="text-xs font-medium text-slate-700 font-sans">
                                                        {cap}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <span className="text-xs text-slate-500 font-mono-tech">
                                            Available for State &amp; Central Tenders
                                        </span>
                                        <ArchitecturalButton href="/contact" variant="wireframe" size="sm" className="w-fit">
                                            <span>Request Specifications</span>
                                            <ArrowRight size={12} />
                                        </ArchitecturalButton>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <CtaBanner />
        </>
    );
}
