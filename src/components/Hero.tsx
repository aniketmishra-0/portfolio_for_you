"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, ChevronDown, Download, ArrowRight, Sparkles } from "lucide-react";
import { usePortfolioData } from "@/context/DataContext";

const TypeWriter = ({ words }: { words: string[] }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const word = words[currentWordIndex];
        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (currentText.length < word.length) {
                        setCurrentText(word.slice(0, currentText.length + 1));
                    } else {
                        setTimeout(() => setIsDeleting(true), 2000);
                    }
                } else {
                    if (currentText.length > 0) {
                        setCurrentText(currentText.slice(0, -1));
                    } else {
                        setIsDeleting(false);
                        setCurrentWordIndex((prev) => (prev + 1) % words.length);
                    }
                }
            },
            isDeleting ? 50 : 100
        );
        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, mounted]);

    if (!mounted) {
        return <span className="text-gradient">{words[0]}</span>;
    }

    return (
        <span className="text-gradient text-glow">
            {currentText}
            <span className="animate-pulse text-[var(--accent-secondary)]">|</span>
        </span>
    );
};

export default function Hero() {
    const { data } = usePortfolioData();
    const profile = data.profile;

    const socialIcons = [
        { icon: Github, url: profile.social.github, label: "GitHub" },
        { icon: Linkedin, url: profile.social.linkedin, label: "LinkedIn" },
        { icon: Twitter, url: profile.social.twitter, label: "Twitter" },
        { icon: Instagram, url: profile.social.instagram, label: "Instagram" },
    ].filter(s => s.url); // Only show icons with valid URLs

    const roles = profile.roles?.length ? profile.roles : ["Full Stack Developer", "React Expert", "Node.js Developer"];

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated background */}
            <div className="absolute inset-0 animated-gradient" />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            {/* Gradient orbs - smaller on mobile for performance */}
            <div className="absolute top-1/4 left-1/4 w-[200px] sm:w-[400px] lg:w-[600px] h-[200px] sm:h-[400px] lg:h-[600px] bg-[var(--accent-primary)] rounded-full filter blur-[100px] sm:blur-[150px] lg:blur-[200px] opacity-20 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[150px] sm:w-[300px] lg:w-[500px] h-[150px] sm:h-[300px] lg:h-[500px] bg-[var(--accent-secondary)] rounded-full filter blur-[80px] sm:blur-[120px] lg:blur-[180px] opacity-15" />
            <div className="hidden sm:block absolute top-1/2 right-1/3 w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] bg-[var(--accent-tertiary)] rounded-full filter blur-[100px] lg:blur-[150px] opacity-10" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-20 items-center min-h-[calc(100vh-6rem)]">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full neo-glass mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-sm text-[var(--foreground-secondary)]">{profile.availabilityText || "Available for work"}</span>
                        </motion.div>

                        {/* Greeting */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-[var(--foreground-secondary)] text-lg mb-3"
                        >
                            {profile.greeting || "Hello, I'm"}
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
                        >
                            <span className="text-shine">{profile.name}</span>
                        </motion.h1>

                        {/* Typed role */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 h-12"
                        >
                            <TypeWriter words={roles} />
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-[var(--foreground-secondary)] text-lg max-w-xl mb-10 leading-relaxed"
                        >
                            {profile.tagline}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
                        >
                            <motion.a
                                href="#projects"
                                className="btn-primary flex items-center gap-2 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {profile.heroButtonPrimary || "View My Work"}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                            <motion.a
                                href={profile.resumeUrl}
                                className="btn-secondary flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download size={18} />
                                {profile.heroButtonSecondary || "Download CV"}
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-center lg:justify-start gap-4"
                        >
                            {socialIcons.map(({ icon: Icon, url, label }, index) => (
                                <motion.a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-2xl neo-glass flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--accent-secondary)] transition-all hover:scale-110"
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    aria-label={label}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right - Avatar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex justify-center lg:justify-end order-1 lg:order-2"
                    >
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] rounded-full blur-3xl opacity-40 scale-110" />

                            {/* Rotating border */}
                            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                                <div className="absolute inset-0 rounded-full border-flow p-[3px] animate-spin-slow">
                                    <div className="w-full h-full rounded-full bg-[var(--background)]" />
                                </div>

                                {/* Avatar image */}
                                <div className="absolute inset-3 rounded-full overflow-hidden neo-glass">
                                    <img
                                        src={`${profile.avatar}?v=5`}
                                        alt={profile.name}
                                        className="w-full h-full object-cover object-[center_25%]"
                                    />
                                </div>

                                {/* Status indicator */}
                                <motion.div
                                    className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-green-500 border-4 border-[var(--background)] glow-border"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>

                            {/* Floating decorations - hidden on mobile to prevent overlap */}
                            <motion.div
                                className="hidden sm:flex absolute -top-6 -right-6 w-20 h-20 neo-glass rounded-2xl items-center justify-center floating"
                                style={{ animationDelay: "0s" }}
                            >
                                <span className="text-3xl">💻</span>
                            </motion.div>
                            <motion.div
                                className="hidden sm:flex absolute -bottom-6 -left-6 w-16 h-16 neo-glass rounded-2xl items-center justify-center floating"
                                style={{ animationDelay: "1s" }}
                            >
                                <span className="text-2xl">🚀</span>
                            </motion.div>
                            <motion.div
                                className="hidden sm:flex absolute top-1/4 -left-10 w-14 h-14 neo-glass rounded-2xl items-center justify-center floating"
                                style={{ animationDelay: "2s" }}
                            >
                                <span className="text-xl">⚡</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 1.5, duration: 0.5 },
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <a href="#about" className="flex flex-col items-center gap-2 text-[var(--foreground-secondary)] hover:text-[var(--accent-secondary)] transition-colors">
                    <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
                        <motion.div
                            className="w-1.5 h-3 rounded-full bg-current"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </a>
            </motion.div>
        </section>
    );
}
