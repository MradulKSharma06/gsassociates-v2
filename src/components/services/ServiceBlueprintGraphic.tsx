"use client";

import { motion } from "framer-motion";

interface BlueprintGraphicProps {
    category: string;
    className?: string;
}

export function ServiceBlueprintGraphic({ category, className = "" }: BlueprintGraphicProps) {
    const isBridge = category.toLowerCase().includes("bridge") || category.toLowerCase().includes("structural");
    const isRoad = category.toLowerCase().includes("road") || category.toLowerCase().includes("highway");
    const isBuilding = category.toLowerCase().includes("building") || category.toLowerCase().includes("institution") || category.toLowerCase().includes("civil works");
    const isWater = category.toLowerCase().includes("water") || category.toLowerCase().includes("drainage");

    return (
        <div className={`relative w-full h-36 sm:h-44 my-4 rounded-xl overflow-hidden bg-white/70 border border-slate-200/90 shadow-[inset_0_1px_4px_rgba(13,27,46,0.04)] p-3 flex items-center justify-center select-none group/blueprint ${className}`}>
            {/* Subtle Millimeter CAD grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id={`cad-grid-${category}`} width="12" height="12" patternUnits="userSpaceOnUse">
                        <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#0d1b2e" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#cad-grid-${category})`} />
            </svg>

            {/* Top-right Engineering Coordinate HUD */}
            <div className="absolute top-2 right-2.5 font-mono text-[9px] text-slate-400/80 tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5]/40" />
                <span>SCALE 1:100 · METRIC</span>
            </div>

            {/* Category 1: Bridge / Flyover Structural Cross-Section */}
            {isBridge && (
                <svg viewBox="0 0 320 140" className="w-full h-full max-h-36 stroke-[#0d1b2e] fill-none">
                    {/* Datum Ground Line */}
                    <line x1="10" y1="125" x2="310" y2="125" strokeWidth="1" strokeDasharray="4 2" stroke="#94a3b8" />
                    <text x="14" y="135" className="fill-slate-400 text-[8px] font-mono">GL ▼ +0.000m</text>

                    {/* Foundation Piles */}
                    <rect x="140" y="105" width="40" height="20" strokeWidth="1.2" stroke="#185FA5" fill="#185FA5" fillOpacity="0.06" />
                    <line x1="147" y1="125" x2="147" y2="138" strokeWidth="1.5" stroke="#185FA5" />
                    <line x1="160" y1="125" x2="160" y2="138" strokeWidth="1.5" stroke="#185FA5" />
                    <line x1="173" y1="125" x2="173" y2="138" strokeWidth="1.5" stroke="#185FA5" />

                    {/* Main Pier Column */}
                    <path d="M 148 105 L 152 55 L 168 55 L 172 105 Z" strokeWidth="1.4" stroke="#0d1b2e" fill="#FAF9F6" />
                    
                    {/* Pier Cap */}
                    <polygon points="120,55 200,55 190,45 130,45" strokeWidth="1.4" stroke="#0d1b2e" fill="#e2e8f0" />
                    
                    {/* Elastomeric Bearings */}
                    <rect x="134" y="42" width="12" height="3" strokeWidth="1" stroke="#c88a22" fill="#c88a22" />
                    <rect x="174" y="42" width="12" height="3" strokeWidth="1" stroke="#c88a22" fill="#c88a22" />

                    {/* Superstructure Deck & Box Girder */}
                    <path d="M 20 42 L 300 42 L 290 32 L 30 32 Z" strokeWidth="1.5" stroke="#0d1b2e" fill="#185FA5" fillOpacity="0.08" />
                    {/* Crash Barriers */}
                    <rect x="22" y="24" width="8" height="8" strokeWidth="1.2" stroke="#185FA5" />
                    <rect x="290" y="24" width="8" height="8" strokeWidth="1.2" stroke="#185FA5" />

                    {/* Pylon Tower (Central Cable Stayed Mast) */}
                    <line x1="160" y1="32" x2="160" y2="8" strokeWidth="2" stroke="#0d1b2e" />
                    {/* Tension Stay Cables */}
                    <line x1="160" y1="12" x2="70" y2="32" strokeWidth="0.8" stroke="#185FA5" strokeDasharray="3 1" />
                    <line x1="160" y1="12" x2="110" y2="32" strokeWidth="0.8" stroke="#185FA5" strokeDasharray="3 1" />
                    <line x1="160" y1="12" x2="210" y2="32" strokeWidth="0.8" stroke="#185FA5" strokeDasharray="3 1" />
                    <line x1="160" y1="12" x2="250" y2="32" strokeWidth="0.8" stroke="#185FA5" strokeDasharray="3 1" />

                    {/* Technical Dimension Callout */}
                    <line x1="20" y1="18" x2="300" y2="18" strokeWidth="0.7" stroke="#64748b" />
                    <path d="M 20 15 L 20 21 M 300 15 L 300 21" strokeWidth="0.8" stroke="#64748b" />
                    <text x="160" y="16" textAnchor="middle" className="fill-[#185FA5] text-[8px] font-mono font-bold">SPAN L = 42.50m (IRC 70R)</text>
                </svg>
            )}

            {/* Category 2: Highway & Arterial Road Pavement Cross-Section */}
            {isRoad && (
                <svg viewBox="0 0 320 140" className="w-full h-full max-h-36 stroke-[#0d1b2e] fill-none">
                    {/* Centerline Crown Marker */}
                    <line x1="160" y1="10" x2="160" y2="125" strokeWidth="0.8" stroke="#c88a22" strokeDasharray="3 2" />
                    <text x="164" y="20" className="fill-[#c88a22] text-[8px] font-mono font-bold">CL ▲ +24.850m</text>

                    {/* Camber Slope Cross-fall 2.5% */}
                    {/* Asphalt Wearing Course (BC 40mm) */}
                    <path d="M 20 50 L 160 44 L 300 50 L 300 56 L 160 50 L 20 56 Z" strokeWidth="1.3" stroke="#0d1b2e" fill="#0d1b2e" fillOpacity="0.08" />
                    {/* Dense Bituminous Macadam (DBM 100mm) */}
                    <path d="M 20 56 L 160 50 L 300 56 L 300 68 L 160 62 L 20 68 Z" strokeWidth="1" stroke="#185FA5" fill="#185FA5" fillOpacity="0.06" />
                    {/* Granular Sub-base (GSB 200mm) */}
                    <path d="M 20 68 L 160 62 L 300 68 L 300 90 L 160 84 L 20 90 Z" strokeWidth="1" stroke="#94a3b8" strokeDasharray="4 2" />
                    
                    {/* Kerb & Drain Channel */}
                    <polygon points="12,50 20,50 20,70 12,70" strokeWidth="1.2" stroke="#0d1b2e" fill="#e2e8f0" />
                    <polygon points="300,50 308,50 308,70 300,70" strokeWidth="1.2" stroke="#0d1b2e" fill="#e2e8f0" />

                    {/* Subgrade Soil Hatching */}
                    <line x1="30" y1="98" x2="50" y2="118" strokeWidth="0.8" stroke="#cbd5e1" />
                    <line x1="70" y1="98" x2="90" y2="118" strokeWidth="0.8" stroke="#cbd5e1" />
                    <line x1="110" y1="98" x2="130" y2="118" strokeWidth="0.8" stroke="#cbd5e1" />
                    <line x1="190" y1="98" x2="210" y2="118" strokeWidth="0.8" stroke="#cbd5e1" />
                    <line x1="230" y1="98" x2="250" y2="118" strokeWidth="0.8" stroke="#cbd5e1" />
                    <line x1="270" y1="98" x2="290" y2="118" strokeWidth="0.8" stroke="#cbd5e1" />

                    {/* Slope Arrows 2.5% */}
                    <text x="80" y="38" className="fill-slate-500 text-[8px] font-mono">2.5% CAMBER →</text>
                    <text x="210" y="38" className="fill-slate-500 text-[8px] font-mono">← 2.5% CAMBER</text>

                    {/* Overall Width Dimension */}
                    <line x1="20" y1="128" x2="300" y2="128" strokeWidth="0.8" stroke="#185FA5" />
                    <path d="M 20 125 L 20 131 M 300 125 L 300 131" strokeWidth="0.8" stroke="#185FA5" />
                    <text x="160" y="136" textAnchor="middle" className="fill-[#185FA5] text-[8px] font-mono font-bold">CARRIAGEWAY WIDTH 4-LANE DUAL = 17.50m</text>
                </svg>
            )}

            {/* Category 3: Institutional Government Building CAD Elevation */}
            {isBuilding && (
                <svg viewBox="0 0 320 140" className="w-full h-full max-h-36 stroke-[#0d1b2e] fill-none">
                    {/* Ground Level */}
                    <line x1="10" y1="124" x2="310" y2="124" strokeWidth="1.2" stroke="#0d1b2e" />
                    <text x="12" y="134" className="fill-slate-400 text-[8px] font-mono">▼ +0.000 FFL</text>

                    {/* Structural Grid Bubbles */}
                    <circle cx="50" cy="14" r="8" strokeWidth="1" stroke="#185FA5" fill="#FAF9F6" />
                    <text x="50" y="17" textAnchor="middle" className="fill-[#185FA5] text-[8px] font-mono font-bold">A</text>
                    
                    <circle cx="120" cy="14" r="8" strokeWidth="1" stroke="#185FA5" fill="#FAF9F6" />
                    <text x="120" y="17" textAnchor="middle" className="fill-[#185FA5] text-[8px] font-mono font-bold">B</text>

                    <circle cx="200" cy="14" r="8" strokeWidth="1" stroke="#185FA5" fill="#FAF9F6" />
                    <text x="200" y="17" textAnchor="middle" className="fill-[#185FA5] text-[8px] font-mono font-bold">C</text>

                    <circle cx="270" cy="14" r="8" strokeWidth="1" stroke="#185FA5" fill="#FAF9F6" />
                    <text x="270" y="17" textAnchor="middle" className="fill-[#185FA5] text-[8px] font-mono font-bold">D</text>

                    {/* Grid Lines Dashed */}
                    <line x1="50" y1="22" x2="50" y2="124" strokeWidth="0.6" stroke="#94a3b8" strokeDasharray="3 2" />
                    <line x1="120" y1="22" x2="120" y2="124" strokeWidth="0.6" stroke="#94a3b8" strokeDasharray="3 2" />
                    <line x1="200" y1="22" x2="200" y2="124" strokeWidth="0.6" stroke="#94a3b8" strokeDasharray="3 2" />
                    <line x1="270" y1="22" x2="270" y2="124" strokeWidth="0.6" stroke="#94a3b8" strokeDasharray="3 2" />

                    {/* Floor Slabs */}
                    {/* Level 3 */}
                    <rect x="40" y="38" width="240" height="5" strokeWidth="1.2" stroke="#0d1b2e" fill="#185FA5" fillOpacity="0.08" />
                    <text x="284" y="42" className="fill-[#185FA5] text-[7px] font-mono">▲ +12.00m</text>
                    {/* Level 2 */}
                    <rect x="40" y="66" width="240" height="5" strokeWidth="1.2" stroke="#0d1b2e" fill="#185FA5" fillOpacity="0.08" />
                    <text x="284" y="70" className="fill-[#185FA5] text-[7px] font-mono">▲ +8.00m</text>
                    {/* Level 1 */}
                    <rect x="40" y="94" width="240" height="5" strokeWidth="1.2" stroke="#0d1b2e" fill="#185FA5" fillOpacity="0.08" />
                    <text x="284" y="98" className="fill-[#185FA5] text-[7px] font-mono">▲ +4.00m</text>

                    {/* Structural Columns */}
                    <rect x="48" y="38" width="5" height="86" strokeWidth="1" stroke="#0d1b2e" fill="#0d1b2e" fillOpacity="0.2" />
                    <rect x="118" y="38" width="5" height="86" strokeWidth="1" stroke="#0d1b2e" fill="#0d1b2e" fillOpacity="0.2" />
                    <rect x="198" y="38" width="5" height="86" strokeWidth="1" stroke="#0d1b2e" fill="#0d1b2e" fillOpacity="0.2" />
                    <rect x="268" y="38" width="5" height="86" strokeWidth="1" stroke="#0d1b2e" fill="#0d1b2e" fillOpacity="0.2" />

                    {/* Glazing Curtain Wall Sub-divisions */}
                    <line x1="84" y1="43" x2="84" y2="66" strokeWidth="0.6" stroke="#185FA5" />
                    <line x1="158" y1="43" x2="158" y2="66" strokeWidth="0.6" stroke="#185FA5" />
                    <line x1="234" y1="43" x2="234" y2="66" strokeWidth="0.6" stroke="#185FA5" />
                </svg>
            )}

            {/* Category 4: Water Supply / Drainage / Urban Infrastructure Hydraulic Section */}
            {(isWater || (!isBridge && !isRoad && !isBuilding)) && (
                <svg viewBox="0 0 320 140" className="w-full h-full max-h-36 stroke-[#0d1b2e] fill-none">
                    {/* Excavation Trench Cut */}
                    <path d="M 20 30 L 60 110 L 260 110 L 300 30" strokeWidth="1.2" stroke="#94a3b8" strokeDasharray="4 2" />
                    <text x="24" y="24" className="fill-slate-400 text-[8px] font-mono">TRENCH EXCAVATION LINE</text>

                    {/* Reinforced Concrete Box Culvert / Pipe */}
                    <rect x="100" y="45" width="120" height="60" rx="6" strokeWidth="1.8" stroke="#0d1b2e" fill="#FAF9F6" />
                    <rect x="110" y="55" width="100" height="40" rx="4" strokeWidth="1.2" stroke="#185FA5" fill="#185FA5" fillOpacity="0.08" />

                    {/* Water Level & Flow Arrows */}
                    <line x1="110" y1="78" x2="210" y2="78" strokeWidth="1" stroke="#185FA5" strokeDasharray="6 2" />
                    <path d="M 140 70 L 155 70 M 150 66 L 155 70 L 150 74" strokeWidth="1.2" stroke="#185FA5" />
                    <path d="M 170 70 L 185 70 M 180 66 L 185 70 L 180 74" strokeWidth="1.2" stroke="#185FA5" />
                    <text x="160" y="62" textAnchor="middle" className="fill-[#185FA5] text-[7px] font-mono font-bold">GRAVITY FLOW Q = 14.5 m³/s</text>

                    {/* Invert Level & Crown Level */}
                    <text x="96" y="112" textAnchor="end" className="fill-[#c88a22] text-[8px] font-mono font-bold">IL: +8.250m</text>
                    <text x="96" y="48" textAnchor="end" className="fill-slate-500 text-[8px] font-mono">SOFFIT: +10.250m</text>

                    {/* Bedding Material Hatching */}
                    <line x1="60" y1="110" x2="260" y2="110" strokeWidth="1.5" stroke="#c88a22" />
                    <text x="160" y="126" textAnchor="middle" className="fill-[#c88a22] text-[8px] font-mono">150mm M15 LEAN CONCRETE BEDDING</text>
                </svg>
            )}
        </div>
    );
}
