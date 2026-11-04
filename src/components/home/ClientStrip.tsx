import { SectionLabel } from "@/components/ui/SectionLabel";
import { clients } from "@/data/stats";

export function ClientStrip() {
    return (
        <section className="py-20 bg-[#FAF9F6] border-t border-slate-200/80">
            <div className="container-site">
                <div className="text-center mb-10">
                    <SectionLabel className="justify-center">Institutional Authority</SectionLabel>
                    <h2
                        style={{ fontFamily: "var(--font-condensed)" }}
                        className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] uppercase tracking-tight mt-1"
                    >
                        Empanelled &amp; <span className="text-[#185FA5]">Trusted By</span>
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                        Executing mission-critical civil contracts across Tamil Nadu state departments and municipal bodies.
                    </p>
                </div>

                {/* Architectural client monogram pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
                    {clients.map((client) => (
                        <div
                            key={client}
                            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white border border-slate-200/80 shadow-matte-sm hover:border-[#185FA5]/40 hover:shadow-matte-md transition-all group"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#185FA5]/30 group-hover:bg-[#185FA5] transition-colors" />
                            <span
                                style={{ fontFamily: "var(--font-condensed)" }}
                                className="text-sm font-bold tracking-wider uppercase text-[#0d1b2e] group-hover:text-[#185FA5] transition-colors"
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
