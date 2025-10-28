<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfileJobPreference extends Model
{
    use HasFactory;

    protected $table = 'applicant_profile_job_preference';
    
    protected $fillable = [
        'applicant_profile_id',
        'preferred_job',
        'employment',
    ];

    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class, 'applicant_profile_id');
    }
}
