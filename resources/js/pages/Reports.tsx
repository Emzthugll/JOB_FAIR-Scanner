import SummaryCard from '@/components/SummaryCard';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Calendar, User } from 'lucide-react';

interface ReportsProps {
    recruitmentActivityId?: number | null;
    totalScannedToday: number;
    activityType?: string | null;
}

const Reports: React.FC<ReportsProps> = ({ activityType, totalScannedToday }) => {
    return (
        <AppLayout>
            <Head title="Reports" />

            <div className="mb-6 grid gap-4 md:grid-cols-3">
                <SummaryCard title="Total Scanned" value={totalScannedToday} icon={User} />
                <SummaryCard title="Event Type" value={activityType || 'N/A'} icon={Calendar} />
            </div>
        </AppLayout>
    );
};

export default Reports;
