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
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setMobileOpen(false), [pathname]);

    return (
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <div
                className={cn(
                    "pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-5 sm:px-7 py-3 border",
                    scrolled
                        ? "bg-white/95 backdrop-blur-md border-slate-300 shadow-matte-md"
                        : "bg-white/90 backdrop-blur-md border-slate-200/90 shadow-matte-sm"
                )}
            >
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2 group select-none">
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

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/60">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors",
                                    isActive
                                        ? "text-white"
                                        : "text-slate-600 hover:text-[#0d1b2e]"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="navActivePill"
                                        className="absolute inset-0 bg-[#0d1b2e] rounded-full z-0"
                                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action: Capsule CTA */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/contact"
                        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0d1b2e] hover:bg-[#162a42] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_6px_rgba(13,27,46,0.12)] transition-all"
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="pointer-events-auto absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-5 shadow-matte-lg md:hidden z-50 flex flex-col gap-2"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors",
                                    pathname === link.href
                                        ? "bg-[#0d1b2e] text-white"
                                        : "text-slate-700 hover:bg-slate-100"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="w-full justify-center mt-3 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0d1b2e] hover:bg-[#162a42] border border-white/10 shadow-sm"
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
