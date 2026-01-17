"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";

// Types
export interface ProfileData {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    resumeUrl: string;
    avatar: string;
    social: {
        github: string;
        linkedin: string;
        twitter: string;
        instagram: string;
    };
    // Animated Roles (for hero typing animation)
    roles: string[]; // ["Full Stack Developer", "React Expert", "Mobile Dev"]
    // Customizable UI Text
    greeting: string; // "Hello, I'm"
    heroButtonPrimary: string; // "View My Work"
    heroButtonSecondary: string; // "Download CV"
    availabilityText: string; // "Available for work"
    hireMeText: string; // "Hire Me"
    aboutTitle: string; // "About Me"
    skillsTitle: string; // "Skills"
    projectsTitle: string; // "Projects"
    experienceTitle: string; // "Experience"
    educationTitle: string; // "Education"
    contactTitle: string; // "Contact"
    blogTitle: string; // "Blog"
    testimonialsTitle: string; // "Testimonials"
    footerText: string; // Copyright text
}

// SEO Settings
export interface SEOSettings {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
}

// Custom Navigation Link
export interface CustomLink {
    id: string;
    label: string;
    url: string;
    isExternal: boolean;
    icon?: string;
}

// Theme Settings
export interface ThemeSettings {
    // Colors
    accentPrimary: string;
    accentSecondary: string;
    accentTertiary: string;
    colorPreset: 'cyberpunk' | 'ocean' | 'forest' | 'sunset' | 'monochrome' | 'custom';

    // Typography
    fontFamily: string;
    headingFont: string;

    // Layout
    layoutTemplate: 'classic' | 'minimal' | 'modern' | 'creative';

    // Design Style
    designStyle: 'glassmorphism' | 'neomorphism' | 'flat' | 'gradient';

    // Additional
    borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
    animationsEnabled: boolean;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
}

export interface Experience {
    id: number;
    role: string;
    company: string;
    location: string;
    duration: string;
    description: string[];
    technologies: string[];
}

export interface Skill {
    category: string;
    items: { name: string; level: number }[];
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    content: string;
    rating: number;
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    slug: string;
    link?: string; // External link to full blog post
}

export interface Education {
    id: number;
    degree: string;
    institution: string;
    location: string;
    duration: string;
    description: string;
    gpa?: string;
    certificateUrl?: string; // Link to certificate/credential
}

export interface Certification {
    id: number;
    name: string;
    issuer: string;
    date: string;
    url: string;
}

export interface StatItem {
    id: number;
    icon: string; // Icon name like "Code2", "Users", "Coffee", etc.
    value: number;
    suffix: string; // "+" or "%"
    label: string;
    color: string; // Gradient color like "from-purple-500 to-indigo-500"
}

// Custom Section Item - can be text block, card, or image
export interface CustomSectionItem {
    id: number;
    type: 'text' | 'card' | 'image';
    // For text type
    content?: string;
    // For card type
    title?: string;
    description?: string;
    icon?: string;
    link?: string;
    // For image type
    imageUrl?: string;
    caption?: string;
}

// Custom Section - user-defined section
export interface CustomSection {
    id: string;
    title: string;
    subtitle?: string;
    layout: 'grid' | 'list' | 'cards'; // How items are displayed
    columns: 2 | 3 | 4; // Grid columns
    items: CustomSectionItem[];
    isVisible: boolean;
}

export interface SectionVisibility {
    about: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
    testimonials: boolean;
    blog: boolean;
    contact: boolean;
    stats: boolean;
    githubStats: boolean;
}

// Section order - IDs match keys in SectionVisibility
export type SectionId = keyof SectionVisibility;

export const defaultSectionOrder: SectionId[] = [
    "about",
    "skills",
    "projects",
    "experience",
    "education",
    "stats",
    "githubStats",
    "testimonials",
    "blog",
    "contact"
];

