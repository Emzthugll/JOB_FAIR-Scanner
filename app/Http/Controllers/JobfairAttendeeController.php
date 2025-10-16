<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobfairRecruitmentAttendee;

class JobfairAttendeeController extends Controller
{
    

public function store(Request $request)
{
    $request->validate([
        'recruitment_activity_id' => 'required|integer|exists:recruitment_activities,id',
        'applicant_profile_id' => 'required|integer|exists:applicant_profiles,id',
        'status' => 'required|string|max:50',

    ], [
        'recruitment_activity_id.exists' => 'The selected recruitment activity does not exist.',
        'applicant_profile_id.integer' => 'Oops! Please scan a valid applicant QR code.',
    
    ]);

    // Check if this applicant is already scanned for this activity
    $existing = JobfairRecruitmentAttendee::where('recruitment_activity_id', $request->recruitment_activity_id)
        ->where('applicant_profile_id', $request->applicant_profile_id)
        ->first();

    if ($existing) {
        return response()->json([
            'message' => 'Applicant already scanned!',
        ], 409); 
    }

    $attendee = JobfairRecruitmentAttendee::create([
        'recruitment_activity_id' => $request->recruitment_activity_id,
        'applicant_profile_id' => $request->applicant_profile_id,
        'status' => $request->status,
    ]);

    return response()->json([
        'message' => 'Attendee saved successfully',
        'attendee' => $attendee
    ]);
}

}
