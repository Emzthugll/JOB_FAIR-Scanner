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
    ];
}
