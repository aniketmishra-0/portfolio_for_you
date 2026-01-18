import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

// Only these emails can access admin
const ALLOWED_EMAILS = [
    process.env.ALLOWED_ADMIN_EMAIL || "aniketmishra492@gmail.com",
];

// Build providers array conditionally
const providers: Provider[] = [];

// Only add GitHub if credentials are configured
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.push(
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    );
}

// Only add Google if credentials are configured  
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            // Only allow specific emails
            if (user.email && ALLOWED_EMAILS.includes(user.email)) {
                return true;
            }
            return false;
        },
        async session({ session }) {
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
});
