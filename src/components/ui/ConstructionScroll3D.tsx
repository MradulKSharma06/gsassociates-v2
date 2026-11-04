"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScroll, useVelocity } from "framer-motion";

/**
 * Cinematographic Multi-Angle Camera Waypoint Definition
 * Camera sweeps and orbits around the 3D bridge in a dynamic flight path:
 * 1. Low Ground Macro South-East (Excavation)
 * 2. Mid-level West/North-West Orbit (Cast Concrete Pier & Flared Hammerhead Cap)
 * 3. Deck Cantilever Axis Glide (Launching Box Girders & Warren Space Truss)
 * 4. High Diamond Pylon Orbit (Tower Apex & 80 Stay-Cables Tensioning)
 * 5. Grand 3/4 Aerial Panoramic Reveal (Full 640m Span, Streaming Traffic, Skyline)
 */
interface CameraWaypoint {
    progress: number;
    pos: THREE.Vector3;
    target: THREE.Vector3;
}

const CAMERA_WAYPOINTS: CameraWaypoint[] = [
    // Waypoint 1 (p = 0.00): Low Ground South-East Macro Shot (Foundation Bedrock)
    {
        progress: 0.0,
        pos: new THREE.Vector3(44, -12, 68),
        target: new THREE.Vector3(0, -32, -35),
    },
    // Waypoint 2 (p = 0.24): Orbit Sweep to West/North-West (Cast Piers & Hammerhead Cap)
    {
        progress: 0.24,
        pos: new THREE.Vector3(-68, 22, 88),
        target: new THREE.Vector3(0, 4, -15),
    },
    // Waypoint 3 (p = 0.50): Roadway Deck Longitudinal Axis Glide (Cantilever Truss Launch)
    {
        progress: 0.50,
        pos: new THREE.Vector3(92, 62, -88),
        target: new THREE.Vector3(0, 24, 40),
    },
    // Waypoint 4 (p = 0.74): High Tower Orbit (Diamond Pylon Crown & Stay Cable Fan)
    {
        progress: 0.74,
        pos: new THREE.Vector3(162, 98, 125),
        target: new THREE.Vector3(0, 70, -15),
    },
    // Waypoint 5 (p = 1.00): Grand Monumental 3/4 Panoramic Vista (640m Span + Traffic + City)
    {
        progress: 1.0,
        pos: new THREE.Vector3(255, 126, 330),
        target: new THREE.Vector3(15, 22, 0),
    },
];