// Single Domain/Role Profile
export interface DomainProfile {
    id: string;
    domainName: string; // e.g., "Software Engineer", "Operations", "Analyst"
    isActive: boolean;
    profile: ProfileData;
    projects: Project[];
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    testimonials: Testimonial[];
    blogPosts: BlogPost[];
    certifications: Certification[];
    customStats: StatItem[];
    customSections: CustomSection[];
    sectionVisibility: SectionVisibility;
    sectionOrder: SectionId[];
    seo: SEOSettings;
    customLinks: CustomLink[];
    theme: ThemeSettings;
}

// For backward compatibility - this represents the active profile's data
export interface PortfolioData {
    profile: ProfileData;
    projects: Project[];
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    testimonials: Testimonial[];
    blogPosts: BlogPost[];
    certifications: Certification[];
    customStats: StatItem[];
    customSections: CustomSection[];
    sectionVisibility: SectionVisibility;
    sectionOrder: SectionId[];
    seo: SEOSettings;
    customLinks: CustomLink[];
    theme: ThemeSettings;
}

// Full state with all profiles
export interface AllProfilesData {
    profiles: DomainProfile[];
    activeProfileId: string;
}

const defaultProfileData: DomainProfile = {
    id: "default",
    domainName: "Software Engineer",
    isActive: true,
    profile: {
        name: "Aniket Mishra",
        title: "Full Stack Developer",
        tagline: "Building digital experiences that matter",
        bio: `I'm a passionate Full Stack Developer with expertise in building modern web and mobile applications. 
I love turning complex problems into simple, beautiful, and intuitive solutions.`,
        email: "aniketmishra492@gmail.com",
        phone: "+91 8858899855",
        location: "India",
        resumeUrl: "/resume.pdf",
        avatar: "/avatar.png",
        social: {
            github: "https://github.com/aniket-mishra",
            linkedin: "https://linkedin.com/in/aniketmishra0",
            twitter: "https://twitter.com/aniket_mishra0",
            instagram: "https://instagram.com/being_fury2656",
        },
        // Animated Roles for typing effect
        roles: ["Full Stack Developer", "React Expert", "Node.js Developer", "Mobile App Developer"],
        // Customizable UI Text
        greeting: "Hello, I'm",
        heroButtonPrimary: "View My Work",
        heroButtonSecondary: "Download CV",
        availabilityText: "Available for work",
        hireMeText: "Hire Me",
        aboutTitle: "About Me",
        skillsTitle: "Skills",
        projectsTitle: "My Projects",
        experienceTitle: "Experience",
        educationTitle: "Education",
        contactTitle: "Get In Touch",
        blogTitle: "Blog",
        testimonialsTitle: "What People Say",
        footerText: "© 2024 Aniket Mishra. All rights reserved.",
    },
    projects: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-featured e-commerce platform with cart, checkout, and payment integration.",
            image: "/projects/ecommerce.jpg",
            tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/aniket-mishra/ecommerce",
            featured: true,
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates.",
            image: "/projects/taskapp.jpg",
            tags: ["React", "Firebase", "Tailwind CSS"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/aniket-mishra/taskapp",
            featured: true,
        },
    ],
    experience: [
        {
            id: 1,
            role: "Senior Full Stack Developer",
            company: "Tech Company",
            location: "Remote",
            duration: "2023 - Present",
            description: [
                "Led development of microservices architecture serving 1M+ users",
                "Mentored junior developers and conducted code reviews",
            ],
            technologies: ["React", "Node.js", "AWS", "Docker"],
        },
    ],
    education: [
        {
            id: 1,
            degree: "Bachelor of Technology in Computer Science",
            institution: "Indian Institute of Technology",
            location: "India",
            duration: "2015 - 2019",
            description: "Specialized in Software Engineering",
            gpa: "8.5/10",
        },
    ],
    skills: [
        {
            category: "Frontend",
            items: [
                { name: "React", level: 90 },
                { name: "Next.js", level: 85 },
                { name: "TypeScript", level: 80 },
            ],
        },
        {
            category: "Backend",
            items: [
                { name: "Node.js", level: 85 },
                { name: "Python", level: 75 },
            ],
        },
    ],
    testimonials: [
        {
            id: 1,
            name: "Rahul Sharma",
            role: "CEO, TechStartup",
            image: "https://i.pravatar.cc/150?img=1",
            content: "Aniket delivered an exceptional web application.",
            rating: 5,
        },
    ],
    blogPosts: [],
    certifications: [
        {
            id: 1,
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2023",
            url: "https://aws.amazon.com/certification",
        },
        {
            id: 2,
            name: "Google Cloud Professional Developer",
            issuer: "Google",
            date: "2022",
            url: "https://cloud.google.com/certification",
        },
    ],
    customStats: [
        { id: 1, icon: "Code2", value: 50, suffix: "+", label: "Projects Completed", color: "from-purple-500 to-indigo-500" },
        { id: 2, icon: "Users", value: 30, suffix: "+", label: "Happy Clients", color: "from-indigo-500 to-cyan-500" },
        { id: 3, icon: "Briefcase", value: 5, suffix: "+", label: "Years Experience", color: "from-cyan-500 to-emerald-500" },
        { id: 4, icon: "Coffee", value: 1000, suffix: "+", label: "Cups of Coffee", color: "from-emerald-500 to-yellow-500" },
        { id: 5, icon: "Trophy", value: 15, suffix: "+", label: "Awards Won", color: "from-yellow-500 to-orange-500" },
        { id: 6, icon: "Rocket", value: 99, suffix: "%", label: "Client Satisfaction", color: "from-orange-500 to-red-500" },
    ],
    customSections: [],
    sectionVisibility: {
        about: true,
        skills: true,
        projects: true,
        experience: true,
        education: true,
        testimonials: true,
        blog: true,
        contact: true,
        stats: true,
        githubStats: true,
    },
    sectionOrder: defaultSectionOrder,
    seo: {
        metaTitle: "Aniket Mishra - Full Stack Developer",
        metaDescription: "Portfolio of Aniket Mishra, a Full Stack Developer specializing in web and mobile applications.",
        keywords: ["developer", "full stack", "react", "nodejs", "portfolio"],
        ogImage: "/og-image.png",
    },
    customLinks: [],
    theme: {
        accentPrimary: "#8b5cf6",
        accentSecondary: "#06b6d4",
        accentTertiary: "#ec4899",
        colorPreset: "cyberpunk",
        fontFamily: "inter",
        headingFont: "inter",
        layoutTemplate: "classic",
        designStyle: "glassmorphism",
        borderRadius: "large",
        animationsEnabled: true,
    },
};

