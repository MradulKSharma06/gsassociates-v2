"use client";

import { motion } from "framer-motion";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { ExternalLink, FileText, CheckCircle2, ShieldCheck, Building2 } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface Client {
    name: string;
    full: string;
    role: string;
    class: string;
}

interface ClientGroup {
    category: string;
    clients: Client[];
}

interface TenderLink {
    name: string;
    url: string;
    desc: string;
}

interface ClientsRosterProps {
    clientGroups: ClientGroup[];
    tenderLinks: TenderLink[];
    prequalCriteria: string[];
}

export function ClientsRoster({
    clientGroups,
    tenderLinks,
    prequalCriteria,
}: ClientsRosterProps) {
    return (
        <>
            {/* Client Groups by Category with Scroll Animation & 3D Tilt */}
            <section className="section-padding bg-transparent relative z-10">
                <div className="container-site flex flex-col gap-16">
                    {clientGroups.map((group, groupIdx) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/80">
                                <h2
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#0d1b2e]"
                                >
                                    {group.category}
                                </h2>
                                <span className="font-mono-tech text-xs text-slate-400 uppercase tracking-wider">
                                    {group.clients.length} Statutory Bodies
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.clients.map((client, idx) => (
                                    <motion.div
                                        key={client.name}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: idx * 0.05,
                                        }}
                                        className="h-full"
                                    >
                                        <Tilt3DCard maxTilt={5} className="h-full">
                                            <div className="h-full bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-matte-sm hover:shadow-matte-md hover:border-slate-300 hover:bg-white transition-all flex flex-col justify-between group">
                                                <div>
                                                    <div className="flex items-center justify-between mb-5">
                                                        {/* Monogram Seal Crest */}
                                                        <div className="w-12 h-12 rounded-xl bg-slate-100/90 border border-slate-200/90 flex items-center justify-center group-hover:border-[#185FA5]/40 group-hover:bg-blue-50/50 transition-colors">
                                                            <span
                                                                style={{ fontFamily: "var(--font-condensed)" }}
                                                                className="font-extrabold text-sm text-[#0d1b2e] tracking-wider uppercase group-hover:text-[#185FA5] transition-colors"
                                                            >
                                                                {client.name
                                                                    .split(" ")
                                                                    .map((w) => w[0])
                                                                    .slice(0, 4)
                                                                    .join("")}
                                                            </span>
                                                        </div>

                                                        {/* Registered Badge */}
                                                        <span className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full font-bold tracking-wider">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                            EMPANELLED
                                                        </span>
                                                    </div>

                                                    <h3
                                                        style={{ fontFamily: "var(--font-condensed)" }}
                                                        className="text-xl sm:text-2xl font-bold text-[#0d1b2e] uppercase tracking-wide leading-tight mb-2 group-hover:text-[#185FA5] transition-colors"
                                                    >
                                                        {client.name}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 mb-6 leading-relaxed font-normal">
                                                        {client.full}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono-tech font-bold bg-[#185FA5]/10 text-[#185FA5] border border-[#185FA5]/20">
                                                        {client.role}
                                                    </span>
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono-tech font-bold bg-[#c88a22]/10 text-[#c88a22] border border-[#c88a22]/20">
                                                        {client.class}
                                                    </span>
                                                </div>
                                            </div>
                                        </Tilt3DCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Tender Portals & Prequalification with Scroll Animations */}
            <section className="section-padding bg-white border-t border-slate-200/80">
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Tender portals */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <SectionLabel>Tender Information</SectionLabel>
                            <h2
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] uppercase tracking-tight mb-8"
                            >
                                Official <span className="text-[#185FA5]">Tender Portals</span>
                            </h2>

                            <div className="flex flex-col gap-4">
                                {tenderLinks.map((link, idx) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                                        className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200/80 bg-[#FAF9F6] group hover:border-[#185FA5]/40 hover:bg-white hover:shadow-matte-sm transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#185FA5] group-hover:scale-105 transition-transform">
                                            <FileText size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3
                                                    style={{ fontFamily: "var(--font-condensed)" }}
                                                    className="text-base font-bold text-[#0d1b2e] uppercase tracking-wide group-hover:text-[#185FA5] transition-colors"
                                                >
                                                    {link.name}
                                                </h3>
                                                <ExternalLink
                                                    size={13}
                                                    className="text-[#185FA5] opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                                {link.desc}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Prequalification Criteria */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        >
                            <SectionLabel>For Prospective Bidders &amp; JV Partners</SectionLabel>
                            <h2
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] uppercase tracking-tight mb-8"
                            >
                                Prequalification <span className="text-[#185FA5]">Standards</span>
                            </h2>

                            <div className="rounded-2xl border border-slate-200/80 bg-[#FAF9F6] p-7 sm:p-8 shadow-matte-sm">
                                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                                    GSAssociates participates in government works requiring strict statutory compliance. Joint Venture (JV) partners and specialized subcontractors are vetted against these core metrics:
                                </p>

                                <div className="flex flex-col gap-3">
                                    {prequalCriteria.map((item, idx) => (
                                        <div key={item} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-[#185FA5]/10 text-[#185FA5] flex items-center justify-center shrink-0 mt-0.5 font-mono-tech text-[10px] font-bold">
                                                {idx + 1}
                                            </div>
                                            <span className="text-xs text-slate-700 leading-relaxed font-normal">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-5 border-t border-slate-200 text-[11px] text-slate-400 font-mono-tech">
                                    * Thresholds vary per NIT (Notice Inviting Tender). Detailed pre-qualification dossiers are submitted with Bid Technical Package A.
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
