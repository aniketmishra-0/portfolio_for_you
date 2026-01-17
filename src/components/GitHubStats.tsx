"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Star, GitFork, Users, Code, Github, ExternalLink, Activity } from "lucide-react";

interface GitHubStats {
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
}

interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
}

interface GitHubStatsProps {
    username?: string;
}

export default function GitHubStats({ username = "aniket-mishra" }: GitHubStatsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Fetch user data
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                if (!userRes.ok) throw new Error("Failed to fetch user");
                const userData = await userRes.json();

                // Fetch repos
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`);
                if (!reposRes.ok) throw new Error("Failed to fetch repos");
                const reposData = await reposRes.json();

                // Calculate total stars
                const totalStars = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);

                setStats({
                    publicRepos: userData.public_repos,
                    followers: userData.followers,
                    following: userData.following,
                    totalStars,
                });
                setRepos(reposData.slice(0, 4));
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, [username]);

    const statsItems = stats ? [
        { icon: Code, label: "Repositories", value: stats.publicRepos },
        { icon: Star, label: "Total Stars", value: stats.totalStars },
        { icon: Users, label: "Followers", value: stats.followers },
        { icon: Activity, label: "Following", value: stats.following },
    ] : [];

    const languageColors: Record<string, string> = {
        JavaScript: "#f7df1e",
        TypeScript: "#3178c6",
        Python: "#3572A5",
        Java: "#b07219",
        Go: "#00ADD8",
        Rust: "#dea584",
        CSS: "#563d7c",
        HTML: "#e34c26",
    };

    if (error) {
        return null; // Don't show if GitHub API fails
    }

    return (
        <section className="py-24 bg-[var(--background)]">
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
                        <span className="text-gradient">GitHub</span> Activity
                    </h2>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        My open source contributions and projects
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-3 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                        >
                            {statsItems.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    className="glass-card p-6 text-center card-hover"
                                >
                                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-[var(--accent-primary)]" />
                                    <div className="text-3xl font-bold text-gradient mb-1">
                                        {stat.value.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-[var(--foreground-secondary)]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Repos Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="grid md:grid-cols-2 gap-4 mb-8"
                        >
                            {repos.map((repo, index) => (
                                <motion.a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                    className="glass-card p-5 card-hover group block"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Github size={18} className="text-[var(--foreground-secondary)]" />
                                            <h3 className="font-bold group-hover:text-gradient transition-all truncate max-w-[200px]">
                                                {repo.name}
                                            </h3>
                                        </div>
                                        <ExternalLink size={16} className="text-[var(--foreground-secondary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0" />
                                    </div>

                                    <p className="text-[var(--foreground-secondary)] text-sm mb-4 line-clamp-2">
                                        {repo.description || "No description available"}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm">
                                        {repo.language && (
                                            <div className="flex items-center gap-1.5">
                                                <span
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: languageColors[repo.language] || "#6e7681" }}
                                                />
                                                <span className="text-[var(--foreground-secondary)]">{repo.language}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1 text-[var(--foreground-secondary)]">
                                            <Star size={14} className="text-yellow-500" />
                                            <span>{repo.stargazers_count}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[var(--foreground-secondary)]">
                                            <GitFork size={14} />
                                            <span>{repo.forks_count}</span>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* View Profile Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="text-center"
                        >
                            <a
                                href={`https://github.com/${username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary inline-flex items-center gap-2"
                            >
                                <Github size={18} />
                                View GitHub Profile
                            </a>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
}
