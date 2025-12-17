interface Activity {
    id: string;
    name: string;
    type: string;
}

interface CurrentActivitiesProps {
    activities: Activity[];
}

export default function CurrentActivities({ activities }: CurrentActivitiesProps) {
    const buildingActivities = activities.filter(a => a.type === 'building');
    const learningActivities = activities.filter(a => a.type === 'learning');

    if (activities.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            {buildingActivities.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-white font-mono mb-3 flex items-center gap-2">
                        🚧 Currently Building
                    </h3>
                    <div className="space-y-2">
                        {buildingActivities.map(activity => (
                            <div
                                key={activity.id}
                                className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3"
                            >
                                <p className="text-slate-300">{activity.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {learningActivities.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-white font-mono mb-3 flex items-center gap-2">
                        📚 Currently Learning
                    </h3>
                    <div className="space-y-2">
                        {learningActivities.map(activity => (
                            <div
                                key={activity.id}
                                className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3"
                            >
                                <p className="text-slate-300">{activity.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
