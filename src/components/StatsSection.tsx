"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Coffee, Briefcase, Users, Trophy, Rocket } from "lucide-react";

const stats = [
    { icon: Code2, value: 50, suffix: "+", label: "Projects Completed", color: "from-purple-500 to-indigo-500" },
    { icon: Users, value: 30, suffix: "+", label: "Happy Clients", color: "from-indigo-500 to-cyan-500" },
    { icon: Briefcase, value: 5, suffix: "+", label: "Years Experience", color: "from-cyan-500 to-emerald-500" },
    { icon: Coffee, value: 1000, suffix: "+", label: "Cups of Coffee", color: "from-emerald-500 to-yellow-500" },
    { icon: Trophy, value: 15, suffix: "+", label: "Awards Won", color: "from-yellow-500 to-orange-500" },
    { icon: Rocket, value: 99, suffix: "%", label: "Client Satisfaction", color: "from-orange-500 to-red-500" },
];

function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
}

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section className="py-20 bg-[var(--background-secondary)] relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-primary)]/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Numbers That <span className="text-gradient">Speak</span>
                    </h2>
                    <p className="text-[var(--foreground-secondary)]">
                        A glimpse into my journey and achievements
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 text-center card-hover group"
                        >
                            <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-0.5`}>
                                <div className="w-full h-full rounded-xl bg-[var(--background-secondary)] flex items-center justify-center group-hover:bg-transparent transition-colors">
                                    <stat.icon className="w-5 h-5 text-[var(--foreground)] group-hover:text-white transition-colors" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-xs sm:text-sm text-[var(--foreground-secondary)]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
