"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { HardHat, Activity, ChevronUp, ChevronDown } from "lucide-react";

export function ConstructionScrollEngine() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { scrollYProgress } = useScroll();
    const [progressVal, setProgressVal] = useState(0);
    const [isMinimized, setIsMinimized] = useState(false);

    // Keep progress state updated for UI HUD
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setProgressVal(latest);
        });
    }, [scrollYProgress]);

    // Canvas drawing loop synchronized with scroll progress
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const p = scrollYProgress.get(); // 0 to 1

            ctx.clearRect(0, 0, w, h);

            // Subtle Architectural blueprint background watermarks
            const baseY = h * 0.88; // Ground datum line
            const bridgeCenterX = w * 0.72; // Positioned gracefully on the right side
            const bridgeSpan = Math.min(w * 0.65, 700);
            const pylonHeight = Math.min(h * 0.55, 340);

            ctx.save();
            // Subtle engineering blueprint ink opacity so text stays 100% readable
            ctx.globalAlpha = 0.18;

            // =================================================================
            // STAGE 1: SUBTERRANEAN FOUNDATION & PILING (Progress 0.00 to 0.25)
            // =================================================================
            const s1 = Math.min(1, p / 0.25);
            if (s1 > 0) {
                // Ground Datum Line
                ctx.beginPath();
                ctx.moveTo(bridgeCenterX - bridgeSpan * 0.6, baseY);
                ctx.lineTo(bridgeCenterX + bridgeSpan * 0.6, baseY);
                ctx.strokeStyle = "#0d1b2e";
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Subterranean Piles (Drilling downward)
                const pileDepth = 60 * s1;
                const pilePositions = [-bridgeSpan * 0.25, bridgeSpan * 0.25];

                pilePositions.forEach((posX) => {
                    const cx = bridgeCenterX + posX;
                    // Foundation Cap
                    ctx.fillStyle = "#185FA5";
                    ctx.fillRect(cx - 24, baseY - 4, 48, 8 * s1);

                    // 3 Pile shafts
                    [-14, 0, 14].forEach((off) => {
                        ctx.beginPath();
                        ctx.moveTo(cx + off, baseY + 4);
                        ctx.lineTo(cx + off, baseY + 4 + pileDepth);
                        ctx.strokeStyle = "#185FA5";
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    });
                });
            }

            // =================================================================
            // STAGE 2: SUBSTRUCTURE PIERS & PYLON BASES (Progress 0.20 to 0.50)
            // =================================================================
            const s2 = Math.max(0, Math.min(1, (p - 0.2) / 0.3));
            if (s2 > 0) {
                const pierHeight = 90 * s2;
                const pylonBasePositions = [-bridgeSpan * 0.25, bridgeSpan * 0.25];

                pylonBasePositions.forEach((posX) => {
                    const cx = bridgeCenterX + posX;
                    // Pier columns rising from ground to deck level
                    ctx.beginPath();
                    ctx.moveTo(cx - 16, baseY - 4);
                    ctx.lineTo(cx - 12, baseY - 4 - pierHeight);
                    ctx.lineTo(cx + 12, baseY - 4 - pierHeight);
                    ctx.lineTo(cx + 16, baseY - 4);
                    ctx.closePath();
                    ctx.strokeStyle = "#0d1b2e";
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                    ctx.fillStyle = "rgba(13,27,46,0.06)";
                    ctx.fill();

                    // Pier Cap beam
                    if (s2 > 0.8) {
                        ctx.strokeRect(cx - 28, baseY - 4 - pierHeight, 56, 7);
                    }
                });
            }

            // =================================================================
            // STAGE 3: HORIZONTAL DECK GIRDERS & SPANS (Progress 0.40 to 0.70)
            // =================================================================
            const s3 = Math.max(0, Math.min(1, (p - 0.4) / 0.3));
            const deckY = baseY - 4 - 90;
            if (s3 > 0) {
                const currentHalfSpan = (bridgeSpan / 2) * s3;
                // Deck box girder expanding outward from center
                ctx.beginPath();
                ctx.moveTo(bridgeCenterX - currentHalfSpan, deckY);
                ctx.lineTo(bridgeCenterX + currentHalfSpan, deckY);
                ctx.lineTo(bridgeCenterX + currentHalfSpan, deckY + 12);
                ctx.lineTo(bridgeCenterX - currentHalfSpan, deckY + 12);
                ctx.closePath();
                ctx.strokeStyle = "#0d1b2e";
                ctx.lineWidth = 1.6;
                ctx.stroke();
                ctx.fillStyle = "rgba(24,95,165,0.08)";
                ctx.fill();

                // Under-deck truss diagonal lattices
                const trussSteps = Math.floor(24 * s3);
                const stepWidth = bridgeSpan / 24;
                for (let i = 0; i < trussSteps; i++) {
                    const tx = bridgeCenterX - bridgeSpan / 2 + i * stepWidth;
                    ctx.beginPath();
                    ctx.moveTo(tx, deckY + 12);
                    ctx.lineTo(tx + stepWidth, deckY);
                    ctx.strokeStyle = "rgba(24,95,165,0.4)";
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            // =================================================================
            // STAGE 4: PYLON MASTS & STAY CABLES (Progress 0.60 to 0.88)
            // =================================================================
            const s4 = Math.max(0, Math.min(1, (p - 0.6) / 0.28));
            if (s4 > 0) {
                const currentMastHeight = pylonHeight * s4;
                const pylonPositions = [-bridgeSpan * 0.25, bridgeSpan * 0.25];

                pylonPositions.forEach((posX) => {
                    const cx = bridgeCenterX + posX;
                    const topY = deckY - currentMastHeight;

                    // Diamond Pylon Masts
                    ctx.beginPath();
                    ctx.moveTo(cx - 20, deckY);
                    ctx.lineTo(cx - 4, topY);
                    ctx.lineTo(cx + 4, topY);
                    ctx.lineTo(cx + 20, deckY);
                    ctx.strokeStyle = "#0d1b2e";
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Intermediate cross struts
                    if (s4 > 0.5) {
                        ctx.beginPath();
                        ctx.moveTo(cx - 12, deckY - currentMastHeight * 0.5);
                        ctx.lineTo(cx + 12, deckY - currentMastHeight * 0.5);
                        ctx.strokeStyle = "#c88a22";
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }

                    // Tension Stay Cables (Stringing from top to deck)
                    const numCables = Math.floor(10 * s4);
                    for (let c = 1; c <= numCables; c++) {
                        const cableAnchorMastY = topY + (c * (currentMastHeight / 14));
                        const anchorOffset = c * 26;

                        // Left fan cable
                        ctx.beginPath();
                        ctx.moveTo(cx - 3, cableAnchorMastY);
                        ctx.lineTo(cx - anchorOffset, deckY);
                        ctx.strokeStyle = "rgba(24,95,165,0.55)";
                        ctx.lineWidth = 0.9;
                        ctx.stroke();

                        // Right fan cable
                        ctx.beginPath();
                        ctx.moveTo(cx + 3, cableAnchorMastY);
                        ctx.lineTo(cx + anchorOffset, deckY);
                        ctx.strokeStyle = "rgba(24,95,165,0.55)";
                        ctx.lineWidth = 0.9;
                        ctx.stroke();
                    }
                });
            }

            // =================================================================
            // STAGE 5: FULL COMMISSIONING & TRAFFIC PULSES (Progress 0.85 to 1.0)
            // =================================================================
            const s5 = Math.max(0, Math.min(1, (p - 0.85) / 0.15));
            if (s5 > 0) {
                // Bridge Lighting & Crash Barriers
                ctx.beginPath();
                ctx.moveTo(bridgeCenterX - bridgeSpan / 2, deckY - 4);
                ctx.lineTo(bridgeCenterX + bridgeSpan / 2, deckY - 4);
                ctx.strokeStyle = "#c88a22";
                ctx.lineWidth = 1;
                ctx.stroke();

                // Animated Traffic Points
                const now = performance.now() * 0.001;
                for (let v = 0; v < 6; v++) {
                    const vt = ((now * 0.12 + v * 0.18) % 1);
                    const vx = bridgeCenterX - bridgeSpan / 2 + vt * bridgeSpan;
                    ctx.beginPath();
                    ctx.arc(vx, deckY - 2, 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = v % 2 === 0 ? "#185FA5" : "#c88a22";
                    ctx.fill();
                }
            }

            ctx.restore();

            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [scrollYProgress]);

    // Active Phase Text
    const getPhaseInfo = () => {
        if (progressVal < 0.25) {
            return {
                phase: "PHASE 01/05",
                title: "Deep Piling & Subsurface Survey",
                spec: "BORED CAST-IN-SITU PILING · M35 GRADE",
                pct: Math.round(progressVal * 100),
            };
        } else if (progressVal < 0.50) {
            return {
                phase: "PHASE 02/05",
                title: "Substructure Piers & Caps",
                spec: "REINFORCED RCC PIERS · H: +18.5m",
                pct: Math.round(progressVal * 100),
            };
        } else if (progressVal < 0.75) {
            return {
                phase: "PHASE 03/05",
                title: "Cantilever Deck Box Assembly",
                spec: "PRECAST SEGMENTAL GIRDERS · 540m SPAN",
                pct: Math.round(progressVal * 100),
            };
        } else if (progressVal < 0.90) {
            return {
                phase: "PHASE 04/05",
                title: "Diamond Pylon & Stay-Cable Tensioning",
                spec: "HIGH-TENSILE STRANDS · TENSION: 14.8 MPa",
                pct: Math.round(progressVal * 100),
            };
        } else {
            return {
                phase: "PHASE 05/05",
                title: "Commissioned Infrastructure & Traffic",
                spec: "WEARING COURSE · IRC 70R LOAD RATING",
                pct: 100,
            };
        }
    };

    const phase = getPhaseInfo();

    return (
        <>
            {/* Ambient Fixed Background Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0 w-full h-full"
            />

            {/* Discreet Floating Construction Telemetry HUD */}
            <div className="fixed bottom-6 right-6 z-40 select-none">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-matte-lg p-3 sm:p-4 text-[#0d1b2e] w-64 sm:w-72 transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#185FA5] animate-ping" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#185FA5]">
                                Live Construction Feed
                            </span>
                        </div>
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="text-slate-400 hover:text-[#0d1b2e] p-1 rounded-md transition-colors cursor-pointer"
                            aria-label="Toggle telemetry"
                        >
                            {isMinimized ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                    </div>

                    <AnimatePresence>
                        {!isMinimized && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="text-[11px] font-mono text-slate-500 font-semibold mb-0.5">
                                    {phase.phase} · {phase.pct}% ERECTED
                                </div>
                                <div
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-base font-bold uppercase text-[#0d1b2e] leading-tight mb-2"
                                >
                                    {phase.title}
                                </div>

                                {/* Dynamic Laser Progress Bar */}
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#185FA5] via-[#2563eb] to-[#c88a22] transition-all duration-150"
                                        style={{ width: `${Math.min(100, Math.max(5, progressVal * 100))}%` }}
                                    />
                                </div>

                                <div className="text-[9px] font-mono text-slate-400 tracking-tight flex items-center justify-between">
                                    <span>{phase.spec}</span>
                                    <span className="text-[#c88a22] font-semibold">SCROLL TO BUILD</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isMinimized && (
                        <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0d1b2e]">
                            <span>{phase.phase}</span>
                            <span className="text-[#185FA5]">{phase.pct}%</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
