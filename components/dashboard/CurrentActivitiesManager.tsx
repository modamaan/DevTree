'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addActivity, removeActivity } from '@/app/actions/activities';
import { Plus, X, Hammer, BookOpen } from 'lucide-react';

interface Activity {
    id: string;
    name: string;
    type: 'building' | 'learning';
    createdAt: Date;
}

interface CurrentActivitiesManagerProps {
    activities: Activity[];
}

export default function CurrentActivitiesManager({ activities: initialActivities }: CurrentActivitiesManagerProps) {
    const [activities, setActivities] = useState(initialActivities);
    const [isAdding, setIsAdding] = useState(false);
    const [activityType, setActivityType] = useState<'building' | 'learning'>('building');

    const buildingActivities = activities.filter(a => a.type === 'building');
    const learningActivities = activities.filter(a => a.type === 'learning');

    async function handleRemove(id: string) {
        const result = await removeActivity(id);
        if (!result.error) {
            setActivities(activities.filter(a => a.id !== id));
        }
    }

    return (
        <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
                <CardTitle className="text-green-400 font-mono">Current Activities</CardTitle>
                <CardDescription className="text-slate-400">
                    What are you currently building or learning?
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Building Section */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-mono flex items-center gap-2">
                            <Hammer className="w-4 h-4 text-orange-400" />
                            Currently Building
                        </h3>
                        <Button
                            size="sm"
                            onClick={() => {
                                setActivityType('building');
                                setIsAdding(true);
                            }}
                            className="bg-orange-600 hover:bg-orange-700 text-white h-8 px-3"
                        >
                            <Plus className="w-3 h-3" />
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {buildingActivities.map(activity => (
                            <ActivityItem
                                key={activity.id}
                                activity={activity}
                                onRemove={handleRemove}
                            />
                        ))}
                        {buildingActivities.length === 0 && !isAdding && (
                            <p className="text-sm text-slate-500 italic">No building activities yet</p>
                        )}
                    </div>
                </div>

                {/* Learning Section */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-mono flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            Currently Learning
                        </h3>
                        <Button
                            size="sm"
                            onClick={() => {
                                setActivityType('learning');
                                setIsAdding(true);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3"
                        >
                            <Plus className="w-3 h-3" />
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {learningActivities.map(activity => (
                            <ActivityItem
                                key={activity.id}
                                activity={activity}
                                onRemove={handleRemove}
                            />
                        ))}
                        {learningActivities.length === 0 && !isAdding && (
                            <p className="text-sm text-slate-500 italic">No learning activities yet</p>
                        )}
                    </div>
                </div>

                {/* Add Activity Form */}
                {isAdding && (
                    <ActivityForm
                        type={activityType}
                        onCancel={() => setIsAdding(false)}
                        onSuccess={(newActivity) => {
                            setActivities([...activities, newActivity]);
                            setIsAdding(false);
                        }}
                    />
                )}
            </CardContent>
        </Card>
    );
}

function ActivityItem({ activity, onRemove }: { activity: Activity; onRemove: (id: string) => void }) {
    return (
        <div className="flex items-center justify-between bg-slate-900/50 border border-slate-700 rounded px-3 py-2 group">
            <span className="text-sm text-slate-300">{activity.name}</span>
            <button
                onClick={() => onRemove(activity.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

function ActivityForm({
    type,
    onCancel,
    onSuccess,
}: {
    type: 'building' | 'learning';
    onCancel: () => void;
    onSuccess: (activity: Activity) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        formData.append('type', type);

        const result = await addActivity(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            const newActivity = {
                id: crypto.randomUUID(),
                name: formData.get('name') as string,
                type,
                createdAt: new Date(),
            };
            onSuccess(newActivity);
        }
    }

    const icon = type === 'building' ? <Hammer className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />;
    const color = type === 'building' ? 'orange' : 'blue';

    return (
        <div className={`bg-${color}-900/10 border border-${color}-700/50 rounded-lg p-4`}>
            <h4 className={`text-${color}-400 font-mono text-sm mb-3 flex items-center gap-2`}>
                {icon}
                Add {type === 'building' ? 'Building' : 'Learning'} Activity
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    required
                    maxLength={100}
                    placeholder={type === 'building' ? 'e.g., AI Chat App' : 'e.g., React Server Components'}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {error && (
                    <div className="p-2 bg-red-900/20 border border-red-700 rounded text-red-400 text-xs">
                        {error}
                    </div>
                )}
                <div className="flex gap-2">
                    <Button
                        type="submit"
                        disabled={loading}
                        size="sm"
                        className={`flex-1 bg-${color}-600 hover:bg-${color}-700 text-white`}
                    >
                        {loading ? 'Adding...' : 'Add'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onCancel}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
