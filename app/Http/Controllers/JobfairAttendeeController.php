<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobfairRecruitmentAttendee;
use App\Models\ApplicantProfile;

class JobfairAttendeeController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'recruitment_activity_id' => 'required|integer|exists:recruitment_activities,id',
        'qr_token' => 'required|string',
        'status' => 'required|string|max:50',
    ], [
        'recruitment_activity_id.exists' => 'The selected recruitment activity does not exist.',
        'qr_token.required' => 'Oops! Please scan a valid applicant QR code.',
    ]);

    // Find attendee by QR token for this event
    $attendee = JobfairRecruitmentAttendee::where('qr_token', $request->qr_token)
        ->where('recruitment_activity_id', $request->recruitment_activity_id)
        ->first();

    if (!$attendee) {
        return response()->json([
            'message' => 'Invalid QR token for this event.',
        ], 404);
    }

    if ($attendee->status === 'Attended') {
        return response()->json([
            'message' => 'Applicant already scanned!',
        ], 409);
    }

    // Mark as scanned
    $attendee->status = $request->status; 

    return response()->json([
        'message' => 'Attendee scanned successfully',
        'attendee' => $attendee,
    ]);
}


    // total scanned attendees    
    public function totalScannedAttendees($recruitmentActivityId)
{
    $total = JobfairRecruitmentAttendee::where('recruitment_activity_id', $recruitmentActivityId)
        ->where('status', 'Attended')
        ->count();

    return response()->json([
        'recruitment_activity_id' => $recruitmentActivityId,
        'total_scanned_attendees' => $total,
    ]);
}

public function getScannedApplicants($jobfairId)
    {

        $scannedApplicants = JobfairRecruitmentAttendee::with('applicantProfile.educationalBackground','applicantProfile.jobPreference','applicantProfile.user')
            ->where('recruitment_activity_id', $jobfairId)
            ->where('status', 'Attended')
            ->get();

        return response()->json($scannedApplicants);
    }

}
