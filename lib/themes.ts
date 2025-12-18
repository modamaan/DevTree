// Developer-centric themes for DevTree profiles
export interface Theme {
    id: string;
    name: string;
    description: string;
    preview: {
        background: string;
        accent: string;
        text: string;
        card: string;
    };
    styles: {
        background: string;
        backgroundPattern?: string;
        accent: string;
        accentHover: string;
        text: string;
        textMuted: string;
        card: string;
        cardBorder: string;
        heading: string;
    };
}

export const themes: Theme[] = [
    {
        id: 'terminal',
        name: 'Terminal',
        description: 'Classic terminal aesthetic with green on dark',
        preview: {
            background: '#0f172a',
            accent: '#22c55e',
            text: '#e2e8f0',
            card: '#1e293b',
        },
        styles: {
            background: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
            backgroundPattern: "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]",
            accent: 'text-green-400',
            accentHover: 'hover:text-green-300',
            text: 'text-slate-200',
            textMuted: 'text-slate-400',
            card: 'bg-slate-800/50',
            cardBorder: 'border-slate-700',
            heading: 'text-green-400',
        },
    },
    {
        id: 'vscode-dark',
        name: 'VS Code Dark',
        description: 'Inspired by VS Code\'s default dark theme',
        preview: {
            background: '#1e1e1e',
            accent: '#569cd6',
            text: '#d4d4d4',
            card: '#252526',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#1e1e1e] via-[#252526] to-[#1e1e1e]',
            backgroundPattern: "bg-[linear-gradient(to_right,#3c3c3c2e_1px,transparent_1px),linear-gradient(to_bottom,#3c3c3c2e_1px,transparent_1px)] bg-[size:20px_20px]",
            accent: 'text-[#569cd6]',
            accentHover: 'hover:text-[#9cdcfe]',
            text: 'text-[#d4d4d4]',
            textMuted: 'text-[#808080]',
            card: 'bg-[#252526]/80',
            cardBorder: 'border-[#3c3c3c]',
            heading: 'text-[#569cd6]',
        },
    },
    {
        id: 'github-dark',
        name: 'GitHub Dark',
        description: 'GitHub\'s dark mode color palette',
        preview: {
            background: '#0d1117',
            accent: '#58a6ff',
            text: '#c9d1d9',
            card: '#161b22',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117]',
            backgroundPattern: "bg-[linear-gradient(to_right,#30363d2e_1px,transparent_1px),linear-gradient(to_bottom,#30363d2e_1px,transparent_1px)] bg-[size:16px_16px]",
            accent: 'text-[#58a6ff]',
            accentHover: 'hover:text-[#79c0ff]',
            text: 'text-[#c9d1d9]',
            textMuted: 'text-[#8b949e]',
            card: 'bg-[#161b22]/80',
            cardBorder: 'border-[#30363d]',
            heading: 'text-[#58a6ff]',
        },
    },
    {
        id: 'dracula',
        name: 'Dracula',
        description: 'Popular Dracula theme with purple accents',
        preview: {
            background: '#282a36',
            accent: '#bd93f9',
            text: '#f8f8f2',
            card: '#44475a',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#282a36] via-[#1e1f29] to-[#282a36]',
            backgroundPattern: "bg-[linear-gradient(to_right,#44475a2e_1px,transparent_1px),linear-gradient(to_bottom,#44475a2e_1px,transparent_1px)] bg-[size:18px_18px]",
            accent: 'text-[#bd93f9]',
            accentHover: 'hover:text-[#ff79c6]',
            text: 'text-[#f8f8f2]',
            textMuted: 'text-[#6272a4]',
            card: 'bg-[#44475a]/60',
            cardBorder: 'border-[#6272a4]',
            heading: 'text-[#bd93f9]',
        },
    },
    {
        id: 'nord',
        name: 'Nord',
        description: 'Arctic, north-bluish color palette',
        preview: {
            background: '#2e3440',
            accent: '#88c0d0',
            text: '#eceff4',
            card: '#3b4252',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#2e3440] via-[#3b4252] to-[#2e3440]',
            backgroundPattern: "bg-[linear-gradient(to_right,#4c566a2e_1px,transparent_1px),linear-gradient(to_bottom,#4c566a2e_1px,transparent_1px)] bg-[size:16px_16px]",
            accent: 'text-[#88c0d0]',
            accentHover: 'hover:text-[#8fbcbb]',
            text: 'text-[#eceff4]',
            textMuted: 'text-[#d8dee9]',
            card: 'bg-[#3b4252]/70',
            cardBorder: 'border-[#4c566a]',
            heading: 'text-[#88c0d0]',
        },
    },
    {
        id: 'monokai',
        name: 'Monokai',
        description: 'Warm colors inspired by Monokai Pro',
        preview: {
            background: '#272822',
            accent: '#f92672',
            text: '#f8f8f2',
            card: '#3e3d32',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#272822] via-[#1e1f1c] to-[#272822]',
            backgroundPattern: "bg-[linear-gradient(to_right,#3e3d322e_1px,transparent_1px),linear-gradient(to_bottom,#3e3d322e_1px,transparent_1px)] bg-[size:14px_14px]",
            accent: 'text-[#f92672]',
            accentHover: 'hover:text-[#fd971f]',
            text: 'text-[#f8f8f2]',
            textMuted: 'text-[#75715e]',
            card: 'bg-[#3e3d32]/60',
            cardBorder: 'border-[#75715e]',
            heading: 'text-[#a6e22e]',
        },
    },
    {
        id: 'one-dark',
        name: 'One Dark',
        description: 'Atom\'s iconic One Dark theme',
        preview: {
            background: '#282c34',
            accent: '#61afef',
            text: '#abb2bf',
            card: '#21252b',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#282c34] via-[#21252b] to-[#282c34]',
            backgroundPattern: "bg-[linear-gradient(to_right,#3e4451_1px,transparent_1px),linear-gradient(to_bottom,#3e4451_1px,transparent_1px)] bg-[size:20px_20px] opacity-20",
            accent: 'text-[#61afef]',
            accentHover: 'hover:text-[#c678dd]',
            text: 'text-[#abb2bf]',
            textMuted: 'text-[#5c6370]',
            card: 'bg-[#21252b]/80',
            cardBorder: 'border-[#3e4451]',
            heading: 'text-[#61afef]',
        },
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk',
        description: 'Neon futuristic vibes',
        preview: {
            background: '#0a0a0f',
            accent: '#00fff9',
            text: '#ffffff',
            card: '#1a1a2e',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]',
            backgroundPattern: "bg-[linear-gradient(to_right,#ff00ff10_1px,transparent_1px),linear-gradient(to_bottom,#00fff910_1px,transparent_1px)] bg-[size:30px_30px]",
            accent: 'text-[#00fff9]',
            accentHover: 'hover:text-[#ff00ff]',
            text: 'text-white',
            textMuted: 'text-[#a855f7]',
            card: 'bg-[#1a1a2e]/70',
            cardBorder: 'border-[#ff00ff]/30',
            heading: 'text-[#00fff9]',
        },
    },
    {
        id: 'matrix',
        name: 'Matrix',
        description: 'Enter the Matrix with classic green',
        preview: {
            background: '#000000',
            accent: '#00ff00',
            text: '#00ff00',
            card: '#0a0a0a',
        },
        styles: {
            background: 'bg-black',
            backgroundPattern: "bg-[linear-gradient(to_right,#00ff0010_1px,transparent_1px),linear-gradient(to_bottom,#00ff0010_1px,transparent_1px)] bg-[size:20px_20px]",
            accent: 'text-[#00ff00]',
            accentHover: 'hover:text-[#66ff66]',
            text: 'text-[#00ff00]',
            textMuted: 'text-[#00aa00]',
            card: 'bg-[#0a0a0a]/90',
            cardBorder: 'border-[#00ff00]/30',
            heading: 'text-[#00ff00]',
        },
    },
    {
        id: 'solarized-dark',
        name: 'Solarized Dark',
        description: 'Classic Solarized dark color scheme',
        preview: {
            background: '#002b36',
            accent: '#268bd2',
            text: '#839496',
            card: '#073642',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#002b36] via-[#073642] to-[#002b36]',
            backgroundPattern: "bg-[linear-gradient(to_right,#586e752e_1px,transparent_1px),linear_gradient(to_bottom,#586e752e_1px,transparent_1px)] bg-[size:16px_16px]",
            accent: 'text-[#268bd2]',
            accentHover: 'hover:text-[#2aa198]',
            text: 'text-[#839496]',
            textMuted: 'text-[#586e75]',
            card: 'bg-[#073642]/70',
            cardBorder: 'border-[#586e75]',
            heading: 'text-[#268bd2]',
        },
    },
    {
        id: 'ocean',
        name: 'Ocean',
        description: 'Deep blue ocean gradients',
        preview: {
            background: '#0c1929',
            accent: '#00d4ff',
            text: '#e0f2fe',
            card: '#0f2744',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#0c1929] via-[#0f2744] to-[#0a1628]',
            backgroundPattern: "bg-[linear-gradient(to_right,#1e3a5f2e_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f2e_1px,transparent_1px)] bg-[size:24px_24px]",
            accent: 'text-[#00d4ff]',
            accentHover: 'hover:text-[#38bdf8]',
            text: 'text-[#e0f2fe]',
            textMuted: 'text-[#7dd3fc]',
            card: 'bg-[#0f2744]/70',
            cardBorder: 'border-[#1e3a5f]',
            heading: 'text-[#00d4ff]',
        },
    },
    {
        id: 'minimal-light',
        name: 'Minimal Light',
        description: 'Clean light mode for those who prefer it',
        preview: {
            background: '#ffffff',
            accent: '#0ea5e9',
            text: '#1e293b',
            card: '#f8fafc',
        },
        styles: {
            background: 'bg-gradient-to-br from-white via-slate-50 to-white',
            backgroundPattern: "bg-[linear-gradient(to_right,#e2e8f02e_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f02e_1px,transparent_1px)] bg-[size:16px_16px]",
            accent: 'text-sky-500',
            accentHover: 'hover:text-sky-600',
            text: 'text-slate-800',
            textMuted: 'text-slate-500',
            card: 'bg-white/80',
            cardBorder: 'border-slate-200',
            heading: 'text-sky-600',
        },
    },
];

