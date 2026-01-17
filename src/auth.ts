import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

// Only these emails can access admin
const ALLOWED_EMAILS = [
    process.env.ALLOWED_ADMIN_EMAIL || "aniketmishra492@gmail.com",
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
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
