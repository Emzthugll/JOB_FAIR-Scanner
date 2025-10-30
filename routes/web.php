<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\JobfairAttendeeController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SummaryController;
use App\Http\Controllers\JobFairExportController;


Route::get('/', [ScannerController::class, 'index'])->name('home');

// Step 1: Show PIN input
Route::get('/scanner', [ScannerController::class, 'index'])->name('scanner.index');

// Step 2: Verify PIN
Route::post('/scanner/check-pin', [ScannerController::class, 'checkPin'])->name('scanner.checkPin');

// Step 3: Start scanning for the verified activity
Route::get('/scanner/start/{activity}', [ScannerController::class, 'scannerPage'])->name('scanner.start');

// Step 4: Statistics for a specific activity
Route::get('/statistics', [SummaryController::class, 'index'])->name('statistics.index');




Route::get('/reports', [ReportsController::class, 'index'])->name('reports.index');





Route::post('/jobfair/attendees',[JobfairAttendeeController::class,'store'])->name('jobfair.attendees.store');
Route::get('/jobfair/{id}/total-scanned', [JobfairAttendeeController::class, 'totalScannedAttendees'])->name('jobfair.attendees.totalScanned');

Route::get('/jobfair/{id}/scanned-applicants', [JobfairAttendeeController::class, 'getScannedApplicants'])
    ->name('jobfair.attendees.scanned');

Route::get('/export-jobfair', [JobFairExportController::class, 'export']);

