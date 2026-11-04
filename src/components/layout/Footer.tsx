import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const navCols = [
    {
        heading: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Our Team", href: "/about#team" },
            { label: "Milestones", href: "/about#milestones" },
            { label: "Certifications", href: "/about#certifications" },
        ],
    },
    {
        heading: "Services",
        links: [
            { label: "Road & Highway", href: "/services#road-highway" },
            { label: "Bridges & Flyovers", href: "/services#bridges" },
            { label: "Govt. Buildings", href: "/services#buildings" },
            { label: "Water Infrastructure", href: "/services#water" },
        ],
    },
    {
        heading: "Projects",
        links: [
            { label: "All Projects", href: "/projects" },
            { label: "Road Projects", href: "/projects?cat=Road+%26+Highway" },
            { label: "Bridge Projects", href: "/projects?cat=Bridges+%26+Flyovers" },
            { label: "Ongoing Works", href: "/projects?status=Ongoing" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-navy">
            {/* Accent bar */}
            <div className="accent-bar" />

            <div className="container-site py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
                    {/* Brand Column */}
                    <div>
                        <div className="mb-5">
                            <span
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-[26px] font-extrabold text-white tracking-[2px] uppercase"
                            >
                                GS
                                <span className="text-blue-bright">ASSOCIATES</span>
                            </span>
                            <div className="text-[9px] font-semibold tracking-[2.5px] uppercase text-blue-light/40 mt-0.5">
                                Construction Pvt. Ltd.
                            </div>
                        </div>

                        <p className="text-[13px] text-slate-muted leading-relaxed max-w-[300px] mb-6">
                            Tamil Nadu&apos;s trusted infrastructure partner for over a decade.
                            Building highways, bridges, and civic landmarks for the Government
                            of Tamil Nadu.
                        </p>

                        {/* Contact info */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-3">
                                <MapPin size={14} className="text-blue-bright mt-0.5 shrink-0" />
                                <span className="text-[12px] text-slate-muted">
                                    45, Anna Salai, Teynampet,
                                    <br />
                                    Chennai — 600 018, Tamil Nadu
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={14} className="text-blue-bright shrink-0" />
                                <a
                                    href="tel:+914412345678"
                                    className="text-[12px] text-slate-muted hover:text-white transition-colors"
                                >
                                    +91 44 1234 5678
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={14} className="text-blue-bright shrink-0" />
                                <a
                                    href="mailto:info@GSAssociates.in"
                                    className="text-[12px] text-slate-muted hover:text-white transition-colors"
                                >
                                    info@GSAssociates.in
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock size={14} className="text-blue-bright mt-0.5 shrink-0" />
                                <span className="text-[12px] text-slate-muted">
                                    Mon – Sat, 9:00 AM – 6:00 PM
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Nav columns */}
                    {navCols.map((col) => (
                        <div key={col.heading}>
                            <h4
                                className="text-[10px] font-bold tracking-[2.5px] uppercase mb-5"
                                style={{ color: "var(--color-blue-bright)" }}
                            >
                                {col.heading}
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                                {col.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="footer-link-item text-[13px]">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-slate-muted/60">
                        © {new Date().getFullYear()} GSAssociates Construction Pvt. Ltd. All
                        rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-[11px] text-slate-muted/50 hover:text-slate-muted transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-[11px] text-slate-muted/50 hover:text-slate-muted transition-colors"
                        >
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}