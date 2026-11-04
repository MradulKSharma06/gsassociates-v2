"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScroll, useVelocity } from "framer-motion";

/**
 * Cinematographic Waypoint Definition
 */
interface CameraWaypoint {
    progress: number;
    pos: THREE.Vector3;
    target: THREE.Vector3;
}

const CAMERA_WAYPOINTS: CameraWaypoint[] = [
    // Stage 1: Macro Ground Close-Up (Excavation, Soil Strata, Auger & Rebar Cage)
    {
        progress: 0.0,
        pos: new THREE.Vector3(38, -6, 75),
        target: new THREE.Vector3(0, -28, -60),
    },
    // Stage 2: Substructure Elevation (Rising Concrete Pier Columns & Flared Caps)
    {
        progress: 0.28,
        pos: new THREE.Vector3(82, 28, 135),
        target: new THREE.Vector3(0, -4, -25),
    },
    // Stage 3: Deck Cantilever Launch (Balanced Cantilever Box Girders & Pylon Erection)
    {
        progress: 0.62,
        pos: new THREE.Vector3(155, 68, 230),
        target: new THREE.Vector3(12, 22, 0),
    },
    // Stage 4: Monumental Panoramic Vista (Full 640m Cable-Stayed Span, Traffic, Skyline)
    {
        progress: 1.0,
        pos: new THREE.Vector3(255, 115, 365),
        target: new THREE.Vector3(22, 24, 0),
    },
];

function interpolateCamera(
    p: number,
    targetPos: THREE.Vector3,
    targetLook: THREE.Vector3
) {
    const clampedP = Math.max(0, Math.min(1, p));

    // Find the bounding waypoints
    let i = 0;
    while (i < CAMERA_WAYPOINTS.length - 1 && CAMERA_WAYPOINTS[i + 1].progress < clampedP) {
        i++;
    }

    const w1 = CAMERA_WAYPOINTS[i];
    const w2 = CAMERA_WAYPOINTS[Math.min(i + 1, CAMERA_WAYPOINTS.length - 1)];

    if (w1 === w2 || w2.progress === w1.progress) {
        targetPos.copy(w1.pos);
        targetLook.copy(w1.target);
        return;
    }

    // Cubic Hermite smoothstep easing between waypoints
    const linearT = (clampedP - w1.progress) / (w2.progress - w1.progress);
    const smoothT = linearT * linearT * (3 - 2 * linearT);

    targetPos.lerpVectors(w1.pos, w2.pos, smoothT);
    targetLook.lerpVectors(w1.target, w2.target, smoothT);
}

