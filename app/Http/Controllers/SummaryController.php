<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RecruitmentActivity;
use App\Models\JobfairRecruitmentAttendee;
use Carbon\Carbon;

class SummaryController extends Controller
{
    public function index(Request $request)
    {
        //Fetch all activities for dropdown 
        $activities = RecruitmentActivity::orderBy('start', 'desc')->get();

        //Determine selected activity
        $activityId = $request->input('activity_id') ?? session('current_activity_id');
        $selectedActivity = $activityId ? $activities->find($activityId) : null;

        //Base query for scanned attendees
        $baseQuery = JobfairRecruitmentAttendee::where('status', 'Attended');
        if ($activityId) {
            $baseQuery->where('recruitment_activity_id', $activityId);
        }

        //Count male, female, and total attendees 
        $maleScanned = (clone $baseQuery)->whereHas('applicantProfile', fn($q) => $q->where('sex', 'Male'))->count();
        $femaleScanned = (clone $baseQuery)->whereHas('applicantProfile', fn($q) => $q->where('sex', 'Female'))->count();
        $totalScanned = $maleScanned + $femaleScanned;

        //Prepare monthly total attendees and gender breakdown
        $year = now()->year;

        $monthlyData = collect(range(1, 12))->map(function ($month) use ($year) {
            $male = JobfairRecruitmentAttendee::where('status', 'Attended')
                ->whereYear('created_at', $year)
                ->whereMonth('created_at', $month)
                ->whereHas('applicantProfile', fn($q) => $q->where('sex', 'Male'))
                ->count();

            $female = JobfairRecruitmentAttendee::where('status', 'Attended')
                ->whereYear('created_at', $year)
                ->whereMonth('created_at', $month)
                ->whereHas('applicantProfile', fn($q) => $q->where('sex', 'Female'))
                ->count();

            return [
                'month' => Carbon::createFromDate($year, $month, 1)->format('M'),
                'male' => $male,
                'female' => $female,
                'total' => $male + $female,
            ];
        });

        //Calculate monthly growth rate
        $lineChartData = $monthlyData->map(function ($data, $index) use ($monthlyData) {
            $prevTotal = $index > 0 ? $monthlyData[$index - 1]['total'] : 0;
            $data['growthRate'] = $prevTotal > 0
                ? round((($data['total'] - $prevTotal) / $prevTotal) * 100, 2)
                : 0;

            return [
                'month' => $data['month'],
                'totalAttendees' => $data['total'],
                'male' => $data['male'],
                'female' => $data['female'],
                'growthRate' => $data['growthRate'],
            ];
        });

        // Render Inertia page 
        return Inertia::render('Statistics', [
            'totalScannedToday' => $totalScanned,
            'maleScanned' => $maleScanned,
            'femaleScanned' => $femaleScanned,
            'venue' => $selectedActivity?->venue,
            'activityType' => $selectedActivity?->type,
            'activities' => $activities,
            'selectedActivityId' => $activityId ?? '',
            'lineChartData' => $lineChartData->values(),
        ]);
    }
}
