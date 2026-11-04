"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { Project, projectCategories } from "@/data/projects";
import { MapPin, Building2, ArrowRight, Clock, Search, CheckCircle2, X, ExternalLink, ShieldCheck, FileCheck } from "lucide-react";
import { ArchitecturalButton } from "@/components/ui/ArchitecturalButton";

interface Props {
    initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedStatus, setSelectedStatus] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [modalProject, setModalProject] = useState<Project | null>(null);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setModalProject(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const filtered = useMemo(() => {
        return initialProjects.filter((p) => {
            const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
            const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;
            const matchesSearch =
                searchQuery.trim() === "" ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesStatus && matchesSearch;
        });
    }, [initialProjects, selectedCategory, selectedStatus, searchQuery]);

    const allCategories = ["All", ...projectCategories];
    const statuses = ["All", "Completed", "Ongoing"];

    return (
        <section className="section-padding bg-transparent relative z-10">
            <div className="container-site">
                {/* Control Bar: Categories, Statuses, and Search */}
                <div className="mb-10 flex flex-col gap-5">
                    {/* Top Row: Search and Status Switcher */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                        {/* Search input */}
                        <div className="relative flex-1 max-w-md">
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Filter by ID (e.g. PROJ-001), title, department…"
                                className="w-full pl-10 pr-4 py-2.5 text-xs font-sans rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md focus:outline-none focus:border-[#0d1b2e] focus:ring-2 focus:ring-[#0d1b2e]/10 transition-all shadow-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Status Switcher (Capsule) */}
                        <div className="inline-flex items-center p-1 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm">
                            {statuses.map((status) => {
                                const isActive = selectedStatus === status;
                                return (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${
                                            isActive ? "text-white" : "text-slate-600 hover:text-[#0d1b2e]"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeStatusPillV2"
                                                className="absolute inset-0 bg-[#0d1b2e] rounded-full z-0"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{status}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {allCategories.map((cat) => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`relative px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-full transition-colors ${
                                        isActive ? "text-white" : "text-slate-600 hover:text-[#0d1b2e]"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeCategoryPillV2"
                                            className="absolute inset-0 bg-[#185FA5] rounded-full z-0 shadow-sm"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cat}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Animated Grid with Scroll Trigger & Stagger */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filtered.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-40px" }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: (idx % 3) * 0.08,
                                }}
                                className="h-full"
                            >
                                <Tilt3DCard maxTilt={5} className="h-full">
                                    <div
                                        onClick={() => setModalProject(project)}
                                        className="group cursor-pointer flex flex-col h-full rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl overflow-hidden shadow-matte-sm hover:shadow-matte-md hover:border-slate-300 hover:bg-white/95 transition-all duration-300"
                                    >
                                        {/* Card Top Banner with Watermark & CAD Line Pattern */}
                                        <div className="relative h-40 p-5 bg-white/60 backdrop-blur-md border-b border-slate-200/80 flex flex-col justify-between overflow-hidden">
                                            {/* Architectural Blueprint CAD Grid Pattern */}
                                            <svg
                                                className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden
                                            >
                                                <defs>
                                                    <pattern
                                                        id={`grid-${project.id}`}
                                                        width="24"
                                                        height="24"
                                                        patternUnits="userSpaceOnUse"
                                                    >
                                                        <path
                                                            d="M 24 0 L 0 0 0 24"
                                                            fill="none"
                                                            stroke="#0d1b2e"
                                                            strokeWidth="0.4"
                                                        />
                                                    </pattern>
                                                </defs>
                                                <rect
                                                    width="100%"
                                                    height="100%"
                                                    fill={`url(#grid-${project.id})`}
                                                />
                                            </svg>

                                            {/* Watermark Number */}
                                            <span
                                                style={{ fontFamily: "var(--font-condensed)" }}
                                                className="absolute bottom-1 right-3 text-6xl font-extrabold text-[#0d1b2e]/10 select-none pointer-events-none"
                                            >
                                                {project.id.replace("proj-", "")}
                                            </span>

                                            {/* Category & Status Pills */}
                                            <div className="relative z-10 flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <Badge
                                                        variant={
                                                            project.category === "Road & Highway"
                                                                ? "blue"
                                                                : project.category === "Government Buildings"
                                                                ? "gold"
                                                                : "navy"
                                                        }
                                                    >
                                                        {project.category}
                                                    </Badge>
                                                    <span className="text-[10px] font-mono-tech uppercase font-bold text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/60">
                                                        {project.id.toUpperCase()}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`inline-flex items-center gap-1 text-[10px] font-mono-tech font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                                        project.status === "Completed"
                                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                            : "bg-amber-50 text-amber-700 border border-amber-200"
                                                    }`}
                                                >
                                                    <CheckCircle2 size={10} />
                                                    {project.status}
                                                </span>
                                            </div>

                                            {/* Value Pill */}
                                            <div className="relative z-10 flex items-baseline justify-between">
                                                <div>
                                                    <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 block">
                                                        Contract Value
                                                    </span>
                                                    <span
                                                        style={{ fontFamily: "var(--font-condensed)" }}
                                                        className="text-2xl font-extrabold text-[#0d1b2e] tracking-tight leading-none"
                                                    >
                                                        {project.value}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-mono-tech text-slate-400">
                                                    FY {project.year}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-6 flex flex-col flex-1 justify-between">
                                            <div>
                                                <h3
                                                    style={{ fontFamily: "var(--font-condensed)" }}
                                                    className="text-xl font-bold text-[#0d1b2e] group-hover:text-[#185FA5] transition-colors leading-tight mb-2.5 line-clamp-2"
                                                >
                                                    {project.title}
                                                </h3>

                                                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-normal">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Metadata Specs */}
                                            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <Building2 size={13} className="text-slate-400 shrink-0" />
                                                    <span className="truncate">{project.client}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono-tech">
                                                    <span className="flex items-center gap-1.5 truncate">
                                                        <MapPin size={12} className="text-slate-400 shrink-0" />
                                                        {project.location}
                                                    </span>
                                                    <span className="flex items-center gap-1 shrink-0 font-medium">
                                                        <Clock size={12} className="text-slate-400" />
                                                        {project.duration}
                                                    </span>
                                                </div>

                                                {/* Action Indicator: Triggers Quick Dossier Popup */}
                                                <div className="mt-2 pt-2 border-t border-slate-100/70 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#185FA5] group-hover:text-[#0d1b2e] transition-colors">
                                                    <span className="flex items-center gap-1.5">
                                                        <span>Quick Dossier Spec</span>
                                                    </span>
                                                    <ArrowRight
                                                        size={13}
                                                        className="transition-transform group-hover:translate-x-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tilt3DCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-matte-sm">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <Search size={20} />
                        </div>
                        <h4
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-2xl font-bold text-[#0d1b2e] uppercase"
                        >
                            No Matching Records
                        </h4>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 font-mono-tech">
                            No infrastructure dossiers match the selected category or filter query.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory("All");
                                setSelectedStatus("All");
                                setSearchQuery("");
                            }}
                            className="btn btn-outline btn-sm mt-6"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* ================================================================= */}
            {/* INTERACTIVE PROJECT QUICK-VIEW DOSSIER POPUP / MODAL               */}
            {/* ================================================================= */}
            <AnimatePresence>
                {modalProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        {/* Backdrop with Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalProject(null)}
                            className="fixed inset-0 bg-[#0d1b2e]/60 backdrop-blur-md"
                        />

                        {/* Modal Dialog Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 16 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-6 sm:p-7 bg-[#FAF9F6] border-b border-slate-200/90 relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="blue">{modalProject.category}</Badge>
                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono-tech font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            <CheckCircle2 size={11} />
                                            {modalProject.status}
                                        </span>
                                        <span className="text-xs font-mono-tech font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                                            ID: {modalProject.id.toUpperCase()}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setModalProject(null)}
                                        className="p-1.5 rounded-full text-slate-400 hover:text-[#0d1b2e] hover:bg-slate-200/70 transition-colors"
                                        aria-label="Close modal"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <h2
                                    style={{ fontFamily: "var(--font-condensed)" }}
                                    className="text-2xl sm:text-3xl font-extrabold uppercase text-[#0d1b2e] leading-tight mb-2"
                                >
                                    {modalProject.title}
                                </h2>

                                <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-500 mt-2">
                                    <span className="flex items-center gap-1">
                                        <Building2 size={13} className="text-[#185FA5]" />
                                        {modalProject.client}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={13} className="text-[#c88a22]" />
                                        {modalProject.location}
                                    </span>
                                    <span>FY {modalProject.year}</span>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1">
                                {/* Contract Value Metric Strip */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400 block">
                                            Executed Contract Value
                                        </span>
                                        <span
                                            style={{ fontFamily: "var(--font-condensed)" }}
                                            className="text-3xl sm:text-4xl font-extrabold text-[#0d1b2e] tracking-tight leading-none"
                                        >
                                            {modalProject.value}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400 block">
                                            Execution Duration
                                        </span>
                                        <span className="text-sm font-mono-tech font-bold text-[#185FA5]">
                                            {modalProject.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Overview Description */}
                                <div>
                                    <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Scope &amp; Engineering Narrative
                                    </h4>
                                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                                        {modalProject.description}
                                    </p>
                                </div>

                                {/* Deliverable Highlights */}
                                <div>
                                    <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-400 mb-3">
                                        Verified Deliverables &amp; Quantities
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {modalProject.highlights.map((h, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-700"
                                            >
                                                <CheckCircle2 size={13} className="text-[#185FA5] shrink-0" />
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Statutory Certification Badge */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs font-mono-tech">
                                    <span className="flex items-center gap-2 text-[#0d1b2e] font-semibold">
                                        <ShieldCheck size={14} className="text-[#185FA5]" />
                                        Statutory Handover: Zero Structural Defects
                                    </span>
                                    <span className="text-[#c88a22] font-bold">IRC COMPLIANT</span>
                                </div>
                            </div>

                            {/* Modal Footer Actions */}
                            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4">
                                <button
                                    onClick={() => setModalProject(null)}
                                    className="px-4 py-2 text-xs font-mono-tech uppercase font-bold text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    Close Preview
                                </button>

                                <Link
                                    href={`/projects/${modalProject.id}`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0d1b2e] hover:bg-[#162a42] border border-white/10 shadow-sm transition-all"
                                >
                                    <span>Open ID Dossier Route ({modalProject.id.toUpperCase()})</span>
                                    <ExternalLink size={13} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
