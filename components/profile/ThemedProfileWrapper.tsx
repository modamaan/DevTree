'use client';

import { themes, getThemeById, buttonStyles, fontFamilies } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface ThemedProfileWrapperProps {
    children: React.ReactNode;
    themeId: string;
    wallpaperType?: string;
    wallpaperValue?: string | null;
    fontFamily?: string;
}

export default function ThemedProfileWrapper({
    children,
    themeId,
    wallpaperType = 'gradient',
    wallpaperValue,
    fontFamily = 'mono',
}: ThemedProfileWrapperProps) {
    const theme = getThemeById(themeId);
    const font = fontFamilies.find(f => f.id === fontFamily) || fontFamilies[0];

    // Determine background classes
    let backgroundClass = theme.styles.background;

    if (wallpaperType === 'solid' && wallpaperValue) {
        backgroundClass = ''; // Will use inline style
    } else if (wallpaperType === 'gradient' && wallpaperValue) {
        backgroundClass = `bg-gradient-to-br ${wallpaperValue}`;
    }

    return (
        <div
            className={cn('min-h-screen', backgroundClass, font.class)}
            style={wallpaperType === 'solid' && wallpaperValue ? { backgroundColor: wallpaperValue } : undefined}
        >
            {/* Pattern overlay */}
            {theme.styles.backgroundPattern && (
                <div
                    className={cn(
                        'absolute inset-0',
                        theme.styles.backgroundPattern,
                        '[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'
                    )}
                />
            )}

            <div className="relative">
                {children}
            </div>
        </div>
    );
}

// Export theme context for child components
export function useThemeStyles(themeId: string) {
    return getThemeById(themeId).styles;
}
