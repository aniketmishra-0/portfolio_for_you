// Theme Presets - All layout, font, color, and design configurations

// Layout Templates
export type LayoutTemplate = 'classic' | 'minimal' | 'modern' | 'creative';

export const layoutTemplates: Record<LayoutTemplate, {
    name: string;
    description: string;
    heroStyle: string;
    navStyle: string;
    cardStyle: string;
}> = {
    classic: {
        name: "Classic",
        description: "Traditional layout with sidebar navigation",
        heroStyle: "grid",
        navStyle: "sidebar",
        cardStyle: "standard",
    },
    minimal: {
        name: "Minimal",
        description: "Clean single-column layout",
        heroStyle: "centered",
        navStyle: "top",
        cardStyle: "flat",
    },
    modern: {
        name: "Modern",
        description: "Two-column with larger hero section",
        heroStyle: "split",
        navStyle: "floating",
        cardStyle: "elevated",
    },
    creative: {
        name: "Creative",
        description: "Asymmetric design with animations",
        heroStyle: "asymmetric",
        navStyle: "hidden",
        cardStyle: "artistic",
    },
};

// Font Options
export type FontFamily = 'inter' | 'poppins' | 'roboto' | 'space-grotesk' | 'outfit' | 'playfair';

export const fontOptions: Record<FontFamily, {
    name: string;
    family: string;
    weights: string;
    category: string;
}> = {
    'inter': {
        name: "Inter",
        family: "'Inter', sans-serif",
        weights: "300;400;500;600;700;800",
        category: "Modern, Clean",
    },
    'poppins': {
        name: "Poppins",
        family: "'Poppins', sans-serif",
        weights: "300;400;500;600;700;800",
        category: "Geometric, Friendly",
    },
    'roboto': {
        name: "Roboto",
        family: "'Roboto', sans-serif",
        weights: "300;400;500;700;900",
        category: "Classic Google",
    },
    'space-grotesk': {
        name: "Space Grotesk",
        family: "'Space Grotesk', sans-serif",
        weights: "300;400;500;600;700",
        category: "Techy, Developer",
    },
    'outfit': {
        name: "Outfit",
        family: "'Outfit', sans-serif",
        weights: "300;400;500;600;700;800",
        category: "Sleek, Contemporary",
    },
    'playfair': {
        name: "Playfair Display",
        family: "'Playfair Display', serif",
        weights: "400;500;600;700;800",
        category: "Elegant, Serif",
    },
};

// Color Presets
export type ColorPreset = 'cyberpunk' | 'ocean' | 'forest' | 'sunset' | 'monochrome' | 'custom';

export const colorPresets: Record<ColorPreset, {
    name: string;
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    foreground: string;
}> = {
    cyberpunk: {
        name: "Cyberpunk",
        primary: "#8b5cf6",
        secondary: "#ec4899",
        tertiary: "#06b6d4",
        background: "#030014",
        foreground: "#ffffff",
    },
    ocean: {
        name: "Ocean",
        primary: "#3b82f6",
        secondary: "#06b6d4",
        tertiary: "#0ea5e9",
        background: "#0c1222",
        foreground: "#ffffff",
    },
    forest: {
        name: "Forest",
        primary: "#22c55e",
        secondary: "#10b981",
        tertiary: "#84cc16",
        background: "#0a1810",
        foreground: "#ffffff",
    },
    sunset: {
        name: "Sunset",
        primary: "#f97316",
        secondary: "#ef4444",
        tertiary: "#eab308",
        background: "#1a0a05",
        foreground: "#ffffff",
    },
    monochrome: {
        name: "Monochrome",
        primary: "#ffffff",
        secondary: "#a1a1aa",
        tertiary: "#71717a",
        background: "#09090b",
        foreground: "#ffffff",
    },
    custom: {
        name: "Custom",
        primary: "#8b5cf6",
        secondary: "#06b6d4",
        tertiary: "#ec4899",
        background: "#030014",
        foreground: "#ffffff",
    },
};

// Design Styles
export type DesignStyle = 'glassmorphism' | 'neomorphism' | 'flat' | 'gradient';

export const designStyles: Record<DesignStyle, {
    name: string;
    description: string;
    cardBackground: string;
    cardBorder: string;
    cardShadow: string;
    backdropBlur: string;
}> = {
    glassmorphism: {
        name: "Glassmorphism",
        description: "Blurred glass effects with transparency",
        cardBackground: "rgba(255, 255, 255, 0.05)",
        cardBorder: "1px solid rgba(255, 255, 255, 0.1)",
        cardShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        backdropBlur: "blur(20px)",
    },
    neomorphism: {
        name: "Neomorphism",
        description: "Soft shadows with 3D feel",
        cardBackground: "var(--background)",
        cardBorder: "none",
        cardShadow: "8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(255,255,255,0.05)",
        backdropBlur: "none",
    },
    flat: {
        name: "Flat",
        description: "Clean and minimal, no shadows",
        cardBackground: "rgba(255, 255, 255, 0.03)",
        cardBorder: "1px solid rgba(255, 255, 255, 0.08)",
        cardShadow: "none",
        backdropBlur: "none",
    },
    gradient: {
        name: "Gradient",
        description: "Bold gradient backgrounds",
        cardBackground: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))",
        cardBorder: "1px solid rgba(255, 255, 255, 0.1)",
        cardShadow: "0 4px 20px rgba(139, 92, 246, 0.2)",
        backdropBlur: "blur(10px)",
    },
};

// Border Radius Options
export type BorderRadiusOption = 'none' | 'small' | 'medium' | 'large' | 'full';

export const borderRadiusOptions: Record<BorderRadiusOption, string> = {
    'none': '0px',
    'small': '4px',
    'medium': '8px',
    'large': '16px',
    'full': '9999px',
};

// Default theme configuration
export const defaultThemeConfig = {
    layoutTemplate: 'classic' as LayoutTemplate,
    fontFamily: 'inter' as FontFamily,
    headingFont: 'inter' as FontFamily,
    colorPreset: 'cyberpunk' as ColorPreset,
    designStyle: 'glassmorphism' as DesignStyle,
    borderRadius: 'large' as BorderRadiusOption,
    animationsEnabled: true,
    accentPrimary: '#8b5cf6',
    accentSecondary: '#06b6d4',
    accentTertiary: '#ec4899',
};
