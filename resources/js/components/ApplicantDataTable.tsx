import ExportButton from '@/components/ui/ExportButton';
import { router, usePage } from '@inertiajs/react';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState } from 'react';

const ApplicantDataTable: React.FC = () => {
    const { props } = usePage();
    const { scannedApplicants, activities, filters } = props as any;

    const [activityId, setActivityId] = useState(filters.activity_id || '');

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
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-800">Scanned Applicants</h3>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <select
                            value={activityId}
                            onChange={(e) => setActivityId(e.target.value)}
                            className="w-full rounded border border-[#084896] px-3 py-2 text-sm sm:w-auto"
                        >
                            <option value="">All Activities</option>
                            {activities?.map((a: any) => (
                                <option key={a.id} value={a.id}>
                                    {a.type} | {new Date(a.start).toLocaleDateString()} - {new Date(a.end).toLocaleDateString()} | {a.venue}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full rounded border border-[#084896] px-3 py-2 text-sm sm:w-auto"
                        />
                        <ExportButton activityId={activityId} search={search} />
                    </div>
                </div>

                {/* Table */}
                <div className="scrollbar-custom max-h-[500px] w-full overflow-auto rounded-sm border border-[#084896] shadow-md">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="sticky top-0 bg-[#084896] text-white">
                            <tr>
                                <th className="border-b border-slate-400 p-2 font-medium">Full Name</th>
                                <th className="border-b border-slate-400 p-2 font-medium">Email</th>
                                <th className="border-b border-slate-400 p-2 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scannedApplicants.data.length ? (
                                scannedApplicants.data.map((item: any) => {
                                    const p = item.applicant_profile;
                                    const fullName = `${p.firstname} ${p.midname || ''} ${p.surname}`.replace(/\s+/g, ' ').trim();
                                    return (
                                        <tr key={item.id} className="border-b border-slate-400 hover:bg-slate-50">
                                            <td className="p-2">{fullName}</td>
                                            <td className="p-2">{p.user?.email}</td>
                                            <td className="p-2 text-green-600">{item.status}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={3} className="p-4 text-center text-gray-400">
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
