"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { usePortfolioData } from "@/context/DataContext";

export default function Skills() {
    const { data } = usePortfolioData();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--accent-secondary)] rounded-full filter blur-[200px] opacity-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                        <span className="text-sm text-[var(--foreground-secondary)]">My Skills</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Technical <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        Technologies and tools I use to bring products to life
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.skills.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            className="neo-glass rounded-2xl p-6 card-hover"
                        >
                            <h3 className="text-xl font-bold mb-6 text-gradient">{category.category}</h3>

                            <div className="space-y-5">
                                {category.items.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.2 }}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium">{skill.name}</span>
                                            <span className="text-sm text-[var(--accent-secondary)]">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-[var(--glass)] overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : {}}
                                                transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3, ease: "easeOut" }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
