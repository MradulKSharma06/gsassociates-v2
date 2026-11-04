import { ArrowLeft, Home } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";

export default function NotFound() {
    return (
        <section className="min-h-[75vh] flex items-center justify-center bg-[#FAF9F6] blueprint-grid">
            <div className="container-site text-center py-20 relative z-10">
                <div
                    style={{
                        fontFamily: "var(--font-condensed)",
                        fontSize: "clamp(100px, 18vw, 200px)",
                        lineHeight: 1,
                        letterSpacing: "4px",
                    }}
                    className="font-extrabold text-slate-200 select-none"
                    aria-hidden
                >
                    404
                </div>

                <div className="h-[2px] w-20 mx-auto -mt-4 mb-6 rounded-full bg-[#185FA5]" />

                <h1
                    style={{ fontFamily: "var(--font-condensed)" }}
                    className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] uppercase tracking-wide mb-3"
                >
                    Drawing Not Located
                </h1>

                <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 font-normal">
                    The requested architectural drawing or project spec sheet is not in this directory. Return to the main project registry or homepage.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <ArchitecturalButton href="/" variant="primary" size="md">
                        <Home size={14} className="mr-1" />
                        Main Index
                    </ArchitecturalButton>
                    <ArchitecturalButton href="/projects" variant="wireframe" size="md">
                        <ArrowLeft size={14} className="mr-1" />
                        Project Registry
                    </ArchitecturalButton>
                </div>
            </div>
        </section>
    );
}
