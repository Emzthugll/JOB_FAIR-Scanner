<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RecruitmentActivity;
use App\Models\ScannerToken;
use Carbon\Carbon;

class ScannerController extends Controller
{
   public function index()
{
    $activityId = session('current_activity_id');

    // If the user already entered PIN this session, go straight to scanner
    if ($activityId) {
        return redirect()->route('scanner.start', ['activity' => $activityId]);
    }

    // Otherwise, show PIN input page
    return Inertia::render('Scanner/PinPage');
}


public function checkPin(Request $request)
{
    $request->validate([
        'pin' => 'required|digits:4',
    ]);

    $token = ScannerToken::with('recruitmentActivity')
        ->where('pin_code', $request->pin)
        ->where('expires_at', '>=', now())
        ->first();

    if (!$token || !$token->recruitmentActivity) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid or expired PIN.'
        ], 404);
    }

    $activity = $token->recruitmentActivity;

    // Store the current activity in session
    session(['current_activity_id' => $activity->id]);

    return response()->json([
        'success' => true,
        'redirect' => route('scanner.start', ['activity' => $activity->id]),
    ]);
}



public function scannerPage(RecruitmentActivity $activity)
{
    return Inertia::render('Scanner', [
        'currentActivity' => [
            'id' => $activity->id,
            'type' => $activity->type,
            'start' => $activity->start,
            'end' => $activity->end,
            'venue' => $activity->venue,
        ],
    ]);
}

   
    



}
