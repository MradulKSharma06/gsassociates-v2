import { SectionLabel } from "@/components/ui/SectionLabel";
import { clients } from "@/data/stats";

export function ClientStrip() {
    return (
        <section
            className="section-padding-sm"
            style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}
        >
            <div className="container-site">
                <div className="text-center mb-10">
                    <SectionLabel className="justify-center">Trusted By</SectionLabel>
                    <h2
                        className="section-heading"
                        style={{ fontSize: "clamp(26px, 3vw, 36px)" }}
                    >
                        Government <span>Partners</span>
                    </h2>
                </div>

                {/* Client logos — text-based for MVP; swap with <Image> for real logos */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-5">
                    {clients.map((client) => (
                        <div
                            key={client}
                            className="flex items-center justify-center px-6 py-3 rounded-card border transition-all hover:border-blue-bright/40 hover:shadow-card"
                            style={{
                                borderColor: "var(--color-border)",
                                background: "var(--color-page-bg)",
                                minWidth: "140px",
                            }}
                        >
                            <span
                                className="text-[11px] font-bold tracking-[1px] uppercase text-center"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                {client}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}