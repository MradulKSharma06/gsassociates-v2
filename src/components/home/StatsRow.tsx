"use client";

import { useIntersection } from "@/hooks/useIntersection";
import { useCountUp } from "@/hooks/useCountUp";
import { stats } from "@/data/stats";

function StatItem({
    stat,
    enabled,
    delay,
}: {
    stat: (typeof stats)[0];
    enabled: boolean;
    delay: number;
}) {
    const value = useCountUp({
        end: stat.value,
        duration: 1800,
        decimals: stat.decimals ?? 0,
        enabled,
    });

    return (
        <div
            className="reveal"
            style={{
                transitionDelay: `${delay}ms`,
            }}
        >
            <div className="stat-number">
                {stat.prefix && (
                    <span className="text-[0.55em] font-extrabold" style={{ color: "var(--color-blue-primary)" }}>
                        {stat.prefix}
                    </span>
                )}
                {value}
                <span className="stat-unit">{stat.suffix}</span>
            </div>
            <div
                className="text-[10px] font-bold tracking-[2px] uppercase mt-2"
                style={{ color: "var(--color-text-faint)" }}
            >
                {stat.label}
            </div>
        </div>
    );
}

export function StatsRow() {
    const { ref, isVisible } = useIntersection({ threshold: 0.3 });

    return (
        <section
            className="border-y"
            style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
            }}
        >
            <div className="container-site py-14">
                <div
                    ref={ref as React.RefObject<HTMLDivElement>}
                    className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x`}
                    style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}
                >
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`lg:px-10 first:pl-0 last:pr-0 ${isVisible ? "revealed" : ""}`}
                        >
                            <StatItem
                                stat={stat}
                                enabled={isVisible}
                                delay={i * 100}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}