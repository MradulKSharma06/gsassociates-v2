import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
    label: string;
    href?: string;
}

interface PageWrapperProps {
    label: string;
    title: React.ReactNode;
    subtitle?: string;
    breadcrumbs?: Breadcrumb[];
    children: React.ReactNode;
}

export function PageWrapper({
    label,
    title,
    subtitle,
    breadcrumbs,
    children,
}: PageWrapperProps) {
    return (
        <>
            {/* Page hero banner */}
            <section
                className="relative overflow-hidden section-padding-sm"
                style={{ background: "var(--color-navy)" }}
            >
                {/* Top accent bar */}
                <div className="accent-bar absolute top-0 left-0 right-0" />

                {/* Grid texture */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.04]"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <defs>
                        <pattern id="pw-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pw-grid)" />
                </svg>

                <div className="container-site relative z-10">
                    {/* Breadcrumbs */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <nav className="flex items-center gap-1.5 mb-4" aria-label="Breadcrumb">
                            <Link
                                href="/"
                                className="text-[10px] font-bold tracking-[1px] uppercase transition-colors"
                                style={{ color: "#3d5a73" }}
                            >
                                Home
                            </Link>
                            {breadcrumbs.map((crumb, i) => (
                                <span key={i} className="flex items-center gap-1.5">
                                    <ChevronRight size={10} style={{ color: "#3d5a73" }} />
                                    {crumb.href && i < breadcrumbs.length - 1 ? (
                                        <Link
                                            href={crumb.href}
                                            className="text-[10px] font-bold tracking-[1px] uppercase"
                                            style={{ color: "#3d5a73" }}
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span
                                            className="text-[10px] font-bold tracking-[1px] uppercase"
                                            style={{ color: "#5a7a99" }}
                                        >
                                            {crumb.label}
                                        </span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    )}

                    <SectionLabel light>{label}</SectionLabel>

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
                        {title}
                    </h1>

                    {subtitle && (
                        <p
                            className="mt-4 text-[15px] font-light max-w-[560px]"
                            style={{ color: "#8aadcc" }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            </section>

            {/* Page content */}
            {children}
        </>
    );
}