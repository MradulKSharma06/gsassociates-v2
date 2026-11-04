"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";
import { ServiceBlueprintGraphic } from "@/components/services/ServiceBlueprintGraphic";
import { Service } from "@/data/services";

interface ServicesListProps {
    services: Service[];
}

export function ServicesList({ services }: ServicesListProps) {
    return (
        <div className="container-site flex flex-col gap-10">
            {services.map((svc, i) => {
                const isReversed = i % 2 !== 0;

                return (
                    <motion.div
                        key={svc.id}
                        id={svc.id}
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                        className={`grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-slate-200/90 shadow-matte-sm bg-white/90 backdrop-blur-xl hover:shadow-matte-lg hover:border-slate-300 transition-all duration-300 group ${
                            isReversed ? "lg:direction-rtl" : ""
                        }`}
                    >
                        {/* Left / Side Technical Specification Panel */}
                        <div className="lg:col-span-5 p-7 sm:p-9 bg-[#FAF9F6]/90 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col justify-between relative overflow-hidden">
                            {/* Top Corner Crosshair Datum */}
                            <span className="absolute top-3 left-3 text-slate-300 font-mono-tech text-[10px] select-none">+</span>
                            <span className="absolute top-3 right-3 text-slate-300 font-mono-tech text-[10px] select-none">+</span>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#185FA5]">
                                        {svc.category}
                                    </span>
                                    <span className="text-[10px] font-mono-tech text-slate-400">
                                        DIV 0{i + 1}
                                    </span>
                                </div>
                                <h2
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-2xl sm:text-3xl font-extrabold text-[#0d1b2e] uppercase leading-tight tracking-tight mb-2"
                                >
                                    {svc.title}
                                </h2>
                            </div>

                            {/* Authentic Architectural CAD Vector Artwork with Technical Heading */}
                            <ServiceBlueprintGraphic serviceId={svc.id} index={i} />

                            <div className="mt-2 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono-tech text-slate-500">
                                <span>SPEC: IRC / PWD</span>
                                <span className="text-[#c88a22] font-bold">CLASS A CONTRACTOR</span>
                            </div>
                        </div>

                        {/* Right Content Panel */}
                        <div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between bg-white/80 backdrop-blur-md">
                            <div>
                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                                    {svc.description}
                                </p>

                                <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                                    Key Engineering Deliverables &amp; Statutory Codes
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    {svc.capabilities.map((cap) => (
                                        <div key={cap} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/70 border border-slate-100">
                                            <CheckCircle2
                                                size={15}
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
                                    Available for State &amp; Central Government Tenders
                                </span>
                                <ArchitecturalButton href="/contact" variant="wireframe" size="sm" className="w-fit">
                                    <span>Request Specifications</span>
                                    <ArrowRight size={12} />
                                </ArchitecturalButton>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