const defaultAllProfiles: AllProfilesData = {
    profiles: [defaultProfileData],
    activeProfileId: "default",
};

// Context Type
interface DataContextType {
    // All profiles
    allProfiles: AllProfilesData;

    // Active profile data (for backward compatibility)
    data: PortfolioData;

    // Profile management
    getActiveProfile: () => DomainProfile | undefined;
    setActiveProfile: (profileId: string) => void;
    addNewProfile: (domainName: string) => void;
    deleteProfile: (profileId: string) => void;
    updateProfileDomainName: (profileId: string, newName: string) => void;
    duplicateProfile: (profileId: string, newDomainName: string) => void;

    // Data operations (work on active profile)
    updateProfile: (profile: ProfileData) => void;
    updateProjects: (projects: Project[]) => void;
    addProject: (project: Omit<Project, "id">) => void;
    updateProject: (id: number, project: Partial<Omit<Project, "id">>) => void;
    deleteProject: (id: number) => void;
    updateExperience: (experience: Experience[]) => void;
    addExperience: (exp: Omit<Experience, "id">) => void;
    updateExperienceItem: (id: number, exp: Partial<Omit<Experience, "id">>) => void;
    deleteExperience: (id: number) => void;
    updateEducation: (education: Education[]) => void;
    addEducation: (edu: Omit<Education, "id">) => void;
    updateEducationItem: (id: number, edu: Partial<Omit<Education, "id">>) => void;
    deleteEducation: (id: number) => void;
    updateSkills: (skills: Skill[]) => void;
    addSkillCategory: (category: string) => void;
    deleteSkillCategory: (category: string) => void;
    addSkillItem: (category: string, name: string, level: number) => void;
    updateSkillItem: (category: string, name: string, level: number) => void;
    deleteSkillItem: (category: string, name: string) => void;
    updateTestimonials: (testimonials: Testimonial[]) => void;
    addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
    updateTestimonialItem: (id: number, testimonial: Partial<Omit<Testimonial, "id">>) => void;
    deleteTestimonial: (id: number) => void;
    updateBlogPosts: (posts: BlogPost[]) => void;
    addBlogPost: (post: Omit<BlogPost, "id">) => void;
    updateBlogPost: (id: number, post: Partial<Omit<BlogPost, "id">>) => void;
    deleteBlogPost: (id: number) => void;
    addCertification: (cert: Omit<Certification, "id">) => void;
    updateCertification: (id: number, cert: Partial<Omit<Certification, "id">>) => void;
    deleteCertification: (id: number) => void;
    addStat: (stat: Omit<StatItem, "id">) => void;
    updateStat: (id: number, stat: Partial<StatItem>) => void;
    deleteStat: (id: number) => void;
    addCustomSection: (section: Omit<CustomSection, "id">) => void;
    updateCustomSection: (id: string, updates: Partial<CustomSection>) => void;
    deleteCustomSection: (id: string) => void;
    addCustomSectionItem: (sectionId: string, item: Omit<CustomSectionItem, "id">) => void;
    updateCustomSectionItem: (sectionId: string, itemId: number, updates: Partial<CustomSectionItem>) => void;
    deleteCustomSectionItem: (sectionId: string, itemId: number) => void;
    updateSEO: (seo: SEOSettings) => void;
    updateTheme: (theme: Partial<ThemeSettings>) => void;
    toggleSection: (section: keyof SectionVisibility) => void;
    updateSectionVisibility: (visibility: SectionVisibility) => void;
    updateSectionOrder: (order: SectionId[]) => void;
    moveSectionUp: (sectionId: SectionId) => void;
    moveSectionDown: (sectionId: SectionId) => void;
    exportData: () => string;
    importData: (json: string) => boolean;
    resetToDefault: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [allProfiles, setAllProfiles] = useState<AllProfilesData>(defaultAllProfiles);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        // Check for new format first
        let saved = localStorage.getItem("portfolio_all_profiles");

