"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Calendar, MapPin, ChevronRight } from "lucide-react";
import { usePortfolioData } from "@/context/DataContext";

export default function Experience() {
    const { data } = usePortfolioData();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-tertiary)] rounded-full filter blur-[200px] opacity-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full neo-glass mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />
                        <span className="text-sm text-[var(--foreground-secondary)]">Career Journey</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Work <span className="text-gradient">Experience</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />

                    <div className="space-y-8">
                        {data.experience.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative pl-20"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-6 top-0 w-5 h-5 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] border-4 border-[var(--background)] shadow-lg glow-border" />

                                <div className="neo-glass rounded-2xl p-6 card-hover">
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">{exp.role}</h3>
                                            <p className="text-[var(--accent-secondary)] font-medium">{exp.company}</p>
                                        </div>
                                        <div className="text-right text-sm">
                                            <div className="flex items-center gap-2 text-[var(--foreground-secondary)]">
                                                <Calendar className="w-4 h-4" />
                                                {exp.duration}
                                            </div>
                                            <div className="flex items-center gap-2 text-[var(--foreground-secondary)]">
                                                <MapPin className="w-4 h-4" />
                                                {exp.location}
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-4">
                                        {exp.description.map((desc, i) => (
                                            <li key={i} className="flex items-start gap-2 text-[var(--foreground-secondary)] text-sm">
                                                <ChevronRight className="w-4 h-4 mt-0.5 text-[var(--accent-secondary)] flex-shrink-0" />
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 border border-[var(--glass-border)] text-[var(--accent-secondary)]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
