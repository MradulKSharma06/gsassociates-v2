"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScroll, useVelocity } from "framer-motion";

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
            2500
        );
        camera.position.set(180, 85, 290);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent canvas
        container.appendChild(renderer.domElement);

        // 2. Structural Group (Positioned gracefully across viewport)
        const structureGroup = new THREE.Group();
        structureGroup.position.set(25, -25, 0);
        scene.add(structureGroup);

        // Materials: Refined high-contrast architectural palette for translucent card visibility
        const lineMatDark = new THREE.LineBasicMaterial({
            color: 0x0d1b2e,
            transparent: true,
            opacity: 0.42,
        });
        const lineMatBlue = new THREE.LineBasicMaterial({
            color: 0x185fa5,
            transparent: true,
            opacity: 0.52,
        });
        const lineMatGold = new THREE.LineBasicMaterial({
            color: 0xc88a22,
            transparent: true,
            opacity: 0.65,
        });
        const lineMatFaint = new THREE.LineBasicMaterial({
            color: 0x94a3b8,
            transparent: true,
            opacity: 0.22,
        });

        // =====================================================================
        // GEOMETRY GENERATION: HIGH-DENSITY 3D CABLE-STAYED INFRASTRUCTURE
        // =====================================================================
        const totalSpan = 640;
        const deckWidth = 56;
        const halfWidth = deckWidth / 2;
        const segments = 44;
        const step = totalSpan / segments;
        const startZ = -totalSpan / 2;

        // A. Subterranean Foundation Piles & Reinforced Caps
        const fPoints: THREE.Vector3[] = [];
        const pylonZCoords = [-totalSpan * 0.22, totalSpan * 0.22];

        pylonZCoords.forEach((pz) => {
            // 8 Deep Pile Shafts drilling down to Y = -80
            [-halfWidth - 14, -halfWidth, halfWidth, halfWidth + 14].forEach((px) => {
                [-14, 14].forEach((pzOff) => {
                    fPoints.push(new THREE.Vector3(px, -18, pz + pzOff));
                    fPoints.push(new THREE.Vector3(px, -80, pz + pzOff));
                });
            });

            // Foundation Cap Perimeter & Bracing Rings
            const capY = -18;
            const wCap = halfWidth + 18;
            const dCap = 22;
            fPoints.push(
                new THREE.Vector3(-wCap, capY, pz - dCap),
                new THREE.Vector3(wCap, capY, pz - dCap),
                new THREE.Vector3(wCap, capY, pz - dCap),
                new THREE.Vector3(wCap, capY, pz + dCap),
                new THREE.Vector3(wCap, capY, pz + dCap),
                new THREE.Vector3(-wCap, capY, pz + dCap),
                new THREE.Vector3(-wCap, capY, pz + dCap),
                new THREE.Vector3(-wCap, capY, pz - dCap),
                // Internal diagonals
                new THREE.Vector3(-wCap, capY, pz - dCap),
                new THREE.Vector3(wCap, capY, pz + dCap),
                new THREE.Vector3(wCap, capY, pz - dCap),
                new THREE.Vector3(-wCap, capY, pz + dCap)
            );
        });

        const foundationMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(fPoints),
            lineMatBlue
        );
        structureGroup.add(foundationMesh);

        // B. Main Substructure Piers & Approach Viaduct Piers
        const pierPoints: THREE.Vector3[] = [];
        // Main pylon piers
        pylonZCoords.forEach((pz) => {
            pierPoints.push(
                new THREE.Vector3(-halfWidth - 8, -18, pz),
                new THREE.Vector3(-halfWidth - 2, 18, pz),
                new THREE.Vector3(halfWidth + 8, -18, pz),
                new THREE.Vector3(halfWidth + 2, 18, pz),
                // Pier Cap Beam
                new THREE.Vector3(-halfWidth - 10, 18, pz),
                new THREE.Vector3(halfWidth + 10, 18, pz)
            );
        });

        // Approach Viaduct Piers on ends
        const viaductZ = [
            startZ + 50,
            startZ + 110,
            -startZ - 110,
            -startZ - 50,
        ];
        viaductZ.forEach((vz) => {
            pierPoints.push(
                new THREE.Vector3(-halfWidth * 0.6, -30, vz),
                new THREE.Vector3(-halfWidth * 0.4, 14, vz),
                new THREE.Vector3(halfWidth * 0.6, -30, vz),
                new THREE.Vector3(halfWidth * 0.4, 14, vz),
                // Crosshead
                new THREE.Vector3(-halfWidth * 0.8, 14, vz),
                new THREE.Vector3(halfWidth * 0.8, 14, vz)
            );
        });

        const pierMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(pierPoints),
            lineMatDark
        );
        structureGroup.add(pierMesh);

        // C. Continuous 3D Deck, Median Barrier & Full Warren Space Truss
        const deckPoints: THREE.Vector3[] = [];
        const leftDeckPts: THREE.Vector3[] = [];
        const rightDeckPts: THREE.Vector3[] = [];
        const centerDeckPts: THREE.Vector3[] = [];
        const lowerTrussLeft: THREE.Vector3[] = [];
        const lowerTrussRight: THREE.Vector3[] = [];

        for (let i = 0; i <= segments; i++) {
            const z = startZ + i * step;
            // Architectural Camber
            const y = 18 + Math.sin((i / segments) * Math.PI) * 11;

            const pL = new THREE.Vector3(-halfWidth, y, z);
            const pR = new THREE.Vector3(halfWidth, y, z);
            const pC = new THREE.Vector3(0, y + 1.2, z);
            leftDeckPts.push(pL);
            rightDeckPts.push(pR);
            centerDeckPts.push(pC);

            // Transverse Deck Ribs
            deckPoints.push(pL, pC);
            deckPoints.push(pC, pR);

            // Lower Warren Truss Chords (Y - 14)
            const uL = new THREE.Vector3(-halfWidth + 7, y - 14, z);
            const uR = new THREE.Vector3(halfWidth - 7, y - 14, z);
            lowerTrussLeft.push(uL);
            lowerTrussRight.push(uR);

            deckPoints.push(uL, uR);
            deckPoints.push(pL, uL);
            deckPoints.push(pR, uR);

            // Longitudinal chords & Warren diagonals
            if (i > 0) {
                // Deck edges
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
        structureGroup.add(deckMesh);

        // D. Soaring Diamond Pylon Masts & 80 Stay-Cables
        const towerPoints: THREE.Vector3[] = [];
        const cablePoints: THREE.Vector3[] = [];
        const towerTopY = 135;

        pylonZCoords.forEach((pz) => {
            // Diamond geometry (tapering inwards to apex crown)
            const tLeftTop = new THREE.Vector3(-7, towerTopY, pz);
            const tRightTop = new THREE.Vector3(7, towerTopY, pz);
            const tLeftMid = new THREE.Vector3(-halfWidth * 0.75, 75, pz);
            const tRightMid = new THREE.Vector3(halfWidth * 0.75, 75, pz);
            const tLeftBase = new THREE.Vector3(-halfWidth - 2, 18, pz);
            const tRightBase = new THREE.Vector3(halfWidth + 2, 18, pz);

            // Column legs
            towerPoints.push(tLeftBase, tLeftMid);
            towerPoints.push(tLeftMid, tLeftTop);
            towerPoints.push(tRightBase, tRightMid);
            towerPoints.push(tRightMid, tRightTop);
            towerPoints.push(tLeftTop, tRightTop); // Apex crown beam

            // 3 Intermediate Cross Girders with K-Bracing
            [40, 75, 105].forEach((yTier) => {
                const ratio = (yTier - 18) / (towerTopY - 18);
                const spanX = (halfWidth + 2) * (1 - ratio * 0.85);
                const bL = new THREE.Vector3(-spanX, yTier, pz);
                const bR = new THREE.Vector3(spanX, yTier, pz);
                const bCenter = new THREE.Vector3(0, yTier - 6, pz);
                towerPoints.push(bL, bR);
                towerPoints.push(bL, bCenter);
                towerPoints.push(bR, bCenter);
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
                    cablePoints.push(mAnchorL, new THREE.Vector3(-halfWidth, 19, forwardZ));
                    cablePoints.push(mAnchorR, new THREE.Vector3(halfWidth, 19, forwardZ));
                }
                if (Math.abs(backwardZ) <= totalSpan / 2) {
                    cablePoints.push(mAnchorL, new THREE.Vector3(-halfWidth, 19, backwardZ));
                    cablePoints.push(mAnchorR, new THREE.Vector3(halfWidth, 19, backwardZ));
                }
            }
        });

        const towerMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(towerPoints),
            lineMatDark
        );
        structureGroup.add(towerMesh);

        const cableMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(cablePoints),
            lineMatBlue
        );
        structureGroup.add(cableMesh);

        // E. Dense 3D Point-Cloud Structural Joint Nodes (Alder & Stone Benchmark)
        const nodePositions: number[] = [];
        [...leftDeckPts, ...rightDeckPts, ...centerDeckPts, ...lowerTrussLeft, ...lowerTrussRight].forEach((pt) => {
            nodePositions.push(pt.x, pt.y, pt.z);
        });
        const nodeGeom = new THREE.BufferGeometry();
        nodeGeom.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(nodePositions, 3)
        );
        const nodeMat = new THREE.PointsMaterial({
            color: 0x185fa5,
            size: 3.2,
            transparent: true,
            opacity: 0.55,
        });
        const nodesMesh = new THREE.Points(nodeGeom, nodeMat);
        structureGroup.add(nodesMesh);

        // F. Distant 3D Architectural City Framing (Deep background horizon)
        const cityPoints: THREE.Vector3[] = [];
        for (let bx = -280; bx <= 280; bx += 55) {
            const bz = -220 - (Math.abs(bx) % 40);
            const bHeight = 45 + ((Math.abs(bx * 7) % 65));
            const bWidth = 24;
            // Wireframe building silhouette
            cityPoints.push(
                new THREE.Vector3(bx, -40, bz),
                new THREE.Vector3(bx, -40 + bHeight, bz),
                new THREE.Vector3(bx + bWidth, -40, bz),
                new THREE.Vector3(bx + bWidth, -40 + bHeight, bz),
                new THREE.Vector3(bx, -40 + bHeight, bz),
                new THREE.Vector3(bx + bWidth, -40 + bHeight, bz)
            );
        }
        const cityMesh = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(cityPoints),
            lineMatFaint
        );
        structureGroup.add(cityMesh);

        // G. Ground Datum Coordinate Grid
        const gridHelper = new THREE.GridHelper(700, 35, 0x185fa5, 0xe2e8f0);
        gridHelper.position.set(0, -65, 0);
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

        // H. Animated 3D Traffic Pulses
        const trafficCount = 12;
        const trafficPositions = new Float32Array(trafficCount * 3);
        const trafficGeom = new THREE.BufferGeometry();
        trafficGeom.setAttribute(
            "position",
            new THREE.BufferAttribute(trafficPositions, 3)
        );
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
            mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 45;
            mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 35;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // 4. Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // 5. Render Loop with High-Kinetic Scroll Physics
        let animId: number;
        let lastTime = performance.now();
        let smoothedVelocity = 0;

        const animate = (time: number) => {
            const dt = (time - lastTime) * 0.001;
            lastTime = time;

            // Interpolate mouse parallax
            mouse.x += (mouse.targetX - mouse.x) * 0.06;
            mouse.y += (mouse.targetY - mouse.y) * 0.06;

            // Scroll position & velocity
            const scrollP = scrollYProgress.get();
            const currentVelocity = scrollVelocity.get();
            smoothedVelocity += (currentVelocity - smoothedVelocity) * 0.1;

            // 1. Dynamic 3D Camera Orbit & Banking
            // Orbit sweeps 120° around structure as you scroll
            const orbitAngle = 0.75 + scrollP * 1.8;
            const orbitRadius = 330 - scrollP * 50;
            const camHeight = 70 + scrollP * 45 + mouse.y;

            camera.position.x = Math.cos(orbitAngle) * orbitRadius + mouse.x + 20;
            camera.position.z = Math.sin(orbitAngle) * orbitRadius;
            camera.position.y = camHeight;
            camera.lookAt(25, 20, 0);

            // Dynamic camera roll banking driven by scroll velocity!
            camera.rotation.z = Math.max(-0.06, Math.min(0.06, smoothedVelocity * 0.00004));

            // 2. Progressive 3D Structural Erection & Assembly
            foundationMesh.visible = true;
            pierMesh.visible = scrollP > 0.06;
            deckMesh.visible = scrollP > 0.16;
            nodesMesh.visible = scrollP > 0.20;
            towerMesh.visible = scrollP > 0.38;
            cableMesh.visible = scrollP > 0.52;
            trafficMesh.visible = scrollP > 0.68;

            // Dynamic vertical growth of towers and cables during scroll
            if (scrollP > 0.38 && scrollP <= 0.75) {
                const towerP = (scrollP - 0.38) / 0.37;
                towerMesh.scale.y = Math.min(1, Math.max(0.08, towerP));
                cableMesh.scale.y = Math.min(1, Math.max(0.04, (scrollP - 0.52) / 0.23));
            } else if (scrollP > 0.75) {
                towerMesh.scale.y = 1;
                cableMesh.scale.y = 1;
            } else {
                towerMesh.scale.y = 0.08;
                cableMesh.scale.y = 0.04;
            }

            // 3. Kinetic Deck Vibration / Wave when scrolling
            if (Math.abs(smoothedVelocity) > 20) {
                structureGroup.position.y = -25 + Math.sin(time * 0.008) * 1.5;
            } else {
                structureGroup.position.y = -25;
            }

            // 4. Traffic Flow & Scroll Boost
            if (trafficMesh.visible) {
                const posAttr = trafficGeom.attributes.position as THREE.BufferAttribute;
                // Traffic moves faster when user is scrolling!
                const speedMultiplier = 1 + Math.min(3, Math.abs(smoothedVelocity) * 0.002);

                for (let i = 0; i < trafficCount; i++) {
                    const tData = trafficOffsets[i];
                    tData.t += tData.speed * speedMultiplier;
                    if (tData.t > 1) tData.t = 0;
                    if (tData.t < 0) tData.t = 1;

                    const z = startZ + tData.t * totalSpan;
                    const y = 19.5 + Math.sin(tData.t * Math.PI) * 11;
                    const x = tData.lane;

                    posAttr.setXYZ(i, x, y, z);
                }
                posAttr.needsUpdate = true;
            }

            // Continuous gentle idle yaw drift
            structureGroup.rotation.y = Math.sin(time * 0.00025) * 0.05;

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
