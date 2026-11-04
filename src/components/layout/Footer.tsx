import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck, ArrowUpRight } from "lucide-react";

const navCols = [
    {
        heading: "Company",
        links: [
            { label: "About GSAssociates", href: "/about" },
            { label: "Leadership & Team", href: "/about#team" },
            { label: "10-Year Milestones", href: "/about#milestones" },
            { label: "ISO Certifications", href: "/about#certifications" },
        ],
    },
    {
        heading: "Specializations",
        links: [
            { label: "Roads & Highways", href: "/services#road-highway" },
            { label: "Bridges & Flyovers", href: "/services#bridges" },
            { label: "Government Complexes", href: "/services#buildings" },
            { label: "Water Infrastructure", href: "/services#water" },
        ],
    },
    {
        heading: "Portfolios",
        links: [
            { label: "All Projects", href: "/projects" },
            { label: "Highway Works", href: "/projects" },
            { label: "Structural Bridges", href: "/projects" },
            { label: "Active Tenders", href: "/clients" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-[#0d1b2e] text-white">
            {/* Top architectural accent bar */}
            <div className="h-[3px] bg-gradient-to-r from-[#185FA5] via-[#2563eb] to-[#c88a22]" />

            <div className="container-site py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
                    {/* Brand Column */}
                    <div>
                        <div className="mb-5">
                            <span
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase leading-none"
                            >
                                GS<span className="text-[#378ADD]">ASSOCIATES</span>
                            </span>
                            <div className="text-[9px] font-mono-tech tracking-widest uppercase text-slate-400 mt-1">
                                Construction Pvt. Ltd. · Class A Contractor
                            </div>
                        </div>

                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
                            Tamil Nadu&apos;s trusted civil infrastructure partner for over a decade.
                            Building high-capacity expressways, structural bridges, and civic headquarters
                            for the Government of Tamil Nadu and Central Authorities.
                        </p>

                        <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400/90 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg w-fit">
                            <ShieldCheck size={14} className="text-[#c88a22]" />
                            <span>Empanelled: TNPWD · NHAI · TNRDC · TWAD</span>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {navCols.map((col) => (
                        <div key={col.heading}>
                            <h4
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-base font-bold uppercase tracking-wider text-white mb-4"
                            >
                                {col.heading}
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                                        >
                                            <span className="group-hover:translate-x-0.5 transition-transform">
                                                {link.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Legal Row */}
                <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                    <div className="font-mono-tech">
                        © {new Date().getFullYear()} GSAssociates Construction Pvt. Ltd. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6 font-mono-tech text-[11px]">
                        <span>ISO 9001:2015</span>
                        <span>ISO 14001:2015</span>
                        <span>IRC:SP:84-2014</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