// Wallpaper types
export interface WallpaperOption {
    id: string;
    name: string;
    type: 'solid' | 'gradient' | 'blur' | 'pattern';
    value: string;
    preview: string; // CSS for preview thumbnail
}

export const wallpaperPresets: WallpaperOption[] = [
    // Solid colors
    { id: 'solid-slate', name: 'Slate', type: 'solid', value: '#0f172a', preview: 'bg-slate-900' },
    { id: 'solid-zinc', name: 'Zinc', type: 'solid', value: '#18181b', preview: 'bg-zinc-900' },
    { id: 'solid-neutral', name: 'Neutral', type: 'solid', value: '#171717', preview: 'bg-neutral-900' },
    { id: 'solid-black', name: 'Pure Black', type: 'solid', value: '#000000', preview: 'bg-black' },

    // Gradients
    { id: 'gradient-slate', name: 'Slate Gradient', type: 'gradient', value: 'from-slate-950 via-slate-900 to-slate-950', preview: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' },
    { id: 'gradient-purple', name: 'Purple Haze', type: 'gradient', value: 'from-purple-950 via-slate-900 to-indigo-950', preview: 'bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950' },
    { id: 'gradient-ocean', name: 'Deep Ocean', type: 'gradient', value: 'from-blue-950 via-cyan-900 to-slate-950', preview: 'bg-gradient-to-br from-blue-950 via-cyan-900 to-slate-950' },
    { id: 'gradient-sunset', name: 'Sunset', type: 'gradient', value: 'from-orange-950 via-red-900 to-slate-950', preview: 'bg-gradient-to-br from-orange-950 via-red-900 to-slate-950' },
    { id: 'gradient-forest', name: 'Forest', type: 'gradient', value: 'from-green-950 via-emerald-900 to-slate-950', preview: 'bg-gradient-to-br from-green-950 via-emerald-900 to-slate-950' },
    { id: 'gradient-cyber', name: 'Cyber', type: 'gradient', value: 'from-fuchsia-950 via-violet-900 to-cyan-950', preview: 'bg-gradient-to-br from-fuchsia-950 via-violet-900 to-cyan-950' },

    // Blur/Glass effects
    { id: 'blur-dark', name: 'Dark Glass', type: 'blur', value: 'blur-dark', preview: 'bg-slate-900/50 backdrop-blur' },
    { id: 'blur-frosted', name: 'Frosted', type: 'blur', value: 'blur-frosted', preview: 'bg-white/10 backdrop-blur' },

    // Patterns
    { id: 'pattern-grid', name: 'Grid', type: 'pattern', value: 'grid', preview: 'bg-slate-900' },
    { id: 'pattern-dots', name: 'Dots', type: 'pattern', value: 'dots', preview: 'bg-slate-900' },
    { id: 'pattern-circuit', name: 'Circuit', type: 'pattern', value: 'circuit', preview: 'bg-slate-900' },
];

// Button styles
export const buttonStyles = [
    { id: 'rounded', name: 'Rounded', class: 'rounded-lg' },
    { id: 'pill', name: 'Pill', class: 'rounded-full' },
    { id: 'square', name: 'Square', class: 'rounded-none' },
    { id: 'outline', name: 'Outline', class: 'rounded-lg border-2 bg-transparent' },
];

// Font families
export const fontFamilies = [
    { id: 'mono', name: 'Monospace', class: 'font-mono' },
    { id: 'sans', name: 'Sans Serif', class: 'font-sans' },
    { id: 'serif', name: 'Serif', class: 'font-serif' },
];

// Helper function to get theme by ID
export function getThemeById(themeId: string): Theme {
    return themes.find(t => t.id === themeId) || themes[0];
}

// Helper function to get wallpaper by ID  
export function getWallpaperById(wallpaperId: string): WallpaperOption | undefined {
    return wallpaperPresets.find(w => w.id === wallpaperId);
}
