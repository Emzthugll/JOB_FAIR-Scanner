<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\JobfairAttendeeController;
use App\Http\Controllers\ReportsController;

Route::get('/',[ScannerController::class, 'index'])->name('home');
Route::get('/reports', [ReportsController::class, 'index'])->name('reports.index');

Route::post('/jobfair/attendees',[JobfairAttendeeController::class,'store'])->name('jobfair.attendees.store');

Route::get('/jobfair/{id}/total-scanned', [JobfairAttendeeController::class, 'totalScannedAttendees'])->name('jobfair.attendees.totalScanned');

