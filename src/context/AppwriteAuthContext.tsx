"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { account } from "@/lib/appwrite";
import { Models, OAuthProvider } from "appwrite";

interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (provider: "github" | "google") => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Allowed admin emails
const ALLOWED_ADMIN_EMAILS = [
    process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAIL || "aniketmishra492@gmail.com",
];

export function AppwriteAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkSession = async () => {
        try {
            const session = await account.get();
            // Check if user email is allowed
            if (session.email && ALLOWED_ADMIN_EMAILS.includes(session.email)) {
                setUser(session);
            } else {
                // User logged in but not authorized
                await account.deleteSession("current");
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const login = async (provider: "github" | "google") => {
        const successUrl = `${window.location.origin}/admin`;
        const failureUrl = `${window.location.origin}/login?error=auth_failed`;
        const oauthProvider = provider === "github" ? OAuthProvider.Github : OAuthProvider.Google;
        account.createOAuth2Session(oauthProvider, successUrl, failureUrl);
    };

    const logout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
                checkSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAppwriteAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAppwriteAuth must be used within AppwriteAuthProvider");
    }
    return context;
}