        // If not found, check old format key
        if (!saved) {
            saved = localStorage.getItem("portfolio_data");
        }

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Migration: if old format, convert to new format
                if (parsed.profile && !parsed.profiles) {
                    // Old format - single profile, add defaults for new fields
                    const migratedProfile: DomainProfile = {
                        id: "default",
                        domainName: "Software Engineer",
                        isActive: true,
                        profile: { ...defaultProfileData.profile, ...parsed.profile },
                        projects: parsed.projects || [],
                        experience: parsed.experience || [],
                        education: parsed.education || [],
                        skills: parsed.skills || [],
                        testimonials: parsed.testimonials || [],
                        blogPosts: parsed.blogPosts || [],
                        certifications: parsed.certifications || defaultProfileData.certifications,
                        customStats: parsed.customStats || defaultProfileData.customStats,
                        customSections: parsed.customSections || [],
                        sectionVisibility: parsed.sectionVisibility || defaultProfileData.sectionVisibility,
                        sectionOrder: parsed.sectionOrder || defaultProfileData.sectionOrder,
                        seo: parsed.seo || defaultProfileData.seo,
                        customLinks: parsed.customLinks || [],
                        theme: parsed.theme || defaultProfileData.theme,
                    };
                    setAllProfiles({ profiles: [migratedProfile], activeProfileId: "default" });
                    // Save in new format
                    localStorage.setItem("portfolio_all_profiles", JSON.stringify({ profiles: [migratedProfile], activeProfileId: "default" }));
                } else if (parsed.profiles) {
                    setAllProfiles(parsed);
                }
            } catch (e) {
                console.error("Failed to parse saved data:", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("portfolio_all_profiles", JSON.stringify(allProfiles));
        }
    }, [allProfiles, isLoaded]);

    // Get active profile
    const getActiveProfile = (): DomainProfile | undefined => {
        return allProfiles.profiles.find(p => p.id === allProfiles.activeProfileId);
    };

    // Memoized active profile data (for proper reactivity)
    const activeData = useMemo((): PortfolioData => {
        const active = allProfiles.profiles.find(p => p.id === allProfiles.activeProfileId);
        if (!active) return defaultProfileData;
        return {
            profile: active.profile,
            projects: active.projects,
            experience: active.experience,
            education: active.education,
            skills: active.skills,
            testimonials: active.testimonials,
            blogPosts: active.blogPosts,
            certifications: active.certifications || defaultProfileData.certifications,
            customStats: active.customStats || defaultProfileData.customStats,
            customSections: active.customSections || [],
            sectionVisibility: active.sectionVisibility,
            sectionOrder: active.sectionOrder || defaultProfileData.sectionOrder,
            seo: active.seo || defaultProfileData.seo,
            customLinks: active.customLinks || [],
            theme: active.theme || defaultProfileData.theme,
        };
    }, [allProfiles.activeProfileId, allProfiles.profiles]);

    // Helper to update active profile
    const updateActiveProfile = (updater: (profile: DomainProfile) => DomainProfile) => {
        setAllProfiles(prev => ({
            ...prev,
            profiles: prev.profiles.map(p =>
                p.id === prev.activeProfileId ? updater(p) : p
            ),
        }));
    };

    // Profile management
    const setActiveProfile = (profileId: string) => {
        setAllProfiles(prev => ({ ...prev, activeProfileId: profileId }));
    };

    const addNewProfile = (domainName: string) => {
        const newId = `profile_${Date.now()}`;
        const newProfile: DomainProfile = {
            ...defaultProfileData,
            id: newId,
            domainName,
            isActive: false,
        };
        setAllProfiles(prev => ({
            ...prev,
            profiles: [...prev.profiles, newProfile],
        }));
    };

    const deleteProfile = (profileId: string) => {
        if (allProfiles.profiles.length <= 1) return; // Don't delete last profile
        setAllProfiles(prev => {
            const newProfiles = prev.profiles.filter(p => p.id !== profileId);
            const newActiveId = prev.activeProfileId === profileId
                ? newProfiles[0]?.id || "default"
                : prev.activeProfileId;
            return { profiles: newProfiles, activeProfileId: newActiveId };
        });
    };

    const updateProfileDomainName = (profileId: string, newName: string) => {
        setAllProfiles(prev => ({
            ...prev,
            profiles: prev.profiles.map(p =>
                p.id === profileId ? { ...p, domainName: newName } : p
            ),
        }));
    };

    const duplicateProfile = (profileId: string, newDomainName: string) => {
        const sourceProfile = allProfiles.profiles.find(p => p.id === profileId);
        if (!sourceProfile) return;

        const newId = `profile_${Date.now()}`;
        const newProfile: DomainProfile = {
            ...JSON.parse(JSON.stringify(sourceProfile)),
            id: newId,
            domainName: newDomainName,
            isActive: false,
        };
        setAllProfiles(prev => ({
            ...prev,
            profiles: [...prev.profiles, newProfile],
        }));
    };

    // Data operations (work on active profile)
    const updateProfile = (profile: ProfileData) => {
        updateActiveProfile(p => ({ ...p, profile }));
    };

    const updateProjects = (projects: Project[]) => {
        updateActiveProfile(p => ({ ...p, projects }));
    };

    const addProject = (project: Omit<Project, "id">) => {
        const active = getActiveProfile();
        if (!active) return;
        const newId = Math.max(0, ...active.projects.map(p => p.id)) + 1;
        updateActiveProfile(p => ({ ...p, projects: [...p.projects, { ...project, id: newId }] }));
    };

    const updateProject = (id: number, project: Partial<Omit<Project, "id">>) => {
        updateActiveProfile(p => ({
            ...p,
            projects: p.projects.map(proj => proj.id === id ? { ...proj, ...project } : proj),
        }));
    };

    const deleteProject = (id: number) => {
        updateActiveProfile(p => ({ ...p, projects: p.projects.filter(proj => proj.id !== id) }));
    };

    const updateExperience = (experience: Experience[]) => {
        updateActiveProfile(p => ({ ...p, experience }));
    };

    const addExperience = (exp: Omit<Experience, "id">) => {
        const active = getActiveProfile();
        if (!active) return;
        const newId = Math.max(0, ...active.experience.map(e => e.id)) + 1;
        updateActiveProfile(p => ({ ...p, experience: [...p.experience, { ...exp, id: newId }] }));
    };

    const updateExperienceItem = (id: number, exp: Partial<Omit<Experience, "id">>) => {
        updateActiveProfile(p => ({
            ...p,
            experience: p.experience.map(e => e.id === id ? { ...e, ...exp } : e),
        }));
    };

    const deleteExperience = (id: number) => {
        updateActiveProfile(p => ({ ...p, experience: p.experience.filter(e => e.id !== id) }));
    };

    const updateEducation = (education: Education[]) => {
        updateActiveProfile(p => ({ ...p, education }));
    };

    const addEducation = (edu: Omit<Education, "id">) => {
        const active = getActiveProfile();
        if (!active) return;
        const newId = Math.max(0, ...active.education.map(e => e.id)) + 1;
        updateActiveProfile(p => ({ ...p, education: [...p.education, { ...edu, id: newId }] }));
    };

    const updateEducationItem = (id: number, edu: Partial<Omit<Education, "id">>) => {
        updateActiveProfile(p => ({
            ...p,
            education: p.education.map(e => e.id === id ? { ...e, ...edu } : e),
        }));
    };

    const deleteEducation = (id: number) => {
        updateActiveProfile(p => ({ ...p, education: p.education.filter(e => e.id !== id) }));
    };

    const updateSkills = (skills: Skill[]) => {
        updateActiveProfile(p => ({ ...p, skills }));
    };

    const addSkillCategory = (category: string) => {
        const active = getActiveProfile();
        if (!active || active.skills.some(s => s.category === category)) return;
        updateActiveProfile(p => ({ ...p, skills: [...p.skills, { category, items: [] }] }));
    };

    const deleteSkillCategory = (category: string) => {
        updateActiveProfile(p => ({ ...p, skills: p.skills.filter(s => s.category !== category) }));
    };

    const addSkillItem = (category: string, name: string, level: number) => {
        updateActiveProfile(p => ({
            ...p,
            skills: p.skills.map(s =>
                s.category === category
                    ? { ...s, items: [...s.items, { name, level }] }
                    : s
            ),
        }));
    };

    const updateSkillItem = (category: string, name: string, level: number) => {
        updateActiveProfile(p => ({
            ...p,
            skills: p.skills.map(s =>
                s.category === category
                    ? { ...s, items: s.items.map(item => item.name === name ? { ...item, level } : item) }
                    : s
            ),
        }));
    };

    const deleteSkillItem = (category: string, name: string) => {
        updateActiveProfile(p => ({
            ...p,
            skills: p.skills.map(s =>
                s.category === category
                    ? { ...s, items: s.items.filter(item => item.name !== name) }
                    : s
            ),
        }));
    };

    const updateTestimonials = (testimonials: Testimonial[]) => {
        updateActiveProfile(p => ({ ...p, testimonials }));
    };

    const addTestimonial = (testimonial: Omit<Testimonial, "id">) => {
        const active = getActiveProfile();
        if (!active) return;
        const newId = Math.max(0, ...active.testimonials.map(t => t.id)) + 1;
        updateActiveProfile(p => ({ ...p, testimonials: [...p.testimonials, { ...testimonial, id: newId }] }));
    };

    const updateTestimonialItem = (id: number, testimonial: Partial<Omit<Testimonial, "id">>) => {
        updateActiveProfile(p => ({
            ...p,
            testimonials: p.testimonials.map(t => t.id === id ? { ...t, ...testimonial } : t),
        }));
    };

    const deleteTestimonial = (id: number) => {
        updateActiveProfile(p => ({ ...p, testimonials: p.testimonials.filter(t => t.id !== id) }));
    };

    const updateBlogPosts = (posts: BlogPost[]) => {
        updateActiveProfile(p => ({ ...p, blogPosts: posts }));
    };

    const addBlogPost = (post: Omit<BlogPost, "id">) => {
        updateActiveProfile(p => ({
            ...p,
            blogPosts: [...p.blogPosts, { ...post, id: Date.now() }],
        }));
    };

    const updateBlogPost = (id: number, post: Partial<Omit<BlogPost, "id">>) => {
        updateActiveProfile(p => ({
            ...p,
            blogPosts: p.blogPosts.map(b => b.id === id ? { ...b, ...post } : b),
        }));
    };

    const deleteBlogPost = (id: number) => {
        updateActiveProfile(p => ({ ...p, blogPosts: p.blogPosts.filter(b => b.id !== id) }));
    };

    const addCertification = (cert: Omit<Certification, "id">) => {
        updateActiveProfile(p => ({
            ...p,
            certifications: [...(p.certifications || []), { ...cert, id: Date.now() }],
        }));
    };

    const updateCertification = (id: number, cert: Partial<Omit<Certification, "id">>) => {
        updateActiveProfile(p => ({
            ...p,
            certifications: (p.certifications || []).map(c => c.id === id ? { ...c, ...cert } : c),
        }));
    };

    const deleteCertification = (id: number) => {
        updateActiveProfile(p => ({ ...p, certifications: (p.certifications || []).filter(c => c.id !== id) }));
    };

    // Stats CRUD
    const addStat = (stat: Omit<StatItem, "id">) => {
        updateActiveProfile(p => ({
            ...p,
            customStats: [...(p.customStats || []), { ...stat, id: Date.now() }]
        }));
    };

    const updateStat = (id: number, updates: Partial<StatItem>) => {
        updateActiveProfile(p => ({
            ...p,
            customStats: (p.customStats || []).map(s => s.id === id ? { ...s, ...updates } : s)
        }));
    };

    const deleteStat = (id: number) => {
        updateActiveProfile(p => ({ ...p, customStats: (p.customStats || []).filter(s => s.id !== id) }));
    };

    // Custom Sections CRUD
    const addCustomSection = (section: Omit<CustomSection, "id">) => {
        const newSection: CustomSection = {
            ...section,
            id: `custom_${Date.now()}`,
        };
        updateActiveProfile(p => ({
            ...p,
            customSections: [...(p.customSections || []), newSection],
            sectionOrder: [...(p.sectionOrder || defaultSectionOrder), newSection.id as SectionId],
        }));
    };

    const updateCustomSection = (id: string, updates: Partial<CustomSection>) => {
        updateActiveProfile(p => ({
            ...p,
            customSections: (p.customSections || []).map(s => s.id === id ? { ...s, ...updates } : s),
        }));
    };

    const deleteCustomSection = (id: string) => {
        updateActiveProfile(p => ({
            ...p,
            customSections: (p.customSections || []).filter(s => s.id !== id),
            sectionOrder: (p.sectionOrder || defaultSectionOrder).filter(s => s !== id),
        }));
    };

    const addCustomSectionItem = (sectionId: string, item: Omit<CustomSectionItem, "id">) => {
        updateActiveProfile(p => ({
            ...p,
            customSections: (p.customSections || []).map(s =>
                s.id === sectionId
                    ? { ...s, items: [...s.items, { ...item, id: Date.now() }] }
                    : s
            ),
        }));
    };

    const updateCustomSectionItem = (sectionId: string, itemId: number, updates: Partial<CustomSectionItem>) => {
        updateActiveProfile(p => ({
            ...p,
            customSections: (p.customSections || []).map(s =>
                s.id === sectionId
                    ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, ...updates } : i) }
                    : s
            ),
        }));
    };

    const deleteCustomSectionItem = (sectionId: string, itemId: number) => {
        updateActiveProfile(p => ({
            ...p,
            customSections: (p.customSections || []).map(s =>
                s.id === sectionId
                    ? { ...s, items: s.items.filter(i => i.id !== itemId) }
                    : s
            ),
        }));
    };

    const toggleSection = (section: keyof SectionVisibility) => {
        updateActiveProfile(p => ({
            ...p,
            sectionVisibility: {
                ...p.sectionVisibility,
                [section]: !p.sectionVisibility[section],
            },
        }));
    };

    const updateSectionVisibility = (visibility: SectionVisibility) => {
        updateActiveProfile(p => ({ ...p, sectionVisibility: visibility }));
    };

    const updateSectionOrder = (order: SectionId[]) => {
        updateActiveProfile(p => ({ ...p, sectionOrder: order }));
    };

    const moveSectionUp = (sectionId: SectionId) => {
        updateActiveProfile(p => {
            const order = [...(p.sectionOrder || defaultSectionOrder)];
            const index = order.indexOf(sectionId);
            if (index > 0) {
                [order[index - 1], order[index]] = [order[index], order[index - 1]];
            }
            return { ...p, sectionOrder: order };
        });
    };

    const moveSectionDown = (sectionId: SectionId) => {
        updateActiveProfile(p => {
            const order = [...(p.sectionOrder || defaultSectionOrder)];
            const index = order.indexOf(sectionId);
            if (index < order.length - 1) {
                [order[index], order[index + 1]] = [order[index + 1], order[index]];
            }
            return { ...p, sectionOrder: order };
        });
    };

    const updateSEO = (seo: SEOSettings) => {
        updateActiveProfile(p => ({ ...p, seo }));
    };

    const updateTheme = (theme: Partial<ThemeSettings>) => {
        updateActiveProfile(p => ({ ...p, theme: { ...p.theme, ...theme } }));
    };

    const exportData = (): string => {
        return JSON.stringify(allProfiles, null, 2);
    };

    const importData = (json: string): boolean => {
        try {
            const parsed = JSON.parse(json);
            if (parsed.profiles) {
                setAllProfiles(parsed);
            } else if (parsed.profile) {
                // Old format
                const migratedProfile: DomainProfile = {
                    id: "default",
                    domainName: "Software Engineer",
                    isActive: true,
                    profile: { ...defaultProfileData.profile, ...parsed.profile },
                    projects: parsed.projects || [],
                    experience: parsed.experience || [],
                    education: parsed.education || [],
                    skills: parsed.skills || [],
                    testimonials: parsed.testimonials || [],
                    blogPosts: parsed.blogPosts || [],
                    certifications: parsed.certifications || defaultProfileData.certifications,
                    customStats: parsed.customStats || defaultProfileData.customStats,
                    customSections: parsed.customSections || [],
                    sectionVisibility: parsed.sectionVisibility || defaultProfileData.sectionVisibility,
                    sectionOrder: parsed.sectionOrder || defaultProfileData.sectionOrder,
                    seo: parsed.seo || defaultProfileData.seo,
                    customLinks: parsed.customLinks || [],
                    theme: parsed.theme || defaultProfileData.theme,
                };
                setAllProfiles({ profiles: [migratedProfile], activeProfileId: "default" });
            }
            return true;
        } catch {
            return false;
        }
    };

    const resetToDefault = () => {
        setAllProfiles(defaultAllProfiles);
    };

    if (!isLoaded) return null;

    return (
        <DataContext.Provider value={{
            allProfiles,
            data: activeData,
            getActiveProfile,
            setActiveProfile,
            addNewProfile,
            deleteProfile,
            updateProfileDomainName,
            duplicateProfile,
            updateProfile,
            updateProjects,
            addProject,
            updateProject,
            deleteProject,
            updateExperience,
            addExperience,
            updateExperienceItem,
            deleteExperience,
            updateEducation,
            addEducation,
            updateEducationItem,
            deleteEducation,
            updateSkills,
            addSkillCategory,
            deleteSkillCategory,
            addSkillItem,
            updateSkillItem,
            deleteSkillItem,
            updateTestimonials,
            addTestimonial,
            updateTestimonialItem,
            deleteTestimonial,
            updateBlogPosts,
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
            updateSEO,
            updateTheme,
            toggleSection,
            updateSectionVisibility,
            updateSectionOrder,
            moveSectionUp,
            moveSectionDown,
            exportData,
            importData,
            resetToDefault,
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function usePortfolioData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("usePortfolioData must be used within DataProvider");
    }
    return context;
}
