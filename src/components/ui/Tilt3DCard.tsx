"use client";

import React, { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Tilt3DCardProps {
    children: ReactNode;
    className?: string;
    maxTilt?: number;
    glare?: boolean;
}

export function Tilt3DCard({
    children,
    className = "",
    maxTilt = 7,
    glare = true,
}: Tilt3DCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

    // Glare position
    const glareX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        const normalizedX = clientX / rect.width - 0.5;
        const normalizedY = clientY / rect.height - 0.5;

        x.set(normalizedX);
        y.set(normalizedY);
    }

    function handleMouseEnter() {
        setIsHovered(true);
    }

    function handleMouseLeave() {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className={`relative rounded-2xl will-change-transform ${className}`}
        >
            {children}

            {/* Subtle Architectural Glare Reflection */}
            {glare && isHovered && (
                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 transition-opacity"
                    style={{
                        background: `radial-gradient(circle 280px at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.6), transparent 70%)`,
                    }}
                />
            )}
        </motion.div>
    );
}
