import axios from 'axios';

interface TotalScannedResponse {
    recruitment_activity_id: number;
    total_scanned_attendees: number;
}

/**
 * Fetch the total number of scanned attendees for a recruitment activity
 * @param recruitmentActivityId - ID of the recruitment activity
 * @returns number of scanned attendees
 */
export const getTotalScannedAttendees = async (recruitmentActivityId: number): Promise<number> => {
    try {
        const res = await axios.get<TotalScannedResponse>(`/jobfair/${recruitmentActivityId}/total-scanned`);
        return res.data.total_scanned_attendees;
    } catch (err) {
        console.error('Failed to fetch total scanned attendees', err);
        return 0;
    }
};
