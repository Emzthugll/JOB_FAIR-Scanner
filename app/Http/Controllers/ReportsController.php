<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\JobfairRecruitmentAttendee;
use App\Models\RecruitmentActivity;

class ReportsController extends Controller
{
    public function index(Request $request)
    {
        $query = JobfairRecruitmentAttendee::with(
            'applicantProfile',
            'applicantProfile.educationalBackground',
            'applicantProfile.jobPreference',
            'applicantProfile.user',
            'recruitmentActivity'
        )->where('status', 'Attended');

        // Filter by activity only
        if ($request->filled('activity_id')) {
            $query->where('recruitment_activity_id', $request->activity_id);
        }
        

        if ($request->filled('search')) {
    $search = $request->search;
    $query->whereHas('applicantProfile', function($q) use ($search) {
        $q->where(function($q2) use ($search) {
            $q2->where('firstname', 'like', "%{$search}%")
               ->orWhere('midname', 'like', "%{$search}%")
               ->orWhere('surname', 'like', "%{$search}%")
               ->orWhere('contact_number', 'like', "%{$search}%")
               ->orWhereHas('user', function($q3) use ($search) {
                   $q3->where('email', 'like', "%{$search}%");
               });
        });
    });
}


        // Paginate
        $perPage = $request->input('per_page', 10);
        $scannedApplicants = $query->paginate($perPage);

        return Inertia::render('Reports', [
            'scannedApplicants' => $scannedApplicants,
            'activities' => RecruitmentActivity::all(),
            'filters' => $request->only(['activity_id', 'search']),
        ]);
    }
}
