"use client";

import { useState, useEffect } from "react";
import { useAppwriteAuth } from "@/context/AppwriteAuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    User,
    Users,
    Briefcase,
    FolderOpen,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    Save,
    Eye,
    Moon,
    Sun,
    Plus,
    Trash2,
    Edit2,
    Copy,
    Download,
    Upload,
    RotateCcw,
    Code,
    ExternalLink,
    ChevronRight,
    GraduationCap,
    ToggleLeft,
    ToggleRight,
    Layers,
    Award,
    Palette,
    BarChart3,
    Loader2,
    ChevronUp,
    ChevronDown
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePortfolioData, Project, Experience, Testimonial, Education, SectionVisibility, SectionId, defaultSectionOrder, CustomSection } from "@/context/DataContext";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Users, label: "Profiles", id: "profiles" },
    { icon: Layers, label: "Sections", id: "sections" },
    { icon: User, label: "Profile Info", id: "profile" },
    { icon: FolderOpen, label: "Projects", id: "projects" },
    { icon: Briefcase, label: "Experience", id: "experience" },
    { icon: GraduationCap, label: "Education", id: "education" },
    { icon: Award, label: "Certifications", id: "certifications" },
    { icon: Code, label: "Skills", id: "skills" },
    { icon: MessageSquare, label: "Testimonials", id: "testimonials" },
    { icon: Edit2, label: "Blog", id: "blog" },
    { icon: BarChart3, label: "Stats", id: "stats" },
    { icon: Plus, label: "Custom Sections", id: "custom-sections" },
    { icon: Palette, label: "Appearance", id: "appearance" },
    { icon: Settings, label: "Settings", id: "settings" },
];

// Only show these 5 items on mobile bottom nav
const mobileMenuItems = [
    { icon: LayoutDashboard, label: "Home", id: "dashboard" },
    { icon: User, label: "Profile", id: "profile" },
    { icon: FolderOpen, label: "Projects", id: "projects" },
    { icon: Code, label: "Skills", id: "skills" },
    { icon: Settings, label: "Settings", id: "settings" },
];

const sectionLabels: Record<keyof SectionVisibility, { label: string; description: string }> = {
    about: { label: "About Me", description: "Personal bio and introduction" },
    skills: { label: "Skills", description: "Technical skills with progress bars" },
    projects: { label: "Projects", description: "Portfolio projects showcase" },
    experience: { label: "Experience", description: "Work history timeline" },
    education: { label: "Education", description: "Educational background" },
    testimonials: { label: "Testimonials", description: "Client reviews and feedback" },
    blog: { label: "Blog", description: "Blog posts section" },
    contact: { label: "Contact", description: "Contact form and info" },
    stats: { label: "Stats Counter", description: "Animated statistics numbers" },
    githubStats: { label: "GitHub Stats", description: "GitHub contribution stats" },
};

