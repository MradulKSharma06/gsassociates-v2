import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ClientsRoster } from "@/components/clients/ClientsRoster";

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
            <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#FAF9F6] border-b border-slate-200/80 blueprint-grid">
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

            {/* Interactive Scroll-Animated Client Roster & Prequalification */}
            <ClientsRoster
                clientGroups={clientGroups}
                tenderLinks={tenderLinks}
                prequalCriteria={prequalCriteria}
            />

            <CtaBanner />
        </>
    );
}
