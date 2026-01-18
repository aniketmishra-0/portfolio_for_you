"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, Shield, Github } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppwriteAuth } from "@/context/AppwriteAuthContext";

export default function AdminLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isAuthenticated, isLoading } = useAppwriteAuth();
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState("");

    // Check for auth errors from callback
    useEffect(() => {
        const authError = searchParams.get("error");
        if (authError) {
            setError("Authentication failed. Your email may not be authorized.");
        }
    }, [searchParams]);

    // Redirect if already authenticated
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push("/admin");
        }
    }, [isLoading, isAuthenticated, router]);

    const handleGitHubLogin = async () => {
        setIsConnecting(true);
        setError("");
        try {
            await login("github");
        } catch {
            setError("Failed to connect to GitHub");
            setIsConnecting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
            </div>
        );
    }

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
                            Sign in with GitHub to continue
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

                    {/* GitHub Login Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={handleGitHubLogin}
                        disabled={isConnecting}
                        className="group w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-[#24292e] hover:bg-[#2f363d] text-white font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-white/10"
                        whileHover={{ boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" }}
                    >
                        {isConnecting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Connecting...</span>
                            </>
                        ) : (
                            <>
                                <Github className="w-5 h-5" />
                                <span>Continue with GitHub</span>
                            </>
                        )}
                    </motion.button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-white/30 text-xs">Powered by Appwrite</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Security badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/10"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <Shield className="w-3 h-3 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-medium text-emerald-400">Secure Access</p>
                                <p className="text-[9px] text-white/40">Only authorized accounts can access admin</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
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
