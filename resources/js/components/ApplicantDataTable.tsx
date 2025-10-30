import ExportButton from '@/components/ui/ExportButton';
import { router, usePage } from '@inertiajs/react';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState } from 'react';

interface ApplicantProfile {
    firstname?: string;
    midname?: string;
    surname?: string;
    user?: {
        email?: string;
    };
}

interface ScannedApplicant {
    id: number;
    status?: string;
    created_at?: string;
    applicant_profile?: ApplicantProfile;
}

interface Activity {
    id: number;
    type: string;
    start: string;
}

interface Filters {
    activity_id?: string | number;
    search?: string;
}

interface Props {
    scannedApplicants?: {
        data?: ScannedApplicant[];
        total?: number;
        current_page?: number;
        per_page?: number;
    };
    activities?: Activity[];
    filters?: Filters;
}

const ApplicantDataTable: React.FC = () => {
    const { props } = usePage();
    const { scannedApplicants = { data: [], total: 0, current_page: 1, per_page: 10 }, activities = [], filters = {} } = props as Props;

    const [activityId, setActivityId] = useState<string>((filters.activity_id || '').toString());
    const [search, setSearch] = useState(filters.search || '');
    const [page, setPage] = useState((scannedApplicants.current_page || 1) - 1);
    const [rowsPerPage, setRowsPerPage] = useState(scannedApplicants.per_page || 10);

    const handleFilter = (p = page + 1, r = rowsPerPage) => {
        router.get('/reports', { activity_id: activityId, search, page: p, per_page: r }, { preserveState: true, replace: true });
    };

    useEffect(() => {
        const timeout = setTimeout(() => handleFilter(1), 400);
        return () => clearTimeout(timeout);
    }, [search, activityId]);

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-[1000px]">
                {/* Filters */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">Scanned Applicants</h3>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                        <select
                            value={activityId}
                            onChange={(e) => setActivityId(e.target.value)}
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

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full rounded border-2 border-[#084896] px-3 py-2 text-sm focus:outline-[#084896] sm:w-auto sm:min-w-[200px]"
                        />

                        <ExportButton activityId={activityId} search={search} />
                    </div>
                </div>

                {/* Table */}
                <div className="scrollbar-custom max-h-[500px] w-full overflow-auto rounded-sm border border-[#084896] pr-1 shadow-md">
                    <table className="w-full border-collapse text-left text-sm text-gray-700">
                        <thead className="sticky top-0 z-10 bg-[#084896] text-white">
                            <tr>
                                <th className="border-b border-slate-400 p-2 font-medium">Full Name</th>
                                <th className="border-b border-slate-400 p-2 font-medium">Email</th>
                                <th className="border-b border-slate-400 p-2 font-medium">Status</th>
                                <th className="border-b border-slate-400 p-2 font-medium">Scanned at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scannedApplicants.data && scannedApplicants.data.length ? (
                                scannedApplicants.data.map((item) => {
                                    const p = item.applicant_profile || {};
                                    const fullName = `${p.firstname || ''} ${p.midname || ''} ${p.surname || ''}`.replace(/\s+/g, ' ').trim();
                                    return (
                                        <tr key={item.id} className="border-b border-slate-400 hover:bg-slate-50">
                                            <td className="p-2">{fullName}</td>
                                            <td className="p-2">{p.user?.email || '-'}</td>
                                            <td className="p-2 text-green-600">{item.status || '-'}</td>
                                            <td className="border-b border-slate-400 p-2">
                                                {item.created_at ? new Date(item.created_at).toLocaleString() : '-'}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-400">
                                        No scanned applicants found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <TablePagination
                    className="text-[#084896]"
                    component="div"
                    count={scannedApplicants.total || 0}
                    page={page}
                    onPageChange={(_e, p) => {
                        setPage(p);
                        handleFilter(p + 1);
                    }}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        const r = parseInt(e.target.value);
                        setRowsPerPage(r);
                        setPage(0);
                        handleFilter(1, r);
                    }}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </div>
        </div>
    );
};

export default ApplicantDataTable;
