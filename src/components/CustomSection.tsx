"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CustomSection as CustomSectionType } from "@/context/DataContext";
import { Code2, Users, Briefcase, Coffee, Trophy, Rocket, Star, Heart, Globe, Zap, ExternalLink, LucideIcon } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

// Icon map for dynamic rendering
const iconMap: Record<string, LucideIcon> = {
    Code2, Users, Briefcase, Coffee, Trophy, Rocket, Star, Heart, Globe, Zap
};

interface CustomSectionProps {
    section: CustomSectionType;
}

export default function CustomSection({ section }: CustomSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    if (!section.isVisible) return null;

    const getGridCols = () => {
        switch (section.columns) {
            case 2: return "md:grid-cols-2";
            case 3: return "md:grid-cols-3";
            case 4: return "md:grid-cols-2 lg:grid-cols-4";
            default: return "md:grid-cols-3";
        }
    };

    return (
        <section className="py-20 relative overflow-hidden">
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
                        {section.title.split(" ").map((word, i, arr) =>
                            i === arr.length - 1
                                ? <span key={i} className="text-gradient">{word}</span>
                                : <span key={i}>{word} </span>
                        )}
                    </h2>
                    {section.subtitle && (
                        <p className="text-[var(--foreground-secondary)]">
                            {section.subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Items Grid/List */}
                <div className={`grid gap-6 ${section.layout === 'list' ? 'grid-cols-1' : `grid-cols-1 ${getGridCols()}`}`}>
                    {section.items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Text Block */}
                            {item.type === 'text' && (
                                <div className="glass-card p-6 card-hover">
                                    <p className="text-[var(--foreground-secondary)] leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                            )}

                            {/* Card */}
                            {item.type === 'card' && (
                                <div className="glass-card p-6 card-hover group">
                                    <div className="flex items-start gap-4">
                                        {item.icon && iconMap[item.icon] && (
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] p-0.5 flex-shrink-0">
                                                <div className="w-full h-full rounded-xl bg-[var(--background)] flex items-center justify-center group-hover:bg-transparent transition-colors">
                                                    {(() => {
                                                        const Icon = iconMap[item.icon];
                                                        return <Icon className="w-5 h-5 text-[var(--foreground)] group-hover:text-white transition-colors" />;
                                                    })()}
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            {item.title && (
                                                <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                                    {item.title}
                                                </h3>
                                            )}
                                            {item.description && (
                                                <p className="text-[var(--foreground-secondary)] text-sm">
                                                    {item.description}
                                                </p>
                                            )}
                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 mt-3 text-sm text-[var(--accent-primary)] hover:underline"
                                                >
                                                    Learn more <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Image */}
                            {item.type === 'image' && item.imageUrl && (
                                <div className="glass-card overflow-hidden card-hover group">
                                    <div className="aspect-video relative">
                                        <img
                                            src={item.imageUrl?.startsWith('http') ? item.imageUrl : getAssetPath(item.imageUrl || '')}
                                            alt={item.caption || "Image"}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    {item.caption && (
                                        <div className="p-4">
                                            <p className="text-sm text-[var(--foreground-secondary)]">
                                                {item.caption}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {section.items.length === 0 && (
                    <div className="text-center py-12 text-[var(--foreground-secondary)]">
                        <p>No items in this section yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
