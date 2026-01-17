"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle, Github, Linkedin, Twitter, Instagram, Sparkles } from "lucide-react";
import { usePortfolioData } from "@/context/DataContext";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
    const { data } = usePortfolioData();
    const profile = data.profile;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [formStatus, setFormStatus] = useState<FormStatus>("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const contactInfo = [
        { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
        { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
        { icon: MapPin, label: "Location", value: profile.location, href: "#" },
    ];

    const socialLinks = [
        { icon: Github, label: "GitHub", url: profile.social.github },
        { icon: Linkedin, label: "LinkedIn", url: profile.social.linkedin },
        { icon: Twitter, label: "Twitter", url: profile.social.twitter },
        { icon: Instagram, label: "Instagram", url: profile.social.instagram },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: "YOUR_WEB3FORMS_KEY",
                    ...formData,
                    from_name: "Portfolio Contact Form",
                }),
            });

            if (response.ok) {
                setFormStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setFormStatus("idle"), 5000);
            } else {
                throw new Error("Failed to send");
            }
        } catch {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section id="contact" className="py-24 bg-[var(--background-secondary)] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[var(--accent-primary)] to-transparent rounded-full filter blur-[150px] opacity-20" />

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
                        <span className="text-sm text-[var(--foreground-secondary)]">Get In Touch</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Let&apos;s Work <span className="text-gradient">Together</span>
                    </h2>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        Have a project in mind? I&apos;d love to hear about it.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="neo-glass rounded-2xl p-6">
                            <h3 className="text-2xl font-bold mb-4">Let&apos;s Connect</h3>
                            <p className="text-[var(--foreground-secondary)] mb-6">
                                Feel free to reach out for collaborations or just a friendly hello!
                            </p>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={info.label}
                                        href={info.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-xl glass-card card-hover group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                                            <info.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[var(--foreground-secondary)]">{info.label}</p>
                                            <p className="font-medium group-hover:text-[var(--accent-secondary)] transition-colors">{info.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="neo-glass rounded-2xl p-6">
                            <h4 className="font-bold mb-4">Follow Me</h4>
                            <div className="flex gap-3">
                                {socialLinks.filter(s => s.url).map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:border-[var(--accent-secondary)] transition-all group"
                                        title={social.label}
                                    >
                                        <social.icon size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-[var(--accent-secondary)] transition-colors" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="neo-glass rounded-2xl p-8 space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3.5 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3.5 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Project Inquiry"
                                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all resize-none"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={formStatus === "loading"}
                                className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50"
                                whileHover={{ scale: formStatus === "loading" ? 1 : 1.02 }}
                                whileTap={{ scale: formStatus === "loading" ? 1 : 0.98 }}
                            >
                                {formStatus === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                                {formStatus === "success" && <CheckCircle className="w-5 h-5" />}
                                {formStatus === "error" && <AlertCircle className="w-5 h-5" />}
                                {formStatus === "idle" && <Send className="w-5 h-5" />}

                                {formStatus === "idle" && "Send Message"}
                                {formStatus === "loading" && "Sending..."}
                                {formStatus === "success" && "Message Sent!"}
                                {formStatus === "error" && "Failed to Send"}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
