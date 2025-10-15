<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobfairRecruitmentAttendee extends Model
{
    use HasFactory;

    protected $table = 'jobfair_recruitment_attendees';

    protected $fillable = [
        'recruitment_activity_id',
        'applicant_profile_id',
        'status',
    ];
}
