"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default function Blog() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section id="blog" className="py-24 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Latest <span className="text-gradient">Articles</span>
                    </h2>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights about development
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="group glass-card overflow-hidden card-hover"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] overflow-hidden">
                                <div className="absolute inset-0 bg-[var(--background)] opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-gradient opacity-30">
                                        {post.title.charAt(0)}
                                    </span>
                                </div>

                                {/* Category Tag */}
                                <div className="absolute top-4 left-4 px-3 py-1 bg-[var(--glass)] backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
                                    <Tag size={12} />
                                    {post.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Meta */}
                                <div className="flex items-center gap-4 text-sm text-[var(--foreground-secondary)] mb-3">
                                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-[var(--foreground-secondary)] text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Read More */}
                                <a
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-[var(--accent-primary)] font-medium text-sm group-hover:gap-3 transition-all"
                                >
                                    Read More
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <a href="/blog" className="btn-secondary inline-flex items-center gap-2">
                        View All Articles
                        <ArrowRight size={16} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
