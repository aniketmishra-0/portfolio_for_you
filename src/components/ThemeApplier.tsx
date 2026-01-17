"use client";

import { useEffect } from "react";
import { usePortfolioData } from "@/context/DataContext";
import { fontOptions, borderRadiusOptions, designStyles, colorPresets } from "@/lib/themePresets";

export default function ThemeApplier() {
    const { data } = usePortfolioData();
    const theme = data.theme;

    useEffect(() => {
        if (!theme) return;

        const root = document.documentElement;

        // Apply accent colors
        if (theme.colorPreset && theme.colorPreset !== 'custom') {
            const preset = colorPresets[theme.colorPreset];
            if (preset) {
                root.style.setProperty("--accent-primary", preset.primary);
                root.style.setProperty("--accent-secondary", preset.secondary);
                root.style.setProperty("--accent-tertiary", preset.tertiary);
            }
        } else {
            // Custom colors
            if (theme.accentPrimary) root.style.setProperty("--accent-primary", theme.accentPrimary);
            if (theme.accentSecondary) root.style.setProperty("--accent-secondary", theme.accentSecondary);
            if (theme.accentTertiary) root.style.setProperty("--accent-tertiary", theme.accentTertiary);
        }

        // Apply font family
        const fontMap: Record<string, string> = {
            'inter': 'var(--font-inter), sans-serif',
            'poppins': 'var(--font-poppins), sans-serif',
            'roboto': 'var(--font-roboto), sans-serif',
            'space-grotesk': 'var(--font-space-grotesk), sans-serif',
            'outfit': 'var(--font-outfit), sans-serif',
            'playfair': 'var(--font-playfair), serif',
        };

        if (theme.fontFamily && fontMap[theme.fontFamily]) {
            root.style.setProperty("--font-body", fontMap[theme.fontFamily]);
        }
        if (theme.headingFont && fontMap[theme.headingFont]) {
            root.style.setProperty("--font-heading", fontMap[theme.headingFont]);
        }

        // Apply border radius
        if (theme.borderRadius && borderRadiusOptions[theme.borderRadius]) {
            root.style.setProperty("--radius-base", borderRadiusOptions[theme.borderRadius]);

            // Also set scaled versions
            const baseValue = parseInt(borderRadiusOptions[theme.borderRadius]) || 0;
            root.style.setProperty("--radius-sm", `${Math.max(baseValue / 2, 2)}px`);
            root.style.setProperty("--radius-lg", `${Math.min(baseValue * 1.5, 24)}px`);
            root.style.setProperty("--radius-xl", `${Math.min(baseValue * 2, 32)}px`);
        }

        // Apply design style
        if (theme.designStyle && designStyles[theme.designStyle]) {
            const style = designStyles[theme.designStyle];
            root.style.setProperty("--card-background", style.cardBackground);
            root.style.setProperty("--card-border", style.cardBorder);
            root.style.setProperty("--card-shadow", style.cardShadow);
            root.style.setProperty("--card-blur", style.backdropBlur);
        }

        // Apply layout template (add as data attribute)
        if (theme.layoutTemplate) {
            root.setAttribute("data-layout", theme.layoutTemplate);
        }

        // Apply animations toggle
        root.setAttribute("data-animations", theme.animationsEnabled ? "enabled" : "disabled");

    }, [theme]);

    return null;
}
