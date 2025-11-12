'use client';

import GenderChartCard from '@/components/ui/cards/GenderChartCard';
import LineChartCard from '@/components/ui/cards/LineChartCard';
import TypeCard from '@/components/ui/cards/TypeCard';
import VenueCard from '@/components/ui/cards/VenueCard';
import AppLayout from '@/layouts/AppLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Activity {
    id: number;
    type: string;
    start: string;
    venue: string;
}

interface LineChartDataRaw {
    month: string;
    male: number;
    female: number;
    growthRate: number;
}

interface LineChartDataProcessed {
    month: string;
    totalAttendees: number;
    growthRate: number;
    activities: { name: string; count: number }[];
}

interface StatisticsProps {
    totalScannedToday: number;
    maleScanned: number;
    femaleScanned: number;
    venue?: string;
    activityType?: string;
    activities: Activity[];
    selectedActivityId: string;
    lineChartData?: LineChartDataRaw[];
    [key: string]: any;
}

const Statistics: React.FC = () => {
    const {
        
        maleScanned,
        femaleScanned,
        venue,
        activityType,
        activities,
        selectedActivityId,
        lineChartData = [],
    } = usePage<StatisticsProps>().props;

    const [activityId, setActivityId] = useState(selectedActivityId);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setActivityId(id);
        router.get('/statistics', { activity_id: id || undefined }, { preserveState: true, replace: true });
    };

    
    const processedChartData: LineChartDataProcessed[] = lineChartData.map((d) => ({
        month: d.month,
        totalAttendees: d.male + d.female,
        growthRate: d.growthRate,
        activities: [
            { name: 'Male', count: d.male },
            { name: 'Female', count: d.female },
        ],
    }));

    return (
        <AppLayout>
            <Head title="Statistics" />

            {/* Activity Select Dropdown */}
            <div className="mb-6">
                <select
                    value={activityId}
                    onChange={handleChange}
                    className="max-h-40 w-full overflow-y-auto rounded border-2 border-[#084896] px-3 py-2 text-sm focus:outline-[#084896] sm:w-auto sm:min-w-[200px]"
                >
                    <option value="">All Activities</option>
                    {activities.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.type} |{' '}
                            {new Date(a.start).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </option>
                    ))}
                </select>
            </div>

            {/* Statistics Grid */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <GenderChartCard title="Scanned Attendees" maleCount={maleScanned} femaleCount={femaleScanned} />

                <div className="flex flex-col gap-4">
                    <VenueCard venue={venue} />
                    <TypeCard activityType={activityType} />
                </div>
            </div>

            {/* Line Chart */}
            {processedChartData.length > 0 && (
                <div className="mb-6">
                    <LineChartCard data={processedChartData} title="Monthly Attendance & Growth" />
                </div>
            )}
        </AppLayout>
    );
};

export default Statistics;
