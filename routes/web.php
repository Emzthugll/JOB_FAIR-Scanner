<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\JobfairAttendeeController;

Route::get('/', [ScannerController::class, 'index'])->name('home');

Route::post('/jobfair/attendees', [JobfairAttendeeController::class, 'store']) -> name('jobfair.attendees.store');
