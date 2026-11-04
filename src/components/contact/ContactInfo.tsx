import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

const offices = [
    {
        type: "Head Office",
        address: "45, Anna Salai, Teynampet, Chennai — 600 018, Tamil Nadu",
        phone: "+91 44 1234 5678",
        email: "info@GSAssociates.in",
        hours: "Mon – Sat, 9:00 AM – 6:00 PM",
        isPrimary: true,
    },
    {
        type: "Site Office",
        address: "12, Avinashi Road, Peelamedu, Coimbatore — 641 004, Tamil Nadu",
        phone: "+91 422 234 5678",
        email: "coimbatore@GSAssociates.in",
        hours: "Mon – Sat, 8:30 AM – 5:30 PM",
        isPrimary: false,
    },
];

export function ContactInfo() {
    return (
        <div className="flex flex-col gap-5">
            {offices.map((office) => (
                <div
                    key={office.type}
                    className="rounded-card border overflow-hidden"
                    style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
                >
                    {/* Header */}
                    <div
                        className="px-6 py-4 border-b"
                        style={{
                            borderColor: "var(--color-border)",
                            background: office.isPrimary ? "var(--color-navy)" : "var(--color-page-bg)",
                        }}
                    >
                        <span
                            className="text-[10px] font-bold tracking-[2.5px] uppercase"
                            style={{ color: office.isPrimary ? "var(--color-blue-bright)" : "var(--color-blue-primary)" }}
                        >
                            {office.type}
                        </span>
                    </div>

                    {/* Details */}
                    <div className="p-6 flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5"
                                style={{ background: "var(--color-blue-pale)" }}
                            >
                                <MapPin size={15} style={{ color: "var(--color-blue-primary)" }} />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-1" style={{ color: "var(--color-text-faint)" }}>
                                    Address
                                </div>
                                <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                                    {office.address}
                                </p>
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(office.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.5px] uppercase mt-2 transition-colors"
                                    style={{ color: "var(--color-blue-primary)" }}
                                >
                                    Open in Maps <ExternalLink size={11} />
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div
                                className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0"
                                style={{ background: "var(--color-blue-pale)" }}
                            >
                                <Phone size={15} style={{ color: "var(--color-blue-primary)" }} />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-1" style={{ color: "var(--color-text-faint)" }}>
                                    Phone
                                </div>
                                <a
                                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                                    className="text-[13px] transition-colors"
                                    style={{ color: "var(--color-text-body)" }}
                                >
                                    {office.phone}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div
                                className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0"
                                style={{ background: "var(--color-blue-pale)" }}
                            >
                                <Mail size={15} style={{ color: "var(--color-blue-primary)" }} />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-1" style={{ color: "var(--color-text-faint)" }}>
                                    Email
                                </div>
                                <a
                                    href={`mailto:${office.email}`}
                                    className="text-[13px] transition-colors"
                                    style={{ color: "var(--color-text-body)" }}
                                >
                                    {office.email}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div
                                className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0"
                                style={{ background: "var(--color-blue-pale)" }}
                            >
                                <Clock size={15} style={{ color: "var(--color-blue-primary)" }} />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-1" style={{ color: "var(--color-text-faint)" }}>
                                    Working Hours
                                </div>
                                <p className="text-[13px]" style={{ color: "var(--color-text-body)" }}>
                                    {office.hours}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Quick connect note */}
            <div
                className="rounded-card border p-5"
                style={{
                    borderColor: "var(--color-border)",
                    background: "var(--color-page-bg)",
                    borderLeft: "3px solid var(--color-gold)",
                }}
            >
                <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    <span className="font-bold" style={{ color: "var(--color-text-body)" }}>For urgent project site inquiries,</span>{" "}
                    please call our head office directly. Tender-related queries are best
                    submitted via the contact form for a documented response.
                </p>
            </div>
        </div>
    );
}