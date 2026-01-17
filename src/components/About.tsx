"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Mail, Download, Sparkles, User, Briefcase, GraduationCap } from "lucide-react";
import { usePortfolioData } from "@/context/DataContext";

export default function About() {
    const { data } = usePortfolioData();
    const profile = data.profile;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const highlights = [
        { icon: Briefcase, label: "Experience", value: `${data.experience.length}+ Years` },
        { icon: User, label: "Projects", value: `${data.projects.length}+ Completed` },
        { icon: GraduationCap, label: "Expertise", value: "Full Stack" },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-primary)] rounded-full filter blur-[200px] opacity-10" />

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
                        <span className="text-sm text-[var(--foreground-secondary)]">About Me</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Know More <span className="text-gradient">About Me</span>
                    </h2>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        Passionate developer turning ideas into reality
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-3xl blur-3xl opacity-30 scale-95" />

                            {/* Image container */}
                            <div className="relative neo-glass rounded-3xl overflow-hidden p-3">
                                <div className="relative rounded-2xl overflow-hidden aspect-square">
                                    <img
                                        src={`${profile.avatar}?v=6`}
                                        alt={profile.name}
                                        className="w-full h-full object-cover object-[center_25%]"
                                    />

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent" />

                                    {/* Info overlay */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold">{profile.name}</h3>
                                        <p className="text-sm text-[var(--accent-secondary)]">{profile.title}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating card */}
                            <motion.div
                                className="absolute -bottom-6 -right-6 neo-glass rounded-2xl p-4 floating"
                                style={{ animationDelay: "0.5s" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--foreground-secondary)]">Based in</p>
                                        <p className="font-medium">{profile.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Bio */}
                        <div className="neo-glass rounded-2xl p-6">
                            <h3 className="text-2xl font-bold mb-4">
                                I&apos;m <span className="text-gradient">{profile.name}</span>
                            </h3>
                            <p className="text-[var(--foreground-secondary)] leading-relaxed whitespace-pre-line">
                                {profile.bio}
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="grid grid-cols-3 gap-4">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="neo-glass rounded-xl p-4 text-center card-hover"
                                >
                                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <p className="text-lg font-bold text-gradient">{item.value}</p>
                                    <p className="text-xs text-[var(--foreground-secondary)]">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick info */}
                        <div className="neo-glass rounded-2xl p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[var(--accent-secondary)]" />
                                <span className="text-[var(--foreground-secondary)]">{profile.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-[var(--accent-secondary)]" />
                                <span className="text-[var(--foreground-secondary)]">Available for freelance</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex gap-4">
                            <motion.a
                                href={profile.resumeUrl}
                                className="btn-primary flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download size={18} />
                                Download CV
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
