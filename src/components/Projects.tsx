"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Sparkles, X } from "lucide-react";
import { usePortfolioData } from "@/context/DataContext";

export default function Projects() {
    const { data } = usePortfolioData();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [filter, setFilter] = useState<"all" | "featured">("all");

    const filteredProjects = filter === "featured"
        ? data.projects.filter(p => p.featured)
        : data.projects;

    const selectedProjectData = data.projects.find(p => p.id === selectedProject);

    return (
        <section id="projects" className="py-24 bg-[var(--background-secondary)] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-primary)] rounded-full filter blur-[250px] opacity-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full neo-glass mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />
                        <span className="text-sm text-[var(--foreground-secondary)]">My Work</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto mb-8">
                        A collection of projects that showcase my skills and experience
                    </p>

                    {/* Filter */}
                    <div className="flex justify-center gap-2">
                        {(["all", "featured"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${filter === f
                                        ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white"
                                        : "glass-card text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onClick={() => setSelectedProject(project.id)}
                                className="neo-glass rounded-2xl overflow-hidden card-hover cursor-pointer group"
                            >
                                {/* Image */}
                                <div className="relative h-48 bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                        📁
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-[var(--accent-primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5 text-white" />
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                                        >
                                            <Github className="w-5 h-5 text-white" />
                                        </a>
                                    </div>

                                    {project.featured && (
                                        <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                                        {project.title}
                                    </h3>
                                    <p className="text-[var(--foreground-secondary)] text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--glass)] text-[var(--foreground-secondary)] border border-[var(--glass-border)]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--glass)] text-[var(--foreground-secondary)]">
                                                +{project.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && selectedProjectData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="neo-glass rounded-3xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-gradient">{selectedProjectData.title}</h3>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="p-2 rounded-xl hover:bg-[var(--glass)] transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <p className="text-[var(--foreground-secondary)] mb-6">
                                {selectedProjectData.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProjectData.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--glass-border)]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <a
                                    href={selectedProjectData.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 btn-primary text-center flex items-center justify-center gap-2"
                                >
                                    <ExternalLink size={18} />
                                    Live Demo
                                </a>
                                <a
                                    href={selectedProjectData.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 btn-secondary text-center flex items-center justify-center gap-2"
                                >
                                    <Github size={18} />
                                    Source Code
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
