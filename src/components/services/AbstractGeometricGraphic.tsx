"use client";

import { motion } from "framer-motion";

interface AbstractGeometricGraphicProps {
    index?: number;
    className?: string;
}

export function AbstractGeometricGraphic({ index = 0, className = "" }: AbstractGeometricGraphicProps) {
    const variant = Math.abs(index) % 5;

    return (
        <div
            className={`relative w-full h-36 sm:h-44 my-4 rounded-xl overflow-hidden bg-[#FAF9F6] border border-slate-200/80 shadow-[inset_0_1px_3px_rgba(13,27,46,0.03)] flex items-center justify-center select-none group/shape p-4 ${className}`}
        >
            {/* Subtle background radial ambient wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-slate-100/50 pointer-events-none" />

            {/* Shape 0: Concentric Architectural Arches & Floating Minimalist Orb */}
            {variant === 0 && (
                <motion.svg
                    viewBox="0 0 240 140"
                    className="w-full h-full max-h-32 text-[#0d1b2e]"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Concentric Arches */}
                    <path
                        d="M 50 125 A 70 70 0 0 1 190 125"
                        fill="none"
                        stroke="#0d1b2e"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 70 125 A 50 50 0 0 1 170 125"
                        fill="none"
                        stroke="#185FA5"
                        strokeWidth="1.2"
                        strokeOpacity="0.6"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 90 125 A 30 30 0 0 1 150 125"
                        fill="rgba(24, 95, 165, 0.05)"
                        stroke="#185FA5"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />

                    {/* Floating Accent Sphere */}
                    <circle
                        cx="175"
                        cy="45"
                        r="14"
                        fill="rgba(200, 138, 34, 0.15)"
                        stroke="#c88a22"
                        strokeWidth="1.2"
                    />
                    <circle cx="175" cy="45" r="4" fill="#c88a22" />

                    {/* Vertical & Horizontal Balance Lines */}
                    <line x1="120" y1="20" x2="120" y2="125" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="30" y1="125" x2="210" y2="125" stroke="#0d1b2e" strokeWidth="1" />

                    {/* Minimalist Geometry Dots */}
                    <circle cx="120" cy="20" r="2.5" fill="#0d1b2e" />
                    <circle cx="50" cy="125" r="2" fill="#0d1b2e" />
                    <circle cx="190" cy="125" r="2" fill="#0d1b2e" />
                </motion.svg>
            )}

            {/* Shape 1: Layered Isometric Geometric Slabs & Orbital Rings */}
            {variant === 1 && (
                <motion.svg
                    viewBox="0 0 240 140"
                    className="w-full h-full max-h-32 text-[#0d1b2e]"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Lower Slab */}
                    <polygon
                        points="120,40 190,75 120,110 50,75"
                        fill="rgba(13, 27, 46, 0.04)"
                        stroke="#0d1b2e"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                    />
                    {/* Middle Slab */}
                    <polygon
                        points="120,25 180,55 120,85 60,55"
                        fill="rgba(24, 95, 165, 0.07)"
                        stroke="#185FA5"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                    />

                    {/* Orbital Ring cutting through */}
                    <ellipse
                        cx="120"
                        cy="68"
                        rx="75"
                        ry="28"
                        fill="none"
                        stroke="#c88a22"
                        strokeWidth="1"
                        strokeDasharray="4 3"
                    />
                    <circle cx="195" cy="68" r="4.5" fill="#c88a22" />

                    {/* Core Pivot Line */}
                    <line x1="120" y1="12" x2="120" y2="125" stroke="#0d1b2e" strokeWidth="0.9" />
                    <circle cx="120" cy="12" r="3" fill="#0d1b2e" />
                    <circle cx="120" cy="125" r="2" fill="#94a3b8" />
                </motion.svg>
            )}

            {/* Shape 2: Bauhaus Kinetic Wave & Intersecting Capsules */}
            {variant === 2 && (
                <motion.svg
                    viewBox="0 0 240 140"
                    className="w-full h-full max-h-32 text-[#0d1b2e]"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Smooth S-Curve Wave */}
                    <path
                        d="M 30 70 Q 75 15 120 70 T 210 70"
                        fill="none"
                        stroke="#0d1b2e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 30 85 Q 75 30 120 85 T 210 85"
                        fill="none"
                        stroke="#185FA5"
                        strokeWidth="1"
                        strokeOpacity="0.5"
                        strokeLinecap="round"
                    />

                    {/* Vertical Pill Capsule Shape */}
                    <rect
                        x="105"
                        y="20"
                        width="30"
                        height="100"
                        rx="15"
                        fill="rgba(24, 95, 165, 0.05)"
                        stroke="#185FA5"
                        strokeWidth="1.2"
                    />

                    {/* Accent geometric disc */}
                    <circle
                        cx="75"
                        cy="42"
                        r="12"
                        fill="rgba(200, 138, 34, 0.15)"
                        stroke="#c88a22"
                        strokeWidth="1.2"
                    />
                    <circle cx="75" cy="42" r="3" fill="#c88a22" />

                    {/* Minimalist dot grid */}
                    <circle cx="165" cy="98" r="2.5" fill="#0d1b2e" />
                    <circle cx="178" cy="98" r="2" fill="#94a3b8" />
                    <circle cx="191" cy="98" r="1.5" fill="#cbd5e1" />
                </motion.svg>
            )}

            {/* Shape 3: Harmonic Radial Rings & Minimalist Horizon */}
            {variant === 3 && (
                <motion.svg
                    viewBox="0 0 240 140"
                    className="w-full h-full max-h-32 text-[#0d1b2e]"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Large Outer Ring */}
                    <circle
                        cx="120"
                        cy="70"
                        r="52"
                        fill="none"
                        stroke="#0d1b2e"
                        strokeWidth="1.2"
                    />
                    {/* Middle Ring */}
                    <circle
                        cx="120"
                        cy="70"
                        r="34"
                        fill="rgba(24, 95, 165, 0.05)"
                        stroke="#185FA5"
                        strokeWidth="1"
                    />
                    {/* Solid Inner Core */}
                    <circle
                        cx="120"
                        cy="70"
                        r="12"
                        fill="#0d1b2e"
                    />

                    {/* Off-center accent moon arc */}
                    <path
                        d="M 120 18 A 52 52 0 0 1 172 70"
                        fill="none"
                        stroke="#c88a22"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <circle cx="172" cy="70" r="3" fill="#c88a22" />

                    {/* Clean Horizontal Horizon Line */}
                    <line x1="25" y1="70" x2="215" y2="70" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="4 3" />
                </motion.svg>
            )}

            {/* Shape 4: Stepped Minimalist Rectangles & Perspective Portal */}
            {variant === 4 && (
                <motion.svg
                    viewBox="0 0 240 140"
                    className="w-full h-full max-h-32 text-[#0d1b2e]"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Stepped Architectural Portals */}
                    <rect
                        x="60"
                        y="20"
                        width="120"
                        height="100"
                        rx="8"
                        fill="none"
                        stroke="#0d1b2e"
                        strokeWidth="1.2"
                    />
                    <rect
                        x="78"
                        y="35"
                        width="84"
                        height="85"
                        rx="6"
                        fill="rgba(24, 95, 165, 0.04)"
                        stroke="#185FA5"
                        strokeWidth="1"
                    />
                    <rect
                        x="96"
                        y="50"
                        width="48"
                        height="70"
                        rx="4"
                        fill="rgba(200, 138, 34, 0.08)"
                        stroke="#c88a22"
                        strokeWidth="1"
                    />

                    {/* Centered Minimalist Sphere */}
                    <circle cx="120" cy="85" r="5" fill="#0d1b2e" />

                    {/* Perspective Guide Lines */}
                    <line x1="60" y1="20" x2="96" y2="50" stroke="#94a3b8" strokeWidth="0.8" />
                    <line x1="180" y1="20" x2="144" y2="50" stroke="#94a3b8" strokeWidth="0.8" />
                    <line x1="30" y1="120" x2="210" y2="120" stroke="#0d1b2e" strokeWidth="1" />
                </motion.svg>
            )}
        </div>
    );
}
