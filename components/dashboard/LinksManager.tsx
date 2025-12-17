'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createLink, updateLink, deleteLink, reorderLinks } from '@/app/actions/links';
import { Pencil, Trash2, Plus, GripVertical, Eye, EyeOff, Star } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Link {
    id: string;
    title: string;
    url: string;
    enabled: boolean | null;
    highlighted: boolean | null;
    order: number;
    clicks: number | null;
}

interface LinksManagerProps {
    links: Link[];
}

export default function LinksManager({ links: initialLinks }: LinksManagerProps) {
    const [links, setLinks] = useState(initialLinks);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Debounce ref for reorder API calls
    const reorderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pendingUpdatesRef = useRef<{ id: string; order: number }[] | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Debounced reorder function - waits 500ms after last drag before saving
    const debouncedReorderLinks = useCallback((updates: { id: string; order: number }[]) => {
        // Store the latest updates
        pendingUpdatesRef.current = updates;

        // Clear any existing timeout
        if (reorderTimeoutRef.current) {
            clearTimeout(reorderTimeoutRef.current);
        }

        // Set new timeout - only save after 500ms of inactivity
        reorderTimeoutRef.current = setTimeout(() => {
            if (pendingUpdatesRef.current) {
                reorderLinks(pendingUpdatesRef.current);
                pendingUpdatesRef.current = null;
            }
        }, 500);
    }, []);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = links.findIndex((item) => item.id === active.id);
            const newIndex = links.findIndex((item) => item.id === over.id);
            const newItems = arrayMove(links, oldIndex, newIndex);

            // Update state immediately for responsive UI
            setLinks(newItems);

            // Debounced save to database - batches rapid reorders
            const updates = newItems.map((item, index) => ({
                id: item.id,
                order: index,
            }));
            debouncedReorderLinks(updates);
        }
    }

    async function handleDelete(id: string) {
        if (confirm('Are you sure you want to delete this link?')) {
            await deleteLink(id);
            setLinks(links.filter((l) => l.id !== id));
        }
    }

    return (
        <div className="space-y-6">
            {/* Add New Link Button */}
            {!isAdding && (
                <Button
                    onClick={() => setIsAdding(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-mono"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                </Button>
            )}

            {/* Add Link Form */}
            {isAdding && (
                <LinkForm
                    onCancel={() => setIsAdding(false)}
                    onSuccess={(newLink) => {
                        setLinks([...links, newLink]);
                        setIsAdding(false);
                    }}
                />
            )}

            {/* Links List */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                        {links.map((link) => (
                            <SortableLink
                                key={link.id}
                                link={link}
                                isEditing={editingId === link.id}
                                onEdit={() => setEditingId(link.id)}
                                onCancelEdit={() => setEditingId(null)}
                                onDelete={() => handleDelete(link.id)}
                                onUpdate={(updated) => {
                                    setLinks(links.map((l) => (l.id === link.id ? { ...l, ...updated } : l)));
                                    setEditingId(null);
                                }}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {links.length === 0 && !isAdding && (
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="py-12 text-center">
                        <p className="text-slate-400">No links yet. Add your first link to get started!</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function SortableLink({
    link,
    isEditing,
    onEdit,
    onCancelEdit,
    onDelete,
    onUpdate,
}: {
    link: Link;
    isEditing: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    onUpdate: (updated: Partial<Link>) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isEditing) {
        return (
            <LinkForm
                link={link}
                onCancel={onCancelEdit}
                onSuccess={onUpdate}
            />
        );
    }

    return (
        <div ref={setNodeRef} style={style} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-4">
                <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-green-400 mt-1">
                    <GripVertical className="w-5 h-5" />
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-white font-mono text-sm sm:text-base">{link.title}</h3>
                        {link.highlighted && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        {!link.enabled && <EyeOff className="w-4 h-4 text-slate-500" />}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 truncate">{link.url}</p>
                    <p className="text-xs text-slate-500 mt-1">{link.clicks || 0} clicks</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onEdit}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 h-9 w-9 p-0 sm:w-auto sm:px-3"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onDelete}
                        className="border-red-700 text-red-400 hover:bg-red-900/20 h-9 w-9 p-0 sm:w-auto sm:px-3"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function LinkForm({
    link,
    onCancel,
    onSuccess,
}: {
    link?: Link;
    onCancel: () => void;
    onSuccess: (link: any) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        const result = link
            ? await updateLink(link.id, formData)
            : await createLink(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            const data = {
                id: link?.id || crypto.randomUUID(),
                title: formData.get('title') as string,
                url: formData.get('url') as string,
                enabled: formData.get('enabled') === 'true',
                highlighted: formData.get('highlighted') === 'true',
                order: link?.order || 0,
                clicks: link?.clicks || 0,
            };
            onSuccess(data);
        }
    }

    return (
        <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
                <CardTitle className="text-green-400 font-mono">{link ? 'Edit Link' : 'Add New Link'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={link?.title}
                            required
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="My Portfolio"
                        />
                    </div>

                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            URL *
                        </label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            defaultValue={link?.url}
                            required
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="enabled"
                                name="enabled"
                                value="true"
                                defaultChecked={link?.enabled ?? true}
                                className="w-4 h-4 bg-slate-900 border-slate-600 rounded focus:ring-2 focus:ring-green-500"
                            />
                            <label htmlFor="enabled" className="text-sm text-slate-300">
                                <Eye className="w-4 h-4 inline mr-1" />
                                Enabled
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="highlighted"
                                name="highlighted"
                                value="true"
                                defaultChecked={link?.highlighted ?? false}
                                className="w-4 h-4 bg-slate-900 border-slate-600 rounded focus:ring-2 focus:ring-green-500"
                            />
                            <label htmlFor="highlighted" className="text-sm text-slate-300">
                                <Star className="w-4 h-4 inline mr-1" />
                                Highlight as CTA
                            </label>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-mono"
                        >
                            {loading ? 'Saving...' : link ? 'Update Link' : 'Add Link'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
