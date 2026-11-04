"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

export function MapEmbed() {
    const [loaded, setLoaded] = useState(false);

    // Replace src with actual Google Maps embed URL after getting API key
    // Format: https://www.google.com/maps/embed?pb=...
    const EMBED_URL =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6743!2d80.2574!3d13.0509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzAzLjIiTiA4MMKwMTUnMjYuNiJF!5e0!3m2!1sen!2sin!4v1234567890";

    return (
        <div
            className="rounded-card border overflow-hidden"
            style={{ borderColor: "var(--color-border)" }}
        >
            {/* Map header */}
            <div
                className="px-6 py-4 border-b flex items-center gap-3"
                style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
            >
                <MapPin size={15} style={{ color: "var(--color-blue-primary)" }} />
                <span
                    className="text-[10px] font-bold tracking-[2px] uppercase"
                    style={{ color: "var(--color-text-faint)" }}
                >
                    Head Office — Chennai
                </span>
            </div>

            {/* Map */}
            <div className="relative" style={{ height: "280px", background: "var(--color-page-bg)" }}>
                {/* Placeholder shown while iframe loads */}
                {!loaded && (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                        style={{ background: "var(--color-page-bg)" }}
                    >
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ background: "var(--color-blue-pale)" }}
                        >
                            <MapPin size={22} style={{ color: "var(--color-blue-primary)" }} />
                        </div>
                        <span
                            className="text-[12px] font-500"
                            style={{ color: "var(--color-text-faint)" }}
                        >
                            Loading map…
                        </span>
                    </div>
                )}

                <iframe
                    src={EMBED_URL}
                    width="100%"
                    height="280"
                    style={{ border: 0, display: loaded ? "block" : "none" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setLoaded(true)}
                    title="GSAssociates Head Office Location"
                />
            </div>

            {/* Footer note */}
            <div
                className="px-6 py-3 border-t"
                style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
            >
                <p className="text-[11px]" style={{ color: "var(--color-text-faint)" }}>
                    45, Anna Salai, Teynampet, Chennai — 600 018
                </p>
            </div>
        </div>
    );
}