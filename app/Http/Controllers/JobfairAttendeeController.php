<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobfairRecruitmentAttendee;
use App\Models\ApplicantProfile;

class JobfairAttendeeController extends Controller
{
    public function store(Request $request)
    {
        // Validate input
        $request->validate([
            'recruitment_activity_id' => 'required|integer|exists:recruitment_activities,id',
            'qr_token' => 'required|string',
            'status' => 'required|string|max:50',
        ], [
            'recruitment_activity_id.exists' => 'The selected recruitment activity does not exist.',
            'qr_token.required' => 'Oops! Please scan a valid applicant QR code.',
        ]);

        // Find applicant by QR token
        $applicant = ApplicantProfile::where('qr_token', $request->qr_token)->first();

        if (!$applicant) {
            return response()->json([
                'message' => 'Invalid QR token. Applicant not found.',
            ], 404);
        }

        // Check if this applicant is already scanned for this activity
        $existing = JobfairRecruitmentAttendee::where('recruitment_activity_id', $request->recruitment_activity_id)
            ->where('applicant_profile_id', $applicant->id)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Applicant already scanned!',
            ], 409);
        }

        // Save scan record
        $attendee = JobfairRecruitmentAttendee::create([
            'recruitment_activity_id' => $request->recruitment_activity_id,
            'applicant_profile_id' => $applicant->id,
            'qr_token' => $request->qr_token,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Attendee saved successfully',
            'attendee' => $attendee
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
