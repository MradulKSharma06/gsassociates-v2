"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100] pointer-events-none"
            style={{
                scaleX,
                background: "linear-gradient(90deg, #185FA5 0%, #378ADD 50%, #E8A020 100%)",
            }}
        />
    );
}
