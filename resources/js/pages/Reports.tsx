import ApplicantDataTable from '@/components/ApplicantDataTable';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';

const Reports: React.FC = () => {
    return (
        <AppLayout>
            <Head title="Reports" />

            <div className="mt-10">
                <ApplicantDataTable />
            </div>
        </AppLayout>
    );
};

export default Reports;
