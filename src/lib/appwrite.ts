import { Client, Account, Databases, Storage, ID, Query } from "appwrite";

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

// Initialize Appwrite Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Export utilities
export { client, ID, Query };

// Database configuration
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "portfolio";
export const COLLECTIONS = {
    PROFILES: "profiles",
    PROJECTS: "projects",
    EXPERIENCE: "experience",
    SKILLS: "skills",
    EDUCATION: "education",
    TESTIMONIALS: "testimonials",
    BLOG: "blog",
    CERTIFICATIONS: "certifications",
    STATS: "stats",
};

// Storage configuration
export const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || "portfolio-images";
