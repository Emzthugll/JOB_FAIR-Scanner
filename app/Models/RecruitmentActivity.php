<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecruitmentActivity extends Model
{
    Use HasFactory;

    protected $table = 'recruitment_activities';

    protected $fillable = [
        'type',
        'start',
        'end',
        'venue',
        'details',
        
    ];

    public $timestamps = true;
}
