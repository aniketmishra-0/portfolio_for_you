"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { usePortfolioData } from "@/context/DataContext";
import { navLinks } from "@/lib/data";

export default function Footer() {
    const { data } = usePortfolioData();
    const profile = data.profile;
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, url: profile.social.github, label: "GitHub" },
        { icon: Linkedin, url: profile.social.linkedin, label: "LinkedIn" },
        { icon: Twitter, url: profile.social.twitter, label: "Twitter" },
        { icon: Instagram, url: profile.social.instagram, label: "Instagram" },
    ].filter(s => s.url); // Only show links that have URLs

    return (
        <footer className="bg-[var(--background)] border-t border-[var(--glass-border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <a href="#home" className="text-2xl font-bold text-gradient mb-4 inline-block">
                            {profile.name.split(" ").map(n => n[0]).join("")}
                        </a>
                        <p className="text-[var(--foreground-secondary)] text-sm max-w-xs">
                            {profile.tagline}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <nav className="flex flex-wrap gap-4">
                            {navLinks.slice(0, 5).map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] text-sm transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                                    style={{
                                        background: 'var(--glass)',
                                        border: '1px solid var(--glass-border)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} className="text-[var(--accent-primary)]" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[var(--glass-border)] pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-[var(--foreground-secondary)] text-sm flex items-center gap-1">
                            © {currentYear} {profile.name}. Made with
                            <Heart size={14} className="text-red-500 fill-red-500" />
                        </p>
                        <p className="text-[var(--foreground-secondary)] text-sm">
                            Built with Next.js, Tailwind CSS & Framer Motion
                        </p>
                    </div>
                </div>
            </div>

            {/* Back to Top */}
            <motion.a
                href="#home"
                className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white shadow-lg z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6" />
                </svg>
            </motion.a>
        </footer>
    );
}
