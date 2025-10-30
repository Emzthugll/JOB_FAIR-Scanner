<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScannerToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'recruitment_activity_id',
        'venue',
        'pin_code',
        'expires_at',
    ];

    public function recruitmentActivity() {
        return $this->belongsTo(RecruitmentActivity::class, 'recruitment_activity_id');
    }
}
