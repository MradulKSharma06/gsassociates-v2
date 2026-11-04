"use client";

import { motion } from "framer-motion";

interface IconProps {
    className?: string;
    size?: number;
}

// 1. Caliper / Compass (Engineering Precision)
export function CaliperIcon({ className = "text-navy", size = 24 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="5" r="2" />
            <motion.path
                d="m14 7 6.5 13.5"
                initial={{ pathLength: 0.9 }}
                whileHover={{ rotate: [0, 4, 0] }}
                transition={{ duration: 0.4 }}
            />
            <motion.path
                d="m10 7-6.5 13.5"
                initial={{ pathLength: 0.9 }}
                whileHover={{ rotate: [0, -4, 0] }}
                transition={{ duration: 0.4 }}
            />
            <path d="M7 16h10" strokeDasharray="1 2" />
        </svg>
    );
}

// 2. Bridge Span & Truss (Structural Civil Engineering)
export function BridgeSpanIcon({ className = "text-navy", size = 24 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M3 19h18" />
            <path d="M3 14h18" />
            <motion.path
                d="M3 10a18 18 0 0 1 18 0"
                initial={{ pathLength: 1 }}
                whileHover={{ y: [0, -1.5, 0] }}
                transition={{ duration: 0.3 }}
            />
            <path d="m6 14 3-4 3 4 3-4 3 4" />
            <line x1="6" y1="14" x2="6" y2="19" />
            <line x1="18" y1="14" x2="18" y2="19" />
        </svg>
    );
}

// 3. Arterial Highway Ribbon (Roads & Expressways)
export function HighwayIcon({ className = "text-navy", size = 24 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4 20 8 4" />
            <path d="M16 4l4 16" />
            <motion.line
                x1="12"
                y1="6"
                x2="12"
                y2="9"
                strokeDasharray="2 2"
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <line x1="12" y1="13" x2="12" y2="17" strokeDasharray="2 2" />
        </svg>
    );
}

// 4. Government Class A Contractor Seal
export function ClassAContractorIcon({ className = "text-gold", size = 24 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <motion.path
                d="m9 12 2 2 4-4"
                initial={{ pathLength: 0.2 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
            />
        </svg>
    );
}

// 5. Civic Architecture / Government Landmark Icon
export function CivicBuildingIcon({ className = "text-navy", size = 24 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M8 10h.01" />
            <path d="M16 10h.01" />
            <path d="M8 14h.01" />
            <path d="M16 14h.01" />
        </svg>
    );
}
