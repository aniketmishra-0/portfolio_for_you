"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, ExternalLink } from "lucide-react";
import { usePortfolioData } from "@/context/DataContext";

export default function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const { data } = usePortfolioData();
    const education = data.education || [];
    const certifications = data.certifications || [];

    return (
        <section id="education" className="py-24 bg-[var(--background-secondary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        {data.profile.educationTitle || "Education"} & <span className="text-gradient">Certifications</span>
                    </h2>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        My academic background and professional certifications
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Education */}
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-2xl font-bold mb-6 flex items-center gap-2"
                        >
                            <GraduationCap className="text-[var(--accent-primary)]" />
                            Education
                        </motion.h3>

                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={edu.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    className="glass-card p-6 card-hover"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center flex-shrink-0">
                                            <GraduationCap size={28} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold mb-1">{edu.degree}</h4>
                                            <p className="text-[var(--accent-primary)] font-medium mb-2">
                                                {edu.institution}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-[var(--foreground-secondary)] mb-2">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    <span>{edu.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    <span>{edu.location}</span>
                                                </div>
                                            </div>
                                            <p className="text-[var(--foreground-secondary)] text-sm">
                                                {edu.description}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                                {edu.gpa && (
                                                    <div className="inline-flex items-center px-3 py-1 bg-[var(--glass)] rounded-full text-sm">
                                                        GPA: <span className="text-gradient ml-1 font-bold">{edu.gpa}</span>
                                                    </div>
                                                )}
                                                {edu.certificateUrl && (
                                                    <a
                                                        href={edu.certificateUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--accent-primary)]/10 rounded-full text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 transition-colors"
                                                    >
                                                        <Award size={14} />
                                                        View Certificate
                                                        <ExternalLink size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-2xl font-bold mb-6 flex items-center gap-2"
                        >
                            <Award className="text-[var(--accent-primary)]" />
                            Certifications
                        </motion.h3>

                        <div className="space-y-4">
                            {certifications.map((cert, index) => (
                                <motion.a
                                    key={cert.id}
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    className="glass-card p-4 flex items-center gap-4 card-hover group block"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                                        <Award size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold truncate group-hover:text-gradient transition-all">
                                            {cert.name}
                                        </h4>
                                        <p className="text-[var(--foreground-secondary)] text-sm">
                                            {cert.issuer} • {cert.date}
                                        </p>
                                    </div>
                                    <ExternalLink size={18} className="text-[var(--foreground-secondary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0" />
                                </motion.a>
                            ))}
                            {certifications.length === 0 && (
                                <div className="text-center py-8 text-[var(--foreground-secondary)]">
                                    No certifications added yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
