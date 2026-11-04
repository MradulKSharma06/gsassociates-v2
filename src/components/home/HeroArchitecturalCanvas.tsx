"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Layers, Compass, Maximize2, RotateCcw } from "lucide-react";

type ModelType = "bridge" | "civic";

interface Point3D {
    x: number;
    y: number;
    z: number;
    isParticle?: boolean;
}

export function HeroArchitecturalCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [model, setModel] = useState<ModelType>("bridge");
    const [isInteracting, setIsInteracting] = useState(false);

    // Rotation state
    const rotRef = useRef({
        x: 0.38,
        y: -0.55,
        targetX: 0.38,
        targetY: -0.55,
        isDragging: false,
        lastX: 0,
        lastY: 0,
    });

    // Generate Model 1: Elevated Expressway Bridge Truss
    const generateBridgeGeometry = useCallback(() => {
        const points: Point3D[] = [];
        const lines: [number, number][] = [];

        const spans = 9;
        const width = 65;

        for (let s = 0; s <= spans; s++) {
            const z = (s - spans / 2) * 44;
            const y = -12 + Math.sin(s * 0.35) * 10;
            const x1 = -width / 2;
            const x2 = width / 2;

            const idx1 = points.length;
            points.push({ x: x1, y, z });
            const idx2 = points.length;
            points.push({ x: x2, y, z });

            // Cross deck beam
            lines.push([idx1, idx2]);

            // Top truss chords
            const t1 = points.length;
            points.push({ x: x1, y: y - 24, z });
            const t2 = points.length;
            points.push({ x: x2, y: y - 24, z });
            lines.push([t1, t2]);
            lines.push([idx1, t1]);
            lines.push([idx2, t2]);

            // Foundation piers
            if (s % 2 === 0) {
                const p1 = points.length;
                points.push({ x: x1 + 12, y: 75, z });
                const p2 = points.length;
                points.push({ x: x2 - 12, y: 75, z });
                lines.push([idx1, p1]);
                lines.push([idx2, p2]);
                lines.push([p1, p2]);
            }

            // Longitudinal chords & diagonal cross-braces
            if (s > 0) {
                lines.push([idx1 - 4, idx1]);
                lines.push([idx2 - 4, idx2]);
                lines.push([t1 - 4, t1]);
                lines.push([t2 - 4, t2]);
                // Diagonal cross-brace
                lines.push([idx1 - 4, t1]);
                lines.push([idx2 - 4, t2]);
            }
        }

        // Survey point-cloud scatter
        for (let i = 0; i < 180; i++) {
            points.push({
                x: (Math.random() - 0.5) * 260,
                y: (Math.random() - 0.5) * 140 + 20,
                z: (Math.random() - 0.5) * 360,
                isParticle: true,
            });
        }

        return { points, lines };
    }, []);

    // Generate Model 2: Civic Headquarters Complex (Architecture & High-Rise Structures)
    const generateCivicGeometry = useCallback(() => {
        const points: Point3D[] = [];
        const lines: [number, number][] = [];

        // Building A: Central 5-Tier Tower
        const tiers = 5;
        const towerWidth = 70;
        const tierHeight = 26;

        for (let t = 0; t <= tiers; t++) {
            const y = 60 - t * tierHeight;
            const inset = t * 4;
            const w = towerWidth - inset;
            const d = 60 - inset;

            const c1 = points.length;
            points.push({ x: -w / 2, y, z: -d / 2 });
            const c2 = points.length;
            points.push({ x: w / 2, y, z: -d / 2 });
            const c3 = points.length;
            points.push({ x: w / 2, y, z: d / 2 });
            const c4 = points.length;
            points.push({ x: -w / 2, y, z: d / 2 });

            // Slab perimeter
            lines.push([c1, c2]);
            lines.push([c2, c3]);
            lines.push([c3, c4]);
            lines.push([c4, c1]);

            // Vertical structural columns
            if (t > 0) {
                lines.push([c1 - 4, c1]);
                lines.push([c2 - 4, c2]);
                lines.push([c3 - 4, c3]);
                lines.push([c4 - 4, c4]);
            }
        }

        // Building B & C: Lateral Annexes (Wings)
        const wingW = 40;
        const wingH = 45;
        [-65, 65].forEach((offset) => {
            const baseY = 60;
            const topY = 60 - wingH;
            const b1 = points.length;
            points.push({ x: offset - wingW / 2, y: baseY, z: -25 });
            const b2 = points.length;
            points.push({ x: offset + wingW / 2, y: baseY, z: -25 });
            const b3 = points.length;
            points.push({ x: offset + wingW / 2, y: baseY, z: 25 });
            const b4 = points.length;
            points.push({ x: offset - wingW / 2, y: baseY, z: 25 });

            const u1 = points.length;
            points.push({ x: offset - wingW / 2, y: topY, z: -25 });
            const u2 = points.length;
            points.push({ x: offset + wingW / 2, y: topY, z: -25 });
            const u3 = points.length;
            points.push({ x: offset + wingW / 2, y: topY, z: 25 });
            const u4 = points.length;
            points.push({ x: offset - wingW / 2, y: topY, z: 25 });

            // Base and roof
            lines.push([b1, b2], [b2, b3], [b3, b4], [b4, b1]);
            lines.push([u1, u2], [u2, u3], [u3, u4], [u4, u1]);
            // Columns
            lines.push([b1, u1], [b2, u2], [b3, u3], [b4, u4]);
        });

        // Topographic site coordinates point cloud
        for (let i = 0; i < 200; i++) {
            points.push({
                x: (Math.random() - 0.5) * 320,
                y: 60 + Math.random() * 15,
                z: (Math.random() - 0.5) * 320,
                isParticle: true,
            });
        }

        return { points, lines };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
        let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

        const handleResize = () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.clientWidth;
            height = canvas.height = canvas.parentElement.clientHeight;
        };

        window.addEventListener("resize", handleResize);

        const { points, lines } =
            model === "bridge" ? generateBridgeGeometry() : generateCivicGeometry();

        const project = (p: Point3D, rx: number, ry: number) => {
            const cosY = Math.cos(ry);
            const sinY = Math.sin(ry);
            const cosX = Math.cos(rx);
            const sinX = Math.sin(rx);

            const x1 = p.x * cosY + p.z * sinY;
            const z1 = -p.x * sinY + p.z * cosY;

            const y2 = p.y * cosX - z1 * sinX;
            const z2 = p.y * sinX + z1 * cosX;

            const fov = 440 / (440 + z2);
            return {
                x: width / 2 + x1 * fov,
                y: height / 2 + y2 * fov,
                fov,
                z: z2,
            };
        };

        const render = () => {
            const rot = rotRef.current;
            rot.x += (rot.targetX - rot.x) * 0.08;
            rot.y += (rot.targetY - rot.y) * 0.08;

            if (!rot.isDragging) {
                rot.targetY += 0.0018; // Slow natural orbit
            }

            ctx.clearRect(0, 0, width, height);

            // Draw clean subtle architectural grid
            ctx.strokeStyle = "rgba(13, 27, 46, 0.035)";
            ctx.lineWidth = 1;
            const step = 32;
            for (let x = 0; x < width; x += step) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += step) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            const projected = points.map((p) => project(p, rot.x, rot.y));

            // Render graphite structural lines
            ctx.lineWidth = 1.15;
            for (const [i1, i2] of lines) {
                const p1 = projected[i1];
                const p2 = projected[i2];
                if (p1 && p2 && p1.fov > 0 && p2.fov > 0) {
                    const depthAlpha = Math.max(0.18, Math.min(0.85, (p1.fov + p2.fov) * 0.5));
                    ctx.strokeStyle = `rgba(13, 27, 46, ${depthAlpha * 0.85})`; // Deep graphite ink
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            // Render point-cloud survey nodes
            for (let i = 0; i < projected.length; i++) {
                const p = projected[i];
                if (p && p.fov > 0) {
                    const isParticle = points[i].isParticle;
                    const r = isParticle ? 1.2 * p.fov : 2.2 * p.fov;
                    // Muted architectural amber or charcoal nodes
                    ctx.fillStyle = isParticle
                        ? "rgba(200, 138, 34, 0.65)"
                        : "rgba(13, 27, 46, 0.85)";
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.max(0.7, r), 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [model, generateBridgeGeometry, generateCivicGeometry]);

    // Mouse handlers for dragging/orbiting
    const handleMouseDown = (e: React.MouseEvent) => {
        rotRef.current.isDragging = true;
        rotRef.current.lastX = e.clientX;
        rotRef.current.lastY = e.clientY;
        setIsInteracting(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!rotRef.current.isDragging) return;
        const dx = e.clientX - rotRef.current.lastX;
        const dy = e.clientY - rotRef.current.lastY;
        rotRef.current.targetY += dx * 0.006;
        rotRef.current.targetX += dy * 0.006;
        rotRef.current.lastX = e.clientX;
        rotRef.current.lastY = e.clientY;
    };

    const handleMouseUp = () => {
        rotRef.current.isDragging = false;
        setIsInteracting(false);
    };

    const resetView = () => {
        rotRef.current.targetX = 0.38;
        rotRef.current.targetY = -0.55;
    };

    return (
        <div className="relative w-full h-[460px] lg:h-[520px] rounded-2xl overflow-hidden border border-slate-200 bg-[#FAF9F6] shadow-matte-md select-none group">
            {/* 3D Canvas */}
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full h-full cursor-grab active:cursor-grabbing block"
            />

            {/* Top Bar: Model Selector Switcher (Both Models!) */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                {/* Segmented Model Switcher */}
                <div className="pointer-events-auto inline-flex items-center p-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm">
                    <button
                        onClick={() => setModel("bridge")}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all ${
                            model === "bridge"
                                ? "bg-[#0d1b2e] text-white shadow-sm"
                                : "text-slate-600 hover:text-[#0d1b2e]"
                        }`}
                    >
                        Expressway Truss
                    </button>
                    <button
                        onClick={() => setModel("civic")}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all ${
                            model === "civic"
                                ? "bg-[#0d1b2e] text-white shadow-sm"
                                : "text-slate-600 hover:text-[#0d1b2e]"
                        }`}
                    >
                        Civic Complex
                    </button>
                </div>

                {/* Reset View Button */}
                <button
                    onClick={resetView}
                    className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0d1b2e] hover:shadow-sm transition-all"
                    title="Reset Isometric Perspective"
                >
                    <RotateCcw size={13} />
                </button>
            </div>

            {/* Bottom-Left: Technical Mathematical & CAD Formula HUD (from Image 2) */}
            <div className="absolute bottom-5 left-5 pointer-events-none z-10 p-3.5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 shadow-sm max-w-xs space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#185FA5]">
                    <span>{model === "bridge" ? "IRC:SP:84-2014 COMPLIANT" : "NBC 2016 STRUCTURAL SPEC"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c88a22]"></span>
                </div>
                <div className="text-[11px] font-mono-tech text-[#0d1b2e] font-semibold">
                    {model === "bridge" ? "A(x) = ∫ σ(x) dx · ΔL = FL / AE" : "ΣF_z = 0 · M_max = qL² / 8"}
                </div>
                <div className="text-[10px] font-mono-tech text-slate-500">
                    COORDINATES: 13.0827° N, 80.2707° E · TN
                </div>
            </div>

            {/* Interactive Drag Hint */}
            <div className="absolute bottom-5 right-5 pointer-events-none z-10 hidden sm:flex items-center gap-1.5 text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 bg-white/70 px-2.5 py-1 rounded-full border border-slate-200">
                <Compass size={11} className="text-[#185FA5]" />
                <span>Drag to Orbit 3D Mesh</span>
            </div>

            {/* Corner Alignment Marks */}
            <div className="absolute top-2 left-2 text-slate-300 font-mono-tech text-[10px] select-none pointer-events-none">+ L01</div>
            <div className="absolute bottom-2 right-2 text-slate-300 font-mono-tech text-[10px] select-none pointer-events-none">+ R01</div>
        </div>
    );
}
