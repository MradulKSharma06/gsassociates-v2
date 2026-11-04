import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <section
            className="min-h-[70vh] flex items-center justify-center"
            style={{ background: "var(--color-page-bg)" }}
        >
            <div className="container-site text-center py-24">
                {/* Big 404 */}
                <div
                    style={{
                        fontFamily: "var(--font-condensed)",
                        fontSize: "clamp(100px, 20vw, 220px)",
                        fontWeight: 800,
                        color: "var(--color-border)",
                        lineHeight: 1,
                        letterSpacing: "8px",
                        userSelect: "none",
                    }}
                    aria-hidden
                >
                    404
                </div>

                {/* Accent bar */}
                <div
                    className="h-[3px] w-24 mx-auto -mt-4 mb-8 rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--color-blue-primary), var(--color-blue-bright))" }}
                />

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
                    Page Not Found
                </h1>

                <p
                    className="text-[15px] max-w-[420px] mx-auto mb-10"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    The page you&apos;re looking for doesn&apos;t exist or may have been
                    moved. Head back to the homepage or browse our projects.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/" className="btn btn-primary btn-lg">
                        <Home size={16} />
                        Go to Homepage
                    </Link>
                    <Link href="/projects" className="btn btn-outline btn-lg">
                        <ArrowLeft size={16} />
                        Browse Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}