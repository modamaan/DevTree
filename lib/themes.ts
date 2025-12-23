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
    {
        id: 'tokyo-night',
        name: 'Tokyo Night',
        description: 'Popular Tokyo Night theme with vibrant colors',
        preview: {
            background: '#1a1b26',
            accent: '#7aa2f7',
            text: '#c0caf5',
            card: '#24283b',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#1a1b26] via-[#24283b] to-[#1a1b26]',
            backgroundPattern: "bg-[linear-gradient(to_right,#414868_1px,transparent_1px),linear-gradient(to_bottom,#414868_1px,transparent_1px)] bg-[size:20px_20px] opacity-20",
            accent: 'text-[#7aa2f7]',
            accentHover: 'hover:text-[#bb9af7]',
            text: 'text-[#c0caf5]',
            textMuted: 'text-[#565f89]',
            card: 'bg-[#24283b]/80',
            cardBorder: 'border-[#414868]',
            heading: 'text-[#7aa2f7]',
        },
    },
    {
        id: 'gruvbox',
        name: 'Gruvbox',
        description: 'Retro groove with warm, earthy tones',
        preview: {
            background: '#282828',
            accent: '#d79921',
            text: '#ebdbb2',
            card: '#3c3836',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#282828] via-[#1d2021] to-[#282828]',
            backgroundPattern: "bg-[linear-gradient(to_right,#504945_1px,transparent_1px),linear-gradient(to_bottom,#504945_1px,transparent_1px)] bg-[size:18px_18px] opacity-30",
            accent: 'text-[#d79921]',
            accentHover: 'hover:text-[#fabd2f]',
            text: 'text-[#ebdbb2]',
            textMuted: 'text-[#a89984]',
            card: 'bg-[#3c3836]/70',
            cardBorder: 'border-[#504945]',
            heading: 'text-[#d79921]',
        },
    },
    {
        id: 'catppuccin',
        name: 'Catppuccin',
        description: 'Soothing pastel theme for the minimalists',
        preview: {
            background: '#1e1e2e',
            accent: '#cba6f7',
            text: '#cdd6f4',
            card: '#313244',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#1e1e2e] via-[#181825] to-[#1e1e2e]',
            backgroundPattern: "bg-[linear-gradient(to_right,#45475a_1px,transparent_1px),linear-gradient(to_bottom,#45475a_1px,transparent_1px)] bg-[size:16px_16px] opacity-25",
            accent: 'text-[#cba6f7]',
            accentHover: 'hover:text-[#f5c2e7]',
            text: 'text-[#cdd6f4]',
            textMuted: 'text-[#a6adc8]',
            card: 'bg-[#313244]/70',
            cardBorder: 'border-[#45475a]',
            heading: 'text-[#cba6f7]',
        },
    },
    {
        id: 'rose-pine',
        name: 'Rosé Pine',
        description: 'All natural pine, faux fur, and a bit of soho vibes',
        preview: {
            background: '#191724',
            accent: '#ebbcba',
            text: '#e0def4',
            card: '#1f1d2e',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#191724] via-[#1f1d2e] to-[#191724]',
            backgroundPattern: "bg-[linear-gradient(to_right,#26233a_1px,transparent_1px),linear-gradient(to_bottom,#26233a_1px,transparent_1px)] bg-[size:20px_20px] opacity-30",
            accent: 'text-[#ebbcba]',
            accentHover: 'hover:text-[#f6c177]',
            text: 'text-[#e0def4]',
            textMuted: 'text-[#908caa]',
            card: 'bg-[#1f1d2e]/70',
            cardBorder: 'border-[#26233a]',
            heading: 'text-[#ebbcba]',
        },
    },
    {
        id: 'everforest',
        name: 'Everforest',
        description: 'Comfortable and pleasant green forest theme',
        preview: {
            background: '#2b3339',
            accent: '#a7c080',
            text: '#d3c6aa',
            card: '#323c41',
        },
        styles: {
            background: 'bg-gradient-to-br from-[#2b3339] via-[#323c41] to-[#2b3339]',
            backgroundPattern: "bg-[linear-gradient(to_right,#3a464c_1px,transparent_1px),linear-gradient(to_bottom,#3a464c_1px,transparent_1px)] bg-[size:18px_18px] opacity-25",
            accent: 'text-[#a7c080]',
            accentHover: 'hover:text-[#dbbc7f]',
            text: 'text-[#d3c6aa]',
            textMuted: 'text-[#859289]',
            card: 'bg-[#323c41]/70',
            cardBorder: 'border-[#3a464c]',
            heading: 'text-[#a7c080]',
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
    { id: 'solid-charcoal', name: 'Charcoal', type: 'solid', value: '#1a1a1a', preview: 'bg-[#1a1a1a]' },
    { id: 'solid-midnight', name: 'Midnight', type: 'solid', value: '#0a0a0f', preview: 'bg-[#0a0a0f]' },

    // Modern Gradients
    { id: 'gradient-slate', name: 'Slate Gradient', type: 'gradient', value: 'from-slate-950 via-slate-900 to-slate-950', preview: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' },
    { id: 'gradient-purple', name: 'Purple Haze', type: 'gradient', value: 'from-purple-950 via-slate-900 to-indigo-950', preview: 'bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950' },
    { id: 'gradient-ocean', name: 'Deep Ocean', type: 'gradient', value: 'from-blue-950 via-cyan-900 to-slate-950', preview: 'bg-gradient-to-br from-blue-950 via-cyan-900 to-slate-950' },
    { id: 'gradient-sunset', name: 'Sunset', type: 'gradient', value: 'from-orange-950 via-red-900 to-slate-950', preview: 'bg-gradient-to-br from-orange-950 via-red-900 to-slate-950' },
    { id: 'gradient-forest', name: 'Forest', type: 'gradient', value: 'from-green-950 via-emerald-900 to-slate-950', preview: 'bg-gradient-to-br from-green-950 via-emerald-900 to-slate-950' },
    { id: 'gradient-cyber', name: 'Cyber', type: 'gradient', value: 'from-fuchsia-950 via-violet-900 to-cyan-950', preview: 'bg-gradient-to-br from-fuchsia-950 via-violet-900 to-cyan-950' },

    // New Modern Gradients
    { id: 'gradient-aurora', name: 'Aurora', type: 'gradient', value: 'from-violet-950 via-purple-900 to-fuchsia-950', preview: 'bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-950' },
    { id: 'gradient-cosmic', name: 'Cosmic', type: 'gradient', value: 'from-indigo-950 via-purple-950 to-pink-950', preview: 'bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950' },
    { id: 'gradient-neon', name: 'Neon Dreams', type: 'gradient', value: 'from-cyan-950 via-blue-950 to-purple-950', preview: 'bg-gradient-to-br from-cyan-950 via-blue-950 to-purple-950' },
    { id: 'gradient-fire', name: 'Fire', type: 'gradient', value: 'from-red-950 via-orange-950 to-yellow-950', preview: 'bg-gradient-to-br from-red-950 via-orange-950 to-yellow-950' },
    { id: 'gradient-ice', name: 'Ice', type: 'gradient', value: 'from-blue-950 via-sky-900 to-cyan-950', preview: 'bg-gradient-to-br from-blue-950 via-sky-900 to-cyan-950' },
    { id: 'gradient-mint', name: 'Mint', type: 'gradient', value: 'from-emerald-950 via-teal-900 to-cyan-950', preview: 'bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950' },
    { id: 'gradient-rose', name: 'Rose', type: 'gradient', value: 'from-pink-950 via-rose-900 to-red-950', preview: 'bg-gradient-to-br from-pink-950 via-rose-900 to-red-950' },
    { id: 'gradient-amber', name: 'Amber', type: 'gradient', value: 'from-amber-950 via-orange-900 to-red-950', preview: 'bg-gradient-to-br from-amber-950 via-orange-900 to-red-950' },
    { id: 'gradient-emerald', name: 'Emerald', type: 'gradient', value: 'from-emerald-950 via-green-900 to-teal-950', preview: 'bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950' },
    { id: 'gradient-sapphire', name: 'Sapphire', type: 'gradient', value: 'from-blue-950 via-indigo-900 to-violet-950', preview: 'bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-950' },
    { id: 'gradient-midnight', name: 'Midnight', type: 'gradient', value: 'from-slate-950 via-blue-950 to-slate-950', preview: 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950' },
    { id: 'gradient-volcano', name: 'Volcano', type: 'gradient', value: 'from-orange-950 via-red-950 to-slate-950', preview: 'bg-gradient-to-br from-orange-950 via-red-950 to-slate-950' },
    { id: 'gradient-tropical', name: 'Tropical', type: 'gradient', value: 'from-teal-950 via-green-900 to-lime-950', preview: 'bg-gradient-to-br from-teal-950 via-green-900 to-lime-950' },
    { id: 'gradient-lavender', name: 'Lavender', type: 'gradient', value: 'from-purple-950 via-violet-900 to-indigo-950', preview: 'bg-gradient-to-br from-purple-950 via-violet-900 to-indigo-950' },

    // Blur/Glass effects
    { id: 'blur-dark', name: 'Dark Glass', type: 'blur', value: 'blur-dark', preview: 'bg-slate-900/50 backdrop-blur' },
    { id: 'blur-frosted', name: 'Frosted', type: 'blur', value: 'blur-frosted', preview: 'bg-white/10 backdrop-blur' },
    { id: 'blur-smoke', name: 'Smoke', type: 'blur', value: 'blur-smoke', preview: 'bg-gray-900/40 backdrop-blur' },
    { id: 'blur-ocean', name: 'Ocean Glass', type: 'blur', value: 'blur-ocean', preview: 'bg-blue-900/30 backdrop-blur' },

    // Patterns
    { id: 'pattern-grid', name: 'Grid', type: 'pattern', value: 'grid', preview: 'bg-slate-900' },
    { id: 'pattern-dots', name: 'Dots', type: 'pattern', value: 'dots', preview: 'bg-slate-900' },
    { id: 'pattern-circuit', name: 'Circuit', type: 'pattern', value: 'circuit', preview: 'bg-slate-900' },
    { id: 'pattern-hexagon', name: 'Hexagon', type: 'pattern', value: 'hexagon', preview: 'bg-slate-900' },
    { id: 'pattern-waves', name: 'Waves', type: 'pattern', value: 'waves', preview: 'bg-slate-900' },
    { id: 'pattern-topography', name: 'Topography', type: 'pattern', value: 'topography', preview: 'bg-slate-900' },
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

// Color Palettes - Organized by category
export interface ColorPalette {
    category: string;
    colors: string[];
}

export const colorPalettes: ColorPalette[] = [
    {
        category: 'Vibrant',
        colors: ['#22c55e', '#3b82f6', '#8b5cf6', '#f97316', '#ef4444', '#ec4899', '#eab308', '#06b6d4'],
    },
    {
        category: 'Pastel',
        colors: ['#a7f3d0', '#bfdbfe', '#ddd6fe', '#fed7aa', '#fecaca', '#fbcfe8', '#fef08a', '#a5f3fc'],
    },
    {
        category: 'Dark',
        colors: ['#166534', '#1e40af', '#6b21a8', '#c2410c', '#991b1b', '#9f1239', '#a16207', '#0e7490'],
    },
    {
        category: 'Neon',
        colors: ['#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#00ff80', '#8000ff', '#ff8000'],
    },
    {
        category: 'Earth',
        colors: ['#78716c', '#a8a29e', '#d6d3d1', '#92400e', '#713f12', '#365314', '#14532d', '#164e63'],
    },
];

// Design Preset Templates - Complete one-click designs
export interface DesignPreset {
    id: string;
    name: string;
    description: string;
    emoji: string;
    settings: {
        themeId: string;
        wallpaperType: 'solid' | 'gradient' | 'blur' | 'pattern';
        wallpaperValue: string;
        buttonStyle: 'rounded' | 'pill' | 'square' | 'outline';
        buttonColor: string;
        fontFamily: 'mono' | 'sans' | 'serif';
    };
}

export const designPresets: DesignPreset[] = [
    {
        id: 'minimalist-pro',
        name: 'Minimalist Pro',
        description: 'Clean and professional with subtle gradients',
        emoji: '✨',
        settings: {
            themeId: 'terminal',
            wallpaperType: 'gradient',
            wallpaperValue: 'from-slate-950 via-slate-900 to-slate-950',
            buttonStyle: 'rounded',
            buttonColor: '#22c55e',
            fontFamily: 'sans',
        },
    },
    {
        id: 'neon-developer',
        name: 'Neon Developer',
        description: 'Cyberpunk vibes with neon accents',
        emoji: '⚡',
        settings: {
            themeId: 'cyberpunk',
            wallpaperType: 'gradient',
            wallpaperValue: 'from-fuchsia-950 via-violet-900 to-cyan-950',
            buttonStyle: 'pill',
            buttonColor: '#00fff9',
            fontFamily: 'mono',
        },
    },
    {
        id: 'classic-terminal',
        name: 'Classic Terminal',
        description: 'Old-school hacker aesthetic',
        emoji: '💻',
        settings: {
            themeId: 'matrix',
            wallpaperType: 'pattern',
            wallpaperValue: 'grid',
            buttonStyle: 'square',
            buttonColor: '#00ff00',
            fontFamily: 'mono',
        },
    },
    {
        id: 'modern-glass',
        name: 'Modern Glass',
        description: 'Sleek glassmorphism design',
        emoji: '🔮',
        settings: {
            themeId: 'nord',
            wallpaperType: 'blur',
            wallpaperValue: 'blur-frosted',
            buttonStyle: 'rounded',
            buttonColor: '#88c0d0',
            fontFamily: 'sans',
        },
    },
    {
        id: 'retro-wave',
        name: 'Retro Wave',
        description: 'Synthwave inspired design',
        emoji: '🌆',
        settings: {
            themeId: 'dracula',
            wallpaperType: 'gradient',
            wallpaperValue: 'from-purple-950 via-violet-900 to-indigo-950',
            buttonStyle: 'pill',
            buttonColor: '#bd93f9',
            fontFamily: 'mono',
        },
    },
    {
        id: 'ocean-breeze',
        name: 'Ocean Breeze',
        description: 'Calm and refreshing blue tones',
        emoji: '🌊',
        settings: {
            themeId: 'ocean',
            wallpaperType: 'gradient',
            wallpaperValue: 'from-blue-950 via-cyan-900 to-slate-950',
            buttonStyle: 'rounded',
            buttonColor: '#00d4ff',
            fontFamily: 'sans',
        },
    },
    {
        id: 'forest-zen',
        name: 'Forest Zen',
        description: 'Natural green tones for focus',
        emoji: '🌲',
        settings: {
            themeId: 'everforest',
            wallpaperType: 'gradient',
            wallpaperValue: 'from-green-950 via-emerald-900 to-slate-950',
            buttonStyle: 'rounded',
            buttonColor: '#a7c080',
            fontFamily: 'serif',
        },
    },
    {
        id: 'tokyo-nights',
        name: 'Tokyo Nights',
        description: 'Vibrant Tokyo Night theme',
        emoji: '🗼',
        settings: {
            themeId: 'tokyo-night',
            wallpaperType: 'gradient',
            wallpaperValue: 'from-indigo-950 via-purple-950 to-pink-950',
            buttonStyle: 'rounded',
            buttonColor: '#7aa2f7',
            fontFamily: 'mono',
        },
    },
];

// Header Style Options
export interface HeaderStyle {
    id: string;
    name: string;
    description: string;
    preview: string; // Tailwind classes for preview
}

export const headerStyles: HeaderStyle[] = [
    {
        id: 'terminal',
        name: 'Terminal',
        description: 'Classic terminal window with colored dots and command prompt',
        preview: 'bg-slate-800 border border-slate-700 rounded-lg',
    },
    {
        id: 'code_editor',
        name: 'Code Editor',
        description: 'VS Code style with tabs, line numbers, and syntax highlighting',
        preview: 'bg-[#1e1e1e] border border-slate-700 rounded-lg',
    },
    {
        id: 'git_commit',
        name: 'Git Commit',
        description: 'Git commit message format with hash, author, and timestamp',
        preview: 'bg-slate-900 border-l-4 border-green-500 rounded',
    },
    {
        id: 'readme',
        name: 'README.md',
        description: 'GitHub markdown style with badges and documentation layout',
        preview: 'bg-white/5 border border-slate-700 rounded-lg',
    },
    {
        id: 'console_log',
        name: 'Console Log',
        description: 'Browser console aesthetic with timestamps and log levels',
        preview: 'bg-slate-950 border border-slate-800 rounded font-mono',
    },
];

// Helper function to get header style by ID
export function getHeaderStyleById(id: string): HeaderStyle {
    return headerStyles.find((style) => style.id === id) || headerStyles[0];
}
