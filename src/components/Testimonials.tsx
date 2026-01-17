"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { usePortfolioData } from "@/context/DataContext";

export default function Testimonials() {
    const { data } = usePortfolioData();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = data.testimonials;

    useEffect(() => {
        if (testimonials.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    if (testimonials.length === 0) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-secondary)] rounded-full filter blur-[200px] opacity-10" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                        <span className="text-sm text-[var(--foreground-secondary)]">Testimonials</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        What <span className="text-gradient">Clients Say</span>
                    </h2>
                </motion.div>

                {/* Testimonial Card */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="neo-glass rounded-3xl p-8 md:p-12"
                        >
                            {/* Quote icon */}
                            <Quote className="w-12 h-12 text-[var(--accent-primary)] opacity-30 mb-6" />

                            {/* Content */}
                            <p className="text-xl md:text-2xl text-[var(--foreground-secondary)] mb-8 leading-relaxed">
                                &ldquo;{testimonials[currentIndex].content}&rdquo;
                            </p>

                            {/* Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={i < testimonials[currentIndex].rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-[var(--glass-border)]"
                                        }
                                    />
                                ))}
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonials[currentIndex].image}
                                    alt={testimonials[currentIndex].name}
                                    className="w-14 h-14 rounded-full border-2 border-[var(--accent-primary)]"
                                />
                                <div>
                                    <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                                    <p className="text-[var(--foreground-secondary)]">{testimonials[currentIndex].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    {testimonials.length > 1 && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full neo-glass flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={next}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full neo-glass flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>

                {/* Dots */}
                {testimonials.length > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                        ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] w-8"
                                        : "bg-[var(--glass-border)]"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
