import { ScannedApplicant } from '@/types/Applicant';

export const filterApplicants = (data: ScannedApplicant[], search: string): ScannedApplicant[] => {
    const searchLower = search.toLowerCase();

    return data.filter((item) => {
        const profile = item.applicant_profile;

        return (
            profile.firstname.toLowerCase().includes(searchLower) ||
            profile.surname.toLowerCase().includes(searchLower) ||
            (profile.midname?.toLowerCase().includes(searchLower) ?? false) ||
            profile.user?.email?.toLowerCase().includes(searchLower)
        );
    });
};
