"use client";

import { useEffect, useRef } from "react";

export function ScrollReveal({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets = el.querySelectorAll(".reveal, .reveal-left");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
        );

        targets.forEach((t) => observer.observe(t));
        return () => observer.disconnect();
    }, []);

    return <div ref={ref}>{children}</div>;
}