export function ConstructionScroll3D() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress, scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Scene, Camera, Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            46,
            window.innerWidth / window.innerHeight,
            1,
            2600
        );

        const currentCamPos = new THREE.Vector3().copy(CAMERA_WAYPOINTS[0].pos);
        const currentCamLook = new THREE.Vector3().copy(CAMERA_WAYPOINTS[0].target);
        camera.position.copy(currentCamPos);
        camera.lookAt(currentCamLook);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Pure transparent canvas
        container.appendChild(renderer.domElement);

        // 2. Structural Root Group
        const structureGroup = new THREE.Group();
        structureGroup.position.set(20, -25, 0);
        scene.add(structureGroup);

        // Materials: Editorial light architectural palette
        const lineMatDark = new THREE.LineBasicMaterial({
            color: 0x0d1b2e,
            transparent: true,
            opacity: 0.46,
        });
        const lineMatBlue = new THREE.LineBasicMaterial({
            color: 0x185fa5,
            transparent: true,
            opacity: 0.58,
        });
        const lineMatGold = new THREE.LineBasicMaterial({
            color: 0xc88a22,
            transparent: true,
            opacity: 0.72,
        });
        const lineMatFaint = new THREE.LineBasicMaterial({
            color: 0x94a3b8,
            transparent: true,
            opacity: 0.24,
        });

        // Bridge Specifications
        const totalSpan = 640;
        const deckWidth = 56;
        const halfWidth = deckWidth / 2;
        const segments = 44;
        const step = totalSpan / segments;
        const startZ = -totalSpan / 2;
        const pylonZCoords = [-totalSpan * 0.22, totalSpan * 0.22];

        // =====================================================================
        // PHASE 1: SUBTERRANEAN EXCAVATION, AUGER DRILLING & SOIL STRATA
        // =====================================================================
        const excavationGroup = new THREE.Group();
        structureGroup.add(excavationGroup);

        const strataPoints: THREE.Vector3[] = [];
        // Horizontal soil strata depth contour rings
        [-20, -40, -60, -85].forEach((depthY, sIdx) => {
            const strataRadius = 75 + sIdx * 8;
            const strataSteps = 32;
            for (let s = 0; s < strataSteps; s++) {
                const a1 = (s / strataSteps) * Math.PI * 2;
                const a2 = ((s + 1) / strataSteps) * Math.PI * 2;
                pylonZCoords.forEach((pz) => {
                    strataPoints.push(
                        new THREE.Vector3(Math.cos(a1) * strataRadius, depthY, pz + Math.sin(a1) * strataRadius * 0.45),
                        new THREE.Vector3(Math.cos(a2) * strataRadius, depthY, pz + Math.sin(a2) * strataRadius * 0.45)
                    );
                });
            }
        });
        const strataMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(strataPoints),
            lineMatFaint
        );
        excavationGroup.add(strataMesh);

        // Subterranean Borehole Shafts & Auger Drilling Spirals
        const boreholePoints: THREE.Vector3[] = [];
        const augerPoints: THREE.Vector3[] = [];
        const pileOffsets = [
            { x: -halfWidth - 12, z: -14 },
            { x: -halfWidth - 12, z: 14 },
            { x: halfWidth + 12, z: -14 },
            { x: halfWidth + 12, z: 14 },
            { x: 0, z: -18 },
            { x: 0, z: 18 },
        ];

        pylonZCoords.forEach((pz) => {
            pileOffsets.forEach((po) => {
                const bx = po.x;
                const bz = pz + po.z;
                const shaftRadius = 5.5;

                // 4 Vertical Shaft guide casing walls
                for (let a = 0; a < 4; a++) {
                    const angle = (a / 4) * Math.PI * 2;
                    const wallX = bx + Math.cos(angle) * shaftRadius;
                    const wallZ = bz + Math.sin(angle) * shaftRadius;
                    boreholePoints.push(
                        new THREE.Vector3(wallX, -16, wallZ),
                        new THREE.Vector3(wallX, -88, wallZ)
                    );
                }

                // Continuous Helical Auger Drill Flights
                const augerTurns = 8;
                const augerSteps = 48;
                for (let stepIdx = 0; stepIdx < augerSteps; stepIdx++) {
                    const t1 = stepIdx / augerSteps;
                    const t2 = (stepIdx + 1) / augerSteps;
                    const a1 = t1 * Math.PI * 2 * augerTurns;
                    const a2 = t2 * Math.PI * 2 * augerTurns;
                    const y1 = -16 - t1 * 72;
                    const y2 = -16 - t2 * 72;
                    augerPoints.push(
                        new THREE.Vector3(bx + Math.cos(a1) * shaftRadius * 0.85, y1, bz + Math.sin(a1) * shaftRadius * 0.85),
                        new THREE.Vector3(bx + Math.cos(a2) * shaftRadius * 0.85, y2, bz + Math.sin(a2) * shaftRadius * 0.85)
                    );
                }
            });
        });

        const boreholeMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(boreholePoints),
            lineMatBlue
        );
        excavationGroup.add(boreholeMesh);

        const augerMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(augerPoints),
            lineMatGold
        );
        excavationGroup.add(augerMesh);

        // =====================================================================
        // PHASE 2: STEEL REBAR CAGES (VERTICAL RODS & HELICAL SPIRAL TIES)
        // =====================================================================
        const rebarGroup = new THREE.Group();
        structureGroup.add(rebarGroup);

        const rebarPoints: THREE.Vector3[] = [];
        pylonZCoords.forEach((pz) => {
            // Main Column Rebar Bundles (Dual columns per pier)
            [-halfWidth, halfWidth].forEach((colX) => {
                const cageRadius = 7.0;
                const barCount = 12;
                // Vertical rebar rods extending from foundation bedrock (-80) up to pier cap (18)
                for (let b = 0; b < barCount; b++) {
                    const theta = (b / barCount) * Math.PI * 2;
                    const rx = colX + Math.cos(theta) * cageRadius;
                    const rz = pz + Math.sin(theta) * cageRadius;
                    rebarPoints.push(
                        new THREE.Vector3(rx, -80, rz),
                        new THREE.Vector3(rx, 18, rz)
                    );
                }

                // Spiral hoop tie rings every 4 vertical units
                for (let hy = -76; hy <= 16; hy += 4.5) {
                    const ringSteps = 16;
                    for (let s = 0; s < ringSteps; s++) {
                        const a1 = (s / ringSteps) * Math.PI * 2;
                        const a2 = ((s + 1) / ringSteps) * Math.PI * 2;
                        rebarPoints.push(
                            new THREE.Vector3(colX + Math.cos(a1) * cageRadius, hy, pz + Math.sin(a1) * cageRadius),
                            new THREE.Vector3(colX + Math.cos(a2) * cageRadius, hy, pz + Math.sin(a2) * cageRadius)
                        );
                    }
                }
            });
        });

        const rebarMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(rebarPoints),
            lineMatGold
        );
        rebarGroup.add(rebarMesh);

        // =====================================================================
        // PHASE 3: CONCRETE PIER COLUMNS (CAST-IN-SITU OCTAGONAL SUBSTRUCTURE)
        // =====================================================================
        const concretePierGroup = new THREE.Group();
        structureGroup.add(concretePierGroup);

        const pierPoints: THREE.Vector3[] = [];
        pylonZCoords.forEach((pz) => {
            // Foundation Footing Cap Slab (-18)
            const wCap = halfWidth + 16;
            const dCap = 22;
            const capY = -18;
            pierPoints.push(
                new THREE.Vector3(-wCap, capY, pz - dCap), new THREE.Vector3(wCap, capY, pz - dCap),
                new THREE.Vector3(wCap, capY, pz - dCap), new THREE.Vector3(wCap, capY, pz + dCap),
                new THREE.Vector3(wCap, capY, pz + dCap), new THREE.Vector3(-wCap, capY, pz + dCap),
                new THREE.Vector3(-wCap, capY, pz + dCap), new THREE.Vector3(-wCap, capY, pz - dCap),
                // Slab cross ties
                new THREE.Vector3(-wCap, capY, pz - dCap), new THREE.Vector3(wCap, capY, pz + dCap),
                new THREE.Vector3(wCap, capY, pz - dCap), new THREE.Vector3(-wCap, capY, pz + dCap)
            );

            // Cast Pier Column Shafts (from Y = -18 to Y = 18)
            [-halfWidth, halfWidth].forEach((colX) => {
                const octRadius = 8.5;
                const octSteps = 8;
                // Base & Top octagonal rings
                for (let s = 0; s < octSteps; s++) {
                    const a1 = (s / octSteps) * Math.PI * 2;
                    const a2 = ((s + 1) / octSteps) * Math.PI * 2;
                    const x1 = colX + Math.cos(a1) * octRadius;
                    const z1 = pz + Math.sin(a1) * octRadius;
                    const x2 = colX + Math.cos(a2) * octRadius;
                    const z2 = pz + Math.sin(a2) * octRadius;

                    // Base ring
                    pierPoints.push(new THREE.Vector3(x1, -18, z1), new THREE.Vector3(x2, -18, z2));
                    // Top ring
                    pierPoints.push(new THREE.Vector3(x1, 18, z1), new THREE.Vector3(x2, 18, z2));
                    // Vertical formwork seam lines
                    pierPoints.push(new THREE.Vector3(x1, -18, z1), new THREE.Vector3(x1, 18, z1));
                }
            });
        });

        // Approach Viaduct Piers along the span
        const viaductZ = [startZ + 55, startZ + 115, -startZ - 115, -startZ - 55];
        viaductZ.forEach((vz) => {
            pierPoints.push(
                new THREE.Vector3(-halfWidth * 0.65, -35, vz), new THREE.Vector3(-halfWidth * 0.45, 14, vz),
                new THREE.Vector3(halfWidth * 0.65, -35, vz), new THREE.Vector3(halfWidth * 0.45, 14, vz),
                new THREE.Vector3(-halfWidth * 0.75, 14, vz), new THREE.Vector3(halfWidth * 0.75, 14, vz)
            );
        });

        const concretePierMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(pierPoints),
            lineMatDark
        );
        concretePierGroup.add(concretePierMesh);

        // =====================================================================
        // PHASE 4: FLARED HAMMERHEAD PIER CAPS & ELASTOMERIC BEARING PADS
        // =====================================================================
        const pierCapGroup = new THREE.Group();
        structureGroup.add(pierCapGroup);

        const capPoints: THREE.Vector3[] = [];
        const bearingPoints: THREE.Vector3[] = [];

        pylonZCoords.forEach((pz) => {
            // Massive Flared Hammerhead Pier Cap
            const capBotY = 14;
            const capTopY = 19;
            const capHalfW = halfWidth + 14;
            const capDepth = 16;

            // Trapezoidal Hammerhead contours
            capPoints.push(
                // Bottom narrower face
                new THREE.Vector3(-halfWidth, capBotY, pz - capDepth * 0.6),
                new THREE.Vector3(halfWidth, capBotY, pz - capDepth * 0.6),
                new THREE.Vector3(halfWidth, capBotY, pz + capDepth * 0.6),
                new THREE.Vector3(-halfWidth, capBotY, pz + capDepth * 0.6),
                // Top wider flared face
                new THREE.Vector3(-capHalfW, capTopY, pz - capDepth),
                new THREE.Vector3(capHalfW, capTopY, pz - capDepth),
                new THREE.Vector3(capHalfW, capTopY, pz + capDepth),
                new THREE.Vector3(-capHalfW, capTopY, pz + capDepth),
                // Flared cantilever corner bevels
                new THREE.Vector3(-halfWidth, capBotY, pz - capDepth * 0.6),
                new THREE.Vector3(-capHalfW, capTopY, pz - capDepth),
                new THREE.Vector3(halfWidth, capBotY, pz - capDepth * 0.6),
                new THREE.Vector3(capHalfW, capTopY, pz - capDepth),
                new THREE.Vector3(halfWidth, capBotY, pz + capDepth * 0.6),
                new THREE.Vector3(capHalfW, capTopY, pz + capDepth),
                new THREE.Vector3(-halfWidth, capBotY, pz + capDepth * 0.6),
                new THREE.Vector3(-capHalfW, capTopY, pz + capDepth)
            );

            // 4 High-Spec Elastomeric Neoprene Bearing Pads with locator pins
            [-halfWidth - 4, -halfWidth + 8, halfWidth - 8, halfWidth + 4].forEach((bx) => {
                [-6, 6].forEach((bzOff) => {
                    const padY = capTopY + 0.5;
                    const pw = 3.5;
                    const pd = 3.5;
                    bearingPoints.push(
                        new THREE.Vector3(bx - pw, padY, pz + bzOff - pd),
                        new THREE.Vector3(bx + pw, padY, pz + bzOff - pd),
                        new THREE.Vector3(bx + pw, padY, pz + bzOff + pd),
                        new THREE.Vector3(bx - pw, padY, pz + bzOff + pd),
                        new THREE.Vector3(bx - pw, padY, pz + bzOff - pd),
                        new THREE.Vector3(bx - pw, padY, pz + bzOff + pd),
                        new THREE.Vector3(bx + pw, padY, pz + bzOff - pd),
                        new THREE.Vector3(bx + pw, padY, pz + bzOff + pd)
                    );
                });
            });
        });

        const pierCapMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(capPoints),
            lineMatBlue
        );
        pierCapGroup.add(pierCapMesh);

        const bearingMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(bearingPoints),
            lineMatGold
        );
        pierCapGroup.add(bearingMesh);

        // =====================================================================
        // PHASE 5: CONTINUOUS BRIDGE DECK, MEDIAN BARRIERS & 3D WARREN SPACE TRUSS
        // =====================================================================
        const deckGroup = new THREE.Group();
        structureGroup.add(deckGroup);

        const deckPoints: THREE.Vector3[] = [];
        const leftDeckPts: THREE.Vector3[] = [];
        const rightDeckPts: THREE.Vector3[] = [];
        const centerDeckPts: THREE.Vector3[] = [];
        const lowerTrussLeft: THREE.Vector3[] = [];
        const lowerTrussRight: THREE.Vector3[] = [];

        for (let i = 0; i <= segments; i++) {
            const z = startZ + i * step;
            // Parabolic engineering camber arch
            const y = 19.5 + Math.sin((i / segments) * Math.PI) * 11;

            const pL = new THREE.Vector3(-halfWidth, y, z);
            const pR = new THREE.Vector3(halfWidth, y, z);
            const pC = new THREE.Vector3(0, y + 1.2, z); // Crown median
            leftDeckPts.push(pL);
            rightDeckPts.push(pR);
            centerDeckPts.push(pC);

            // Transverse deck ribs
            deckPoints.push(pL, pC, pC, pR);

            // Crash Barrier Parapets
            const barL = new THREE.Vector3(-halfWidth, y + 3.2, z);
            const barR = new THREE.Vector3(halfWidth, y + 3.2, z);
            deckPoints.push(pL, barL, pR, barR);

            // Lower Warren Space Truss Chords (Y - 14)
            const uL = new THREE.Vector3(-halfWidth + 7, y - 14, z);
            const uR = new THREE.Vector3(halfWidth - 7, y - 14, z);
            lowerTrussLeft.push(uL);
            lowerTrussRight.push(uR);

            deckPoints.push(uL, uR);
            deckPoints.push(pL, uL, pR, uR);

            // Longitudinal chords & Warren 3D X-Bracing
            if (i > 0) {
                // Deck edges & Median line
                deckPoints.push(leftDeckPts[i - 1], pL);
                deckPoints.push(rightDeckPts[i - 1], pR);
                deckPoints.push(centerDeckPts[i - 1], pC);

                // Lower chords
                deckPoints.push(lowerTrussLeft[i - 1], uL);
                deckPoints.push(lowerTrussRight[i - 1], uR);

                // 3D Space Truss Diagonal X-Braces
                deckPoints.push(lowerTrussLeft[i - 1], pL);
                deckPoints.push(lowerTrussRight[i - 1], pR);
                deckPoints.push(leftDeckPts[i - 1], uL);
                deckPoints.push(rightDeckPts[i - 1], uR);

                // Bottom horizontal cross bracing
                deckPoints.push(lowerTrussLeft[i - 1], uR);
                deckPoints.push(lowerTrussRight[i - 1], uL);
            }
        }

        const deckMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(deckPoints),
            lineMatDark
        );
        deckGroup.add(deckMesh);

        // Dense 3D Point-Cloud Structural Joint Nodes
        const nodePositions: number[] = [];
        [...leftDeckPts, ...rightDeckPts, ...centerDeckPts, ...lowerTrussLeft, ...lowerTrussRight].forEach((pt) => {
            nodePositions.push(pt.x, pt.y, pt.z);
        });
        const nodeGeom = new THREE.BufferGeometry();
        nodeGeom.setAttribute("position", new THREE.Float32BufferAttribute(nodePositions, 3));
        const nodeMat = new THREE.PointsMaterial({
            color: 0x185fa5,
            size: 3.2,
            transparent: true,
            opacity: 0.55,
        });
        const nodesMesh = new THREE.Points(nodeGeom, nodeMat);
        deckGroup.add(nodesMesh);

        // =====================================================================
        // PHASE 6: DIAMOND PYLON MASTS & 80 CABLE-STAY TENSION MEMBERS
        // =====================================================================
        const towerGroup = new THREE.Group();
        structureGroup.add(towerGroup);

        const towerPoints: THREE.Vector3[] = [];
        const cablePoints: THREE.Vector3[] = [];
        const towerTopY = 135;

        pylonZCoords.forEach((pz) => {
            // Diamond geometry (tapering inwards to apex crown)
            const tLeftTop = new THREE.Vector3(-7, towerTopY, pz);
            const tRightTop = new THREE.Vector3(7, towerTopY, pz);
            const tLeftMid = new THREE.Vector3(-halfWidth * 0.75, 75, pz);
            const tRightMid = new THREE.Vector3(halfWidth * 0.75, 75, pz);
            const tLeftBase = new THREE.Vector3(-halfWidth - 2, 19, pz);
            const tRightBase = new THREE.Vector3(halfWidth + 2, 19, pz);

            // Column legs
            towerPoints.push(
                tLeftBase, tLeftMid,
                tLeftMid, tLeftTop,
                tRightBase, tRightMid,
                tRightMid, tRightTop,
                tLeftTop, tRightTop // Apex crown crosshead
            );

            // 3 Intermediate Cross Girders with K-Bracing
            [42, 76, 106].forEach((yTier) => {
                const ratio = (yTier - 19) / (towerTopY - 19);
                const spanX = (halfWidth + 2) * (1 - ratio * 0.85);
                const bL = new THREE.Vector3(-spanX, yTier, pz);
                const bR = new THREE.Vector3(spanX, yTier, pz);
                const bCenter = new THREE.Vector3(0, yTier - 6, pz);
                towerPoints.push(bL, bR, bL, bCenter, bR, bCenter);
            });

            // Tension Stay Cables (20 cables per tower = 80 total)
            const cableCount = 12;
            for (let c = 1; c <= cableCount; c++) {
                const mastAnchorY = towerTopY - c * 7.5;
                const mAnchorL = new THREE.Vector3(-6, mastAnchorY, pz);
                const mAnchorR = new THREE.Vector3(6, mastAnchorY, pz);

                const forwardZ = pz + c * 20;
                const backwardZ = pz - c * 20;

                if (Math.abs(forwardZ) <= totalSpan / 2) {
                    cablePoints.push(mAnchorL, new THREE.Vector3(-halfWidth, 20.5, forwardZ));
                    cablePoints.push(mAnchorR, new THREE.Vector3(halfWidth, 20.5, forwardZ));
                }
                if (Math.abs(backwardZ) <= totalSpan / 2) {
                    cablePoints.push(mAnchorL, new THREE.Vector3(-halfWidth, 20.5, backwardZ));
                    cablePoints.push(mAnchorR, new THREE.Vector3(halfWidth, 20.5, backwardZ));
                }
            }
        });

        const towerMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(towerPoints),
            lineMatDark
        );
        towerGroup.add(towerMesh);

        const cableMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(cablePoints),
            lineMatBlue
        );
        towerGroup.add(cableMesh);

        // =====================================================================
        // PHASE 7: GLOWING ACTIVE TRAFFIC, CITY SKYLINE & GROUND DATUM GRID
        // =====================================================================
        // Distant 3D Architectural City Framing
        const cityPoints: THREE.Vector3[] = [];
        for (let bx = -300; bx <= 300; bx += 55) {
            const bz = -230 - (Math.abs(bx) % 45);
            const bHeight = 45 + ((Math.abs(bx * 7) % 70));
            const bWidth = 24;
            cityPoints.push(
                new THREE.Vector3(bx, -45, bz), new THREE.Vector3(bx, -45 + bHeight, bz),
                new THREE.Vector3(bx + bWidth, -45, bz), new THREE.Vector3(bx + bWidth, -45 + bHeight, bz),
                new THREE.Vector3(bx, -45 + bHeight, bz), new THREE.Vector3(bx + bWidth, -45 + bHeight, bz)
            );
        }
        const cityMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(cityPoints),
            lineMatFaint
        );
        structureGroup.add(cityMesh);

        // Ground Datum Coordinate Grid
        const gridHelper = new THREE.GridHelper(750, 36, 0x185fa5, 0xe2e8f0);
        gridHelper.position.set(0, -75, 0);
        if (Array.isArray(gridHelper.material)) {
            gridHelper.material.forEach((m) => {
                m.transparent = true;
                m.opacity = 0.18;
            });
        } else {
            gridHelper.material.transparent = true;
            gridHelper.material.opacity = 0.18;
        }
        structureGroup.add(gridHelper);

        // Animated 3D Traffic Pulses
        const trafficCount = 14;
        const trafficPositions = new Float32Array(trafficCount * 3);
        const trafficGeom = new THREE.BufferGeometry();
        trafficGeom.setAttribute("position", new THREE.BufferAttribute(trafficPositions, 3));
        const trafficMat = new THREE.PointsMaterial({
            color: 0xc88a22,
            size: 5,
            transparent: true,
            opacity: 0.9,
        });
        const trafficMesh = new THREE.Points(trafficGeom, trafficMat);
        structureGroup.add(trafficMesh);

        const trafficOffsets = Array.from({ length: trafficCount }, (_, i) => ({
            t: i / trafficCount,
            lane: i % 2 === 0 ? -14 : 14,
            speed: i % 2 === 0 ? 0.0022 : -0.0025,
        }));

        // 3. Mouse Parallax Tracking
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 40;
            mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 30;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // 4. Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // 5. Cinematic Render Loop with Camera Director Path
        let animId: number;
        let lastTime = performance.now();
        let smoothedVelocity = 0;
        const targetPos = new THREE.Vector3();
        const targetLook = new THREE.Vector3();

        const animate = (time: number) => {
            const dt = (time - lastTime) * 0.001;
            lastTime = time;

            // Smooth mouse parallax
            mouse.x += (mouse.targetX - mouse.x) * 0.06;
            mouse.y += (mouse.targetY - mouse.y) * 0.06;

            // Scroll position & velocity
            const scrollP = scrollYProgress.get();
            const currentVelocity = scrollVelocity.get();
            smoothedVelocity += (currentVelocity - smoothedVelocity) * 0.1;

            // =================================================================
            // CINEMATIC CAMERA DIRECTOR CHOREOGRAPHY
            // Interpolates from macro close-up at foundation to grand panoramic vista
            // =================================================================
            interpolateCamera(scrollP, targetPos, targetLook);

            // Apply smooth camera motion with parallax
            camera.position.x = targetPos.x + mouse.x * (0.4 + scrollP * 0.6);
            camera.position.y = targetPos.y + mouse.y * (0.4 + scrollP * 0.6);
            camera.position.z = targetPos.z;

            // LookAt tracking target + slight mouse influence
            camera.lookAt(targetLook.x, targetLook.y, targetLook.z);

            // Subtle roll banking driven by scroll velocity
            camera.rotation.z = Math.max(-0.05, Math.min(0.05, smoothedVelocity * 0.000035));

            // =================================================================
            // PROGRESSIVE CONSTRUCTION ASSEMBLY STAGING
            // =================================================================
            // 1. Excavation & Soil Strata: Visible from start, fades out slightly in wide vista
            excavationGroup.visible = true;
            if (scrollP < 0.25) {
                // Auger drill rotating and descending
                augerMesh.rotation.y = time * 0.003;
                augerMesh.position.y = Math.sin(time * 0.002) * 3;
            }

            // 2. Rebar Cages: Enter as excavation completes (p > 0.04)
            rebarGroup.visible = scrollP > 0.04;
            if (scrollP > 0.04 && scrollP <= 0.28) {
                // Rebar cages lowering and assembling
                const rebarProgress = (scrollP - 0.04) / 0.24;
                rebarGroup.scale.y = Math.min(1, Math.max(0.1, rebarProgress));
            } else if (scrollP > 0.28) {
                rebarGroup.scale.y = 1;
            }

            // 3. Concrete Piers: Cast upwards (p > 0.12)
            concretePierGroup.visible = scrollP > 0.12;
            if (scrollP > 0.12 && scrollP <= 0.38) {
                const pierProgress = (scrollP - 0.12) / 0.26;
                concretePierGroup.scale.y = Math.min(1, Math.max(0.08, pierProgress));
            } else if (scrollP > 0.38) {
                concretePierGroup.scale.y = 1;
            }

            // 4. Pier Caps & Bearing Pads: Locked onto piers (p > 0.24)
            pierCapGroup.visible = scrollP > 0.24;

            // 5. Continuous Deck & Warren Space Truss: Cantilever launch (p > 0.32)
            deckGroup.visible = scrollP > 0.32;
            if (scrollP > 0.32 && scrollP <= 0.65) {
                const deckProgress = (scrollP - 0.32) / 0.33;
                deckGroup.scale.z = Math.min(1, Math.max(0.15, deckProgress));
            } else if (scrollP > 0.65) {
                deckGroup.scale.z = 1;
            }

            // 6. Diamond Pylons & Stay Cables: Erection & tensioning (p > 0.46)
            towerGroup.visible = scrollP > 0.46;
            if (scrollP > 0.46 && scrollP <= 0.78) {
                const towerProgress = (scrollP - 0.46) / 0.32;
                towerMesh.scale.y = Math.min(1, Math.max(0.08, towerProgress));
                cableMesh.scale.y = Math.min(1, Math.max(0.04, Math.max(0, (scrollP - 0.56) / 0.22)));
            } else if (scrollP > 0.78) {
                towerMesh.scale.y = 1;
                cableMesh.scale.y = 1;
            }

            // 7. Active Glowing Traffic: Lights up once deck is continuous (p > 0.65)
            trafficMesh.visible = scrollP > 0.65;
            if (trafficMesh.visible) {
                const posAttr = trafficGeom.attributes.position as THREE.BufferAttribute;
                const speedMultiplier = 1 + Math.min(3, Math.abs(smoothedVelocity) * 0.002);

                for (let i = 0; i < trafficCount; i++) {
                    const tData = trafficOffsets[i];
                    tData.t += tData.speed * speedMultiplier;
                    if (tData.t > 1) tData.t = 0;
                    if (tData.t < 0) tData.t = 1;

                    const z = startZ + tData.t * totalSpan;
                    const y = 20.8 + Math.sin(tData.t * Math.PI) * 11;
                    const x = tData.lane;

                    posAttr.setXYZ(i, x, y, z);
                }
                posAttr.needsUpdate = true;
            }

            // Subtle idle structure yaw drift
            structureGroup.rotation.y = Math.sin(time * 0.00025) * 0.04;

            renderer.render(scene, camera);
            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [scrollYProgress, scrollVelocity]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden
        />
    );
}
