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
    const idx = serviceId ? getServiceIndex(serviceId) : index % 5;

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

            {/* Graphic Technical Header */}
            <div className="relative z-10 flex items-center justify-between text-[9px] font-mono-tech text-slate-500 tracking-wider uppercase border-b border-slate-200/60 pb-1.5">
                <span className="font-semibold text-[#185FA5] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5]" />
                    {CAD_METADATA[idx].title}
                </span>
                <span className="text-slate-400">{CAD_METADATA[idx].code}</span>
            </div>

            {/* Main Architectural CAD Vector Drawing */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-1">
                {idx === 0 && <RoadwayPavementCAD />}
                {idx === 1 && <BridgeGirderElevationCAD />}
                {idx === 2 && <BuildingIsometricSkeletonCAD />}
                {idx === 3 && <WaterDrainageConduitCAD />}
                {idx === 4 && <UrbanInterchangeMasterplanCAD />}
            </div>

            {/* Graphic Technical Footer: Dimension & Scale Stamp */}
            <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono-tech text-slate-400 tracking-widest uppercase border-t border-slate-200/60 pt-1.5">
                <span>SCALE: {CAD_METADATA[idx].scale}</span>
                <span className="text-[#c88a22] font-semibold">{CAD_METADATA[idx].spec}</span>
            </div>
        </div>
    );
}

function getServiceIndex(id: string): number {
    switch (id) {
        case "road-highway":
            return 0;
        case "bridges-flyovers":
            return 1;
        case "government-buildings":
            return 2;
        case "water-infrastructure":
            return 3;
        case "urban-infrastructure":
            return 4;
        default:
            return 0;
    }
}

