"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const ADMIN_CREDENTIALS = {
    email: "admin@aniket.dev",
    password: "admin123"
};

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("admin_logged_in");
        if (isLoggedIn === "true") {
            router.push("/admin");
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem("admin_logged_in", "true");
            router.push("/admin");
        } else {
            setError("Invalid email or password");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 animated-gradient" />
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent-primary)] rounded-full filter blur-[200px] opacity-20" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent-secondary)] rounded-full filter blur-[180px] opacity-15" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Glass card */}
                <div className="neo-glass rounded-3xl p-8 sm:p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center relative"
                        >
                            <Lock className="w-10 h-10 text-white" />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] blur-xl opacity-50" />
                        </motion.div>

                        <h1 className="text-3xl font-bold mb-2">
                            <span className="text-gradient">Admin</span> Login
                        </h1>
                        <p className="text-[var(--foreground-secondary)] text-sm">
                            Sign in to manage your portfolio
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground-secondary)]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@aniket.dev"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all text-[var(--foreground)] placeholder:text-[var(--foreground-secondary)]/50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground-secondary)]" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all text-[var(--foreground)] placeholder:text-[var(--foreground-secondary)]/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50"
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Demo credentials */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 p-4 rounded-xl glass-card"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />
                            <span className="text-sm font-medium text-[var(--accent-secondary)]">Demo Credentials</span>
                        </div>
                        <p className="text-xs text-[var(--foreground-secondary)]">
                            Email: admin@aniket.dev<br />
                            Password: admin123
                        </p>
                    </motion.div>

                    {/* Back link */}
                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--accent-secondary)] transition-colors"
                        >
                            ← Back to Portfolio
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
