"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "wireframe" | "gold" | "ghost" | "white";
    size?: "sm" | "md" | "lg";
    href?: string;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export function ArchitecturalButton({
    children,
    variant = "primary",
    size = "md",
    href,
    className = "",
    onClick,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const sizeClasses = {
        sm: "px-4 py-2 text-[11px] tracking-wider",
        md: "px-6 py-3 text-xs tracking-wider",
        lg: "px-8 py-4 text-xs font-bold tracking-widest",
    };

    const variantClasses = {
        primary:
            "bg-[#0d1b2e] text-white border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_8px_rgba(13,27,46,0.12)] hover:bg-[#162a42] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_18px_rgba(13,27,46,0.18)]",
        wireframe:
            "bg-white/80 backdrop-blur-md text-[#0d1b2e] border border-slate-300 shadow-sm hover:bg-white hover:border-[#0d1b2e] hover:shadow-md",
        gold:
            "bg-[#c88a22] text-white border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_8px_rgba(200,138,34,0.2)] hover:bg-[#a97116] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_18px_rgba(200,138,34,0.3)]",
        white:
            "bg-white text-[#0d1b2e] border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[#FAF9F6] hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)]",
        ghost:
            "bg-transparent text-slate-600 hover:text-[#0d1b2e] hover:bg-slate-100",
    };

    const baseClass = cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase transition-all select-none cursor-pointer",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
    );

    if (href) {
        return (
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Link href={href} className={baseClass}>
                    {children}
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseClass}
        >
            {children}
        </motion.button>
    );
}
