"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Settings } from "lucide-react";
import { usePortfolioData, SectionVisibility } from "@/context/DataContext";

// Map section visibility keys to nav links
const allNavLinks = [
    { name: "Home", href: "#home", visibilityKey: null },
    { name: "About", href: "#about", visibilityKey: "about" as keyof SectionVisibility },
    { name: "Skills", href: "#skills", visibilityKey: "skills" as keyof SectionVisibility },
    { name: "Projects", href: "#projects", visibilityKey: "projects" as keyof SectionVisibility },
    { name: "Experience", href: "#experience", visibilityKey: "experience" as keyof SectionVisibility },
    { name: "Blog", href: "#blog", visibilityKey: "blog" as keyof SectionVisibility },
    { name: "Contact", href: "#contact", visibilityKey: "contact" as keyof SectionVisibility },
];

export default function Navbar() {
    const { data } = usePortfolioData();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [mounted, setMounted] = useState(false);

    // Filter nav links based on visibility settings
    const navLinks = allNavLinks.filter(link =>
        link.visibilityKey === null || data.sectionVisibility[link.visibilityKey]
    );

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme") as "dark" | "light";
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navLinks.map(link => link.href.replace("#", ""));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navLinks]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-2" : "py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between h-16 px-6 rounded-2xl transition-all duration-500 ${isScrolled ? "neo-glass" : ""
                    }`}>
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="relative text-2xl font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-gradient">{data.profile.name.split(" ").map(n => n[0]).join("")}</span>
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full" />
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, index) => {
                            const isActive = activeSection === link.href.replace("#", "");
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? "text-[var(--foreground)]"
                                        : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                                        }`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="navbar-active"
                                            className="absolute inset-0 bg-[var(--glass)] rounded-xl border border-[var(--glass-border)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Right side buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Admin Link */}
                        <motion.a
                            href="/login"
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--accent-primary)] transition-all backdrop-blur-md"
                            style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="Admin Panel"
                        >
                            <Settings size={18} />
                        </motion.a>

                        {/* Theme Toggle */}
                        {mounted && (
                            <motion.button
                                onClick={toggleTheme}
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--accent-primary)] transition-all backdrop-blur-md"
                                style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait">
                                    {theme === "dark" ? (
                                        <motion.div
                                            key="sun"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Sun size={18} className="text-yellow-400" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="moon"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Moon size={18} className="text-blue-400" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        )}

                        {/* Hire Me Button */}
                        <motion.a
                            href="#contact"
                            className="btn-primary text-sm !py-2.5 !px-6"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Hire Me
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--foreground)] rounded-xl hover:bg-[var(--glass)] transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mx-4 mt-2"
                    >
                        <div className="neo-glass rounded-2xl p-4 space-y-2">
                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href.replace("#", "");
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className={`block px-4 py-3 rounded-xl transition-colors ${isActive
                                            ? "bg-[var(--glass)] text-[var(--foreground)] border border-[var(--glass-border)]"
                                            : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--glass)]"
                                            }`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </motion.a>
                                );
                            })}

                            <div className="flex gap-2 pt-2">
                                {mounted && (
                                    <button
                                        onClick={toggleTheme}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass-card"
                                    >
                                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                                        {theme === "dark" ? "Light" : "Dark"}
                                    </button>
                                )}
                                <motion.a
                                    href="#contact"
                                    className="flex-1 btn-primary text-center text-sm"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Hire Me
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
