import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ExternalLink, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Clients & Tenders",
    description:
        "GSAssociates Construction is empanelled with Tamil Nadu PWD, NHAI, TNRDC, TWAD Board and other government departments. View our client roster and tender information.",
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
        category: "Central Government",
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
        category: "Urban Local Bodies",
        clients: [
            {
                name: "Greater Chennai Corporation",
                full: "Greater Chennai Corporation",
                role: "City Roads & Civic Works",
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
                role: "Smart City Works",
                class: "Approved Contractor",
            },
        ],
    },
];

const tenderLinks = [
    {
        name: "Tamil Nadu e-Procurement Portal",
        url: "https://www.tntenders.gov.in",
        desc: "Official portal for all Tamil Nadu government tenders",
    },
    {
        name: "NHAI Tender Notices",
        url: "https://www.nhai.gov.in",
        desc: "National Highways Authority — current bid invitations",
    },
    {
        name: "CPPP — Central Procurement Portal",
        url: "https://eprocure.gov.in",
        desc: "Central government works and procurement notices",
    },
];

const prequalCriteria = [
    "Minimum 5 years in civil infrastructure contracting",
    "Annual turnover ≥ ₹50 Cr (last 3 years average)",
    "Similar work experience certificate from govt. dept.",
    "Valid ISO 9001 certification",
    "PAN, GST, ESI & EPF registration",
    "Solvency certificate from nationalized bank",
    "List of plant & machinery with ownership proof",
    "Key personnel CVs (Site Engineer, QC Manager)",
];

export default function ClientsPage() {
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
                        <pattern id="clg" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#clg)" />
                </svg>
                <div className="container-site relative z-10">
                    <SectionLabel light>Our Partners</SectionLabel>
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
                        Clients &amp; <span style={{ color: "var(--color-blue-bright)" }}>Empanelments</span>
                    </h1>
                    <p className="mt-4 text-[15px] font-light max-w-[560px]" style={{ color: "#8aadcc" }}>
                        Trusted by Tamil Nadu&apos;s foremost government departments and urban
                        local bodies for over a decade of infrastructure delivery.
                    </p>
                </div>
            </section>

            {/* Client groups */}
            <section className="section-padding" style={{ background: "var(--color-page-bg)" }}>
                <div className="container-site flex flex-col gap-14">
                    {clientGroups.map((group) => (
                        <div key={group.category}>
                            <div className="mb-6">
                                <SectionLabel>{group.category}</SectionLabel>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {group.clients.map((client) => (
                                    <div
                                        key={client.name}
                                        className="card-base p-5"
                                    >
                                        {/* Logo placeholder — replace with <Image> when logos are available */}
                                        <div
                                            className="w-14 h-14 rounded-[8px] flex items-center justify-center mb-4"
                                            style={{ background: "var(--color-blue-pale)" }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily: "var(--font-condensed)",
                                                    fontSize: "11px",
                                                    fontWeight: 800,
                                                    color: "var(--color-blue-primary)",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "1px",
                                                    textAlign: "center",
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {client.name
                                                    .split(" ")
                                                    .map((w) => w[0])
                                                    .slice(0, 4)
                                                    .join("")}
                                            </span>
                                        </div>

                                        <h3
                                            style={{
                                                fontFamily: "var(--font-condensed)",
                                                fontSize: "18px",
                                                fontWeight: 700,
                                                color: "var(--color-text-primary)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.5px",
                                                marginBottom: "3px",
                                            }}
                                        >
                                            {client.name}
                                        </h3>
                                        <p className="text-[11px] mb-3" style={{ color: "var(--color-text-faint)" }}>
                                            {client.full}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mt-auto">
                                            <span className="badge badge-blue">{client.role}</span>
                                            <span className="badge badge-green">{client.class}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tender information */}
            <section
                className="section-padding"
                style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}
            >
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Tender portals */}
                        <div>
                            <SectionLabel>Tender Information</SectionLabel>
                            <h2 className="section-heading mb-8" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
                                Official <span>Tender Portals</span>
                            </h2>

                            <div className="flex flex-col gap-4">
                                {tenderLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-4 p-5 rounded-card border group transition-all hover:border-blue-bright/40"
                                        style={{
                                            borderColor: "var(--color-border)",
                                            background: "var(--color-page-bg)",
                                        }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-[6px] flex items-center justify-center shrink-0"
                                            style={{ background: "var(--color-blue-pale)" }}
                                        >
                                            <FileText size={18} style={{ color: "var(--color-blue-primary)" }} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3
                                                    style={{
                                                        fontFamily: "var(--font-condensed)",
                                                        fontSize: "15px",
                                                        fontWeight: 700,
                                                        color: "var(--color-text-primary)",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.5px",
                                                    }}
                                                >
                                                    {link.name}
                                                </h3>
                                                <ExternalLink
                                                    size={12}
                                                    style={{ color: "var(--color-blue-primary)" }}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <p className="text-[12px] mt-1" style={{ color: "var(--color-text-muted)" }}>
                                                {link.desc}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Prequalification */}
                        <div>
                            <SectionLabel>For Bidders</SectionLabel>
                            <h2 className="section-heading mb-8" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
                                Prequalification <span>Criteria</span>
                            </h2>

                            <div
                                className="rounded-card border p-6"
                                style={{ borderColor: "var(--color-border)", background: "var(--color-page-bg)" }}
                            >
                                <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>
                                    GSAssociates participates in government tenders requiring the
                                    following minimum qualifications. Subcontractors and JV
                                    partners must also satisfy these criteria proportionally.
                                </p>

                                <div className="flex flex-col gap-2.5">
                                    {prequalCriteria.map((item) => (
                                        <div key={item} className="flex items-start gap-3">
                                            <CheckCircle2
                                                size={14}
                                                className="shrink-0 mt-0.5"
                                                style={{ color: "var(--color-blue-primary)" }}
                                            />
                                            <span className="text-[13px]" style={{ color: "var(--color-text-body)" }}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="mt-6 pt-5 border-t text-[12px]"
                                    style={{ borderColor: "var(--color-border)", color: "var(--color-text-faint)" }}
                                >
                                    Criteria may vary by project value and category. Always refer
                                    to the specific NIT for exact requirements.
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