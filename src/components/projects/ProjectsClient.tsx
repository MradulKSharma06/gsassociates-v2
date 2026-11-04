"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Project, projectCategories } from "@/data/projects";
import { MapPin, Building2, ArrowRight, Clock, Search, Layers, CheckCircle2 } from "lucide-react";

const categoryColors: Record<string, string> = {
    "Road & Highway": "var(--color-blue-primary)",
    "Bridges & Flyovers": "var(--color-navy-700)",
    "Government Buildings": "var(--color-gold)",
    "Water Infrastructure": "#1a6690",
    "Urban Development": "#2d7a6c",
};

interface Props {
    initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedStatus, setSelectedStatus] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filtered = useMemo(() => {
        return initialProjects.filter((p) => {
            const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
            const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;
            const matchesSearch =
                searchQuery.trim() === "" ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.client.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesStatus && matchesSearch;
        });
    }, [initialProjects, selectedCategory, selectedStatus, searchQuery]);

    const allCategories = ["All", ...projectCategories];
    const statuses = ["All", "Completed", "Ongoing"];

    return (
        <section className="section-padding" style={{ background: "var(--color-page-bg)" }}>
            <div className="container-site">
                {/* Control Bar: Categories, Statuses, and Search */}
                <div className="mb-10 flex flex-col gap-5">
                    {/* Top Row: Search and Status Switcher */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                        {/* Search input */}
                        <div className="relative flex-1 max-w-md">
                            <Search
                                size={17}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by project, client, or district…"
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                                style={{ borderColor: "var(--color-border)" }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Status Switcher */}
                        <div className="inline-flex items-center p-1 rounded-lg border bg-white shadow-sm" style={{ borderColor: "var(--color-border)" }}>
                            {statuses.map((status) => {
                                const isActive = selectedStatus === status;
                                return (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`relative px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                                            isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeStatusPill"
                                                className="absolute inset-0 bg-navy rounded-md z-0"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{status}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Category Filter Pills with smooth sliding layout indicator */}
                    <div className="flex flex-wrap items-center gap-2">
                        {allCategories.map((cat) => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`relative px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-md transition-colors ${
                                        isActive
                                            ? "text-white shadow-sm"
                                            : "text-slate-600 hover:text-navy bg-white/70 border border-slate-200/80"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeCategoryPill"
                                            className="absolute inset-0 rounded-md z-0"
                                            style={{ background: "var(--color-blue-primary)" }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        {cat === "All" && <Layers size={13} />}
                                        {cat}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results Counter */}
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
                    <span>
                        Showing {filtered.length} of {initialProjects.length} Projects
                    </span>
                    {(selectedCategory !== "All" || selectedStatus !== "All" || searchQuery) && (
                        <button
                            onClick={() => {
                                setSelectedCategory("All");
                                setSelectedStatus("All");
                                setSearchQuery("");
                            }}
                            className="text-blue-600 hover:underline"
                        >
                            Reset Filters
                        </button>
                    )}
                </div>

                {/* Animated Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filtered.map((project) => {
                            const accentColor =
                                categoryColors[project.category] ?? "var(--color-blue-primary)";

                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="group flex flex-col h-full rounded-card border bg-white overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                                        style={{ borderColor: "var(--color-border)" }}
                                    >
                                        {/* Card Top Banner with Watermark & Category Accent */}
                                        <div
                                            className="relative h-44 flex items-center justify-center overflow-hidden"
                                            style={{
                                                background: `linear-gradient(135deg, ${accentColor}dd 0%, #0d1b2e 100%)`,
                                            }}
                                        >
                                            {/* Architectural CAD Grid Pattern */}
                                            <svg
                                                className="absolute inset-0 w-full h-full opacity-10"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden
                                            >
                                                <defs>
                                                    <pattern
                                                        id={`grid-${project.id}`}
                                                        width="30"
                                                        height="30"
                                                        patternUnits="userSpaceOnUse"
                                                    >
                                                        <path
                                                            d="M 30 0 L 0 0 0 30"
                                                            fill="none"
                                                            stroke="white"
                                                            strokeWidth="0.5"
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
                                                className="absolute bottom-2 right-4 text-7xl font-extrabold text-white/10 select-none pointer-events-none"
                                            >
                                                {project.id.replace("proj-", "")}
                                            </span>

                                            {/* Category & Status Pills */}
                                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
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
                                                <span
                                                    className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${
                                                        project.status === "Completed"
                                                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                                    }`}
                                                >
                                                    <CheckCircle2 size={10} />
                                                    {project.status}
                                                </span>
                                            </div>

                                            {/* Value Pill */}
                                            <div className="absolute bottom-4 left-4 z-10">
                                                <span
                                                    style={{ fontFamily: "var(--font-condensed)" }}
                                                    className="text-xl font-extrabold text-white tracking-wide drop-shadow"
                                                >
                                                    {project.value}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3
                                                style={{ fontFamily: "var(--font-condensed)" }}
                                                className="text-xl font-bold text-navy group-hover:text-blue-primary transition-colors leading-tight mb-2.5 line-clamp-2"
                                            >
                                                {project.title}
                                            </h3>

                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                                                {project.description}
                                            </p>

                                            {/* Metadata Specs */}
                                            <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <Building2 size={13} className="text-slate-400 shrink-0" />
                                                    <span className="truncate">{project.client}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                                                    <span className="flex items-center gap-1.5 truncate">
                                                        <MapPin size={12} className="text-slate-400 shrink-0" />
                                                        {project.location}
                                                    </span>
                                                    <span className="flex items-center gap-1 shrink-0 font-medium">
                                                        <Clock size={12} className="text-slate-400" />
                                                        {project.year}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Bottom Link indicator */}
                                            <div className="mt-4 pt-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-primary group-hover:text-blue-bright transition-colors">
                                                <span>View Project Dossier</span>
                                                <ArrowRight
                                                    size={14}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <div className="rounded-card border bg-white p-16 text-center">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <Search size={24} />
                        </div>
                        <h4
                            style={{ fontFamily: "var(--font-condensed)" }}
                            className="text-2xl font-bold text-navy uppercase"
                        >
                            No Projects Found
                        </h4>
                        <p className="text-sm text-slate-500 max-w-md mx-auto mt-2">
                            No infrastructure projects match your selected category, status, or search query.
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
        </section>
    );
}
