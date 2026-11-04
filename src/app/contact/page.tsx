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
        a: "All form submissions and emails receive an official response within one business day. Urgent technical calls are attended to during working hours.",
    },
];

export default function ContactPage() {
    return (
        <>
            {/* Architectural Page Hero */}
            <section className="relative overflow-hidden section-padding-sm bg-[#FAF9F6] border-b border-slate-200/80 blueprint-grid">
                <div className="container-site relative z-10">
                    <SectionLabel>Institutional Contact</SectionLabel>
                    <h1
                        style={{ fontFamily: "var(--font-condensed)" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] uppercase tracking-tight leading-none mt-2"
                    >
                        Tender &amp; Project <span className="text-[#185FA5]">Inquiries</span>
                    </h1>
                    <p className="mt-4 text-base text-slate-600 max-w-xl font-normal">
                        Direct communication channels for government departments, public authorities, and
                        engineering partners across Tamil Nadu.
                    </p>
                </div>
            </section>

            {/* Main Form and Info Layout */}
            <section className="section-padding bg-white border-b border-slate-200/80">
                <div className="container-site">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-7">
                            <ContactForm />
                        </div>
                        <div className="lg:col-span-5 space-y-8">
                            <ContactInfo />
                            <MapEmbed />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="section-padding-sm bg-[#FAF9F6]">
                <div className="container-site">
                    <div className="max-w-2xl mb-10">
                        <SectionLabel>Procedural Clarifications</SectionLabel>
                        <h2 className="section-heading text-3xl">
                            Frequently Asked <span>Questions</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="p-7 rounded-2xl bg-white border border-slate-200 shadow-matte-sm"
                            >
                                <h3
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-xl font-bold text-[#0d1b2e] mb-2 leading-snug"
                                >
                                    {faq.q}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
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
