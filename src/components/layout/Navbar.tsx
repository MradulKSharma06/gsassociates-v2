"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/clients", label: "Clients" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => setMobileOpen(false), [pathname]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-navy shadow-[0_2px_20px_rgba(13,27,46,0.25)] py-0"
                        : "bg-navy/95 backdrop-blur-sm py-0"
                )}
            >
                {/* Accent bar at very top */}
                <div className="accent-bar h-[3px]" />

                <div className="container-site">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="flex flex-col leading-none">
                                <span
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-[22px] font-extrabold text-white tracking-[2px] uppercase leading-none"
                                >
                                    GS
                                    <span className="text-blue-bright">ASSOCIATES</span>
                                </span>
                                <span className="text-[9px] font-semibold tracking-[2.5px] uppercase text-blue-light/50 leading-none mt-0.5">
                                    Construction Pvt. Ltd.
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "nav-link-item",
                                        pathname === link.href && "active"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA + Mobile Toggle */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/contact"
                                className="hidden lg:inline-flex btn btn-primary btn-sm"
                            >
                                Get In Touch
                            </Link>

                            <button
                                onClick={() => setMobileOpen((p) => !p)}
                                className="lg:hidden text-blue-light/70 hover:text-white transition-colors p-1"
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "lg:hidden bg-navy border-t border-navy-700 overflow-hidden transition-all duration-300",
                        mobileOpen ? "max-h-screen py-4" : "max-h-0"
                    )}
                >
                    <div className="container-site flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-[11px] font-bold tracking-[1.5px] uppercase py-3 border-b border-navy-700/50",
                                    pathname === link.href
                                        ? "text-blue-bright"
                                        : "text-slate-400 hover:text-white"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="btn btn-primary btn-sm mt-3 w-full text-center"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </header>

            {/* Spacer for fixed header */}
            <div className="h-[67px]" />
        </>
    );
}