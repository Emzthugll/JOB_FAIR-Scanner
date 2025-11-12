<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\JobfairRecruitmentAttendee;
use App\Models\RecruitmentActivity;

class ReportsController extends Controller
{
    /**
     * List reports for all events (active + ended)
     */
    public function index(Request $request)
    {
        // Query attendees who actually attended
        $query = JobfairRecruitmentAttendee::with(
            'applicantProfile',
            'applicantProfile.educationalBackground',
            'applicantProfile.jobPreference',
            'applicantProfile.user',
            'recruitmentActivity'
        )->where('status', 'Attended');

        // Filter by activity if provided
        if ($request->filled('activity_id')) {
            $query->where('recruitment_activity_id', $request->activity_id);
        }

        // Search by name, contact number, or email
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('applicantProfile', function ($q) use ($search) {
                $q->where(function ($q2) use ($search) {
                    $q2->where('firstname', 'like', "%{$search}%")
                       ->orWhere('midname', 'like', "%{$search}%")
                       ->orWhere('surname', 'like', "%{$search}%")
                       ->orWhere('contact_number', 'like', "%{$search}%")
                       ->orWhereHas('user', function ($q3) use ($search) {
                           $q3->where('email', 'like', "%{$search}%");
                       });
                });
            });
        }

        // Paginate results
        $perPage = $request->input('per_page', 10);
        $scannedApplicants = $query->paginate($perPage);

        // Fetch all activities including ended ones
        $activities = RecruitmentActivity::orderBy('start', 'desc')->get();

        return Inertia::render('Reports', [
            'scannedApplicants' => $scannedApplicants,
            'activities' => $activities,
            'filters' => $request->only(['activity_id', 'search']),
        ]);
    }

    /**
     * Show a specific event report 
     */
    public function show(RecruitmentActivity $event)
    {
        // Load attendees for the selected event
        $attendees = $event->attendees()->with(
            'applicantProfile',
            'applicantProfile.educationalBackground',
            'applicantProfile.jobPreference',
            'applicantProfile.user'
        )->where('status', 'Attended')->get();

        return Inertia::render('Reports/EventReport', [
            'event' => $event,
            'attendees' => $attendees,
        ]);
    }
}
