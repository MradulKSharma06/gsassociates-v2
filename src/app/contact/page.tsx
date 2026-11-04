import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { MapEmbed } from "@/components/contact/MapEmbed";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Reach out to GSAssociates Construction for tender inquiries, partnerships, project consultancy, or general information. We respond within one business day.",
};

const faqs = [
    {
        q: "How do I register as a subcontractor?",
        a: "Send your company profile, credentials, and capability statement to info@GSAssociates.in with the subject line 'Subcontractor Registration'.",
    },
    {
        q: "Where can I find current tender notices?",
        a: "Active tenders are published on the Tamil Nadu government e-procurement portal. Visit our Clients page for empanelment details.",
    },
    {
        q: "Do you undertake projects outside Tamil Nadu?",
        a: "Our primary focus is Tamil Nadu government infrastructure. However, we consider neighbouring state projects on a case-by-case basis.",
    },
    {
        q: "What is your typical response time for inquiries?",
        a: "All form submissions and emails receive a response within one business day. Urgent calls are attended to during working hours.",
    },
];

export default function ContactPage() {
    return (
        <>
            {/* Page hero */}
            <section
                className="relative overflow-hidden section-padding-sm"
                style={{ background: "var(--color-navy)" }}
            >
                <div className="accent-bar absolute top-0 left-0 right-0" />
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.04]"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <defs>
                        <pattern id="cg" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cg)" />
                </svg>

                {/* BG watermark */}
                <div
                    className="absolute inset-0 flex items-center justify-end pr-16 pointer-events-none select-none"
                    aria-hidden
                >
                    <span
                        style={{
                            fontFamily: "var(--font-condensed)",
                            fontSize: "clamp(70px, 13vw, 160px)",
                            fontWeight: 800,
                            color: "rgba(255,255,255,0.025)",
                            textTransform: "uppercase",
                            letterSpacing: "6px",
                            lineHeight: 1,
                        }}
                    >
                        CONTACT
                    </span>
                </div>

                <div className="container-site relative z-10">
                    <SectionLabel light>Get In Touch</SectionLabel>
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
                        Contact <span style={{ color: "var(--color-blue-bright)" }}>Us</span>
                    </h1>
                    <p
                        className="mt-4 text-[15px] font-light max-w-[520px]"
                        style={{ color: "#8aadcc" }}
                    >
                        For tenders, partnerships, project inquiries, or general information
                        — our team is ready to assist.
                    </p>
                </div>
            </section>

            {/* Main content */}
            <section
                className="section-padding"
                style={{ background: "var(--color-page-bg)" }}
            >
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
                        {/* Left — Form */}
                        <div>
                            <ContactForm />
                        </div>

                        {/* Right — Info + Map */}
                        <div className="flex flex-col gap-6">
                            <ContactInfo />
                            <MapEmbed />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ section */}
            <section
                className="section-padding-sm"
                style={{
                    background: "var(--color-surface)",
                    borderTop: "1px solid var(--color-border)",
                }}
            >
                <div className="container-site">
                    <div className="mb-10">
                        <SectionLabel>Quick Answers</SectionLabel>
                        <h2 className="section-heading">
                            Frequently Asked <span>Questions</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="rounded-card border p-6"
                                style={{
                                    background: "var(--color-page-bg)",
                                    borderColor: "var(--color-border)",
                                    borderLeft: "3px solid var(--color-blue-primary)",
                                }}
                            >
                                <h3
                                    style={{
                                        fontFamily: "var(--font-condensed)",
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        color: "var(--color-text-primary)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        marginBottom: "8px",
                                    }}
                                >
                                    {faq.q}
                                </h3>
                                <p
                                    className="text-[13px] leading-relaxed"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}