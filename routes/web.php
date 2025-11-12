<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\JobfairAttendeeController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SummaryController;
use App\Http\Controllers\JobFairExportController;

/*
|--------------------------------------------------------------------------
| Root / Home
|--------------------------------------------------------------------------
| Redirect to reports by default, so landing page is reports list
*/
Route::get('/', function () {
    return redirect()->route('reports.index');
});

/*
|--------------------------------------------------------------------------
| Scanner Flow (PIN + Active Events Only)
|--------------------------------------------------------------------------
*/
Route::prefix('scanner')->group(function () {
    // Step 1: Show PIN input
    Route::get('/', [ScannerController::class, 'index'])->name('scanner.index');

    // Step 2: Verify PIN
    Route::post('/check-pin', [ScannerController::class, 'checkPin'])->name('scanner.checkPin');

    // Step 3: Start scanning (only for active events)
    Route::get('/start/{activity}', [ScannerController::class, 'scannerPage'])->name('scanner.start');
});

/*
|--------------------------------------------------------------------------
| Statistics / Summary
|--------------------------------------------------------------------------
*/
Route::get('/statistics', [SummaryController::class, 'index'])->name('statistics.index');

/*
|--------------------------------------------------------------------------
| Reports (Access Active + Ended Events)
|--------------------------------------------------------------------------
*/
Route::get('/reports', [ReportsController::class, 'index'])->name('reports.index');
Route::get('/reports/{event}', [ReportsController::class, 'show'])->name('reports.show');

/*
|--------------------------------------------------------------------------
| Jobfair Attendees
|--------------------------------------------------------------------------
*/
Route::post('/jobfair/attendees', [JobfairAttendeeController::class, 'store'])
    ->name('jobfair.attendees.store');

Route::get('/jobfair/{id}/total-scanned', [JobfairAttendeeController::class, 'totalScannedAttendees'])
    ->name('jobfair.attendees.totalScanned');

Route::get('/jobfair/{id}/scanned-applicants', [JobfairAttendeeController::class, 'getScannedApplicants'])
    ->name('jobfair.attendees.scanned');

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/
Route::get('/export-jobfair', [JobFairExportController::class, 'export'])->name('jobfair.export');
