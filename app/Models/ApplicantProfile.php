<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfile extends Model
{
    use HasFactory;

    protected $table = 'applicant_profiles';

    protected $fillable = [
        'user_id',
        'firstname',
        'midname',
        'surname',
        'suffix',
        'barangay_id',
        'city_id',
        'current_barangay',
        'current_city',
        'current_province',
        'birthday',
        'place_of_birth',
        'sex',
        'religion',
        'civil_status',
        'contact_number',
        'disability',
        'tin_number',
        'employment_status',
        'qr_token', 
        'profile_picture',
        'introduction',
        'email',
        
    ];

    protected $casts = [
        'birthday' => 'date',
    ];

    // ==================== RELATIONSHIPS ====================
    
    /**
     * Get the educational background for this applicant
     */
    public function educationalBackground()
    {
        return $this->hasOne(ApplicantProfileEducationalBackground::class, 'applicant_profile_id', 'id');
    }

    /**
     * Get the Applicant_profile for this applicant
     */
    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class, 'applicant_profile_id', 'id');
    }

    /**
     * Get the job preference for this applicant
     */
    public function jobPreference()
    {
        return $this->hasOne(ApplicantProfileJobPreference::class, 'applicant_profile_id', 'id');
    }

    /**
     * Get the user associated with this profile
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    // ==================== QUERY SCOPES ====================
    
    /**
     * Scope a query to only include profiles scanned today
     */
    public function scopeScannedToday($query)
    {
        return $query->whereDate('created_at', today());
    }

    /**
     * Scope a query to search applicants
     */
    public function scopeSearch($query, $search)
    {
        if (empty($search)) {
            return $query;
        }

        return $query->where(function($q) use ($search) {
            $q->where('firstname', 'like', "%{$search}%")
              ->orWhere('surname', 'like', "%{$search}%")
              ->orWhere('contact_number', 'like', "%{$search}%")
              ->orWhereHas('user', function($userQuery) use ($search) {
                  $userQuery->where('email', 'like', "%{$search}%");
              });
        });
    }
}