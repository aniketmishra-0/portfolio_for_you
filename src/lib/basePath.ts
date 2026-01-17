// Get the base path for assets in production
export const getBasePath = () => {
    if (typeof window !== 'undefined') {
        // Check if running on GitHub Pages
        if (window.location.hostname.includes('github.io')) {
            return '/portfolio_for_you';
        }
    }
    return '';
};

// Get full asset path
export const getAssetPath = (path: string) => {
    const basePath = getBasePath();
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${normalizedPath}`;
};
