import { ScannedApplicant } from '@/types/Applicant';

export const filterApplicants = (data: ScannedApplicant[], search: string): ScannedApplicant[] => {
    const searchLower = search.toLowerCase();

    return data.filter((item) => {
        const profile = item.applicant_profile;
        const preference = profile.job_preference;
        const educational = profile.educational_background;
        return (
            profile.firstname.toLowerCase().includes(searchLower) ||
            profile.surname.toLowerCase().includes(searchLower) ||
            (profile.midname?.toLowerCase().includes(searchLower) ?? false) ||
            (profile.suffix?.toLowerCase().includes(searchLower) ?? false) ||
            profile.birthday.toLowerCase().includes(searchLower) ||
            profile.sex.toLowerCase().includes(searchLower) ||
            (profile.disability?.toLowerCase().includes(searchLower) ?? false) ||
            (profile.religion?.toLowerCase().includes(searchLower) ?? false) ||
            profile.civil_status?.toLowerCase().includes(searchLower) ||
            profile.current_barangay?.toLowerCase().includes(searchLower) ||
            profile.current_city?.toLowerCase().includes(searchLower) ||
            profile.current_province?.toLowerCase().includes(searchLower) ||
            profile.tin_number?.toLowerCase().includes(searchLower) ||
            profile.contact_number?.toLowerCase().includes(searchLower) ||
            profile.user?.email?.toLowerCase().includes(searchLower) ||
            profile.employment_status?.toLowerCase().includes(searchLower) ||
            preference?.employment?.toLowerCase().includes(searchLower) ||
            preference?.preferred_job?.toLowerCase().includes(searchLower) ||
            String(educational?.level).toLowerCase().includes(searchLower) ||
            educational?.course.toLowerCase().includes(searchLower) ||
            educational?.school.toLowerCase().includes(searchLower) ||
            educational?.year_graduated.toLowerCase().includes(searchLower)
        );
    });
};
