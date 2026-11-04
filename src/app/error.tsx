"use client";

import { useEffect } from "react";

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
        <section
            className="min-h-[60vh] flex items-center justify-center"
            style={{ background: "var(--color-page-bg)" }}
        >
            <div className="container-site text-center py-24">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "var(--color-blue-pale)" }}
                >
                    <span
                        style={{
                            fontFamily: "var(--font-condensed)",
                            fontSize: "28px",
                            fontWeight: 800,
                            color: "var(--color-blue-primary)",
                        }}
                    >
                        !
                    </span>
                </div>

                <h1
                    style={{
                        fontFamily: "var(--font-condensed)",
                        fontSize: "clamp(28px, 4vw, 44px)",
                        fontWeight: 800,
                        color: "var(--color-text-primary)",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "12px",
                    }}
                >
                    Something Went Wrong
                </h1>

                <p
                    className="text-[15px] max-w-[400px] mx-auto mb-10"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    An unexpected error occurred. Please try again or return to the
                    homepage.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button onClick={reset} className="btn btn-primary">
                        Try Again
                    </button>
                    <a href="/" className="btn btn-outline">
                        Go to Homepage
                    </a>
                </div>
            </div>
        </section>
    );
}