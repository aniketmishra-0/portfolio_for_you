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
    const [isNavVisible, setIsNavVisible] = useState(true);

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

    // Auto-hide navbar based on scroll direction (works on all devices)
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        // Scroll direction detection - primary method for all devices
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    // Always show at top of page
                    if (currentScrollY <= 50) {
                        setIsNavVisible(true);
                    }
                    // Scrolling UP - show navbar
                    else if (currentScrollY < lastScrollY - 5) {
                        setIsNavVisible(true);
                    }
                    // Scrolling DOWN - hide navbar (with threshold for smooth detection)
                    else if (currentScrollY > lastScrollY + 5 && currentScrollY > 100) {
                        setIsNavVisible(false);
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Desktop: Also show on mouse at top area
        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientY <= 60) {
                setIsNavVisible(true);
            }
        };

        // Touch: Show on touch at top area
        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (touch && touch.clientY <= 60) {
                setIsNavVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchstart", handleTouchStart, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchstart", handleTouchStart);
        };
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
            animate={{
                y: isNavVisible ? 0 : -100,
                opacity: isNavVisible ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-2" : "py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Clean Navbar - No box container */}
                <div className="relative">
                    <div className="relative flex items-center justify-between h-14 px-5">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            className="relative text-xl font-bold group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-gradient">{data.profile.name.split(" ").map(n => n[0]).join("")}</span>
                            <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full transition-all duration-300" />
                        </motion.a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href.replace("#", "");
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className={`relative text-sm font-medium transition-all duration-300 ${isActive
                                            ? "text-[var(--accent-primary)]"
                                            : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                                            }`}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -1 }}
                                    >
                                        <span>{link.name}</span>
                                        {/* Animated underline */}
                                        <motion.span
                                            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: isActive ? "100%" : 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        />
                                        {/* Hover glow effect */}
                                        {isActive && (
                                            <motion.span
                                                className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full blur-sm"
                                                style={{
                                                    background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                                                    opacity: 0.6
                                                }}
                                                layoutId="nav-glow"
                                            />
                                        )}
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* Right side buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Admin Link */}
                            <motion.a
                                href="/login"
                                className="text-[var(--foreground-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                title="Admin Panel"
                            >
                                <Settings size={18} />
                            </motion.a>

                            {/* Theme Toggle */}
                            {mounted && (
                                <motion.button
                                    onClick={toggleTheme}
                                    className="text-[var(--foreground-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300"
                                    whileHover={{ scale: 1.15 }}
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
