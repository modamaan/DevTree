'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { themes, wallpaperPresets, buttonStyles, fontFamilies, Theme, WallpaperOption } from '@/lib/themes';
import { updateDesign } from '@/app/actions/design';
import { Check, Loader2, Palette, Image, Type, MousePointer, Eye, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesignSettings {
    themeId: string;
    wallpaperType: string;
    wallpaperValue: string | null;
    buttonStyle: string;
    buttonColor: string;
    fontFamily: string;
}

interface DesignManagerProps {
    initialSettings: DesignSettings;
}

export default function DesignManager({ initialSettings }: DesignManagerProps) {
    const [settings, setSettings] = useState<DesignSettings>(initialSettings);
    const [isPending, startTransition] = useTransition();
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [showPreview, setShowPreview] = useState(false);

    const handleSave = () => {
        setSaveStatus('saving');
        const formData = new FormData();
        formData.append('themeId', settings.themeId);
        formData.append('wallpaperType', settings.wallpaperType);
        formData.append('wallpaperValue', settings.wallpaperValue || '');
        formData.append('buttonStyle', settings.buttonStyle);
        formData.append('buttonColor', settings.buttonColor);
        formData.append('fontFamily', settings.fontFamily);

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
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const selectedTheme = themes.find(t => t.id === settings.themeId) || themes[0];

    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Column - Controls */}
            <div className="flex-1 space-y-8">
                {/* Save Button - Sticky on mobile */}
                <div className="lg:hidden sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-slate-700/50">
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

                {/* Theme Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Palette className="w-6 h-6 text-green-400" />
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono">{'>'} Theme</h2>
                            <p className="text-sm text-slate-400">Choose a developer-centric color scheme</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {themes.map((theme) => (
                            <ThemeCard
                                key={theme.id}
                                theme={theme}
                                isSelected={settings.themeId === theme.id}
                                onSelect={() => updateSetting('themeId', theme.id)}
                            />
                        ))}
                    </div>
                </section>

                {/* Wallpaper Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Image className="w-6 h-6 text-green-400" />
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono">{'>'} Wallpaper</h2>
                            <p className="text-sm text-slate-400">Customize your profile background</p>
                        </div>
                    </div>

                    {/* Wallpaper Type Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['gradient', 'solid', 'pattern', 'blur'].map((type) => (
                            <Button
                                key={type}
                                variant={settings.wallpaperType === type ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateSetting('wallpaperType', type)}
                                className={cn(
                                    'font-mono capitalize',
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                </section>

                {/* Button Style Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <MousePointer className="w-6 h-6 text-green-400" />
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono">{'>'} Button Style</h2>
                            <p className="text-sm text-slate-400">How your link buttons appear</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {buttonStyles.map((style) => (
                            <button
                                key={style.id}
                                type="button"
                                onClick={() => updateSetting('buttonStyle', style.id)}
                                className={cn(
                                    'p-4 border-2 transition-all',
                                    style.class,
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

                    {/* Button Color */}
                    <div className="mt-6">
                        <label className="block text-sm font-mono text-slate-300 mb-3">Button Color</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={settings.buttonColor}
                                onChange={(e) => updateSetting('buttonColor', e.target.value)}
                                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-slate-600"
                                suppressHydrationWarning
                            />
                            <div className="flex gap-2">
                                {['#22c55e', '#3b82f6', '#8b5cf6', '#f97316', '#ef4444', '#ec4899'].map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => updateSetting('buttonColor', color)}
                                        className={cn(
                                            'w-8 h-8 rounded-full transition-transform hover:scale-110',
                                            settings.buttonColor === color && 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white'
                                        )}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Font Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Type className="w-6 h-6 text-green-400" />
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono">{'>'} Typography</h2>
                            <p className="text-sm text-slate-400">Choose your font style</p>
                        </div>
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
                                <span className={cn('text-2xl text-slate-200', font.class)}>Aa</span>
                                <p className={cn('mt-2 text-sm text-slate-400', font.class)}>{font.name}</p>
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column - Live Preview (Sticky on desktop) */}
            <div className="lg:w-[400px] xl:w-[450px]">
                <div className="lg:sticky lg:top-6 space-y-4">
                    {/* Save Button - Desktop only */}
                    <div className="hidden lg:flex justify-between items-center pb-4 border-b border-slate-700/50">
                        <div className="text-sm text-slate-400 font-mono">
                            {saveStatus === 'saved' && (
                                <span className="text-green-400 flex items-center gap-2">
                                    <Check className="w-4 h-4" /> Changes saved!
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
                                'Save'
                            )}
                        </Button>
                    </div>

                    {/* Preview */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-green-400 font-mono">{'>'} Preview</h2>
                                <p className="text-sm text-slate-400">Live preview of your profile</p>
                            </div>
                        </div>

                        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                            <CardContent className="p-0">
                                <div
                                    className={cn(
                                        'relative p-6 min-h-[400px]',
                                        selectedTheme.styles.background
                                    )}
                                >
                                    {selectedTheme.styles.backgroundPattern && (
                                        <div className={cn('absolute inset-0', selectedTheme.styles.backgroundPattern)} />
                                    )}
                                    <div className="relative max-w-sm mx-auto text-center">
                                        {/* Avatar placeholder */}
                                        <div className={cn(
                                            'w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl',
                                            selectedTheme.styles.card,
                                            `border ${selectedTheme.styles.cardBorder}`
                                        )}>
                                            👨‍💻
                                        </div>

                                        {/* Name */}
                                        <h3 className={cn(
                                            'text-lg font-bold mb-1',
                                            selectedTheme.styles.heading,
                                            fontFamilies.find(f => f.id === settings.fontFamily)?.class
                                        )}>
                                            Developer Name
                                        </h3>

                                        {/* Bio */}
                                        <p className={cn(
                                            'text-xs mb-4',
                                            selectedTheme.styles.textMuted,
                                            fontFamilies.find(f => f.id === settings.fontFamily)?.class
                                        )}>
                                            Full-stack developer & open source enthusiast
                                        </p>

                                        {/* Sample buttons */}
                                        <div className="space-y-2">
                                            {['GitHub', 'Portfolio', 'LinkedIn'].map((label) => (
                                                <button
                                                    key={label}
                                                    type="button"
                                                    className={cn(
                                                        'w-full py-2.5 px-4 text-white text-sm transition-all',
                                                        buttonStyles.find(s => s.id === settings.buttonStyle)?.class,
                                                        fontFamilies.find(f => f.id === settings.fontFamily)?.class
                                                    )}
                                                    style={{ backgroundColor: settings.buttonColor }}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Mobile Preview Button - Fixed floating button */}
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
                            <span>{'>'} Preview</span>
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
                        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                            <CardContent className="p-0">
                                <div
                                    className={cn(
                                        'relative p-6 min-h-[400px]',
                                        selectedTheme.styles.background
                                    )}
                                >
                                    {selectedTheme.styles.backgroundPattern && (
                                        <div className={cn('absolute inset-0', selectedTheme.styles.backgroundPattern)} />
                                    )}
                                    <div className="relative max-w-sm mx-auto text-center">
                                        {/* Avatar placeholder */}
                                        <div className={cn(
                                            'w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl',
                                            selectedTheme.styles.card,
                                            `border ${selectedTheme.styles.cardBorder}`
                                        )}>
                                            👨‍💻
                                        </div>

                                        {/* Name */}
                                        <h3 className={cn(
                                            'text-lg font-bold mb-1',
                                            selectedTheme.styles.heading,
                                            fontFamilies.find(f => f.id === settings.fontFamily)?.class
                                        )}>
                                            Developer Name
                                        </h3>

                                        {/* Bio */}
                                        <p className={cn(
                                            'text-xs mb-4',
                                            selectedTheme.styles.textMuted,
                                            fontFamilies.find(f => f.id === settings.fontFamily)?.class
                                        )}>
                                            Full-stack developer & open source enthusiast
                                        </p>

                                        {/* Sample buttons */}
                                        <div className="space-y-2">
                                            {['GitHub', 'Portfolio', 'LinkedIn'].map((label) => (
                                                <button
                                                    key={label}
                                                    type="button"
                                                    className={cn(
                                                        'w-full py-2.5 px-4 text-white text-sm transition-all',
                                                        buttonStyles.find(s => s.id === settings.buttonStyle)?.class,
                                                        fontFamilies.find(f => f.id === settings.fontFamily)?.class
                                                    )}
                                                    style={{ backgroundColor: settings.buttonColor }}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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
                'relative rounded-xl overflow-hidden border-2 transition-all aspect-[4/3]',
                isSelected
                    ? 'border-green-500 ring-2 ring-green-500/30'
                    : 'border-slate-600 hover:border-slate-500'
            )}
        >
            {/* Theme Preview */}
            <div
                className="absolute inset-0"
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
                <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                </div>
            )}

            {/* Theme name */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-2 py-1.5">
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
                'relative rounded-xl overflow-hidden border-2 transition-all aspect-[3/4]',
                isSelected
                    ? 'border-green-500 ring-2 ring-green-500/30'
                    : 'border-slate-600 hover:border-slate-500'
            )}
        >
            {/* Wallpaper Preview */}
            <div className={cn('absolute inset-0', wallpaper.preview)} />

            {/* Pattern overlay for pattern type */}
            {wallpaper.type === 'pattern' && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:8px_8px]" />
            )}

            {/* Selected indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                </div>
            )}

            {/* Wallpaper name */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-2 py-1.5">
                <p className="text-xs font-mono text-white truncate">{wallpaper.name}</p>
            </div>
        </button>
    );
}
