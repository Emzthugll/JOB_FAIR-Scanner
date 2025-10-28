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
        'qr_token',
        'status',
    ];


    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class, 'applicant_profile_id', 'id');
    }

public function recruitmentActivity()
    {
        return $this->belongsTo(RecruitmentActivity::class, 'recruitment_activity_id', 'id');
    }

}
