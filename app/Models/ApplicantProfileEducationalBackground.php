<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfileEducationalBackground extends Model
{
    use HasFactory;

    protected $table = 'applicant_profile_educational_backgrounds';

    protected $fillable = [
        'applicant_profile_id',
        'level',
        'course',
        'school',
        'year_graduated',
        
    ];

    /**
     * Get the applicant profile that owns this educational background
     */
    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class, 'applicant_profile_id');
    }
}