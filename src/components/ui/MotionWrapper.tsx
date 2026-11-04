"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    className?: string;
}

export function MotionWrapper({
    children,
    delay = 0,
    direction = "up",
    className = "",
    ...props
}: MotionWrapperProps) {
    const getInitial = () => {
        switch (direction) {
            case "up":
                return { opacity: 0, y: 28 };
            case "down":
                return { opacity: 0, y: -28 };
            case "left":
                return { opacity: 0, x: -28 };
            case "right":
                return { opacity: 0, x: 28 };
            case "none":
                return { opacity: 0 };
        }
    };

    return (
        <motion.div
            initial={getInitial()}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                duration: 0.55,
                delay,
                ease: [0.22, 1, 0.36, 1], // Custom smooth ease
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function StaggerContainer({
    children,
    staggerDelay = 0.12,
    className = "",
}: {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