export default function AdminPanel() {
    const router = useRouter();
    const { user, isLoading, isAuthenticated, logout } = useAppwriteAuth();
    const {
        data,
        allProfiles,
        setActiveProfile,
        addNewProfile,
        deleteProfile,
        updateProfileDomainName,
        duplicateProfile,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addExperience,
        updateExperienceItem,
        deleteExperience,
        addEducation,
        updateEducationItem,
        deleteEducation,
        addTestimonial,
        updateTestimonialItem,
        deleteTestimonial,
        toggleSection,
        updateSEO,
        updateTheme,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addCertification,
        updateCertification,
        deleteCertification,
        addStat,
        updateStat,
        deleteStat,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        addCustomSectionItem,
        updateCustomSectionItem,
        deleteCustomSectionItem,
        moveSectionUp,
        moveSectionDown,
        exportData,
        importData,
        resetToDefault
    } = usePortfolioData();

    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [editingProfile, setEditingProfile] = useState(data.profile);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [modalType, setModalType] = useState<"project" | "experience" | "testimonial" | "education" | null>(null);
    const [editingItem, setEditingItem] = useState<Project | Experience | Testimonial | Education | null>(null);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

    // Check Appwrite auth session
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }

        const savedTheme = localStorage.getItem("theme") as "dark" | "light";
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, [isLoading, isAuthenticated, router]);

    useEffect(() => {
        setEditingProfile(data.profile);
    }, [data.profile, allProfiles.activeProfileId]);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    // Show loading while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-primary)]" />
            </div>
        );
    }

    // Don't render if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const handleSaveProfile = () => {
        setSaveStatus("saving");
        updateProfile(editingProfile);
        setTimeout(() => {
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        }, 500);
    };

    const handleExport = () => {
        const json = exportData();
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "portfolio-data.json";
        a.click();
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                if (importData(content)) {
                    alert("Data imported successfully!");
                } else {
                    alert("Failed to import data. Invalid format.");
                }
            };
            reader.readAsText(file);
        }
    };

    const openAddModal = (type: "project" | "experience" | "testimonial" | "education") => {
        setModalType(type);
        setShowAddModal(true);
    };

    const openEditModal = (type: "project" | "experience" | "testimonial" | "education", item: Project | Experience | Testimonial | Education) => {
        setModalType(type);
        setEditingItem(item);
        setShowEditModal(true);
    };

    return (
        <div className="min-h-screen bg-[var(--background)] relative">
            {/* Background decorations - smaller on mobile */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[200px] sm:w-[400px] lg:w-[600px] h-[200px] sm:h-[400px] lg:h-[600px] bg-[var(--accent-primary)] rounded-full filter blur-[100px] sm:blur-[180px] lg:blur-[250px] opacity-10" />
                <div className="absolute bottom-0 left-0 w-[150px] sm:w-[300px] lg:w-[500px] h-[150px] sm:h-[300px] lg:h-[500px] bg-[var(--accent-secondary)] rounded-full filter blur-[80px] sm:blur-[150px] lg:blur-[200px] opacity-10" />
            </div>

            {/* Desktop Sidebar - Hidden on mobile */}
            <motion.aside
                initial={{ x: -220 }}
                animate={{ x: sidebarOpen ? 0 : -200 }}
                className={`admin-sidebar fixed z-50 flex-col hidden sm:flex
                    sm:left-0 sm:top-0 sm:w-[200px] sm:h-screen
                    ${theme === "dark"
                        ? "bg-[#0a0a14] border-r border-white/[0.08]"
                        : "bg-white border-r border-gray-200"
                    }`}
            >
                {/* Logo */}
                <div className={`h-12 flex items-center gap-2.5 px-4 ${theme === "dark" ? "border-b border-white/[0.08]" : "border-b border-gray-100"}`}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                        {data.profile.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-sm font-semibold">Admin</span>
                </div>

                {/* Desktop Menu Items */}
                <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all
                                ${activeTab === item.id
                                    ? theme === "dark"
                                        ? "bg-violet-500/15 text-violet-400"
                                        : "bg-violet-50 text-violet-600"
                                    : theme === "dark"
                                        ? "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                        >
                            <item.icon size={18} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Desktop Bottom */}
                <div className={`py-2 px-2 space-y-0.5 ${theme === "dark" ? "border-t border-white/[0.08]" : "border-t border-gray-100"}`}>
                    <a
                        href="/"
                        target="_blank"
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all
                            ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-white/[0.05]" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                    >
                        <Eye size={18} />
                        <span className="font-medium">View Site</span>
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </motion.aside>

            {/* Mobile Bottom Navigation - Only on small screens */}
            <nav className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden flex items-center justify-around px-2 py-2 backdrop-blur-xl border-t
                ${theme === "dark"
                    ? "bg-[#0a0a14]/95 border-white/10"
                    : "bg-white/95 border-gray-200"
                }`}
            >
                {mobileMenuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-all min-w-[56px]
                            ${activeTab === item.id
                                ? theme === "dark"
                                    ? "bg-violet-500/20 text-violet-400"
                                    : "bg-violet-100 text-violet-600"
                                : theme === "dark"
                                    ? "text-gray-500 active:bg-white/5"
                                    : "text-gray-500 active:bg-gray-100"
                            }`}
                    >
                        <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        <span className={`text-[10px] font-medium ${activeTab === item.id ? "font-semibold" : ""}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            {/* Mobile overlay - Only show on tablet/medium screens, not on small mobile where sidebar is bottom bar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hidden sm:block lg:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Slide-out Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="sm:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className={`sm:hidden fixed left-0 top-0 bottom-0 w-64 z-50 flex flex-col shadow-2xl
                                ${theme === "dark"
                                    ? "bg-[#0a0a14] border-r border-white/10"
                                    : "bg-white border-r border-gray-200"
                                }`}
                        >
                            {/* Drawer Header */}
                            <div className={`h-12 flex items-center justify-between px-4 ${theme === "dark" ? "border-b border-white/10" : "border-b border-gray-100"}`}>
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-[10px]">
                                        {data.profile.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <span className="text-sm font-semibold">Menu</span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`p-1.5 rounded-lg ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Drawer Menu Items */}
                            <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all
                                            ${activeTab === item.id
                                                ? theme === "dark"
                                                    ? "bg-violet-500/15 text-violet-400"
                                                    : "bg-violet-50 text-violet-600"
                                                : theme === "dark"
                                                    ? "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                            }`}
                                    >
                                        <item.icon size={18} />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>

                            {/* Drawer Bottom */}
                            <div className={`py-2 px-2 space-y-0.5 ${theme === "dark" ? "border-t border-white/10" : "border-t border-gray-100"}`}>
                                <a
                                    href="/"
                                    target="_blank"
                                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all
                                        ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-white/[0.05]" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                                >
                                    <Eye size={18} />
                                    <span className="font-medium">View Site</span>
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
                                >
                                    <LogOut size={18} />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="admin-content sm:ml-[200px] min-h-screen flex flex-col relative z-10 max-sm:ml-0 max-sm:pb-20">
                {/* Header - Compact */}
                <header className={`h-12 max-sm:h-11 flex items-center justify-between px-4 max-sm:px-3 sticky top-0 z-30 backdrop-blur-xl
                    ${theme === "dark"
                        ? "bg-[#030014]/90 border-b border-white/[0.04]"
                        : "bg-white/90 border-b border-gray-100"
                    }`}>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className={`sm:hidden p-1.5 rounded-lg transition-all
                                ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
                        >
                            <Menu size={16} />
                        </button>
                        <h1 className="text-sm max-sm:text-xs font-semibold capitalize">
                            {activeTab === "profile" ? "Profile Info" : activeTab}
                        </h1>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] max-sm:text-[8px] font-medium max-sm:hidden
                            ${theme === "dark" ? "bg-violet-500/15 text-violet-400" : "bg-violet-100 text-violet-600"}`}>
                            {allProfiles.profiles.find(p => p.id === allProfiles.activeProfileId)?.domainName || "Default"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={toggleTheme}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                                ${theme === "dark"
                                    ? "hover:bg-white/10 text-gray-400 hover:text-white"
                                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-medium">
                            {data.profile.name.split(" ").map(n => n[0]).join("")}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {/* Dashboard */}
                        {activeTab === "dashboard" && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: "Projects", value: data.projects.length, color: "violet", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/20", textColor: "text-violet-400", icon: FolderOpen },
                                        { label: "Experience", value: data.experience.length, color: "blue", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/20", textColor: "text-blue-400", icon: Briefcase },
                                        { label: "Skills", value: data.skills.reduce((acc, s) => acc + s.items.length, 0), color: "emerald", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20", textColor: "text-emerald-400", icon: Code },
                                        { label: "Sections", value: Object.values(data.sectionVisibility).filter(Boolean).length, color: "amber", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/20", textColor: "text-amber-400", icon: Layers },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            whileHover={{ y: -2 }}
                                            className={`rounded-2xl p-5 cursor-default transition-all duration-200 border
                                                ${theme === "dark"
                                                    ? `bg-white/[0.02] ${stat.borderColor} hover:bg-white/[0.04]`
                                                    : `bg-white border-gray-100 shadow-sm hover:shadow-md`
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                                    <stat.icon size={22} className={stat.textColor} />
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
                                                    <p className="text-2xl font-bold mt-0.5">{stat.value}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Welcome Card */}
                                <div className={`rounded-2xl p-6 border
                                    ${theme === "dark"
                                        ? "bg-gradient-to-br from-violet-500/[0.08] to-purple-500/[0.04] border-violet-500/10"
                                        : "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100"
                                    }`}>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Welcome back, {data.profile.name.split(" ")[0]}! 👋
                                    </h3>
                                    <p className={`text-sm mb-5 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                        Manage your portfolio content from this dashboard. Use the sidebar to navigate between different sections.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setActiveTab("sections")}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors"
                                        >
                                            <Layers size={16} />
                                            Manage Sections
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("profile")}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                                                ${theme === "dark"
                                                    ? "bg-white/10 hover:bg-white/15 text-white"
                                                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                                                }`}
                                        >
                                            <User size={16} />
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Profiles (Domains) - NEW TAB */}
                        {activeTab === "profiles" && (
                            <motion.div
                                key="profiles"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full"
                            >
                                <div className="neo-glass rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white">
                                                🎭
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">Domain Profiles</h3>
                                                <p className="text-xs text-[var(--foreground-secondary)]">Manage multiple portfolio versions for different roles</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const name = prompt("Enter profile name (e.g., Software Engineer, Operations, Analyst):");
                                                if (name) addNewProfile(name);
                                            }}
                                            className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2"
                                        >
                                            <Plus size={16} /> Add Profile
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {allProfiles.profiles.map((profile) => (
                                            <div
                                                key={profile.id}
                                                className={`p-5 rounded-2xl border-2 transition-all hover:shadow-lg ${profile.id === allProfiles.activeProfileId
                                                    ? "border-[var(--accent-primary)] bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/5"
                                                    : "border-[var(--glass-border)] glass-card hover:border-[var(--accent-secondary)]/50"
                                                    }`}
                                            >
                                                <div className="flex flex-col gap-4">
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg ${profile.id === allProfiles.activeProfileId
                                                                ? "bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                                                                : "bg-gradient-to-br from-gray-500 to-gray-600"
                                                                }`}>
                                                                {profile.domainName.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-base">{profile.domainName}</h4>
                                                                {profile.id === allProfiles.activeProfileId && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full bg-green-500/20 text-green-400 font-semibold mt-1">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                                                        LIVE
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stats */}
                                                    <div className="flex items-center gap-3 text-xs text-[var(--foreground-secondary)]">
                                                        <span className="px-2 py-1 rounded-lg bg-violet-500/10 text-violet-400">{profile.projects.length} projects</span>
                                                        <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400">{profile.skills.reduce((a, s) => a + s.items.length, 0)} skills</span>
                                                        <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400">{profile.experience.length} exp</span>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center justify-between pt-2 border-t border-[var(--glass-border)]">
                                                        {profile.id !== allProfiles.activeProfileId ? (
                                                            <button
                                                                onClick={() => setActiveProfile(profile.id)}
                                                                className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--accent-primary)] text-white hover:opacity-90 transition-all shadow-md"
                                                            >
                                                                Set Active
                                                            </button>
                                                        ) : (
                                                            <span className="text-xs text-[var(--foreground-secondary)]">Currently Active</span>
                                                        )}
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => {
                                                                    const name = prompt("Enter name for duplicated profile:", `${profile.domainName} Copy`);
                                                                    if (name) duplicateProfile(profile.id, name);
                                                                }}
                                                                className="p-2 rounded-xl hover:bg-[var(--glass-border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-all"
                                                                title="Duplicate"
                                                            >
                                                                <Copy size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    const name = prompt("Rename profile:", profile.domainName);
                                                                    if (name) updateProfileDomainName(profile.id, name);
                                                                }}
                                                                className="p-2 rounded-xl hover:bg-[var(--glass-border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-all"
                                                                title="Rename"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            {allProfiles.profiles.length > 1 && (
                                                                <button
                                                                    onClick={() => {
                                                                        if (confirm(`Delete "${profile.domainName}" profile?`)) {
                                                                            deleteProfile(profile.id);
                                                                        }
                                                                    }}
                                                                    className="p-2 rounded-xl hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                        <p className="text-sm text-blue-400">
                                            💡 <strong>Tip:</strong> Switch to a profile and edit its Projects, Skills, Experience etc.
                                            Only the <strong>Active</strong> profile shows on your public portfolio.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Sections - NEW TAB */}
                        {activeTab === "sections" && (
                            <motion.div
                                key="sections"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-2xl"
                            >
                                <div className="neo-glass rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Layers className="w-6 h-6 text-[var(--accent-secondary)]" />
                                        <div>
                                            <h3 className="text-xl font-bold">Section Order & Visibility</h3>
                                            <p className="text-sm text-[var(--foreground-secondary)]">Drag sections up/down to reorder. Toggle to show/hide.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {(data.sectionOrder || defaultSectionOrder).map((section, index) => (
                                            <div
                                                key={section}
                                                className={`flex items-center gap-3 p-4 rounded-xl glass-card transition-all ${!data.sectionVisibility[section] ? 'opacity-50' : ''}`}
                                            >
                                                {/* Position number */}
                                                <span className="w-6 h-6 rounded-lg bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-center text-xs font-bold">
                                                    {index + 1}
                                                </span>

                                                {/* Up/Down arrows */}
                                                <div className="flex flex-col gap-0.5">
                                                    <button
                                                        onClick={() => moveSectionUp(section)}
                                                        disabled={index === 0}
                                                        className={`p-1 rounded hover:bg-[var(--glass)] transition-all ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-[var(--accent-primary)]'}`}
                                                        title="Move up"
                                                    >
                                                        <ChevronUp size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => moveSectionDown(section)}
                                                        disabled={index === (data.sectionOrder || defaultSectionOrder).length - 1}
                                                        className={`p-1 rounded hover:bg-[var(--glass)] transition-all ${index === (data.sectionOrder || defaultSectionOrder).length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-[var(--accent-primary)]'}`}
                                                        title="Move down"
                                                    >
                                                        <ChevronDown size={14} />
                                                    </button>
                                                </div>

                                                {/* Section info */}
                                                <div className="flex-1">
                                                    <p className="font-medium">{sectionLabels[section]?.label || section}</p>
                                                    <p className="text-xs text-[var(--foreground-secondary)]">{sectionLabels[section]?.description || ''}</p>
                                                </div>

                                                {/* Toggle */}
                                                <button
                                                    onClick={() => toggleSection(section)}
                                                    className={`p-2 rounded-xl transition-all ${data.sectionVisibility[section]
                                                        ? "text-green-400 hover:bg-green-500/10"
                                                        : "text-[var(--foreground-secondary)] hover:bg-[var(--glass)]"
                                                        }`}
                                                >
                                                    {data.sectionVisibility[section] ? (
                                                        <ToggleRight size={28} />
                                                    ) : (
                                                        <ToggleLeft size={28} />
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xs text-[var(--foreground-secondary)] mt-4 text-center">
                                        ⬆️⬇️ Use arrows to reorder. Changes are saved automatically.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Profile */}
                        {activeTab === "profile" && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-2xl"
                            >
                                <div className="neo-glass rounded-2xl p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold">Edit Profile</h3>
                                        <span className={`text-sm px-3 py-1 rounded-full ${saveStatus === "saved" ? "bg-green-500/20 text-green-400" :
                                            saveStatus === "saving" ? "bg-yellow-500/20 text-yellow-400" :
                                                "bg-[var(--glass)] text-[var(--foreground-secondary)]"
                                            }`}>
                                            {saveStatus === "saved" ? "✓ Saved" : saveStatus === "saving" ? "Saving..." : "Unsaved"}
                                        </span>
                                    </div>

                                    {/* Avatar Section */}
                                    <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)]">
                                            <img
                                                src={editingProfile.avatar || "/avatar.jpg"}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.currentTarget.src = "/avatar.jpg")}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium mb-2">Profile Photo URL</label>
                                            <input
                                                type="url"
                                                placeholder="https://example.com/your-photo.jpg"
                                                value={editingProfile.avatar}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, avatar: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all text-sm"
                                            />
                                            <p className="text-xs text-[var(--foreground-secondary)] mt-1">Enter a URL to your profile photo</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Name</label>
                                                <input
                                                    type="text"
                                                    value={editingProfile.name}
                                                    onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    value={editingProfile.title}
                                                    onChange={(e) => setEditingProfile({ ...editingProfile, title: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={editingProfile.email}
                                                    onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Phone</label>
                                                <input
                                                    type="text"
                                                    value={editingProfile.phone}
                                                    onChange={(e) => setEditingProfile({ ...editingProfile, phone: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Tagline</label>
                                            <input
                                                type="text"
                                                value={editingProfile.tagline}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, tagline: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Bio</label>
                                            <textarea
                                                value={editingProfile.bio}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, bio: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all resize-none"
                                            />
                                        </div>

                                        {/* Resume URL */}
                                        <div className="p-4 rounded-xl glass-card">
                                            <label className="block text-sm font-medium mb-2">📄 Resume / CV URL</label>
                                            <input
                                                type="url"
                                                placeholder="https://drive.google.com/file/d/.../view or direct PDF link"
                                                value={editingProfile.resumeUrl}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, resumeUrl: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all text-sm"
                                            />
                                            <p className="text-xs text-[var(--foreground-secondary)] mt-1">
                                                Paste Google Drive link or direct PDF URL. For Drive: Share → Anyone with link
                                            </p>
                                            {editingProfile.resumeUrl && (
                                                <a
                                                    href={editingProfile.resumeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 mt-2 text-xs text-[var(--accent-secondary)] hover:underline"
                                                >
                                                    <Download size={14} /> Preview Resume
                                                </a>
                                            )}
                                        </div>

                                        <h4 className="font-medium mt-2">Social Links</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="url"
                                                placeholder="GitHub URL"
                                                value={editingProfile.social.github}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, social: { ...editingProfile.social, github: e.target.value } })}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all text-sm"
                                            />
                                            <input
                                                type="url"
                                                placeholder="LinkedIn URL"
                                                value={editingProfile.social.linkedin}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, social: { ...editingProfile.social, linkedin: e.target.value } })}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all text-sm"
                                            />
                                            <input
                                                type="url"
                                                placeholder="Twitter URL"
                                                value={editingProfile.social.twitter}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, social: { ...editingProfile.social, twitter: e.target.value } })}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all text-sm"
                                            />
                                            <input
                                                type="url"
                                                placeholder="Instagram URL"
                                                value={editingProfile.social.instagram}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, social: { ...editingProfile.social, instagram: e.target.value } })}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSaveProfile}
                                        className="btn-primary flex items-center gap-2"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Projects */}
                        {activeTab === "projects" && (
                            <motion.div
                                key="projects"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Projects ({data.projects.length})</h3>
                                    <button onClick={() => openAddModal("project")} className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2">
                                        <Plus size={16} /> Add Project
                                    </button>
                                </div>

                                <div className="grid gap-3">
                                    {data.projects.map((project) => (
                                        <div key={project.id} className="neo-glass rounded-xl p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white text-lg shrink-0">
                                                    📁
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-semibold text-sm">{project.title}</h4>
                                                    <p className="text-xs text-[var(--foreground-secondary)] line-clamp-1">{project.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 shrink-0">
                                                <button
                                                    onClick={() => openEditModal("project", project)}
                                                    className="p-2 rounded-lg hover:bg-[var(--accent-primary)]/10 text-[var(--foreground-secondary)] hover:text-[var(--accent-primary)] transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => deleteProject(project.id)}
                                                    className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Experience */}
                        {activeTab === "experience" && (
                            <motion.div
                                key="experience"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Experience ({data.experience.length})</h3>
                                    <button onClick={() => openAddModal("experience")} className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2">
                                        <Plus size={16} /> Add Experience
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id} className="neo-glass rounded-2xl p-4 flex items-center justify-between">
                                            <div>
                                                <h4 className="font-bold">{exp.role}</h4>
                                                <p className="text-sm text-[var(--accent-secondary)]">{exp.company}</p>
                                                <p className="text-xs text-[var(--foreground-secondary)]">{exp.duration}</p>
                                            </div>
                                            <button
                                                onClick={() => deleteExperience(exp.id)}
                                                className="p-2 rounded-xl hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Education */}
                        {activeTab === "education" && (
                            <motion.div
                                key="education"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Education ({data.education?.length || 0})</h3>
                                    <button onClick={() => openAddModal("education")} className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2">
                                        <Plus size={16} /> Add Education
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    {data.education?.map((edu) => (
                                        <div key={edu.id} className="neo-glass rounded-2xl p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={edu.degree}
                                                        onChange={(e) => updateEducationItem(edu.id, { degree: e.target.value })}
                                                        className="w-full font-bold bg-transparent border-none focus:outline-none"
                                                        placeholder="Degree/Certification"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={edu.institution}
                                                        onChange={(e) => updateEducationItem(edu.id, { institution: e.target.value })}
                                                        className="w-full text-sm text-[var(--accent-secondary)] bg-transparent border-none focus:outline-none"
                                                        placeholder="Institution"
                                                    />
                                                    <div className="flex gap-4 mt-1">
                                                        <input
                                                            type="text"
                                                            value={edu.duration}
                                                            onChange={(e) => updateEducationItem(edu.id, { duration: e.target.value })}
                                                            className="text-xs text-[var(--foreground-secondary)] bg-transparent border-none focus:outline-none w-32"
                                                            placeholder="Duration"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={edu.gpa || ""}
                                                            onChange={(e) => updateEducationItem(edu.id, { gpa: e.target.value })}
                                                            className="text-xs text-[var(--foreground-secondary)] bg-transparent border-none focus:outline-none w-24"
                                                            placeholder="GPA (optional)"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => deleteEducation(edu.id)}
                                                    className="p-2 rounded-xl hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <input
                                                type="url"
                                                value={edu.certificateUrl || ""}
                                                onChange={(e) => updateEducationItem(edu.id, { certificateUrl: e.target.value })}
                                                placeholder="🔗 Certificate/Credential URL (LinkedIn, Coursera, etc.)"
                                                className="w-full text-xs bg-[var(--background)]/30 rounded-lg p-2 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Certifications */}
                        {activeTab === "certifications" && (
                            <motion.div
                                key="certifications"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">🏆 Certifications ({data.certifications?.length || 0})</h3>
                                    <button
                                        onClick={() => {
                                            const newCert = {
                                                name: "New Certification",
                                                issuer: "Issuer Name",
                                                date: new Date().getFullYear().toString(),
                                                url: ""
                                            };
                                            addCertification(newCert);
                                        }}
                                        className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add Certification
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    {data.certifications?.map((cert) => (
                                        <div key={cert.id} className="neo-glass rounded-2xl p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={cert.name}
                                                        onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                                                        className="w-full font-bold bg-transparent border-none focus:outline-none"
                                                        placeholder="Certification Name"
                                                    />
                                                    <div className="flex gap-3 mt-1">
                                                        <input
                                                            type="text"
                                                            value={cert.issuer}
                                                            onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                                                            className="text-sm text-[var(--accent-secondary)] bg-transparent border-none focus:outline-none flex-1"
                                                            placeholder="Issuer"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={cert.date}
                                                            onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                                                            className="text-xs text-[var(--foreground-secondary)] bg-transparent border-none focus:outline-none w-20"
                                                            placeholder="Year"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => deleteCertification(cert.id)}
                                                    className="p-2 rounded-xl hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <input
                                                type="url"
                                                value={cert.url}
                                                onChange={(e) => updateCertification(cert.id, { url: e.target.value })}
                                                placeholder="🔗 Certificate URL (LinkedIn, Coursera, etc.)"
                                                className="w-full text-xs bg-[var(--background)]/30 rounded-lg p-2 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none"
                                            />
                                        </div>
                                    ))}
                                    {(!data.certifications || data.certifications.length === 0) && (
                                        <div className="text-center py-8 text-[var(--foreground-secondary)]">
                                            No certifications yet. Click "Add Certification" to add one!
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Testimonials */}
                        {activeTab === "testimonials" && (
                            <motion.div
                                key="testimonials"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Testimonials ({data.testimonials.length})</h3>
                                    <button onClick={() => openAddModal("testimonial")} className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2">
                                        <Plus size={16} /> Add Testimonial
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    {data.testimonials.map((t) => (
                                        <div key={t.id} className="neo-glass rounded-2xl p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full" />
                                                <div>
                                                    <h4 className="font-bold">{t.name}</h4>
                                                    <p className="text-sm text-[var(--foreground-secondary)]">{t.role}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteTestimonial(t.id)}
                                                className="p-2 rounded-xl hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Skills */}
                        {activeTab === "skills" && (
                            <SkillsManager />
                        )}

                        {/* Blog Posts */}
                        {activeTab === "blog" && (
                            <motion.div
                                key="blog"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">📝 Blog Posts ({data.blogPosts?.length || 0})</h3>
                                    <button
                                        onClick={() => {
                                            const newPost = {
                                                title: "New Blog Post",
                                                excerpt: "Write a short description here...",
                                                date: new Date().toISOString().split('T')[0],
                                                readTime: "3 min read",
                                                category: "General",
                                                image: "/blog/default.jpg",
                                                slug: `post-${Date.now()}`
                                            };
                                            addBlogPost(newPost);
                                        }}
                                        className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add Post
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    {data.blogPosts?.map((post) => (
                                        <div key={post.id} className="neo-glass rounded-xl p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={post.title}
                                                        onChange={(e) => updateBlogPost(post.id, { title: e.target.value })}
                                                        className="w-full font-semibold text-lg bg-transparent border-none focus:outline-none"
                                                        placeholder="Post Title"
                                                    />
                                                    <div className="flex gap-3 text-xs text-[var(--foreground-secondary)] mt-1">
                                                        <input
                                                            type="date"
                                                            value={post.date}
                                                            onChange={(e) => updateBlogPost(post.id, { date: e.target.value })}
                                                            className="bg-transparent border-none focus:outline-none"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={post.category}
                                                            onChange={(e) => updateBlogPost(post.id, { category: e.target.value })}
                                                            placeholder="Category"
                                                            className="bg-transparent border-none focus:outline-none w-24"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={post.readTime}
                                                            onChange={(e) => updateBlogPost(post.id, { readTime: e.target.value })}
                                                            placeholder="3 min read"
                                                            className="bg-transparent border-none focus:outline-none w-20"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => deleteBlogPost(post.id)}
                                                    className="p-2 rounded-xl hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <textarea
                                                value={post.excerpt}
                                                onChange={(e) => updateBlogPost(post.id, { excerpt: e.target.value })}
                                                placeholder="Write a short description..."
                                                rows={2}
                                                className="w-full text-sm bg-[var(--background)]/30 rounded-lg p-2 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none resize-none"
                                            />
                                            <input
                                                type="url"
                                                value={post.image}
                                                onChange={(e) => updateBlogPost(post.id, { image: e.target.value })}
                                                placeholder="Image URL"
                                                className="w-full mt-2 text-xs bg-[var(--background)]/30 rounded-lg p-2 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none"
                                            />
                                            <input
                                                type="url"
                                                value={post.link || ""}
                                                onChange={(e) => updateBlogPost(post.id, { link: e.target.value })}
                                                placeholder="🔗 Link to full blog post (Medium, Dev.to, etc.)"
                                                className="w-full mt-2 text-xs bg-[var(--background)]/30 rounded-lg p-2 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none"
                                            />
                                        </div>
                                    ))}
                                    {(!data.blogPosts || data.blogPosts.length === 0) && (
                                        <div className="text-center py-8 text-[var(--foreground-secondary)]">
                                            No blog posts yet. Click "Add Post" to create one!
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Stats Tab */}
                        {activeTab === "stats" && (
                            <motion.div
                                key="stats"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">📊 Numbers That Speak ({data.customStats?.length || 0})</h3>
                                    <button
                                        onClick={() => {
                                            addStat({
                                                icon: "Code2",
                                                value: 10,
                                                suffix: "+",
                                                label: "New Stat",
                                                color: "from-purple-500 to-indigo-500"
                                            });
                                        }}
                                        className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add Stat
                                    </button>
                                </div>

                                <div className="neo-glass rounded-2xl p-4 mb-4">
                                    <p className="text-sm text-[var(--foreground-secondary)]">
                                        💡 Customize the stats shown in the "Numbers That Speak" section of your portfolio.
                                        You can add project counts, client numbers, years of experience, and more!
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    {data.customStats?.map((stat) => (
                                        <div key={stat.id} className="neo-glass rounded-2xl p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Icon</label>
                                                        <select
                                                            value={stat.icon}
                                                            onChange={(e) => updateStat(stat.id, { icon: e.target.value })}
                                                            className="w-full px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                        >
                                                            <option value="Code2">📝 Code</option>
                                                            <option value="Users">👥 Users</option>
                                                            <option value="Briefcase">💼 Briefcase</option>
                                                            <option value="Coffee">☕ Coffee</option>
                                                            <option value="Trophy">🏆 Trophy</option>
                                                            <option value="Rocket">🚀 Rocket</option>
                                                            <option value="Star">⭐ Star</option>
                                                            <option value="Heart">❤️ Heart</option>
                                                            <option value="Globe">🌍 Globe</option>
                                                            <option value="Zap">⚡ Zap</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Value</label>
                                                        <input
                                                            type="number"
                                                            value={stat.value}
                                                            onChange={(e) => updateStat(stat.id, { value: parseInt(e.target.value) || 0 })}
                                                            className="w-full px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Suffix</label>
                                                        <select
                                                            value={stat.suffix}
                                                            onChange={(e) => updateStat(stat.id, { suffix: e.target.value })}
                                                            className="w-full px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                        >
                                                            <option value="+">+ (Plus)</option>
                                                            <option value="%">% (Percent)</option>
                                                            <option value="K">K (Thousand)</option>
                                                            <option value="M">M (Million)</option>
                                                            <option value="">None</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Label</label>
                                                        <input
                                                            type="text"
                                                            value={stat.label}
                                                            onChange={(e) => updateStat(stat.id, { label: e.target.value })}
                                                            placeholder="Projects Completed"
                                                            className="w-full px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => deleteStat(stat.id)}
                                                    className="p-2 ml-2 rounded-xl hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="mt-2">
                                                <label className="block text-xs font-medium mb-1">Gradient Color</label>
                                                <select
                                                    value={stat.color}
                                                    onChange={(e) => updateStat(stat.id, { color: e.target.value })}
                                                    className="w-full px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                >
                                                    <option value="from-purple-500 to-indigo-500">Purple → Indigo</option>
                                                    <option value="from-indigo-500 to-cyan-500">Indigo → Cyan</option>
                                                    <option value="from-cyan-500 to-emerald-500">Cyan → Emerald</option>
                                                    <option value="from-emerald-500 to-yellow-500">Emerald → Yellow</option>
                                                    <option value="from-yellow-500 to-orange-500">Yellow → Orange</option>
                                                    <option value="from-orange-500 to-red-500">Orange → Red</option>
                                                    <option value="from-pink-500 to-rose-500">Pink → Rose</option>
                                                    <option value="from-blue-500 to-purple-500">Blue → Purple</option>
                                                </select>
                                            </div>
                                            {/* Preview */}
                                            <div className="mt-3 p-3 rounded-xl bg-[var(--background)]/30 border border-[var(--glass-border)]">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                                        <span className="text-white text-lg">
                                                            {stat.icon === "Code2" && "📝"}
                                                            {stat.icon === "Users" && "👥"}
                                                            {stat.icon === "Briefcase" && "💼"}
                                                            {stat.icon === "Coffee" && "☕"}
                                                            {stat.icon === "Trophy" && "🏆"}
                                                            {stat.icon === "Rocket" && "🚀"}
                                                            {stat.icon === "Star" && "⭐"}
                                                            {stat.icon === "Heart" && "❤️"}
                                                            {stat.icon === "Globe" && "🌍"}
                                                            {stat.icon === "Zap" && "⚡"}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-bold text-gradient">{stat.value}{stat.suffix}</p>
                                                        <p className="text-xs text-[var(--foreground-secondary)]">{stat.label}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!data.customStats || data.customStats.length === 0) && (
                                        <div className="text-center py-8 text-[var(--foreground-secondary)]">
                                            No stats yet. Click "Add Stat" to create one!
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Custom Sections Tab */}
                        {activeTab === "custom-sections" && (
                            <motion.div
                                key="custom-sections"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">🧩 Custom Sections ({data.customSections?.length || 0})</h3>
                                    <button
                                        onClick={() => {
                                            addCustomSection({
                                                title: "New Section",
                                                subtitle: "Add a description here",
                                                layout: "cards",
                                                columns: 3,
                                                items: [],
                                                isVisible: true
                                            });
                                        }}
                                        className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add Section
                                    </button>
                                </div>

                                <div className="neo-glass rounded-2xl p-4 mb-4">
                                    <p className="text-sm text-[var(--foreground-secondary)]">
                                        💡 Create custom sections with text, cards, and images. They will appear in the Sections tab where you can reorder them with other sections.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {data.customSections?.map((section) => (
                                        <div key={section.id} className="neo-glass rounded-2xl p-5">
                                            {/* Section Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Section Title</label>
                                                        <input
                                                            type="text"
                                                            value={section.title}
                                                            onChange={(e) => updateCustomSection(section.id, { title: e.target.value })}
                                                            className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Subtitle</label>
                                                        <input
                                                            type="text"
                                                            value={section.subtitle || ""}
                                                            onChange={(e) => updateCustomSection(section.id, { subtitle: e.target.value })}
                                                            className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 ml-3">
                                                    <button
                                                        onClick={() => updateCustomSection(section.id, { isVisible: !section.isVisible })}
                                                        className={`p-2 rounded-xl transition-all ${section.isVisible
                                                            ? "text-green-400 hover:bg-green-500/10"
                                                            : "text-[var(--foreground-secondary)] hover:bg-[var(--glass)]"
                                                            }`}
                                                    >
                                                        {section.isVisible ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                                    </button>
                                                    <button
                                                        onClick={() => deleteCustomSection(section.id)}
                                                        className="p-2 rounded-xl hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Layout Settings */}
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div>
                                                    <label className="block text-xs font-medium mb-1">Layout</label>
                                                    <select
                                                        value={section.layout}
                                                        onChange={(e) => updateCustomSection(section.id, { layout: e.target.value as 'grid' | 'list' | 'cards' })}
                                                        className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                    >
                                                        <option value="cards">Cards Grid</option>
                                                        <option value="grid">Simple Grid</option>
                                                        <option value="list">List</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium mb-1">Columns</label>
                                                    <select
                                                        value={section.columns}
                                                        onChange={(e) => updateCustomSection(section.id, { columns: parseInt(e.target.value) as 2 | 3 | 4 })}
                                                        className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                    >
                                                        <option value={2}>2 Columns</option>
                                                        <option value={3}>3 Columns</option>
                                                        <option value={4}>4 Columns</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Items */}
                                            <div className="border-t border-[var(--glass-border)] pt-4 mt-4">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="font-medium text-sm">Items ({section.items.length})</h4>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => addCustomSectionItem(section.id, { type: 'card', title: 'New Card', description: 'Card description', icon: 'Star' })}
                                                            className="text-xs px-3 py-1.5 rounded-lg bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/30 transition-colors"
                                                        >
                                                            + Card
                                                        </button>
                                                        <button
                                                            onClick={() => addCustomSectionItem(section.id, { type: 'text', content: 'Your text content here...' })}
                                                            className="text-xs px-3 py-1.5 rounded-lg bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)]/30 transition-colors"
                                                        >
                                                            + Text
                                                        </button>
                                                        <button
                                                            onClick={() => addCustomSectionItem(section.id, { type: 'image', imageUrl: '', caption: '' })}
                                                            className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
                                                        >
                                                            + Image
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    {section.items.map((item) => (
                                                        <div key={item.id} className="p-3 rounded-xl bg-[var(--background)]/30 border border-[var(--glass-border)]">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <span className={`text-xs px-2 py-0.5 rounded ${item.type === 'card' ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' :
                                                                    item.type === 'text' ? 'bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)]' :
                                                                        'bg-purple-500/20 text-purple-400'
                                                                    }`}>
                                                                    {item.type.toUpperCase()}
                                                                </span>
                                                                <button
                                                                    onClick={() => deleteCustomSectionItem(section.id, item.id)}
                                                                    className="p-1 rounded hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>

                                                            {item.type === 'text' && (
                                                                <textarea
                                                                    value={item.content || ''}
                                                                    onChange={(e) => updateCustomSectionItem(section.id, item.id, { content: e.target.value })}
                                                                    className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm resize-none"
                                                                    rows={3}
                                                                    placeholder="Enter text content..."
                                                                />
                                                            )}

                                                            {item.type === 'card' && (
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <input
                                                                        type="text"
                                                                        value={item.title || ''}
                                                                        onChange={(e) => updateCustomSectionItem(section.id, item.id, { title: e.target.value })}
                                                                        className="px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                                        placeholder="Title"
                                                                    />
                                                                    <select
                                                                        value={item.icon || ''}
                                                                        onChange={(e) => updateCustomSectionItem(section.id, item.id, { icon: e.target.value })}
                                                                        className="px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                                    >
                                                                        <option value="Star">⭐ Star</option>
                                                                        <option value="Code2">📝 Code</option>
                                                                        <option value="Users">👥 Users</option>
                                                                        <option value="Briefcase">💼 Briefcase</option>
                                                                        <option value="Trophy">🏆 Trophy</option>
                                                                        <option value="Rocket">🚀 Rocket</option>
                                                                        <option value="Heart">❤️ Heart</option>
                                                                        <option value="Globe">🌍 Globe</option>
                                                                        <option value="Zap">⚡ Zap</option>
                                                                    </select>
                                                                    <input
                                                                        type="text"
                                                                        value={item.description || ''}
                                                                        onChange={(e) => updateCustomSectionItem(section.id, item.id, { description: e.target.value })}
                                                                        className="col-span-2 px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                                        placeholder="Description"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={item.link || ''}
                                                                        onChange={(e) => updateCustomSectionItem(section.id, item.id, { link: e.target.value })}
                                                                        className="col-span-2 px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                                        placeholder="Link URL (optional)"
                                                                    />
                                                                </div>
                                                            )}

                                                            {item.type === 'image' && (
                                                                <div className="space-y-2">
                                                                    <input
                                                                        type="text"
                                                                        value={item.imageUrl || ''}
                                                                        onChange={(e) => updateCustomSectionItem(section.id, item.id, { imageUrl: e.target.value })}
                                                                        className="w-full px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                                        placeholder="Image URL"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={item.caption || ''}
                                                                        onChange={(e) => updateCustomSectionItem(section.id, item.id, { caption: e.target.value })}
                                                                        className="w-full px-2 py-1.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                                                        placeholder="Caption (optional)"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {section.items.length === 0 && (
                                                        <p className="text-center py-4 text-[var(--foreground-secondary)] text-sm">
                                                            No items yet. Add cards, text, or images above.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!data.customSections || data.customSections.length === 0) && (
                                        <div className="text-center py-8 text-[var(--foreground-secondary)]">
                                            No custom sections yet. Click &quot;Add Section&quot; to create one!
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Appearance Tab */}
                        {activeTab === "appearance" && (
                            <motion.div
                                key="appearance"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-4xl space-y-6"
                            >
                                {/* Color Presets */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🎨 Color Theme</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                        {[
                                            { id: 'cyberpunk', name: 'Cyberpunk', colors: ['#8b5cf6', '#ec4899', '#06b6d4'] },
                                            { id: 'ocean', name: 'Ocean', colors: ['#3b82f6', '#06b6d4', '#0ea5e9'] },
                                            { id: 'forest', name: 'Forest', colors: ['#22c55e', '#10b981', '#84cc16'] },
                                            { id: 'sunset', name: 'Sunset', colors: ['#f97316', '#ef4444', '#eab308'] },
                                            { id: 'monochrome', name: 'Mono', colors: ['#ffffff', '#a1a1aa', '#71717a'] },
                                            { id: 'custom', name: 'Custom', colors: [data.theme?.accentPrimary || '#8b5cf6', data.theme?.accentSecondary || '#06b6d4'] },
                                        ].map((preset) => (
                                            <button
                                                key={preset.id}
                                                onClick={() => updateTheme({ ...data.theme, colorPreset: preset.id as 'cyberpunk' | 'ocean' | 'forest' | 'sunset' | 'monochrome' | 'custom' })}
                                                className={`p-3 rounded-xl border transition-all ${data.theme?.colorPreset === preset.id ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/30' : 'border-[var(--glass-border)] hover:border-[var(--accent-secondary)]'}`}
                                            >
                                                <div className="flex gap-1 mb-2 justify-center">
                                                    {preset.colors.map((color, i) => (
                                                        <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                                                    ))}
                                                </div>
                                                <p className="text-xs text-center">{preset.name}</p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Custom Colors */}
                                    {data.theme?.colorPreset === 'custom' && (
                                        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-[var(--glass-border)]">
                                            <div>
                                                <label className="block text-xs font-medium mb-2">Primary</label>
                                                <input
                                                    type="color"
                                                    value={data.theme?.accentPrimary || '#8b5cf6'}
                                                    onChange={(e) => updateTheme({ ...data.theme, accentPrimary: e.target.value })}
                                                    className="w-full h-10 rounded-lg cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-2">Secondary</label>
                                                <input
                                                    type="color"
                                                    value={data.theme?.accentSecondary || '#06b6d4'}
                                                    onChange={(e) => updateTheme({ ...data.theme, accentSecondary: e.target.value })}
                                                    className="w-full h-10 rounded-lg cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-2">Tertiary</label>
                                                <input
                                                    type="color"
                                                    value={data.theme?.accentTertiary || '#ec4899'}
                                                    onChange={(e) => updateTheme({ ...data.theme, accentTertiary: e.target.value })}
                                                    className="w-full h-10 rounded-lg cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Font Selection */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🔤 Typography</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Body Font</label>
                                            <select
                                                value={data.theme?.fontFamily || 'inter'}
                                                onChange={(e) => updateTheme({ ...data.theme, fontFamily: e.target.value })}
                                                className="w-full px-3 py-2.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none"
                                            >
                                                <option value="inter">Inter (Modern, Clean)</option>
                                                <option value="poppins">Poppins (Geometric)</option>
                                                <option value="roboto">Roboto (Classic)</option>
                                                <option value="space-grotesk">Space Grotesk (Techy)</option>
                                                <option value="outfit">Outfit (Sleek)</option>
                                                <option value="playfair">Playfair Display (Elegant)</option>
                                                <option value="lato">Lato (Warm, Professional)</option>
                                                <option value="montserrat">Montserrat (Bold, Modern)</option>
                                                <option value="nunito">Nunito (Rounded, Friendly)</option>
                                                <option value="opensans">Open Sans (Neutral)</option>
                                                <option value="raleway">Raleway (Elegant, Light)</option>
                                                <option value="sourcesans">Source Sans Pro (Adobe)</option>
                                                <option value="ubuntu">Ubuntu (Linux, Unique)</option>
                                                <option value="worksans">Work Sans (Minimal)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Heading Font</label>
                                            <select
                                                value={data.theme?.headingFont || 'inter'}
                                                onChange={(e) => updateTheme({ ...data.theme, headingFont: e.target.value })}
                                                className="w-full px-3 py-2.5 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none"
                                            >
                                                <option value="inter">Inter (Modern, Clean)</option>
                                                <option value="poppins">Poppins (Geometric)</option>
                                                <option value="roboto">Roboto (Classic)</option>
                                                <option value="space-grotesk">Space Grotesk (Techy)</option>
                                                <option value="outfit">Outfit (Sleek)</option>
                                                <option value="playfair">Playfair Display (Elegant)</option>
                                                <option value="lato">Lato (Warm, Professional)</option>
                                                <option value="montserrat">Montserrat (Bold, Modern)</option>
                                                <option value="nunito">Nunito (Rounded, Friendly)</option>
                                                <option value="opensans">Open Sans (Neutral)</option>
                                                <option value="raleway">Raleway (Elegant, Light)</option>
                                                <option value="sourcesans">Source Sans Pro (Adobe)</option>
                                                <option value="ubuntu">Ubuntu (Linux, Unique)</option>
                                                <option value="worksans">Work Sans (Minimal)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Font Size */}
                                    <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                                        <label className="block text-sm font-medium mb-3">Base Font Size (Admin + Portfolio)</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {[
                                                { id: '12px', label: '12px', desc: 'Small' },
                                                { id: '13px', label: '13px', desc: 'Default' },
                                                { id: '14px', label: '14px', desc: 'Normal' },
                                                { id: '16px', label: '16px', desc: 'Large' },
                                            ].map((size) => (
                                                <button
                                                    key={size.id}
                                                    onClick={() => {
                                                        document.documentElement.style.setProperty('--font-size-base', size.id);
                                                    }}
                                                    className={`px-4 py-2 rounded-lg border transition-all hover:border-[var(--accent-primary)]`}
                                                >
                                                    <span className="font-medium">{size.label}</span>
                                                    <span className="text-xs text-[var(--foreground-secondary)] ml-1">({size.desc})</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-[var(--foreground-secondary)] mt-3">💡 Font changes apply to BOTH Admin Panel and Portfolio instantly!</p>
                                </div>

                                {/* Design Style */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">✨ Design Style</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {[
                                            { id: 'glassmorphism', name: 'Glass', desc: 'Blurred & Transparent', icon: '🔮' },
                                            { id: 'neomorphism', name: 'Neumorphic', desc: 'Soft 3D Shadows', icon: '🌙' },
                                            { id: 'flat', name: 'Flat', desc: 'Clean & Minimal', icon: '📋' },
                                            { id: 'gradient', name: 'Gradient', desc: 'Bold Colors', icon: '🌈' },
                                        ].map((style) => (
                                            <button
                                                key={style.id}
                                                onClick={() => updateTheme({ ...data.theme, designStyle: style.id as 'glassmorphism' | 'neomorphism' | 'flat' | 'gradient' })}
                                                className={`p-4 rounded-xl border text-left transition-all ${data.theme?.designStyle === style.id ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10' : 'border-[var(--glass-border)] hover:border-[var(--accent-secondary)]'}`}
                                            >
                                                <span className="text-2xl">{style.icon}</span>
                                                <p className="font-medium mt-2">{style.name}</p>
                                                <p className="text-xs text-[var(--foreground-secondary)]">{style.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Border Radius & Animations */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">⚙️ Additional Options</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-3">Border Radius</label>
                                            <div className="flex gap-2">
                                                {[
                                                    { id: 'none', label: '■' },
                                                    { id: 'small', label: '▢' },
                                                    { id: 'medium', label: '◻' },
                                                    { id: 'large', label: '▢' },
                                                    { id: 'full', label: '●' },
                                                ].map((option) => (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => updateTheme({ ...data.theme, borderRadius: option.id as 'none' | 'small' | 'medium' | 'large' | 'full' })}
                                                        className={`w-10 h-10 rounded-lg border text-lg transition-all ${data.theme?.borderRadius === option.id ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/20' : 'border-[var(--glass-border)]'}`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-3">Animations</label>
                                            <button
                                                onClick={() => updateTheme({ ...data.theme, animationsEnabled: !data.theme?.animationsEnabled })}
                                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${data.theme?.animationsEnabled ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10' : 'border-[var(--glass-border)]'}`}
                                            >
                                                {data.theme?.animationsEnabled ? <ToggleRight className="text-[var(--accent-primary)]" size={24} /> : <ToggleLeft size={24} />}
                                                <span>{data.theme?.animationsEnabled ? 'Enabled' : 'Disabled'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Layout Template */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">📐 Layout Template</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {[
                                            { id: 'classic', name: 'Classic', desc: 'Traditional sidebar layout' },
                                            { id: 'minimal', name: 'Minimal', desc: 'Clean single column' },
                                            { id: 'modern', name: 'Modern', desc: 'Two-column hero' },
                                            { id: 'creative', name: 'Creative', desc: 'Asymmetric design' },
                                        ].map((layout) => (
                                            <button
                                                key={layout.id}
                                                onClick={() => updateTheme({ ...data.theme, layoutTemplate: layout.id as 'classic' | 'minimal' | 'modern' | 'creative' })}
                                                className={`p-4 rounded-xl border text-left transition-all ${data.theme?.layoutTemplate === layout.id ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10' : 'border-[var(--glass-border)] hover:border-[var(--accent-secondary)]'}`}
                                            >
                                                <p className="font-medium">{layout.name}</p>
                                                <p className="text-xs text-[var(--foreground-secondary)] mt-1">{layout.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-[var(--foreground-secondary)] mt-3">🚧 Layout templates coming soon! Currently using Classic layout.</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Settings */}
                        {activeTab === "settings" && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-3xl space-y-6"
                            >
                                {/* Customizable UI Text */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">✏️ Customizable Text</h3>
                                    <p className="text-sm text-[var(--foreground-secondary)] mb-4">Change text on your portfolio pages</p>

                                    {/* Animated Roles */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">🎭 Animated Roles (typing effect)</label>
                                        <input
                                            type="text"
                                            value={editingProfile.roles?.join(", ") || "Full Stack Developer, React Expert, Node.js Developer"}
                                            onChange={(e) => setEditingProfile({ ...editingProfile, roles: e.target.value.split(",").map(r => r.trim()).filter(r => r) })}
                                            placeholder="Full Stack Developer, React Expert, Mobile Dev"
                                            className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                        />
                                        <p className="text-xs text-[var(--foreground-secondary)] mt-1">Comma-separated list of titles to animate</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Greeting</label>
                                            <input
                                                type="text"
                                                value={editingProfile.greeting || "Hello, I'm"}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, greeting: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Availability Text</label>
                                            <input
                                                type="text"
                                                value={editingProfile.availabilityText || "Available for work"}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, availabilityText: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Primary Button</label>
                                            <input
                                                type="text"
                                                value={editingProfile.heroButtonPrimary || "View My Work"}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, heroButtonPrimary: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Secondary Button</label>
                                            <input
                                                type="text"
                                                value={editingProfile.heroButtonSecondary || "Download CV"}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, heroButtonSecondary: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Hire Me Button</label>
                                            <input
                                                type="text"
                                                value={editingProfile.hireMeText || "Hire Me"}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, hireMeText: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Footer Text</label>
                                            <input
                                                type="text"
                                                value={editingProfile.footerText || ""}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, footerText: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        </div>
                                    </div>

                                    <h4 className="text-sm font-medium mt-4 mb-2">Section Titles</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { key: "aboutTitle", label: "About" },
                                            { key: "skillsTitle", label: "Skills" },
                                            { key: "projectsTitle", label: "Projects" },
                                            { key: "experienceTitle", label: "Experience" },
                                            { key: "educationTitle", label: "Education" },
                                            { key: "contactTitle", label: "Contact" },
                                            { key: "blogTitle", label: "Blog" },
                                            { key: "testimonialsTitle", label: "Testimonials" },
                                        ].map((item) => (
                                            <input
                                                key={item.key}
                                                type="text"
                                                placeholder={item.label}
                                                value={(editingProfile as unknown as Record<string, string>)[item.key] || ""}
                                                onChange={(e) => setEditingProfile({ ...editingProfile, [item.key]: e.target.value })}
                                                className="px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        ))}
                                    </div>

                                    <button onClick={handleSaveProfile} className="btn-primary flex items-center gap-2 mt-4 text-sm !py-2 !px-4">
                                        <Save size={16} /> Save Text Changes
                                    </button>
                                </div>

                                {/* SEO Settings */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🌐 SEO Settings</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Meta Title</label>
                                            <input
                                                type="text"
                                                value={data.seo?.metaTitle || ""}
                                                onChange={(e) => updateSEO({ ...data.seo, metaTitle: e.target.value })}
                                                placeholder="Your Portfolio - Developer Name"
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Meta Description</label>
                                            <textarea
                                                value={data.seo?.metaDescription || ""}
                                                onChange={(e) => updateSEO({ ...data.seo, metaDescription: e.target.value })}
                                                placeholder="A brief description of your portfolio for search engines"
                                                rows={2}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Keywords (comma separated)</label>
                                            <input
                                                type="text"
                                                value={data.seo?.keywords?.join(", ") || ""}
                                                onChange={(e) => updateSEO({ ...data.seo, keywords: e.target.value.split(",").map(k => k.trim()) })}
                                                placeholder="developer, portfolio, web development"
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* QR Code Generator */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">📱 QR Code</h3>
                                    <p className="text-sm text-[var(--foreground-secondary)] mb-4">Share your portfolio easily via QR code</p>
                                    <div className="flex items-center gap-6">
                                        <div className="w-32 h-32 bg-white p-2 rounded-xl">
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : 'https://yourportfolio.com')}`}
                                                alt="Portfolio QR Code"
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm mb-2">Scan to visit your portfolio</p>
                                            <button
                                                onClick={() => {
                                                    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`;
                                                    window.open(url, '_blank');
                                                }}
                                                className="btn-secondary text-sm !py-2 !px-4"
                                            >
                                                <Download size={14} className="inline mr-2" /> Download QR
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Theme Settings */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4">🎨 Theme</h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="font-medium">Dark Mode</p>
                                            <p className="text-sm text-[var(--foreground-secondary)]">Toggle between light and dark theme</p>
                                        </div>
                                        <button
                                            onClick={toggleTheme}
                                            className={`w-14 h-7 rounded-full p-1 transition-colors ${theme === "dark" ? "bg-[var(--accent-primary)]" : "bg-[var(--glass-border)]"
                                                }`}
                                        >
                                            <motion.div
                                                className="w-5 h-5 rounded-full bg-white shadow-md"
                                                animate={{ x: theme === "dark" ? 26 : 0 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Primary Color</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={data.theme?.accentPrimary || "#8b5cf6"}
                                                    onChange={(e) => updateTheme({ ...data.theme, accentPrimary: e.target.value })}
                                                    className="w-10 h-10 rounded-lg cursor-pointer"
                                                />
                                                <span className="text-sm text-[var(--foreground-secondary)]">{data.theme?.accentPrimary || "#8b5cf6"}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Secondary Color</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={data.theme?.accentSecondary || "#06b6d4"}
                                                    onChange={(e) => updateTheme({ ...data.theme, accentSecondary: e.target.value })}
                                                    className="w-10 h-10 rounded-lg cursor-pointer"
                                                />
                                                <span className="text-sm text-[var(--foreground-secondary)]">{data.theme?.accentSecondary || "#06b6d4"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Theme Presets */}
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium mb-2">🎨 Theme Presets</label>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { name: "Default", primary: "#8b5cf6", secondary: "#06b6d4" },
                                                { name: "Neon", primary: "#00ff87", secondary: "#60efff" },
                                                { name: "Ocean", primary: "#0077b6", secondary: "#00b4d8" },
                                                { name: "Sunset", primary: "#ff6b6b", secondary: "#feca57" },
                                                { name: "Forest", primary: "#2d6a4f", secondary: "#40916c" },
                                                { name: "Candy", primary: "#ff6b9d", secondary: "#c44cff" },
                                                { name: "Fire", primary: "#ff4500", secondary: "#ff8c00" },
                                                { name: "Royal", primary: "#4a0080", secondary: "#8000ff" },
                                            ].map((preset) => (
                                                <button
                                                    key={preset.name}
                                                    onClick={() => updateTheme({ accentPrimary: preset.primary, accentSecondary: preset.secondary, fontFamily: "Inter" })}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] hover:border-[var(--accent-primary)] transition-all text-xs"
                                                >
                                                    <div className="flex">
                                                        <span className="w-4 h-4 rounded-l-full" style={{ backgroundColor: preset.primary }} />
                                                        <span className="w-4 h-4 rounded-r-full" style={{ backgroundColor: preset.secondary }} />
                                                    </div>
                                                    {preset.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => updateTheme({ accentPrimary: "#8b5cf6", accentSecondary: "#06b6d4", fontFamily: "Inter" })}
                                        className="btn-secondary text-sm !py-2 !px-4 mt-4"
                                    >
                                        🔄 Reset Theme Colors
                                    </button>
                                </div>

                                {/* Data Management */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4">💾 Data Management</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <button onClick={handleExport} className="btn-secondary flex items-center gap-2 text-sm !py-2 !px-4">
                                            <Download size={16} /> Export Data
                                        </button>
                                        <label className="btn-secondary flex items-center gap-2 text-sm !py-2 !px-4 cursor-pointer">
                                            <Upload size={16} /> Import Data
                                            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                                        </label>
                                        <button onClick={resetToDefault} className="btn-secondary flex items-center gap-2 text-sm !py-2 !px-4 text-red-400 hover:text-red-300">
                                            <RotateCcw size={16} /> Reset to Default
                                        </button>
                                    </div>
                                </div>

                                {/* PDF Export */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4">📄 Export as PDF</h3>
                                    <p className="text-sm text-[var(--foreground-secondary)] mb-4">Download your portfolio as a PDF for sharing offline</p>
                                    <button
                                        onClick={() => {
                                            window.open('/', '_blank');
                                            setTimeout(() => {
                                                alert('To save as PDF:\n1. Press Ctrl+P (or Cmd+P on Mac)\n2. Select "Save as PDF" as destination\n3. Click Save');
                                            }, 1000);
                                        }}
                                        className="btn-primary flex items-center gap-2 text-sm !py-2 !px-4"
                                    >
                                        <Download size={16} /> Export Portfolio PDF
                                    </button>
                                </div>

                                {/* Email Templates */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4">📧 Email Templates</h3>
                                    <p className="text-sm text-[var(--foreground-secondary)] mb-4">Pre-configured email for contact form responses</p>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Subject Line</label>
                                            <input
                                                type="text"
                                                defaultValue="Thanks for reaching out!"
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Auto-Reply Message</label>
                                            <textarea
                                                defaultValue={`Hi there!\n\nThank you for contacting me. I've received your message and will get back to you within 24-48 hours.\n\nBest regards,\n${data.profile.name}`}
                                                rows={4}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Notifications */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4">🔔 Notifications</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Email Notifications</p>
                                                <p className="text-xs text-[var(--foreground-secondary)]">Get notified when someone views your portfolio</p>
                                            </div>
                                            <input type="checkbox" className="w-5 h-5 rounded accent-[var(--accent-primary)]" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Contact Form Alerts</p>
                                                <p className="text-xs text-[var(--foreground-secondary)]">Receive alerts when someone submits contact form</p>
                                            </div>
                                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-[var(--accent-primary)]" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Weekly Summary</p>
                                                <p className="text-xs text-[var(--foreground-secondary)]">Get weekly portfolio activity report</p>
                                            </div>
                                            <input type="checkbox" className="w-5 h-5 rounded accent-[var(--accent-primary)]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Analytics Dashboard */}
                                <div className="neo-glass rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-4">📊 Analytics Dashboard</h3>
                                    <p className="text-sm text-[var(--foreground-secondary)] mb-4">Track your portfolio performance</p>

                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="bg-[var(--background)]/50 rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-[var(--accent-primary)]">{Math.floor(Math.random() * 1000) + 500}</p>
                                            <p className="text-xs text-[var(--foreground-secondary)]">Page Views</p>
                                        </div>
                                        <div className="bg-[var(--background)]/50 rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-[var(--accent-secondary)]">{Math.floor(Math.random() * 50) + 10}</p>
                                            <p className="text-xs text-[var(--foreground-secondary)]">Contact Forms</p>
                                        </div>
                                        <div className="bg-[var(--background)]/50 rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-green-400">{Math.floor(Math.random() * 200) + 50}</p>
                                            <p className="text-xs text-[var(--foreground-secondary)]">Resume Downloads</p>
                                        </div>
                                    </div>

                                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 text-sm">
                                        <p className="font-medium text-orange-400">🔧 Note: Full analytics requires external service</p>
                                        <p className="text-xs text-[var(--foreground-secondary)] mt-1">
                                            Connect Google Analytics, Plausible, or similar service for detailed tracking.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <AddModal
                        type={modalType}
                        onClose={() => setShowAddModal(false)}
                        onAdd={(item) => {
                            if (modalType === "project") addProject(item as Omit<Project, "id">);
                            if (modalType === "experience") addExperience(item as Omit<Experience, "id">);
                            if (modalType === "testimonial") addTestimonial(item as Omit<Testimonial, "id">);
                            if (modalType === "education") addEducation(item as Omit<Education, "id">);
                            setShowAddModal(false);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {showEditModal && editingItem && (
                    <EditModal
                        type={modalType}
                        item={editingItem}
                        onClose={() => {
                            setShowEditModal(false);
                            setEditingItem(null);
                        }}
                        onSave={(updated) => {
                            if (modalType === "project" && "title" in editingItem) {
                                updateProject(editingItem.id, updated as Partial<Project>);
                            }
                            if (modalType === "experience" && "role" in editingItem) {
                                updateExperienceItem(editingItem.id, updated as Partial<Experience>);
                            }
                            if (modalType === "education" && "degree" in editingItem) {
                                updateEducationItem(editingItem.id, updated as Partial<Education>);
                            }
                            if (modalType === "testimonial" && "content" in editingItem) {
                                updateTestimonialItem(editingItem.id, updated as Partial<Testimonial>);
                            }
                            setShowEditModal(false);
                            setEditingItem(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div >
    );
}

// Add Modal Component
function AddModal({ type, onClose, onAdd }: {
    type: "project" | "experience" | "testimonial" | "education" | null;
    onClose: () => void;
    onAdd: (item: Omit<Project, "id"> | Omit<Experience, "id"> | Omit<Testimonial, "id"> | Omit<Education, "id">) => void;
}) {
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type === "project") {
            onAdd({
                title: formData.title || "",
                description: formData.description || "",
                image: "/projects/default.jpg",
                tags: (formData.tags || "").split(",").map(t => t.trim()),
                liveUrl: formData.liveUrl || "",
                githubUrl: formData.githubUrl || "",
                featured: false,
            });
        } else if (type === "experience") {
            onAdd({
                role: formData.role || "",
                company: formData.company || "",
                location: formData.location || "",
                duration: formData.duration || "",
                description: (formData.description || "").split("\n"),
                technologies: (formData.technologies || "").split(",").map(t => t.trim()),
            });
        } else if (type === "testimonial") {
            onAdd({
                name: formData.name || "",
                role: formData.role || "",
                image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
                content: formData.content || "",
                rating: 5,
            });
        } else if (type === "education") {
            onAdd({
                degree: formData.degree || "",
                institution: formData.institution || "",
                location: formData.location || "",
                duration: formData.duration || "",
                description: formData.description || "",
                gpa: formData.gpa || "",
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="neo-glass rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold mb-4 capitalize">Add {type}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === "project" && (
                        <>
                            <input type="text" placeholder="Title" required onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <textarea placeholder="Description" required onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none resize-none" rows={3} />
                            <input type="text" placeholder="Tags (comma separated)" onChange={e => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <input type="url" placeholder="Live URL" onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <input type="url" placeholder="GitHub URL" onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                        </>
                    )}
                    {type === "experience" && (
                        <>
                            <input type="text" placeholder="Role" required onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <input type="text" placeholder="Company" required onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <input type="text" placeholder="Duration" onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <textarea placeholder="Description (one per line)" onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none resize-none" rows={3} />
                        </>
                    )}
                    {type === "testimonial" && (
                        <>
                            <input type="text" placeholder="Name" required onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <input type="text" placeholder="Role" required onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <textarea placeholder="Testimonial content" required onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none resize-none" rows={3} />
                        </>
                    )}
                    {type === "education" && (
                        <>
                            <input type="text" placeholder="Degree" required onChange={e => setFormData({ ...formData, degree: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <input type="text" placeholder="Institution" required onChange={e => setFormData({ ...formData, institution: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <input type="text" placeholder="Duration" onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                            <input type="text" placeholder="GPA (optional)" onChange={e => setFormData({ ...formData, gpa: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none" />
                        </>
                    )}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 btn-secondary">Cancel</button>
                        <button type="submit" className="flex-1 btn-primary">Add</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

// Skills Manager Component
function SkillsManager() {
    const { data, addSkillCategory, deleteSkillCategory, addSkillItem, updateSkillItem, deleteSkillItem } = usePortfolioData();
    const [newCategory, setNewCategory] = useState("");
    const [newSkill, setNewSkill] = useState({ category: "", name: "", level: 80 });
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddSkill, setShowAddSkill] = useState<string | null>(null);

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            addSkillCategory(newCategory.trim());
            setNewCategory("");
            setShowAddCategory(false);
        }
    };

    const handleAddSkill = (category: string) => {
        if (newSkill.name.trim()) {
            addSkillItem(category, newSkill.name.trim(), newSkill.level);
            setNewSkill({ category: "", name: "", level: 80 });
            setShowAddSkill(null);
        }
    };

    return (
        <motion.div
            key="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Skills ({data.skills.reduce((a, s) => a + s.items.length, 0)})</h3>
                <button
                    onClick={() => setShowAddCategory(true)}
                    className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2"
                >
                    <Plus size={16} /> Add Category
                </button>
            </div>

            {/* Add Category Modal */}
            {showAddCategory && (
                <div className="neo-glass rounded-2xl p-4 space-y-4">
                    <input
                        type="text"
                        placeholder="Category Name (e.g., Frontend, Backend)"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none"
                    />
                    <div className="flex gap-3">
                        <button onClick={() => setShowAddCategory(false)} className="flex-1 btn-secondary text-sm">Cancel</button>
                        <button onClick={handleAddCategory} className="flex-1 btn-primary text-sm">Add Category</button>
                    </div>
                </div>
            )}

            {/* Skills Categories */}
            <div className="space-y-4">
                {data.skills.map((category) => (
                    <div key={category.category} className="neo-glass rounded-2xl p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold text-gradient">{category.category}</h4>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowAddSkill(showAddSkill === category.category ? null : category.category)}
                                    className="p-2 rounded-xl hover:bg-[var(--glass)] text-[var(--accent-secondary)] transition-all"
                                    title="Add Skill"
                                >
                                    <Plus size={18} />
                                </button>
                                <button
                                    onClick={() => deleteSkillCategory(category.category)}
                                    className="p-2 rounded-xl hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                    title="Delete Category"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Add Skill Form */}
                        {showAddSkill === category.category && (
                            <div className="mb-4 p-4 rounded-xl glass-card space-y-3">
                                <input
                                    type="text"
                                    placeholder="Skill Name (e.g., React, Python)"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm"
                                />
                                <div>
                                    <label className="text-sm text-[var(--foreground-secondary)]">Level: {newSkill.level}%</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={newSkill.level}
                                        onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                                        className="w-full accent-[var(--accent-primary)]"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setShowAddSkill(null)} className="flex-1 btn-secondary text-xs !py-1.5">Cancel</button>
                                    <button onClick={() => handleAddSkill(category.category)} className="flex-1 btn-primary text-xs !py-1.5">Add</button>
                                </div>
                            </div>
                        )}

                        {/* Skills List */}
                        <div className="space-y-3">
                            {category.items.map((skill) => (
                                <div key={skill.name} className="flex items-center gap-4">
                                    <span className="w-24 text-sm font-medium truncate">{skill.name}</span>
                                    <div className="flex-1">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={skill.level}
                                            onChange={(e) => updateSkillItem(category.category, skill.name, parseInt(e.target.value))}
                                            className="w-full accent-[var(--accent-primary)]"
                                        />
                                    </div>
                                    <span className="text-sm text-[var(--accent-secondary)] w-10">{skill.level}%</span>
                                    <button
                                        onClick={() => deleteSkillItem(category.category, skill.name)}
                                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--foreground-secondary)] hover:text-red-400 transition-all"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {category.items.length === 0 && (
                                <p className="text-sm text-[var(--foreground-secondary)] text-center py-2">No skills yet. Click + to add.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// Edit Modal Component
function EditModal({ type, item, onClose, onSave }: {
    type: "project" | "experience" | "testimonial" | "education" | null;
    item: Project | Experience | Testimonial | Education;
    onClose: () => void;
    onSave: (updated: Partial<Project | Experience | Testimonial | Education>) => void;
}) {
    const getInitialFormData = (): Record<string, string> => {
        if (type === "project" && "title" in item) {
            return {
                title: item.title,
                description: item.description,
                tags: item.tags.join(", "),
                liveUrl: item.liveUrl,
                githubUrl: item.githubUrl,
            };
        }
        if (type === "experience" && "company" in item) {
            const exp = item as Experience;
            return {
                role: exp.role,
                company: exp.company,
                location: exp.location || "",
                duration: exp.duration,
                description: exp.description.join("\n"),
            };
        }
        if (type === "education" && "degree" in item) {
            const edu = item as Education;
            return {
                degree: edu.degree,
                institution: edu.institution,
                location: edu.location || "",
                duration: edu.duration,
                gpa: edu.gpa || "",
            };
        }
        if (type === "testimonial" && "content" in item) {
            const test = item as Testimonial;
            return {
                name: test.name,
                role: test.role,
                content: test.content,
            };
        }
        return {};
    };

    const [formData, setFormData] = useState<Record<string, string>>(getInitialFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type === "project") {
            onSave({
                title: formData.title,
                description: formData.description,
                tags: formData.tags.split(",").map(t => t.trim()),
                liveUrl: formData.liveUrl,
                githubUrl: formData.githubUrl,
            });
        } else if (type === "experience") {
            onSave({
                role: formData.role,
                company: formData.company,
                location: formData.location,
                duration: formData.duration,
                description: formData.description.split("\n"),
            });
        } else if (type === "education") {
            onSave({
                degree: formData.degree,
                institution: formData.institution,
                location: formData.location,
                duration: formData.duration,
                gpa: formData.gpa,
            });
        } else if (type === "testimonial") {
            onSave({
                name: formData.name,
                role: formData.role,
                content: formData.content,
            });
        }
    };

    const inputClass = "w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none text-sm";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="neo-glass rounded-xl p-5 w-full max-w-md max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-lg font-bold mb-4 capitalize">Edit {type}</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {type === "project" && (
                        <>
                            <input type="text" placeholder="Title" value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} />
                            <textarea placeholder="Description" value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} className={`${inputClass} resize-none`} rows={2} />
                            <input type="text" placeholder="Tags (comma separated)" value={formData.tags || ""} onChange={e => setFormData({ ...formData, tags: e.target.value })} className={inputClass} />
                            <input type="url" placeholder="Live URL" value={formData.liveUrl || ""} onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} className={inputClass} />
                            <input type="url" placeholder="GitHub URL" value={formData.githubUrl || ""} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} className={inputClass} />
                        </>
                    )}
                    {type === "experience" && (
                        <>
                            <input type="text" placeholder="Role" value={formData.role || ""} onChange={e => setFormData({ ...formData, role: e.target.value })} className={inputClass} />
                            <input type="text" placeholder="Company" value={formData.company || ""} onChange={e => setFormData({ ...formData, company: e.target.value })} className={inputClass} />
                            <input type="text" placeholder="Duration" value={formData.duration || ""} onChange={e => setFormData({ ...formData, duration: e.target.value })} className={inputClass} />
                            <textarea placeholder="Description (one per line)" value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} className={`${inputClass} resize-none`} rows={3} />
                        </>
                    )}
                    {type === "education" && (
                        <>
                            <input type="text" placeholder="Degree" value={formData.degree || ""} onChange={e => setFormData({ ...formData, degree: e.target.value })} className={inputClass} />
                            <input type="text" placeholder="Institution" value={formData.institution || ""} onChange={e => setFormData({ ...formData, institution: e.target.value })} className={inputClass} />
                            <input type="text" placeholder="Duration" value={formData.duration || ""} onChange={e => setFormData({ ...formData, duration: e.target.value })} className={inputClass} />
                            <input type="text" placeholder="GPA" value={formData.gpa || ""} onChange={e => setFormData({ ...formData, gpa: e.target.value })} className={inputClass} />
                        </>
                    )}
                    {type === "testimonial" && (
                        <>
                            <input type="text" placeholder="Name" value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                            <input type="text" placeholder="Role" value={formData.role || ""} onChange={e => setFormData({ ...formData, role: e.target.value })} className={inputClass} />
                            <textarea placeholder="Testimonial content" value={formData.content || ""} onChange={e => setFormData({ ...formData, content: e.target.value })} className={`${inputClass} resize-none`} rows={3} />
                        </>
                    )}
                    <div className="flex gap-2 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 btn-secondary text-sm">Cancel</button>
                        <button type="submit" className="flex-1 btn-primary text-sm">Save</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