function interpolateCamera(
    p: number,
    targetPos: THREE.Vector3,
    targetLook: THREE.Vector3,
    isMobile: boolean
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
    } else {
        // Cubic Hermite smoothstep easing between waypoints
        const linearT = (clampedP - w1.progress) / (w2.progress - w1.progress);
        const smoothT = linearT * linearT * (3 - 2 * linearT);

        targetPos.lerpVectors(w1.pos, w2.pos, smoothT);
        targetLook.lerpVectors(w1.target, w2.target, smoothT);
    }

    // Mobile Distance Adjustment: Push camera slightly back in portrait so the span fits
    if (isMobile) {
        targetPos.x *= 1.15;
        targetPos.z *= 1.18;
        targetPos.y += 8;
    }
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
            2800
        );

        const isMobileInit = window.innerWidth < 768;
        const currentCamPos = new THREE.Vector3();
        const currentCamLook = new THREE.Vector3();
        interpolateCamera(0, currentCamPos, currentCamLook, isMobileInit);
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
        structureGroup.position.set(isMobileInit ? 0 : 20, isMobileInit ? -18 : -25, 0);
        if (isMobileInit) {
            structureGroup.scale.set(0.68, 0.68, 0.68);
        }
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
            opacity: 0.22,
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
        [-24, -45, -68, -92].forEach((depthY, sIdx) => {
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
                const shaftRadius = 5.2;

                // 4 Vertical Shaft guide casing walls
                for (let a = 0; a < 4; a++) {
                    const angle = (a / 4) * Math.PI * 2;
                    const wallX = bx + Math.cos(angle) * shaftRadius;
                    const wallZ = bz + Math.sin(angle) * shaftRadius;
                    boreholePoints.push(
                        new THREE.Vector3(wallX, -18, wallZ),
                        new THREE.Vector3(wallX, -90, wallZ)
                    );
                }

                // Helical Auger Drill Flights (Stationary on idle, rotates only when scrolling down in excavation phase)
                const augerTurns = 7;
                const augerSteps = 42;
                for (let stepIdx = 0; stepIdx < augerSteps; stepIdx++) {
                    const t1 = stepIdx / augerSteps;
                    const t2 = (stepIdx + 1) / augerSteps;
                    const a1 = t1 * Math.PI * 2 * augerTurns;
                    const a2 = t2 * Math.PI * 2 * augerTurns;
                    const y1 = -18 - t1 * 68;
                    const y2 = -18 - t2 * 68;
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
        // PHASE 2: STEEL REINFORCEMENT (R/F) CAGES (VERTICAL RODS & SPIRAL HOOPS)
        // Note: Once concrete is poured, reinforcement is encased and hidden!
        // =====================================================================
        const rebarGroup = new THREE.Group();
        structureGroup.add(rebarGroup);

        const rebarPoints: THREE.Vector3[] = [];
        pylonZCoords.forEach((pz) => {
            [-halfWidth, halfWidth].forEach((colX) => {
                const cageRadius = 6.8;
                const barCount = 12;
                // Vertical high-tensile steel rods
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
        // As concrete rises, it encases the rebar cage!
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
                new THREE.Vector3(-wCap, capY, pz - dCap), new THREE.Vector3(wCap, capY, pz + dCap),
                new THREE.Vector3(wCap, capY, pz - dCap), new THREE.Vector3(-wCap, capY, pz + dCap)
            );

            // Cast Pier Column Shafts (from Y = -18 to Y = 18)
            [-halfWidth, halfWidth].forEach((colX) => {
                const octRadius = 8.5;
                const octSteps = 8;
                for (let s = 0; s < octSteps; s++) {
                    const a1 = (s / octSteps) * Math.PI * 2;
                    const a2 = ((s + 1) / octSteps) * Math.PI * 2;
                    const x1 = colX + Math.cos(a1) * octRadius;
                    const z1 = pz + Math.sin(a1) * octRadius;
                    const x2 = colX + Math.cos(a2) * octRadius;
                    const z2 = pz + Math.sin(a2) * octRadius;

                    pierPoints.push(new THREE.Vector3(x1, -18, z1), new THREE.Vector3(x2, -18, z2));
                    pierPoints.push(new THREE.Vector3(x1, 18, z1), new THREE.Vector3(x2, 18, z2));
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
            const capBotY = 14;
            const capTopY = 19;
            const capHalfW = halfWidth + 14;
            const capDepth = 16;

            capPoints.push(
                new THREE.Vector3(-halfWidth, capBotY, pz - capDepth * 0.6),
                new THREE.Vector3(halfWidth, capBotY, pz - capDepth * 0.6),
                new THREE.Vector3(halfWidth, capBotY, pz + capDepth * 0.6),
                new THREE.Vector3(-halfWidth, capBotY, pz + capDepth * 0.6),
                new THREE.Vector3(-capHalfW, capTopY, pz - capDepth),
                new THREE.Vector3(capHalfW, capTopY, pz - capDepth),
                new THREE.Vector3(capHalfW, capTopY, pz + capDepth),
                new THREE.Vector3(-capHalfW, capTopY, pz + capDepth),
                new THREE.Vector3(-halfWidth, capBotY, pz - capDepth * 0.6),
                new THREE.Vector3(-capHalfW, capTopY, pz - capDepth),
                new THREE.Vector3(halfWidth, capBotY, pz - capDepth * 0.6),
                new THREE.Vector3(capHalfW, capTopY, pz - capDepth),
                new THREE.Vector3(halfWidth, capBotY, pz + capDepth * 0.6),
                new THREE.Vector3(capHalfW, capTopY, pz + capDepth),
                new THREE.Vector3(-halfWidth, capBotY, pz + capDepth * 0.6),
                new THREE.Vector3(-capHalfW, capTopY, pz + capDepth)
            );

            // 4 High-Spec Elastomeric Neoprene Bearing Pads
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
            const y = 19.5 + Math.sin((i / segments) * Math.PI) * 11;

            const pL = new THREE.Vector3(-halfWidth, y, z);
            const pR = new THREE.Vector3(halfWidth, y, z);
            const pC = new THREE.Vector3(0, y + 1.2, z);
            leftDeckPts.push(pL);
            rightDeckPts.push(pR);
            centerDeckPts.push(pC);

            deckPoints.push(pL, pC, pC, pR);

            const barL = new THREE.Vector3(-halfWidth, y + 3.2, z);
            const barR = new THREE.Vector3(halfWidth, y + 3.2, z);
            deckPoints.push(pL, barL, pR, barR);

            const uL = new THREE.Vector3(-halfWidth + 7, y - 14, z);
            const uR = new THREE.Vector3(halfWidth - 7, y - 14, z);
            lowerTrussLeft.push(uL);
            lowerTrussRight.push(uR);

            deckPoints.push(uL, uR);
            deckPoints.push(pL, uL, pR, uR);

            if (i > 0) {
                deckPoints.push(leftDeckPts[i - 1], pL);
                deckPoints.push(rightDeckPts[i - 1], pR);
                deckPoints.push(centerDeckPts[i - 1], pC);

                deckPoints.push(lowerTrussLeft[i - 1], uL);
                deckPoints.push(lowerTrussRight[i - 1], uR);

                deckPoints.push(lowerTrussLeft[i - 1], pL);
                deckPoints.push(lowerTrussRight[i - 1], pR);
                deckPoints.push(leftDeckPts[i - 1], uL);
                deckPoints.push(rightDeckPts[i - 1], uR);

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
            const tLeftTop = new THREE.Vector3(-7, towerTopY, pz);
            const tRightTop = new THREE.Vector3(7, towerTopY, pz);
            const tLeftMid = new THREE.Vector3(-halfWidth * 0.75, 75, pz);
            const tRightMid = new THREE.Vector3(halfWidth * 0.75, 75, pz);
            const tLeftBase = new THREE.Vector3(-halfWidth - 2, 19, pz);
            const tRightBase = new THREE.Vector3(halfWidth + 2, 19, pz);

            towerPoints.push(
                tLeftBase, tLeftMid,
                tLeftMid, tLeftTop,
                tRightBase, tRightMid,
                tRightMid, tRightTop,
                tLeftTop, tRightTop
            );

            [42, 76, 106].forEach((yTier) => {
                const ratio = (yTier - 19) / (towerTopY - 19);
                const spanX = (halfWidth + 2) * (1 - ratio * 0.85);
                const bL = new THREE.Vector3(-spanX, yTier, pz);
                const bR = new THREE.Vector3(spanX, yTier, pz);
                const bCenter = new THREE.Vector3(0, yTier - 6, pz);
                towerPoints.push(bL, bR, bL, bCenter, bR, bCenter);
            });

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

        // 3. Responsive FOV & Screen Scale Handler
        let isMobile = window.innerWidth < 768;
        const updateResponsive = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const aspect = width / height;

            isMobile = width < 768;

            // Dynamically widen vertical FOV in portrait so the entire 640m bridge model fits without cutting off!
            if (aspect < 0.65) {
                camera.fov = 72; // Wide portrait
            } else if (aspect < 1.0) {
                camera.fov = 60; // Tablet / square
            } else {
                camera.fov = 46; // Desktop widescreen
            }

            camera.aspect = aspect;
            camera.updateProjectionMatrix();

            if (isMobile) {
                structureGroup.scale.set(0.68, 0.68, 0.68);
                structureGroup.position.set(0, -18, 0); // Centered on mobile
            } else {
                structureGroup.scale.set(1.0, 1.0, 1.0);
                structureGroup.position.set(20, -25, 0);
            }

            renderer.setSize(width, height);
        };

        updateResponsive();
        window.addEventListener("resize", updateResponsive);

        // 4. Mouse Parallax Tracking
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 35;
            mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 25;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // 5. Cinematic Render Loop with Dynamic Camera Orbit & Stage Assembly
        let animId: number;
        let lastTime = performance.now();
        let smoothedVelocity = 0;
        const targetPos = new THREE.Vector3();
        const targetLook = new THREE.Vector3();

        const animate = (time: number) => {
            const dt = (time - lastTime) * 0.001;
            lastTime = time;

            mouse.x += (mouse.targetX - mouse.x) * 0.06;
            mouse.y += (mouse.targetY - mouse.y) * 0.06;

            const scrollP = scrollYProgress.get();
            const currentVelocity = scrollVelocity.get();
            smoothedVelocity += (currentVelocity - smoothedVelocity) * 0.1;

            // =================================================================
            // CINEMATIC CAMERA DIRECTOR PATH (ORBITING & MOVING AROUND)
            // =================================================================
            interpolateCamera(scrollP, targetPos, targetLook, isMobile);

            camera.position.x = targetPos.x + mouse.x * (0.3 + scrollP * 0.5);
            camera.position.y = targetPos.y + mouse.y * (0.3 + scrollP * 0.5);
            camera.position.z = targetPos.z;
            camera.lookAt(targetLook.x, targetLook.y, targetLook.z);

            // Subtle roll banking driven by scroll velocity
            camera.rotation.z = Math.max(-0.05, Math.min(0.05, smoothedVelocity * 0.000035));

            // =================================================================
            // CIVIL ENGINEERING CONSTRUCTION STAGING
            // =================================================================
            // 1. Excavation & Soil Strata:
            // The auger drill ONLY moves when actively scrolling in excavation stage (scrollP <= 0.12).
            // It does NOT continuously spin on idle!
            if (scrollP <= 0.12) {
                augerMesh.visible = true;
                // Rotation proportional to scroll position / scroll velocity (no endless loop!)
                augerMesh.rotation.y = scrollP * 35 + smoothedVelocity * 0.0008;
                augerMesh.position.y = -scrollP * 15;
            } else {
                // Auger drill is retracted and hidden once excavation finishes!
                augerMesh.visible = false;
            }
            excavationGroup.visible = true;

            // 2. Steel Reinforcement (R/F) Cages:
            // R/F is placed in shafts and visible during reinforcement phase (0.03 <= scrollP <= 0.24).
            // CRITICAL CIVIL RULE: As concrete is poured, r/f is encased inside and NO LONGER visible!
            if (scrollP >= 0.03 && scrollP <= 0.24) {
                rebarGroup.visible = true;
                const rebarProgress = (scrollP - 0.03) / 0.16;
                rebarGroup.scale.y = Math.min(1, Math.max(0.1, rebarProgress));
                // Fade out rebar as concrete rises around it
                if (scrollP > 0.16) {
                    const fade = 1 - (scrollP - 0.16) / 0.08;
                    lineMatGold.opacity = 0.72 * Math.max(0, fade);
                } else {
                    lineMatGold.opacity = 0.72;
                }
            } else {
                // Completely hidden once concrete pier column is cast!
                rebarGroup.visible = false;
                lineMatGold.opacity = 0.72; // Restore for traffic/bearings
            }

            // 3. Concrete Pier Columns (Cast-In-Situ):
            // Rise upward from Y = -18 to Y = 18, permanently encasing the rebar
            concretePierGroup.visible = scrollP > 0.12;
            if (scrollP > 0.12 && scrollP <= 0.36) {
                const pierProgress = (scrollP - 0.12) / 0.24;
                concretePierGroup.scale.y = Math.min(1, Math.max(0.08, pierProgress));
            } else if (scrollP > 0.36) {
                concretePierGroup.scale.y = 1;
            }

            // 4. Flared Hammerhead Pier Caps & Bearing Pads: Locked onto piers (p > 0.22)
            pierCapGroup.visible = scrollP > 0.22;

            // 5. Continuous Deck & Warren Space Truss: Balanced Cantilever launch (p > 0.30)
            deckGroup.visible = scrollP > 0.30;
            if (scrollP > 0.30 && scrollP <= 0.64) {
                const deckProgress = (scrollP - 0.30) / 0.34;
                deckGroup.scale.z = Math.min(1, Math.max(0.15, deckProgress));
            } else if (scrollP > 0.64) {
                deckGroup.scale.z = 1;
            }

            // 6. Diamond Pylons & Stay Cables: Erection & tensioning (p > 0.44)
            towerGroup.visible = scrollP > 0.44;
            if (scrollP > 0.44 && scrollP <= 0.78) {
                const towerProgress = (scrollP - 0.44) / 0.34;
                towerMesh.scale.y = Math.min(1, Math.max(0.08, towerProgress));
                cableMesh.scale.y = Math.min(1, Math.max(0.04, Math.max(0, (scrollP - 0.54) / 0.24)));
            } else if (scrollP > 0.78) {
                towerMesh.scale.y = 1;
                cableMesh.scale.y = 1;
            }

            // 7. Active Glowing Traffic: Lights up once deck is continuous (p > 0.64)
            trafficMesh.visible = scrollP > 0.64;
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

            renderer.render(scene, camera);
            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", updateResponsive);
            window.removeEventListener("mousemove", handleMouseMove);
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
