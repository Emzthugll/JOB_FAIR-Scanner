<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\JobfairRecruitmentAttendee;
use App\Models\RecruitmentActivity; 
use Carbon\Carbon;

class SummaryController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        // Get today's activity
        $todaysActivity = RecruitmentActivity::whereDate('start', '<=', $today)
            ->whereDate('end', '>=', $today)
            ->first();

        $totalScanned = 0;
        $activityType = null;

        if ($todaysActivity) {
            $totalScanned = JobfairRecruitmentAttendee::where('recruitment_activity_id', $todaysActivity->id)
                ->where('status', 'Attended')
                ->count();

            $activityType = $todaysActivity->type; 
        }

        return Inertia::render('Statistics', [
            'recruitmentActivityId' => $todaysActivity?->id ?? null,
            'totalScannedToday' => $totalScanned,
            'activityType' => $activityType, 
        ]);
    }
}
