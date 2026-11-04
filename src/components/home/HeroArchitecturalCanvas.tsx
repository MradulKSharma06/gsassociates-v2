"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Layers, RotateCcw, Play, Pause, Compass } from "lucide-react";

type ModelType = "bridge" | "civic";

interface Point3D {
    x: number;
    y: number;
    z: number;
    isParticle?: boolean;
    color?: string;
    size?: number;
}

interface TrafficParticle {
    t: number;      // 0 to 1 along bridge
    lane: number;   // -1 or 1 (eastbound / westbound)
    speed: number;
    color: string;
}

export function HeroArchitecturalCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [model, setModel] = useState<ModelType>("bridge");
    const [isAutoSpin, setIsAutoSpin] = useState(true);

    // Rotation & interaction state
    const rotRef = useRef({
        x: 0.32,
        y: -0.65,
        targetX: 0.32,
        targetY: -0.65,
        isDragging: false,
        lastX: 0,
        lastY: 0,
        vx: 0,
        vy: 0,
    });

    // Traffic simulation
    const trafficRef = useRef<TrafficParticle[]>([
        { t: 0.1, lane: -1, speed: 0.0022, color: "#185FA5" },
        { t: 0.28, lane: -1, speed: 0.0018, color: "#c88a22" },
        { t: 0.62, lane: -1, speed: 0.0026, color: "#0d1b2e" },
        { t: 0.85, lane: -1, speed: 0.0020, color: "#185FA5" },
        { t: 0.15, lane: 1, speed: -0.0024, color: "#0d1b2e" },
        { t: 0.45, lane: 1, speed: -0.0019, color: "#c88a22" },
        { t: 0.72, lane: 1, speed: -0.0028, color: "#185FA5" },
        { t: 0.92, lane: 1, speed: -0.0021, color: "#0d1b2e" },
    ]);

    // =========================================================================
    // MODEL 1: HIGH-FIDELITY CABLE-STAYED EXPRESSWAY BRIDGE
    // =========================================================================
    const generateBridgeGeometry = useCallback(() => {
        const points: Point3D[] = [];
        const lines: [number, number, string?][] = [];

        const totalLength = 540;
        const deckWidth = 64;
        const halfWidth = deckWidth / 2;
        const numSegments = 36;
        const segStep = totalLength / numSegments;
        const startZ = -totalLength / 2;

        const leftDeckIndices: number[] = [];
        const rightDeckIndices: number[] = [];
        const centerDeckIndices: number[] = [];
        const underTrussLeft: number[] = [];
        const underTrussRight: number[] = [];

        // 1. Deck Girders, Roadway Lanes & Lower Warren Truss Chords
        for (let i = 0; i <= numSegments; i++) {
            const z = startZ + i * segStep;
            // Parabolic elevation camber
            const y = -8 - Math.sin((i / numSegments) * Math.PI) * 16;

            // Deck left & right edges
            const iL = points.length;
            points.push({ x: -halfWidth, y, z, color: "#0d1b2e", size: 1.5 });
            leftDeckIndices.push(iL);

            const iR = points.length;
            points.push({ x: halfWidth, y, z, color: "#0d1b2e", size: 1.5 });
            rightDeckIndices.push(iR);

            // Centerline median barrier
            const iC = points.length;
            points.push({ x: 0, y, z, color: "#94a3b8", size: 1.0 });
            centerDeckIndices.push(iC);

            // Transverse deck cross-beam
            lines.push([iL, iC, "rgba(13,27,46,0.3)"]);
            lines.push([iC, iR, "rgba(13,27,46,0.3)"]);

            // Under-deck Warren truss bottom chords (y + 18)
            const uL = points.length;
            points.push({ x: -halfWidth + 6, y: y + 16, z, color: "#185FA5", size: 1.2 });
            underTrussLeft.push(uL);

            const uR = points.length;
            points.push({ x: halfWidth - 6, y: y + 16, z, color: "#185FA5", size: 1.2 });
            underTrussRight.push(uR);

            lines.push([uL, uR, "rgba(24,95,165,0.25)"]);
            lines.push([iL, uL, "rgba(24,95,165,0.3)"]);
            lines.push([iR, uR, "rgba(24,95,165,0.3)"]);

            // Longitudinal chords & diagonal cross bracing
            if (i > 0) {
                // Deck edges
                lines.push([leftDeckIndices[i - 1], iL, "rgba(13,27,46,0.7)"]);
                lines.push([rightDeckIndices[i - 1], iR, "rgba(13,27,46,0.7)"]);
                lines.push([centerDeckIndices[i - 1], iC, "rgba(200,138,34,0.5)"]);

                // Lower truss chords
                lines.push([underTrussLeft[i - 1], uL, "rgba(24,95,165,0.6)"]);
                lines.push([underTrussRight[i - 1], uR, "rgba(24,95,165,0.6)"]);

                // Warren truss alternating diagonals
                lines.push([underTrussLeft[i - 1], iL, "rgba(24,95,165,0.35)"]);
                lines.push([underTrussRight[i - 1], iR, "rgba(24,95,165,0.35)"]);
            }
        }

        // 2. Twin Soaring Diamond Pylon Masts (Towers at 1/3 and 2/3 of bridge)
        const pylonZCoords = [-totalLength / 6, totalLength / 6];
        const pylonPeakIndices: { left: number; right: number }[] = [];

        pylonZCoords.forEach((pz) => {
            const baseY = 80;    // Deep subterranean pier footing
            const deckY = -22;   // Road level
            const mastTopY = -140; // Tower height

            // Subterranean pile cap & river piers
            const pCapL = points.length;
            points.push({ x: -halfWidth - 10, y: baseY, z: pz, color: "#0d1b2e", size: 2.5 });
            const pCapR = points.length;
            points.push({ x: halfWidth + 10, y: baseY, z: pz, color: "#0d1b2e", size: 2.5 });
            lines.push([pCapL, pCapR, "rgba(13,27,46,0.8)"]);

            // Pier shafts to deck level
            const pDeckL = points.length;
            points.push({ x: -halfWidth - 4, y: deckY, z: pz, color: "#0d1b2e", size: 2 });
            const pDeckR = points.length;
            points.push({ x: halfWidth + 4, y: deckY, z: pz, color: "#0d1b2e", size: 2 });
            lines.push([pCapL, pDeckL, "rgba(13,27,46,0.85)"]);
            lines.push([pCapR, pDeckR, "rgba(13,27,46,0.85)"]);

            // Upper Diamond Pylon Masts (inclined inwards to peak)
            const pTopL = points.length;
            points.push({ x: -8, y: mastTopY, z: pz, color: "#185FA5", size: 3 });
            const pTopR = points.length;
            points.push({ x: 8, y: mastTopY, z: pz, color: "#185FA5", size: 3 });

            lines.push([pDeckL, pTopL, "rgba(13,27,46,0.9)"]);
            lines.push([pDeckR, pTopR, "rgba(13,27,46,0.9)"]);
            lines.push([pTopL, pTopR, "rgba(200,138,34,0.9)"]); // Tower top cross-beam

            // Upper intermediate cross-strut
            const strutY = (deckY + mastTopY) * 0.45;
            const sL = points.length;
            points.push({ x: -halfWidth * 0.35, y: strutY, z: pz, size: 1.5 });
            const sR = points.length;
            points.push({ x: halfWidth * 0.35, y: strutY, z: pz, size: 1.5 });
            lines.push([sL, sR, "rgba(13,27,46,0.7)"]);

            pylonPeakIndices.push({ left: pTopL, right: pTopR });

            // 3. High-Tensile Stay Cables (Harp / Fan arrangement)
            const cableAnchorsCount = 8;
            for (let c = 1; c <= cableAnchorsCount; c++) {
                // Forward and backward cable anchor locations on the deck
                const forwardIdx = Math.min(numSegments, Math.round(((pz - startZ) / segStep) + c * 1.8));
                const backwardIdx = Math.max(0, Math.round(((pz - startZ) / segStep) - c * 1.8));

                // Cable height along the tower head
                const cableMastYL = points.length;
                points.push({ x: -7, y: mastTopY + (c * 7), z: pz, size: 0.8 });
                const cableMastYR = points.length;
                points.push({ x: 7, y: mastTopY + (c * 7), z: pz, size: 0.8 });

                // Connect cables to deck edges
                lines.push([cableMastYL, leftDeckIndices[forwardIdx], "rgba(24,95,165,0.4)"]);
                lines.push([cableMastYR, rightDeckIndices[forwardIdx], "rgba(24,95,165,0.4)"]);
                lines.push([cableMastYL, leftDeckIndices[backwardIdx], "rgba(24,95,165,0.4)"]);
                lines.push([cableMastYR, rightDeckIndices[backwardIdx], "rgba(24,95,165,0.4)"]);
            }
        });

        // 4. River Ground Elevation Grid & Geodetic Survey Benchmark Nodes
        for (let gx = -180; gx <= 180; gx += 45) {
            for (let gz = -240; gz <= 240; gz += 60) {
                points.push({
                    x: gx + (Math.random() - 0.5) * 8,
                    y: 84 + (Math.random() - 0.5) * 4,
                    z: gz + (Math.random() - 0.5) * 8,
                    isParticle: true,
                    color: "rgba(148,163,184,0.4)",
                    size: 1.2,
                });
            }
        }

        return { points, lines };
    }, []);

    // =========================================================================
    // MODEL 2: CIVIC SKYSCRAPER COMPLEX (ALDER & STONE BENCHMARK)
    // =========================================================================
    const generateCivicGeometry = useCallback(() => {
        const points: Point3D[] = [];
        const lines: [number, number, string?][] = [];

        // Main Skyscraper Tower
        const floors = 24;
        const towerWidth = 72;
        const towerDepth = 60;
        const floorHeight = 8.5;
        const baseFloorY = 75;

        const floorCornerIndices: number[][] = [];

        for (let f = 0; f <= floors; f++) {
            const y = baseFloorY - f * floorHeight;
            // Floor setback taper at upper levels (floors 18+)
            const setback = f > 18 ? (f - 18) * 2.2 : 0;
            const w = (towerWidth - setback) / 2;
            const d = (towerDepth - setback) / 2;

            const c0 = points.length; // Front Left
            points.push({ x: -w, y, z: -d, color: "#0d1b2e", size: 1.4 });
            const c1 = points.length; // Front Right
            points.push({ x: w, y, z: -d, color: "#0d1b2e", size: 1.4 });
            const c2 = points.length; // Back Right
            points.push({ x: w, y, z: d, color: "#0d1b2e", size: 1.4 });
            const c3 = points.length; // Back Left
            points.push({ x: -w, y, z: d, color: "#0d1b2e", size: 1.4 });

            floorCornerIndices.push([c0, c1, c2, c3]);

            // Perimeter Floor Slab Ring
            lines.push([c0, c1, "rgba(13,27,46,0.6)"]);
            lines.push([c1, c2, "rgba(13,27,46,0.6)"]);
            lines.push([c2, c3, "rgba(13,27,46,0.6)"]);
            lines.push([c3, c0, "rgba(13,27,46,0.6)"]);

            // Intermediate vertical mullions across facade
            const mFront = points.length;
            points.push({ x: 0, y, z: -d, size: 0.8 });
            const mBack = points.length;
            points.push({ x: 0, y, z: d, size: 0.8 });
            const mLeft = points.length;
            points.push({ x: -w, y, z: 0, size: 0.8 });
            const mRight = points.length;
            points.push({ x: w, y, z: 0, size: 0.8 });

            // Vertical Column Interlocks
            if (f > 0) {
                const prev = floorCornerIndices[f - 1];
                lines.push([prev[0], c0, "rgba(13,27,46,0.75)"]);
                lines.push([prev[1], c1, "rgba(13,27,46,0.75)"]);
                lines.push([prev[2], c2, "rgba(13,27,46,0.75)"]);
                lines.push([prev[3], c3, "rgba(13,27,46,0.75)"]);

                // 4-Story Façade Diagrid Bracing (Mega-Trusses)
                if ((f - 1) % 4 === 0 && f < floors) {
                    lines.push([prev[0], c1, "rgba(24,95,165,0.4)"]);
                    lines.push([prev[1], c0, "rgba(24,95,165,0.4)"]);
                    lines.push([prev[3], c2, "rgba(24,95,165,0.4)"]);
                    lines.push([prev[2], c3, "rgba(24,95,165,0.4)"]);
                }
            }
        }

        // Rooftop Communications & Mechanical Mast
        const topY = baseFloorY - floors * floorHeight;
        const mastBase = points.length;
        points.push({ x: 0, y: topY, z: 0, size: 2 });
        const mastTip = points.length;
        points.push({ x: 0, y: topY - 36, z: 0, color: "#c88a22", size: 3 });
        lines.push([mastBase, mastTip, "rgba(200,138,34,0.9)"]);

        // Flanking Low-Rise Civic Pavilion Wing
        const pBaseY = baseFloorY;
        const pHeight = floorHeight * 5;
        const pL0 = points.length;
        points.push({ x: 50, y: pBaseY, z: -40, size: 1.2 });
        const pL1 = points.length;
        points.push({ x: 125, y: pBaseY, z: -40, size: 1.2 });
        const pL2 = points.length;
        points.push({ x: 125, y: pBaseY, z: 45, size: 1.2 });
        const pL3 = points.length;
        points.push({ x: 50, y: pBaseY, z: 45, size: 1.2 });

        const pT0 = points.length;
        points.push({ x: 50, y: pBaseY - pHeight, z: -40, size: 1.2 });
        const pT1 = points.length;
        points.push({ x: 125, y: pBaseY - pHeight, z: -40, size: 1.2 });
        const pT2 = points.length;
        points.push({ x: 125, y: pBaseY - pHeight, z: 45, size: 1.2 });
        const pT3 = points.length;
        points.push({ x: 50, y: pBaseY - pHeight, z: 45, size: 1.2 });

        lines.push([pT0, pT1, "rgba(24,95,165,0.5)"]);
        lines.push([pT1, pT2, "rgba(24,95,165,0.5)"]);
        lines.push([pT2, pT3, "rgba(24,95,165,0.5)"]);
        lines.push([pT3, pT0, "rgba(24,95,165,0.5)"]);
        lines.push([pL0, pT0, "rgba(13,27,46,0.6)"]);
        lines.push([pL1, pT1, "rgba(13,27,46,0.6)"]);
        lines.push([pL2, pT2, "rgba(13,27,46,0.6)"]);
        lines.push([pL3, pT3, "rgba(13,27,46,0.6)"]);

        // Sky-bridge connection between tower and pavilion
        const sbY = pBaseY - floorHeight * 3;
        const sb0 = points.length;
        points.push({ x: 36, y: sbY, z: -10, size: 1 });
        const sb1 = points.length;
        points.push({ x: 50, y: sbY, z: -10, size: 1 });
        const sb2 = points.length;
        points.push({ x: 50, y: sbY + 12, z: -10, size: 1 });
        const sb3 = points.length;
        points.push({ x: 36, y: sbY + 12, z: -10, size: 1 });
        lines.push([sb0, sb1, "rgba(200,138,34,0.7)"]);
        lines.push([sb1, sb2, "rgba(200,138,34,0.7)"]);
        lines.push([sb2, sb3, "rgba(200,138,34,0.7)"]);
        lines.push([sb3, sb0, "rgba(200,138,34,0.7)"]);

        // Perspective Ground Grid (Alder & Stone Style)
        for (let gx = -160; gx <= 160; gx += 32) {
            for (let gz = -160; gz <= 160; gz += 32) {
                points.push({
                    x: gx,
                    y: baseFloorY,
                    z: gz,
                    isParticle: true,
                    color: "rgba(13,27,46,0.2)",
                    size: 1.1,
                });
            }
        }

        return { points, lines };
    }, []);

    // Main 3D Render Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let lastTime = performance.now();

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener("resize", resize);

        const currentGeometry = model === "bridge" ? generateBridgeGeometry() : generateCivicGeometry();

        const render = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            ctx.clearRect(0, 0, w, h);

            // Auto-orbit physics
            if (isAutoSpin && !rotRef.current.isDragging) {
                rotRef.current.targetY += dt * 0.12;
            }

            // Smooth rotational damping
            rotRef.current.x += (rotRef.current.targetX - rotRef.current.x) * 0.12;
            rotRef.current.y += (rotRef.current.targetY - rotRef.current.y) * 0.12;

            const cosX = Math.cos(rotRef.current.x);
            const sinX = Math.sin(rotRef.current.x);
            const cosY = Math.cos(rotRef.current.y);
            const sinY = Math.sin(rotRef.current.y);

            const fov = 380;
            const cx = w * 0.52;
            const cy = h * 0.54;

            // Project 3D points to 2D screen
            const projected = currentGeometry.points.map((p) => {
                // Rotate around Y
                const x1 = p.x * cosY + p.z * sinY;
                const y1 = p.y;
                const z1 = -p.x * sinY + p.z * cosY;

                // Rotate around X
                const x2 = x1;
                const y2 = y1 * cosX - z1 * sinX;
                const z2 = y1 * sinX + z1 * cosX + 380;

                const scale = fov / (fov + z2);
                return {
                    x: cx + x2 * scale,
                    y: cy + y2 * scale,
                    scale,
                    depth: z2,
                    isParticle: p.isParticle,
                    color: p.color,
                    size: p.size,
                };
            });

            // 1. Draw Lines with Depth Attenuation
            currentGeometry.lines.forEach(([p1Idx, p2Idx, strokeColor]) => {
                const p1 = projected[p1Idx];
                const p2 = projected[p2Idx];
                if (!p1 || !p2) return;

                const alpha = Math.max(0.12, Math.min(0.85, 1 - (p1.depth + p2.depth) / 1400));
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = strokeColor || `rgba(13, 27, 46, ${alpha})`;
                ctx.lineWidth = Math.max(0.6, (p1.scale + p2.scale) * 0.85);
                ctx.stroke();
            });

            // 2. Draw Simulated Bridge Traffic Pulses (When in Bridge mode)
            if (model === "bridge") {
                trafficRef.current.forEach((veh) => {
                    veh.t += veh.speed;
                    if (veh.t > 1) veh.t = 0;
                    if (veh.t < 0) veh.t = 1;

                    // Interpolate 3D position along bridge deck
                    const deckLength = 540;
                    const z = -deckLength / 2 + veh.t * deckLength;
                    const y = -8 - Math.sin(veh.t * Math.PI) * 16;
                    const x = veh.lane * 16;

                    // Project 3D position
                    const x1 = x * cosY + z * sinY;
                    const y1 = y;
                    const z1 = -x * sinY + z * cosY;

                    const x2 = x1;
                    const y2 = y1 * cosX - z1 * sinX;
                    const z2 = y1 * sinX + z1 * cosX + 380;

                    const scale = fov / (fov + z2);
                    const sx = cx + x2 * scale;
                    const sy = cy + y2 * scale;

                    // Draw glowing vehicle node
                    ctx.beginPath();
                    ctx.arc(sx, sy, Math.max(1.5, scale * 3.5), 0, Math.PI * 2);
                    ctx.fillStyle = veh.color;
                    ctx.fill();

                    // Pulse ring
                    ctx.beginPath();
                    ctx.arc(sx, sy, Math.max(3, scale * 6), 0, Math.PI * 2);
                    ctx.strokeStyle = veh.color === "#c88a22" ? "rgba(200,138,34,0.4)" : "rgba(24,95,165,0.4)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                });
            }

            // 3. Draw Point Cloud & Joint Nodes
            projected.forEach((p) => {
                const radius = Math.max(0.8, (p.size || 1) * p.scale * 1.5);
                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

                if (p.isParticle) {
                    ctx.fillStyle = p.color || "rgba(13, 27, 46, 0.25)";
                } else {
                    ctx.fillStyle = p.color || "#0d1b2e";
                }
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [model, isAutoSpin, generateBridgeGeometry, generateCivicGeometry]);

    // Drag Orbit Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        rotRef.current.isDragging = true;
        rotRef.current.lastX = e.clientX;
        rotRef.current.lastY = e.clientY;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!rotRef.current.isDragging) return;
        const dx = e.clientX - rotRef.current.lastX;
        const dy = e.clientY - rotRef.current.lastY;
        rotRef.current.targetY += dx * 0.007;
        rotRef.current.targetX += dy * 0.007;
        rotRef.current.lastX = e.clientX;
        rotRef.current.lastY = e.clientY;
    };

    const handleMouseUp = () => {
        rotRef.current.isDragging = false;
    };

    // Touch handlers for mobile devices
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            rotRef.current.isDragging = true;
            rotRef.current.lastX = e.touches[0].clientX;
            rotRef.current.lastY = e.touches[0].clientY;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!rotRef.current.isDragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - rotRef.current.lastX;
        const dy = e.touches[0].clientY - rotRef.current.lastY;
        rotRef.current.targetY += dx * 0.008;
        rotRef.current.targetX += dy * 0.008;
        rotRef.current.lastX = e.touches[0].clientX;
        rotRef.current.lastY = e.touches[0].clientY;
    };

    return (
        <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden bg-white/70 border border-slate-200/90 shadow-matte-lg select-none group">
            {/* Fine Blueprint Millimeter Grid Watermark */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hero-3d-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#0d1b2e" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-3d-grid)" />
            </svg>

            {/* 3D Canvas */}
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
            />

            {/* Top Bar: Dual Model Switcher (Capsule Pill from Image 2) */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto inline-flex items-center gap-1 p-1 bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-matte-sm">
                    <button
                        onClick={() => setModel("bridge")}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            model === "bridge"
                                ? "bg-[#0d1b2e] text-white shadow-xs"
                                : "text-slate-600 hover:text-[#0d1b2e]"
                        }`}
                    >
                        Cable-Stayed Bridge
                    </button>
                    <button
                        onClick={() => setModel("civic")}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            model === "civic"
                                ? "bg-[#0d1b2e] text-white shadow-xs"
                                : "text-slate-600 hover:text-[#0d1b2e]"
                        }`}
                    >
                        Civic Skyscraper
                    </button>
                </div>

                {/* Orbit & Auto-spin Controls */}
                <div className="pointer-events-auto flex items-center gap-2">
                    <button
                        onClick={() => setIsAutoSpin(!isAutoSpin)}
                        className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0d1b2e] shadow-matte-sm cursor-pointer transition-colors"
                        title={isAutoSpin ? "Pause Auto-orbit" : "Resume Auto-orbit"}
                        aria-label="Toggle auto-orbit"
                    >
                        {isAutoSpin ? <Pause size={13} /> : <Play size={13} />}
                    </button>
                    <button
                        onClick={() => {
                            rotRef.current.targetX = 0.32;
                            rotRef.current.targetY = -0.65;
                        }}
                        className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0d1b2e] shadow-matte-sm cursor-pointer transition-colors"
                        title="Reset Camera View"
                        aria-label="Reset view"
                    >
                        <RotateCcw size={13} />
                    </button>
                </div>
            </div>

            {/* Bottom-left: Real CAD Engineering Telemetry HUD (from Reference Image 2) */}
            <div className="absolute bottom-4 left-4 pointer-events-none flex flex-col gap-1 font-mono text-[10px] text-slate-500 bg-white/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-matte-sm">
                <div className="flex items-center gap-2 text-[#0d1b2e] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5] animate-ping" />
                    <span>3D ISOMETRIC VECTOR ENGINE</span>
                </div>
                <div className="text-slate-400 text-[9px] tracking-tight">
                    {model === "bridge" ? (
                        <>
                            <span>MODEL: 4-LANE CABLE-STAYED FLYOVER</span>
                            <br />
                            <span>CODE: IRC:SP:84-2014 · SPAN: 540m · LOAD: 70R</span>
                        </>
                    ) : (
                        <>
                            <span>MODEL: 24-STORY CIVIC COMPLEX</span>
                            <br />
                            <span>CODE: NBC-2016 · CORE: RCC SHEAR · H: 102m</span>
                        </>
                    )}
                </div>
                <div className="text-[#c88a22] text-[9px] font-semibold mt-0.5">
                    LAT 13.0827° N / LON 80.2707° E · CHENNAI
                </div>
            </div>

            {/* Bottom-right: Interactive Cursor Instruction Badge */}
            <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[9px] text-slate-400 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-200/60">
                <Compass size={11} className="text-[#185FA5]" />
                <span>DRAG TO ORBIT 360°</span>
            </div>
        </div>
    );
}
