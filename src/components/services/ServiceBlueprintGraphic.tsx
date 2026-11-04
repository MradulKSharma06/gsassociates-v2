"use client";

import { motion } from "framer-motion";

interface ServiceBlueprintGraphicProps {
    serviceId: string;
    index?: number;
    className?: string;
}

export function ServiceBlueprintGraphic({
    serviceId,
    index = 0,
    className = "",
}: ServiceBlueprintGraphicProps) {
    const idx = serviceId ? getServiceIndex(serviceId) : index % 6;
    const meta = CAD_METADATA[idx] || CAD_METADATA[0];

    return (
        <div
            className={`relative w-full h-44 sm:h-48 my-3 rounded-xl overflow-hidden bg-white/70 border border-slate-200/90 shadow-[inset_0_1px_3px_rgba(13,27,46,0.03)] flex flex-col justify-between p-3 select-none group/cad ${className}`}
        >
            {/* Subtle Blueprint Grid Pattern */}
            <svg
                className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
            >
                <defs>
                    <pattern id={`cad-grid-${idx}`} width="16" height="16" patternUnits="userSpaceOnUse">
                        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#185fa5" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#cad-grid-${idx})`} />
            </svg>

            {/* Graphic Technical Header: Specific to This Service Card Headline */}
            <div className="relative z-10 flex items-center justify-between text-[9px] font-mono-tech text-slate-500 tracking-wider uppercase border-b border-slate-200/60 pb-1.5">
                <span className="font-semibold text-[#185FA5] flex items-center gap-1.5 truncate max-w-[70%]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5] shrink-0" />
                    <span className="truncate">{meta.title}</span>
                </span>
                <span className="text-slate-400 shrink-0">{meta.code}</span>
            </div>

            {/* Main Architectural CAD Vector Drawing (1 of 6 Tailored Graphics) */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-1">
                {idx === 0 && <RoadwayPavementCAD />}
                {idx === 1 && <BridgeGirderElevationCAD />}
                {idx === 2 && <BuildingIsometricSkeletonCAD />}
                {idx === 3 && <WaterDrainageConduitCAD />}
                {idx === 4 && <UrbanInterchangeMasterplanCAD />}
                {idx === 5 && <ProjectManagementCpmCAD />}
            </div>

            {/* Graphic Technical Footer: Dimension & Scale Stamp */}
            <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono-tech text-slate-400 tracking-widest uppercase border-t border-slate-200/60 pt-1.5">
                <span>SCALE: {meta.scale}</span>
                <span className="text-[#c88a22] font-semibold">{meta.spec}</span>
            </div>
        </div>
    );
}

function getServiceIndex(id: string): number {
    switch (id) {
        case "svc-001":
        case "road-highway":
            return 0;
        case "svc-002":
        case "bridges-flyovers":
            return 1;
        case "svc-003":
        case "government-buildings":
            return 2;
        case "svc-004":
        case "water-infrastructure":
            return 3;
        case "svc-005":
        case "urban-infrastructure":
            return 4;
        case "svc-006":
        case "project-management":
        case "project-management-consultancy":
            return 5;
        default:
            return 0;
    }
}

const CAD_METADATA = [
    {
        title: "PAVEMENT PROFILE: DUAL CARRIAGEWAY",
        code: "DWG: HWY-CS-01",
        scale: "1:75 @ A1",
        spec: "MORTH / IRC:37",
    },
    {
        title: "ELEVATION: PRECAST GIRDER VIADUCT",
        code: "DWG: BRG-EL-02",
        scale: "1:150 @ A1",
        spec: "IRC:SP:84 / 70R",
    },
    {
        title: "ISOMETRIC: RC INSTITUTIONAL SKELETON",
        code: "DWG: BLD-AX-03",
        scale: "1:100 @ A1",
        spec: "IS:456 / NBC-2016",
    },
    {
        title: "HYDRAULIC: TWIN BOX STORM CONDUIT",
        code: "DWG: WTR-HY-04",
        scale: "1:50 @ A1",
        spec: "CPHEEO / TWAD",
    },
    {
        title: "MASTERPLAN: ARTERIAL CIVIC INTERCHANGE",
        code: "DWG: URB-MP-05",
        scale: "1:500 @ A1",
        spec: "CMDA / IRC:67",
    },
    {
        title: "CPM CRITICAL PATH & QA/QC MATRIX",
        code: "DWG: PMC-CPM-06",
        scale: "WEEKS 01–36",
        spec: "FIDIC / LEVEL 4",
    },
];

/**
 * 0. Roadway & Highway Pavement Section (Cross-section, sub-base strata, median, slope callout)
 */
function RoadwayPavementCAD() {
    return (
        <motion.svg
            viewBox="0 0 280 100"
            className="w-full h-full max-h-24 text-[#0d1b2e]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <line x1="15" y1="78" x2="265" y2="78" stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="3 3" />
            <text x="18" y="74" fill="#94a3b8" fontSize="6" fontFamily="var(--font-mono)">GL +0.00m</text>

            <polygon points="35,78 245,78 238,68 42,68" fill="rgba(24,95,165,0.04)" stroke="#185fa5" strokeWidth="0.8" />
            <text x="46" y="75" fill="#185fa5" fontSize="5.5" fontFamily="var(--font-mono)">GSB 200mm</text>

            <polygon points="42,68 238,68 232,58 48,58" fill="rgba(13,27,46,0.04)" stroke="#0d1b2e" strokeWidth="0.8" />
            <text x="52" y="65" fill="#0d1b2e" fontSize="5.5" fontFamily="var(--font-mono)">WMM 250mm</text>

            <polygon points="48,58 135,53 145,53 232,58 228,50 145,45 135,45 52,50" fill="rgba(200,138,34,0.08)" stroke="#c88a22" strokeWidth="1" />

            <rect x="136" y="38" width="8" height="9" fill="#0d1b2e" stroke="#0d1b2e" strokeWidth="0.75" />
            <line x1="140" y1="28" x2="140" y2="38" stroke="#c88a22" strokeWidth="0.75" strokeDasharray="2 2" />
            <text x="130" y="26" fill="#c88a22" fontSize="5.5" fontFamily="var(--font-mono)">CL MEDIAN</text>

            <line x1="75" y1="42" x2="115" y2="40" stroke="#185fa5" strokeWidth="0.6" />
            <text x="80" y="38" fill="#185fa5" fontSize="5.5" fontFamily="var(--font-mono)">CAMBER 2.5%</text>

            <line x1="228" y1="40" x2="228" y2="78" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="2 2" />
            <text x="210" y="36" fill="#94a3b8" fontSize="5.5" fontFamily="var(--font-mono)">CH 14+250</text>
        </motion.svg>
    );
}

/**
 * 1. Bridge & Flyover Girder Elevation (Prestressed Concrete Girder, Bearings, Pier Cap, Stay Fan)
 */
function BridgeGirderElevationCAD() {
    return (
        <motion.svg
            viewBox="0 0 280 100"
            className="w-full h-full max-h-24 text-[#0d1b2e]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <rect x="55" y="55" width="16" height="35" fill="none" stroke="#0d1b2e" strokeWidth="0.9" />
            <polygon points="45,55 81,55 75,48 51,48" fill="rgba(24,95,165,0.06)" stroke="#185fa5" strokeWidth="0.9" />
            <rect x="205" y="55" width="16" height="35" fill="none" stroke="#0d1b2e" strokeWidth="0.9" />
            <polygon points="195,55 231,55 225,48 201,48" fill="rgba(24,95,165,0.06)" stroke="#185fa5" strokeWidth="0.9" />

            <rect x="56" y="45.5" width="6" height="2.5" fill="#c88a22" stroke="#c88a22" strokeWidth="0.5" />
            <rect x="69" y="45.5" width="6" height="2.5" fill="#c88a22" stroke="#c88a22" strokeWidth="0.5" />
            <rect x="206" y="45.5" width="6" height="2.5" fill="#c88a22" stroke="#c88a22" strokeWidth="0.5" />
            <rect x="219" y="45.5" width="6" height="2.5" fill="#c88a22" stroke="#c88a22" strokeWidth="0.5" />

            <path
                d="M 20 44 Q 138 38 260 44 L 260 38 Q 138 32 20 38 Z"
                fill="rgba(13,27,46,0.05)"
                stroke="#0d1b2e"
                strokeWidth="1.1"
            />
            {[63, 100, 138, 175, 213].map((rx) => (
                <line key={rx} x1={rx} y1="35" x2={rx} y2="42" stroke="#185fa5" strokeWidth="0.75" />
            ))}

            <line x1="138" y1="12" x2="70" y2="38" stroke="#185fa5" strokeWidth="0.7" strokeDasharray="3 2" />
            <line x1="138" y1="12" x2="105" y2="37" stroke="#185fa5" strokeWidth="0.7" strokeDasharray="3 2" />
            <line x1="138" y1="12" x2="171" y2="37" stroke="#185fa5" strokeWidth="0.7" strokeDasharray="3 2" />
            <line x1="138" y1="12" x2="206" y2="38" stroke="#185fa5" strokeWidth="0.7" strokeDasharray="3 2" />
            <circle cx="138" cy="12" r="2.5" fill="#c88a22" />

            <line x1="63" y1="88" x2="213" y2="88" stroke="#94a3b8" strokeWidth="0.75" />
            <line x1="63" y1="84" x2="63" y2="92" stroke="#94a3b8" strokeWidth="0.75" />
            <line x1="213" y1="84" x2="213" y2="92" stroke="#94a3b8" strokeWidth="0.75" />
            <text x="116" y="85" fill="#0d1b2e" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="bold">SPAN 45.0m</text>
        </motion.svg>
    );
}

/**
 * 2. Government Buildings & Institutions (3D Isometric Column-Beam Grid & Elevations)
 */
function BuildingIsometricSkeletonCAD() {
    return (
        <motion.svg
            viewBox="0 0 280 100"
            className="w-full h-full max-h-24 text-[#0d1b2e]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <polygon points="140,88 205,74 140,60 75,74" fill="rgba(13,27,46,0.03)" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="2 2" />
            <polygon points="140,68 200,56 140,44 80,56" fill="rgba(24,95,165,0.05)" stroke="#185fa5" strokeWidth="0.9" />
            <polygon points="140,46 195,35 140,24 85,35" fill="rgba(24,95,165,0.08)" stroke="#185fa5" strokeWidth="0.9" />
            <polygon points="140,26 190,16 140,6 90,16" fill="rgba(200,138,34,0.08)" stroke="#c88a22" strokeWidth="1" />

            <line x1="140" y1="88" x2="140" y2="26" stroke="#0d1b2e" strokeWidth="1.2" />
            <line x1="190" y1="74" x2="190" y2="16" stroke="#0d1b2e" strokeWidth="1.1" />
            <line x1="90" y1="74" x2="90" y2="16" stroke="#0d1b2e" strokeWidth="1.1" />
            <line x1="140" y1="60" x2="140" y2="6" stroke="#94a3b8" strokeWidth="0.7" strokeDasharray="2 2" />

            <text x="210" y="19" fill="#c88a22" fontSize="5.5" fontFamily="var(--font-mono)">LVL +24.0m</text>
            <text x="210" y="38" fill="#185fa5" fontSize="5.5" fontFamily="var(--font-mono)">LVL +12.0m</text>
            <text x="210" y="58" fill="#0d1b2e" fontSize="5.5" fontFamily="var(--font-mono)">LVL +0.0m</text>

            <circle cx="90" cy="85" r="3" fill="none" stroke="#185fa5" strokeWidth="0.6" />
            <text x="88" y="87" fill="#185fa5" fontSize="4.5" fontFamily="var(--font-mono)">A</text>
            <circle cx="140" cy="94" r="3" fill="none" stroke="#185fa5" strokeWidth="0.6" />
            <text x="138" y="96" fill="#185fa5" fontSize="4.5" fontFamily="var(--font-mono)">B</text>
            <circle cx="190" cy="85" r="3" fill="none" stroke="#185fa5" strokeWidth="0.6" />
            <text x="188" y="87" fill="#185fa5" fontSize="4.5" fontFamily="var(--font-mono)">C</text>
        </motion.svg>
    );
}

/**
 * 3. Water & Drainage Infrastructure (Subterranean Box Culvert & Invert Levels)
 */
function WaterDrainageConduitCAD() {
    return (
        <motion.svg
            viewBox="0 0 280 100"
            className="w-full h-full max-h-24 text-[#0d1b2e]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <line x1="15" y1="24" x2="265" y2="24" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
            <text x="18" y="20" fill="#94a3b8" fontSize="6" fontFamily="var(--font-mono)">SURFACE RL +8.50m</text>

            <rect x="75" y="34" width="130" height="48" rx="2" fill="rgba(13,27,46,0.04)" stroke="#0d1b2e" strokeWidth="1.2" />
            <rect x="85" y="42" width="50" height="32" rx="1.5" fill="rgba(24,95,165,0.07)" stroke="#185fa5" strokeWidth="0.9" />
            <rect x="145" y="42" width="50" height="32" rx="1.5" fill="rgba(24,95,165,0.07)" stroke="#185fa5" strokeWidth="0.9" />
            <line x1="140" y1="34" x2="140" y2="82" stroke="#0d1b2e" strokeWidth="1.2" />

            <line x1="88" y1="62" x2="132" y2="62" stroke="#185fa5" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="148" y1="62" x2="192" y2="62" stroke="#185fa5" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="110" cy="54" r="2" fill="#c88a22" />
            <text x="100" y="52" fill="#c88a22" fontSize="5.5" fontFamily="var(--font-mono)">FLOW Q=16.5m³/s</text>

            <line x1="145" y1="82" x2="235" y2="82" stroke="#94a3b8" strokeWidth="0.6" />
            <line x1="235" y1="78" x2="235" y2="86" stroke="#94a3b8" strokeWidth="0.6" />
            <text x="215" y="74" fill="#0d1b2e" fontSize="6" fontFamily="var(--font-mono)" fontWeight="bold">INV -4.20m</text>

            {[78, 81, 84].map((y) => (
                <line key={y} x1={77} y1={y} x2={203} y2={y} stroke="#185fa5" strokeWidth="0.4" />
            ))}
        </motion.svg>
    );
}

/**
 * 4. Urban & Industrial Infrastructure (Arterial Interchange Masterplan CAD Alignment)
 */
function UrbanInterchangeMasterplanCAD() {
    return (
        <motion.svg
            viewBox="0 0 280 100"
            className="w-full h-full max-h-24 text-[#0d1b2e]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <line x1="140" y1="10" x2="140" y2="90" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="25" y1="50" x2="255" y2="50" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="3 3" />

            <circle cx="140" cy="50" r="26" fill="rgba(13,27,46,0.03)" stroke="#0d1b2e" strokeWidth="1" />
            <circle cx="140" cy="50" r="14" fill="rgba(24,95,165,0.08)" stroke="#185fa5" strokeWidth="0.9" />
            <circle cx="140" cy="50" r="3.5" fill="#c88a22" />

            <path
                d="M 35 32 Q 95 32 140 50 T 245 68"
                fill="none"
                stroke="#185fa5"
                strokeWidth="1.2"
            />
            <path
                d="M 35 68 Q 95 68 140 50 T 245 32"
                fill="none"
                stroke="#0d1b2e"
                strokeWidth="1.2"
                strokeDasharray="4 2"
            />

            <line x1="140" y1="50" x2="162" y2="34" stroke="#c88a22" strokeWidth="0.75" />
            <text x="165" y="33" fill="#c88a22" fontSize="5.5" fontFamily="var(--font-mono)" fontWeight="bold">R = 65.0m</text>

            <line x1="35" y1="20" x2="245" y2="20" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="35" y1="80" x2="245" y2="80" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="2 3" />
            <text x="38" y="17" fill="#94a3b8" fontSize="5.5" fontFamily="var(--font-mono)">ROW 45m CORRIDOR</text>
        </motion.svg>
    );
}

/**
 * 5. Project Management & Consultancy (CPM Critical Path Network & QA/QC Audit Diagram)
 */
function ProjectManagementCpmCAD() {
    return (
        <motion.svg
            viewBox="0 0 280 100"
            className="w-full h-full max-h-24 text-[#0d1b2e]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Horizontal Timeline Grid Axis */}
            <line x1="20" y1="78" x2="260" y2="78" stroke="#94a3b8" strokeWidth="0.8" />
            {["W00", "W08", "W16", "W24", "W32", "W36"].map((wk, i) => (
                <g key={wk}>
                    <line x1={30 + i * 44} y1="75" x2={30 + i * 44} y2="81" stroke="#94a3b8" strokeWidth="0.8" />
                    <text x={24 + i * 44} y="88" fill="#94a3b8" fontSize="5.5" fontFamily="var(--font-mono)">
                        {wk}
                    </text>
                </g>
            ))}

            {/* Critical Path CPM Nodes & Connecting Links */}
            {/* Primary Golden Path (Node 01 -> Node 02 -> Node 04 -> Node 06) */}
            <line x1="38" y1="50" x2="90" y2="34" stroke="#c88a22" strokeWidth="1.4" />
            <line x1="90" y1="34" x2="165" y2="34" stroke="#c88a22" strokeWidth="1.4" />
            <line x1="165" y1="34" x2="238" y2="50" stroke="#c88a22" strokeWidth="1.4" />

            {/* Secondary Parallel Task Lines (Node 01 -> Node 03 -> Node 05 -> Node 06) */}
            <line x1="38" y1="50" x2="105" y2="62" stroke="#185fa5" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="105" y1="62" x2="185" y2="62" stroke="#185fa5" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="185" y1="62" x2="238" y2="50" stroke="#185fa5" strokeWidth="1" strokeDasharray="3 2" />

            {/* CPM Milestone Nodes */}
            {/* Node 1: Start / DPR Approval */}
            <circle cx="38" cy="50" r="6" fill="#0d1b2e" stroke="#c88a22" strokeWidth="1.2" />
            <text x="36" y="52" fill="#ffffff" fontSize="5" fontFamily="var(--font-mono)" fontWeight="bold">01</text>
            <text x="25" y="40" fill="#0d1b2e" fontSize="5" fontFamily="var(--font-mono)">DPR</text>

            {/* Node 2: Substructure Foundation Clear */}
            <circle cx="90" cy="34" r="6" fill="#c88a22" stroke="#0d1b2e" strokeWidth="1" />
            <text x="88" y="36" fill="#0d1b2e" fontSize="5" fontFamily="var(--font-mono)" fontWeight="bold">02</text>
            <text x="76" y="24" fill="#c88a22" fontSize="5" fontFamily="var(--font-mono)" fontWeight="bold">CRITICAL</text>

            {/* Node 3: Utility Relocation */}
            <circle cx="105" cy="62" r="5" fill="#185fa5" stroke="#ffffff" strokeWidth="0.8" />
            <text x="103" y="64" fill="#ffffff" fontSize="4.5" fontFamily="var(--font-mono)">03</text>

            {/* Node 4: Superstructure Erection */}
            <circle cx="165" cy="34" r="6" fill="#c88a22" stroke="#0d1b2e" strokeWidth="1" />
            <text x="163" y="36" fill="#0d1b2e" fontSize="5" fontFamily="var(--font-mono)" fontWeight="bold">04</text>
            <text x="150" y="24" fill="#185fa5" fontSize="5" fontFamily="var(--font-mono)">SPI: 1.02</text>

            {/* Node 5: Finishes & Signage */}
            <circle cx="185" cy="62" r="5" fill="#185fa5" stroke="#ffffff" strokeWidth="0.8" />
            <text x="183" y="64" fill="#ffffff" fontSize="4.5" fontFamily="var(--font-mono)">05</text>

            {/* Node 6: Commissioning / Handover */}
            <circle cx="238" cy="50" r="7" fill="#0d1b2e" stroke="#c88a22" strokeWidth="1.5" />
            <text x="235" y="52.5" fill="#c88a22" fontSize="5.5" fontFamily="var(--font-mono)" fontWeight="bold">06</text>
            <text x="226" y="40" fill="#0d1b2e" fontSize="5" fontFamily="var(--font-mono)" fontWeight="bold">COD 100%</text>

            {/* QA/QC Audit Approval Stamp Badge */}
            <rect x="108" y="10" width="64" height="10" rx="3" fill="rgba(16,185,129,0.1)" stroke="#059669" strokeWidth="0.75" />
            <circle cx="114" cy="15" r="2.5" fill="#059669" />
            <text x="119" y="17" fill="#059669" fontSize="5" fontFamily="var(--font-mono)" fontWeight="bold">QA AUDIT: PASS</text>
        </motion.svg>
    );
}
