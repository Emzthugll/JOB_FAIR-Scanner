<?php

namespace App\Http\Controllers;


use App\Exports\JobFairExports;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class JobFairExportController extends Controller
{
  public function export(Request $request)
{
    $search = $request->input('search', '');
    $activityId = $request->input('activity_id');

    
    if ($activityId) {
        $activity = \App\Models\RecruitmentActivity::find($activityId);
        if ($activity) {
            $type = preg_replace('/[^A-Za-z0-9]/', '_', $activity->type); 
            $date = \Carbon\Carbon::parse($activity->start)->format('Y-m-d');
            $filename = "{$type}_{$date}.xlsx";
        } else {
            $filename = 'jobfair_applicants_' . now()->format('Y-m-d') . '.xlsx';
        }
    } else {
        // Default filename for all activities
        $filename = 'all_activities_' . now()->format('Y-m-d') . '.xlsx';
    }

    return Excel::download(new JobFairExports($search, $activityId), $filename);
}


}
