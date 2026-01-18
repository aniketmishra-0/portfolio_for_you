"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the login page to reduce SSR load
const LoginContent = dynamic(
    () => import("@/components/LoginContent"),
    {
        loading: () => (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
            </div>
        ),
        ssr: false, // Disable SSR for login page - fully client-side
    }
);

export default function AdminLogin() {
    return <LoginContent />;
}
