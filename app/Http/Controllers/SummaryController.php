<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RecruitmentActivity;
use App\Models\JobfairRecruitmentAttendee;

class SummaryController extends Controller
{
 public function index()
{
    $activityId = session('current_activity_id');

    if (!$activityId) {
        return Inertia::render('Statistics', [
            'totalScannedToday' => 0,
            'activityType' => null,
        ]);
    }

    $activity = RecruitmentActivity::find($activityId);

    if (!$activity) {
        return Inertia::render('Statistics', [
            'totalScannedToday' => 0,
            'activityType' => null,
        ]);
    }

    $totalScanned = JobfairRecruitmentAttendee::where('recruitment_activity_id', $activityId)
        ->where('status', 'Attended')
        ->count();

    return Inertia::render('Statistics', [
        'totalScannedToday' => $totalScanned,
        'activityType' => $activity->type,
    ]);
}

}




