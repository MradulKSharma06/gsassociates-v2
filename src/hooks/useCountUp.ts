"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
    end: number;
    duration?: number;
    start?: number;
    decimals?: number;
    enabled?: boolean;
}

export function useCountUp({
    end,
    duration = 1800,
    start = 0,
    decimals = 0,
    enabled = true,
}: UseCountUpOptions) {
    const [value, setValue] = useState(start);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;

            setValue(parseFloat(current.toFixed(decimals)));

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            startTimeRef.current = null;
        };
    }, [end, duration, start, decimals, enabled]);

    return value;
}