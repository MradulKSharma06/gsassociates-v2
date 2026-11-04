"use client";

import { useEffect } from "react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";
import { RotateCw, Home } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF9F6] blueprint-grid">
            <div className="container-site text-center py-20 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
                    <span
                        style={{ fontFamily: "var(--font-condensed)" }}
                        className="text-2xl font-bold text-amber-600"
                    >
                        !
                    </span>
                </div>

                <h1
                    style={{ fontFamily: "var(--font-condensed)" }}
                    className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] uppercase tracking-wide mb-3"
                >
                    Rendering Interrupted
                </h1>

                <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 font-normal">
                    An unexpected runtime exception was caught by the boundary. You can attempt to re-render the view or return to the main registry.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <ArchitecturalButton onClick={reset} variant="primary" size="md">
                        <RotateCw size={14} className="mr-1" />
                        Retry Operation
                    </ArchitecturalButton>
                    <ArchitecturalButton href="/" variant="wireframe" size="md">
                        <Home size={14} className="mr-1" />
                        Main Index
                    </ArchitecturalButton>
                </div>
            </div>
        </section>
    );
}
