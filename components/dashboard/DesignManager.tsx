'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    themes,
    wallpaperPresets,
    buttonStyles,
    fontFamilies,
    colorPalettes,
    designPresets,
    headerStyles,
    Theme,
    WallpaperOption,
    DesignPreset,
    HeaderStyle
} from '@/lib/themes';
import { updateDesign } from '@/app/actions/design';
import { Check, Loader2, Palette, Image, Type, MousePointer, Eye, X, Sparkles, RotateCcw, Wand2, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProfileHeader from '@/components/profile/ProfileHeader';

interface DesignSettings {
    themeId: string;
    wallpaperType: string;
    wallpaperValue: string | null;
    buttonStyle: string;
    buttonColor: string;
    fontFamily: string;
    headerStyle: string;
}

interface DesignManagerProps {
    initialSettings: DesignSettings;
}

export default function DesignManager({ initialSettings }: DesignManagerProps) {
    const [settings, setSettings] = useState<DesignSettings>(initialSettings);
    const [history, setHistory] = useState<DesignSettings[]>([initialSettings]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [isPending, startTransition] = useTransition();
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [showPreview, setShowPreview] = useState(false);
    const [showPresets, setShowPresets] = useState(false);

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;

    const handleSave = () => {
        setSaveStatus('saving');
        const formData = new FormData();
        formData.append('themeId', settings.themeId);
        formData.append('wallpaperType', settings.wallpaperType);
        formData.append('wallpaperValue', settings.wallpaperValue || '');
        formData.append('buttonStyle', settings.buttonStyle);
        formData.append('buttonColor', settings.buttonColor);
        formData.append('fontFamily', settings.fontFamily);
        formData.append('headerStyle', settings.headerStyle);

        startTransition(async () => {
            const result = await updateDesign(formData);
            if (result.success) {
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 2000);
            } else {
                setSaveStatus('idle');
                console.error(result.error);
            }
        });
    };

    const updateSetting = <K extends keyof DesignSettings>(key: K, value: DesignSettings[K]) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);

        // Add to history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newSettings);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const undo = () => {
        if (canUndo) {
            setHistoryIndex(historyIndex - 1);
            setSettings(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (canRedo) {
            setHistoryIndex(historyIndex + 1);
            setSettings(history[historyIndex + 1]);
        }
    };

    const resetToDefaults = () => {
        const defaults: DesignSettings = {
            themeId: 'terminal',
            wallpaperType: 'gradient',
            wallpaperValue: 'from-slate-950 via-slate-900 to-slate-950',
            buttonStyle: 'rounded',
            buttonColor: '#22c55e',
            fontFamily: 'mono',
            headerStyle: 'terminal',
        };
        updateSetting('themeId', defaults.themeId);
        updateSetting('wallpaperType', defaults.wallpaperType);
        updateSetting('wallpaperValue', defaults.wallpaperValue);
        updateSetting('buttonStyle', defaults.buttonStyle);
        updateSetting('buttonColor', defaults.buttonColor);
        updateSetting('fontFamily', defaults.fontFamily);
    };

    const applyPreset = (preset: DesignPreset) => {
        const newSettings = {
            themeId: preset.settings.themeId,
            wallpaperType: preset.settings.wallpaperType,
            wallpaperValue: preset.settings.wallpaperValue,
            buttonStyle: preset.settings.buttonStyle,
            buttonColor: preset.settings.buttonColor,
            fontFamily: preset.settings.fontFamily,
            headerStyle: settings.headerStyle,
        };
        setSettings(newSettings);

        // Add to history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newSettings);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);

        setShowPresets(false);
    };

    const selectedTheme = themes.find(t => t.id === settings.themeId) || themes[0];

    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Column - Controls */}
            <div className="flex-1">
                {/* Top Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={undo}
                            disabled={!canUndo}
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300 hover:bg-slate-800"
                        >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Undo
                        </Button>
                        <Button
                            onClick={redo}
                            disabled={!canRedo}
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300 hover:bg-slate-800"
                        >
                            <RotateCcw className="w-4 h-4 mr-1 scale-x-[-1]" />
                            Redo
                        </Button>
                        <Button
                            onClick={resetToDefaults}
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300 hover:bg-slate-800"
                        >
                            Reset
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setShowPresets(true)}
                            variant="outline"
                            size="sm"
                            className="border-green-600 text-green-400 hover:bg-green-600/10"
                        >
                            <Wand2 className="w-4 h-4 mr-1" />
                            Design Presets
                        </Button>
                        <div className="hidden lg:flex items-center gap-2">
                            {saveStatus === 'saved' && (
                                <span className="text-sm text-green-400 flex items-center gap-1 font-mono">
                                    <Check className="w-4 h-4" /> Saved!
                                </span>
                            )}
                            <Button
                                onClick={handleSave}
                                disabled={isPending}
                                className="bg-green-600 hover:bg-green-700 text-white font-mono"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabbed Interface */}
                <Tabs defaultValue="theme" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
                        <TabsTrigger value="theme" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                            <Palette className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Theme</span>
                        </TabsTrigger>
                        <TabsTrigger value="background" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                            <Image className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Background</span>
                        </TabsTrigger>
                        <TabsTrigger value="header" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                            <Layout className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Header</span>
                        </TabsTrigger>
                        <TabsTrigger value="buttons" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                            <MousePointer className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Buttons</span>
                        </TabsTrigger>
                        <TabsTrigger value="typography" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                            <Type className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Typography</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Theme Tab */}
                    <TabsContent value="theme" className="mt-6 space-y-4">
                        <div>
                            <h3 className="text-lg font-bold text-green-400 font-mono mb-2">{'>'}  Choose Your Theme</h3>
                            <p className="text-sm text-slate-400 mb-4">Select a developer-centric color scheme</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {themes.map((theme) => (
                                <ThemeCard
                                    key={theme.id}
                                    theme={theme}
                                    isSelected={settings.themeId === theme.id}
                                    onSelect={() => updateSetting('themeId', theme.id)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* Background Tab */}
                    <TabsContent value="background" className="mt-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-green-400 font-mono mb-2">{'>'}  Customize Background</h3>
                            <p className="text-sm text-slate-400 mb-4">Choose wallpaper type and style</p>
                        </div>

                        {/* Wallpaper Type Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {['gradient', 'solid', 'pattern', 'blur'].map((type) => (
                                <Button
                                    key={type}
                                    variant={settings.wallpaperType === type ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => updateSetting('wallpaperType', type)}
                                    className={cn(
                                        'font-mono capitalize transition-all',
                                        settings.wallpaperType === type
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'border-slate-600 text-slate-300 hover:bg-slate-800'
                                    )}
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>

                        {/* Wallpaper Options */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {wallpaperPresets
                                .filter(w => w.type === settings.wallpaperType)
                                .map((wallpaper) => (
                                    <WallpaperCard
                                        key={wallpaper.id}
                                        wallpaper={wallpaper}
                                        isSelected={settings.wallpaperValue === wallpaper.value}
                                        onSelect={() => updateSetting('wallpaperValue', wallpaper.value)}
                                    />
                                ))}
                        </div>
                    </TabsContent>

                    {/* Header Tab */}
                    <TabsContent value="header" className="mt-6 space-y-4">
                        <div>
                            <h3 className="text-lg font-bold text-green-400 font-mono mb-2">{'>'} Profile Header Style</h3>
                            <p className="text-sm text-slate-400 mb-4">Choose how your profile header appears</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {headerStyles.map((headerStyle) => (
                                <button
                                    key={headerStyle.id}
                                    type="button"
                                    onClick={() => updateSetting('headerStyle', headerStyle.id)}
                                    className={cn(
                                        'p-4 border-2 transition-all rounded-lg text-left hover:scale-105',
                                        settings.headerStyle === headerStyle.id
                                            ? 'border-green-500 bg-green-500/10'
                                            : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                                    )}
                                >
                                    {/* Preview */}
                                    <div className={cn('h-24 mb-3 rounded flex items-center justify-center text-xs text-slate-500', headerStyle.preview)}>
                                        <span className="font-mono">Preview</span>
                                    </div>

                                    {/* Name & Description */}
                                    <div>
                                        <h4 className="font-mono text-sm font-bold text-white mb-1">{headerStyle.name}</h4>
                                        <p className="text-xs text-slate-400">{headerStyle.description}</p>
                                    </div>

                                    {/* Selected indicator */}
                                    {settings.headerStyle === headerStyle.id && (
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Buttons Tab */}
                    <TabsContent value="buttons" className="mt-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-green-400 font-mono mb-2">{'>'}  Button Styling</h3>
                            <p className="text-sm text-slate-400 mb-4">Customize how your link buttons appear</p>
                        </div>

                        {/* Button Style */}
                        <div>
                            <label className="block text-sm font-mono text-slate-300 mb-3">Button Shape</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {buttonStyles.map((style) => (
                                    <button
                                        key={style.id}
                                        type="button"
                                        onClick={() => updateSetting('buttonStyle', style.id)}
                                        className={cn(
                                            'p-4 border-2 transition-all rounded-lg',
                                            settings.buttonStyle === style.id
                                                ? 'border-green-500 bg-green-500/10'
                                                : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'h-10 w-full flex items-center justify-center text-sm font-mono',
                                                style.class,
                                                style.id === 'outline'
                                                    ? 'border-2 border-green-500 text-green-400'
                                                    : 'bg-green-600 text-white'
                                            )}
                                        >
                                            {style.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Button Color */}
                        <div>
                            <label className="block text-sm font-mono text-slate-300 mb-3">Button Color</label>
                            <div className="space-y-4">
                                {colorPalettes.map((palette) => (
                                    <div key={palette.category}>
                                        <p className="text-xs text-slate-500 font-mono mb-2">{palette.category}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {palette.colors.map((color) => (
                                                <button
                                                    key={color}
                                                    type="button"
                                                    onClick={() => updateSetting('buttonColor', color)}
                                                    className={cn(
                                                        'w-10 h-10 rounded-lg transition-all hover:scale-110',
                                                        settings.buttonColor === color && 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white scale-110'
                                                    )}
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Custom Color Picker */}
                                <div className="pt-2">
                                    <p className="text-xs text-slate-500 font-mono mb-2">Custom</p>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={settings.buttonColor}
                                            onChange={(e) => updateSetting('buttonColor', e.target.value)}
                                            className="w-16 h-10 rounded-lg cursor-pointer border-2 border-slate-600"
                                            suppressHydrationWarning
                                        />
                                        <span className="text-sm font-mono text-slate-400">{settings.buttonColor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Typography Tab */}
                    <TabsContent value="typography" className="mt-6 space-y-4">
                        <div>
                            <h3 className="text-lg font-bold text-green-400 font-mono mb-2">{'>'}  Font Family</h3>
                            <p className="text-sm text-slate-400 mb-4">Choose your preferred typeface</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {fontFamilies.map((font) => (
                                <button
                                    key={font.id}
                                    type="button"
                                    onClick={() => updateSetting('fontFamily', font.id)}
                                    className={cn(
                                        'p-6 rounded-lg border-2 transition-all text-center',
                                        settings.fontFamily === font.id
                                            ? 'border-green-500 bg-green-500/10'
                                            : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                                    )}
                                >
                                    <span className={cn('text-3xl text-slate-200 block mb-2', font.class)}>Aa</span>
                                    <p className={cn('text-sm text-slate-400', font.class)}>{font.name}</p>
                                </button>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Mobile Save Button */}
                <div className="lg:hidden sticky bottom-0 z-10 bg-slate-900/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 border-t border-slate-700/50 mt-8">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-400 font-mono">
                            {saveStatus === 'saved' && (
                                <span className="text-green-400 flex items-center gap-2">
                                    <Check className="w-4 h-4" /> Saved!
                                </span>
                            )}
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={isPending}
                            className="bg-green-600 hover:bg-green-700 text-white font-mono"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Column - Live Preview (Sticky on desktop) */}
            <div className="lg:w-[400px] xl:w-[450px]">
                <div className="lg:sticky lg:top-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Eye className="w-5 h-5 text-green-400" />
                        <div>
                            <h2 className="text-xl font-bold text-green-400 font-mono">{'>'}  Live Preview</h2>
                            <p className="text-sm text-slate-400">See your changes in real-time</p>
                        </div>
                    </div>

                    <PreviewCard settings={settings} selectedTheme={selectedTheme} />
                </div>
            </div>

            {/* Mobile Preview Button */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <Button
                    onClick={() => setShowPreview(true)}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-mono shadow-lg shadow-green-500/30 rounded-full h-14 w-14 p-0"
                >
                    <Eye className="w-6 h-6" />
                </Button>
            </div>

            {/* Mobile Preview Modal */}
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="max-w-md bg-slate-900 border-slate-700">
                    <DialogHeader>
                        <DialogTitle className="text-green-400 font-mono flex items-center justify-between">
                            <span>{'>'}  Preview</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPreview(false)}
                                className="h-8 w-8 p-0 hover:bg-slate-800"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        <PreviewCard settings={settings} selectedTheme={selectedTheme} />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Design Presets Modal */}
            <Dialog open={showPresets} onOpenChange={setShowPresets}>
                <DialogContent className="max-w-3xl bg-slate-900 border-slate-700 max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-green-400 font-mono flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Design Presets
                        </DialogTitle>
                        <p className="text-sm text-slate-400">Apply a complete design with one click</p>
                    </DialogHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {designPresets.map((preset) => (
                            <PresetCard
                                key={preset.id}
                                preset={preset}
                                onApply={() => applyPreset(preset)}
                            />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Theme Card Component
function ThemeCard({
    theme,
    isSelected,
    onSelect,
}: {
    theme: Theme;
    isSelected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                'relative rounded-xl overflow-hidden border-2 transition-all aspect-[4/3] group',
                isSelected
                    ? 'border-green-500 ring-2 ring-green-500/30 scale-105'
                    : 'border-slate-600 hover:border-slate-500 hover:scale-102'
            )}
        >
            {/* Theme Preview */}
            <div
                className="absolute inset-0 transition-transform group-hover:scale-105"
                style={{ backgroundColor: theme.preview.background }}
            >
                {/* Mini preview elements */}
                <div className="absolute inset-0 p-3 flex flex-col items-center justify-center">
                    <div
                        className="w-8 h-8 rounded-full mb-2"
                        style={{ backgroundColor: theme.preview.card }}
                    />
                    <div
                        className="text-xs font-bold mb-1"
                        style={{ color: theme.preview.accent }}
                    >
                        Aa
                    </div>
                    <div
                        className="w-full h-2 rounded"
                        style={{ backgroundColor: theme.preview.accent }}
                    />
                </div>
            </div>

            {/* Selected indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in">
                    <Check className="w-4 h-4 text-white" />
                </div>
            )}

            {/* Theme name */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-2 py-1.5">
                <p className="text-xs font-mono text-white truncate">{theme.name}</p>
            </div>
        </button>
    );
}

// Wallpaper Card Component
function WallpaperCard({
    wallpaper,
    isSelected,
    onSelect,
}: {
    wallpaper: WallpaperOption;
    isSelected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                'relative rounded-xl overflow-hidden border-2 transition-all aspect-[3/4] group',
                isSelected
                    ? 'border-green-500 ring-2 ring-green-500/30 scale-105'
                    : 'border-slate-600 hover:border-slate-500 hover:scale-102'
            )}
        >
            {/* Wallpaper Preview */}
            <div className={cn('absolute inset-0 transition-transform group-hover:scale-105', wallpaper.preview)} />

            {/* Pattern overlay for pattern type */}
            {wallpaper.type === 'pattern' && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:8px_8px]" />
            )}

            {/* Selected indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in">
                    <Check className="w-4 h-4 text-white" />
                </div>
            )}

            {/* Wallpaper name */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-2 py-1.5">
                <p className="text-xs font-mono text-white truncate">{wallpaper.name}</p>
            </div>
        </button>
    );
}

// Preview Card Component
function PreviewCard({ settings, selectedTheme }: { settings: DesignSettings; selectedTheme: Theme }) {
    // Get the background style based on wallpaper selection
    const getBackgroundStyle = () => {
        if (!settings.wallpaperValue) {
            return selectedTheme.styles.background;
        }

        switch (settings.wallpaperType) {
            case 'solid':
                return ''; // Will use inline style
            case 'gradient':
                return `bg-gradient-to-br ${settings.wallpaperValue}`;
            case 'blur':
                return settings.wallpaperValue === 'blur-dark'
                    ? 'bg-slate-900/50 backdrop-blur'
                    : settings.wallpaperValue === 'blur-frosted'
                        ? 'bg-white/10 backdrop-blur'
                        : settings.wallpaperValue === 'blur-smoke'
                            ? 'bg-gray-900/40 backdrop-blur'
                            : 'bg-blue-900/30 backdrop-blur';
            case 'pattern':
                return 'bg-slate-900';
            default:
                return selectedTheme.styles.background;
        }
    };

    const getPatternOverlay = () => {
        if (settings.wallpaperType !== 'pattern' || !settings.wallpaperValue) return null;

        const patterns: Record<string, string> = {
            grid: 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]',
            dots: 'bg-[radial-gradient(circle,#4f4f4f2e_1px,transparent_1px)] bg-[size:16px_16px]',
            circuit: 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:20px_20px]',
            hexagon: 'bg-[linear-gradient(60deg,#4f4f4f2e_1px,transparent_1px),linear-gradient(-60deg,#4f4f4f2e_1px,transparent_1px)] bg-[size:20px_35px]',
            waves: 'bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#4f4f4f2e_10px,#4f4f4f2e_20px)]',
            topography: 'bg-[radial-gradient(circle_at_20%_50%,#4f4f4f2e_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#4f4f4f2e_0%,transparent_50%)]',
        };

        return patterns[settings.wallpaperValue] || patterns.grid;
    };

    const backgroundStyle = getBackgroundStyle();
    const patternOverlay = getPatternOverlay();
    const solidColor = settings.wallpaperType === 'solid' ? settings.wallpaperValue : undefined;

    return (
        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <CardContent className="p-0">
                <div
                    className={cn(
                        'relative p-6 min-h-[500px] transition-all duration-500',
                        backgroundStyle
                    )}
                    style={solidColor ? { backgroundColor: solidColor } : undefined}
                >
                    {/* Pattern overlay for pattern wallpapers */}
                    {patternOverlay && (
                        <div className={cn('absolute inset-0', patternOverlay)} />
                    )}

                    {/* Theme's background pattern (only if no custom wallpaper pattern) */}
                    {!patternOverlay && selectedTheme.styles.backgroundPattern && (
                        <div className={cn('absolute inset-0', selectedTheme.styles.backgroundPattern)} />
                    )}

                    <div className="relative max-w-2xl mx-auto overflow-hidden">
                        {/* Profile Header Preview - Scaled down for preview */}
                        <div className="scale-[0.85] origin-top -mb-12">
                            <ProfileHeader
                                profile={{
                                    username: 'developer',
                                    displayName: 'Developer Name',
                                    bio: 'Full-stack developer & open source enthusiast',
                                    avatar: null,
                                    location: 'San Francisco, CA',
                                    githubUrl: 'https://github.com',
                                    linkedinUrl: 'https://linkedin.com',
                                    twitterUrl: null,
                                    websiteUrl: 'https://example.com',
                                }}
                                headerStyle={settings.headerStyle}
                            />
                        </div>

                        {/* Sample links (styled like actual LinksList) */}
                        <div className="space-y-3 mt-6">
                            {['GitHub', 'Portfolio', 'LinkedIn'].map((label, index) => (
                                <div
                                    key={label}
                                    className={cn(
                                        'w-full py-3 px-4 text-left flex items-center justify-between transition-all hover:scale-105 hover:shadow-lg group',
                                        buttonStyles.find(s => s.id === settings.buttonStyle)?.class,
                                        fontFamilies.find(f => f.id === settings.fontFamily)?.class,
                                        index === 0 ? 'shadow-lg' : '' // First link highlighted
                                    )}
                                    style={{
                                        backgroundColor: index === 0 ? settings.buttonColor : 'rgba(30, 41, 59, 0.5)',
                                        borderColor: index === 0 ? settings.buttonColor : 'rgb(71, 85, 105)',
                                        borderWidth: settings.buttonStyle === 'outline' ? '2px' : '1px'
                                    }}
                                >
                                    <span className={cn(
                                        'text-sm flex items-center gap-2',
                                        index === 0 ? 'text-white font-semibold' : 'text-slate-200'
                                    )}>
                                        {index === 0 && <span className="text-xs">⭐</span>}
                                        {label}
                                    </span>
                                    <svg
                                        className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>
                            ))}
                        </div>

                        {/* Tech Stack Preview */}
                        <div className="mt-6 pt-6 border-t border-slate-700/50">
                            <p className={cn('text-xs mb-3', selectedTheme.styles.textMuted)}>Tech Stack</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {['React', 'Node.js', 'TypeScript'].map((tech) => (
                                    <span
                                        key={tech}
                                        className={cn(
                                            'px-3 py-1 text-xs rounded-full',
                                            selectedTheme.styles.card,
                                            selectedTheme.styles.text,
                                            `border ${selectedTheme.styles.cardBorder}`
                                        )}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Preset Card Component
function PresetCard({ preset, onApply }: { preset: DesignPreset; onApply: () => void }) {
    return (
        <button
            type="button"
            onClick={onApply}
            className="text-left p-4 rounded-lg border-2 border-slate-600 bg-slate-800/50 hover:border-green-500 hover:bg-slate-800 transition-all group"
        >
            <div className="flex items-start gap-3">
                <span className="text-3xl">{preset.emoji}</span>
                <div className="flex-1">
                    <h4 className="font-bold text-slate-200 group-hover:text-green-400 transition-colors mb-1">
                        {preset.name}
                    </h4>
                    <p className="text-sm text-slate-400">{preset.description}</p>
                </div>
            </div>
        </button>
    );
}
