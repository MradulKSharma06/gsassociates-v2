import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ExternalLink, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Clients & Empanelments",
    description:
        "GSAssociates is empanelled as a Class A Contractor with Tamil Nadu PWD, NHAI, TNRDC, TWAD Board, and municipal corporations across South India.",
};

const clientGroups = [
    {
        category: "State Government — Tamil Nadu",
        clients: [
            {
                name: "Tamil Nadu PWD",
                full: "Public Works Department, Government of Tamil Nadu",
                role: "Roads, Buildings & Bridges",
                class: "Class A Contractor",
            },
            {
                name: "Tamil Nadu Highways",
                full: "Highways Department, Government of Tamil Nadu",
                role: "State Highway Works",
                class: "Empanelled",
            },
            {
                name: "TNRDC",
                full: "Tamil Nadu Road Development Corporation",
                role: "BOT / Annuity Projects",
                class: "Empanelled",
            },
            {
                name: "TWAD Board",
                full: "Tamil Nadu Water Supply and Drainage Board",
                role: "Water Infrastructure",
                class: "Empanelled",
            },
            {
                name: "TNUIFSL",
                full: "Tamil Nadu Urban Infrastructure Financial Services Ltd.",
                role: "Urban Infrastructure",
                class: "Empanelled",
            },
            {
                name: "CMDA",
                full: "Chennai Metropolitan Development Authority",
                role: "Planning & Infrastructure",
                class: "Registered",
            },
        ],
    },
    {
        category: "Central Government & National Authorities",
        clients: [
            {
                name: "NHAI",
                full: "National Highways Authority of India",
                role: "National Highway Works",
                class: "Empanelled",
            },
            {
                name: "Smart Cities Mission",
                full: "Ministry of Housing & Urban Affairs — Smart Cities",
                role: "Urban Development Packages",
                class: "Empanelled",
            },
        ],
    },
    {
        category: "Urban Local Bodies & Corporations",
        clients: [
            {
                name: "Greater Chennai Corporation",
                full: "Greater Chennai Corporation",
                role: "City Roads & Stormwater Drainage",
                class: "Approved Contractor",
            },
            {
                name: "Coimbatore City Corporation",
                full: "Coimbatore City Municipal Corporation",
                role: "Urban Infrastructure",
                class: "Approved Contractor",
            },
            {
                name: "Madurai Corporation",
                full: "Madurai City Municipal Corporation",
                role: "Road & Drainage Works",
                class: "Approved Contractor",
            },
            {
                name: "Salem City Corporation",
                full: "Salem City Municipal Corporation",
                role: "Smart City Infrastructure",
                class: "Approved Contractor",
            },
        ],
    },
];

const tenderLinks = [
    {
        name: "Tamil Nadu e-Procurement Portal",
        url: "https://www.tntenders.gov.in",
        desc: "Official e-tendering portal for all Tamil Nadu state departments and undertakings.",
    },
    {
        name: "NHAI Tender Notices",
        url: "https://www.nhai.gov.in",
        desc: "National Highways Authority of India — active bid invitations and announcements.",
    },
    {
        name: "CPPP — Central Procurement Portal",
        url: "https://eprocure.gov.in",
        desc: "Central Government works, highways, and infrastructure procurement notices.",
    },
];

const prequalCriteria = [
    "Minimum 5 years of verified civil infrastructure contracting experience",
    "Annual turnover ≥ ₹50 Cr (average of last 3 consecutive audited fiscal years)",
    "Valid Class A Contractor registration with Tamil Nadu PWD or equivalent central agency",
    "ISO 9001:2015 Quality & ISO 14001:2015 Environmental Management certifications",
    "Statutory PAN, GSTIN, ESI, EPF and labor compliance registrations",
    "Solvency certificate issued by a scheduled commercial bank (min ₹20 Cr)",
    "Certified inventory of heavy plant & machinery with unencumbered ownership proof",
    "Qualified resident engineering personnel with PWD/NHAI project execution credentials",
];

