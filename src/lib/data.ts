// Portfolio Data - Edit this file to update your portfolio content
// No code knowledge required - just update the values!

export const profileData = {
    name: "Aniket Mishra",
    title: "Full Stack Developer",
    tagline: "Building digital experiences that matter",
    bio: `I'm a passionate Full Stack Developer with expertise in building modern web and mobile applications. 
I love turning complex problems into simple, beautiful, and intuitive solutions.
When I'm not coding, you'll find me exploring new technologies and contributing to open source.`,
    email: "aniketmishra492@gmail.com",
    phone: "+91 8858899855",
    location: "India",
    resumeUrl: "/resume.pdf",
    avatar: "/avatar.jpg",
    social: {
        github: "https://github.com/aniket-mishra",
        linkedin: "https://linkedin.com/in/aniketmishra0",
        twitter: "https://twitter.com/aniket_mishra0",
        instagram: "https://instagram.com/being_fury2656",
    },
};

export const skills = [
    {
        category: "Frontend",
        items: [
            { name: "React", level: 90 },
            { name: "Next.js", level: 85 },
            { name: "TypeScript", level: 80 },
            { name: "Tailwind CSS", level: 90 },
            { name: "React Native", level: 75 },
        ],
    },
    {
        category: "Backend",
        items: [
            { name: "Node.js", level: 85 },
            { name: "Express", level: 80 },
            { name: "Python", level: 75 },
            { name: "PostgreSQL", level: 70 },
            { name: "MongoDB", level: 75 },
        ],
    },
    {
        category: "Tools & Others",
        items: [
            { name: "Git", level: 90 },
            { name: "Docker", level: 65 },
            { name: "AWS", level: 60 },
            { name: "Figma", level: 70 },
            { name: "Firebase", level: 75 },
        ],
    },
];

export const projects = [
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
    {
        id: 3,
        title: "AI Chat Bot",
        description: "An intelligent chatbot powered by machine learning for customer support.",
        image: "/projects/chatbot.jpg",
        tags: ["Python", "TensorFlow", "Flask", "React"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/aniket-mishra/chatbot",
        featured: false,
    },
    {
        id: 4,
        title: "Mobile Fitness App",
        description: "A React Native fitness tracking app with workout plans and progress tracking.",
        image: "/projects/fitness.jpg",
        tags: ["React Native", "Expo", "Firebase"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/aniket-mishra/fitness",
        featured: true,
    },
];

export const experience = [
    {
        id: 1,
        role: "Senior Full Stack Developer",
        company: "Tech Company",
        location: "Remote",
        duration: "2023 - Present",
        description: [
            "Led development of microservices architecture serving 1M+ users",
            "Mentored junior developers and conducted code reviews",
            "Implemented CI/CD pipelines reducing deployment time by 60%",
        ],
        technologies: ["React", "Node.js", "AWS", "Docker"],
    },
    {
        id: 2,
        role: "Full Stack Developer",
        company: "Startup Inc",
        location: "Bangalore, India",
        duration: "2021 - 2023",
        description: [
            "Built and maintained multiple client-facing web applications",
            "Developed RESTful APIs and integrated third-party services",
            "Improved application performance by 40% through optimization",
        ],
        technologies: ["Next.js", "Python", "PostgreSQL", "Redis"],
    },
    {
        id: 3,
        role: "Frontend Developer",
        company: "Digital Agency",
        location: "Mumbai, India",
        duration: "2019 - 2021",
        description: [
            "Created responsive websites for 20+ clients",
            "Collaborated with designers to implement pixel-perfect UIs",
            "Introduced component-based architecture using React",
        ],
        technologies: ["React", "JavaScript", "SASS", "Figma"],
    },
];

export const education = [
    {
        id: 1,
        degree: "Bachelor of Technology in Computer Science",
        institution: "Indian Institute of Technology",
        location: "India",
        duration: "2015 - 2019",
        description: "Specialized in Software Engineering and Machine Learning",
        gpa: "8.5/10",
    },
];

export const certifications = [
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
];

export const blogPosts = [
    {
        id: 1,
        title: "Building Scalable React Applications",
        excerpt: "Learn the best practices for building large-scale React applications that are maintainable and performant.",
        date: "2024-01-15",
        readTime: "8 min read",
        category: "React",
        image: "/blog/react-scalable.jpg",
        slug: "building-scalable-react-applications",
    },
    {
        id: 2,
        title: "Introduction to Next.js 14",
        excerpt: "Explore the new features in Next.js 14 including Server Components and improved performance.",
        date: "2024-01-10",
        readTime: "6 min read",
        category: "Next.js",
        image: "/blog/nextjs-14.jpg",
        slug: "introduction-to-nextjs-14",
    },
    {
        id: 3,
        title: "Mastering TypeScript",
        excerpt: "A comprehensive guide to TypeScript best practices and advanced patterns.",
        date: "2024-01-05",
        readTime: "10 min read",
        category: "TypeScript",
        image: "/blog/typescript.jpg",
        slug: "mastering-typescript",
    },
];

export const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
];
