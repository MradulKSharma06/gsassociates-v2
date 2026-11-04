"use client";

import { useIntersection } from "@/hooks/useIntersection";
import { useCountUp } from "@/hooks/useCountUp";
import { stats } from "@/data/stats";

function StatItem({
    stat,
    enabled,
}: {
    stat: (typeof stats)[0];
    enabled: boolean;
}) {
    const value = useCountUp({
        end: stat.value,
        duration: 1800,
        decimals: stat.decimals ?? 0,
        enabled,
    });

    return (
        <div className="flex flex-col">
            <div
                style={{ fontFamily: "var(--font-condensed)" }}
                className="text-4xl sm:text-5xl font-extrabold text-[#0d1b2e] tracking-tight leading-none"
            >
                {stat.prefix && <span className="text-[#185FA5] text-[0.7em] mr-0.5">{stat.prefix}</span>}
                {value}
                <span className="text-[#c88a22] text-[0.6em] ml-0.5">{stat.suffix}</span>
            </div>
            <div className="text-xs font-mono-tech uppercase tracking-wider text-slate-500 mt-2 font-semibold">
                {stat.label}
            </div>
        </div>
    );
}

export function StatsRow() {
    const { ref, isVisible } = useIntersection({ threshold: 0.2 });

    return (
        <section className="bg-white border-b border-slate-200/80 py-12">
            <div className="container-site">
                <div
                    ref={ref as React.RefObject<HTMLDivElement>}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-200"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="lg:px-8 first:pl-0 last:pr-0">
                            <StatItem stat={stat} enabled={isVisible} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
