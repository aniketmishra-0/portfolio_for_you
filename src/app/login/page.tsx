"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, Shield, Sparkles } from "lucide-react";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
    const [isLoading, setIsLoading] = useState<"google" | "github" | null>(null);
    const [error, setError] = useState("");

    const handleSignIn = async (provider: "google" | "github") => {
        setIsLoading(provider);
        setError("");
        try {
            await signIn(provider, { callbackUrl: "/admin" });
        } catch {
            setError("Failed to sign in. Please try again.");
            setIsLoading(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated cyber grid background */}
            <div className="absolute inset-0 animated-gradient opacity-80" />

            {/* Animated glow orbs */}
            <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-500 rounded-full filter blur-[150px] opacity-20 animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-cyan-500 rounded-full filter blur-[120px] opacity-15 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-500 rounded-full filter blur-[200px] opacity-10" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
                        }}
                        animate={{
                            y: [null, -20, 20],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[360px]"
            >
                {/* Glow effect behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-60" />

                {/* Glass card */}
                <div className="relative backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-2xl">
                    {/* Glowing top border */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />

                    {/* Header */}
                    <div className="text-center mb-6">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="relative w-14 h-14 mx-auto mb-4"
                        >
                            {/* Rotating ring */}
                            <motion.div
                                className="absolute inset-0 rounded-xl border-2 border-violet-500/30"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Icon container */}
                            <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <Lock className="w-6 h-6 text-white" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold mb-1"
                        >
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Admin</span>
                            <span className="text-white"> Portal</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-white/50 text-xs"
                        >
                            Secure authentication required
                        </motion.p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Auth Buttons */}
                    <div className="space-y-3">
                        {/* Google Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            onClick={() => handleSignIn("google")}
                            disabled={isLoading !== null}
                            className="group w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white text-gray-800 font-medium text-sm hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                            whileHover={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                        >
                            {isLoading === "google" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            )}
                            <span>{isLoading === "google" ? "Connecting..." : "Continue with Google"}</span>
                        </motion.button>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            <Sparkles className="w-3 h-3 text-white/30" />
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </div>

                        {/* GitHub Button */}
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            onClick={() => handleSignIn("github")}
                            disabled={isLoading !== null}
                            className="group w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium text-sm hover:from-gray-700 hover:to-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-white/5"
                            whileHover={{ boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
                        >
                            {isLoading === "github" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            )}
                            <span>{isLoading === "github" ? "Connecting..." : "Continue with GitHub"}</span>
                        </motion.button>
                    </div>

                    {/* Security badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-5 p-3 rounded-xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/10"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <Shield className="w-3 h-3 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-medium text-emerald-400">Secure Access</p>
                                <p className="text-[9px] text-white/40">Authorized accounts only</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-4 text-center"
                    >
                        <a
                            href="/"
                            className="text-xs text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-1"
                        >
                            <span>←</span> Back to Portfolio
                        </a>
                    </motion.div>

                    {/* Glowing bottom border */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                </div>
            </motion.div>
        </div>
    );
}
