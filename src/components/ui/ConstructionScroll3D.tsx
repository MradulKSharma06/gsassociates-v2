"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScroll } from "framer-motion";

export function ConstructionScroll3D() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Scene, Camera, Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            2000
        );
        camera.position.set(160, 90, 260);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent canvas
        container.appendChild(renderer.domElement);

        // 2. Build 3D Structural Geometry (Piles, Piers, Deck, Towers, Cables)
        // Group holding all structural 3D objects
        const structureGroup = new THREE.Group();
        structureGroup.position.set(40, -30, 0); // Positioned slightly to the right
        scene.add(structureGroup);

        // Materials (Off-white / Slate / Blueprint Blue / Gold Palette)
        const lineMatDark = new THREE.LineBasicMaterial({
            color: 0x0d1b2e,
            transparent: true,
            opacity: 0.22,
        });
        const lineMatBlue = new THREE.LineBasicMaterial({
            color: 0x185fa5,
            transparent: true,
            opacity: 0.28,
        });
        const lineMatGold = new THREE.LineBasicMaterial({
            color: 0xc88a22,
            transparent: true,
            opacity: 0.35,
        });

        // 3D Geometry Data
        const totalSpan = 480;
        const deckWidth = 50;
        const halfWidth = deckWidth / 2;
        const segments = 32;
        const step = totalSpan / segments;
        const startZ = -totalSpan / 2;

        // A. Subterranean Piles & Foundation Caps (Y = -50 to -20)
        const foundationLines: THREE.LineSegments[] = [];
        const fPoints: THREE.Vector3[] = [];
        const pylonZCoords = [-totalSpan / 5, totalSpan / 5];

        pylonZCoords.forEach((pz) => {
            // 4 Pile shafts drilling down to Y = -75
            [-halfWidth - 8, halfWidth + 8].forEach((px) => {
                [-12, 12].forEach((pzOff) => {
                    fPoints.push(new THREE.Vector3(px, -20, pz + pzOff));
                    fPoints.push(new THREE.Vector3(px, -65, pz + pzOff));
                });
            });
            // Foundation cap ring
            fPoints.push(new THREE.Vector3(-halfWidth - 12, -20, pz - 16));
            fPoints.push(new THREE.Vector3(halfWidth + 12, -20, pz - 16));
            fPoints.push(new THREE.Vector3(halfWidth + 12, -20, pz + 16));
            fPoints.push(new THREE.Vector3(-halfWidth - 12, -20, pz + 16));
            fPoints.push(new THREE.Vector3(-halfWidth - 12, -20, pz - 16));
            fPoints.push(new THREE.Vector3(-halfWidth - 12, -20, pz + 16));
        });

        const fGeom = new THREE.BufferGeometry().setFromPoints(fPoints);
        const foundationMesh = new THREE.LineSegments(fGeom, lineMatBlue);
        structureGroup.add(foundationMesh);

        // B. Vertical Reinforced Piers (Y = -20 to +15)
        const pierPoints: THREE.Vector3[] = [];
        pylonZCoords.forEach((pz) => {
            pierPoints.push(new THREE.Vector3(-halfWidth - 6, -20, pz));
            pierPoints.push(new THREE.Vector3(-halfWidth - 2, 15, pz));
            pierPoints.push(new THREE.Vector3(halfWidth + 6, -20, pz));
            pierPoints.push(new THREE.Vector3(halfWidth + 2, 15, pz));
            // Pier cap cross-beam
            pierPoints.push(new THREE.Vector3(-halfWidth - 6, 15, pz));
            pierPoints.push(new THREE.Vector3(halfWidth + 6, 15, pz));
        });
        const pierGeom = new THREE.BufferGeometry().setFromPoints(pierPoints);
        const pierMesh = new THREE.LineSegments(pierGeom, lineMatDark);
        structureGroup.add(pierMesh);

        // C. Continuous 3D Roadway Deck & Under-Deck Warren Trusses (Y = 15)
        const deckPoints: THREE.Vector3[] = [];
        const leftDeckPts: THREE.Vector3[] = [];
        const rightDeckPts: THREE.Vector3[] = [];
        const centerDeckPts: THREE.Vector3[] = [];

        for (let i = 0; i <= segments; i++) {
            const z = startZ + i * step;
            // Parabolic crown camber
            const y = 15 + Math.sin((i / segments) * Math.PI) * 8;

            const pL = new THREE.Vector3(-halfWidth, y, z);
            const pR = new THREE.Vector3(halfWidth, y, z);
            const pC = new THREE.Vector3(0, y + 0.5, z);
            leftDeckPts.push(pL);
            rightDeckPts.push(pR);
            centerDeckPts.push(pC);

            // Cross deck rib
            deckPoints.push(pL);
            deckPoints.push(pR);

            // Under-deck truss bottom chord (Y - 12)
            const uL = new THREE.Vector3(-halfWidth + 6, y - 10, z);
            const uR = new THREE.Vector3(halfWidth - 6, y - 10, z);
            deckPoints.push(uL);
            deckPoints.push(uR);
            deckPoints.push(pL);
            deckPoints.push(uL);
            deckPoints.push(pR);
            deckPoints.push(uR);

            // Longitudinal chords
            if (i > 0) {
                deckPoints.push(leftDeckPts[i - 1]);
                deckPoints.push(pL);
                deckPoints.push(rightDeckPts[i - 1]);
                deckPoints.push(pR);
                deckPoints.push(centerDeckPts[i - 1]);
                deckPoints.push(pC);
            }
        }
        const deckGeom = new THREE.BufferGeometry().setFromPoints(deckPoints);
        const deckMesh = new THREE.LineSegments(deckGeom, lineMatDark);
        structureGroup.add(deckMesh);

        // D. Soaring Diamond Pylon Masts & Stay Cables (Y = 15 to 110)
        const towerPoints: THREE.Vector3[] = [];
        const cablePoints: THREE.Vector3[] = [];
        const towerTopY = 105;

        pylonZCoords.forEach((pz) => {
            // Left & Right mast columns inclined inwards to apex
            const tLeftTop = new THREE.Vector3(-6, towerTopY, pz);
            const tRightTop = new THREE.Vector3(6, towerTopY, pz);
            const tLeftBase = new THREE.Vector3(-halfWidth - 2, 15, pz);
            const tRightBase = new THREE.Vector3(halfWidth + 2, 15, pz);

            towerPoints.push(tLeftBase, tLeftTop);
            towerPoints.push(tRightBase, tRightTop);
            towerPoints.push(tLeftTop, tRightTop); // Apex cross strut

            // Intermediate cross strut
            const midY = (15 + towerTopY) * 0.52;
            towerPoints.push(new THREE.Vector3(-halfWidth * 0.45, midY, pz));
            towerPoints.push(new THREE.Vector3(halfWidth * 0.45, midY, pz));

            // Tension Stay-Cables
            const cableCount = 8;
            for (let c = 1; c <= cableCount; c++) {
                const mastAnchorY = towerTopY - c * 7.5;
                const mAnchorL = new THREE.Vector3(-5, mastAnchorY, pz);
                const mAnchorR = new THREE.Vector3(5, mastAnchorY, pz);

                const forwardZ = pz + c * 22;
                const backwardZ = pz - c * 22;

                if (Math.abs(forwardZ) <= totalSpan / 2) {
                    cablePoints.push(mAnchorL, new THREE.Vector3(-halfWidth, 16, forwardZ));
                    cablePoints.push(mAnchorR, new THREE.Vector3(halfWidth, 16, forwardZ));
                }
                if (Math.abs(backwardZ) <= totalSpan / 2) {
                    cablePoints.push(mAnchorL, new THREE.Vector3(-halfWidth, 16, backwardZ));
                    cablePoints.push(mAnchorR, new THREE.Vector3(halfWidth, 16, backwardZ));
                }
            }
        });

        const towerGeom = new THREE.BufferGeometry().setFromPoints(towerPoints);
        const towerMesh = new THREE.LineSegments(towerGeom, lineMatDark);
        structureGroup.add(towerMesh);

        const cableGeom = new THREE.BufferGeometry().setFromPoints(cablePoints);
        const cableMesh = new THREE.LineSegments(cableGeom, lineMatBlue);
        structureGroup.add(cableMesh);

        // E. 3D Architectural Point-Cloud Joint Nodes
        const nodePositions: number[] = [];
        [...leftDeckPts, ...rightDeckPts, ...centerDeckPts].forEach((pt) => {
            nodePositions.push(pt.x, pt.y, pt.z);
        });
        const nodeGeom = new THREE.BufferGeometry();
        nodeGeom.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(nodePositions, 3)
        );
        const nodeMat = new THREE.PointsMaterial({
            color: 0x185fa5,
            size: 2.5,
            transparent: true,
            opacity: 0.35,
        });
        const nodesMesh = new THREE.Points(nodeGeom, nodeMat);
        structureGroup.add(nodesMesh);

        // F. Animated 3D Traffic Pulses along Deck
        const trafficCount = 8;
        const trafficPositions = new Float32Array(trafficCount * 3);
        const trafficGeom = new THREE.BufferGeometry();
        trafficGeom.setAttribute(
            "position",
            new THREE.BufferAttribute(trafficPositions, 3)
        );
        const trafficMat = new THREE.PointsMaterial({
            color: 0xc88a22,
            size: 4,
            transparent: true,
            opacity: 0.85,
        });
        const trafficMesh = new THREE.Points(trafficGeom, trafficMat);
        structureGroup.add(trafficMesh);

        const trafficOffsets = Array.from({ length: trafficCount }, (_, i) => ({
            t: (i / trafficCount),
            lane: i % 2 === 0 ? -12 : 12,
            speed: (i % 2 === 0 ? 0.0018 : -0.0022),
        }));

        // G. Ground Datum Survey Grid
        const gridHelper = new THREE.GridHelper(520, 26, 0x185fa5, 0xe2e8f0);
        gridHelper.position.set(0, -65, 0);
        if (Array.isArray(gridHelper.material)) {
            gridHelper.material.forEach((m) => {
                m.transparent = true;
                m.opacity = 0.12;
            });
        } else {
            gridHelper.material.transparent = true;
            gridHelper.material.opacity = 0.12;
        }
        structureGroup.add(gridHelper);

        // 3. Mouse Parallax Inertia
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 35;
            mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 25;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // 4. Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // 5. Render Loop with Scroll Scrubbing & Camera Orbit
        let animId: number;
        let lastTime = performance.now();

        const animate = (time: number) => {
            const dt = (time - lastTime) * 0.001;
            lastTime = time;

            // Smooth mouse interpolation
            mouse.x += (mouse.targetX - mouse.x) * 0.05;
            mouse.y += (mouse.targetY - mouse.y) * 0.05;

            // Scroll Progress (0 to 1)
            const scrollP = scrollYProgress.get();

            // Dynamic 3D Camera Orbit Path governed by scroll
            // As user scrolls from 0 to 1, camera orbits 110 degrees around structure
            const orbitAngle = 0.8 + scrollP * 1.6;
            const orbitRadius = 310 - scrollP * 40; // Gently draws closer
            const camHeight = 70 + scrollP * 30 + mouse.y;

            camera.position.x = Math.cos(orbitAngle) * orbitRadius + mouse.x + 25;
            camera.position.z = Math.sin(orbitAngle) * orbitRadius;
            camera.position.y = camHeight;
            camera.lookAt(40, 25, 0);

            // Progressive 3D Structural Erection / Assembly based on scroll
            // Foundation -> Piers -> Deck -> Towers & Stay-Cables
            foundationMesh.visible = true; // Always surveyed
            pierMesh.visible = scrollP > 0.08;
            deckMesh.visible = scrollP > 0.22;
            nodesMesh.visible = scrollP > 0.25;
            towerMesh.visible = scrollP > 0.45;
            cableMesh.visible = scrollP > 0.60;
            trafficMesh.visible = scrollP > 0.78;

            // Progressive vertical scale of towers & cables as they get constructed
            if (scrollP > 0.45 && scrollP <= 0.80) {
                const towerProgress = (scrollP - 0.45) / 0.35;
                towerMesh.scale.y = Math.min(1, Math.max(0.1, towerProgress));
                cableMesh.scale.y = Math.min(1, Math.max(0.05, (scrollP - 0.6) / 0.2));
            } else if (scrollP > 0.80) {
                towerMesh.scale.y = 1;
                cableMesh.scale.y = 1;
            } else {
                towerMesh.scale.y = 0.1;
                cableMesh.scale.y = 0.05;
            }

            // Animate 3D Traffic Pulses
            if (trafficMesh.visible) {
                const posAttr = trafficGeom.attributes.position as THREE.BufferAttribute;
                for (let i = 0; i < trafficCount; i++) {
                    const tData = trafficOffsets[i];
                    tData.t += tData.speed;
                    if (tData.t > 1) tData.t = 0;
                    if (tData.t < 0) tData.t = 1;

                    const z = startZ + tData.t * totalSpan;
                    const y = 16.5 + Math.sin(tData.t * Math.PI) * 8;
                    const x = tData.lane;

                    posAttr.setXYZ(i, x, y, z);
                }
                posAttr.needsUpdate = true;
            }

            // Subtle continuous idle rotation of structure
            structureGroup.rotation.y = Math.sin(time * 0.0003) * 0.04;

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
    }, [scrollYProgress]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden
        />
    );
}
