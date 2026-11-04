"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    const [optimisticPath, setOptimisticPath] = useState(pathname);
    const [hoveredHref, setHoveredHref] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setOptimisticPath(pathname);
    }, [pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 15);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setMobileOpen(false), [pathname]);

    const isLinkActive = (href: string) => {
        const current = optimisticPath || pathname;
        if (href === "/") return current === "/";
        return current.startsWith(href);
    };

    return (
        <header className="fixed top-3.5 sm:top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <div
                className={cn(
                    "pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border",
                    scrolled
                        ? "bg-white/95 backdrop-blur-md border-slate-300 shadow-matte-md"
                        : "bg-white/90 backdrop-blur-md border-slate-200/90 shadow-matte-sm"
                )}
            >
                {/* Brand Logo */}
                <Link
                    href="/"
                    onClick={() => setOptimisticPath("/")}
                    className="flex items-center gap-2 group select-none"
                >
                    <div className="flex flex-col leading-none">
                        <span
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-xl sm:text-2xl font-extrabold text-[#0d1b2e] tracking-wider uppercase leading-none"
                        >
                            GS<span className="text-[#185FA5]">ASSOCIATES</span>
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-mono-tech tracking-widest uppercase text-slate-500 leading-none mt-0.5">
                            Construction Pvt. Ltd.
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav Links with Fluid Floating Pill & Pop Animation */}
                <nav
                    onMouseLeave={() => setHoveredHref(null)}
                    className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/70 relative"
                >
                    {navLinks.map((link) => {
                        const isActive = isLinkActive(link.href);
                        const isHovered = hoveredHref === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onMouseEnter={() => setHoveredHref(link.href)}
                                onClick={() => {
                                    setOptimisticPath(link.href);
                                    setHoveredHref(null);
                                }}
                                className={cn(
                                    "relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors select-none",
                                    isActive
                                        ? "text-white"
                                        : isHovered
                                        ? "text-[#0d1b2e]"
                                        : "text-slate-600 hover:text-[#0d1b2e]"
                                )}
                            >
                                {/* 1. Active Shared Spring Pill with Top Glare */}
                                {isActive && (
                                    <motion.div
                                        layoutId="navActivePill"
                                        className="absolute inset-0 bg-[#0d1b2e] rounded-full z-0 shadow-[0_2px_10px_rgba(13,27,46,0.28),inset_0_1px_0_rgba(255,255,255,0.22)]"
                                        transition={{
                                            type: "spring",
                                            stiffness: 340,
                                            damping: 26,
                                            mass: 0.65,
                                        }}
                                    >
                                        {/* Subtle luxury bevel light */}
                                        <div className="absolute inset-x-2 top-0.5 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
                                    </motion.div>
                                )}

                                {/* 2. Secondary Hover Ghost Pill */}
                                {!isActive && isHovered && (
                                    <motion.div
                                        layoutId="navHoverPill"
                                        className="absolute inset-0 bg-slate-200/70 rounded-full z-0"
                                        transition={{
                                            type: "spring",
                                            stiffness: 420,
                                            damping: 28,
                                        }}
                                    />
                                )}

                                {/* 3. Pop-Scaled Label */}
                                <motion.span
                                    className="relative z-10 inline-block font-mono-tech"
                                    animate={{
                                        scale: isActive ? 1.05 : 1,
                                        y: isActive ? -0.5 : 0,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 450,
                                        damping: 25,
                                    }}
                                >
                                    {link.label}
                                </motion.span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action: Capsule CTA */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/contact"
                        onClick={() => setOptimisticPath("/contact")}
                        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0d1b2e] hover:bg-[#162a42] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_6px_rgba(13,27,46,0.12)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span>Tender Inquiries</span>
                        <ArrowUpRight size={13} />
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen((p) => !p)}
                        className="md:hidden text-slate-700 hover:text-[#0d1b2e] p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Panel */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-auto absolute top-18 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-matte-lg md:hidden z-50 flex flex-col gap-1.5"
                    >
                        {navLinks.map((link) => {
                            const isActive = isLinkActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => {
                                        setOptimisticPath(link.href);
                                        setMobileOpen(false);
                                    }}
                                    className={cn(
                                        "px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between",
                                        isActive
                                            ? "bg-[#0d1b2e] text-white shadow-sm"
                                            : "text-slate-700 hover:bg-slate-100"
                                    )}
                                >
                                    <span>{link.label}</span>
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c88a22]" />
                                    )}
                                </Link>
                            );
                        })}
                        <Link
                            href="/contact"
                            onClick={() => {
                                setOptimisticPath("/contact");
                                setMobileOpen(false);
                            }}
                            className="w-full justify-center mt-2 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0d1b2e] hover:bg-[#162a42] border border-white/10 shadow-sm"
                        >
                            <span>Tender Inquiries</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
