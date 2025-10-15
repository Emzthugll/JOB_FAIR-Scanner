<?php

namespace App\Http\Controllers;


use Inertia\Inertia;
use App\Models\RecruitmentActivity;

class ScannerController extends Controller
{
    public function index()
    {
        $currentActivity = RecruitmentActivity::where('start', '<=', now())
            ->where('end', '>=', now())
            ->first();

        return Inertia::render('Scanner', [
            'currentActivity' => $currentActivity,
        ]);
    }
}
