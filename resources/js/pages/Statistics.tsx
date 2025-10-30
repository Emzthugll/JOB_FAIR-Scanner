import SummaryCard from '@/components/ui/SummaryCard';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Calendar, User } from 'lucide-react';

interface StatisticsProps {
    totalScannedToday: number;
    activityType?: string | null;
}

const Statistics: React.FC<StatisticsProps> = ({ totalScannedToday, activityType }) => {
    return (
        <AppLayout>
            <Head title="Statistics" />
            <div className="mb-6 grid gap-4 md:grid-cols-3">
                <SummaryCard title="Total Scanned Today" value={totalScannedToday} icon={User} />
                <SummaryCard title="Event Type" value={activityType || 'N/A'} icon={Calendar} />
            </div>
        </AppLayout>
    );
};

export default Statistics;