export default function ClientsPage() {
    return (
        <>
            {/* Architectural Page Hero */}
            <section className="relative overflow-hidden section-padding-sm bg-[#FAF9F6] border-b border-slate-200/80 blueprint-grid">
                <div className="container-site relative z-10">
                    <SectionLabel>Institutional Roster</SectionLabel>
                    <h1
                        style={{ fontFamily: "var(--font-condensed)" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] uppercase tracking-tight leading-none mt-2"
                    >
                        Clients &amp; <span className="text-[#185FA5]">Empanelments</span>
                    </h1>
                    <p className="mt-4 text-base text-slate-600 max-w-xl font-normal">
                        Trusted by Tamil Nadu&apos;s apex engineering departments, municipal corporations,
                        and national authorities for over a decade of disciplined infrastructure delivery.
                    </p>
                </div>
            </section>

            {/* Client Groups by Category */}
            <section className="section-padding bg-[#FAF9F6]">
                <div className="container-site flex flex-col gap-16">
                    {clientGroups.map((group) => (
                        <div key={group.category}>
                            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/80">
                                <h2
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-2xl font-bold uppercase tracking-wider text-[#0d1b2e]"
                                >
                                    {group.category}
                                </h2>
                                <span className="font-mono text-xs text-slate-400">
                                    {group.clients.length} Statutory Bodies
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {group.clients.map((client) => (
                                    <div
                                        key={client.name}
                                        className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-matte-sm hover:shadow-matte-md hover:border-slate-300 transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                                                    <span
                                                        style={{ fontFamily: "var(--font-condensed)" }}
                                                        className="font-bold text-sm text-[#0d1b2e] tracking-wider"
                                                    >
                                                        {client.name
                                                            .split(" ")
                                                            .map((w) => w[0])
                                                            .slice(0, 4)
                                                            .join("")}
                                                    </span>
                                                </div>
                                                <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                                                    REGISTERED
                                                </span>
                                            </div>

                                            <h3
                                                style={{ fontFamily: "var(--font-condensed)" }}
                                                className="text-xl font-bold text-[#0d1b2e] uppercase tracking-wide leading-tight mb-1"
                                            >
                                                {client.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                                                {client.full}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#185FA5]/10 text-[#185FA5] border border-[#185FA5]/20">
                                                {client.role}
                                            </span>
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#c88a22]/10 text-[#c88a22] border border-[#c88a22]/20">
                                                {client.class}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tender Portals & Prequalification */}
            <section className="section-padding bg-white border-t border-slate-200/80">
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Tender portals */}
                        <div>
                            <SectionLabel>Tender Information</SectionLabel>
                            <h2
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] uppercase tracking-tight mb-8"
                            >
                                Official <span className="text-[#185FA5]">Tender Portals</span>
                            </h2>

                            <div className="flex flex-col gap-4">
                                {tenderLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
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
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Prequalification Criteria */}
                        <div>
                            <SectionLabel>For Prospective Bidders &amp; JV Partners</SectionLabel>
                            <h2
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] uppercase tracking-tight mb-8"
                            >
                                Prequalification <span className="text-[#185FA5]">Standards</span>
                            </h2>

                            <div className="rounded-2xl border border-slate-200/80 bg-[#FAF9F6] p-7 shadow-matte-sm">
                                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                                    GSAssociates participates in government works requiring strict statutory compliance. Joint Venture (JV) partners and specialized subcontractors are vetted against these core metrics:
                                </p>

                                <div className="flex flex-col gap-3">
                                    {prequalCriteria.map((item, idx) => (
                                        <div key={item} className="flex items-start gap-3">
                                            <div className="w-4 h-4 rounded-full bg-[#185FA5]/10 text-[#185FA5] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[9px] font-bold">
                                                {idx + 1}
                                            </div>
                                            <span className="text-xs text-slate-700 leading-relaxed font-normal">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-5 border-t border-slate-200 text-[11px] text-slate-400 font-mono">
                                    * Thresholds vary per NIT (Notice Inviting Tender). Detailed pre-qualification dossiers are submitted with Bid Technical Package A.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CtaBanner />
        </>
    );
}