const CAD_METADATA = [
    {
        title: "CROSS SECTION: DUAL CARRIAGEWAY",
        code: "DWG: HWY-CS-01",
        scale: "1:75 @ A1",
        spec: "MORTH / IRC:37",
    },
    {
        title: "ELEVATION: PRESTRESSED GIRDER",
        code: "DWG: BRG-EL-04",
        scale: "1:150 @ A1",
        spec: "IRC:SP:84 / 70R",
    },
    {
        title: "ISOMETRIC: RC SKELETON FRAME",
        code: "DWG: BLD-AX-09",
        scale: "1:100 @ A1",
        spec: "IS:456 / NBC-2016",
    },
    {
        title: "PROFILE: STORMWATER BOX CONDUIT",
        code: "DWG: WTR-HY-02",
        scale: "1:50 @ A1",
        spec: "CPHEEO / TWAD",
    },
    {
        title: "MASTERPLAN: ARTERIAL ALIGNMENT",
        code: "DWG: URB-MP-07",
        scale: "1:500 @ A1",
        spec: "CMDA / IRC:67",
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
            {/* Ground Level Datum */}
            <line x1="15" y1="78" x2="265" y2="78" stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="3 3" />
            <text x="18" y="74" fill="#94a3b8" fontSize="6" fontFamily="var(--font-mono)">GL +0.00m</text>

            {/* Pavement Sub-base Layer (GSB) */}
            <polygon points="35,78 245,78 238,68 42,68" fill="rgba(24,95,165,0.04)" stroke="#185fa5" strokeWidth="0.8" />
            <text x="46" y="75" fill="#185fa5" fontSize="5.5" fontFamily="var(--font-mono)">GSB 200mm</text>

            {/* Wet Mix Macadam (WMM) Layer */}
            <polygon points="42,68 238,68 232,58 48,58" fill="rgba(13,27,46,0.04)" stroke="#0d1b2e" strokeWidth="0.8" />
            <text x="52" y="65" fill="#0d1b2e" fontSize="5.5" fontFamily="var(--font-mono)">WMM 250mm</text>

            {/* Asphalt Dense Bituminous Macadam (DBM) & Wearing Course (BC) */}
            <polygon points="48,58 135,53 145,53 232,58 228,50 145,45 135,45 52,50" fill="rgba(200,138,34,0.08)" stroke="#c88a22" strokeWidth="1" />

            {/* Raised Central Median Barrier */}
            <rect x="136" y="38" width="8" height="9" fill="#0d1b2e" stroke="#0d1b2e" strokeWidth="0.75" />
            <line x1="140" y1="28" x2="140" y2="38" stroke="#c88a22" strokeWidth="0.75" strokeDasharray="2 2" />
            <text x="130" y="26" fill="#c88a22" fontSize="5.5" fontFamily="var(--font-mono)">CL MEDIAN</text>

            {/* Roadway Camber Slope Dimension (2.5% Slope) */}
            <line x1="75" y1="42" x2="115" y2="40" stroke="#185fa5" strokeWidth="0.6" markerEnd="url(#arrow)" />
            <text x="80" y="38" fill="#185fa5" fontSize="5.5" fontFamily="var(--font-mono)">CAMBER 2.5%</text>

            {/* Stationing Chainage Tick */}
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
            {/* Pier Shafts & Hammerhead Caps */}
            {/* Left Pier */}
            <rect x="55" y="55" width="16" height="35" fill="none" stroke="#0d1b2e" strokeWidth="0.9" />
            <polygon points="45,55 81,55 75,48 51,48" fill="rgba(24,95,165,0.06)" stroke="#185fa5" strokeWidth="0.9" />
            {/* Right Pier */}
            <rect x="205" y="55" width="16" height="35" fill="none" stroke="#0d1b2e" strokeWidth="0.9" />
            <polygon points="195,55 231,55 225,48 201,48" fill="rgba(24,95,165,0.06)" stroke="#185fa5" strokeWidth="0.9" />

            {/* Elastomeric Neoprene Bearing Pads */}
            <rect x="56" y="45.5" width="6" height="2.5" fill="#c88a22" stroke="#c88a22" strokeWidth="0.5" />
            <rect x="69" y="45.5" width="6" height="2.5" fill="#c88a22" stroke="#c88a22" strokeWidth="0.5" />
            <rect x="206" y="45.5" width="6" height="2.5" fill="#c88a22" stroke="#c88a22" strokeWidth="0.5" />
            <rect x="219" y="45.5" width="6" height="2.5" fill="#c88a22" stroke="#c88a22" strokeWidth="0.5" />

            {/* Continuous Deck Box Girder with Parabolic Camber Curve */}
            <path
                d="M 20 44 Q 138 38 260 44 L 260 38 Q 138 32 20 38 Z"
                fill="rgba(13,27,46,0.05)"
                stroke="#0d1b2e"
                strokeWidth="1.1"
            />
            {/* Girder Internal Diaphragm Ribs */}
            {[63, 100, 138, 175, 213].map((rx) => (
                <line key={rx} x1={rx} y1="35" x2={rx} y2="42" stroke="#185fa5" strokeWidth="0.75" />
            ))}

            {/* Stay Cable Tension Vectors from Apex (simulated fan) */}
            <line x1="138" y1="12" x2="70" y2="38" stroke="#185fa5" strokeWidth="0.7" strokeDasharray="3 2" />
            <line x1="138" y1="12" x2="105" y2="37" stroke="#185fa5" strokeWidth="0.7" strokeDasharray="3 2" />
            <line x1="138" y1="12" x2="171" y2="37" stroke="#185fa5" strokeWidth="0.7" strokeDasharray="3 2" />
            <line x1="138" y1="12" x2="206" y2="38" stroke="#185fa5" strokeWidth="0.7" strokeDasharray="3 2" />
            <circle cx="138" cy="12" r="2.5" fill="#c88a22" />

            {/* Span Dimension Callout */}
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
            {/* Ground Foundation Footings */}
            <polygon points="140,88 205,74 140,60 75,74" fill="rgba(13,27,46,0.03)" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="2 2" />

            {/* Level 1 Slab Grid */}
            <polygon points="140,68 200,56 140,44 80,56" fill="rgba(24,95,165,0.05)" stroke="#185fa5" strokeWidth="0.9" />

            {/* Level 2 Slab Grid */}
            <polygon points="140,46 195,35 140,24 85,35" fill="rgba(24,95,165,0.08)" stroke="#185fa5" strokeWidth="0.9" />

            {/* Roof Parapet Slab */}
            <polygon points="140,26 190,16 140,6 90,16" fill="rgba(200,138,34,0.08)" stroke="#c88a22" strokeWidth="1" />

            {/* 4 Main Structural Reinforced Concrete Columns */}
            {/* Front Corner */}
            <line x1="140" y1="88" x2="140" y2="26" stroke="#0d1b2e" strokeWidth="1.2" />
            {/* Right Corner */}
            <line x1="190" y1="74" x2="190" y2="16" stroke="#0d1b2e" strokeWidth="1.1" />
            {/* Left Corner */}
            <line x1="90" y1="74" x2="90" y2="16" stroke="#0d1b2e" strokeWidth="1.1" />
            {/* Back Corner */}
            <line x1="140" y1="60" x2="140" y2="6" stroke="#94a3b8" strokeWidth="0.7" strokeDasharray="2 2" />

            {/* Elevation Marker Ticks */}
            <text x="210" y="19" fill="#c88a22" fontSize="5.5" fontFamily="var(--font-mono)">LVL +24.0m</text>
            <text x="210" y="38" fill="#185fa5" fontSize="5.5" fontFamily="var(--font-mono)">LVL +12.0m</text>
            <text x="210" y="58" fill="#0d1b2e" fontSize="5.5" fontFamily="var(--font-mono)">LVL +0.0m</text>

            {/* Structural Axis Identification */}
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
            {/* Ground Surface Overburden */}
            <line x1="15" y1="24" x2="265" y2="24" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
            <text x="18" y="20" fill="#94a3b8" fontSize="6" fontFamily="var(--font-mono)">SURFACE RL +8.50m</text>

            {/* Reinforced Concrete Twin Box Culvert Profile */}
            {/* Outer Wall Profile */}
            <rect x="75" y="34" width="130" height="48" rx="2" fill="rgba(13,27,46,0.04)" stroke="#0d1b2e" strokeWidth="1.2" />

            {/* Left Barrel Void */}
            <rect x="85" y="42" width="50" height="32" rx="1.5" fill="rgba(24,95,165,0.07)" stroke="#185fa5" strokeWidth="0.9" />

            {/* Right Barrel Void */}
            <rect x="145" y="42" width="50" height="32" rx="1.5" fill="rgba(24,95,165,0.07)" stroke="#185fa5" strokeWidth="0.9" />

            {/* Central RC Separation Wall (Thickness 300mm) */}
            <line x1="140" y1="34" x2="140" y2="82" stroke="#0d1b2e" strokeWidth="1.2" />

            {/* Hydraulic Flow Water Line & Gradient Arrow */}
            <line x1="88" y1="62" x2="132" y2="62" stroke="#185fa5" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="148" y1="62" x2="192" y2="62" stroke="#185fa5" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="110" cy="54" r="2" fill="#c88a22" />
            <text x="100" y="52" fill="#c88a22" fontSize="5.5" fontFamily="var(--font-mono)">FLOW Q=16.5m³/s</text>

            {/* Invert Level Indicator */}
            <line x1="145" y1="82" x2="235" y2="82" stroke="#94a3b8" strokeWidth="0.6" />
            <line x1="235" y1="78" x2="235" y2="86" stroke="#94a3b8" strokeWidth="0.6" />
            <text x="215" y="74" fill="#0d1b2e" fontSize="6" fontFamily="var(--font-mono)" fontWeight="bold">INV -4.20m</text>

            {/* Structural Rebar Cage Stitching Marks */}
            {[78, 81, 84].map((y) => (
                <line key={y} x1="77" y1={y} x2="203" y2={y} stroke="#185fa5" strokeWidth="0.4" />
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
            {/* Master Coordinate Datum Crosshairs */}
            <line x1="140" y1="10" x2="140" y2="90" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="25" y1="50" x2="255" y2="50" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="3 3" />

            {/* Central Roundabout / Grade Separation Node */}
            <circle cx="140" cy="50" r="26" fill="rgba(13,27,46,0.03)" stroke="#0d1b2e" strokeWidth="1" />
            <circle cx="140" cy="50" r="14" fill="rgba(24,95,165,0.08)" stroke="#185fa5" strokeWidth="0.9" />
            <circle cx="140" cy="50" r="3.5" fill="#c88a22" />

            {/* Tangent Flyover Ramp Curves */}
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

            {/* Curve Radius Callout */}
            <line x1="140" y1="50" x2="162" y2="34" stroke="#c88a22" strokeWidth="0.75" />
            <text x="165" y="33" fill="#c88a22" fontSize="5.5" fontFamily="var(--font-mono)" fontWeight="bold">R = 65.0m</text>

            {/* Arterial Corridor ROW Boundary Lines */}
            <line x1="35" y1="20" x2="245" y2="20" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="35" y1="80" x2="245" y2="80" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="2 3" />
            <text x="38" y="17" fill="#94a3b8" fontSize="5.5" fontFamily="var(--font-mono)">ROW 45m CORRIDOR</text>
        </motion.svg>
    );
}
